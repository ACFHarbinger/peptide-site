'use client';

import React from 'react';
import Link from 'next/link';

function EmblemIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 28 28"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path d="M14 2L25 8.2V19.8L14 26L3 19.8V8.2Z" stroke="currentColor" strokeWidth="1.4" />
      <circle cx="14" cy="14" r="4.8" stroke="currentColor" strokeWidth="1.1" />
      <line x1="14" y1="9.2" x2="14" y2="18.8" stroke="currentColor" strokeWidth="0.9" />
      <line x1="9.2" y1="14" x2="18.8" y2="14" stroke="currentColor" strokeWidth="0.9" />
    </svg>
  );
}

const FOOTER_LINKS = {
  Products: [
    { label: 'GLP-1 Agonists',         href: '/catalog?cat=glp1' },
    { label: 'Growth Hormone',          href: '/catalog?cat=growth' },
    { label: 'Cosmetic & Longevity',    href: '/catalog?cat=cosmetic' },
    { label: 'Healing & Recovery',      href: '/catalog?cat=healing' },
    { label: 'Advanced Weight Loss',    href: '/catalog?cat=weight-loss' },
    { label: 'Specialty Blends & NAD+', href: '/catalog?cat=blends' },
    { label: 'Lab Essentials',          href: '/catalog?cat=essentials' },
  ],
  Info: [
    { label: 'Testing & Analysis', href: '#testing' },
    { label: 'FAQ',                href: '#faq' },
    { label: 'Best Sellers',       href: '#best-sellers' },
  ],
  Legal: [
    { label: 'Research Use Only Policy', href: '#' },
    { label: 'Shipping Policy',          href: '#' },
    { label: 'Privacy Policy',           href: '#' },
    { label: 'Terms of Service',         href: '#' },
  ],
};

export const Footer: React.FC = () => {
  const year = new Date().getFullYear();

  return (
    <footer
      style={{ background: 'var(--bg-base)', borderTop: '1px solid var(--border-dim)' }}
    >
      <div className="max-w-[1180px] mx-auto px-6 pt-14 pb-10">

        {/* Top row: logo + columns */}
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-[2fr_1fr_1fr_1fr]">

          {/* Brand column */}
          <div>
            <Link
              href="/"
              className="inline-flex items-center gap-2.5 text-[var(--text)] hover:opacity-80 transition-opacity mb-4"
            >
              <EmblemIcon className="w-[26px] h-[26px]" />
              <span className="font-semibold text-[1rem] tracking-[0.1em] uppercase">
                Pepcore<span className="text-[var(--accent)]">Labs</span>
              </span>
            </Link>
            <p className="text-[13px] leading-relaxed text-[var(--text-muted)] max-w-[26ch]">
              EU-based research peptide supplier. Every batch independently verified before shipment.
            </p>
            <p className="mt-4 text-[11px] font-semibold uppercase tracking-[0.12em]
              text-[var(--text-dim)]">
              Research Use Only
            </p>
          </div>

          {/* Link columns */}
          {Object.entries(FOOTER_LINKS).map(([heading, links]) => (
            <div key={heading}>
              <h3 className="text-[10px] font-semibold uppercase tracking-[0.16em]
                text-[var(--accent)] mb-4">
                {heading}
              </h3>
              <ul className="flex flex-col gap-2.5">
                {links.map(({ label, href }) => (
                  <li key={label}>
                    <Link
                      href={href}
                      className="text-[13px] text-[var(--text-muted)] hover:text-[var(--text)] transition-colors"
                    >
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-6 border-t border-[var(--border-dim)]
          flex flex-col sm:flex-row items-center justify-between gap-3
          text-[11.5px] text-[var(--text-dim)]">
          <span>
            © {year} PepCore Labs. All rights reserved.
          </span>
          <span className="text-center">
            For laboratory research use only — not for human, veterinary, or household use.
          </span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
