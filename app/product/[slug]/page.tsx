import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { PRODUCTS } from '../../../src/catalog/products';
import { CATEGORY_BY_SLUG } from '../../../src/catalog/categories';
import { ProductDetailPage } from '../../../src/components/ProductDetail';

interface ProductPageProps {
  params: { slug: string };
}

export const dynamicParams = false;

export function generateStaticParams() {
  return PRODUCTS.map(({ slug }) => ({ slug }));
}

export function generateMetadata({ params }: ProductPageProps): Metadata {
  const product = PRODUCTS.find(({ slug }) => slug === params.slug);

  if (!product) {
    return { title: 'Product not found — PepCore Labs' };
  }

  const category = CATEGORY_BY_SLUG[product.category];

  return {
    title: `${product.name} — PepCore Labs`,
    description: `${product.name} in our ${category.name} catalog. Research Use Only; not for human, veterinary, or household use.`,
  };
}

export default function ProductPage({ params }: ProductPageProps) {
  const product = PRODUCTS.find(({ slug }) => slug === params.slug);

  if (!product) {
    notFound();
  }

  const relatedProducts = PRODUCTS.filter(
    (candidate) => candidate.category === product.category && candidate.slug !== product.slug,
  ).slice(0, 4);

  return <ProductDetailPage product={product} relatedProducts={relatedProducts} />;
}
