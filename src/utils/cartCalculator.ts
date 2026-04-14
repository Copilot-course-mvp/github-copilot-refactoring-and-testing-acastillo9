import type { CartItem } from '../models/CartItem';
import { calculateDiscount } from './discountCalculator';
import { calculateTax } from './taxCalculator';

export interface CartTotals {
  subtotal: number;
  discount: number;
  tax: number;
  total: number;
}

/**
 * Calculate the full breakdown for a list of cart items.
 */
export function calculateCartTotal(items: CartItem[]): CartTotals {
  const subtotal = items.reduce(
    (sum, item) => sum + item.coffee.price * item.quantity,
    0
  );

  const discount = calculateDiscount(subtotal);
  const taxableAmount = subtotal - discount;
  const tax = calculateTax(taxableAmount);
  const total = Math.round((taxableAmount + tax) * 100) / 100;

  return { subtotal, discount, tax, total };
}
