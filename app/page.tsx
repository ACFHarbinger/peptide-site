'use client';

import React, { useEffect, useState } from 'react';
import { Header } from '../src/components/Header';
import { AgeGateModal } from '../src/components/AgeGateModal';
import { Hero } from '../src/components/Hero';
import { BestSellersCarousel } from '../src/components/BestSellersCarousel';
import { CatalogSection } from '../src/components/CatalogSection';
import { TestingSection } from '../src/components/TestingSection';
import { FAQSection } from '../src/components/FAQSection';
import { Footer } from '../src/components/Footer';
import { CartDrawer } from '../src/components/CartDrawer';
import { useAppDispatch, useAppSelector } from '../src/store/hooks';
import { addItem, selectCartItemCount } from '../src/store/cartSlice';
import { PRODUCTS } from '../src/catalog/products';

const AGE_GATE_STORAGE_KEY = 'pepcore.age_gate.v1';

export default function HomePage() {
  const dispatch = useAppDispatch();
  const cartItemCount = useAppSelector(selectCartItemCount);
  // Default to gated (matches the pre-port behavior): the gate shows on the
  // static shell and is only dismissed once we've confirmed prior consent
  // client-side, so a first-time visitor never sees a flash of ungated content.
  const [ageConfirmed, setAgeConfirmed] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);

  useEffect(() => {
    const confirmed = window.localStorage.getItem(AGE_GATE_STORAGE_KEY) === 'yes';
    setAgeConfirmed(confirmed);
  }, []);

  const handleConfirmAge = () => {
    window.localStorage.setItem(AGE_GATE_STORAGE_KEY, 'yes');
    setAgeConfirmed(true);
  };

  const handleAddToCart = (sku: string) => {
    const product = PRODUCTS.find((p) => p.variants.some((v) => v.sku === sku));
    const variant = product?.variants.find((v) => v.sku === sku);
    if (!product || !variant) return;
    dispatch(addItem(variant.sku, product.slug, product.name, variant.label, variant.priceCents));
    setCartOpen(true);
  };

  const featuredProducts = PRODUCTS.filter((p) => p.featured);

  return (
    <>
      <AgeGateModal open={!ageConfirmed} onConfirm={handleConfirmAge} />

      <Header
        cartItemCount={cartItemCount}
        onCartClick={() => setCartOpen(true)}
        onSearchClick={() => document.getElementById('catalog')?.scrollIntoView({ behavior: 'smooth' })}
      />

      <Hero />

      <BestSellersCarousel products={featuredProducts} onAddToCart={handleAddToCart} />

      <CatalogSection products={PRODUCTS} onAddToCart={handleAddToCart} />

      <TestingSection />

      <FAQSection />

      <Footer />

      <CartDrawer open={cartOpen} onClose={() => setCartOpen(false)} />
    </>
  );
}
