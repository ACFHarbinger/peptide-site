# 6. Catalog data: typed, repo-committed, CI-validated

Date: 2026-08-14

## Status

Accepted

## Context

Product data lives today in `src/products.js` as a minified, untyped array (`{n, c, i, v}` — name/category/icon/variants) with no slug, description, evidence, or compliance fields. A brainstorm across four agents converged on replacing this before building product detail pages, filters, or checkout on top of it. Three storage models were considered: typed files committed to the repo, a headless CMS, or an ops-managed spreadsheet import. The repo owner chose typed repo files.

## Decision

Product catalog data moves to typed TypeScript/JSON files committed to the repository (e.g. `src/catalog/products.ts` or `data/products/*.json`), covering at minimum: product identity (slug, name, category, description), variants/SKUs (label, unit count, price in integer cents), evidence metadata (COA status — see [ADR 0007](0007-coa-placeholder-first.md)), and compliance metadata (RUO flag, any restriction notes). Schema correctness (required fields, unique slugs/SKUs, valid category references) is validated in CI.

## Consequences

- Editing the catalog is a normal pull request, reviewable like code — appropriate at ~65 products today.
- If catalog size or edit frequency grows beyond what's comfortable for repo-based editing (e.g. an ops team needs to update prices without a PR), that's a signal to revisit this ADR with a CMS or import-pipeline design — not to route around it ad hoc.
- Pricing must be stored as integer cents, not display-formatted strings, to avoid the float/locale-formatting bugs present in the current vanilla skeleton.
