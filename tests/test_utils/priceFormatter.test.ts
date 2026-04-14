import { describe, it, expect } from 'vitest';
import { formatPrice } from '../../src/utils/priceFormatter';

describe('priceFormatter', () => {
  // Scenario: A whole dollar amount is formatted with two decimal places
  it('given_a_whole_number_when_formatPrice_then_returns_dollar_sign_with_two_decimals', () => {
    expect(formatPrice(5)).toBe('$5.00');
  });

  // Scenario: A fractional price is formatted correctly
  it('given_a_fractional_amount_when_formatPrice_then_returns_correct_format', () => {
    expect(formatPrice(4.5)).toBe('$4.50');
  });

  // Scenario: Zero is formatted as $0.00
  it('given_zero_when_formatPrice_then_returns_zero_dollars', () => {
    expect(formatPrice(0)).toBe('$0.00');
  });

  // TODO: Scenario: A price with more than two decimal places is rounded
  // it('given_a_long_decimal_when_formatPrice_then_rounds_to_two_places', () => {
  //   expect(formatPrice(3.456)).toBe('$3.46');
  // });

  // TODO: Scenario: A large amount is formatted correctly
  // it('given_a_large_amount_when_formatPrice_then_formats_correctly', () => {
  //   expect(formatPrice(1234.5)).toBe('$1234.50');
  // });

  // TODO: Scenario: A negative amount is formatted with a minus sign
  // it('given_a_negative_amount_when_formatPrice_then_includes_minus_sign', () => {
  //   expect(formatPrice(-2.5)).toBe('$-2.50');
  // });
});
