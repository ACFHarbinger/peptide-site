'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';

export interface HeaderProps {
  cartItemCount?: number;
  onCartClick?: () => void;
  onSearchClick?: () => void;
}

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
      {/* Hexagonal outer badge */}
      <path
        d="M14 2L25 8.2V19.8L14 26L3 19.8V8.2Z"
        stroke="currentColor"
        strokeWidth="1.4"
      />
      {/* Inner precision reticle */}
      <circle cx="14" cy="14" r="4.8" stroke="currentColor" strokeWidth="1.1" />
      <line x1="14" y1="9.2" x2="14" y2="18.8" stroke="currentColor" strokeWidth="0.9" />
      <line x1="9.2" y1="14" x2="18.8" y2="14" stroke="currentColor" strokeWidth="0.9" />
    </svg>
  );
}

function ThemeToggle() {
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    setIsDark(document.documentElement.getAttribute('data-theme') !== 'light');
  }, []);

  const toggle = () => {
    const next = isDark ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', next);
    setIsDark(!isDark);
  };

  return (
    <button
      onClick={toggle}
      className="grid place-items-center w-9 h-9 rounded-full text-[var(--text-muted)] hover:text-[var(--text)] hover:bg-[var(--border)] transition-colors"
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
    >
      {isDark ? (
        /* Sun icon */
        <svg className="w-[15px] h-[15px] fill-none stroke-current" strokeWidth="1.6" viewBox="0 0 24 24">
          <circle cx="12" cy="12" r="4.5" />
          <line x1="12" y1="2.5" x2="12" y2="4.5" />
          <line x1="12" y1="19.5" x2="12" y2="21.5" />
          <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
          <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
          <line x1="2.5" y1="12" x2="4.5" y2="12" />
          <line x1="19.5" y1="12" x2="21.5" y2="12" />
          <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
          <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
        </svg>
      ) : (
        /* Moon icon */
        <svg className="w-[15px] h-[15px] fill-none stroke-current" strokeWidth="1.6" viewBox="0 0 24 24">
          <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      )}
    </button>
  );
}

const NAV_ITEMS = [
  { href: '#best-sellers', label: 'Best Sellers', isNextLink: false },
  { href: '/catalog',      label: 'Catalog',      isNextLink: true  },
  { href: '#testing',      label: 'Testing & Analysis', isNextLink: false },
  { href: '#faq',          label: 'FAQ',           isNextLink: false },
];

export const Header: React.FC<HeaderProps> = ({
  cartItemCount = 0,
  onCartClick,
  onSearchClick,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 8);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const iconBtn = `grid place-items-center w-9 h-9 rounded-full text-[var(--text-muted)]
    hover:text-[var(--text)] hover:bg-[var(--border)] transition-colors`;

  return (
    <>
      {/* Announcement bar */}
      <div className="bg-[var(--bg-base)] border-b border-[var(--border-dim)]">
        <div className="max-w-[1180px] mx-auto px-6 py-[9px] flex items-center justify-between
          text-[10px] font-medium tracking-[0.13em] uppercase text-[var(--text-dim)]">
          <div className="flex items-center gap-3">
            <span>Made in EU</span>
            <span className="w-px h-3 bg-[var(--border)]" aria-hidden="true" />
            <span>Same-Day Shipping</span>
            <span className="w-px h-3 bg-[var(--border)] hidden sm:block" aria-hidden="true" />
            <span className="hidden sm:block">Research Use Only</span>
          </div>
          <span className="hidden md:block">Fast &amp; Discreet EU-Wide Shipping</span>
        </div>
      </div>

      {/* Main header */}
      <header
        id="site-header"
        className={`sticky top-0 z-50 bg-[var(--bg-surface)] border-b border-[var(--border-dim)]
          backdrop-blur-md transition-shadow duration-200 ${isScrolled ? 'shadow-[var(--shadow)]' : ''}`}
      >
        <div className="max-w-[1180px] mx-auto px-6 h-[58px] flex items-center justify-between gap-5">

          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-2.5 text-[var(--text)] hover:opacity-80 transition-opacity shrink-0"
          >
            <EmblemIcon className="w-[26px] h-[26px]" />
            <span className="font-semibold text-[1rem] tracking-[0.1em] uppercase">
              Pepcore<span className="text-[var(--accent)]">Labs</span>
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-6" aria-label="Main navigation">
            {NAV_ITEMS.map(({ href, label, isNextLink }) =>
              isNextLink ? (
                <Link
                  key={label}
                  href={href}
                  className="text-[13px] font-medium text-[var(--text-muted)] hover:text-[var(--text)] transition-colors"
                >
                  {label}
                </Link>
              ) : (
                <a
                  key={label}
                  href={href}
                  className="text-[13px] font-medium text-[var(--text-muted)] hover:text-[var(--text)] transition-colors"
                >
                  {label}
                </a>
              )
            )}
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-0.5">
            <ThemeToggle />

            <button
              onClick={onSearchClick}
              className={iconBtn}
              aria-label="Search"
            >
              <svg className="w-[15px] h-[15px] fill-none stroke-current" strokeWidth="1.7" viewBox="0 0 24 24">
                <circle cx="11" cy="11" r="7" />
                <line x1="16.5" y1="16.5" x2="21" y2="21" />
              </svg>
            </button>

            <button className={iconBtn} aria-label="Account">
              <svg className="w-[15px] h-[15px] fill-none stroke-current" strokeWidth="1.7" viewBox="0 0 24 24">
                <circle cx="12" cy="8" r="4" />
                <path d="M4 21c0-4 3.6-6 8-6s8 2 8 6" strokeLinecap="round" />
              </svg>
            </button>

            <button
              onClick={onCartClick}
              className={`${iconBtn} relative`}
              aria-label="Shopping cart"
            >
              <svg className="w-[15px] h-[15px] fill-none stroke-current" strokeWidth="1.7" viewBox="0 0 24 24">
                <path d="M6 7h12l-1.2 12H7.2L6 7Z" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M9 7a3 3 0 0 1 6 0" />
              </svg>
              {cartItemCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 min-w-[16px] h-4 px-0.5 rounded-full
                  bg-[var(--accent)] text-white text-[9px] font-bold grid place-items-center leading-none">
                  {cartItemCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
