'use client';

import React, { useRef } from 'react';
import type { Product } from '../catalog/types';

export interface BestSellersCarouselProps {
  products?: Product[];
  onAddToCart?: (sku: string) => void;
}

const FALLBACK_BEST_SELLERS: Product[] = [
  {
    slug: 'retatrutide',
    name: 'Retatrutide',
    category: 'glp1',
    icon: 'retatrutide',
    variants: [
      { sku: 'retatrutide-10mg', label: '10mg vial', priceCents: 18100 },
      { sku: 'retatrutide-10mg-x10', label: '10mg × 10 vials', priceCents: 162900 },
    ],
    featured: true,
    evidence: 'available',
    researchUseOnly: true,
  },
  {
    slug: 'ghk-cu',
    name: 'GHK-CU',
    category: 'cosmetic',
    icon: 'ghk-cu',
    variants: [
      { sku: 'ghk-cu-50mg', label: '50mg vial', priceCents: 8900 },
      { sku: 'ghk-cu-50mg-x10', label: '50mg × 10 vials', priceCents: 79900 },
    ],
    featured: true,
    evidence: 'available',
    researchUseOnly: true,
  },
  {
    slug: 'bacteriostatic-water',
    name: 'Bacteriostatic Water',
    category: 'essentials',
    icon: 'bacteriostatic-water',
    variants: [
      { sku: 'bac-water-30ml', label: '30ml bottle', priceCents: 2700 },
      { sku: 'bac-water-30ml-x10', label: '30ml × 10 bottles', priceCents: 24300 },
    ],
    featured: true,
    evidence: 'available',
    researchUseOnly: true,
  },
  {
    slug: 'tesamorelin',
    name: 'Tesamorelin',
    category: 'growth',
    icon: 'tesamorelin',
    variants: [
      { sku: 'tesamorelin-10mg', label: '10mg vial', priceCents: 16500 },
      { sku: 'tesamorelin-10mg-x10', label: '10mg × 10 vials', priceCents: 148500 },
    ],
    featured: true,
    evidence: 'available',
    researchUseOnly: true,
  },
  {
    slug: 'mots-c',
    name: 'MOTS-C',
    category: 'blends',
    icon: 'mots-c',
    variants: [
      { sku: 'mots-c-10mg', label: '10mg vial', priceCents: 18600 },
      { sku: 'mots-c-10mg-x10', label: '10mg × 10 vials', priceCents: 167400 },
    ],
    featured: true,
    evidence: 'available',
    researchUseOnly: true,
  },
  {
    slug: 'bpc-157',
    name: 'BPC-157',
    category: 'healing',
    icon: 'bpc-157',
    variants: [
      { sku: 'bpc-157-10mg', label: '10mg vial', priceCents: 13100 },
      { sku: 'bpc-157-10mg-x10', label: '10mg × 10 vials', priceCents: 117900 },
    ],
    featured: true,
    evidence: 'available',
    researchUseOnly: true,
  },
  {
    slug: 'igf-1-lr3',
    name: 'IGF-1 LR3',
    category: 'growth',
    icon: 'igf-1-lr3',
    variants: [
      { sku: 'igf-1-lr3-1mg', label: '1mg vial', priceCents: 12300 },
      { sku: 'igf-1-lr3-1mg-x10', label: '1mg × 10 vials', priceCents: 110700 },
    ],
    featured: true,
    evidence: 'available',
    researchUseOnly: true,
  },
  {
    slug: 'cjc-1295-dac',
    name: 'CJC-1295 + IPA',
    category: 'blends',
    icon: 'cjc-1295',
    variants: [
      { sku: 'cjc-1295-ipa-10mg', label: '10mg blend vial', priceCents: 31400 },
      { sku: 'cjc-1295-ipa-10mg-x10', label: '10mg × 10 vials', priceCents: 282600 },
    ],
    featured: true,
    evidence: 'available',
    researchUseOnly: true,
  },
];

