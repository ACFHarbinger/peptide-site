'use client';

import React, { useEffect, useMemo, useState } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import type { CategorySlug, Product } from '../catalog/types';
import { CATEGORIES } from '../catalog/categories';
import { ProductCard } from './ProductCard';

export type CatalogSort = 'name' | 'price-asc' | 'price-desc';

export interface CatalogGridProps {
  products: Product[];
  onAddToCart?: (sku: string) => void;
}

const CATEGORY_SLUGS = new Set<string>(CATEGORIES.map((c) => c.slug));

function parseCategory(value: string | null): CategorySlug | 'all' {
  if (value && CATEGORY_SLUGS.has(value)) return value as CategorySlug;
  return 'all';
}

function parseSort(value: string | null): CatalogSort {
  if (value === 'price-asc' || value === 'price-desc' || value === 'name') return value;
  return 'name';
}

function matchesQuery(product: Product, query: string): boolean {
  if (!query) return true;
  const haystack = [product.name, product.slug, ...(product.aliases ?? [])]
    .join(' ')
    .toLowerCase();
  return haystack.includes(query.toLowerCase());
}

function minVariantPrice(product: Product): number {
  return Math.min(...product.variants.map((v) => v.priceCents));
}

function sortProducts(products: Product[], sort: CatalogSort): Product[] {
  const next = [...products];
  if (sort === 'price-asc') {
    next.sort((a, b) => minVariantPrice(a) - minVariantPrice(b) || a.name.localeCompare(b.name));
  } else if (sort === 'price-desc') {
    next.sort((a, b) => minVariantPrice(b) - minVariantPrice(a) || a.name.localeCompare(b.name));
  } else {
    next.sort((a, b) => a.name.localeCompare(b.name));
  }
  return next;
}

function buildQueryString(q: string, cat: CategorySlug | 'all', sort: CatalogSort): string {
  const params = new URLSearchParams();
  if (q) params.set('q', q);
  if (cat !== 'all') params.set('cat', cat);
  if (sort !== 'name') params.set('sort', sort);
  const encoded = params.toString();
  return encoded ? `?${encoded}` : '';
}

