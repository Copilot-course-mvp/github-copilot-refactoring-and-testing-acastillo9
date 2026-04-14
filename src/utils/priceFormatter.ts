/**
 * Format a numeric amount as a USD price string.
 */
export function formatPrice(amount: number): string {
  return `$${amount.toFixed(2)}`;
}
