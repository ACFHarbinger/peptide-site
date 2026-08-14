# Performance & Resource Budgets

*Last updated: August 2026.*

This document defines target performance budgets, bundle size limits, static build benchmarks, and asset guidelines for the PepCore Labs storefront deployed on GitHub Pages.

---

## Target Budgets Summary

| Category | Metric | Budget Target | Rationale |
| --- | --- | --- | --- |
| **App Shell Bundle** | Initial JS (gzipped) | ≤ 100 KB | Fast first paint across mobile and low-tier regional networks in EU27. |
| **App Shell Bundle** | Per-route chunk (gzipped) | ≤ 30 KB | Smooth cross-page navigation without large client-side route downloads. |
| **Astro Content Island** | Total JS payload (gzipped) | ≤ 150 KB | Framer Motion + Astro runtime lazy-loaded strictly on demand for research pages. |
| **Core Web Vitals** | LCP (Largest Contentful Paint) | ≤ 1.5s (Desktop) / ≤ 2.2s (Mobile) | Core SEO ranking factor and seamless user experience for catalog browsing. |
| **Core Web Vitals** | INP (Interaction to Next Paint) | ≤ 100ms | Responsive cart updates, filtering, and modal dialog interactions. |
| **Core Web Vitals** | CLS (Cumulative Layout Shift) | ≤ 0.05 | Prevents layout jumping when rendering product grids and price variants. |
| **Core Web Vitals** | TTFB (Time to First Byte) | ≤ 200ms | Delivered directly via GitHub Pages CDN edge cache. |
| **Static Build** | Page Generation (`generateStaticParams`) | ≤ 45s for 65+ products | Fast CI build times on standard GitHub Actions runners. |
| **Static Build** | Node RSS Peak Memory | ≤ 1.5 GB | Stays safely within standard CI runner memory allocations. |

---

## Asset Size & Format Guidelines

| Asset Type | Location / Source | Format & Constraints | Target Budget |
| --- | --- | --- | --- |
| **Procedural Product Vials** | `assets/svgs/` (via `scripts/make_vials.py`) | Clean vector SVG, no embedded raster data | ≤ 3 KB per SVG file |
| **UI & Brand Icons** | `assets/icons/` | Hand-crafted SVG, optimized paths | ≤ 5 KB per SVG file |
| **Product Images / Media** | `public/images/` | WebP or AVIF format with fallback srcsets | ≤ 100 KB per image |

---

## Bundle Splitting & Loading Strategy

- **Main App Shell (`app/`)**: Next.js 14 App Router statically exported with route-level code splitting. Shared layout components (header, footer, age gate modal, cart slide-over) are bundled into the main shell.
- **Astro Content Island (`src/frameworks/astro/`)**: Research primers, HPLC/MS methodology guides, and Framer Motion animations are compiled into `public/astro-island` and loaded asynchronously only on research section routes.
- **Redux State**: Lightweight slices for cart management and catalog filter state without unnecessary heavy state libraries.

---

## Verification & Instrumentation Strategy

1. **CI Build Validation**: `npm run build` verifies static output sizes and flags unexpected bundle increases.
2. **Lighthouse & Core Web Vitals**: Periodic synthetic checks against production GitHub Pages URL (`acfharbinger.github.io/peptide-site`).
3. **Asset Linting**: SVG file sizes in `assets/svgs/` and `assets/icons/` checked to ensure procedural generators or authoring tools do not introduce bloated vector code.