export const CatalogGrid: React.FC<CatalogGridProps> = ({ products, onAddToCart }) => {
  const router       = useRouter();
  const pathname     = usePathname();
  const searchParams = useSearchParams();

  const urlQuery       = searchParams.get('q') ?? '';
  const activeCategory = parseCategory(searchParams.get('cat'));
  const sort           = parseSort(searchParams.get('sort'));

  const [queryInput, setQueryInput] = useState(urlQuery);

  useEffect(() => { setQueryInput(urlQuery); }, [urlQuery]);

  const replaceFilters = (next: { q?: string; cat?: CategorySlug | 'all'; sort?: CatalogSort }) => {
    const q       = next.q    !== undefined ? next.q    : urlQuery;
    const cat     = next.cat  !== undefined ? next.cat  : activeCategory;
    const nextSort= next.sort !== undefined ? next.sort : sort;
    router.replace(`${pathname}${buildQueryString(q, cat, nextSort)}`, { scroll: false });
  };

  const clearFilters = () => {
    setQueryInput('');
    router.replace(pathname, { scroll: false });
  };

  const filtered = useMemo(() => {
    const matches = products.filter(
      (p) =>
        (activeCategory === 'all' || p.category === activeCategory) &&
        matchesQuery(p, queryInput),
    );
    return sortProducts(matches, sort);
  }, [products, activeCategory, queryInput, sort]);

  const countLabel = `${filtered.length} product${filtered.length === 1 ? '' : 's'}`;

  const pillBase   = 'rounded-full px-4 py-1.5 text-[11px] font-semibold tracking-wide transition-colors duration-150';
  const pillActive = 'bg-[var(--accent)] text-white';
  const pillIdle   = 'border border-[var(--border)] text-[var(--text-muted)] hover:border-[var(--accent)]/40 hover:text-[var(--text)]';

  return (
    <section className="bg-[var(--bg-surface)] py-20 scroll-mt-28" id="catalog">
      <div className="max-w-[1180px] mx-auto px-6">

        {/* Section header */}
        <div className="mb-8">
          <span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[var(--accent)]">
            Full Catalog
          </span>
          <h1 className="mt-2 text-[1.9rem] sm:text-[2.2rem] font-bold tracking-[-0.02em] text-[var(--text)]">
            Shop all research peptides
          </h1>
          <p className="mt-1 text-[13.5px] text-[var(--text-muted)]">
            {countLabel} — for laboratory research use only.
          </p>

          {/* Controls */}
          <div className="mt-6 flex flex-col gap-4">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
              {/* Search */}
              <div className="flex max-w-md flex-1 items-center gap-2.5
                rounded-full border border-[var(--border)] bg-[var(--bg-card)]
                px-4 py-2.5 focus-within:border-[var(--accent)]/50 transition-colors">
                <svg
                  className="h-3.5 w-3.5 shrink-0 fill-none stroke-current stroke-[1.8] text-[var(--text-muted)]"
                  viewBox="0 0 24 24" aria-hidden="true"
                >
                  <circle cx="11" cy="11" r="7" />
                  <line x1="16.5" y1="16.5" x2="21" y2="21" />
                </svg>
                <input
                  id="catalog-search"
                  type="search"
                  value={queryInput}
                  onChange={(e) => {
                    const value = e.target.value;
                    setQueryInput(value);
                    replaceFilters({ q: value });
                  }}
                  placeholder="Search products..."
                  className="w-full bg-transparent text-[13px] text-[var(--text)]
                    placeholder:text-[var(--text-dim)] outline-none"
                  aria-label="Search products"
                />
                {queryInput && (
                  <button
                    type="button"
                    onClick={() => { setQueryInput(''); replaceFilters({ q: '' }); }}
                    className="shrink-0 text-[var(--text-dim)] hover:text-[var(--text-muted)] text-sm"
                    aria-label="Clear search"
                  >
                    ✕
                  </button>
                )}
              </div>

              {/* Sort */}
              <label className="flex items-center gap-2 text-[13px] text-[var(--text-muted)]">
                <span className="shrink-0 font-semibold">Sort</span>
                <select
                  value={sort}
                  onChange={(e) => replaceFilters({ sort: parseSort(e.target.value) })}
                  className="rounded-full border border-[var(--border)] bg-[var(--bg-card)]
                    px-3 py-2 text-[12.5px] font-semibold text-[var(--text)]
                    outline-none focus:border-[var(--accent)]/50 transition-colors"
                  aria-label="Sort products"
                >
                  <option value="name">Name A–Z</option>
                  <option value="price-asc">Price low–high</option>
                  <option value="price-desc">Price high–low</option>
                </select>
              </label>
            </div>

            {/* Category filter pills */}
            <div className="flex flex-wrap gap-2" role="group" aria-label="Filter by category">
              <button
                type="button"
                onClick={() => replaceFilters({ cat: 'all' })}
                className={`${pillBase} ${activeCategory === 'all' ? pillActive : pillIdle}`}
                aria-pressed={activeCategory === 'all'}
              >
                All
              </button>
              {CATEGORIES.map((cat) => (
                <button
                  key={cat.slug}
                  type="button"
                  onClick={() => replaceFilters({ cat: cat.slug })}
                  className={`${pillBase} ${activeCategory === cat.slug ? pillActive : pillIdle}`}
                  aria-pressed={activeCategory === cat.slug}
                >
                  {cat.name}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Grid or empty state */}
        {filtered.length === 0 ? (
          <div className="rounded-[var(--radius)] border border-dashed border-[var(--border)]
            py-16 text-center">
            <p className="text-[13.5px] text-[var(--text-muted)] mb-4">
              No peptides match your current filters.
            </p>
            <button
              type="button"
              onClick={clearFilters}
              className="rounded-full bg-[var(--accent)] hover:bg-[var(--accent-hover)]
                px-5 py-2 text-[12.5px] font-semibold text-white transition-colors"
            >
              Clear filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {filtered.map((product) => (
              <ProductCard key={product.slug} product={product} onAddToCart={onAddToCart} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default CatalogGrid;
