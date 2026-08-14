/** @type {import('next').NextConfig} */
const siteBase =
  process.env.SITE_BASE ??
  (process.env.NODE_ENV === 'production' ? '/peptide-site' : '');

const nextConfig = {
  output: 'export',
  basePath: siteBase,
  assetPrefix: siteBase,
  env: {
    // Inlined into client bundles so <img> / <a> paths match basePath.
    NEXT_PUBLIC_BASE_PATH: siteBase,
  },
  images: {
    // GitHub Pages has no Next.js image optimization server.
    unoptimized: true,
  },
  reactStrictMode: true,
  pageExtensions: ["tsx", "ts"],
};

export default nextConfig;
