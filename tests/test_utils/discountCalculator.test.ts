import { describe, it, expect } from 'vitest';
import { calculateDiscount } from '../../src/utils/discountCalculator';

describe('discountCalculator', () => {
  // Scenario: No discount is applied when subtotal is below $15
  it('given_subtotal_below_threshold_when_calculateDiscount_then_returns_zero', () => {
    expect(calculateDiscount(10)).toBe(0);
  });

  // Scenario: A 10% discount is applied when subtotal is $15 or more
  it('given_subtotal_above_threshold_when_calculateDiscount_then_returns_10_percent', () => {
    expect(calculateDiscount(20)).toBe(2);
  });

  // TODO: Scenario: Discount is applied when subtotal is exactly $15
  // it('given_subtotal_exactly_at_threshold_when_calculateDiscount_then_returns_10_percent', () => {
  //   expect(calculateDiscount(15)).toBe(1.5);
  // });

  // TODO: Scenario: No discount on zero subtotal
  // it('given_zero_subtotal_when_calculateDiscount_then_returns_zero', () => {
  //   expect(calculateDiscount(0)).toBe(0);
  // });

  // TODO: Scenario: Discount is rounded to two decimal places
  // it('given_an_odd_subtotal_when_calculateDiscount_then_rounds_correctly', () => {
  //   expect(calculateDiscount(16.5)).toBe(1.65);
  // });
});
