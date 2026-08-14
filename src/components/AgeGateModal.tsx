'use client';

import React from 'react';

export interface AgeGateModalProps {
  open: boolean;
  onConfirm: () => void;
  onDecline?: () => void;
}

export const AgeGateModal: React.FC<AgeGateModalProps> = ({
  open,
  onConfirm,
  onDecline,
}) => {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[100] grid place-items-center p-5">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_18%,rgba(143,103,255,0.22),transparent_46%),rgba(10,4,20,0.8)] backdrop-blur-md" />

      {/* Modal panel */}
      <div className="relative w-[min(480px,calc(100vw-40px))] bg-white rounded-[28px] p-[42px_36px] text-center shadow-[0_40px_100px_rgba(8,3,18,0.45)] animate-in fade-in zoom-in duration-300">
        <div className="grid place-items-center w-[68px] h-[68px] mx-auto mb-5 rounded-[20px] bg-gradient-to-br from-[#432D76] to-[#6d4dcc] text-white text-2xl shadow-[0_16px_34px_rgba(67,45,118,0.34)]">
          ◈
        </div>

        <span className="inline-flex px-3.5 py-1.5 rounded-full border border-[#432d76]/16 bg-[#f6f2ff] text-[#432D76] text-[11px] font-extrabold tracking-widest uppercase mb-4">
          Age Verification
        </span>

        <h2 className="text-2xl sm:text-3xl md:text-[2.4rem] font-black leading-tight text-[#120d20] mb-3">
          Are you 21 or older?
        </h2>

        <p className="text-[#7d7592] text-base max-w-[40ch] mx-auto leading-relaxed">
          This store contains research products for qualified researchers aged 21 and over.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 mt-6.5">
          <button
            onClick={onConfirm}
            className="flex-1 min-h-[56px] py-3.5 px-6 rounded-full bg-[#5A34CC] hover:bg-[#432D76] text-white font-extrabold text-sm shadow-[0_14px_30px_rgba(90,52,204,0.30)] transition-all"
          >
            Yes, I am 21+
          </button>

          {onDecline ? (
            <button
              onClick={onDecline}
              className="flex-1 min-h-[56px] py-3.5 px-6 rounded-full bg-white text-[#5a5270] border-1.5 border-[#432d76]/16 hover:border-[#432d76]/34 hover:text-[#432D76] hover:bg-[#faf8ff] font-extrabold text-sm transition-all"
            >
              Exit
            </button>
          ) : (
            <a
              href="https://www.google.com"
              className="flex-1 min-h-[56px] py-3.5 px-6 rounded-full bg-white text-[#5a5270] border-1.5 border-[#432d76]/16 hover:border-[#432d76]/34 hover:text-[#432D76] hover:bg-[#faf8ff] font-extrabold text-sm transition-all grid place-items-center"
            >
              Exit
            </a>
          )}
        </div>

        <p className="text-[11.5px] text-[#7d7592] mt-4 mb-0">
          Research use only. Not for human consumption.
        </p>
      </div>
    </div>
  );
};

export default AgeGateModal;
