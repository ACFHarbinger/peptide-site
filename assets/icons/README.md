# PepCore Labs — Icon System Documentation

This directory contains hand-authored, vector-based SVG assets for the **PepCore Labs** research-peptide storefront and repository.

---

## 🎨 Design Language & Visual System

The icon system is designed around a **clinical, scientific, modern, and trustworthy** aesthetic. It reflects a high-specification laboratory supply and biotech brand (Research Use Only, EU-based, HPLC/MS purity-focused).

### 1. Palette Specifications

| Token Name | Hex Code | Purpose / Intended Usage |
| :--- | :--- | :--- |
| **Deep Slate** | `#0F172A` | Primary line color, dark backgrounds, high-contrast structural text |
| **Clinical Cyan** | `#0284C7` | Core brand identity blue, active states, outer boundary highlights |
| **Sky Glow** | `#38BDF8` | Molecular nodes, accent dots, dark-mode highlight text |
| **Bio Teal** | `#0D9488` | Active peptide bonds, liquid meniscus lines, laboratory accents |
| **Purity Mint** | `#10B981` / `#34D399` | Verification checkmarks, high-purity badges, success states |
| **Cool Slate Gray** | `#64748B` / `#94A3B8` | Secondary labels, metadata borders, muted line work |
| **Card Slate** | `#1E293B` / `#090D16` | Bounded container fills for hero banners |

### 2. Geometry & Constraints

* **UI Chrome Icons**: 24×24 viewBox, `fill="none"`, `stroke-width="2"`, `stroke-linecap="round"`, `stroke-linejoin="round"`. Default stroke color is `#0F172A` (or overridden via CSS `currentColor`).
* **Brandmark**: 64×64 viewBox, geometric hexagon perimeter + interlocking peptide bond 'P' emblem with 3.5px atomic nodes. Scalable to 16px, 32px favicons.
* **Hero Banner**: 800×200 viewBox, bounded squircle card (`rx="14"`), incorporating brandmark, molecular lattice background, and specification pills.

---

## 📁 File Directory & Descriptions

| File Name | Category | Intended Usage | Description |
| :--- | :--- | :--- | :--- |
| [`brandmark.svg`](brandmark.svg) | Brandmark / Favicon | Site header logo, favicon (16-32px), favicon.ico source | Abstract geometric hexagonal frame with peptide chain nodes forming a stylized "P" emblem. |
| [`logo-card.svg`](logo-card.svg) | README Logo Card | Opening image at the top of `README.md` | White rounded-rect card (520×380) with the brandmark and a "PEPCORE LABS" wordmark lockup, matching the boxed-logo convention used across other repos. |
| [`readme-hero.svg`](readme-hero.svg) | README Banner | GitHub repo README header (Universal theme) | Wide 800x200 hero banner with brand mark, molecular grid, and RUO/purity specification pills. |
| [`readme-hero-dark.svg`](readme-hero-dark.svg) | README Banner | GitHub README header (Dark Mode) | Optimized dark slate background variant with glowing teal and cyan accents. |
| [`readme-hero-light.svg`](readme-hero-light.svg) | README Banner | GitHub README header (Light Mode) | Optimized light off-white background variant with slate and deep blue accents. |
| [`cart.svg`](cart.svg) | UI Icon | Storefront header & checkout cart button | 24x24 line icon representing a shopping cart / lab specimen basket. |
| [`search.svg`](search.svg) | UI Icon | Search input bar & catalog lookup | 24x24 line icon of a precise magnifying glass. |
| [`verified-research.svg`](verified-research.svg) | UI Icon | RUO age-gate modal & purity guarantee badge | 24x24 shield icon with a bio-teal checkmark inside for laboratory compliance. |
| [`filter.svg`](filter.svg) | UI Icon | Catalog category filtering & sorting controls | 24x24 line icon with precision adjustment sliders. |
| [`flask.svg`](flask.svg) | UI Icon | Product purity & HPLC/MS lab report link | 24x24 line icon of an Erlenmeyer flask with fluid level line and active bubble. |

---

## 🛠 Guidelines for Adding New Icons

When adding new icons to `assets/icons/`:
1. Use clean vector paths authored in code (no raster images or vectorizer cruft).
2. Always supply a fluid `viewBox` (e.g., `viewBox="0 0 24 24"`) so icons scale properly.
3. Keep stroke weight consistent (2px for 24x24 canvas) and use rounded line caps/joins.
4. Stick to the defined color palette tokens above.
