# peptide-site Documentation

Welcome to the documentation for **peptide-site** (PepCore Labs) — a research-peptide e-commerce storefront, statically exported with Next.js and deployed to GitHub Pages. See the repo root [`README.md`](../README.md) for a quick overview, product/repo context, and the getting-started commands.

This portal is built with [MkDocs Material](https://squidfunk.github.io/mkdocs-material/). Serve it locally with:

```bash
pip install mkdocs mkdocs-material
mkdocs serve --config-file docs/mkdocs.yml
```

See [`ROADMAP.md`](moon/ROADMAP.md) for the current product roadmap and phased delivery plan.

## Where to start

- [Architecture](ARCHITECTURE.md) — system design, the Next.js/Astro boundary, static-export constraints
- [Development](DEVELOPMENT.md) — local setup, environment variables, adding a product to the catalog
- [Testing](TESTING.md) — the Vitest/MSW/Cypress test pyramid and what belongs where
- [Glossary](GLOSSARY.md) — domain terms (catalog/e-commerce and research-peptide specific)
- [Troubleshooting](TROUBLESHOOTING.md) — common build/export/asset-path failures and fixes
- [Dependency Policy](DEPENDENCY_POLICY.md) — how and when to add a dependency
- [Documentation Standards](DOCUMENTATION_STANDARDS.md) — where a given fact belongs (README vs `.agent/AGENTS.md` vs `docs/` vs inline comments)
- [Benchmarks](BENCHMARKS.md) — target performance budgets for the static export
- [Security](SECURITY.md) — security scope and how to report an issue
- [`moon/ROADMAP.md`](moon/ROADMAP.md) — what's planned
- [`moon/CHANGELOG.md`](moon/CHANGELOG.md) — what shipped
- [Architecture Decision Records](adr/0001-record-architecture-decisions.md) — significant, hard-to-reverse decisions
