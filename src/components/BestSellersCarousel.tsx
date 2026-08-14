'use client';

import React, { useRef } from 'react';
import type { Product } from '../catalog/types';
import Link from 'next/link';
import { vialSrc } from '../lib/paths';

export interface BestSellersCarouselProps {
  products?: Product[];
  onAddToCart?: (sku: string) => void;
}

/**
 * Category badge style map. All class strings are written in full so Tailwind
 * JIT picks them up during the content scan. Do NOT build these dynamically.
 */
const BADGE_STYLE: Record<string, string> = {
  glp1:          'bg-blue-500/15 text-blue-400',
  growth:        'bg-teal-500/15 text-teal-400',
  cosmetic:      'bg-violet-500/15 text-violet-400',
  healing:       'bg-amber-500/15 text-amber-400',
  'weight-loss': 'bg-orange-500/15 text-orange-400',
  blends:        'bg-indigo-500/15 text-indigo-400',
  essentials:    'bg-slate-500/15 text-slate-400',
};

const CAT_LABEL: Record<string, string> = {
  glp1:          'GLP-1',
  growth:        'Growth',
  cosmetic:      'Cosmetic',
  healing:       'Healing',
  'weight-loss': 'Weight Loss',
  blends:        'Blends',
  essentials:    'Essentials',
};

const FALLBACK: Product[] = [
  {
    slug: 'retatrutide', name: 'Retatrutide', category: 'glp1', icon: 'retatrutide',
    variants: [
      { sku: 'retatrutide-10mg',      label: '10mg vial',        priceCents: 18100  },
      { sku: 'retatrutide-10mg-x10',  label: '10mg × 10 vials',  priceCents: 162900 },
    ],
    featured: true, evidence: 'available', researchUseOnly: true,
  },
  {
    slug: 'ghk-cu', name: 'GHK-CU', category: 'cosmetic', icon: 'ghk-cu',
    variants: [
      { sku: 'ghk-cu-50mg',     label: '50mg vial',       priceCents: 8900  },
      { sku: 'ghk-cu-50mg-x10', label: '50mg × 10 vials', priceCents: 79900 },
    ],
    featured: true, evidence: 'available', researchUseOnly: true,
  },
  {
    slug: 'bacteriostatic-water', name: 'Bacteriostatic Water', category: 'essentials',
    icon: 'bacteriostatic-water',
    variants: [
      { sku: 'bac-water-30ml',     label: '30ml bottle',       priceCents: 2700  },
      { sku: 'bac-water-30ml-x10', label: '30ml × 10 bottles', priceCents: 24300 },
    ],
    featured: true, evidence: 'available', researchUseOnly: true,
  },
  {
    slug: 'tesamorelin', name: 'Tesamorelin', category: 'growth', icon: 'tesamorelin',
    variants: [
      { sku: 'tesamorelin-10mg',     label: '10mg vial',       priceCents: 16500  },
      { sku: 'tesamorelin-10mg-x10', label: '10mg × 10 vials', priceCents: 148500 },
    ],
    featured: true, evidence: 'available', researchUseOnly: true,
  },
  {
    slug: 'mots-c', name: 'MOTS-C', category: 'blends', icon: 'mots-c',
    variants: [
      { sku: 'mots-c-10mg',     label: '10mg vial',       priceCents: 18600  },
      { sku: 'mots-c-10mg-x10', label: '10mg × 10 vials', priceCents: 167400 },
    ],
    featured: true, evidence: 'available', researchUseOnly: true,
  },
  {
    slug: 'bpc-157', name: 'BPC-157', category: 'healing', icon: 'bpc-157',
    variants: [
      { sku: 'bpc-157-10mg',     label: '10mg vial',       priceCents: 13100  },
      { sku: 'bpc-157-10mg-x10', label: '10mg × 10 vials', priceCents: 117900 },
    ],
    featured: true, evidence: 'available', researchUseOnly: true,
  },
  {
    slug: 'igf-1-lr3', name: 'IGF-1 LR3', category: 'growth', icon: 'igf-1-lr3',
    variants: [
      { sku: 'igf-1-lr3-1mg',     label: '1mg vial',       priceCents: 12300  },
      { sku: 'igf-1-lr3-1mg-x10', label: '1mg × 10 vials', priceCents: 110700 },
    ],
    featured: true, evidence: 'available', researchUseOnly: true,
  },
  {
    slug: 'cjc-1295-dac', name: 'CJC-1295 + IPA', category: 'blends', icon: 'cjc-1295',
    variants: [
      { sku: 'cjc-1295-ipa-10mg',     label: '10mg blend vial',   priceCents: 31400  },
      { sku: 'cjc-1295-ipa-10mg-x10', label: '10mg × 10 vials',   priceCents: 282600 },
    ],
    featured: true, evidence: 'available', researchUseOnly: true,
  },
];

