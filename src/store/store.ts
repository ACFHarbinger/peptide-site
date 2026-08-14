import { combineReducers, createStore, type Store } from 'redux';
import { cartReducer, initialCartState, type CartState } from './cartSlice';
import type { CartLine } from './cartTypes';

export const CART_STORAGE_KEY = 'pepcore.cart.v1';

const rootReducer = combineReducers({
  cart: cartReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = Store<RootState>;
export type AppDispatch = AppStore['dispatch'];

function isCartLine(value: unknown): value is CartLine {
  if (typeof value !== 'object' || value === null) {
    return false;
  }
  const line = value as Record<string, unknown>;
  return (
    typeof line.sku === 'string' &&
    line.sku.length > 0 &&
    typeof line.productSlug === 'string' &&
    typeof line.name === 'string' &&
    typeof line.variantLabel === 'string' &&
    typeof line.priceCents === 'number' &&
    Number.isFinite(line.priceCents) &&
    Number.isInteger(line.priceCents) &&
    line.priceCents >= 0 &&
    typeof line.quantity === 'number' &&
    Number.isFinite(line.quantity) &&
    Number.isInteger(line.quantity) &&
    line.quantity > 0
  );
}

export function isCartState(value: unknown): value is CartState {
  if (typeof value !== 'object' || value === null) {
    return false;
  }
  const state = value as Record<string, unknown>;
  return Array.isArray(state.lines) && state.lines.every(isCartLine);
}

export function loadCartState(): CartState {
  if (typeof window === 'undefined') {
    return initialCartState;
  }
  try {
    const raw = window.localStorage.getItem(CART_STORAGE_KEY);
    if (!raw) {
      return initialCartState;
    }
    const parsed: unknown = JSON.parse(raw);
    if (!isCartState(parsed)) {
      return initialCartState;
    }
    return parsed;
  } catch {
    return initialCartState;
  }
}

function persistCartState(cart: CartState): void {
  if (typeof window === 'undefined') {
    return;
  }
  try {
    window.localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
  } catch {
    // Ignore quota / private-mode write failures.
  }
}

export function createAppStore(preloadedState?: Partial<RootState>): AppStore {
  const store = createStore(rootReducer, {
    cart: preloadedState?.cart ?? loadCartState(),
  });

  store.subscribe(() => {
    persistCartState(store.getState().cart);
  });

  return store;
}

export const store = createAppStore();
