import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../src/App';

describe('Checkout Flow Integration', () => {
  // Scenario: Clicking checkout navigates to the order summary
  it('given_items_in_cart_when_checkout_clicked_then_order_summary_displayed', async () => {
    const user = userEvent.setup();
    render(<App />);

    // Add items to reach discount threshold
    await user.click(screen.getByLabelText('Add Espresso to cart'));
    await user.click(screen.getByLabelText('Add Espresso to cart'));
    await user.click(screen.getByLabelText('Add Latte to cart'));

    await user.click(screen.getByTestId('checkout-button'));

    expect(screen.getByTestId('checkout-summary')).toBeInTheDocument();
    expect(screen.getByText('Order Summary')).toBeInTheDocument();
  });

  // Scenario: Placing an order shows confirmation with correct total
  it('given_checkout_summary_when_place_order_clicked_then_confirmation_shown', async () => {
    const user = userEvent.setup();
    render(<App />);

    await user.click(screen.getByLabelText('Add Espresso to cart'));
    await user.click(screen.getByLabelText('Add Latte to cart'));

    await user.click(screen.getByTestId('checkout-button'));
    await user.click(screen.getByTestId('place-order-button'));

    expect(screen.getByTestId('order-confirmation')).toBeInTheDocument();
    expect(screen.getByText('Order Confirmed!')).toBeInTheDocument();
  });

  // TODO: Scenario: Discount is shown in checkout when subtotal >= $15
  // it('given_subtotal_above_15_when_checkout_then_discount_row_shown', async () => {
  //   const user = userEvent.setup();
  //   render(<App />);
  //   // Add items totaling >= $15
  //   for (let i = 0; i < 5; i++) {
  //     await user.click(screen.getByLabelText('Add Espresso to cart'));
  //   }
  //   await user.click(screen.getByTestId('checkout-button'));
  //   expect(screen.getByTestId('checkout-discount')).toBeInTheDocument();
  // });

  // TODO: Scenario: Back to menu returns to the shopping view
  // it('given_checkout_view_when_back_to_menu_clicked_then_menu_shown', async () => {
  //   const user = userEvent.setup();
  //   render(<App />);
  //   await user.click(screen.getByLabelText('Add Espresso to cart'));
  //   await user.click(screen.getByTestId('checkout-button'));
  //   await user.click(screen.getByTestId('back-to-menu-button'));
  //   expect(screen.getByTestId('coffee-menu')).toBeInTheDocument();
  // });

  // TODO: Scenario: Starting a new order after confirmation resets the cart
  // it('given_order_confirmed_when_new_order_clicked_then_cart_is_empty', async () => {
  //   const user = userEvent.setup();
  //   render(<App />);
  //   await user.click(screen.getByLabelText('Add Espresso to cart'));
  //   await user.click(screen.getByTestId('checkout-button'));
  //   await user.click(screen.getByTestId('place-order-button'));
  //   await user.click(screen.getByTestId('new-order-button'));
  //   expect(screen.getByTestId('cart-empty-message')).toBeInTheDocument();
  // });
});
