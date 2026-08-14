'use client';

import { usePathname } from 'next/navigation';
import { useEffect } from 'react';

/**
 * After a client navigation to `/#section` (e.g. Catalog → FAQ), scroll
 * to the matching element. Same-page clicks are handled by HomeSectionLink.
 */
export function ScrollToHash() {
  const pathname = usePathname();

  useEffect(() => {
    const id = window.location.hash.replace(/^#/, '');
    if (!id) return;

    const scroll = () => {
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    };

    const frame = window.requestAnimationFrame(() => {
      window.setTimeout(scroll, 0);
    });
    return () => window.cancelAnimationFrame(frame);
  }, [pathname]);

  return null;
}

export default ScrollToHash;
