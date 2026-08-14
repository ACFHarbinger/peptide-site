'use client';

import React, { useState, useEffect } from 'react';

export interface HeaderProps {
  cartItemCount?: number;
  onCartClick?: () => void;
  onSearchClick?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  cartItemCount = 0,
  onCartClick,
  onSearchClick,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 8);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      {/* Announcement bar */}
      <div className="bg-gradient-to-r from-[#170d33] via-[#1d1140] to-[#2a1656] text-white/90">
        <div className="max-w-[1180px] mx-auto px-6 py-2.5 flex items-center justify-between text-[11.5px] font-extrabold tracking-widest uppercase">
          <div className="flex items-center gap-3.5">
            <span>Made in EU</span>
            <span className="w-1 h-1 rounded-full bg-white/35" />
            <span>Same-Day Shipping</span>
            <span className="w-1 h-1 rounded-full bg-white/35 hidden sm:inline-block" />
            <span className="hidden sm:inline-block">Research Use Only</span>
          </div>
          <div className="hidden md:block text-white/85">
            Fast &amp; Discreet EU-Wide Shipping
          </div>
        </div>
      </div>

      {/* Main Header */}
      <header
        id="site-header"
        className={`sticky top-0 z-50 transition-all duration-200 backdrop-blur-md bg-white/80 border-b border-[#432d76]/10 ${
          isScrolled ? 'shadow-[0_18px_48px_rgba(67,45,118,0.10)]' : ''
        }`}
      >
        <div className="max-w-[1180px] mx-auto px-6 h-16 flex items-center justify-between gap-5">
          {/* Logo */}
          <a
            href="#"
            className="font-black text-xl tracking-wider text-[#120d20] hover:opacity-90 transition-opacity"
          >
            PEPCORE<span className="text-[#432D76]">LABS</span>
          </a>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-7">
            <a
              href="#best-sellers"
              className="text-sm font-bold text-[#4d4762] hover:text-[#432D76] transition-colors"
            >
              Best Sellers
            </a>
            <a
              href="/catalog"
              className="text-sm font-bold text-[#4d4762] hover:text-[#432D76] transition-colors"
            >
              Catalog
            </a>
            <a
              href="#testing"
              className="text-sm font-bold text-[#4d4762] hover:text-[#432D76] transition-colors"
            >
              Testing &amp; Analysis
            </a>
            <a
              href="#faq"
              className="text-sm font-bold text-[#4d4762] hover:text-[#432D76] transition-colors"
            >
              FAQ
            </a>
          </nav>

          {/* Header Actions */}
          <div className="flex items-center gap-1.5">
            <button
              onClick={onSearchClick}
              className="relative grid place-items-center w-10.5 h-10.5 rounded-full text-[#120d20] hover:bg-[#f6f1ff] transition-colors"
              aria-label="Search"
            >
              <svg
                className="w-5 h-5 fill-none stroke-current stroke-[1.8] stroke-linecap-round stroke-linejoin-round"
                viewBox="0 0 24 24"
              >
                <circle cx="11" cy="11" r="7" />
                <line x1="16.5" y1="16.5" x2="21" y2="21" />
              </svg>
            </button>

            <button
              className="relative grid place-items-center w-10.5 h-10.5 rounded-full text-[#120d20] hover:bg-[#f6f1ff] transition-colors"
              aria-label="Account"
            >
              <svg
                className="w-5 h-5 fill-none stroke-current stroke-[1.8] stroke-linecap-round stroke-linejoin-round"
                viewBox="0 0 24 24"
              >
                <circle cx="12" cy="8" r="4" />
                <path d="M4 21c0-4 3.6-6 8-6s8 2 8 6" />
              </svg>
            </button>

            <button
              onClick={onCartClick}
              className="relative grid place-items-center w-10.5 h-10.5 rounded-full text-[#120d20] hover:bg-[#f6f1ff] transition-colors"
              aria-label="Cart"
            >
              <svg
                className="w-5 h-5 fill-none stroke-current stroke-[1.8] stroke-linecap-round stroke-linejoin-round"
                viewBox="0 0 24 24"
              >
                <path d="M6 7h12l-1.2 12H7.2L6 7Z" />
                <path d="M9 7a3 3 0 0 1 6 0" />
              </svg>
              {cartItemCount > 0 && (
                <span className="absolute top-0.5 right-0.5 min-w-[18px] h-[18px] px-1 rounded-full bg-[#8f67ff] text-white text-[10px] font-extrabold grid place-items-center">
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
