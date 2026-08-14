'use client';

import React from 'react';

export interface HeroProps {
  titleLine1?: string;
  titleLine2?: string;
  subtitle?: string;
  shopUrl?: string;
  testingUrl?: string;
}

export const Hero: React.FC<HeroProps> = ({
  titleLine1 = 'Premium research.',
  titleLine2 = 'Real results.',
  subtitle = 'Ultra-pure, lab-tested compounds trusted by researchers across the EU. No fillers. No gimmicks. Just science.',
  shopUrl = '#catalog',
  testingUrl = '#testing',
}) => {
  return (
    <section className="bg-[radial-gradient(900px_480px_at_85%_-10%,rgba(143,103,255,0.16),transparent_60%),radial-gradient(700px_420px_at_0%_30%,rgba(255,215,107,0.10),transparent_55%),linear-gradient(180deg,#fbf9ff,#fff)] pt-16 pb-10">
      <div className="max-w-[1180px] mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-[1.15fr_0.85fr] gap-12 items-center">
          <div className="text-center lg:text-left">
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#ede5ff] text-[#5A34CC] text-xs font-extrabold tracking-widest uppercase mb-5.5">
              Premium Research Peptides
            </span>

            <h1 className="text-4xl sm:text-6xl lg:text-[6.2rem] font-black leading-[0.95] tracking-tight uppercase mb-6">
              <span className="block bg-gradient-to-r from-[#2a1c4d] to-[#5a3d9a] bg-clip-text text-transparent">
                {titleLine1}
              </span>
              <span className="block bg-gradient-to-r from-[#8f67ff] to-[#5A34CC] bg-clip-text text-transparent">
                {titleLine2}
              </span>
            </h1>

            <p className="text-base sm:text-lg text-[#4d4762] max-w-[36em] mx-auto lg:mx-0 mb-7.5 leading-relaxed">
              {subtitle}
            </p>

            <div className="flex flex-wrap justify-center lg:justify-start gap-3.5">
              <a
                href={shopUrl}
                className="inline-flex items-center justify-center gap-2 min-h-[48px] px-6 py-3.25 rounded-full bg-[#5A34CC] hover:bg-[#432D76] text-white font-extrabold text-sm tracking-wide shadow-[0_14px_30px_rgba(90,52,204,0.30)] hover:-translate-y-0.5 transition-all"
              >
                Shop Peptides →
              </a>
              <a
                href={testingUrl}
                className="inline-flex items-center justify-center gap-2 min-h-[48px] px-6 py-3.25 rounded-full bg-white text-[#8f67ff] border-1.5 border-[#8f67ff]/45 hover:border-[#432D76] hover:text-[#432D76] font-extrabold text-sm tracking-wide hover:-translate-y-0.5 transition-all"
              >
                View Testing
              </a>
            </div>
          </div>

          <div className="relative flex justify-center items-end mt-4 lg:mt-0">
            <img
              src="/assets/svgs/retatrutide.svg"
              alt="Retatrutide vial"
              className="w-[38%] drop-shadow-[0_30px_40px_rgba(67,45,118,0.30)]"
            />
            <img
              src="/assets/svgs/ghk-cu.svg"
              alt="GHK-CU vial"
              className="w-[44%] -mx-[8%] relative z-10 drop-shadow-[0_30px_40px_rgba(67,45,118,0.30)]"
            />
            <img
              src="/assets/svgs/nad-plus.svg"
              alt="NAD+ vial"
              className="w-[38%] drop-shadow-[0_30px_40px_rgba(67,45,118,0.30)]"
            />
          </div>
        </div>

        {/* Proof Row */}
        <div className="flex flex-wrap justify-center gap-6 sm:gap-8.5 mt-13.5 pt-5.5 border-t border-[#e8dff5]">
          <span className="text-xs sm:text-[13px] font-bold text-[#4d4762] inline-flex items-center gap-2">
            ★★★★★ Trusted by 10,000+ Researchers
          </span>
          <span className="text-xs sm:text-[13px] font-bold text-[#4d4762] inline-flex items-center gap-2">
            ◈ 99%+ Purity Lab Tested
          </span>
          <span className="text-xs sm:text-[13px] font-bold text-[#4d4762] inline-flex items-center gap-2">
            ◈ EU-Wide Shipping — Fast &amp; discreet delivery to your door.
          </span>
          <span className="text-xs sm:text-[13px] font-bold text-[#4d4762] inline-flex items-center gap-2">
            ◈ Research Use Only — For laboratory research purposes only.
          </span>
        </div>
      </div>
    </section>
  );
};

export default Hero;
