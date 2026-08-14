# Dependency Policy

*Last updated: 2026-08-14. Rules for adding, locking, reviewing, and updating dependencies used by peptide-site and its separate Python Git tooling workspace.*

---

## Table of Contents

- [Scope](#scope)
- [Node and npm](#node-and-npm)
- [Adding a Dependency](#adding-a-dependency)
- [Version and Lockfile Policy](#version-and-lockfile-policy)
- [Updates and Dependabot](#updates-and-dependabot)
- [Python Git Tooling](#python-git-tooling)

---

## Scope

The storefront is a static Next.js 14 export using React 18, TypeScript 5 in strict mode, Tailwind 3, Redux, and the Vitest/Testing Library/MSW/Cypress test toolchain. Its factual research/lab-testing section is an Astro 7 + Framer Motion island in `src/frameworks/astro/`. These are one Node/npm dependency surface, rooted at `package.json` and `package-lock.json`.

The `git/` directory is a separate Python tooling workspace. It is not application runtime code and does not share npm dependencies or a lockfile with the storefront.

## Node and npm

- Use npm for JavaScript and TypeScript dependencies. Commit changes to both `package.json` and the root `package-lock.json` together.
- CI and reproducible local installs should use `npm ci`; do not hand-edit `package-lock.json` or delete it to resolve a conflict.
- Runtime dependencies belong in `dependencies`; build, lint, type, and test tooling belongs in `devDependencies`.
- Prefer the capabilities already in the stack before adding a package. In particular, use React/Next, Redux, Tailwind, and the existing Astro island rather than introducing overlapping state, styling, animation, or site-framework libraries.
- Keep browser-only code compatible with `output: 'export'`. A dependency that requires a Node server, API route, private runtime secret, or server-side session is not suitable for the shipped static site.

## Adding a Dependency

Before proposing a package, record in the PR or change description:

1. The user-facing or developer need and why the existing stack cannot meet it.
2. Maintenance status, license compatibility, bundle/transitive dependency cost, and known security advisories.
3. Static-export and browser compatibility, including whether it reads configuration only from public build-time values.
4. A removal or fallback path when the package owns an important boundary.

Prefer mature, actively maintained packages with a small, understandable surface area. Avoid duplicate UI kits, state managers, HTTP clients, or an additional full-site framework.

Firebase Authentication is an approved v1 direction, but it is not a license to add arbitrary Firebase services. When authentication is implemented, add the client Firebase SDK only as needed, use only public Firebase web configuration in the static bundle, and document the Firebase project/setup steps separately. Do not put privileged credentials, Admin SDK code, or service-account material in the site.

Checkout v1 is a hosted redirect. A Stripe browser library may be added only if the chosen hosted-checkout flow genuinely requires it; a simple Payment Link redirect needs no payment SDK. No dependency may introduce a first-party payment backend or expose Stripe secret keys.

## Version and Lockfile Policy

- `package.json` may use compatible semver ranges (currently caret ranges); `package-lock.json` is the exact resolved dependency graph for installs and CI.
- Keep the core versions aligned: Next and its ESLint packages must remain compatible, and React, React DOM, and their type packages should be upgraded as a coordinated change when compatibility requires it.
- Treat Next, React, TypeScript, Tailwind, Redux, Astro, Framer Motion, Firebase, checkout libraries, and Cypress as higher-impact upgrades. Review their release notes and static-build implications; major upgrades need a migration plan.
- Regenerate the lockfile through npm when changing a manifest. Never commit `node_modules`, generated build output, or a second npm lockfile for the same root project.

## Updates and Dependabot

Review dependency updates for security impact, compatibility, and bundle behavior. Security fixes should be prioritized; routine minor and patch updates can be batched when their scope is clear. Major upgrades should be isolated so their migration and rollback are reviewable.

`.github/dependabot.yml` opens weekly updates for root npm dependencies, GitHub Actions, and the `git/` workspace's `uv`-managed Python dependencies. Review its pull requests against this policy and keep the lockfile update in the same change.

## Python Git Tooling

`git/pyproject.toml` declares the Python dependencies for version-control utilities. Manage that workspace with `uv`, not npm or an ad-hoc global `pip` environment. Commit `git/uv.lock` once the workspace is initialized/updated with uv, and make dependency changes from the `git/` workspace so its manifest and lockfile remain synchronized.

Python tooling dependencies should be added only for repository automation needs. They must not become a runtime requirement of the static storefront, and they must not be used to handle checkout, authentication, or catalog delivery.
