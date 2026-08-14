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
  const dispatch = useAppDispatch();
  const lines = useAppSelector(selectCartLines);
  const totalCents = useAppSelector(selectCartTotalCents);
  const remainingCents = Math.max(FREE_SHIPPING_THRESHOLD_CENTS - totalCents, 0);
  const progressPct = Math.min((totalCents / FREE_SHIPPING_THRESHOLD_CENTS) * 100, 100);

  if (!open) return null;

  return (
    <>
      <div
        className="fixed inset-0 z-[90] bg-black/40"
        onClick={onClose}
        aria-hidden="true"
      />
      <aside
        className="fixed right-0 top-0 z-[95] flex h-full w-full max-w-md flex-col bg-white shadow-2xl"
        aria-label="Shopping cart"
      >
        <div className="flex items-center justify-between border-b border-[#432d76]/10 px-5 py-4">
          <div>
            <strong className="block text-[#120d20]">Your Cart</strong>
            <span className="text-xs text-[#4d4762]">Quick review before checkout</span>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="grid h-9 w-9 place-items-center rounded-full hover:bg-[#f6f1ff]"
            aria-label="Close cart"
          >
            ✕
          </button>
        </div>

        <div className="border-b border-[#432d76]/10 px-5 py-3 text-xs text-[#4d4762]">
          {remainingCents > 0 ? (
            <>
              Add <strong>{formatEuros(remainingCents)}</strong> for FREE same-day shipping
            </>
          ) : (
            <strong>You&apos;ve unlocked free same-day shipping</strong>
          )}
          <div className="mt-1.5 h-1.5 w-full overflow-hidden rounded-full bg-[#f6f1ff]">
            <span
              className="block h-full rounded-full bg-[#8f67ff]"
              style={{ width: `${progressPct}%` }}
            />
          </div>
        </div>

        <div className="flex-1 overflow-y-auto px-5 py-4">
          {lines.length === 0 ? (
            <p className="text-sm text-[#4d4762]">Your cart is empty — add some research peptides.</p>
          ) : (
            <ul className="flex flex-col gap-4">
              {lines.map((line) => (
                <li key={line.sku} className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-sm font-bold text-[#120d20]">{line.name}</p>
                    <p className="text-xs text-[#4d4762]">{line.variantLabel}</p>
                    <div className="mt-1 flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => dispatch(setQuantity(line.sku, line.quantity - 1))}
                        className="h-6 w-6 rounded-full border border-[#432d76]/20 text-xs"
                        aria-label={`Decrease quantity of ${line.name}`}
                      >
                        −
                      </button>
                      <span className="w-5 text-center text-xs">{line.quantity}</span>
                      <button
                        type="button"
                        onClick={() => dispatch(setQuantity(line.sku, line.quantity + 1))}
                        className="h-6 w-6 rounded-full border border-[#432d76]/20 text-xs"
                        aria-label={`Increase quantity of ${line.name}`}
                      >
                        +
                      </button>
                      <button
                        type="button"
                        onClick={() => dispatch(removeItem(line.sku))}
                        className="ml-2 text-xs text-[#4d4762] underline"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                  <span className="whitespace-nowrap text-sm font-bold text-[#120d20]">
                    {formatEuros(line.priceCents * line.quantity)}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="border-t border-[#432d76]/10 px-5 py-4">
          <div className="mb-3 flex items-center justify-between">
            <span className="text-sm text-[#4d4762]">Subtotal</span>
            <strong className="text-[#120d20]">{formatEuros(totalCents)}</strong>
          </div>
          <button
            type="button"
            disabled={lines.length === 0}
            className="w-full rounded-full bg-[#432D76] py-3 text-sm font-extrabold text-white disabled:opacity-40"
          >
            Checkout →
          </button>
        </div>
      </aside>
    </>
  );
};

export default CartDrawer;
