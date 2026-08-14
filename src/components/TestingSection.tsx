'use client';

import React from 'react';

interface ScienceCard {
  icon: string;
  title: string;
  description: string;
}

const SCIENCE_CARDS: ScienceCard[] = [
  {
    icon: '⛁',
    title: 'HPLC Purity ≥ 99%',
    description: 'High-performance liquid chromatography confirms purity on every released batch.',
  },
  {
    icon: '◫',
    title: 'Mass Spectrometry',
    description: 'ESI-MS molecular weight confirmation verifies the correct peptide sequence.',
  },
  {
    icon: '☰',
    title: 'Independent Testing',
    description: 'Each batch is analyzed independently before release — no data, no sale.',
  },
  {
    icon: '↻',
    title: 'Batch Traceability',
    description: 'Chain-of-custody records track every lot from resin to your lab bench.',
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
    <section className="bg-[#f6f1ff] py-20" id="testing">
      <div className="mx-auto max-w-[1180px] px-6">
        <div className="mb-10 max-w-2xl">
          <span className="text-xs font-bold uppercase tracking-widest text-[#8f67ff]">
            Testing &amp; Analysis
          </span>
          <h2 className="mt-2 text-3xl font-black text-[#120d20]">
            Every batch is independently verified
          </h2>
          <p className="mt-2 text-[#4d4762]">
            We don&apos;t self-certify. Each production lot is sent to an independent analytical
            lab before release.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {SCIENCE_CARDS.map((card) => (
            <div
              key={card.title}
              className="rounded-2xl border border-[#432d76]/10 bg-white p-6 shadow-[0_2px_10px_rgba(67,45,118,0.06)]"
            >
              <span className="text-3xl" aria-hidden="true">
                {card.icon}
              </span>
              <h3 className="mt-3 text-base font-extrabold text-[#120d20]">{card.title}</h3>
              <p className="mt-1.5 text-sm text-[#4d4762]">{card.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestingSection;
