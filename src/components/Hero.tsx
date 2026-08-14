'use client';

import React from 'react';
import Link from 'next/link';
import { vialSrc } from '../lib/paths';

export interface HeroProps {
  titleLine1?: string;
  titleLine2?: string;
  titleAccent?: string;
  subtitle?: string;
  shopUrl?: string;
  testingUrl?: string;
}

export const Hero: React.FC<HeroProps> = ({
  titleLine1  = 'Precision',
  titleLine2  = 'Peptides.',
  titleAccent = 'Lab-Verified.',
  subtitle    = 'Ultra-pure, independently tested compounds. Every batch HPLC-verified at ≥99% purity. Shipped discreetly across the EU.',
  shopUrl     = '/catalog',
  testingUrl  = '#testing',
}) => {
  return (
    <section className="relative overflow-hidden bg-[var(--bg-surface)] pt-14 pb-12 sm:pt-20 sm:pb-18">
      {/* Radial cobalt ambient glow — right side */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 65% 55% at 75% 45%, rgba(37,99,235,0.11) 0%, transparent 70%)',
        }}
      />

      <div className="relative max-w-[1180px] mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-[1.15fr_0.85fr] gap-10 items-center">

          {/* ── Copy column ── */}
          <div className="text-center lg:text-left">

            {/* Research badge pill */}
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full
              bg-[var(--accent-light)] border border-[var(--accent)]/25
              text-[var(--accent)] text-[10px] font-semibold tracking-[0.15em] uppercase mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent)]" aria-hidden="true" />
              Research Use Only
            </div>

            {/* Headline */}
            <h1
              className="font-bold uppercase leading-[0.9] tracking-[-0.015em] mb-7"
              style={{ fontSize: 'clamp(2.8rem, 7.2vw, 5.8rem)' }}
            >
              <span className="block text-[var(--text)]">{titleLine1}</span>
              <span className="block text-[var(--text)]">{titleLine2}</span>
              <span className="block text-[var(--accent)]">{titleAccent}</span>
            </h1>

            {/* Subtitle */}
            <p className="text-[var(--text-muted)] text-[1.02rem] leading-relaxed
              max-w-[38em] mx-auto lg:mx-0 mb-8">
              {subtitle}
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap justify-center lg:justify-start gap-3 mb-9">
              <Link
                href={shopUrl}
                className="inline-flex items-center gap-2 px-6 py-[11px] rounded-full
                  bg-[var(--accent)] hover:bg-[var(--accent-hover)]
                  text-white text-[13.5px] font-semibold tracking-wide
                  shadow-[var(--shadow-blue)] hover:-translate-y-0.5 transition-all duration-150"
              >
                Shop Peptides
                <svg
                  className="w-4 h-4 fill-none stroke-current"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  viewBox="0 0 24 24"
                >
                  <path d="M5 12h14M13 6l6 6-6 6" />
                </svg>
              </Link>

              <a
                href={testingUrl}
                className="inline-flex items-center gap-2 px-6 py-[11px] rounded-full
                  border border-[var(--border)] text-[var(--text-muted)]
                  hover:text-[var(--text)] hover:border-[var(--accent)]/40
                  text-[13.5px] font-semibold tracking-wide
                  hover:-translate-y-0.5 transition-all duration-150"
              >
                View Testing
              </a>
            </div>

            {/* Proof strip */}
            <div className="flex flex-wrap justify-center lg:justify-start items-center
              gap-x-5 gap-y-2 pt-6 border-t border-[var(--border-dim)]
              text-[11.5px] font-medium text-[var(--text-muted)]">
              <span className="flex items-center gap-1.5">
                <span className="text-amber-400 tracking-[-0.05em] text-xs">★★★★★</span>
                10,000+ Researchers
              </span>
              <span className="w-px h-3.5 bg-[var(--border)] hidden sm:block" aria-hidden="true" />
              <span className="flex items-center gap-1.5">
                <svg
                  className="w-3.5 h-3.5 fill-none stroke-[var(--accent)]"
                  strokeWidth="1.7"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  viewBox="0 0 24 24"
                >
                  <path d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                </svg>
                ≥99% HPLC Purity
              </span>
              <span className="w-px h-3.5 bg-[var(--border)] hidden sm:block" aria-hidden="true" />
              <span className="flex items-center gap-1.5">
                <svg
                  className="w-3.5 h-3.5 fill-none stroke-[var(--accent)]"
                  strokeWidth="1.7"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  viewBox="0 0 24 24"
                >
                  <circle cx="12" cy="12" r="10" />
                  <path d="M12 6v6l4 2" />
                </svg>
                Same-Day EU Shipping
              </span>
            </div>
          </div>

          {/* ── Vial trio ── */}
          <div className="relative flex justify-center items-end mt-4 lg:mt-0 select-none">
            {/* Cobalt floor glow */}
            <div
              aria-hidden="true"
              className="absolute bottom-0 left-1/2 -translate-x-1/2 w-3/4 h-[60px]
                blur-3xl rounded-full pointer-events-none"
              style={{ background: 'rgba(37,99,235,0.28)' }}
            />

            <img
              src={vialSrc('retatrutide')}
              alt="Retatrutide vial"
              className="relative w-[36%] drop-shadow-[0_20px_36px_rgba(0,0,0,0.56)]"
            />
            <img
              src={vialSrc('ghk-cu')}
              alt="GHK-CU vial"
              className="relative w-[44%] -mx-[5%] z-10 drop-shadow-[0_28px_48px_rgba(0,0,0,0.64)]"
            />
            <img
              src={vialSrc('nad-plus')}
              alt="NAD+ vial"
              className="relative w-[36%] drop-shadow-[0_20px_36px_rgba(0,0,0,0.56)]"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
