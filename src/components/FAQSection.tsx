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
      'Our peptides are released at ≥ 99% HPLC purity, with endotoxin testing available on select batches. Purity is documented per batch.',
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
    <section className="bg-white py-20" id="faq">
      <div className="mx-auto max-w-[860px] px-6">
        <div className="mb-10 text-center">
          <span className="text-xs font-bold uppercase tracking-widest text-[#8f67ff]">FAQ</span>
          <h2 className="mt-2 text-3xl font-black text-[#120d20]">Frequently asked questions</h2>
        </div>

        <div className="flex flex-col divide-y divide-[#432d76]/10 rounded-2xl border border-[#432d76]/10">
          {FAQ_ITEMS.map((item, index) => {
            const isOpen = openIndex === index;
            return (
              <div key={item.question}>
                <button
                  type="button"
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
                  aria-expanded={isOpen}
                >
                  <span className="font-bold text-[#120d20]">{item.question}</span>
                  <span
                    className={`shrink-0 text-xl text-[#8f67ff] transition-transform ${
                      isOpen ? 'rotate-45' : ''
                    }`}
                    aria-hidden="true"
                  >
                    +
                  </span>
                </button>
                {isOpen && (
                  <p className="px-5 pb-4 text-sm leading-relaxed text-[#4d4762]">{item.answer}</p>
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
