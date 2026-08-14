# 4. Checkout v1: hosted checkout redirect, no first-party payment backend

Date: 2026-08-14

## Status

Accepted

## Context

peptide-site is a static export ([ADR 0002](0002-static-export-deployment.md)) with no server to safely hold payment secrets or process cards. A multi-agent brainstorm (see `.agent/cache/` session history) proposed three options: enquiry-only cart (manual fulfillment), a hosted checkout redirect (Stripe Payment Links or equivalent), or standing up the `infra/docker` placeholder backend for a real first-party order system. The repo owner chose the hosted-redirect option.

## Decision

Checkout v1 uses a hosted checkout redirect (e.g. Stripe Payment Links) via a build-time SKU → price-ID mapping. Only a publishable/client key is present in the static bundle; the checkout provider owns payment handling, PCI scope, and (if used) webhook processing on their infrastructure, not ours.

## Consequences

- No payment secret is ever committed to or served from this repository.
- Order fulfillment/stock/tax are only as automated as the hosted provider's tooling allows; the roadmap (Milestone 2) treats this as an acceptable v1 tradeoff, not a final state.
- If a future need (webhooks into custom logic, real-time stock, wholesale invoicing) requires a first-party backend, that requires a new ADR superseding this one and likely superseding [ADR 0002](0002-static-export-deployment.md) as well.
