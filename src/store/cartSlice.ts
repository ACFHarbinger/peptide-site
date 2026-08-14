import type { UnknownAction } from 'redux';
import type { CartLine } from './cartTypes';

export const CART_ADD_ITEM = 'cart/addItem' as const;
export const CART_REMOVE_ITEM = 'cart/removeItem' as const;
export const CART_SET_QUANTITY = 'cart/setQuantity' as const;
export const CART_CLEAR = 'cart/clearCart' as const;

export interface CartState {
  lines: CartLine[];
}

export const initialCartState: CartState = {
  lines: [],
};

export interface AddItemPayload {
  sku: string;
  productSlug: string;
  name: string;
  variantLabel: string;
  priceCents: number;
}

export function addItem(
  sku: string,
  productSlug: string,
  name: string,
  variantLabel: string,
  priceCents: number,
) {
  return {
    type: CART_ADD_ITEM,
    payload: { sku, productSlug, name, variantLabel, priceCents } satisfies AddItemPayload,
  };
}

export function removeItem(sku: string) {
  return {
    type: CART_REMOVE_ITEM,
    payload: { sku },
  };
}

export function setQuantity(sku: string, quantity: number) {
  return {
    type: CART_SET_QUANTITY,
    payload: { sku, quantity },
  };
}

export function clearCart() {
  return {
    type: CART_CLEAR,
  };
}

export type CartAction =
  | ReturnType<typeof addItem>
  | ReturnType<typeof removeItem>
  | ReturnType<typeof setQuantity>
  | ReturnType<typeof clearCart>;

function isCartAction(action: CartAction | UnknownAction): action is CartAction {
  return (
    action.type === CART_ADD_ITEM ||
    action.type === CART_REMOVE_ITEM ||
    action.type === CART_SET_QUANTITY ||
    action.type === CART_CLEAR
  );
}

export function cartReducer(
  state: CartState = initialCartState,
  action: CartAction | UnknownAction,
): CartState {
  if (!isCartAction(action)) {
    return state;
  }

  switch (action.type) {
    case CART_ADD_ITEM: {
      const existing = state.lines.find((line) => line.sku === action.payload.sku);
      if (existing) {
        return {
          lines: state.lines.map((line) =>
            line.sku === action.payload.sku
              ? { ...line, quantity: line.quantity + 1 }
              : line,
          ),
        };
      }
      const line: CartLine = {
        sku: action.payload.sku,
        productSlug: action.payload.productSlug,
        name: action.payload.name,
        variantLabel: action.payload.variantLabel,
        priceCents: action.payload.priceCents,
        quantity: 1,
      };
      return { lines: [...state.lines, line] };
    }
    case CART_REMOVE_ITEM:
      return {
        lines: state.lines.filter((line) => line.sku !== action.payload.sku),
      };
    case CART_SET_QUANTITY: {
      const quantity = Number.isFinite(action.payload.quantity)
        ? Math.floor(action.payload.quantity)
        : 0;
      if (quantity <= 0) {
        return {
          lines: state.lines.filter((line) => line.sku !== action.payload.sku),
        };
      }
      const exists = state.lines.some((line) => line.sku === action.payload.sku);
      if (!exists) {
        return state;
      }
      return {
        lines: state.lines.map((line) =>
          line.sku === action.payload.sku ? { ...line, quantity } : line,
        ),
      };
    }
    case CART_CLEAR:
      return initialCartState;
    default:
      return state;
  }
}

export interface CartRootSlice {
  cart: CartState;
}

export function selectCartLines(state: CartRootSlice): CartLine[] {
  return state.cart.lines;
}

export function selectCartTotalCents(state: CartRootSlice): number {
  return state.cart.lines.reduce(
    (sum, line) => sum + line.priceCents * line.quantity,
    0,
  );
}

export function selectCartItemCount(state: CartRootSlice): number {
  return state.cart.lines.reduce((sum, line) => sum + line.quantity, 0);
}
