# Troubleshooting Guide

*Last updated: 2026-08-14. Common build, deployment, content, authentication, and browser-test failures for peptide-site.*

---

## Table of Contents

- [Static export and GitHub Pages](#static-export-and-github-pages)
- [Assets](#assets)
- [Astro research island](#astro-research-island)
- [Catalog data](#catalog-data)
- [Firebase Authentication](#firebase-authentication)
- [Cypress](#cypress)
- [Session-specific hardware constraint](#session-specific-hardware-constraint)

---

## Static Export and GitHub Pages

### A route or link works locally but 404s on GitHub Pages

The production site is a Next.js static export under the `/peptide-site` base path; local `next dev` intentionally runs without that base path. Check `stack/next/next.config.js`, use the project’s path/base-path helper where one exists, and avoid hard-coded root-relative URLs such as `/catalog` or `/assets/...` in production-facing code. Also confirm the target can be emitted by `output: 'export'`: there is no server runtime or API route to handle a fallback request.

### A deployment serves repository files or ignores static output

Confirm the published artifact is the exported `out/` directory and includes `.nojekyll` where the deployment workflow requires it. GitHub Pages project-site URLs include `/peptide-site`; testing only at `http://localhost:3000/` does not prove production paths are correct.

### An image, font, or script is missing only after export

Check its final URL in the deployed page and make it basePath-aware. Files used by the built application belong in the appropriate public/static asset location; a source-tree-relative path that happens to resolve during development will not necessarily exist in `out/`.

## Assets

### A product image is missing or the wrong asset was edited

`assets/svgs/` contains the generated product-vial SVGs used by the catalog. `assets/icons/` contains hand-authored brand and UI assets such as the logo, favicon, cart, search, filter, and research icons. Do not substitute one directory for the other just because both contain SVG files. See `assets/icons/README.md` before changing the hand-authored icon set.

If a generated vial is wrong, check the catalog’s image identifier and the generator/source convention before editing a generated output. If the failure appears only in production, also apply the base-path checks above.

## Astro Research Island

### The Astro island does not appear, or its build output is stale

The research/lab-testing content is isolated in `src/frameworks/astro/` and built into `public/astro-island`; it is not a Next App Router page. Check the island’s build integration and referenced output paths before changing the React storefront. Clear understanding of which build owns the file is especially important when a stale `public/astro-island` artifact masks a source change.

### Framer Motion or browser APIs fail during island build/rendering

Keep animation and browser-only access inside the client-side island boundary. Verify Astro/Framer Motion version compatibility before upgrading either, and avoid importing the island’s browser code into a server-rendered or static Next build path. The initial shipped content is a factual methodology primer, not a dosing or medical-advice tool.

## Catalog Data

### A product, price, or filter is stale after a catalog change

During the current port, `src/products.js` remains the source of truth for catalog data and the legacy catalog behavior. The planned v1 target is committed, typed TypeScript/JSON catalog data validated against a schema in CI. Until that migration lands, update the real current source rather than creating a competing spreadsheet, CMS export, or data copy.

Check that a product’s category, variants, image identifier, and displayed research-only copy agree. If the UI is still stale, check browser cache and the rendered build before assuming the data edit was ignored.

### A COA or lot-evidence view lacks a document

This is expected for now: no real per-lot COAs are available. Show the honest “documentation available on request” placeholder; do not invent purity values, lot numbers, HPLC/MS output, or downloadable documents. The full evidence/lookup UI is later roadmap work.

## Firebase Authentication

### Sign-in fails, Firebase reports an unauthorized domain, or the page is blank

Firebase Authentication is a v1 requirement but may not be implemented in the current branch. Once it is, verify that the Firebase web app configuration is the intended public client configuration, that the deployed GitHub Pages domain is authorized in Firebase, and that the enabled sign-in provider matches the UI. Localhost must also be authorized when testing locally.

Keep Firebase initialization in client-side code and keep configuration compatible with a static export. A client configuration key is not a service-account secret; never add Firebase Admin credentials or private keys to the repository, bundle, or static-site environment. If auth state appears to reset, inspect the configured persistence mode and whether the base-path deployment changes callback/redirect URLs.

## Cypress

### Cypress cannot connect to the site

Cypress does not start the application server itself. Run a development server or serve an exported build in another terminal, then check the `baseUrl` and port in `test/cypress/cypress.config.js`. Local `next dev` uses no `/peptide-site` base path, so a test URL copied from GitHub Pages can fail locally.

### Cypress sees a 404, wrong page, or missing static asset

Confirm which server Cypress is targeting, wait for that server to be ready, and use URLs appropriate to its base path. For an exported-build check, ensure the `out/peptide-site` layout created by the project build/postbuild flow is present. Capture the browser console and network request URL before changing selectors or retries.

## Session-Specific Hardware Constraint

If the current session has reported failed or degraded CPU cooling, do not run a test-suite command (`npm test`, Vitest, Cypress, or equivalent) without explicit permission for that run. Read-only inspection, documentation work, and non-test sanity checks such as type checking, linting, or a build may be acceptable when the user says so.

This is a machine/session constraint to confirm with the user, not a permanent repository rule. Do not copy it into product documentation as though it were a requirement for all contributors.
