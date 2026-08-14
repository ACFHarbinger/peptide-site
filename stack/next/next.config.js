/** @type {import('next').NextConfig} */
const siteBase =
  process.env.SITE_BASE ??
  (process.env.NODE_ENV === 'production' ? '/peptide-site' : '');

const nextConfig = {
  output: 'export',
  basePath: siteBase,
  assetPrefix: siteBase,
  images: {
    // GitHub Pages has no Next.js image optimization server.
    unoptimized: true,
  },
  reactStrictMode: true,
  pageExtensions: ["tsx", "ts"],
};

export default nextConfig;
