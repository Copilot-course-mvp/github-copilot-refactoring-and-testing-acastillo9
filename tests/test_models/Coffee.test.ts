import { describe, it, expect } from 'vitest';
import { coffees } from '../../src/data/coffees';
import type { Coffee } from '../../src/models/Coffee';

describe('Coffee model (via coffees data)', () => {
  // Scenario: All coffees have required fields
  it('given_coffees_data_when_checked_then_all_have_required_fields', () => {
    coffees.forEach((coffee: Coffee) => {
      expect(coffee.id).toBeTruthy();
      expect(coffee.name).toBeTruthy();
      expect(coffee.description).toBeTruthy();
      expect(coffee.price).toBeGreaterThan(0);
      expect(coffee.imageEmoji).toBeTruthy();
    });
  });

  // Scenario: There are exactly 6 coffees in the menu
  it('given_coffees_data_when_counted_then_has_six_items', () => {
    expect(coffees).toHaveLength(6);
  });

  // TODO: Scenario: All coffee IDs are unique
  // it('given_coffees_data_when_checked_then_all_ids_are_unique', () => {
  //   const ids = coffees.map(c => c.id);
  //   expect(new Set(ids).size).toBe(ids.length);
  // });

  // TODO: Scenario: All prices are positive numbers
  // it('given_coffees_data_when_checked_then_all_prices_are_positive', () => {
  //   coffees.forEach(coffee => {
  //     expect(coffee.price).toBeGreaterThan(0);
  //     expect(typeof coffee.price).toBe('number');
  //   });
  // });
});
