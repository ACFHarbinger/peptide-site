import { defineConfig } from 'astro/config';

// peptide-site research/content island (lab-testing/purity write-ups, science
// background). Built with Astro + Framer Motion into public/astro-island for
// the Next.js host. base must align with SITE_BASE when deploying under a
// GitHub Pages project path (e.g. /peptide-site/).
const siteBase = process.env.SITE_BASE || '/';
const islandBase = `${siteBase.replace(/\/?$/, '/')}astro-island`;

export default defineConfig({
  srcDir: './src/frameworks/astro',
  outDir: './public/astro-island',
  publicDir: './astro-public',
  base: islandBase,
  build: {
    format: 'directory',
  },
  vite: {
    css: {
      postcss: {},
    },
  },
});
