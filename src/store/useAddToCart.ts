'use client';

import { useAppDispatch } from './hooks';
import { addItem } from './cartSlice';
import { PRODUCTS } from '../catalog/products';

/**
 * Shared add-to-cart handler: looks up the product/variant by SKU and
 * dispatches into the cart store. Used by every route that renders
 * ProductCard/BestSellersCarousel/ProductDetail so SKU -> cart-line
 * construction lives in one place.
 */
export function useAddToCart() {
  const dispatch = useAppDispatch();

  return (sku: string) => {
    const product = PRODUCTS.find((p) => p.variants.some((v) => v.sku === sku));
    const variant = product?.variants.find((v) => v.sku === sku);
    if (!product || !variant) return;
    dispatch(addItem(variant.sku, product.slug, product.name, variant.label, variant.priceCents));
  };
}
