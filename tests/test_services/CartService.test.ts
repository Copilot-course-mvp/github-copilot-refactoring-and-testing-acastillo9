import { describe, it, expect, beforeEach } from 'vitest';
import { CartService } from '../../src/services/CartService';
import type { Coffee } from '../../src/models/Coffee';

const espresso: Coffee = { id: 'espresso', name: 'Espresso', description: '', price: 3, imageEmoji: '☕' };
const latte: Coffee = { id: 'latte', name: 'Latte', description: '', price: 5, imageEmoji: '🥛' };

describe('CartService', () => {
  let cart: CartService;

  beforeEach(() => {
    cart = new CartService();
  });

  // Scenario: Adding a new item creates a cart entry with quantity 1
  it('given_empty_cart_when_addItem_then_item_added_with_quantity_1', () => {
    const items = cart.addItem(espresso);
    expect(items).toHaveLength(1);
    expect(items[0].coffee.id).toBe('espresso');
    expect(items[0].quantity).toBe(1);
  });

  // Scenario: Adding an existing item increments its quantity
  it('given_item_in_cart_when_addItem_same_coffee_then_quantity_incremented', () => {
    cart.addItem(espresso);
    const items = cart.addItem(espresso);
    expect(items).toHaveLength(1);
    expect(items[0].quantity).toBe(2);
  });

  // Scenario: Removing an item removes it from the cart
  it('given_item_in_cart_when_removeItem_then_cart_is_empty', () => {
    cart.addItem(espresso);
    const items = cart.removeItem('espresso');
    expect(items).toHaveLength(0);
  });

  // TODO: Scenario: Updating quantity to a positive number changes the quantity
  // it('given_item_in_cart_when_updateQuantity_to_3_then_quantity_is_3', () => {
  //   cart.addItem(espresso);
  //   const items = cart.updateQuantity('espresso', 3);
  //   expect(items[0].quantity).toBe(3);
  // });

  // TODO: Scenario: Updating quantity to 0 removes the item
  // it('given_item_in_cart_when_updateQuantity_to_0_then_item_removed', () => {
  //   cart.addItem(espresso);
  //   const items = cart.updateQuantity('espresso', 0);
  //   expect(items).toHaveLength(0);
  // });

  // TODO: Scenario: clearCart empties the cart
  // it('given_items_in_cart_when_clearCart_then_cart_is_empty', () => {
  //   cart.addItem(espresso);
  //   cart.addItem(latte);
  //   cart.clearCart();
  //   expect(cart.getItems()).toHaveLength(0);
  // });

  // TODO: Scenario: getItemCount returns the total number of items
  // it('given_multiple_items_when_getItemCount_then_returns_total_quantity', () => {
  //   cart.addItem(espresso);
  //   cart.addItem(espresso);
  //   cart.addItem(latte);
  //   expect(cart.getItemCount()).toBe(3);
  // });

  // TODO: Scenario: getTotal returns correct totals
  // it('given_items_in_cart_when_getTotal_then_returns_correct_breakdown', () => {
  //   cart.addItem(espresso);
  //   cart.addItem(latte);
  //   const totals = cart.getTotal();
  //   expect(totals.subtotal).toBe(8);
  //   expect(totals.discount).toBe(0);
  // });
});
