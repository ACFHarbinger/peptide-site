# Glossary

This document provides concise definitions for domain, catalog, lab-testing, and technical terms used throughout the PepCore Labs storefront project.

## Domain & Compliance Terms

| Term | Definition |
| --- | --- |
| **RUO (Research Use Only)** | Product classification indicating all compounds are supplied strictly for laboratory research and development, not for human, veterinary, or household consumption. |
| **Age Gate** | A mandatory verification prompt that requires visitors to confirm they are of legal age and acknowledge RUO terms before viewing catalog products. |
| **EU27 Scope** | The initial geographic shipping area for PepCore Labs v1, restricted to member states of the European Union. |

## Lab & Analytical Testing Terms

| Term | Definition |
| --- | --- |
| **COA (Certificate of Analysis)** | An official analytical document detailing chemical identity, purity, and batch quality; supplied on request in v1 pending full per-lot evidence UI integration. |
| **HPLC (High-Performance Liquid Chromatography)** | An analytical separation technique used to determine compound purity and quantify chemical constituents in a peptide sample. |
| **MS (Mass Spectrometry)** | An analytical spectrometry technique used alongside HPLC to verify compound identity by measuring exact mass-to-charge ratios of peptide sequences. |
| **Purity Percentage** | The quantified proportion of target compound relative to impurities (typically specified at ≥98% or ≥99%) determined via HPLC integration. |
| **Lot / Batch Number** | A unique production run code assigned to a compound synthesis lot to trace quality control logs and analytical testing history. |
| **Endotoxin Level** | Measurement of bacterial pyrogens (lipopolysaccharides) in a lyophilized sample to ensure compatibility with sensitive cellular assays. |

## E-Commerce & Catalog Terms

| Term | Definition |
| --- | --- |
| **SKU (Stock Keeping Unit)** | A unique alphanumeric code identifying a specific product item and quantity variant within the inventory catalog. |
| **Variant** | A distinct formulation, quantity, or mass option associated with a base peptide compound (e.g., 5mg vs. 10mg vial). |
| **Category** | A logical grouping of catalog items based on research application (e.g., GLP-1 Agonists, Healing & Recovery, Antiaging & GH). |
| **Hosted Checkout Redirect** | The v1 payment flow that redirects customers to an external provider (e.g., Stripe Payment Links), keeping API keys and payment secrets out of the static frontend bundle. |
| **Firebase Authentication** | Client-side user account authentication framework used to support researcher sign-in natively within a static site export. |

## Technical & Architectural Terms

| Term | Definition |
| --- | --- |
| **Static Export** | Next.js build mode (`output: 'export'`) that pre-renders all storefront pages into static HTML/JS/CSS artifacts for hosting on GitHub Pages. |
| **basePath** | The Next.js routing configuration (`/peptide-site`) required for serving static assets and routes under a GitHub Pages repository subpath. |
| **Astro Content Island** | An isolated sub-project (`src/frameworks/astro/`) built to `public/astro-island` for interactive methodology content using Astro 7 and Framer Motion. |
| **Catalog Schema** | The strict TypeScript/JSON schema used to validate catalog product data at build time, ensuring strict typing without a headless CMS. |
