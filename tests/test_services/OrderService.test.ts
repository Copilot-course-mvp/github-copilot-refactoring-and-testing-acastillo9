import { describe, it, expect, beforeEach } from 'vitest';
import { OrderService } from '../../src/services/OrderService';
import type { CartItem } from '../../src/models/CartItem';

const sampleItems: CartItem[] = [
  {
    coffee: { id: 'espresso', name: 'Espresso', description: '', price: 3, imageEmoji: '☕' },
    quantity: 2,
  },
  {
    coffee: { id: 'latte', name: 'Latte', description: '', price: 5, imageEmoji: '🥛' },
    quantity: 1,
  },
];

describe('OrderService', () => {
  let orderService: OrderService;

  beforeEach(() => {
    orderService = new OrderService();
  });

  // Scenario: Placing an order returns a valid order with correct totals
  it('given_cart_items_when_placeOrder_then_returns_order_with_totals', () => {
    const order = orderService.placeOrder(sampleItems);
    expect(order.id).toBeTruthy();
    expect(order.items).toHaveLength(2);
    expect(order.subtotal).toBe(11);
    expect(order.total).toBeGreaterThan(0);
    expect(order.createdAt).toBeInstanceOf(Date);
  });

  // Scenario: Placing an order with empty cart throws an error
  it('given_empty_cart_when_placeOrder_then_throws_error', () => {
    expect(() => orderService.placeOrder([])).toThrow('Cannot place an order with an empty cart');
  });

  // TODO: Scenario: Multiple orders get incrementing IDs
  // it('given_two_orders_when_placed_then_ids_are_different', () => {
  //   const order1 = orderService.placeOrder(sampleItems);
  //   const order2 = orderService.placeOrder(sampleItems);
  //   expect(order1.id).not.toBe(order2.id);
  // });

  // TODO: Scenario: getOrders returns all placed orders
  // it('given_placed_orders_when_getOrders_then_returns_all', () => {
  //   orderService.placeOrder(sampleItems);
  //   orderService.placeOrder(sampleItems);
  //   expect(orderService.getOrders()).toHaveLength(2);
  // });

  // TODO: Scenario: getOrderById returns the correct order
  // it('given_placed_order_when_getOrderById_then_returns_correct_order', () => {
  //   const order = orderService.placeOrder(sampleItems);
  //   const found = orderService.getOrderById(order.id);
  //   expect(found).toBeDefined();
  //   expect(found?.id).toBe(order.id);
  // });
});
