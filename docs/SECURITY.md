# Security Policy

Security considerations for **peptide-site** (PepCore Labs): a statically exported Next.js storefront with planned **client-side Firebase Authentication** and a **hosted checkout redirect** (Stripe Payment Links or equivalent). This is not a Tauri desktop app, not a native mobile client, and not a first-party payments processor.

---

## Scope

This document covers:

- The static Next.js export (`out/`) served from GitHub Pages (`/peptide-site`)
- Browser-side storefront code (React/Redux once ported; today’s `src/script.js` included)
- The Astro research island (`public/astro-island/`) as additional public static files
- Planned Firebase Auth **client** SDK usage
- Planned hosted-checkout **redirect** (Stripe owns the card/PCI surface)
- Repository secrets, CI, and dependency updates

Out of scope for v1 (and not to be introduced without an ADR under [`docs/adr/`](adr/)):

- A first-party checkout or orders API
- Stripe secret keys, webhooks, or PaymentIntent creation on a server we run
- Firebase Admin SDK / service accounts in this repo
- Storing cardholder data anywhere in this tree

`infra/` (Docker, nginx, Ansible, Terraform) is unused optional scaffolding. If someone later stands it up, it becomes a new security surface and needs its own review — it is not the v1 model.

---

## Security model

```
┌─────────────────────────────────────────────┐
│  GitHub Pages  (public static files only)   │
│  HTML / JS / CSS / SVGs / astro-island      │
└───────────────────┬─────────────────────────┘
                    │ HTTPS
                    ▼
┌─────────────────────────────────────────────┐
│  Browser (untrusted)                        │
│  • Age gate, catalog, cart (Redux)          │
│  • Firebase Auth client SDK                 │
│  • Redirect to Stripe-hosted checkout       │
└───────────────────┬─────────────────────────┘
                    │
        ┌───────────┴───────────┐
        ▼                       ▼
 Firebase Auth / Rules     Stripe hosted page
 (Google-operated)         (Stripe-operated PCI)
```

**Everything we ship is public.** Treat the bundle as readable by any visitor. Authorization cannot be implemented by hiding a URL or a JS constant.

---

## Secrets and the static bundle

The site is `output: 'export'`. Next.js inlines `NEXT_PUBLIC_*` at **build** time. There is no server leftover to hold secrets.

| Allowed in the client bundle | Never in the repo, CI logs, or `out/` |
| --- | --- |
| Firebase *web* config (`apiKey`, `authDomain`, `projectId`, `appId`) | Firebase service-account JSON, Admin SDK credentials |
| Stripe **publishable** key (`pk_test_…` / `pk_live_…`) | Stripe **secret** key (`sk_…`), webhook signing secret |
| Hosted Payment Link URLs | GitHub tokens, `GEMINI_API_KEY`, Project board tokens |
| Public catalog JSON/TS | Anything that grants write access to a third-party account |

`NEXT_PUBLIC_*` names and the Firebase/Stripe project itself are **not decided yet**. When they are, they belong in GitHub Actions environment/variables for `deploy.yml` as non-secret public config (or secrets only if a future non-public value appears — that would already be a smell).

Rules of thumb:

- If rotating the value requires a rebuild but *not* a credential revocation at Google/Stripe, it may be public config.
- If leaking it lets someone charge, delete, or impersonate, it must never touch this codebase or the Pages artifact.
- Do not put tokens in `env/.env` committed to git. The `git/` tooling’s `GITHUB_TOKEN` / `PROJECT_ID` / `GEMINI_API_KEY` stay in the developer shell or Actions secrets; they are unrelated to the storefront bundle.

---

## Firebase Authentication

v1 accounts use the **Firebase Auth client SDK**, which is compatible with a static host.

Until a Firebase project is created, there are no Security Rules to quote. When that project exists, the following is required before shipping Auth:

- Enable only the sign-in methods you actually intend (email/password and/or a specific OAuth provider — **not decided**).
- If Firestore or Storage is added for profiles or order *references*, default rules must deny all, then allow only `request.auth != null` on that user’s own paths. A static site cannot enforce this in JS.
- Never embed a Google Cloud service account or use the Admin SDK from the storefront.
- Auth UI must not weaken the Research Use Only / age-gate framing; an account is not a medical or age credential.

