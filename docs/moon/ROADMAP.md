# peptide-site — Roadmap

[![Next.js](https://img.shields.io/badge/Next.js-14-000000?logo=nextdotjs&logoColor=white)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-18-61DAFB?logo=react&logoColor=white)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)

> **Status**: Active — pre-port. No `app/` routes exist yet; the vanilla skeleton (`index.html`, `src/script.js`, `src/products.js`) is still the live behavior.
> **Origin**: This roadmap replaces a placeholder that described an unrelated project. It was drafted from a multi-agent brainstorm (Claude, Grok, Codex, Gemini) plus product decisions made 2026-08-14 with the repo owner — see [`docs/adr/`](../adr/) for the individual decision records.

Status markers: ✅ Done · 🚧 In Progress · 📋 Pending · 🔬 Research/undecided detail · ⏸ Deferred

---

## Confirmed product decisions (binding until superseded by a new ADR)

| Decision | Choice | ADR |
| --- | --- | --- |
| Checkout v1 | Hosted checkout redirect (Stripe Payment Links or equivalent) — no first-party payment backend, no secrets in the static bundle | [0004](../adr/0004-checkout-hosted-redirect.md) |
| Accounts | Yes, from v1, via **Firebase Authentication** (client SDK, static-export compatible) | [0005](../adr/0005-accounts-firebase-auth.md) |
| Catalog data | Typed TypeScript/JSON files committed to the repo, schema-validated in CI | [0006](../adr/0006-catalog-typed-repo-data.md) |
| COA / lab evidence | No real per-lot documents exist yet — ship an honest "documentation available on request" placeholder now; build the full evidence UI once real COAs exist | [0007](../adr/0007-coa-placeholder-first.md) |
| Research content section | Astro + Framer Motion island, phased: factual methodology primer first, interactive tools (comparison, calculators) later | — (scope note, not architectural) |
| Shipping/market scope v1 | All EU27 | — (operational, revisit before launch) |

These came out of convergent recommendations across all four brainstorm reports plus the repo owner's explicit choices; don't re-litigate them here — open a new ADR to change one.

---

## What's already true (baseline, as of this rewrite)

- ~65 products across 7 categories, ~130 SKUs (size/price variants), defined in `src/products.js` as a minified `{n,c,i,v}` array with no slug, description, or evidence fields.
- No product detail pages — every catalog card and best-seller links to `#catalog`.
- Cart is in-memory only (no `localStorage`), checkout button is inert, the "15% off" signup never issues a code.
- `next.config.js` (re-exported from `stack/next/next.config.js`) does not yet set `output: 'export'` or `basePath: '/peptide-site'`. `app/` doesn't exist. `src/frameworks/astro/` doesn't exist.
- Age gate is a session-only modal ("I am 18"), no persisted attestation.

The first roadmap milestone is making the declared stack (Next.js static export + typed catalog + real routes) actually exist — not adding features on top of the vanilla skeleton.

---

## Milestone 1 — Shopable static site

Goal: every product has a real URL, the catalog is typed data, the cart survives a refresh. No payment yet.

| # | Item | Status |
| --- | --- | --- |
| M1.1 | Real `next.config.js`: `output: 'export'`, `basePath`/`assetPrefix` from `SITE_BASE`, `images.unoptimized: true` | 📋 |
| M1.2 | `app/layout.tsx` + `app/page.tsx` rendering the ported home page under `/peptide-site` | 📋 |
| M1.3 | Typed catalog module (`src/catalog/` or `data/products/`): product family / variant-SKU / evidence-placeholder / compliance metadata, per [ADR 0006](../adr/0006-catalog-typed-repo-data.md). Integer-cents pricing, real slugs, schema validated in CI | 📋 |
| M1.4 | Age gate as a client component: persisted consent (version + timestamp), not just `sessionStorage` | 📋 |
| M1.5 | `/catalog` route with category + text filter, sort; filter state mirrored to the URL query string | 📋 |
| M1.6 | Product detail pages: `generateStaticParams()` over all catalog slugs. Variant picker, category context, related products, RUO notice near the purchase decision, evidence placeholder ("documentation available on request") | 📋 |
| M1.7 | Cart: SKU-keyed Redux state, persisted to `localStorage`, drawer + `/cart` page, survives reload and cross-route navigation | 📋 |
| M1.8 | Legal page stubs: Privacy, Terms, Shipping & Returns, Research Use Only — real routes, not `#` links | 📋 |
| M1.9 | Baseline CI: lint, typecheck, catalog schema validation, unit tests, static export build on every PR | 📋 |

**Explicitly deferred from M1**: photography (keep the procedural vial SVGs), i18n beyond English, any inventory/stock UI (don't imply real-time stock before there's a real stock system).

---

## Milestone 2 — Accounts and checkout

Goal: a researcher can create an account and actually pay.

| # | Item | Status |
| --- | --- | --- |
| M2.1 | Firebase Authentication integration (client SDK) — sign-up/sign-in, session state in Redux | 📋 |
| M2.2 | Account-gated surfaces: order history (once orders exist), saved/research list. Keep scope narrow — no wholesale-tier accounts yet | 📋 |
| M2.3 | Checkout page (`@tanstack/react-form`): identity, ship-to country (EU27), required RUO + age + "qualified researcher" attestations (timestamped), order notes, cart summary | 📋 |
| M2.4 | Hosted checkout redirect integration (Stripe Payment Links or equivalent) — build-time SKU → price-ID map, publishable key only, no secret in the bundle | 📋 |
| M2.5 | Order confirmation state (post-redirect return page) — even if fulfillment itself stays manual/semi-manual | 📋 |
| M2.6 | VAT/pricing policy decision: confirm listed EUR prices are gross (VAT-inclusive) before this milestone ships | 🔬 |

**Explicitly deferred from M2**: real-time stock sync, wholesale accounts, a first-party orders backend (the `infra/docker` placeholder stays inert unless a real operational need appears — see [ADR 0004](../adr/0004-checkout-hosted-redirect.md)).

---

## Milestone 3 — Trust layer: research content + evidence

Goal: the site earns credibility on testing/purity, not just claims it.

| # | Item | Status |
| --- | --- | --- |
| M3.1 | Astro + Framer Motion island, phase 1 — factual methodology primer: what HPLC % means, what MS confirms, endotoxin-data caveats, how a lot maps to a COA (even while COAs are placeholder), storage handling framed as lab practice, not protocol | 📋 |
| M3.2 | Link each PDP's "testing" line into the relevant primer section (`/research#hplc`, etc.) | 📋 |
| M3.3 | Claims audit: verify or delete every hardcoded trust claim in the ported copy ("Trusted by 10,000+", "99%+ every batch", same-day cutoff time) | 📋 |
| M3.4 | Once real per-lot COAs exist: evidence UI per [ADR 0007](../adr/0007-coa-placeholder-first.md) — summary panel (lot, date, method, purity, lab, status), accessible document viewing, archive for superseded lots | 🔬 blocked on real documents |
| M3.5 | Astro island, phase 2 — interactive tools: compound comparison matrix, solubility/storage reference. Scope after phase 1 ships and is stable | ⏸ |

---

## Milestone 4 — Depth, SEO, and polish

| # | Item | Status |
| --- | --- | --- |
| M4.1 | Structured data: `Product`/`Offer` JSON-LD on PDPs (no price/availability claims that can't be kept accurate), `FAQPage` on `/faq`, sitemap + robots | 📋 |
| M4.2 | Self-host fonts (stop hitting Google Fonts from the live origin) | 📋 |
| M4.3 | Curated combo/stack pages using existing multi-compound SKUs (e.g. Glow, Klow, Cagri+Sema) plus a lab-essentials upsell (BAC water) on lyophilized PDPs — not an arbitrary dosage-ratio builder | 📋 |
| M4.4 | Accessibility pass: keyboard nav + reduced-motion on the Astro island, screen-reader acceptance criteria for age gate/filters/cart/document viewer | 📋 |
| M4.5 | Cypress coverage for the 5 highest-risk paths: age-gate→browse→PDP; add-to-cart persistence; evidence/placeholder viewing; reduced-motion+keyboard nav; checkout-redirect handoff including error state | 📋 |

---

## Explicitly not on this roadmap (revisit only with a new ADR)

- Real-time inventory / stock sync, a first-party orders backend beyond the hosted-checkout redirect
- Wholesale accounts, loyalty/points, reviews
- A dosage-ratio "stack builder" (medical-adjacent risk — curated combo pages only, see M4.3)
- Headless CMS or spreadsheet-driven catalog authoring (superseded by [ADR 0006](../adr/0006-catalog-typed-repo-data.md))
- i18n beyond English
- Replacing the procedural vial SVGs with photography

---

## Immediate execution order

1. M1.1–M1.3 (boot the real Next.js export + typed catalog) — everything else depends on this.
2. M1.4–M1.7 (age gate, catalog route, PDPs, persistent cart) in that order — each should leave a clickable site.
3. M1.8–M1.9 (legal stubs, CI) before M2 starts.
4. M2 (accounts + checkout) only once M1 is stable — this is the milestone with real compliance/legal surface area.
5. M3.1–M3.3 can run in parallel with M2 (different files, no dependency).
6. M4 after M2 ships.

Completed items move to [`CHANGELOG.md`](CHANGELOG.md).
