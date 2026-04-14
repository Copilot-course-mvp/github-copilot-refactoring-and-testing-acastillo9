---
description: "Use when generating, modifying, or writing tests."
applyTo: ["tests/**/*", "integration/**/*", "e2e/**/*"]
---

# Testing Convention

## Test Naming

Use Gherkin-style naming for all test functions:

```
given_<precondition>_when_<action>_then_<expected_result>
```

## Scenario Comments

Add a `# Scenario: ...` comment (or `// Scenario: ...` for TypeScript) directly above every test function:

```typescript
// Scenario: Adding an item to an empty cart creates a new cart entry
it('given_empty_cart_when_addItem_then_item_added_with_quantity_1', () => {
  // ...
});
```

## Test Structure

- Use **Arrange / Act / Assert** pattern inside each test.
- Keep each test focused on a single behavior.
- Use `data-testid` attributes to query elements in component and E2E tests.
- Mark unimplemented tests with `// TODO:` followed by the scenario description and commented-out test code.

## Frameworks

- **Unit tests** (`tests/`): Vitest + `@testing-library/react`
- **Integration tests** (`integration/`): Vitest + `@testing-library/react` + `@testing-library/user-event`
- **E2E tests** (`e2e/`): Playwright Test (`@playwright/test`)
