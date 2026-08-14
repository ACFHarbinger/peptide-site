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
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const urlQuery = searchParams.get('q') ?? '';
  const activeCategory = parseCategory(searchParams.get('cat'));
  const sort = parseSort(searchParams.get('sort'));

  const [queryInput, setQueryInput] = useState(urlQuery);

  useEffect(() => {
    setQueryInput(urlQuery);
  }, [urlQuery]);

  const replaceFilters = (next: {
    q?: string;
    cat?: CategorySlug | 'all';
    sort?: CatalogSort;
  }) => {
    const q = next.q !== undefined ? next.q : urlQuery;
    const cat = next.cat !== undefined ? next.cat : activeCategory;
    const nextSort = next.sort !== undefined ? next.sort : sort;
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

  return (
    <section className="bg-white py-20" id="catalog">
      <div className="mx-auto max-w-[1180px] px-6">
        <div className="mb-8">
          <span className="text-xs font-bold uppercase tracking-widest text-[#8f67ff]">
            Full Catalog
          </span>
          <h1 className="mt-2 text-3xl font-black text-[#120d20]">Shop all research peptides</h1>
          <p className="mt-1 text-sm text-[#4d4762]">
            {countLabel}. For laboratory research use only — not for human or veterinary use.
          </p>

          <div className="mt-5 flex flex-col gap-4">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
              <div className="flex max-w-md flex-1 items-center gap-2 rounded-full border border-[#432d76]/15 px-4 py-2.5">
                <svg
                  className="h-4 w-4 shrink-0 fill-none stroke-current stroke-[1.8] text-[#4d4762]"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
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
                  className="w-full text-sm outline-none"
                  aria-label="Search products"
                />
                {queryInput && (
                  <button
                    type="button"
                    onClick={() => {
                      setQueryInput('');
                      replaceFilters({ q: '' });
                    }}
                    aria-label="Clear search"
                  >
                    ✕
                  </button>
                )}
              </div>

              <label className="flex items-center gap-2 text-sm text-[#4d4762]">
                <span className="shrink-0 font-semibold">Sort</span>
                <select
                  value={sort}
                  onChange={(e) => replaceFilters({ sort: parseSort(e.target.value) })}
                  className="rounded-full border border-[#432d76]/15 bg-white px-3 py-2 text-sm font-semibold text-[#120d20]"
                  aria-label="Sort products"
                >
                  <option value="name">Name A–Z</option>
                  <option value="price-asc">Price low–high</option>
                  <option value="price-desc">Price high–low</option>
                </select>
              </label>
            </div>

            <div className="flex flex-wrap gap-2" role="group" aria-label="Filter by category">
              <button
                type="button"
                onClick={() => replaceFilters({ cat: 'all' })}
                className={`rounded-full px-4 py-1.5 text-xs font-bold ${
                  activeCategory === 'all' ? 'bg-[#432D76] text-white' : 'bg-[#f6f1ff] text-[#4d4762]'
                }`}
                aria-pressed={activeCategory === 'all'}
              >
                All
              </button>
              {CATEGORIES.map((cat) => (
                <button
                  key={cat.slug}
                  type="button"
                  onClick={() => replaceFilters({ cat: cat.slug })}
                  className={`rounded-full px-4 py-1.5 text-xs font-bold ${
                    activeCategory === cat.slug
                      ? 'bg-[#432D76] text-white'
                      : 'bg-[#f6f1ff] text-[#4d4762]'
                  }`}
                  aria-pressed={activeCategory === cat.slug}
                >
                  {cat.name}
                </button>
              ))}
            </div>
          </div>
        </div>

        {filtered.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-[#432d76]/20 py-16 text-center">
            <p className="text-sm text-[#4d4762]">No peptides match. Clear filters.</p>
            <button
              type="button"
              onClick={clearFilters}
              className="mt-4 rounded-full bg-[#432D76] px-5 py-2 text-xs font-bold text-white"
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
