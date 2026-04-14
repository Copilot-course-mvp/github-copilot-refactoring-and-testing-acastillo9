const DISCOUNT_THRESHOLD = 15;
const DISCOUNT_RATE = 0.1;

/**
 * Calculate discount: 10% off if subtotal is $15 or more, otherwise 0.
 */
export function calculateDiscount(subtotal: number): number {
  if (subtotal >= DISCOUNT_THRESHOLD) {
    return Math.round(subtotal * DISCOUNT_RATE * 100) / 100;
  }
  return 0;
}
