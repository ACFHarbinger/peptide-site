'use client';

import React, { useMemo, useState } from 'react';
import type { Product, CategorySlug } from '../catalog/types';
import { CATEGORIES } from '../catalog/categories';
import { ProductCard } from './ProductCard';

export interface CatalogSectionProps {
  products: Product[];
  onAddToCart?: (sku: string) => void;
}

function matchesQuery(product: Product, query: string): boolean {
  if (!query) return true;
  const haystack = [product.name, product.slug, ...(product.aliases ?? [])]
    .join(' ')
    .toLowerCase();
  return haystack.includes(query.toLowerCase());
}

export const CatalogSection: React.FC<CatalogSectionProps> = ({ products, onAddToCart }) => {
  const [activeCategory, setActiveCategory] = useState<CategorySlug | 'all'>('all');
  const [query, setQuery] = useState('');

  const filtered = useMemo(() => {
    return products.filter(
      (p) => (activeCategory === 'all' || p.category === activeCategory) && matchesQuery(p, query),
    );
  }, [products, activeCategory, query]);

  return (
    <section className="bg-white py-20" id="catalog">
      <div className="mx-auto max-w-[1180px] px-6">
        <div className="mb-8">
          <span className="text-xs font-bold uppercase tracking-widest text-[#8f67ff]">
            Full Catalog
          </span>
          <h2 className="mt-2 text-3xl font-black text-[#120d20]">Shop all research peptides</h2>
          <p className="mt-1 text-sm text-[#4d4762]">
            {filtered.length} product{filtered.length === 1 ? '' : 's'}
          </p>

          <div className="mt-5 flex flex-col gap-4">
            <div className="flex max-w-md items-center gap-2 rounded-full border border-[#432d76]/15 px-4 py-2.5">
              <svg className="h-4 w-4 shrink-0 fill-none stroke-current stroke-[1.8] text-[#4d4762]" viewBox="0 0 24 24">
                <circle cx="11" cy="11" r="7" />
                <line x1="16.5" y1="16.5" x2="21" y2="21" />
              </svg>
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search products..."
                className="w-full text-sm outline-none"
                aria-label="Search products"
              />
              {query && (
                <button type="button" onClick={() => setQuery('')} aria-label="Clear search">
                  ✕
                </button>
              )}
            </div>

            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() => setActiveCategory('all')}
                className={`rounded-full px-4 py-1.5 text-xs font-bold ${
                  activeCategory === 'all'
                    ? 'bg-[#432D76] text-white'
                    : 'bg-[#f6f1ff] text-[#4d4762]'
                }`}
              >
                All
              </button>
              {CATEGORIES.map((cat) => (
                <button
                  key={cat.slug}
                  type="button"
                  onClick={() => setActiveCategory(cat.slug)}
                  className={`rounded-full px-4 py-1.5 text-xs font-bold ${
                    activeCategory === cat.slug
                      ? 'bg-[#432D76] text-white'
                      : 'bg-[#f6f1ff] text-[#4d4762]'
                  }`}
                >
                  {cat.name}
                </button>
              ))}
            </div>
          </div>
        </div>

        {filtered.length === 0 ? (
          <p className="rounded-2xl border border-dashed border-[#432d76]/20 py-16 text-center text-sm text-[#4d4762]">
            No peptides match. Clear filters and try again.
          </p>
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

export default CatalogSection;
