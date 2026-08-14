# 7. Lab evidence (COA): honest placeholder before real per-lot documents

Date: 2026-08-14

## Status

Accepted

## Context

Multiple brainstorm reports identified per-product/per-lot Certificates of Analysis (COAs) as the strongest trust/credibility feature available to this storefront — but all warned against building a fake or decorative evidence UI. The repo owner confirmed that no real per-lot COA documents exist yet.

## Decision

Ship an honest "documentation available on request" state on product pages now, rather than a lot-lookup/COA-viewer UI backed by no real documents. Do not fabricate lab names, batch numbers, or test results. When real per-lot COAs become available, implement the full evidence pattern (summary panel, accessible document viewing, archive of superseded lots) as [ROADMAP.md](../moon/ROADMAP.md) Milestone 3.4 describes.

## Consequences

- The catalog schema ([ADR 0006](0006-catalog-typed-repo-data.md)) should still include an evidence-status field (e.g. `evidence: "on_request" | "available"`) now, so the future real-COA rollout is a data change, not a schema migration.
- Marketing/FAQ copy referencing testing must match this reality — claims implying every order ships with lot-specific HPLC/MS documentation should be corrected or removed until Milestone 3.4 ships (see [ROADMAP.md](../moon/ROADMAP.md) Milestone 3.3, claims audit).
- This ADR is superseded automatically in spirit once real COAs exist and M3.4 ships — record that as a note here or a new ADR at that time, whichever the maintainer at the time finds clearer.
