# Development Guide

Local setup for **peptide-site** (PepCore Labs): a Next.js 14 + React 18 + TypeScript 5 storefront with Tailwind 3, statically exported to GitHub Pages. This is not a mobile, desktop, or backend repo.

The storefront is mid-port. `npm run dev` / `npm run build` are the Next.js toolchain; the **currently shipping UI** is still the vanilla skeleton (`index.html`, `src/script.js`, `src/products.js`, `src/style.css`) until `app/` exists. Both are edited in this same tree.

## Prerequisites

- [Node.js](https://nodejs.org/) **20+** and npm 10+ (CI uses Node 20; `package-lock.json` is lockfile v3).
- Git.
- Optional: [pre-commit](https://pre-commit.com/) (`pip install pre-commit`) for the repo hooks.
- Optional: Python 3.11+ only if you will run [`scripts/make_vials.py`](../scripts/make_vials.py) or the [`git/`](../git/) automation. The site itself does not need Python. There is no `notebooks/` workspace.

## Clone and run

```bash
git clone https://github.com/ACFHarbinger/peptide-site.git
cd peptide-site
npm install
npm run dev
```

The Next.js dev server is `http://localhost:3000/` with an **empty** `basePath`. Production and the static export use `basePath: /peptide-site`.

```bash
npm run build     # next build → out/  (postbuild symlinks out/peptide-site → .)
npm start         # serve the export (npx serve out) — production-like, including /peptide-site
npm run lint      # ESLint (eslint-config-next via stack/eslint/)
npx tsc --noEmit  # TypeScript 5, strict
```

To view the **legacy** one-page skeleton without Next, open `index.html` through any static file server; it reads `src/script.js` / `src/products.js` / `src/style.css` and `assets/svgs/`.

## Dev container

[`.devcontainer/`](../.devcontainer/) is a Node.js 20 (Debian bookworm) container with Git, Python 3, pip, and `pre-commit`.

1. Install the VS Code / compatible **Dev Containers** extension.
2. Open the repo and run **Dev Containers: Reopen in Container**.
3. `postCreateCommand` runs `npm install && pre-commit install`.

Workspace path inside the container is `/workspaces/peptide-site`; processes run as the non-root `vscode` user. See [`.devcontainer/README.md`](../.devcontainer/README.md).

## Environment variables

The static export has **no runtime server env**. Anything the browser needs is inlined at build time as `NEXT_PUBLIC_*`. Nothing secret belongs there — see [`SECURITY.md`](SECURITY.md).

**Today** the vanilla storefront needs no env file. Firebase Auth and hosted Stripe checkout are confirmed for v1 but **not wired yet**; no `.env.example` is authoritative.

When those integrations land, expect build-time public config along these lines (exact names and values are **not decided** — do not invent project IDs or Payment Link URLs):

| Variable | Purpose | Secret? |
| --- | --- | --- |
| `NEXT_PUBLIC_FIREBASE_API_KEY` | Firebase web app config | No (public client config) |
| `NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN` | Firebase Auth domain | No |
| `NEXT_PUBLIC_FIREBASE_PROJECT_ID` | Firebase project | No |
| `NEXT_PUBLIC_FIREBASE_APP_ID` | Firebase app id | No |
| `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` | Stripe.js / Payment Links publishable key (`pk_…`) | No |
| Hosted Payment Link URL(s) | Redirect target(s) for checkout v1 | No (they are public URLs) |

Never add `sk_…`, webhook signing secrets, Firebase service-account JSON, or GitHub tokens to any file Next.js will bundle. Tokens for [`git/`](../git/) automation (`PROJECT_ID`, `GITHUB_TOKEN`, `GEMINI_API_KEY`) are **shell/CI secrets only**, not Next.js env.

GitHub Actions already uses Node 20. Which secrets the Firebase/Stripe builds will consume in `deploy.yml` is not decided.

## Adding or editing a product

v1 catalog data is **typed TypeScript/JSON committed to the repo** and schema-validated in CI — not a CMS, not a spreadsheet. That typed module is part of the port; **until it exists, edit [`src/products.js`](../src/products.js)**.

### Current vanilla shape (`src/products.js`)

1. Pick a category key already in `CATS`:

   | Key | Label |
   | --- | --- |
   | `glp1` | GLP-1 Agonists |
   | `growth` | Growth Hormone & Antiaging |
   | `cosmetic` | Cosmetic & Longevity |
   | `healing` | Healing & Recovery |
   | `weight-loss` | Advanced Weight Loss |
   | `blends` | Specialty Blends & NAD+ |
   | `essentials` | Lab Essentials |

2. Append a `PRODUCTS` record:

   ```js
   {n: 'Display Name', c: 'healing', i: 'icon-slug', v: [['5mg × 10 vials', 131], ['10mg × 10 vials', 191]]}
   ```

   - `n` — name shown on the card.
   - `c` — category key from `CATS`.
   - `i` — icon slug. There must be `assets/svgs/<i>.svg`.
   - `v` — variants: `[sizeLabel, priceEur]`. Prices are numbers (euro). The UI formats them.

3. If the compound needs a new vial icon, generate it with `python scripts/make_vials.py` (see that script and [`assets/icons/README.md`](../assets/icons/README.md) for the icon vs. vial split). Do not commit a raster stand-in.

4. **Do not** add per-lot COA files, invented purity figures, or lab names. The honest v1 evidence state is “documentation available on request.”

5. Keep copy Research Use Only. No dosing, no human-use claims.

When the typed catalog lands, the same fields move into schema-validated TS/JSON and CI will fail the build on an invalid record. Prefer adding the product in one commit and any new SVG in the same change.

Shipping scope is **EU27**; there is no per-SKU country list to maintain.

## Research island (Astro)

Methodology content lives under `src/frameworks/astro/` and is configured in [`astro.config.mjs`](../astro.config.mjs) (`outDir: public/astro-island`, `base` derived from `SITE_BASE`).

- v1: factual primer (what HPLC/MS results mean, how to read a COA, lab-context storage/handling). **No dosing.**
- The island is a **separate build**. Do not import Astro components into `app/` or Redux into Astro.
- After editing island sources, rebuild the island so `public/astro-island/` is up to date before `npm run build` / deploy. The exact npm script for the island build is not wired in root `package.json` yet — add one when the island sources land; do not invent a script name here.

## Pre-commit and git hooks

Two independent hook systems:

### `pre-commit` (lint / types / file hygiene)

```bash
pip install pre-commit
pre-commit install
pre-commit run --all-files   # optional manual run
```

[`.pre-commit-config.yaml`](../.pre-commit-config.yaml) runs trailing-whitespace / JSON / YAML / merge-conflict checks, **ESLint** (`npm run lint`, blocking) on `src/` and `app/`, **`tsc --noEmit`** (advisory) on TypeScript, and **ruff** (blocking) / **mypy** (advisory) on the [`git/`](../git/) Python automation workspace.

### `git/hooks` (ticket linking / board sync)

```bash
bash git/hooks/install.sh
```

This symlinks tracked `git/hooks/pre-commit` and `post-commit` into `.git/hooks/`. They validate `git/config/` JSON/YAML and (when `PROJECT_ID` / `GITHUB_TOKEN` are set) link commits to the GitHub Project board. See [`git/README.md`](../git/README.md). They are optional for storefront work.

Branch from `main` as `feature/<short-description>` or `fix/<short-description>`. Prefer [Conventional Commits](https://www.conventionalcommits.org/) (`feat(catalog): …`, `fix(cart): …`, `docs(dev): …`). Do not commit secrets. Do not commit from agent sessions unless a human asked for a commit — this doc does not require one.

## Common tasks

| Task | Command |
| --- | --- |
| Dev server | `npm run dev` |
| Production static export | `npm run build` |
| Serve the export locally | `npm start` |
| Lint | `npm run lint` |
| Typecheck | `npx tsc --noEmit` |
| Unit tests | `npm run test:unit` |
| Integration tests | `npm run test:integration` |
| All Vitest | `npm test` / `npm run test:watch` |
| Cypress (needs a running server) | `npm run build && npm start` in one terminal, then `npm run cypress:open` or `npm run cypress:run` |
| Cypress smoke only | `npm run cypress:smoke` |
| New vial SVG | `python scripts/make_vials.py` |

Test layout and what belongs at each layer: [`TESTING.md`](TESTING.md). Architecture: [`ARCHITECTURE.md`](ARCHITECTURE.md).
