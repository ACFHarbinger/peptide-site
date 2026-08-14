# Docker

> **Optional.** The static site needs none of this — it exists only to
> support an optional lightweight backend API (e.g. orders, inventory, checkout).
> Delete `infra/docker/` if no backend service is needed.

## Quick start

```bash
cp .env.example .env
docker compose -f infra/docker/docker-compose.yml up --build
```

## Files

| File | Purpose |
| --- | --- |
| `Dockerfile` | Multi-stage build for the optional backend service (a minimal REST API — swap in whatever stack you actually build; the repo ships no backend source yet, only the scaffolding) |
| `docker-compose.yml` | Local dev stack: backend + PostgreSQL (orders/inventory) + Redis (rate limiting/session cache) |
| `docker-compose.prod.yml` | Production overrides (apply with `-f infra/docker/docker-compose.yml -f infra/docker/docker-compose.prod.yml`) |
| `entrypoint.sh` | Waits for the database before exec'ing the container command |

## Notes

- Build context is the **repository root** — the Dockerfile expects a `backend/` (or similar) source directory that does not exist yet. Add it before building, or delete `infra/docker/` if you never need a backend.
- The frontend talks to this backend only through REST/GraphQL APIs — never expose database credentials or secrets to the static client export.

