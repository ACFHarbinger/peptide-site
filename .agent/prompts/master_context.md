# Master Context Prompt

You are working in the peptide site: a statically exported Next.js/React/TypeScript site for peptide research. Before making changes:

1. Read [`.agent/AGENTS.md`](../AGENTS.md) for the project's stack, module boundaries, and coding standards.
2. Follow the per-topic rules in [`.agent/rules/`](../rules/) and the workflow in [`.agent/workflows/`](../workflows/) matching the task type.
3. Remember the site is a fully static export deployed to GitHub Pages (`basePath: /peptide-site`) — no server runtime, no API routes.

If a requested change implies something the site can't do statically (a server-side secret, a database, a live API route), say so rather than inventing a workaround.
