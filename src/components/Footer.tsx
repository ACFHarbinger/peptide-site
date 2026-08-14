'use client';

import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#120d20] text-white/80">
      <div className="mx-auto grid max-w-[1180px] grid-cols-1 gap-10 px-6 py-14 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <h3 className="text-lg font-black tracking-wide text-white">PEPCORE LABS</h3>
          <p className="mt-3 max-w-xs text-sm text-white/60">
            Premium research-grade products with independent testing, documented analysis, and
            fast EU-wide shipping.
          </p>
          <div className="mt-4 flex gap-3 text-lg">
            <a href="#" aria-label="Instagram" className="hover:text-white">
              ◎
            </a>
            <a href="#" aria-label="TikTok" className="hover:text-white">
              ♪
            </a>
          </div>
        </div>

        <div>
          <h4 className="text-sm font-bold uppercase tracking-wide text-white">Shop</h4>
          <nav className="mt-3 flex flex-col gap-2 text-sm">
            <a href="#best-sellers" className="hover:text-white">
              Best Sellers
            </a>
            <a href="#catalog" className="hover:text-white">
              All Peptides
            </a>
            <a href="#cart" className="hover:text-white">
              Cart
            </a>
          </nav>
        </div>

        <div>
          <h4 className="text-sm font-bold uppercase tracking-wide text-white">Company</h4>
          <nav className="mt-3 flex flex-col gap-2 text-sm">
            <a href="#testing" className="hover:text-white">
              Testing &amp; Analysis
            </a>
            <a href="#faq" className="hover:text-white">
              FAQ
            </a>
            <a href="#" className="hover:text-white">
              Wholesale
            </a>
            <a href="mailto:support@pepcorelabs.io" className="hover:text-white">
              support@pepcorelabs.io
            </a>
          </nav>
        </div>

        <div>
          <h4 className="text-sm font-bold uppercase tracking-wide text-white">Legal</h4>
          <nav className="mt-3 flex flex-col gap-2 text-sm">
            <a href="/legal/privacy" className="hover:text-white">
              Privacy Policy
            </a>
            <a href="/legal/terms" className="hover:text-white">
              Terms of Service
            </a>
            <a href="/legal/shipping" className="hover:text-white">
              Shipping &amp; Returns
            </a>
            <a href="/legal/research-use-only" className="hover:text-white">
              Research Use Only
            </a>
          </nav>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-[1180px] flex-col gap-2 px-6 py-5 text-xs text-white/50 sm:flex-row sm:items-center sm:justify-between">
          <p className="max-w-2xl">
            Products are intended for laboratory and research use only. Not for human
            consumption, medical, veterinary, or household use. By purchasing, you confirm you
            are a qualified researcher.
          </p>
          <span>PEPCORE LABS © 2026</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
