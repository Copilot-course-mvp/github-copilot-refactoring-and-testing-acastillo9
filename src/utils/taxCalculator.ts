const TAX_RATE = 0.08;

/**
 * Calculate tax for a given subtotal at 8%.
 */
export function calculateTax(subtotal: number): number {
  return Math.round(subtotal * TAX_RATE * 100) / 100;
}