export const BestSellersCarousel: React.FC<BestSellersCarouselProps> = ({
  products = FALLBACK,
  onAddToCart,
}) => {
  const trackRef = useRef<HTMLDivElement>(null);
  const items = products.length > 0 ? products : FALLBACK;

  const scroll = (dir: 'left' | 'right') =>
    trackRef.current?.scrollBy({ left: dir === 'left' ? -640 : 640, behavior: 'smooth' });

  const minPrice = (p: Product) => {
    const cents = Math.min(...p.variants.map((v) => v.priceCents));
    const e = cents / 100;
    return `From €${e % 1 === 0 ? e : e.toFixed(2)}`;
  };

  return (
    <section className="bg-[var(--bg-base)] py-16 sm:py-20" id="best-sellers">
      <div className="max-w-[1180px] mx-auto px-6">

        {/* Section header */}
        <div className="flex items-end justify-between gap-6 mb-8">
          <div>
            <span className="block text-[10px] font-semibold tracking-[0.18em] uppercase
              text-[var(--accent)] mb-2.5">
              Top Picks
            </span>
            <h2 className="text-[1.9rem] sm:text-[2.2rem] font-bold tracking-[-0.02em]
              text-[var(--text)] leading-tight mb-1">
              Best Sellers
            </h2>
            <p className="text-[13.5px] text-[var(--text-muted)]">
              Purity-verified, lab-tested — shipping fast.
            </p>
          </div>

          {/* Scroll arrows */}
          <div className="flex gap-2 shrink-0">
            {(['left', 'right'] as const).map((dir) => (
              <button
                key={dir}
                onClick={() => scroll(dir)}
                aria-label={dir === 'left' ? 'Scroll back' : 'Scroll forward'}
                className="grid place-items-center w-10 h-10 rounded-full
                  border border-[var(--border)] text-[var(--text-muted)]
                  hover:bg-[var(--accent)] hover:border-[var(--accent)] hover:text-white
                  transition-all duration-150"
              >
                <svg
                  className="w-[14px] h-[14px] fill-none stroke-current"
                  strokeWidth="1.9"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  viewBox="0 0 24 24"
                >
                  {dir === 'left'
                    ? <path d="M19 12H5M11 6l-6 6 6 6" />
                    : <path d="M5 12h14M13 6l6 6-6 6" />}
                </svg>
              </button>
            ))}
          </div>
        </div>

        {/* Carousel track */}
        <div
          ref={trackRef}
          className="flex gap-4 overflow-x-auto scroll-smooth pb-3 snap-x snap-mandatory
            [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
        >
          {items.map((product) => {
            const firstSku = product.variants[0]?.sku ?? product.slug;
            const badge    = BADGE_STYLE[product.category] ?? 'bg-slate-500/15 text-slate-400';
            const catLabel = CAT_LABEL[product.category]   ?? product.category;

            return (
              <article
                key={product.slug}
                className="relative flex-[0_0_260px] snap-start flex flex-col
                  rounded-[var(--radius)] bg-[var(--bg-card)] border border-[var(--border)]
                  overflow-hidden shadow-[var(--shadow)]
                  hover:-translate-y-1 hover:shadow-[var(--shadow-lg)] hover:border-[var(--accent)]/35
                  transition-all duration-200"
              >
                {/* Top row: badge + price */}
                <div className="flex items-center justify-between px-4 pt-4 pb-0">
                  <span className={`inline-block px-2.5 py-[3px] rounded-full
                    text-[9.5px] font-semibold tracking-wide uppercase ${badge}`}>
                    {catLabel}
                  </span>
                  <span className="text-[11.5px] font-medium text-[var(--text-muted)]">
                    {minPrice(product)}
                  </span>
                </div>

                {/* Image well */}
                <div className="relative mx-4 mt-3 flex items-center justify-center
                  rounded-[var(--radius-sm)] bg-[var(--bg-well)] overflow-hidden"
                  style={{ height: 154 }}>
                  {/* Cobalt spotlight under vial */}
                  <div
                    aria-hidden="true"
                    className="absolute bottom-0 left-1/2 -translate-x-1/2
                      w-2/3 h-7 blur-2xl rounded-full pointer-events-none opacity-45"
                    style={{ background: 'var(--accent)' }}
                  />
                  <img
                    src={vialSrc(product.icon)}
                    alt={product.name}
                    className="relative h-[78%] object-contain
                      drop-shadow-[0_10px_20px_rgba(0,0,0,0.52)]"
                  />
                </div>

                {/* Body */}
                <div className="flex flex-col flex-1 px-4 py-4 gap-3">
                  <h3 className="font-semibold text-[0.95rem] text-[var(--text)] leading-snug">
                    {product.name}
                  </h3>

                  <div className="mt-auto flex items-center justify-between">
                    <button
                      onClick={() => onAddToCart?.(firstSku)}
                      aria-label={`Add ${product.name} to cart`}
                      className="grid place-items-center w-10 h-10 rounded-full
                        bg-[var(--accent)] hover:bg-[var(--accent-hover)] text-white
                        shadow-[var(--shadow-blue)] transition-colors duration-150"
                    >
                      <svg
                        className="w-[15px] h-[15px] fill-none stroke-current"
                        strokeWidth="1.8"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        viewBox="0 0 24 24"
                      >
                        <path d="M6 7h12l-1.2 12H7.2L6 7Z" />
                        <path d="M9 7a3 3 0 0 1 6 0" />
                      </svg>
                    </button>

                    <Link
                      href={`/product/${product.slug}`}
                      className="flex items-center gap-1 text-[11.5px] font-semibold
                        text-[var(--text-muted)] hover:text-[var(--accent)] transition-colors"
                    >
                      View
                      <svg
                        className="w-3 h-3 fill-none stroke-current"
                        strokeWidth="1.9"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        viewBox="0 0 24 24"
                      >
                        <path d="M5 12h14M13 6l6 6-6 6" />
                      </svg>
                    </Link>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default BestSellersCarousel;
