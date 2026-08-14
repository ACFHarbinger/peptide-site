'use client';

import React from 'react';

export interface AgeGateModalProps {
  open: boolean;
  onConfirm: () => void;
  onDecline?: () => void;
}

function EmblemIcon() {
  return (
    <svg
      viewBox="0 0 28 28"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="w-8 h-8 text-[var(--accent)]"
      aria-hidden="true"
    >
      <path d="M14 2L25 8.2V19.8L14 26L3 19.8V8.2Z" stroke="currentColor" strokeWidth="1.4" />
      <circle cx="14" cy="14" r="4.8" stroke="currentColor" strokeWidth="1.1" />
      <line x1="14" y1="9.2" x2="14" y2="18.8" stroke="currentColor" strokeWidth="0.9" />
      <line x1="9.2" y1="14" x2="18.8" y2="14" stroke="currentColor" strokeWidth="0.9" />
    </svg>
  );
}

export const AgeGateModal: React.FC<AgeGateModalProps> = ({
  open,
  onConfirm,
  onDecline,
}) => {
  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[100] grid place-items-center p-5"
      role="dialog"
      aria-modal="true"
      aria-labelledby="age-gate-heading"
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 backdrop-blur-sm"
        style={{ background: 'rgba(9,9,14,0.82)' }}
        aria-hidden="true"
      />

      {/* Modal panel */}
      <div
        className="relative w-[min(460px,calc(100vw-40px))]
          rounded-[var(--radius-lg)] bg-[var(--bg-card)]
          border border-[var(--border)] p-10 text-center
          shadow-[var(--shadow-lg)] animate-fade-in"
      >
        {/* Emblem */}
        <div className="grid place-items-center w-16 h-16 mx-auto mb-5 rounded-[var(--radius)]
          bg-[var(--accent-light)] border border-[var(--accent)]/25">
          <EmblemIcon />
        </div>

        {/* Badge */}
        <span className="inline-flex px-3 py-1 rounded-full
          border border-[var(--accent)]/25 bg-[var(--accent-light)]
          text-[var(--accent)] text-[10px] font-semibold tracking-[0.14em] uppercase mb-4">
          Age Verification
        </span>

        <h2
          id="age-gate-heading"
          className="text-[1.7rem] sm:text-[2rem] font-bold leading-tight
            tracking-[-0.015em] text-[var(--text)] mb-3"
        >
          Are you 18 or older?
        </h2>

        <p className="text-[var(--text-muted)] text-[14px] max-w-[38ch] mx-auto leading-relaxed mb-7">
          This store contains research products for qualified researchers aged 18 and over.
        </p>

        <div className="flex flex-col sm:flex-row gap-3">
          <button
            onClick={onConfirm}
            className="flex-1 min-h-[50px] py-3 px-6 rounded-full
              bg-[var(--accent)] hover:bg-[var(--accent-hover)] text-white
              font-semibold text-[13.5px] shadow-[var(--shadow-blue)]
              transition-all hover:-translate-y-0.5"
          >
            Yes, I am 18+
          </button>

          {onDecline ? (
            <button
              onClick={onDecline}
              className="flex-1 min-h-[50px] py-3 px-6 rounded-full
                border border-[var(--border)] text-[var(--text-muted)]
                hover:text-[var(--text)] hover:border-[var(--accent)]/40
                font-semibold text-[13.5px] transition-all hover:-translate-y-0.5"
            >
              Exit
            </button>
          ) : (
            <a
              href="https://www.google.com"
              className="flex-1 min-h-[50px] py-3 px-6 rounded-full
                border border-[var(--border)] text-[var(--text-muted)]
                hover:text-[var(--text)] hover:border-[var(--accent)]/40
                font-semibold text-[13.5px] transition-all hover:-translate-y-0.5
                grid place-items-center"
            >
              Exit
            </a>
          )}
        </div>

        <p className="text-[11px] text-[var(--text-dim)] mt-5">
          Research use only. Not for human consumption.
        </p>
      </div>
    </div>
  );
};

export default AgeGateModal;
