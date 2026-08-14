# 3. Astro + Framer Motion island for research content, isolated from the app shell

Date: 2026-08-14

## Status

Accepted

## Context

The site needs a research/lab-testing content section (methodology explainers, later interactive tools) that benefits from Astro's content-focused rendering and Framer Motion's animation primitives. The main storefront app shell (catalog, PDP, cart, checkout) has different priorities — small JS payload, Redux state, static export compatibility — and shouldn't pay for Astro/Framer Motion's weight on every route.

## Decision

The research content section lives in `src/frameworks/astro/`, builds independently to `public/astro-island`, and is linked to from the main Next.js app (e.g. product detail pages linking to `/research#hplc`) rather than sharing a runtime, component tree, or state store with it. Framer Motion is a dependency of the island build, not the main app shell.

## Consequences

- The island can evolve its own content/interaction model (see [ROADMAP.md](../moon/ROADMAP.md) Milestone 3) without touching cart/checkout code.
- Any data the island needs from the catalog (e.g. linking a product to its methodology section) must be passed via a stable, simple contract (a slug/anchor convention) — not a shared JS module that would couple the two builds.
- The main app's JS budget is not affected by Framer Motion or Astro's runtime.
