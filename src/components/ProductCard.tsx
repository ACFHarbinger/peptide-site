'use client';

import React, { useState } from 'react';
import type { Product } from '../catalog/types';

export interface ProductCardProps {
  product: Product;
  onAddToCart?: (sku: string) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, onAddToCart }) => {
  const [variantIndex, setVariantIndex] = useState(0);
  const variant = product.variants[variantIndex];

  const priceLabel = (cents: number) => {
    const euros = cents / 100;
    return euros % 1 === 0 ? `€${euros}` : `€${euros.toFixed(2).replace('.', ',')}`;
  };

  return (
    <article className="group flex flex-col rounded-2xl border border-[#432d76]/10 bg-white p-4 shadow-[0_2px_10px_rgba(67,45,118,0.06)] transition-shadow hover:shadow-[0_10px_30px_rgba(67,45,118,0.12)]">
      <div className="relative mb-3 grid aspect-square place-items-center rounded-xl bg-[#f6f1ff]">
        <img
          src={`/assets/svgs/${product.icon}.svg`}
          alt={product.name}
          className="h-[70%] w-[70%] object-contain"
        />
        {product.evidence === 'on_request' && (
          <span className="absolute right-2 top-2 rounded-full bg-white/90 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-[#4d4762]">
            COA on request
          </span>
        )}
      </div>

      <span className="text-[11px] font-bold uppercase tracking-wide text-[#8f67ff]">
        {product.category}
      </span>
      <h3 className="mt-0.5 text-base font-extrabold text-[#120d20]">{product.name}</h3>

      {product.variants.length > 1 ? (
        <select
          value={variantIndex}
          onChange={(e) => setVariantIndex(Number(e.target.value))}
          className="mt-2 rounded-lg border border-[#432d76]/15 bg-white px-2 py-1.5 text-sm font-semibold text-[#4d4762]"
          aria-label={`${product.name} size`}
        >
          {product.variants.map((v, i) => (
            <option key={v.sku} value={i}>
              {v.label}
            </option>
          ))}
        </select>
      ) : (
        <span className="mt-2 text-sm font-semibold text-[#4d4762]">{variant.label}</span>
      )}

      <div className="mt-3 flex items-center justify-between">
        <span className="text-lg font-black text-[#120d20]">{priceLabel(variant.priceCents)}</span>
        <button
          type="button"
          onClick={() => onAddToCart?.(variant.sku)}
          className="grid h-9 w-9 place-items-center rounded-full bg-[#432D76] text-white transition-transform hover:scale-105"
          aria-label={`Add ${product.name} (${variant.label}) to cart`}
        >
          <svg className="h-4 w-4 fill-none stroke-current stroke-[1.8]" viewBox="0 0 24 24">
            <path d="M6 7h12l-1.2 12H7.2L6 7Z" />
            <path d="M9 7a3 3 0 0 1 6 0" />
          </svg>
        </button>
      </div>
    </article>
  );
};

export default ProductCard;
