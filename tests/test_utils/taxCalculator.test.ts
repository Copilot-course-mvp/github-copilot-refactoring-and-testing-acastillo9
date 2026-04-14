import { describe, it, expect } from 'vitest';
import { calculateTax } from '../../src/utils/taxCalculator';

describe('taxCalculator', () => {
  // Scenario: Tax is calculated at 8% of the subtotal
  it('given_a_subtotal_when_calculateTax_then_returns_8_percent', () => {
    expect(calculateTax(100)).toBe(8);
  });

  // Scenario: Tax on zero is zero
  it('given_zero_subtotal_when_calculateTax_then_returns_zero', () => {
    expect(calculateTax(0)).toBe(0);
  });

  // TODO: Scenario: Tax is rounded to two decimal places
  // it('given_an_odd_subtotal_when_calculateTax_then_rounds_correctly', () => {
  //   expect(calculateTax(11)).toBe(0.88);
  // });

  // TODO: Scenario: Tax on a small amount is calculated correctly
  // it('given_a_small_subtotal_when_calculateTax_then_returns_correct_tax', () => {
  //   expect(calculateTax(3)).toBe(0.24);
  // });

  // TODO: Scenario: Tax on a large amount is calculated correctly
  // it('given_a_large_subtotal_when_calculateTax_then_returns_correct_tax', () => {
  //   expect(calculateTax(999.99)).toBe(80);
  // });
});
