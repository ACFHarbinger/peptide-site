# Changelog

All notable changes to this project are documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Changed

- Replaced scaffolding bulk-copied from unrelated template repos (a dev-tooling showcase site, a mobile game, a desktop app) across `package.json`, `.devcontainer/`, `infra/`, `.agent/`, `README.md`, and `docs/` with content accurate to peptide-site.
- Reorganized `assets/`: procedurally-generated product icons moved to `assets/svgs/`; added a new hand-authored brand/UI icon set in `assets/icons/`.
- Drafted [`ROADMAP.md`](ROADMAP.md) from a multi-agent brainstorm and product decisions recorded in [`docs/adr/`](../adr/).

### Removed

- `docs/website/` — an unrelated, fully-built doc-site application (including committed `node_modules`/build output) with no relevance to this project.

---

_Prior entries in this file described an unrelated mobile game project and have been removed. History for this repository's actual work is in `git log`._
