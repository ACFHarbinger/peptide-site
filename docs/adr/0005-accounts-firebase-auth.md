# 5. Accounts via Firebase Authentication

Date: 2026-08-14

## Status

Accepted

## Context

The repo owner confirmed customer accounts are wanted from v1 (order history, saved research lists), not deferred. The site is a static export ([ADR 0002](0002-static-export-deployment.md)), so any auth solution must work via a client-side SDK against a hosted provider rather than a first-party session backend. Clerk, Auth0, Supabase Auth, and Firebase Authentication were considered; the repo owner chose Firebase.

## Decision

Use Firebase Authentication (client SDK) for account creation and sign-in. Auth/session state is held in Redux alongside other cross-route state. Firebase config values (API key, project ID, etc.) are public client-side identifiers, not secrets, and are safe to embed as build-time `NEXT_PUBLIC_*` env vars.

## Consequences

- Account-gated features (order history, saved lists) depend on Firebase's client SDK being initialized before those routes render.
- If order history needs to persist structured data (not just auth identity), a Firestore (or similar) data store becomes a natural follow-on decision — not yet made; track as a future ADR when Milestone 2 reaches that point.
- No server-side session validation exists; any future feature that needs to trust a user's identity server-side (e.g. a first-party backend) will need Firebase Admin SDK verification on that backend — irrelevant until/unless [ADR 0002](0002-static-export-deployment.md) is superseded.
