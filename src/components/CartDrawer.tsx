'use client';

import React from 'react';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { removeItem, setQuantity, selectCartLines, selectCartTotalCents } from '../store/cartSlice';

export interface CartDrawerProps {
  open: boolean;
  onClose: () => void;
}

const FREE_SHIPPING_THRESHOLD_CENTS = 35000;

function formatEuros(cents: number): string {
  const euros = cents / 100;
  return euros % 1 === 0 ? `€${euros}.00` : `€${euros.toFixed(2)}`;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({ open, onClose }) => {
  const dispatch     = useAppDispatch();
  const lines        = useAppSelector(selectCartLines);
  const totalCents   = useAppSelector(selectCartTotalCents);
  const remaining    = Math.max(FREE_SHIPPING_THRESHOLD_CENTS - totalCents, 0);
  const progressPct  = Math.min((totalCents / FREE_SHIPPING_THRESHOLD_CENTS) * 100, 100);

  if (!open) return null;

  const qtyBtn = `grid place-items-center w-6 h-6 rounded-full
    border border-[var(--border)] text-[var(--text-muted)]
    hover:border-[var(--accent)]/50 hover:text-[var(--text)]
    text-xs transition-colors`;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-[90] bg-black/60 backdrop-blur-[2px]"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Drawer panel */}
      <aside
        className="fixed right-0 top-0 z-[95] flex h-full w-full max-w-[420px] flex-col
          bg-[var(--bg-surface)] border-l border-[var(--border)] shadow-[var(--shadow-lg)]"
        aria-label="Shopping cart"
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-[var(--border)]
          px-6 py-4">
          <div>
            <strong className="block text-[0.95rem] font-semibold text-[var(--text)]">
              Your Cart
            </strong>
            <span className="text-[12px] text-[var(--text-muted)]">
              Quick review before checkout
            </span>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="grid h-9 w-9 place-items-center rounded-full
              text-[var(--text-muted)] hover:bg-[var(--border)] hover:text-[var(--text)]
              transition-colors"
            aria-label="Close cart"
          >
            <svg className="w-4 h-4 fill-none stroke-current" strokeWidth="1.8" strokeLinecap="round" viewBox="0 0 24 24">
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Free shipping progress */}
        <div className="border-b border-[var(--border)] px-6 py-3.5 text-[12px]
          text-[var(--text-muted)]">
          {remaining > 0 ? (
            <>Add <strong className="text-[var(--text)]">{formatEuros(remaining)}</strong> for FREE same-day shipping</>
          ) : (
            <strong className="text-[var(--accent)]">✓ You&apos;ve unlocked free same-day shipping</strong>
          )}
          <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-[var(--border)]">
            <span
              className="block h-full rounded-full bg-[var(--accent)] transition-all duration-500"
              style={{ width: `${progressPct}%` }}
            />
          </div>
        </div>

        {/* Line items */}
        <div className="flex-1 overflow-y-auto px-6 py-5">
          {lines.length === 0 ? (
            <p className="text-[13.5px] text-[var(--text-muted)]">
              Your cart is empty — add some research peptides.
            </p>
          ) : (
            <ul className="flex flex-col divide-y divide-[var(--border)]">
              {lines.map((line) => (
                <li key={line.sku} className="flex items-start justify-between gap-3 py-4">
                  <div className="flex-1 min-w-0">
                    <p className="text-[0.88rem] font-semibold text-[var(--text)] truncate">
                      {line.name}
                    </p>
                    <p className="text-[12px] text-[var(--text-muted)]">{line.variantLabel}</p>
                    <div className="mt-2 flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => dispatch(setQuantity(line.sku, line.quantity - 1))}
                        className={qtyBtn}
                        aria-label={`Decrease quantity of ${line.name}`}
                      >
                        −
                      </button>
                      <span className="w-5 text-center text-[12px] font-medium text-[var(--text)]">
                        {line.quantity}
                      </span>
                      <button
                        type="button"
                        onClick={() => dispatch(setQuantity(line.sku, line.quantity + 1))}
                        className={qtyBtn}
                        aria-label={`Increase quantity of ${line.name}`}
                      >
                        +
                      </button>
                      <button
                        type="button"
                        onClick={() => dispatch(removeItem(line.sku))}
                        className="ml-1 text-[11.5px] text-[var(--text-dim)]
                          hover:text-red-400 transition-colors"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                  <span className="whitespace-nowrap text-[0.88rem] font-bold text-[var(--text)]">
                    {formatEuros(line.priceCents * line.quantity)}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Footer */}
        <div className="border-t border-[var(--border)] px-6 py-5">
          <div className="mb-4 flex items-center justify-between">
            <span className="text-[13.5px] text-[var(--text-muted)]">Subtotal</span>
            <strong className="text-[var(--text)] font-bold">{formatEuros(totalCents)}</strong>
          </div>
          <button
            type="button"
            disabled={lines.length === 0}
            className="w-full rounded-full bg-[var(--accent)] hover:bg-[var(--accent-hover)]
              py-3 text-[13.5px] font-semibold text-white tracking-wide
              shadow-[var(--shadow-blue)] transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
          >
            Checkout →
          </button>
          <p className="mt-3 text-center text-[11px] text-[var(--text-dim)]">
            For laboratory research use only.
          </p>
        </div>
      </aside>
    </>
  );
};

export default CartDrawer;
