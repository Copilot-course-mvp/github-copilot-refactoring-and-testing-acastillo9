import type { CartItem } from '../models/CartItem';
import type { Coffee } from '../models/Coffee';
import { calculateCartTotal } from '../utils/cartCalculator';
import type { CartTotals } from '../utils/cartCalculator';

/**
 * Manages a shopping cart of coffee items.
 * This is a pure in-memory service — no external dependencies.
 */
export class CartService {
  private items: CartItem[] = [];

  getItems(): CartItem[] {
    return [...this.items];
  }

  addItem(coffee: Coffee): CartItem[] {
    const existing = this.items.find((item) => item.coffee.id === coffee.id);
    if (existing) {
      existing.quantity += 1;
    } else {
      this.items.push({ coffee, quantity: 1 });
    }
    return this.getItems();
  }

  removeItem(coffeeId: string): CartItem[] {
    this.items = this.items.filter((item) => item.coffee.id !== coffeeId);
    return this.getItems();
  }

  updateQuantity(coffeeId: string, quantity: number): CartItem[] {
    if (quantity <= 0) {
      return this.removeItem(coffeeId);
    }
    const item = this.items.find((item) => item.coffee.id === coffeeId);
    if (item) {
      item.quantity = quantity;
    }
    return this.getItems();
  }

  clearCart(): void {
    this.items = [];
  }

  getTotal(): CartTotals {
    return calculateCartTotal(this.items);
  }

  getItemCount(): number {
    return this.items.reduce((count, item) => count + item.quantity, 0);
  }
}