export const BestSellersCarousel: React.FC<BestSellersCarouselProps> = ({
  products = FALLBACK_BEST_SELLERS,
  onAddToCart,
}) => {
  const trackRef = useRef<HTMLDivElement>(null);

  const displayProducts = products.length > 0 ? products : FALLBACK_BEST_SELLERS;

  const handleScroll = (direction: 'left' | 'right') => {
    if (trackRef.current) {
      const scrollAmount = direction === 'left' ? -660 : 660;
      trackRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  const formatMinPrice = (product: Product): string => {
    if (!product.variants || product.variants.length === 0) return '€0';
    const minCents = Math.min(...product.variants.map((v) => v.priceCents));
    const euros = minCents / 100;
    return euros % 1 === 0 ? `From €${euros}` : `From €${euros.toFixed(2)}`;
  };

  return (
    <section className="py-18 bg-white" id="best-sellers">
      <div className="max-w-[1180px] mx-auto px-6">
        <div className="flex items-end justify-between gap-6 mb-8.5">
          <div>
            <span className="inline-block text-[11px] font-extrabold tracking-widest uppercase text-[#8f67ff] mb-3">
              Top Picks
            </span>
            <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-[#120d20] leading-tight mb-2">
              Best Sellers
            </h2>
            <p className="text-sm sm:text-base text-[#4d4762]">
              Our most trusted research peptides — purity-verified, lab-tested, shipping fast.
            </p>
          </div>

          <div className="flex gap-2.5">
            <button
              onClick={() => handleScroll('left')}
              className="grid place-items-center w-11 h-11 rounded-full bg-white border border-[#e8dff5] text-[#432D76] text-lg hover:bg-[#432D76] hover:text-white transition-colors"
              aria-label="Scroll back"
            >
              ←
            </button>
            <button
              onClick={() => handleScroll('right')}
              className="grid place-items-center w-11 h-11 rounded-full bg-white border border-[#e8dff5] text-[#432D76] text-lg hover:bg-[#432D76] hover:text-white transition-colors"
              aria-label="Scroll forward"
            >
              →
            </button>
          </div>
        </div>

        {/* Carousel Track */}
        <div
          ref={trackRef}
          className="flex gap-5 overflow-x-auto scroll-smooth py-1.5 px-1 pb-5 snap-x snap-mandatory [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
        >
          {displayProducts.map((product) => {
            const firstSku = product.variants[0]?.sku || product.slug;
            return (
              <article
                key={product.slug}
                className="relative flex-[0_0_300px] snap-start bg-white border border-[#e8dff5] rounded-[24px] p-5.5 overflow-hidden shadow-[0_18px_48px_rgba(67,45,118,0.10)] flex flex-col gap-3.5 hover:-translate-y-1 hover:shadow-[0_26px_80px_rgba(67,45,118,0.18)] transition-all"
              >
                <span className="absolute -top-1.5 left-2 text-4xl font-black tracking-wide text-transparent [-webkit-text-stroke:1px_rgba(67,45,118,0.12)] pointer-events-none uppercase select-none">
                  {product.name}
                </span>

                <div className="flex justify-between items-start gap-2.5 relative">
                  <h3 className="text-[1.02rem] font-extrabold tracking-tight text-[#120d20]">
                    {product.name}
                  </h3>
                  <span className="text-[12.5px] font-extrabold text-[#7d7592] whitespace-nowrap">
                    {formatMinPrice(product)}
                  </span>
                </div>

                <div className="relative grid place-items-center bg-[#f6f1ff] rounded-[18px] p-3.5">
                  {product.featured && (
                    <span className="absolute top-2.5 left-2.5 z-10 inline-flex items-center gap-1.25 px-3 py-1 rounded-full bg-gradient-to-br from-[#ffd76b] to-[#f5a623] text-[#4a2d00] text-[10px] font-black tracking-wider uppercase shadow-[0_8px_20px_rgba(245,166,35,0.34)]">
                      ✦ Top Research
                    </span>
                  )}
                  <img
                    src={`/assets/svgs/${product.icon}.svg`}
                    alt={product.name}
                    className="w-[74%] drop-shadow-[0_18px_24px_rgba(67,45,118,0.22)]"
                  />
                </div>

                <div className="flex justify-between items-center mt-auto">
                  <button
                    onClick={() => onAddToCart?.(firstSku)}
                    className="grid place-items-center w-11 h-11 rounded-full bg-[#f6f1ff] text-[#432D76] hover:bg-[#432D76] hover:text-white transition-colors"
                    aria-label={`Add ${product.name}`}
                  >
                    <svg
                      className="w-5 h-5 fill-none stroke-current stroke-[1.8] stroke-linecap-round stroke-linejoin-round"
                      viewBox="0 0 24 24"
                    >
                      <path d="M6 7h12l-1.2 12H7.2L6 7Z" />
                      <path d="M9 7a3 3 0 0 1 6 0" />
                    </svg>
                  </button>

                  <a
                    href="#catalog"
                    className="text-xs font-extrabold text-[#432D76] hover:text-[#8f67ff] transition-colors"
                  >
                    View Product →
                  </a>
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
