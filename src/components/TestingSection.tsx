'use client';

import React from 'react';

interface ScienceCard {
  title: string;
  description: string;
  icon: React.ReactNode;
}

const CheckBadgeIcon = () => (
  <svg className="w-6 h-6 fill-none stroke-[var(--accent)]" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
    <path d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
  </svg>
);

const FlaskIcon = () => (
  <svg className="w-6 h-6 fill-none stroke-[var(--accent)]" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
    <path d="M9 3h6M10 3v7L6.5 17A2 2 0 008.3 20h7.4a2 2 0 001.8-3L14 10V3" />
    <line x1="6" y1="15" x2="18" y2="15" />
  </svg>
);

const MicroscopeIcon = () => (
  <svg className="w-6 h-6 fill-none stroke-[var(--accent)]" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
    <path d="M6 18H4a1 1 0 01-1-1v-1a4 4 0 014-4h14" />
    <path d="M12 18v3" />
    <rect x="10" y="2" width="4" height="12" rx="1" />
    <path d="M14 8h3" />
  </svg>
);

const ClipboardIcon = () => (
  <svg className="w-6 h-6 fill-none stroke-[var(--accent)]" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
    <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2" />
    <rect x="9" y="3" width="6" height="4" rx="1" />
    <line x1="9" y1="12" x2="15" y2="12" />
    <line x1="9" y1="16" x2="13" y2="16" />
  </svg>
);

const SCIENCE_CARDS: ScienceCard[] = [
  {
    title: 'HPLC Purity ≥99%',
    description:
      'High-performance liquid chromatography confirms purity on every released batch — no exceptions.',
    icon: <CheckBadgeIcon />,
  },
  {
    title: 'Mass Spectrometry',
    description:
      'ESI-MS molecular weight confirmation verifies the correct peptide sequence before any batch ships.',
    icon: <FlaskIcon />,
  },
  {
    title: 'Independent Testing',
    description:
      'Each production lot is sent to a third-party analytical lab before release — no data, no sale.',
    icon: <MicroscopeIcon />,
  },
  {
    title: 'Batch Traceability',
    description:
      'Chain-of-custody records track every lot from resin to your lab bench. COA available on request.',
    icon: <ClipboardIcon />,
  },
];

/**
 * Milestone 1 port of the existing "testing/analysis" section. Milestone 3 of
 * docs/moon/ROADMAP.md expands this into the full Astro + Framer Motion
 * research primer (docs/adr/0003, docs/adr/0007) — this component stays a
 * simple visual summary until then.
 */
export const TestingSection: React.FC = () => {
  return (
    <section className="bg-[var(--bg-base)] py-20 scroll-mt-32" id="testing">
      <div className="max-w-[1180px] mx-auto px-6">

        {/* Section header */}
        <div className="mb-10 max-w-2xl">
          <span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[var(--accent)]">
            Testing &amp; Analysis
          </span>
          <h2 className="mt-2 text-[1.9rem] sm:text-[2.2rem] font-bold tracking-[-0.02em]
            text-[var(--text)] leading-tight">
            Every batch independently verified
          </h2>
          <p className="mt-2.5 text-[14px] leading-relaxed text-[var(--text-muted)]">
            We don&apos;t self-certify. Each production lot is sent to an independent analytical
            lab before release.
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {SCIENCE_CARDS.map((card) => (
            <div
              key={card.title}
              className="relative rounded-[var(--radius)] bg-[var(--bg-card)]
                border border-[var(--border)] p-6 overflow-hidden
                hover:border-[var(--accent)]/30 hover:-translate-y-0.5
                transition-all duration-200 shadow-[var(--shadow)]"
            >
              {/* Cobalt top accent line */}
              <div
                className="absolute top-0 left-0 right-0 h-[2.5px] bg-[var(--accent)] rounded-t-[var(--radius)]"
                aria-hidden="true"
              />

              <div className="mt-2 mb-4">{card.icon}</div>
              <h3 className="text-[0.95rem] font-semibold text-[var(--text)] mb-1.5">
                {card.title}
              </h3>
              <p className="text-[13px] leading-relaxed text-[var(--text-muted)]">
                {card.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestingSection;
