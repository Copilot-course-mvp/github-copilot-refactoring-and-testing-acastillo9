import type { CartItem } from '../../models/CartItem';
import type { CartTotals } from '../../utils/cartCalculator';
import { formatPrice } from '../../utils/priceFormatter';
import './CheckoutSummary.css';

interface CheckoutSummaryProps {
  items: CartItem[];
  totals: CartTotals;
  onPlaceOrder: () => void;
  onBackToMenu: () => void;
}

export function CheckoutSummary({
  items,
  totals,
  onPlaceOrder,
  onBackToMenu,
}: CheckoutSummaryProps) {
  return (
    <section className="checkout-summary" data-testid="checkout-summary">
      <h2 className="checkout-summary__title">Order Summary</h2>

      <table className="checkout-summary__table">
        <thead>
          <tr>
            <th>Item</th>
            <th>Qty</th>
            <th>Price</th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item) => (
            <tr key={item.coffee.id}>
              <td>{item.coffee.name}</td>
              <td>{item.quantity}</td>
              <td>{formatPrice(item.coffee.price)}</td>
              <td>{formatPrice(item.coffee.price * item.quantity)}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="checkout-summary__totals" data-testid="checkout-totals">
        <div className="checkout-summary__row">
          <span>Subtotal</span>
          <span data-testid="checkout-subtotal">
            {formatPrice(totals.subtotal)}
          </span>
        </div>
        {totals.discount > 0 && (
          <div className="checkout-summary__row checkout-summary__row--discount">
            <span>Discount (10%)</span>
            <span data-testid="checkout-discount">
              −{formatPrice(totals.discount)}
            </span>
          </div>
        )}
        <div className="checkout-summary__row">
          <span>Tax (8%)</span>
          <span data-testid="checkout-tax">{formatPrice(totals.tax)}</span>
        </div>
        <div className="checkout-summary__row checkout-summary__row--total">
          <span>Order Total</span>
          <span data-testid="checkout-total">{formatPrice(totals.total)}</span>
        </div>
      </div>

      <div className="checkout-summary__actions">
        <button
          className="checkout-summary__back"
          onClick={onBackToMenu}
          data-testid="back-to-menu-button"
        >
          ← Back to Menu
        </button>
        <button
          className="checkout-summary__place-order"
          onClick={onPlaceOrder}
          data-testid="place-order-button"
        >
          Place Order
        </button>
      </div>
    </section>
  );
}
