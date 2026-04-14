import { useState } from 'react';
import type { Coffee } from './models/Coffee';
import './App.css';

// ============================================================
// WARNING: This file needs serious refactoring!
// All application logic is crammed into a single component.
// The clean service and utility modules in src/services/ and
// src/utils/ exist but are NOT used here.
// ============================================================

const menuItems: Coffee[] = [
  { id: 'espresso', name: 'Espresso', description: 'Rich and bold single shot of coffee', price: 3.0, imageEmoji: '☕' },
  { id: 'cappuccino', name: 'Cappuccino', description: 'Espresso with steamed milk and foam', price: 4.5, imageEmoji: '☕' },
  { id: 'latte', name: 'Latte', description: 'Smooth espresso with lots of steamed milk', price: 5.0, imageEmoji: '🥛' },
  { id: 'americano', name: 'Americano', description: 'Espresso diluted with hot water', price: 3.5, imageEmoji: '☕' },
  { id: 'mocha', name: 'Mocha', description: 'Espresso with chocolate and steamed milk', price: 5.5, imageEmoji: '🍫' },
  { id: 'flat-white', name: 'Flat White', description: 'Double espresso with velvety steamed milk', price: 4.0, imageEmoji: '🤍' },
];

let orderNum = 0;

interface CartEntry {
  coffee: Coffee;
  quantity: number;
}

