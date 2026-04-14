import { test, expect } from '@playwright/test';

test.describe('Checkout Flow', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  // TODO: Scenario: Clicking "Proceed to Checkout" shows the order summary
  // test('given_items_in_cart_when_checkout_clicked_then_summary_shown', async ({ page }) => {
  //   // Add items to cart, click checkout button
  //   // Verify the checkout summary section appears with item table
  //   // Hint: use data-testid="checkout-summary"
  // });

  // TODO: Scenario: Discount is applied when subtotal is $15 or more
  // test('given_subtotal_above_15_when_checkout_then_discount_shown', async ({ page }) => {
  //   // Add enough items to reach $15+ subtotal
  //   // Navigate to checkout and verify discount row appears
  //   // WARNING: Check the edge case of exactly $15!
  //   // Hint: 5 Espressos = $15.00 — does the discount apply?
  // });

  // TODO: Scenario: Placing an order shows the confirmation screen
  // test('given_checkout_summary_when_place_order_then_confirmation_shown', async ({ page }) => {
  //   // Add items, go to checkout, click "Place Order"
  //   // Verify confirmation screen with order ID and total
  //   // WARNING: Check if the "Total Charged" matches the actual total!
  //   // Hint: use data-testid="confirmation-total"
  // });

  // TODO: Scenario: The "Start New Order" button resets the app
  // test('given_order_confirmed_when_new_order_clicked_then_app_resets', async ({ page }) => {
  //   // Complete a full order, click "Start New Order"
  //   // Verify we're back to the menu with an empty cart
  // });

  // TODO: Scenario: Empty cart should not allow checkout (BUG HUNTER!)
  // test('given_empty_cart_when_trying_to_order_then_should_be_prevented', async ({ page }) => {
  //   // This test is designed to find a bug!
  //   // Try to figure out if you can place an order without items
  //   // Hint: What happens if you go to checkout programmatically?
  // });
});
