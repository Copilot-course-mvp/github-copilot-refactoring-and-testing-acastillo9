[![Review Assignment Due Date](https://classroom.github.com/assets/deadline-readme-button-22041afd0340ce965d47ae6ef1cefeee28c7c493a6346c4f15d667ab976d596c.svg)](https://classroom.github.com/a/yVOoLpN3)
[![Open in Visual Studio Code](https://classroom.github.com/assets/open-in-vscode-2e0aaae1b6195c2367325f4f02e2d04e9abb55f0b24a779b69b11b9e10269abc.svg)](https://classroom.github.com/online_ide?assignment_repo_id=23561005&assignment_repo_type=AssignmentRepo)
# ☕ The Coffee Corner — Refactoring & Testing Workshop

A hands-on workshop for practising **refactoring**, **testing**, and **GitHub Copilot** skills using a React + TypeScript coffee shop application.

---

## The Story

Your colleague Mike from the marketing department had a brilliant idea: **"Let's build an internal coffee ordering app for the office!"** Mike has zero programming experience, but he heard that with AI tools you can just *describe what you want* and the code writes itself. So he spent a weekend **vibe-coding** the entire app — chatting with an AI, copy-pasting code, and clicking buttons until something showed up on screen.

On Monday, Mike proudly demoed the app to the team. It *mostly* works — the menu looks great, you can add coffees to a cart, and there's a checkout flow. **"Just a few small details to polish,"** Mike said. *"The numbers might be slightly off somewhere, but it's basically done."*

Those "small details" turned out to be **actual bugs** — the prices don't add up correctly, edge cases are broken, and the entire application is crammed into a single 300-line component with magic numbers everywhere. There are no tests, no separation of concerns, and no way to confidently change anything without breaking something else.

**That's where you come in.** You're a developer, and you've been assigned to clean up Mike's mess. Your goals:

1. **Understand** what the app does and how it's structured (or rather, *not* structured)
2. **Write tests** to pin down the current behaviour and catch the bugs
3. **Fix the bugs** so the app actually calculates prices correctly
4. **Refactor** the god component back into clean, maintainable architecture

The good news: someone on the team had previously sketched out a proper architecture with clean utility functions and service classes (check `src/utils/` and `src/services/`). Mike's vibe-coded version ignores all of it. Your job is to bring order back to the chaos.

---

## Project Overview

**The Coffee Corner** is a single-page coffee ordering app. Users can browse a menu, add coffees to a cart, see real-time price calculations (with discounts and tax), and place orders.

| Layer | Location | Purpose |
|-------|----------|---------|
| Models | `src/models/` | TypeScript interfaces for Coffee, CartItem, Order |
| Data | `src/data/` | Mock coffee menu (simulated backend) |
| Utils | `src/utils/` | Pure functions: price formatting, tax, discount, cart totals |
| Services | `src/services/` | Business logic: CartService, OrderService |
| Components | `src/components/` | React UI: CoffeeMenu, Cart, Checkout |
| Unit Tests | `tests/` | Vitest tests mirroring `src/` structure |
| Integration | `integration/` | Full-flow tests rendering `<App />` |
| E2E | `e2e/` | Playwright test stubs (**you implement these!**) |

> **Note:** The clean modules in `src/utils/`, `src/services/`, and `src/components/` were designed as the proper architecture. However, `App.tsx` currently **does not use them** — all logic is inlined. Part of your job is to refactor `App.tsx` to use these existing abstractions.

### Domain Rules

- 6 coffee items ($3.00 – $5.50)
- **10% discount** when subtotal ≥ $15
- **8% tax** applied after discount
- Sequential order IDs: ORD-0001, ORD-0002, ...

---

## Business Rules (your source of truth)

These are the **accepted business rules** for The Coffee Corner. Mike was given these rules but may not have implemented all of them correctly. Your E2E and integration tests should validate that the application follows every rule below.

### Menu
- The app displays exactly **6 coffee items**: Espresso ($3.00), Cappuccino ($4.50), Latte ($5.00), Americano ($3.50), Mocha ($5.50), Flat White ($4.00).
- Each coffee card shows the coffee name, description, price, and an "Add to Cart" button.

### Cart
- Clicking "Add to Cart" adds the item with quantity 1. If the item is already in the cart, its quantity increments by 1.
- The **line total** for each cart item must equal `price × quantity`.
- The **subtotal** must equal the sum of all line totals.
- Quantity can be increased (+) or decreased (−). Decreasing to 0 removes the item.
- The remove (✕) button removes the item entirely.
- An empty cart displays the message *"Your cart is empty. Add some coffee!"*.

### Discount
- A **10% discount** is applied when the subtotal is **$15.00 or more** (i.e., `subtotal >= 15`).
- No discount is applied when the subtotal is below $15.00.
- The discount is calculated on the subtotal before tax.

### Tax
- An **8% tax** is applied on the **after-discount amount** (subtotal minus discount).
- Tax is rounded to 2 decimal places.

### Order Total
- `total = (subtotal - discount) + tax`, rounded to 2 decimal places.

### Checkout
- The "Proceed to Checkout" button navigates to an order summary.
- The order summary displays each item, its quantity, unit price, and line total.
- The order summary shows subtotal, discount (if applicable), tax, and the **order total**.
- Clicking "Place Order" creates the order and shows a confirmation screen.
- **It must not be possible to place an order with an empty cart.**

### Order Confirmation
- The confirmation screen shows "Order Confirmed!" with the order ID (e.g., ORD-0001).
- It lists all ordered items with their quantities and line totals.
- The **"Total Charged"** amount must match the **order total** (after discount and tax), not the subtotal.
- The "Start New Order" button resets the app to an empty cart on the menu view.

---

## Prerequisites

- **Node.js** 18+ (recommended: 20)
- **npm** 9+
- **VS Code** with GitHub Copilot extension
- Git

---

## Getting Started

```bash
# Clone the repository
git clone https://github.com/<your-org>/refactoring-workshop.git
cd refactoring-workshop

# Install dependencies
npm install

# Start the development server
npm run dev
```

Open http://localhost:5173 in your browser.

---

## Running Tests

```bash
# Unit tests
npm test

# Unit tests in watch mode
npm run test:watch

# Unit tests with coverage report
npm run test:coverage

# Integration tests
npm run test:integration

# E2E tests (after implementing them)
npm run test:e2e
```

---

## Learning Objectives

By completing this workshop, you will practise:

- Reading and understanding an existing codebase with GitHub Copilot
- Generating unit tests from `// TODO` markers
- Interpreting test coverage reports and improving branch coverage
- Writing integration tests for cross-component user flows
- Writing Playwright E2E tests to verify real browser behaviour
- Identifying and fixing bugs through test-driven debugging
- Refactoring messy code back to clean, layered architecture

---

## Exercises

### Exercise 1: Explore the Codebase
Use Copilot Chat to understand the project structure. Ask it to explain:
- How does the cart total calculation work?
- What does `OrderService.placeOrder()` do?
- How are the components connected?

### Exercise 2: Complete Missing Unit Tests
Search for `// TODO` comments in the `tests/` folder. Use Copilot to generate the missing test implementations. Run `npm test` to verify they pass.

### Exercise 3: Improve Branch Coverage
Run `npm run test:coverage` and review the report. Find untested branches and edge cases. Write additional tests to improve coverage.

### Exercise 4: Write Integration Tests
Complete the `// TODO` markers in `integration/CartFlow.test.tsx` and `integration/CheckoutFlow.test.tsx`. These tests render the full `<App />` component and simulate user interactions.

### Exercise 5: Implement E2E Tests with Playwright
Open the `e2e/` folder. Implement the test stubs using Playwright. Your E2E tests should:
- Verify the menu displays all 6 coffees
- Test add-to-cart and quantity controls
- Verify the checkout flow end-to-end
- Check that the order confirmation shows the correct total

Run `npm run test:e2e` to validate.

### Exercise 6: Find and Fix the Bugs
Mike said there were *"just a few small details"* — turns out those details are real bugs. Write tests that expose them, then fix the code:
- **Hint 1**: Try adding 2 of the same coffee and check the cart line total vs. the subtotal
- **Hint 2**: What happens when your subtotal is exactly $15?
- **Hint 3**: Can you place an order with an empty cart?
- **Hint 4**: Does the order confirmation show the right amount?

---

## Tips for Using GitHub Copilot

### Keyboard Shortcuts
- `Ctrl+I` / `Cmd+I` — Open Copilot inline chat
- `Ctrl+Shift+I` / `Cmd+Shift+I` — Open Copilot Chat panel

### Example Prompts
- *"Generate the missing test for this TODO"*
- *"Write a Playwright E2E test that adds items to the cart and completes checkout"*
- *"Explain what this function does"*
- *"What edge cases should I test for calculateDiscount?"*
- *"Refactor this component to use the CartService instead of inline logic"*

### Pro Tips
- Select code before asking Copilot — it uses the selection as context
- Reference files with `#file` in chat: `#file:src/utils/cartCalculator.ts explain this`
- Use `/tests` to generate tests for the current file
- Use the plan mode for scaffolding your solution before implementing. 
- Review Copilot suggestions carefully — they may not cover all edge cases

---

## Project Structure

```
refactoring-workshop/
├── src/
│   ├── models/              # Coffee, CartItem, Order interfaces
│   ├── data/                # Mock coffee data
│   ├── utils/               # Pure calculation functions
│   ├── services/            # Business logic classes
│   ├── components/
│   │   ├── CoffeeMenu/     # Menu grid + coffee cards
│   │   ├── Cart/           # Shopping cart panel
│   │   └── Checkout/       # Order summary + confirmation
│   ├── App.tsx              # Main application component
│   └── main.tsx             # Entry point
├── tests/                   # Unit tests (mirrors src/)
│   ├── test_utils/
│   ├── test_models/
│   └── test_services/
├── integration/             # Integration tests
├── e2e/                     # Playwright E2E tests (implement these!)
├── .github/
│   ├── workflows/           # CI pipelines
│   └── instructions/        # Copilot customization
└── README.md
```
