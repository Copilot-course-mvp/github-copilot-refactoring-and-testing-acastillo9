import type { CartItem } from '../../models/CartItem';
import { formatPrice } from '../../utils/priceFormatter';
import type { CartTotals } from '../../utils/cartCalculator';
import './CartPanel.css';

interface CartPanelProps {
  items: CartItem[];
  totals: CartTotals;
  onUpdateQuantity: (coffeeId: string, quantity: number) => void;
  onRemoveItem: (coffeeId: string) => void;
  onCheckout: () => void;
}

export function CartPanel({
  items,
  totals,
  onUpdateQuantity,
  onRemoveItem,
  onCheckout,
}: CartPanelProps) {
  const isEmpty = items.length === 0;

  return (
    <aside className="cart-panel" data-testid="cart-panel">
      <h2 className="cart-panel__title">Your Cart</h2>

      {isEmpty ? (
        <p className="cart-panel__empty" data-testid="cart-empty-message">
          Your cart is empty. Add some coffee!
        </p>
      ) : (
        <>
          <ul className="cart-panel__items">
            {items.map((item) => (
              <li
                key={item.coffee.id}
                className="cart-item"
                data-testid={`cart-item-${item.coffee.id}`}
              >
                <div className="cart-item__info">
                  <span className="cart-item__name">{item.coffee.name}</span>
                  <span className="cart-item__price">
                    {formatPrice(item.coffee.price)} each
                  </span>
                </div>
                <div className="cart-item__controls">
                  <button
                    className="cart-item__qty-btn"
                    onClick={() =>
                      onUpdateQuantity(item.coffee.id, item.quantity - 1)
                    }
                    aria-label={`Decrease ${item.coffee.name} quantity`}
                  >
                    −
                  </button>
                  <span
                    className="cart-item__quantity"
                    data-testid={`quantity-${item.coffee.id}`}
                  >
                    {item.quantity}
                  </span>
                  <button
                    className="cart-item__qty-btn"
                    onClick={() =>
                      onUpdateQuantity(item.coffee.id, item.quantity + 1)
                    }
                    aria-label={`Increase ${item.coffee.name} quantity`}
                  >
                    +
                  </button>
                  <button
                    className="cart-item__remove"
                    onClick={() => onRemoveItem(item.coffee.id)}
                    aria-label={`Remove ${item.coffee.name} from cart`}
                  >
                    ✕
                  </button>
                </div>
                <span
                  className="cart-item__line-total"
                  data-testid={`line-total-${item.coffee.id}`}
                >
                  {formatPrice(item.coffee.price * item.quantity)}
                </span>
              </li>
            ))}
          </ul>

          <div className="cart-panel__totals" data-testid="cart-totals">
            <div className="cart-panel__row">
              <span>Subtotal</span>
              <span data-testid="cart-subtotal">
                {formatPrice(totals.subtotal)}
              </span>
            </div>
            {totals.discount > 0 && (
              <div className="cart-panel__row cart-panel__row--discount">
                <span>Discount (10%)</span>
                <span data-testid="cart-discount">
                  −{formatPrice(totals.discount)}
                </span>
              </div>
            )}
            <div className="cart-panel__row">
              <span>Tax (8%)</span>
              <span data-testid="cart-tax">{formatPrice(totals.tax)}</span>
            </div>
            <div className="cart-panel__row cart-panel__row--total">
              <span>Total</span>
              <span data-testid="cart-total">{formatPrice(totals.total)}</span>
            </div>
          </div>

          <button
            className="cart-panel__checkout"
            onClick={onCheckout}
            disabled={isEmpty}
            data-testid="checkout-button"
          >
            Proceed to Checkout
          </button>
        </>
      )}
    </aside>
  );
}
