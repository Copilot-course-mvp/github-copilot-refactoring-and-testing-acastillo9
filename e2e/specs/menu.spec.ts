import { test, expect } from '@playwright/test';

test.describe('Coffee Menu', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  // Scenario: The menu page displays the app header
  test('given_app_loaded_when_page_opens_then_header_is_visible', async ({ page }) => {
    await expect(page.getByRole('heading', { name: /The Coffee Corner/i })).toBeVisible();
  });

  // TODO: Scenario: All 6 coffee items are displayed in the menu
  // test('given_app_loaded_when_menu_viewed_then_six_coffees_shown', async ({ page }) => {
  //   // Verify that all 6 coffee cards are rendered
  //   // Hint: use data-testid="coffee-card-*" or count the "Add to Cart" buttons
  // });

  // TODO: Scenario: Each coffee card shows name, description, and price
  // test('given_menu_displayed_when_coffee_card_checked_then_shows_name_description_price', async ({ page }) => {
  //   // Pick one coffee (e.g., Espresso) and verify its details
  //   // Hint: check for text content "$3.00", "Rich and bold"
  // });

  // TODO: Scenario: The cart is initially empty with a helpful message
  // test('given_app_loaded_when_cart_checked_then_shows_empty_message', async ({ page }) => {
  //   // Verify the empty cart message is displayed
  //   // Hint: use data-testid="cart-empty-message"
  // });
});
