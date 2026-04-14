import type { CartItem } from './CartItem';

export interface Order {
  id: string;
  items: CartItem[];
  subtotal: number;
  discount: number;
  tax: number;
  total: number;
  createdAt: Date;
}
