# AGENTS.md - Instructions for Coding Assistant LLMs

[![Next.js](https://img.shields.io/badge/Next.js-14-000000?logo=nextdotjs&logoColor=white)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-18-61DAFB?logo=react&logoColor=white)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3-06B6D4?logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![Astro](https://img.shields.io/badge/Astro-7-BC52EE?logo=astro&logoColor=white)](https://astro.build/)

> **Purpose**: Authoritative reference for AI assistants (Claude, GPT, Gemini, Grok, Copilot, etc.) working in this repository.

## Table of Contents

- [1. Project Overview](#1-project-overview)
- [2. Technical Stack](#2-technical-stack)
- [3. Module Boundaries](#3-module-boundaries)
- [4. Key Commands](#4-key-commands)
- [5. Coding Standards](#5-coding-standards)
- [6. Content Constraints](#6-content-constraints)
- [7. Known Constraints](#7-known-constraints)
- [8. Multi-Agent Workflow](#8-multi-agent-workflow)

## 1. Project Overview

**PepCore Labs** — a research-peptide e-commerce storefront. Sells GLP-1 agonists, growth hormone/antiaging compounds, cosmetic/longevity peptides, healing & recovery products, weight-loss stacks, NAD+/specialty blends, and lab essentials to qualified researchers in the EU. All products are **Research Use Only** — not for human, veterinary, or household use; the site enforces an age gate and carries that framing throughout.

Deployed to GitHub Pages at
[acfharbinger.github.io/peptide-site](https://acfharbinger.github.io/peptide-site/).

The site is mid-rebuild: a static HTML/CSS/vanilla-JS skeleton (`index.html`, `src/script.js`, `src/products.js`, `src/style.css`) is being ported into a Next.js + TypeScript + React application. Until that port lands, the vanilla files are the source of truth for catalog data, cart behavior, and the age gate — don't assume `app/` routes or React components exist yet unless you've just added them.

## 2. Technical Stack

| Component | Specification | Notes |
| --- | --- | --- |
| Next.js | 14 (App Router, `output: 'export'`) | Static export deployed to GitHub Pages, `basePath: /peptide-site` |
| React / TypeScript | 18 / 5 | `strict: true` in `tsconfig.json` |
| Styling | Tailwind CSS 3 | Config in `tailwind.config.js` |
| State | Redux / `react-redux` | Cart, catalog filters, other cross-route state. Local component state stays in `useState`/`useReducer` |
| Research content | Astro 7 + Framer Motion | `src/frameworks/astro/` → built to `public/astro-island`, kept separate from the main React app shell |
| Forms | `@tanstack/react-form` | |
| Unit tests | Vitest + Testing Library | `test/unit/`, mirroring `src/components/` |
| Integration tests | Vitest + Testing Library + MSW | `test/integration/` |
| E2E / smoke tests | Cypress | `test/cypress/e2e/`, `test/cypress/smoke/` |
| Repo automation | Python 3.11+, managed via `uv` | `git/` — commit-ticket linking, GitHub Project board sync. Not a data-science/notebooks workspace |

## 3. Module Boundaries

- `app/` — Next.js App Router: routes and layouts for the storefront (catalog, product, cart, checkout-adjacent pages). Doesn't exist yet — this is where the vanilla `index.html`/`script.js` logic is being ported to.
- `src/` — during the port: the legacy vanilla skeleton (`script.js`, `products.js`, `style.css`) plus `src/frameworks/astro/` (the Astro + Framer Motion research/content island). After the port: React components, Redux store/slices, hooks, and utilities consumed by `app/`.
- `assets/svgs/` — the ~65 procedurally-generated product "vial" icon SVGs (from `scripts/make_vials.py`). `assets/icons/` — hand-authored brand/UI icons (favicon, README banner, cart/search/filter/verified-research icons); see `assets/icons/README.md`.
- `stack/` — `next/next.config.js` and `eslint/eslint.config.js`, re-exported at the repo root (`next.config.js`, `eslint.config.js`) so tooling finds them in the default location while the source of truth stays organized here.
- `infra/` — optional self-host tooling only: `docker/`, `nginx/`, `ansible/`, `terraform/`. Not used by the default GitHub Pages workflow. `infra/docker/` and `infra/ansible/` currently hold an inert placeholder for a possible future orders/checkout API backend — no such backend exists yet.
- `git/` — local git automation (Python/`uv` workspace): pre-commit-adjacent hooks, commit→ticket linking, GitHub Project board sync. See `git/README.md`.
- `.devcontainer/` — Node.js 20 dev container.
- `scripts/make_vials.py` — one-off generator for the procedural product SVGs in `assets/svgs/`; not part of the site's runtime.

There is **no** `notebooks/` Python workspace and **no** Markdown-driven content system (`lib/markdown.ts`, `app/content/<section>/`) in this repo — if you see a rule, prompt, or doc referencing either, it's stale; flag it.

## 4. Key Commands

| Command | Purpose |
| --- | --- |
| `npm run dev` | Local dev server |
| `npm run build` | Static export to `out/` |
| `npm run lint` | ESLint (Next.js config) |
| `npm test` / `npm run test:watch` | Vitest: unit (`test/unit/`) + integration (`test/integration/`) |
| `npm run cypress:run` / `npm run cypress:smoke` | Cypress e2e/smoke (against a running build/dev server) |
| `python scripts/make_vials.py` | Regenerate/add procedural product vial SVGs into `assets/svgs/` |

## 5. Coding Standards

- Follow the per-topic rules in [`.agent/rules/`](rules/) and the matching workflow in [`.agent/workflows/`](workflows/) for the task type.
- Prefer small, reviewable diffs. Do not reformat files unrelated to the change.
- New components get a Vitest unit test in `test/unit/`; multi-component interactions get an integration test in `test/integration/` (mock network calls with MSW); new user-facing flows get a Cypress spec in `test/cypress/e2e/`.
- Never commit secrets. This site has no runtime secrets today — flag it clearly if a change would introduce one.

## 6. Content Constraints

This is a research-use storefront, not a general content/blog site:

- Never introduce human-dosing instructions, medical claims, or language implying products are approved/safe for human consumption.
- Preserve the existing "Research Use Only" / EU / age-gate framing across the catalog, cart, and the Astro research section.
- Treat substantial new marketing/product copy as something to flag for review rather than freelance extensively on — see `.agent/messages/chatgpt_subagent_delegation.md` for delegating draft research copy.

## 7. Known Constraints

- The site is a fully static export (`output: 'export'`) — no server-side code, API routes, or runtime environment variables beyond the build-time base path.
- Production `basePath` is `/peptide-site` (GitHub Pages project site). Local `next dev` uses an empty basePath so `http://localhost:3000/` works. A rename requires updating `stack/next/next.config.js`, the `postbuild` symlink, the Astro `base`, Cypress/CI wait-on URLs, and any `basePath` consumers.
- **Hardware**: if you're told the machine's CPU cooling is degraded/unreliable, never run a test-suite command (`npm test`, `vitest`, `cypress run`, etc.) without explicit go-ahead for that specific run — building/dev-server/typecheck are fine. Check with the user for current hardware status if unsure; this constraint is session-specific, not a permanent repo rule, but apply it whenever it's been stated.

## 8. Multi-Agent Workflow

This repo is worked on by multiple coding agents (Claude, Grok, Codex/ChatGPT, Gemini). See [`.agent/messages/`](messages/) for each tool's delegation protocol and invocation syntax. General rule of thumb: Gemini for design/art and SVG icon work (`assets/icons/`), Grok/Codex for substantial multi-file implementation, ChatGPT for research-copy drafting subject to §6. Give any delegated agent full standalone context — it does not share your conversation.
