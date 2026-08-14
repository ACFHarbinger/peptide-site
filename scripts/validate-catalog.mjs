// Run with: node scripts/validate-catalog.mjs
// This loads the TypeScript catalog through TypeScript's in-process CommonJS transpiler.

import { readFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { createRequire } from 'node:module';

/** @typedef {import('../src/catalog/types.ts').Product} Product */
/** @typedef {import('../src/catalog/types.ts').CategorySlug} CategorySlug */

const require = createRequire(import.meta.url);
const TypeScript = require('typescript');
const Module = require('module');
const catalogPath = resolve('src/catalog/products.ts');
const validCategories = new Set([
  'glp1',
  'growth',
  'cosmetic',
  'healing',
  'weight-loss',
  'blends',
  'essentials',
]);

function loadCatalog() {
  const source = readFileSync(catalogPath, 'utf8');
  const output = TypeScript.transpileModule(source, {
    compilerOptions: {
      module: TypeScript.ModuleKind.CommonJS,
      target: TypeScript.ScriptTarget.ES2022,
    },
    fileName: catalogPath,
  }).outputText;
  const catalogModule = new Module(catalogPath);
  catalogModule.filename = catalogPath;
  catalogModule.paths = Module._nodeModulePaths(dirname(catalogPath));
  catalogModule._compile(output, catalogPath);
  return catalogModule.exports;
}

let catalog;
try {
  const module = loadCatalog();
  catalog = module.PRODUCTS ?? module.products ?? module.default;
} catch (error) {
  console.error(`catalog validation failed: unable to load ${catalogPath}`);
  console.error(error instanceof Error ? error.message : String(error));
  process.exit(1);
}

const violations = [];
if (!Array.isArray(catalog)) {
  violations.push('catalog must export a products array');
}

const slugs = new Set();
const skus = new Set();
let variantCount = 0;

for (const [productIndex, product] of (Array.isArray(catalog) ? catalog : []).entries()) {
  const productLabel = `product at index ${productIndex}`;
  const slug = product?.slug;

  if (typeof slug !== 'string' || slug.trim() === '') {
    violations.push(`${productLabel} has an empty slug`);
  } else if (slugs.has(slug)) {
    violations.push(`${productLabel} has duplicate slug "${slug}"`);
  } else {
    slugs.add(slug);
  }

  if (!validCategories.has(product?.category)) {
    violations.push(`${productLabel} (${slug ?? 'no slug'}) has invalid category "${String(product?.category)}"`);
  }

  if (!Array.isArray(product?.variants)) {
    violations.push(`${productLabel} (${slug ?? 'no slug'}) must have a variants array`);
    continue;
  }

  for (const [variantIndex, variant] of product.variants.entries()) {
    variantCount += 1;
    const variantLabel = `${productLabel} (${slug ?? 'no slug'}), variant at index ${variantIndex}`;
    const sku = variant?.sku;

    if (typeof sku !== 'string' || sku.trim() === '') {
      violations.push(`${variantLabel} has an empty sku`);
    } else if (skus.has(sku)) {
      violations.push(`${variantLabel} has duplicate sku "${sku}"`);
    } else {
      skus.add(sku);
    }

    if (!Number.isInteger(variant?.priceCents) || variant.priceCents <= 0) {
      violations.push(`${variantLabel} has non-positive or non-integer priceCents "${String(variant?.priceCents)}"`);
    }
  }
}

if (violations.length > 0) {
  console.error(`catalog validation failed (${violations.length} violation${violations.length === 1 ? '' : 's'}):`);
  for (const violation of violations) console.error(`- ${violation}`);
  process.exit(1);
}

console.log(`catalog valid: ${catalog.length} products, ${variantCount} variants`);
