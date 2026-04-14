import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../src/App';

describe('Cart Flow Integration', () => {
  // Scenario: Adding a coffee from the menu shows it in the cart
  it('given_menu_displayed_when_add_to_cart_clicked_then_item_appears_in_cart', async () => {
    const user = userEvent.setup();
    render(<App />);

    const addButton = screen.getByLabelText('Add Espresso to cart');
    await user.click(addButton);

    expect(screen.getByTestId('cart-item-espresso')).toBeInTheDocument();
    expect(screen.getByTestId('quantity-espresso')).toHaveTextContent('1');
  });

  // Scenario: Adding the same coffee twice increments quantity
  it('given_item_in_cart_when_same_item_added_again_then_quantity_increments', async () => {
    const user = userEvent.setup();
    render(<App />);

    const addButton = screen.getByLabelText('Add Espresso to cart');
    await user.click(addButton);
    await user.click(addButton);

    expect(screen.getByTestId('quantity-espresso')).toHaveTextContent('2');
    expect(screen.getByTestId('line-total-espresso')).toHaveTextContent('$6.00');
  });

  // Scenario: Cart totals update correctly when items are added
  it('given_items_in_cart_when_totals_checked_then_subtotal_is_correct', async () => {
    const user = userEvent.setup();
    render(<App />);

    await user.click(screen.getByLabelText('Add Espresso to cart'));
    await user.click(screen.getByLabelText('Add Latte to cart'));

    expect(screen.getByTestId('cart-subtotal')).toHaveTextContent('$8.00');
  });

  // TODO: Scenario: Removing an item from the cart updates the display
  // it('given_item_in_cart_when_remove_clicked_then_item_disappears', async () => {
  //   const user = userEvent.setup();
  //   render(<App />);
  //   await user.click(screen.getByLabelText('Add Espresso to cart'));
  //   await user.click(screen.getByLabelText('Remove Espresso from cart'));
  //   expect(screen.getByTestId('cart-empty-message')).toBeInTheDocument();
  // });

  // TODO: Scenario: Decreasing quantity to zero removes the item
  // it('given_item_with_quantity_1_when_decrease_clicked_then_item_removed', async () => {
  //   const user = userEvent.setup();
  //   render(<App />);
  //   await user.click(screen.getByLabelText('Add Espresso to cart'));
  //   await user.click(screen.getByLabelText('Decrease Espresso quantity'));
  //   expect(screen.getByTestId('cart-empty-message')).toBeInTheDocument();
  // });
});
