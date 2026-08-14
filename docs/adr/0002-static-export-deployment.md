# 2. Static export deployed to GitHub Pages

Date: 2026-08-14

## Status

Accepted

## Context

peptide-site needs a low-maintenance, low-cost deployment path for a product catalog storefront with no server-side secrets today. The existing static HTML/CSS/JS skeleton already deploys to GitHub Pages.

## Decision

Next.js 14 (App Router) with `output: 'export'`, deployed as a static site to GitHub Pages under `basePath: /peptide-site`. No API routes, no server components requiring a Node runtime, no server-side secrets in the deployed bundle.

## Consequences

- Any feature requiring a real backend (payment processing, order storage, real-time inventory) must integrate via a third-party hosted service reachable from the client (see [ADR 0004](0004-checkout-hosted-redirect.md), [ADR 0005](0005-accounts-firebase-auth.md)), not a first-party API route.
- `infra/docker`'s placeholder orders-API stub stays inert unless a future ADR supersedes this one and moves the site off a pure static export.
- Every new page must work with `generateStaticParams()` — no `getServerSideProps`-equivalent dynamic rendering.
