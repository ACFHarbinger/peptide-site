'use client';

import React, { useState } from 'react';
import type { Product } from '../catalog/types';
import { vialSrc } from '../lib/paths';

export interface ProductCardProps {
  product: Product;
  onAddToCart?: (sku: string) => void;
}

/**
 * Category badge style map.
 * All class strings written in full so Tailwind JIT picks them up.
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

export const ProductCard: React.FC<ProductCardProps> = ({ product, onAddToCart }) => {
  const [variantIndex, setVariantIndex] = useState(0);
  const variant = product.variants[variantIndex];

  const priceLabel = (cents: number) => {
    const e = cents / 100;
    return e % 1 === 0 ? `€${e}` : `€${e.toFixed(2).replace('.', ',')}`;
  };

  const badge    = BADGE_STYLE[product.category] ?? 'bg-slate-500/15 text-slate-400';
  const catLabel = CAT_LABEL[product.category]   ?? product.category;

  return (
    <article className="group flex flex-col rounded-[var(--radius)] bg-[var(--bg-card)]
      border border-[var(--border)] overflow-hidden shadow-[var(--shadow)]
      hover:-translate-y-1 hover:shadow-[var(--shadow-lg)] hover:border-[var(--accent)]/30
      transition-all duration-200">

      {/* ── Image well ── */}
      <div
        className="relative flex items-center justify-center bg-[var(--bg-well)] overflow-hidden"
        style={{ height: 180 }}
      >
        {/* Cobalt spotlight glow */}
        <div
          aria-hidden="true"
          className="absolute bottom-0 left-1/2 -translate-x-1/2
            w-1/2 h-6 blur-2xl rounded-full pointer-events-none opacity-40"
          style={{ background: 'var(--accent)' }}
        />

        <img
          src={vialSrc(product.icon)}
          alt={product.name}
          className="relative h-[70%] object-contain
            drop-shadow-[0_10px_18px_rgba(0,0,0,0.48)]
            group-hover:scale-[1.05] transition-transform duration-300"
        />

        {/* COA badge — only shown when evidence is not freely available */}
        {product.evidence === 'on_request' && (
          <span className="absolute top-2.5 right-2.5 px-2 py-0.5 rounded
            bg-[var(--bg-card)]/85 backdrop-blur-sm
            text-[var(--text-dim)] text-[8.5px] font-medium uppercase tracking-wider">
            COA on request
          </span>
        )}
      </div>

      {/* ── Body ── */}
      <div className="flex flex-col flex-1 p-4 gap-2">
        {/* Category badge */}
        <span className={`inline-block w-fit px-2 py-[2px] rounded-full
          text-[9.5px] font-semibold tracking-wide uppercase ${badge}`}>
          {catLabel}
        </span>

        {/* Product name */}
        <h3 className="font-semibold text-[0.9rem] text-[var(--text)] leading-snug">
          {product.name}
        </h3>

        {/* Variant selector */}
        {product.variants.length > 1 ? (
          <select
            value={variantIndex}
            onChange={(e) => setVariantIndex(Number(e.target.value))}
            className="mt-0.5 w-full rounded-[var(--radius-sm)] border border-[var(--border)]
              bg-[var(--bg-well)] px-2.5 py-[7px] text-[11.5px] font-medium
              text-[var(--text-muted)] outline-none
              focus:border-[var(--accent)]/50 transition-colors"
            aria-label={`${product.name} variant`}
          >
            {product.variants.map((v, i) => (
              <option key={v.sku} value={i}>{v.label}</option>
            ))}
          </select>
        ) : (
          <span className="mt-0.5 text-[11.5px] font-medium text-[var(--text-muted)]">
            {variant.label}
          </span>
        )}

        {/* Price + cart */}
        <div className="mt-auto pt-3 flex items-center justify-between">
          <span className="text-[1.05rem] font-bold text-[var(--text)]">
            {priceLabel(variant.priceCents)}
          </span>

          <button
            type="button"
            onClick={() => onAddToCart?.(variant.sku)}
            aria-label={`Add ${product.name} (${variant.label}) to cart`}
            className="grid place-items-center w-9 h-9 rounded-full
              bg-[var(--accent)] hover:bg-[var(--accent-hover)] text-white
              shadow-[var(--shadow-blue)] transition-colors duration-150"
          >
            <svg
              className="w-[14px] h-[14px] fill-none stroke-current"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
              viewBox="0 0 24 24"
            >
              <path d="M6 7h12l-1.2 12H7.2L6 7Z" />
              <path d="M9 7a3 3 0 0 1 6 0" />
            </svg>
          </button>
        </div>
      </div>
    </article>
  );
};

export default ProductCard;
