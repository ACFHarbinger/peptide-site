# Documentation Standards

*Last updated: 2026-08-14. Conventions for product, engineering, and assistant-facing documentation in peptide-site.*

---

## Table of Contents

- [Principles](#principles)
- [Where a Fact Belongs](#where-a-fact-belongs)
- [Markdown Conventions](#markdown-conventions)
- [Decisions, Roadmap Notes, and Comments](#decisions-roadmap-notes-and-comments)
- [Relationship to `.agent/`](#relationship-to-agent)

---

## Principles

- Write for this repository as it exists: a static research-peptide storefront, not a general e-commerce backend or medical guidance site.
- Keep research-use-only, age-gate, EU27 scope, and no-dosing/no-medical-use constraints accurate wherever they apply.
- State uncertainty plainly. Do not invent Firebase project details, checkout provider configuration, lot-specific COAs, CI implementation details, or future features.
- Prefer one authoritative location for a fact and link to it instead of duplicating it. Update documentation in the same change when behavior, a boundary, or an enduring decision changes.

## Where a Fact Belongs

| Information | Authoritative home |
| --- | --- |
| Project overview, current stack, local commands, and contributor orientation | `README.md` |
| Durable engineering, product, operational, and troubleshooting reference | `docs/` |
| Instructions an AI coding assistant must follow while modifying this repository | `.agent/AGENTS.md`, then the applicable `.agent/rules/`, workflows, or prompts |
| Non-obvious reason, constraint, or invariant local to code | An inline comment beside that code |
| Public API or exported utility behavior not clear from type and name | A concise TSDoc comment near the export |

`README.md` should stay an entry point, not become a complete specification. Put detailed policy, architecture rationale, setup diagnostics, and recurring operational knowledge in `docs/`. Do not use comments to restate obvious JSX, types, or control flow.

## Markdown Conventions

- Start each long-lived document with one `#` title and a short italicized scope/last-updated line.
- Use descriptive `##` and `###` headings, sentence-case prose, and relative links for repository content. Add a manually maintained table of contents when a document is long enough to benefit from one.
- Use fenced code blocks with a language identifier where applicable. Commands must be copyable and must say which directory they run from when that matters.
- Separate confirmed behavior from proposals. Label planned work as planned; label unavailable lab evidence as “documentation available on request” until real per-lot records exist.
- Keep examples compliant with the site’s research-only posture. Do not introduce dosing, administration, therapeutic claims, or fabricated laboratory results.

## Decisions, Roadmap Notes, and Comments

Write an ADR for a significant, durable, and hard-to-reverse choice with alternatives or tradeoffs: for example, a change to static hosting, checkout architecture, account provider, catalog ownership model, or the boundary between Next and the Astro island. An ADR records the context, decision, consequences, and supersession path.

Write a roadmap note for phased or unsettled work: the methodology primer before interactive comparison tools, full per-lot evidence once records exist, or an undecided shipping restriction beyond EU27. A roadmap note must not present planned work as shipped.

Use inline comments only when code cannot express an important reason by itself, such as why a path is basePath-aware, why a Firebase call is client-only, or why an Astro island remains isolated from the storefront shell. Remove comments made obsolete by a code change.

## Relationship to `.agent/`

`docs/` is the human-readable, durable project record. `.agent/` is the operational instruction directory for AI-assisted work: it contains `AGENTS.md`, rules, workflows, prompts, and coordination material. The two may link to one another, but they serve different audiences.

When a repository rule changes, update `.agent/` if assistants need to follow it and update `docs/` if humans need the enduring rationale or reference. Do not bury product decisions only in an assistant prompt, and do not make `docs/` a copy of every assistant workflow. If they disagree, flag and resolve the conflict rather than choosing silently.
