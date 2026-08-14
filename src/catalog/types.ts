export type CategorySlug =
  | 'glp1' | 'growth' | 'cosmetic' | 'healing'
  | 'weight-loss' | 'blends' | 'essentials';

export interface Category {
  slug: CategorySlug;
  name: string;
}

export interface ProductVariant {
  sku: string;         // e.g. "tirzepatide-10mg-x10"
  label: string;        // e.g. "10mg × 10 vials"
  priceCents: number;   // integer cents, EUR
}

export type EvidenceStatus = 'on_request' | 'available';

export interface Product {
  slug: string;          // e.g. "tirzepatide"
  name: string;
  category: CategorySlug;
  icon: string;           // filename stem in assets/svgs/, e.g. "tirzepatide" -> assets/svgs/tirzepatide.svg
  variants: ProductVariant[];
  aliases?: string[];
  featured?: boolean;     // best-seller flag
  evidence: EvidenceStatus;
  researchUseOnly: true;
}
