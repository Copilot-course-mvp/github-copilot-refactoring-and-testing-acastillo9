---
description: "Use when generating code, reviewing structure, or answering questions about this project."
---

# The Coffee Corner — Project Structure

A React + TypeScript coffee shop application built with Vite. The app lets users browse a coffee menu, add items to a cart, and place orders. There is no real backend — order processing is simulated in-memory.

## Folder Structure & Purpose

- **`src/models/`**: Domain interfaces — `Coffee`, `CartItem`, `Order`. These are pure TypeScript types with no logic.
- **`src/data/`**: Mock data that simulates a backend API response (`coffees.ts`).
- **`src/utils/`**: Stateless helper functions for price formatting, tax/discount calculations, and cart total computation. All functions are pure — no side effects.
- **`src/services/`**: Business logic classes — `CartService` (manages cart state) and `OrderService` (places orders). These coordinate between models and utils.
- **`src/components/`**: React components organized by feature:
  - `CoffeeMenu/` — Menu grid with coffee cards
  - `Cart/` — Shopping cart panel with quantity controls
  - `Checkout/` — Order summary and confirmation screens
- **`tests/`**: Unit tests mirroring the `src/` structure. Uses Vitest + `@testing-library/react`.
- **`integration/`**: Integration tests that render `<App />` and test full user flows.
- **`e2e/`**: Playwright end-to-end test stubs. **Students must implement these.**

## Key Domain Rules

- 6 coffee items with prices from $3.00 to $5.50
- 10% discount when subtotal is $15 or more
- 8% tax applied after discount
- Orders get sequential IDs (ORD-0001, ORD-0002, ...)
