'use client';

import React, { Suspense } from 'react';
import { StorefrontShell } from '../../src/components/StorefrontShell';
import { CatalogGrid } from '../../src/components/CatalogGrid';
import { PRODUCTS } from '../../src/catalog/products';

function CatalogFallback() {
  return (
    <section className="bg-white py-20" id="catalog">
      <div className="mx-auto max-w-[1180px] px-6">
        <span className="text-xs font-bold uppercase tracking-widest text-[#8f67ff]">
          Full Catalog
        </span>
        <h1 className="mt-2 text-3xl font-black text-[#120d20]">Shop all research peptides</h1>
        <p className="mt-1 text-sm text-[#4d4762]">Loading catalog…</p>
      </div>
    </section>
  );
}

export default function CatalogPage() {
  return (
    <StorefrontShell>
      {({ onAddToCart }) => (
        <Suspense fallback={<CatalogFallback />}>
          <CatalogGrid products={PRODUCTS} onAddToCart={onAddToCart} />
        </Suspense>
      )}
    </StorefrontShell>
  );
}
