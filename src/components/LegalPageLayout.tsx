'use client';

import React from 'react';
import { StorefrontShell } from './StorefrontShell';

export interface LegalPageLayoutProps {
  title: string;
  lastReviewed: string;
  children: React.ReactNode;
}

export const LegalPageLayout: React.FC<LegalPageLayoutProps> = ({
  title,
  lastReviewed,
  children,
}) => {
  return (
    <StorefrontShell>
      {() => (
        <section className="bg-white py-16">
          <div className="mx-auto max-w-[760px] px-6">
            <div className="mb-8 border-b border-[#432d76]/10 pb-6">
              <span className="inline-block rounded-full bg-[#f6f1ff] px-3 py-1 text-[11px] font-bold uppercase tracking-wide text-[#8f67ff]">
                Draft — pending legal review
              </span>
              <h1 className="mt-3 text-3xl font-black text-[#120d20]">{title}</h1>
              <p className="mt-1 text-xs text-[#4d4762]">Last reviewed: {lastReviewed}</p>
            </div>

            <div className="flex flex-col gap-6 text-sm leading-relaxed text-[#4d4762] [&_h2]:mt-2 [&_h2]:text-lg [&_h2]:font-extrabold [&_h2]:text-[#120d20] [&_ul]:list-disc [&_ul]:pl-5 [&_li]:mt-1 [&_a]:font-semibold [&_a]:text-[#432D76] [&_a]:underline [&_strong]:text-[#120d20]">
              {children}
            </div>
          </div>
        </section>
      )}
    </StorefrontShell>
  );
};

export default LegalPageLayout;
