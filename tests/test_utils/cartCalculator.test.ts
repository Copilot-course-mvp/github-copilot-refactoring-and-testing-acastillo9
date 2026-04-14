import { describe, it, expect } from 'vitest';
import { calculateCartTotal } from '../../src/utils/cartCalculator';
import type { CartItem } from '../../src/models/CartItem';

const espresso: CartItem = {
  coffee: { id: 'espresso', name: 'Espresso', description: '', price: 3, imageEmoji: '☕' },
  quantity: 2,
};

const latte: CartItem = {
  coffee: { id: 'latte', name: 'Latte', description: '', price: 5, imageEmoji: '🥛' },
  quantity: 1,
};

describe('cartCalculator', () => {
  // Scenario: Cart with items below discount threshold calculates correctly
  it('given_items_below_threshold_when_calculateCartTotal_then_no_discount_applied', () => {
    const result = calculateCartTotal([espresso]); // 2 × $3 = $6
    expect(result.subtotal).toBe(6);
    expect(result.discount).toBe(0);
    expect(result.tax).toBe(0.48);
    expect(result.total).toBe(6.48);
  });

  // Scenario: Cart with items above discount threshold gets 10% off
  it('given_items_above_threshold_when_calculateCartTotal_then_discount_applied', () => {
    const items: CartItem[] = [
      { ...espresso, quantity: 3 }, // 3 × $3 = $9
      latte,                        // 1 × $5 = $5
      { coffee: { id: 'mocha', name: 'Mocha', description: '', price: 5.5, imageEmoji: '🍫' }, quantity: 1 }, // $5.5
    ]; // subtotal = $19.5
    const result = calculateCartTotal(items);
    expect(result.subtotal).toBe(19.5);
    expect(result.discount).toBe(1.95);
    expect(result.tax).toBe(1.4);
    expect(result.total).toBe(18.95);
  });

  // TODO: Scenario: Empty cart returns all zeros
  // it('given_empty_cart_when_calculateCartTotal_then_returns_zeros', () => {
  //   const result = calculateCartTotal([]);
  //   expect(result.subtotal).toBe(0);
  //   expect(result.discount).toBe(0);
  //   expect(result.tax).toBe(0);
  //   expect(result.total).toBe(0);
  // });

  // TODO: Scenario: Cart with exactly $15 subtotal gets discount
  // it('given_subtotal_exactly_15_when_calculateCartTotal_then_discount_applied', () => {
  //   const items: CartItem[] = [
  //     { ...espresso, quantity: 5 }, // 5 × $3 = $15
  //   ];
  //   const result = calculateCartTotal(items);
  //   expect(result.subtotal).toBe(15);
  //   expect(result.discount).toBe(1.5);
  // });

  // TODO: Scenario: Single item cart is calculated correctly
  // it('given_single_item_when_calculateCartTotal_then_correct_breakdown', () => {
  //   const items: CartItem[] = [{ ...latte, quantity: 1 }];
  //   const result = calculateCartTotal(items);
  //   expect(result.subtotal).toBe(5);
  //   expect(result.discount).toBe(0);
  //   expect(result.tax).toBe(0.4);
  //   expect(result.total).toBe(5.4);
  // });
});
