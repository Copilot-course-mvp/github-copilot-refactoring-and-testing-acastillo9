import type { Order } from '../../models/Order';
import { formatPrice } from '../../utils/priceFormatter';
import './OrderConfirmation.css';

interface OrderConfirmationProps {
  order: Order;
  onNewOrder: () => void;
}

export function OrderConfirmation({
  order,
  onNewOrder,
}: OrderConfirmationProps) {
  return (
    <section
      className="order-confirmation"
      data-testid="order-confirmation"
    >
      <div className="order-confirmation__icon">✅</div>
      <h2 className="order-confirmation__title">Order Confirmed!</h2>
      <p className="order-confirmation__id" data-testid="order-id">
        Order #{order.id}
      </p>

      <div className="order-confirmation__details">
        <h3>Items Ordered</h3>
        <ul>
          {order.items.map((item) => (
            <li key={item.coffee.id}>
              {item.coffee.name} × {item.quantity} —{' '}
              {formatPrice(item.coffee.price * item.quantity)}
            </li>
          ))}
        </ul>

        <div className="order-confirmation__total" data-testid="confirmation-total">
          <span>Total Charged:</span>
          <strong>{formatPrice(order.total)}</strong>
        </div>
      </div>

      <button
        className="order-confirmation__new-order"
        onClick={onNewOrder}
        data-testid="new-order-button"
      >
        Start New Order
      </button>
    </section>
  );
}
