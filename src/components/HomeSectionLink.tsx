'use client';

import React from 'react';
import Link from 'next/link';
import { withBasePath } from '../lib/paths';

export type HomeSectionId = 'best-sellers' | 'testing' | 'faq';

export interface HomeSectionLinkProps {
  section: HomeSectionId;
  className?: string;
  children: React.ReactNode;
}

/**
 * Jump to a homepage section. On `/` this smooth-scrolls in place; from
 * /catalog (or any other route) it navigates to `/#section` first.
 */
export const HomeSectionLink: React.FC<HomeSectionLinkProps> = ({
  section,
  className,
  children,
}) => {
  return (
    <Link
      href={`/#${section}`}
      className={className}
      onClick={(event) => {
        const target = document.getElementById(section);
        if (!target) return;
        event.preventDefault();
        target.scrollIntoView({ behavior: 'smooth' });
        window.history.replaceState(null, '', withBasePath(`/#${section}`));
      }}
    >
      {children}
    </Link>
  );
};

export default HomeSectionLink;