Firebase **apiKey** in a web app is an identifier, not a server password. Abuse resistance is App Check / quota / Auth settings in the Firebase console — configure those in the (still unspecified) project, do not try to hide the key.

---

## Checkout and payments

v1 checkout is a **redirect to a hosted checkout** (Stripe Payment Links or equivalent).

- This repository **does not handle cards**, bank details, or 3-D Secure.
- PCI SAQ / card-data scope sits with Stripe (or the chosen host). Do not add a card `<input>` or a self-hosted payment form “just for staging.”
- The storefront may construct a URL from the cart and public config and assign `window.location`. That is the entire payment integration.
- Do not implement webhook handlers, refund APIs, or PaymentIntent creation in Next.js — those require a server and secrets, which v1 explicitly does not have.
- `infra/docker/`’s comments about an orders API are a placeholder, not an invitation to put `sk_live` in Compose files.

A successful Payment Link return to a static `/success` page is not proof of payment by itself (the visitor can hit that URL). If order fulfillment needs a guarantee, that is a later, server-side problem and an ADR — not something to fake in client JS.

---

## Other client-side surfaces

- **Age gate** (`sessionStorage` key `pepcore-age` today) is a compliance prompt, not an access-control mechanism. Anyone can clear storage or skip it. Do not store privileged data behind it.
- **Catalog** is public committed data. Do not hide unpublished SKUs by omitting them from the UI only — omit them from the committed catalog.
- **COA / lab evidence**: no per-lot documents exist. Do not upload scanned certificates, patient-adjacent data, or invented lab reports to `public/`. The honest placeholder is “documentation available on request.”
- **Astro island** is more public static files. Same CSP/secret rules as the Next.js shell. No extra origin trust.
- **XSS**: catalog names and user-facing strings must stay escaped (the vanilla `esc()` in `src/script.js` is the current pattern; React text nodes are the port’s default). Do not `dangerouslySetInnerHTML` product copy.
- **basePath** mix-ups can ship a build whose scripts 404 or, worse, load from the wrong origin. Production is always `/peptide-site` on GitHub Pages.

---

## Reporting a vulnerability

If you find a security issue in this site or its repo:

1. **Do not** open a public GitHub issue or discuss exploit details in a PR.
2. Report privately via [GitHub private vulnerability reporting](https://docs.github.com/en/code-security/security-advisories/guidance-on-reporting-and-writing-information-about-vulnerabilities/privately-reporting-a-security-vulnerability) on [`ACFHarbinger/peptide-site`](https://github.com/ACFHarbinger/peptide-site).
3. Include what is affected (Pages site, CI, Firebase once live, Payment Link construction), impact, and reproduction steps.
4. Give a reasonable window to fix before public disclosure.

There is no separate security mailing list published for this project. Customer email (`support@pepcorelabs.io`, as shown on the current footer) is **not** the vulnerability intake path.

---

## Dependency updates

Version pins, upgrade cadence, and how to add a package are defined in [`DEPENDENCY_POLICY.md`](DEPENDENCY_POLICY.md). Follow that file for routine bumps.

Practical storefront rules that will remain true even as that policy doc is rewritten:

- Commit `package-lock.json`. CI should use `npm ci`.
- Run `npm audit` (see [`.github/workflows/security.yml`](../.github/workflows/security.yml) — it currently audits at `--audit-level=high` on a weekly cron and on PRs to `main`).
- That same workflow also runs `pip-audit` against the [`git/`](../git/) automation workspace's dependencies (the only Python in this repo — there is no `notebooks/` workspace).
- High-severity issues in Next, React, Firebase client, or Stripe.js get priority. The storefront’s attack surface is almost entirely those clients plus whatever we put in the bundle.

---

## Contributor checklist

Before opening a PR, confirm:

- [ ] No `sk_`, service-account JSON, webhook secrets, or personal tokens in the diff or in `NEXT_PUBLIC_*`
- [ ] New env vars are documented as public build-time config or rejected
- [ ] No first-party card form or payment backend
- [ ] No fabricated COA / lot / lab documents
- [ ] User-controlled or catalog strings are not injected as HTML
- [ ] Firebase rules (when Auth or a database exists) deny by default
- [ ] Dependency additions follow [`DEPENDENCY_POLICY.md`](DEPENDENCY_POLICY.md)
- [ ] Research Use Only and age-gate framing are unchanged
