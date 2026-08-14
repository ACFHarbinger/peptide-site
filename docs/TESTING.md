# Testing Guide

peptide-site is a statically exported Next.js storefront. Tests protect **catalog/cart/filter logic**, **storefront UI (age gate, PDP, cart drawer)**, and the **age-gate → browse → cart → hosted-checkout handoff** path. They do not cover a first-party payments API, a native app, or a `notebooks/` workspace (none of those exist).

| Layer | Location | Framework | Command |
| --- | --- | --- | --- |
| Unit | `test/unit/` | Vitest + Testing Library | `npm run test:unit` |
| Integration | `test/integration/` | Vitest + Testing Library + MSW | `npm run test:integration` |
| E2E | `test/cypress/e2e/` | Cypress | `npm run cypress:e2e` (or `cypress:run`) |
| Smoke | `test/cypress/smoke/` | Cypress | `npm run cypress:smoke` |
| All Vitest | `test/unit/` + `test/integration/` | Vitest | `npm test` / `npm run test:watch` |

Config: [`vitest.config.ts`](../vitest.config.ts) (jsdom, [`test/vitest.setup.ts`](../test/vitest.setup.ts)), [`test/cypress/cypress.config.cjs`](../test/cypress/cypress.config.cjs). Setup already enables Testing Library’s jest-dom matchers and an in-memory `localStorage`. It also starts an MSW server from `test/integration/mocks/server` — add that module when the first integration test needs a network boundary.

The directories are the contract; they may still be empty while the React port lands. New code should drop tests in the matching folder rather than inventing a fourth layer.

## What goes where

### Unit — `test/unit/`

Pure functions and one component at a time. No network. Prefer real catalog fixtures over mocked Redux.

**Belongs here**

- Catalog helpers: filter by category, search by name, variant price formatting (euro, comma decimals as the UI shows), schema/guard checks once the typed catalog exists.
- Cart math: add/increment/decrement/remove line items, subtotal, free-shipping remainder against the €350 threshold currently hard-coded in [`src/script.js`](../src/script.js).
- Age-gate helpers: “already acknowledged this session” vs. “must show”.
- Presentational components once they live under `src/` (product card, variant row, cart line) — one file in `test/unit/` mirroring the component path.
- Honest COA placeholder copy: render “documentation available on request”, and **never** assert fabricated lot IDs or purity numbers that are not in the committed catalog.

**Does not belong here**

- Multi-page flows, real Firebase, real Stripe, or Cypress-level click-throughs.

Name tests after behavior (`cart_decrement_last_qty_removes_line`), not implementation. Cover the happy path, at least one edge (empty cart, unknown category, zero results), and at least one failure (invalid catalog record, once the schema exists).

### Integration — `test/integration/`

Several React pieces mounted together, still in jsdom. **MSW** (`msw` is already a devDependency) is the only network mock — use it for Firebase Auth *client* calls and for any checkout-handoff HTTP you introduce. Do not hit live Google or Stripe from Vitest.

**Belongs here**

- Catalog page: pills + search + grid visibility, driven from the typed catalog (or today’s `PRODUCTS` fixture).
- PDP: choosing a variant and dispatching into the real Redux cart slice.
- Cart drawer + header badge staying in sync through the Redux provider.
- Age gate dismissing and revealing the catalog without a full browser.
- Planned Auth: sign-in / sign-out chrome against MSW-handled Firebase endpoints (or a test double of the Auth SDK). Exact Firebase project is not decided; do not hard-code a production project id in tests.
- Planned checkout handoff: given a non-empty cart, the checkout control points at a Payment Link / hosted URL from public config — assert the *redirect target construction*, not a paid session.

Keep handlers in `test/integration/mocks/`. `onUnhandledRequest: 'error'` is already set in `vitest.setup.ts`, so a surprise `fetch` fails the test instead of leaking to the network.

### Cypress e2e — `test/cypress/e2e/`

Real browser against a **running** dev server or the static export. This is where the v1 purchase path is proven.

Minimum flow to cover as the port lands:

1. Age gate — confirm, session persists on reload.
2. Browse — category filter and search show the expected compounds.
3. PDP (or in-list variant) — add a specific size to the cart.
4. Cart — quantity controls, subtotal, empty state.
5. Checkout handoff — clicking through leaves this origin for the hosted Stripe (or equivalent) URL. **Do not** complete a real payment, type card numbers, or hit a live `sk_`-backed API.
6. RUO — no dosing/medical-claim strings on the exercised pages (at least a smoke assertion on the legal footer / gate copy).

Also cover EU27-facing copy only as it exists (the site does not yet implement a country picker). When Firebase Auth lands, a separate spec can create a test user via the client SDK against a **dev** project — that project is not chosen yet.

### Cypress smoke — `test/cypress/smoke/`

A short, cheap subset that must stay green: export serves under `/peptide-site` in CI, home/catalog render, age gate is present, cart toggle opens, research island URL (once built) returns 200. No multi-step checkout.

## Running tests locally

```bash
npm test                   # Vitest: unit + integration
npm run test:watch
npm run test:unit
npm run test:integration

# Cypress needs a server in another terminal:
npm run dev                # local, no basePath — Cypress default baseUrl is http://localhost:3000
# or
npm run build && npm start # production-like; set CYPRESS_BASE_URL=http://localhost:3000/peptide-site

npm run cypress:open
npm run cypress:run        # e2e + smoke (specPattern includes both)
npm run cypress:e2e
npm run cypress:smoke
```

[`test/cypress/cypress.config.cjs`](../test/cypress/cypress.config.cjs) uses `CYPRESS_BASE_URL` if set, otherwise `http://localhost:3000/peptide-site` when `CI` is set, otherwise `http://localhost:3000`.

## CI

[`.github/workflows/ci.yml`](../.github/workflows/ci.yml) (GitHub Actions, Node 20, `npm ci`) is the current gate. Intended jobs:

| Job | What it should prove |
| --- | --- |
| Lint, typecheck, unit, integration | `npm run lint`, `npx tsc --noEmit`, `npm run test:unit`, `npm run test:integration` |
| Build | `npm run build` produces `out/`; artifact retained a few days |
| Cypress | Serve the export (`npm start`) and wait on `http://localhost:3000/peptide-site`, then run e2e + smoke |

That file also lints the [`git/`](../git/) Python automation workspace (ruff) — the only Python in this repo. There is no `notebooks/` workspace and no notebook tests to add.

[`.github/workflows/deploy.yml`](../.github/workflows/deploy.yml) builds and publishes `out/` to `gh-pages` on `main`. It is not a substitute for CI.

Coverage upload (Codecov, thresholds) is **not a decided v1 requirement**. [`git/codecov.yaml`](../git/codecov.yaml) exists from the template copy; do not treat its numbers as this project’s policy until that file is rewritten.

Mirrored workflows under `.gitlab/`, `.gitea/`, and `.forgejo/` may exist; GitHub Actions is what production uses. Exact job matrices on other forges are not a v1 decision.

## Writing tests

See [`.agent/rules/test_writing.md`](../.agent/rules/test_writing.md):

- One assertion concept per test; name after behavior.
- Happy path + edge + failure for new public helpers.
- Prefer real catalog fixtures; mock only network, clock, and similar boundaries (MSW for HTTP).
- Deterministic — no live Firebase, live Stripe, or wall-clock flakiness.
- Failure messages should be diagnosable without a debugger.

New React components get a unit test; multi-component + mocked network get an integration test; new user-facing flows get a Cypress spec. Content-only edits to the Astro primer do not need a Vitest file; a smoke check that `/astro-island` serves is enough until the island grows interactive tools.
