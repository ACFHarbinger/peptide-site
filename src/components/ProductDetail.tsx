'use client';

import Link from 'next/link';
import { useState } from 'react';
import { CATEGORY_BY_SLUG } from '../catalog/categories';
import type { Product } from '../catalog/types';
import { StorefrontShell } from './StorefrontShell';
import { ProductCard } from './ProductCard';

export interface ProductDetailProps {
  product: Product;
  relatedProducts: Product[];
  onAddToCart: (sku: string) => void;
}

interface ProductDetailPageProps {
  product: Product;
  relatedProducts: Product[];
}

const formatPrice = (cents: number) => {
  const euros = cents / 100;
  return euros % 1 === 0 ? `€${euros}` : `€${euros.toFixed(2).replace('.', ',')}`;
};

export function ProductDetail({ product, relatedProducts, onAddToCart }: ProductDetailProps) {
  const [selectedVariantIndex, setSelectedVariantIndex] = useState(0);
  const selectedVariant = product.variants[selectedVariantIndex];
  const category = CATEGORY_BY_SLUG[product.category];

  return (
    <main>
      <section
        style={{
          background: 'linear-gradient(180deg, #fbf9ff 0%, #fff 100%)',
          borderBottom: '1px solid var(--border)',
          padding: '36px 0 64px',
        }}
      >
        <div className="container">
          <nav aria-label="Breadcrumb" style={{ fontSize: '0.84rem', fontWeight: 700, color: 'var(--muted)', marginBottom: '34px' }}>
            <Link href="/catalog" style={{ color: 'var(--purple)' }}>Catalog</Link>
            <span aria-hidden="true" style={{ margin: '0 10px' }}>/</span>
            <Link href={`/catalog?cat=${product.category}`} style={{ color: 'var(--purple)' }}>
              {category.name}
            </Link>
            <span aria-hidden="true" style={{ margin: '0 10px' }}>/</span>
            <span aria-current="page">{product.name}</span>
          </nav>

          <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 0.9fr) minmax(0, 1.1fr)', gap: 'clamp(32px, 6vw, 80px)', alignItems: 'center' }}>
            <div
              style={{
                aspectRatio: '1 / 1',
                background: 'var(--light)',
                border: '1px solid var(--border)',
                borderRadius: 'var(--radius-lg)',
                display: 'grid',
                placeItems: 'center',
                padding: '12%',
              }}
            >
              <img
                src={`/assets/svgs/${product.icon}.svg`}
                alt={product.name}
                style={{ maxHeight: '100%', filter: 'drop-shadow(0 26px 30px rgba(67, 45, 118, 0.24))' }}
              />
            </div>

            <div>
              <span className="eyebrow">{category.name}</span>
              <h1 style={{ fontSize: 'clamp(2.3rem, 5vw, 4.25rem)', lineHeight: 1, letterSpacing: '-0.03em', marginBottom: '16px' }}>
                {product.name}
              </h1>
              <p style={{ fontSize: '1rem', maxWidth: '54ch', marginBottom: '28px' }}>
                Catalog material supplied exclusively for qualified research purposes.
              </p>

              <div style={{ borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)', padding: '22px 0', marginBottom: '20px' }}>
                <label htmlFor="product-variant" style={{ display: 'block', color: 'var(--text)', fontSize: '0.82rem', fontWeight: 800, marginBottom: '8px' }}>
                  Select size
                </label>
                <select
                  id="product-variant"
                  value={selectedVariantIndex}
                  onChange={(event) => setSelectedVariantIndex(Number(event.target.value))}
                  style={{ width: '100%', border: '1px solid var(--border)', borderRadius: '10px', background: '#fff', color: 'var(--text)', font: 'inherit', fontWeight: 700, padding: '13px 14px' }}
                >
                  {product.variants.map((variant, index) => (
                    <option key={variant.sku} value={index}>
                      {variant.label}
                    </option>
                  ))}
                </select>
                <div style={{ alignItems: 'center', display: 'flex', justifyContent: 'space-between', gap: '20px', marginTop: '18px' }}>
                  <span style={{ color: 'var(--muted)', fontSize: '0.78rem', fontWeight: 800, letterSpacing: '0.08em', textTransform: 'uppercase' }}>Price</span>
                  <strong style={{ fontSize: '1.75rem', lineHeight: 1, color: 'var(--text)' }}>{formatPrice(selectedVariant.priceCents)}</strong>
                </div>
              </div>

              <button
                type="button"
                className="btn btn-primary btn-block"
                onClick={() => onAddToCart(selectedVariant.sku)}
                aria-label={`Add ${product.name}, ${selectedVariant.label}, to cart`}
              >
                Add to Cart
              </button>

              <p style={{ background: '#f6f1ff', borderLeft: '3px solid var(--purple-3)', borderRadius: '0 10px 10px 0', fontSize: '0.84rem', fontWeight: 700, marginTop: '18px', padding: '12px 14px' }}>
                Research Use Only. Not for human, veterinary, or household use.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="container" style={{ paddingBlock: '56px' }}>
        <div style={{ background: '#fff', border: '1px solid var(--border)', borderRadius: 'var(--radius-sm)', maxWidth: '720px', padding: '24px' }}>
          <span className="eyebrow">Evidence</span>
          {product.evidence === 'on_request' ? (
            <>
              <h2 style={{ fontSize: '1.4rem', marginBottom: '8px' }}>Certificate of Analysis available on request</h2>
              <p>
                Contact <a href="mailto:support@pepcorelabs.io" style={{ color: 'var(--purple)', fontWeight: 800 }}>support@pepcorelabs.io</a> with the product name and selected size for documentation.
              </p>
            </>
          ) : (
            // TODO: Present documentation when catalog items with available evidence are introduced.
            <p>Documentation details will be listed here.</p>
          )}
        </div>
      </section>

      {relatedProducts.length > 0 && (
        <section style={{ background: 'var(--light)', padding: '56px 0 72px' }}>
          <div className="container">
            <span className="eyebrow">Explore more</span>
            <h2>Related research materials</h2>
            <p style={{ marginBottom: '28px' }}>More products from the {category.name} catalog.</p>
            <div style={{ display: 'grid', gap: '18px', gridTemplateColumns: 'repeat(auto-fit, minmax(210px, 1fr))' }}>
              {relatedProducts.map((relatedProduct) => (
                <ProductCard key={relatedProduct.slug} product={relatedProduct} onAddToCart={onAddToCart} />
              ))}
            </div>
          </div>
        </section>
      )}
    </main>
  );
}

/** Client boundary for StorefrontShell's render-prop add-to-cart flow. */
export function ProductDetailPage({ product, relatedProducts }: ProductDetailPageProps) {
  return (
    <StorefrontShell>
      {({ onAddToCart }) => (
        <ProductDetail product={product} relatedProducts={relatedProducts} onAddToCart={onAddToCart} />
      )}
    </StorefrontShell>
  );
}

export default ProductDetail;
