'use client';

import React, { useState } from 'react';

interface FAQItem {
  question: string;
  answer: string;
}

const FAQ_ITEMS: FAQItem[] = [
  {
    question: 'Are your products for human use?',
    answer:
      'No. All products are intended for laboratory and research use only. They are not for human consumption, medical, veterinary, or household use.',
  },
  {
    question: 'How is your testing documented?',
    answer:
      'Every batch is independently tested for HPLC purity and mass-spec confirmation before release, and results are documented with your order.',
  },
  {
    question: 'How long does shipping take?',
    answer:
      'Orders placed before 3pm CET dispatch the same day. EU delivery typically takes 2–5 business days in discreet packaging.',
  },
  {
    question: 'What purity can I expect?',
    answer:
      'Our peptides are released at ≥99% HPLC purity, with endotoxin testing available on select batches. Purity is documented per batch.',
  },
  {
    question: 'Do you offer wholesale or custom synthesis?',
    answer:
      "Yes. Contact us with your program and we'll connect you with our wholesale and custom-synthesis teams within one business day.",
  },
  {
    question: 'How are orders packaged?',
    answer:
      'Vials ship lyophilized in temperature-stable, discreet packaging with no external branding indicating contents.',
  },
];

export const FAQSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="bg-[var(--bg-surface)] py-20 scroll-mt-32" id="faq">
      <div className="max-w-[860px] mx-auto px-6">

        {/* Header — left-aligned for a more editorial / authoritative feel */}
        <div className="mb-10">
          <span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[var(--accent)]">
            FAQ
          </span>
          <h2 className="mt-2 text-[1.9rem] sm:text-[2.2rem] font-bold tracking-[-0.02em]
            text-[var(--text)] leading-tight">
            Frequently asked questions
          </h2>
        </div>

        {/* Accordion */}
        <div className="flex flex-col rounded-[var(--radius)] border border-[var(--border)]
          overflow-hidden divide-y divide-[var(--border)]">
          {FAQ_ITEMS.map((item, index) => {
            const isOpen = openIndex === index;
            return (
              <div key={item.question} className="bg-[var(--bg-card)]">
                <button
                  type="button"
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  className="flex w-full items-center justify-between gap-4 px-6 py-4 text-left
                    hover:bg-[var(--bg-well)] transition-colors duration-150"
                  aria-expanded={isOpen}
                >
                  <span className="font-semibold text-[0.94rem] text-[var(--text)]">
                    {item.question}
                  </span>
                  <span
                    className={`shrink-0 grid place-items-center w-6 h-6 rounded-full
                      border border-[var(--accent)]/40 text-[var(--accent)] text-lg
                      transition-transform duration-200 ${isOpen ? 'rotate-45' : ''}`}
                    aria-hidden="true"
                  >
                    +
                  </span>
                </button>

                {isOpen && (
                  <p className="px-6 pb-5 pt-0.5 text-[13.5px] leading-relaxed
                    text-[var(--text-muted)]">
                    {item.answer}
                  </p>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
