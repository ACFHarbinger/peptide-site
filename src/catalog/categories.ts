import type { Category, CategorySlug } from './types';

export const CATEGORIES: Category[] = [
  { slug: 'glp1', name: 'GLP-1 Agonists' },
  { slug: 'growth', name: 'Growth Hormone & Antiaging' },
  { slug: 'cosmetic', name: 'Cosmetic & Longevity' },
  { slug: 'healing', name: 'Healing & Recovery' },
  { slug: 'weight-loss', name: 'Advanced Weight Loss' },
  { slug: 'blends', name: 'Specialty Blends & NAD+' },
  { slug: 'essentials', name: 'Lab Essentials' },
];

export const CATEGORY_BY_SLUG: Record<CategorySlug, Category> = CATEGORIES.reduce(
  (acc, category) => {
    acc[category.slug] = category;
    return acc;
  },
  {} as Record<CategorySlug, Category>,
);
