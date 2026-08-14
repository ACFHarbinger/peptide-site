/**
 * Prefix a root-relative public path with the Next.js basePath.
 * Local `next dev` uses an empty base; production GitHub Pages uses `/peptide-site`.
 */
export function withBasePath(path: string): string {
  const base = process.env.NEXT_PUBLIC_BASE_PATH ?? '';
  const normalized = path.startsWith('/') ? path : `/${path}`;
  return `${base}${normalized}`;
}

export function vialSrc(icon: string): string {
  return withBasePath(`/assets/svgs/${icon}.svg`);
}
