'use client';

import React from 'react';
import { StorefrontShell } from '../src/components/StorefrontShell';
import { Hero } from '../src/components/Hero';
import { BestSellersCarousel } from '../src/components/BestSellersCarousel';
import { TestingSection } from '../src/components/TestingSection';
import { FAQSection } from '../src/components/FAQSection';
import { PRODUCTS } from '../src/catalog/products';

const featuredProducts = PRODUCTS.filter((p) => p.featured);

export default function HomePage() {
  return (
    <StorefrontShell>
      {({ onAddToCart }) => (
        <>
          <Hero />
          <BestSellersCarousel products={featuredProducts} onAddToCart={onAddToCart} />
          <TestingSection />
          <FAQSection />
        </>
      )}
    </StorefrontShell>
  );
}
