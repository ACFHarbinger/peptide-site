'use client';

import React, { useEffect, useState } from 'react';
import { Header } from './Header';
import { AgeGateModal } from './AgeGateModal';
import { Footer } from './Footer';
import { CartDrawer } from './CartDrawer';
import { useAppSelector } from '../store/hooks';
import { selectCartItemCount } from '../store/cartSlice';
import { useAddToCart } from '../store/useAddToCart';

const AGE_GATE_STORAGE_KEY = 'pepcore.age_gate.v1';

export interface StorefrontShellRenderProps {
  onAddToCart: (sku: string) => void;
}

export interface StorefrontShellProps {
  children: (props: StorefrontShellRenderProps) => React.ReactNode;
}

/**
 * Shared chrome for every storefront route (home, /catalog, /product/[slug]):
 * age gate, header with live cart count, cart drawer, footer. Each route
 * supplies its own main content via the children render-prop and gets a
 * ready-to-use onAddToCart handler that dispatches into the cart store and
 * opens the drawer.
 */
export const StorefrontShell: React.FC<StorefrontShellProps> = ({ children }) => {
  const [ageConfirmed, setAgeConfirmed] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const cartItemCount = useAppSelector(selectCartItemCount);
  const addToCart = useAddToCart();

  useEffect(() => {
    const confirmed = window.localStorage.getItem(AGE_GATE_STORAGE_KEY) === 'yes';
    setAgeConfirmed(confirmed);
  }, []);

  const handleConfirmAge = () => {
    window.localStorage.setItem(AGE_GATE_STORAGE_KEY, 'yes');
    setAgeConfirmed(true);
  };

  const handleAddToCart = (sku: string) => {
    addToCart(sku);
    setCartOpen(true);
  };

  return (
    <>
      <AgeGateModal open={!ageConfirmed} onConfirm={handleConfirmAge} />

      <Header
        cartItemCount={cartItemCount}
        onCartClick={() => setCartOpen(true)}
        onSearchClick={() =>
          document.getElementById('catalog-search')?.focus() ??
          document.getElementById('catalog')?.scrollIntoView({ behavior: 'smooth' })
        }
      />

      {children({ onAddToCart: handleAddToCart })}

      <Footer />

      <CartDrawer open={cartOpen} onClose={() => setCartOpen(false)} />
    </>
  );
};

export default StorefrontShell;
