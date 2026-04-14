import type { CartItem } from '../models/CartItem';
import type { Order } from '../models/Order';
import { calculateCartTotal } from '../utils/cartCalculator';

let orderCounter = 0;

/**
 * Simulates a backend order service.
 * Stores orders in memory — resets when the app reloads.
 */
export class OrderService {
  private orders: Order[] = [];

  placeOrder(items: CartItem[]): Order {
    if (items.length === 0) {
      throw new Error('Cannot place an order with an empty cart');
    }

    const totals = calculateCartTotal(items);
    orderCounter += 1;

    const order: Order = {
      id: `ORD-${String(orderCounter).padStart(4, '0')}`,
      items: [...items],
      subtotal: totals.subtotal,
      discount: totals.discount,
      tax: totals.tax,
      total: totals.total,
      createdAt: new Date(),
    };

    this.orders.push(order);
    return order;
  }

  getOrders(): Order[] {
    return [...this.orders];
  }

  getOrderById(id: string): Order | undefined {
    return this.orders.find((order) => order.id === id);
  }
}