function App() {
  const [cart, setCart] = useState<CartEntry[]>([]);
  const [view, setView] = useState<'menu' | 'checkout' | 'done'>('menu');
  const [orderInfo, setOrderInfo] = useState<{
    id: string;
    items: CartEntry[];
    subtotal: number;
    discount: number;
    tax: number;
    total: number;
  } | null>(null);

  // ---- Cart operations (inlined, not using CartService) ----

  const addToCart = (coffee: Coffee) => {
    setCart((prev) => {
      const idx = prev.findIndex((e) => e.coffee.id === coffee.id);
      if (idx >= 0) {
        const updated = [...prev];
        updated[idx] = { ...updated[idx], quantity: updated[idx].quantity + 1 };
        return updated;
      }
      return [...prev, { coffee, quantity: 1 }];
    });
  };

  const changeQty = (id: string, newQty: number) => {
    if (newQty <= 0) {
      setCart((prev) => prev.filter((e) => e.coffee.id !== id));
    } else {
      setCart((prev) =>
        prev.map((e) => (e.coffee.id === id ? { ...e, quantity: newQty } : e))
      );
    }
  };

  const removeFromCart = (id: string) => {
    setCart((prev) => prev.filter((e) => e.coffee.id !== id));
  };

  // ---- Calculations (inlined with magic numbers) ----

  const getSubtotal = () =>
    cart.reduce((sum, e) => sum + (e.quantity + e.coffee.price), 0);

  const getDiscount = (subtotal: number) =>
    subtotal > 15 ? Math.round(subtotal * 0.1 * 100) / 100 : 0;

  const getTax = (amount: number) =>
    Math.round(amount * 0.08 * 100) / 100;

  // Duplicated price formatting (instead of using utils/priceFormatter)
  const fmtPrice = (n: number) => '$' + n.toFixed(2);

  const subtotal = getSubtotal();
  const discount = getDiscount(subtotal);
  const afterDiscount = subtotal - discount;
  const tax = getTax(afterDiscount);
  const total = Math.round((afterDiscount + tax) * 100) / 100;

  // ---- Place order ----

  const placeOrder = () => {
    orderNum++;
    setOrderInfo({
      id: `ORD-${String(orderNum).padStart(4, '0')}`,
      items: [...cart],
      subtotal,
      discount,
      tax,
      total,
    });
    setCart([]);
    setView('done');
  };

  // ---- Render ----

  return (
    <div className="app">
      <header className="app__header">
        <h1 className="app__title">☕ The Coffee Corner</h1>
        <p className="app__subtitle">Fresh brews, made with love</p>
      </header>

      <main className="app__main">
        {/* ============ MENU VIEW ============ */}
        {view === 'menu' && (
          <div className="app__layout">
            <section data-testid="coffee-menu">
              <h2 style={{ fontSize: '1.8rem', color: '#2c1810', marginBottom: '1.5rem' }}>Our Menu</h2>
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
                gap: '1.5rem',
              }}>
                {menuItems.map((coffee) => (
                  <div
                    key={coffee.id}
                    data-testid={`coffee-card-${coffee.id}`}
                    style={{
                      background: '#fff',
                      borderRadius: '12px',
                      padding: '1.5rem',
                      boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '0.5rem',
                    }}
                  >
                    <span style={{ fontSize: '2.5rem' }}>{coffee.imageEmoji}</span>
                    <h3 style={{ margin: 0, fontSize: '1.2rem', color: '#2c1810' }}>{coffee.name}</h3>
                    <p style={{ margin: 0, fontSize: '0.9rem', color: '#6b5b50', flex: 1 }}>
                      {coffee.description}
                    </p>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '0.5rem' }}>
                      <span style={{ fontSize: '1.1rem', fontWeight: 700, color: '#2c1810' }}>
                        {'$' + coffee.price.toFixed(2)}
                      </span>
                      <button
                        onClick={() => addToCart(coffee)}
                        aria-label={`Add ${coffee.name} to cart`}
                        style={{
                          background: '#6f4e37',
                          color: '#fff',
                          border: 'none',
                          borderRadius: '8px',
                          padding: '0.5rem 1rem',
                          cursor: 'pointer',
                          fontSize: '0.9rem',
                          fontWeight: 600,
                        }}
                      >
                        Add to Cart
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* ---- Cart sidebar ---- */}
            <aside data-testid="cart-panel" style={{
              background: '#faf7f5',
              borderRadius: '12px',
              padding: '1.5rem',
              minWidth: '320px',
            }}>
              <h2 style={{ fontSize: '1.5rem', color: '#2c1810', margin: '0 0 1rem' }}>Your Cart</h2>

              {cart.length === 0 ? (
                <p data-testid="cart-empty-message" style={{ color: '#8b7b6b', fontStyle: 'italic' }}>
                  Your cart is empty. Add some coffee!
                </p>
              ) : (
                <>
                  <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 1rem' }}>
                    {cart.map((entry) => (
                      <li
                        key={entry.coffee.id}
                        data-testid={`cart-item-${entry.coffee.id}`}
                        style={{
                          display: 'flex',
                          flexWrap: 'wrap',
                          alignItems: 'center',
                          gap: '0.5rem',
                          padding: '0.75rem 0',
                          borderBottom: '1px solid #e8e0d8',
                        }}
                      >
                        <div style={{ flex: 1, minWidth: '120px' }}>
                          <span style={{ display: 'block', fontWeight: 600, color: '#2c1810' }}>
                            {entry.coffee.name}
                          </span>
                          <span style={{ fontSize: '0.8rem', color: '#8b7b6b' }}>
                            {'$' + entry.coffee.price.toFixed(2)} each
                          </span>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                          <button
                            onClick={() => changeQty(entry.coffee.id, entry.quantity - 1)}
                            aria-label={`Decrease ${entry.coffee.name} quantity`}
                            style={{
                              width: '28px', height: '28px', border: '1px solid #ccc',
                              borderRadius: '4px', background: '#fff', cursor: 'pointer', fontSize: '1rem',
                            }}
                          >
                            −
                          </button>
                          <span data-testid={`quantity-${entry.coffee.id}`} style={{ minWidth: '1.5rem', textAlign: 'center', fontWeight: 600 }}>
                            {entry.quantity}
                          </span>
                          <button
                            onClick={() => changeQty(entry.coffee.id, entry.quantity + 1)}
                            aria-label={`Increase ${entry.coffee.name} quantity`}
                            style={{
                              width: '28px', height: '28px', border: '1px solid #ccc',
                              borderRadius: '4px', background: '#fff', cursor: 'pointer', fontSize: '1rem',
                            }}
                          >
                            +
                          </button>
                          <button
                            onClick={() => removeFromCart(entry.coffee.id)}
                            aria-label={`Remove ${entry.coffee.name} from cart`}
                            style={{ background: 'none', border: 'none', color: '#c0392b', cursor: 'pointer', fontSize: '0.9rem' }}
                          >
                            ✕
                          </button>
                        </div>
                        <span
                          data-testid={`line-total-${entry.coffee.id}`}
                          style={{ fontWeight: 600, color: '#2c1810', width: '100%', textAlign: 'right', fontSize: '0.95rem' }}
                        >
                          {fmtPrice(entry.coffee.price * entry.quantity)}
                        </span>
                      </li>
                    ))}
                  </ul>

                  <div data-testid="cart-totals" style={{ borderTop: '2px solid #d4c8be', paddingTop: '0.75rem', marginBottom: '1rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0.3rem 0', fontSize: '0.95rem', color: '#4a3f35' }}>
                      <span>Subtotal</span>
                      <span data-testid="cart-subtotal">{fmtPrice(subtotal)}</span>
                    </div>
                    {discount > 0 && (
                      <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0.3rem 0', fontSize: '0.95rem', color: '#27ae60' }}>
                        <span>Discount (10%)</span>
                        <span data-testid="cart-discount">−{fmtPrice(discount)}</span>
                      </div>
                    )}
                    <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0.3rem 0', fontSize: '0.95rem', color: '#4a3f35' }}>
                      <span>Tax (8%)</span>
                      <span data-testid="cart-tax">{fmtPrice(tax)}</span>
                    </div>
                    <div style={{
                      display: 'flex', justifyContent: 'space-between',
                      fontWeight: 700, fontSize: '1.1rem', color: '#2c1810',
                      borderTop: '1px solid #d4c8be', paddingTop: '0.5rem', marginTop: '0.3rem',
                    }}>
                      <span>Total</span>
                      <span data-testid="cart-total">{fmtPrice(total)}</span>
                    </div>
                  </div>

                  <button
                    onClick={() => setView('checkout')}
                    data-testid="checkout-button"
                    style={{
                      width: '100%', padding: '0.75rem', background: '#27ae60', color: '#fff',
                      border: 'none', borderRadius: '8px', fontSize: '1rem', fontWeight: 600, cursor: 'pointer',
                    }}
                  >
                    Proceed to Checkout
                  </button>
                </>
              )}
            </aside>
          </div>
        )}

        {/* ============ CHECKOUT VIEW ============ */}
        {view === 'checkout' && (
          <section data-testid="checkout-summary" style={{
            maxWidth: '600px', margin: '0 auto', background: '#fff',
            borderRadius: '12px', padding: '2rem', boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
          }}>
            <h2 style={{ fontSize: '1.5rem', color: '#2c1810', margin: '0 0 1.5rem' }}>Order Summary</h2>

            <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: '1.5rem' }}>
              <thead>
                <tr>
                  <th style={{ textAlign: 'left', padding: '0.5rem', borderBottom: '2px solid #d4c8be', color: '#6b5b50', fontSize: '0.85rem', textTransform: 'uppercase' }}>Item</th>
                  <th style={{ textAlign: 'left', padding: '0.5rem', borderBottom: '2px solid #d4c8be', color: '#6b5b50', fontSize: '0.85rem', textTransform: 'uppercase' }}>Qty</th>
                  <th style={{ textAlign: 'left', padding: '0.5rem', borderBottom: '2px solid #d4c8be', color: '#6b5b50', fontSize: '0.85rem', textTransform: 'uppercase' }}>Price</th>
                  <th style={{ textAlign: 'left', padding: '0.5rem', borderBottom: '2px solid #d4c8be', color: '#6b5b50', fontSize: '0.85rem', textTransform: 'uppercase' }}>Total</th>
                </tr>
              </thead>
              <tbody>
                {cart.map((entry) => (
                  <tr key={entry.coffee.id}>
                    <td style={{ padding: '0.5rem', borderBottom: '1px solid #e8e0d8', color: '#2c1810' }}>{entry.coffee.name}</td>
                    <td style={{ padding: '0.5rem', borderBottom: '1px solid #e8e0d8', color: '#2c1810' }}>{entry.quantity}</td>
                    <td style={{ padding: '0.5rem', borderBottom: '1px solid #e8e0d8', color: '#2c1810' }}>{fmtPrice(entry.coffee.price)}</td>
                    <td style={{ padding: '0.5rem', borderBottom: '1px solid #e8e0d8', color: '#2c1810' }}>{fmtPrice(entry.coffee.price * entry.quantity)}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div data-testid="checkout-totals" style={{ borderTop: '2px solid #d4c8be', paddingTop: '0.75rem', marginBottom: '1.5rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0.3rem 0', fontSize: '0.95rem', color: '#4a3f35' }}>
                <span>Subtotal</span>
                <span data-testid="checkout-subtotal">{fmtPrice(subtotal)}</span>
              </div>
              {discount > 0 && (
                <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0.3rem 0', fontSize: '0.95rem', color: '#27ae60' }}>
                  <span>Discount (10%)</span>
                  <span data-testid="checkout-discount">−{fmtPrice(discount)}</span>
                </div>
              )}
              <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0.3rem 0', fontSize: '0.95rem', color: '#4a3f35' }}>
                <span>Tax (8%)</span>
                <span data-testid="checkout-tax">{fmtPrice(tax)}</span>
              </div>
              <div style={{
                display: 'flex', justifyContent: 'space-between',
                fontWeight: 700, fontSize: '1.15rem', color: '#2c1810',
                borderTop: '1px solid #d4c8be', paddingTop: '0.5rem', marginTop: '0.3rem',
              }}>
                <span>Order Total</span>
                <span data-testid="checkout-total">{fmtPrice(total)}</span>
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', gap: '1rem' }}>
              <button
                onClick={() => setView('menu')}
                data-testid="back-to-menu-button"
                style={{ padding: '0.75rem 1.5rem', background: '#f0ebe6', color: '#6b5b50', border: 'none', borderRadius: '8px', fontSize: '1rem', cursor: 'pointer' }}
              >
                ← Back to Menu
              </button>
              <button
                onClick={placeOrder}
                data-testid="place-order-button"
                style={{ padding: '0.75rem 1.5rem', background: '#27ae60', color: '#fff', border: 'none', borderRadius: '8px', fontSize: '1rem', fontWeight: 600, cursor: 'pointer' }}
              >
                Place Order
              </button>
            </div>
          </section>
        )}

        {/* ============ CONFIRMATION VIEW ============ */}
        {view === 'done' && orderInfo && (
          <section data-testid="order-confirmation" style={{
            maxWidth: '500px', margin: '2rem auto', textAlign: 'center', background: '#fff',
            borderRadius: '12px', padding: '2rem', boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
          }}>
            <div style={{ fontSize: '3rem', marginBottom: '0.5rem' }}>✅</div>
            <h2 style={{ fontSize: '1.8rem', color: '#27ae60', margin: '0 0 0.5rem' }}>Order Confirmed!</h2>
            <p data-testid="order-id" style={{ color: '#6b5b50', fontSize: '1rem', margin: '0 0 1.5rem' }}>
              Order #{orderInfo.id}
            </p>

            <div style={{
              textAlign: 'left', background: '#faf7f5', borderRadius: '8px', padding: '1rem 1.5rem', marginBottom: '1.5rem',
            }}>
              <h3 style={{ margin: '0 0 0.75rem', color: '#2c1810', fontSize: '1rem' }}>Items Ordered</h3>
              <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 1rem' }}>
                {orderInfo.items.map((entry) => (
                  <li key={entry.coffee.id} style={{ padding: '0.3rem 0', color: '#4a3f35', borderBottom: '1px solid #e8e0d8' }}>
                    {entry.coffee.name} × {entry.quantity} —{' '}
                    {'$' + (entry.coffee.price * entry.quantity).toFixed(2)}
                  </li>
                ))}
              </ul>

              <div data-testid="confirmation-total" style={{
                display: 'flex', justifyContent: 'space-between', fontSize: '1.1rem', color: '#2c1810',
                paddingTop: '0.5rem', borderTop: '2px solid #d4c8be',
              }}>
                <span>Total Charged:</span>
                <strong>{fmtPrice(orderInfo.subtotal)}</strong>
              </div>
            </div>

            <button
              onClick={() => {
                setOrderInfo(null);
                setView('menu');
              }}
              data-testid="new-order-button"
              style={{
                padding: '0.75rem 2rem', background: '#6f4e37', color: '#fff',
                border: 'none', borderRadius: '8px', fontSize: '1rem', fontWeight: 600, cursor: 'pointer',
              }}
            >
              Start New Order
            </button>
          </section>
        )}
      </main>
    </div>
  );
}

export default App;
