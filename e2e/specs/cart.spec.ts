import { test, expect } from '@playwright/test';

test.describe('Shopping Cart', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  // Scenario: Adding a coffee to the cart shows it in the cart panel
  test('given_empty_cart_when_add_to_cart_clicked_then_item_appears', async ({ page }) => {
    await page.getByRole('button', { name: 'Add Espresso to cart' }).click();
    await expect(page.getByTestId('cart-item-espresso')).toBeVisible();
    await expect(page.getByTestId('quantity-espresso')).toHaveText('1');
  });

  // TODO: Scenario: Adding the same coffee twice shows quantity of 2
  // test('given_item_in_cart_when_same_item_added_then_quantity_increments', async ({ page }) => {
  //   // Add Espresso twice and verify quantity shows "2"
  //   // Also verify the line total shows $6.00 (2 × $3.00)
  //   // WARNING: There may be a bug here! Check the subtotal carefully.
  // });

  // TODO: Scenario: The cart subtotal is calculated correctly
  // test('given_items_in_cart_when_subtotal_checked_then_shows_correct_amount', async ({ page }) => {
  //   // Add Espresso ($3) and Latte ($5), verify subtotal is $8.00
  //   // Hint: use data-testid="cart-subtotal"
  //   // WARNING: The subtotal calculation may have a bug!
  // });

  // TODO: Scenario: Increasing and decreasing quantity works correctly
  // test('given_item_in_cart_when_quantity_changed_then_updates_correctly', async ({ page }) => {
  //   // Add an item, click +, verify quantity goes to 2
  //   // Click −, verify quantity goes back to 1
  //   // Hint: use aria-label="Increase/Decrease ... quantity"
  // });

  // TODO: Scenario: Removing an item from the cart shows the empty message
  // test('given_single_item_in_cart_when_removed_then_empty_message_shown', async ({ page }) => {
  //   // Add an item, then click the remove (✕) button
  //   // Verify the empty cart message reappears
  // });
});
