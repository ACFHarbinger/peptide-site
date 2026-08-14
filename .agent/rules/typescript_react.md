# TypeScript / React Rules

- Target TypeScript 5, `strict: true` in `tsconfig.json`. No `any` without a `// TODO` explaining why.
- Format/lint with `eslint` (`eslint-config-next`); run `npm run lint` before committing.
- Prefer function components with hooks.
- State management: Redux / react-redux for global and cross-route state (cart, catalog filters, and similar). Prefer local `useState`/`useReducer` for state that belongs to a single component — don't put that in the store.
- Unit tests live under `test/unit/`, mirroring `src/components/`'s layout, using Vitest + Testing Library. Snapshot tests are a last resort, not a default. Tests spanning more than one component (e.g. anything through `ClientLayoutWrapper`) belong in `test/integration/` instead, mocking any network calls with MSW.
- Remember this is a static export (`output: 'export'`): no API routes, no server components that need a runtime, no browser-only API calls outside `useEffect`/client components.
- Product data is a catalog (categories + products + variant pricing), currently defined in `src/products.js`. Do not introduce a Markdown content-section model (`lib/markdown.ts`, `app/content/<section>/`) — this is a product catalog, not a blog/docs site. As the Next.js port proceeds, move that catalog into a typed TypeScript module rather than growing the JS file.
