# Workshop Setup Guide — GitHub Copilot Testing Practice

This guide describes the steps to create a new hands-on workshop repository similar to this one. It is intentionally **language and framework agnostic** — the patterns apply regardless of whether you use Python, Java, TypeScript, Go, or any other stack.

---

## Table of Contents

- [Workshop Setup Guide — GitHub Copilot Testing Practice](#workshop-setup-guide--github-copilot-testing-practice)
  - [Table of Contents](#table-of-contents)
  - [1. Workshop Design Philosophy](#1-workshop-design-philosophy)
  - [2. Create a New Repository](#2-create-a-new-repository)
  - [3. Define the Project Structure](#3-define-the-project-structure)
  - [4. Implement the Application Code](#4-implement-the-application-code)
  - [5. Create an Intentionally Incomplete Test Suite](#5-create-an-intentionally-incomplete-test-suite)
    - [Test Naming Convention](#test-naming-convention)
  - [6. Configure the CI Pipeline](#6-configure-the-ci-pipeline)
    - [Template structure](#template-structure)
  - [7. Add Copilot Customization Files](#7-add-copilot-customization-files)
    - [`project-structure.instructions.md`](#project-structureinstructionsmd)
    - [`testing-gherkin.instructions.md`](#testing-gherkininstructionsmd)
  - [8. Write the README and Exercises](#8-write-the-readme-and-exercises)
    - [Suggested Exercise Progression](#suggested-exercise-progression)
  - [9. Validate the Repository](#9-validate-the-repository)
  - [Quick Reference — Checklist Summary](#quick-reference--checklist-summary)

---

## 1. Workshop Design Philosophy

A good GitHub Copilot testing workshop should:

- Provide **real, working application code** that participants can explore and understand.
- Have **intentionally incomplete test coverage** so participants have meaningful gaps to fill.
- Include a **CI pipeline** that runs automatically on every push, giving instant feedback.
- Be structured in clearly separated **layers** (models/domain, services/business logic, utilities) so participants learn to test at the right level.
- Contain **exercises of increasing difficulty**, from generating simple unit tests to writing end-to-end integration tests and even finding bugs.

---

## 2. Create a New Repository

1. Create a new repository on GitHub (public or private based on audience).
2. Initialize it with a `.gitignore` appropriate for your stack.
3. Add a `LICENSE` if applicable.
4. Clone the repository locally.

```bash
git clone https://github.com/<your-org>/<your-repo>.git
cd <your-repo>
```

5. Create the base branch protection rule on `main`: require pull requests and status checks to pass before merging.

---

## 3. Define the Project Structure

Organize the codebase into at least three layers. Keep the folder structure **predictable and mirrored** between source code and tests:

```
<repo-root>/
├── src/                    # Application source code
│   ├── models/             # Domain entities / data structures
│   ├── services/           # Business logic / use cases
│   └── utils/              # Stateless helper / utility functions
├── tests/                  # Unit tests (mirror the src/ structure)
│   ├── test_models/
│   ├── test_services/
│   └── test_utils/
├── integration/            # End-to-end / integration tests
└── .github/
    ├── workflows/
    │   └── ci.yml          # CI pipeline
    └── instructions/       # Copilot customization files
```

**Guidelines:**
- `models/` — hold state and validations for core domain objects.
- `services/` — coordinate operations between models and external systems.
- `utils/` — handle stateless, reusable logic (calculations, formatters, validators).
- `tests/` sub-folders must mirror the `src/` sub-folder structure.
- `integration/` tests exercise multiple components working together.

---

## 4. Implement the Application Code

Write a small but realistic application. Good domains for workshops include:
- E-commerce order processing
- Library book lending
- Task / ticket management
- Bank account transactions

**Principles to follow:**
- Keep each class / module focused on a single responsibility.
- Include edge cases and validation logic that produce errors (these become interesting test targets).
- Avoid external dependencies (databases, HTTP calls) unless you mock them — the focus is on testing, not infrastructure.
- Add `# TODO` comments in the test files (not the source) to mark the gaps participants will fill.

---

## 5. Create an Intentionally Incomplete Test Suite

The test suite is the **core of the workshop**. The goal is to leave meaningful, discoverable gaps:

1. **Write some tests as examples** — participants need a reference to follow.
2. **Leave ~50–70% of cases as `# TODO`** — spread across all three layers.
3. **Include at least one bug** in a utility function that a well-written test will expose.
4. **Ensure the tests that exist already pass** before publishing the repository.

### Test Naming Convention

Pick a consistent naming convention and document it in `.github/instructions/`. A good option that communicates intent clearly is the **Gherkin style**:

```
given_<precondition>_when_<action>_then_<expected_result>
```

Each test function should also have a short scenario comment directly above it:

```
# Scenario: <one sentence describing what is being validated>
def given_..._when_..._then_...():
    ...
```

---

## 6. Configure the CI Pipeline

Create `.github/workflows/ci.yml`. The pipeline should:

1. **Trigger** on pushes to `main`, feature branches, and Copilot-generated branches, plus on pull requests to `main`.
2. **Check out** the code.
3. **Set up the runtime** for your language/framework (e.g., Node.js, JDK, Python, Go).
4. **Install dependencies**.
5. **Run unit tests with coverage**, failing the build if tests fail.
6. **Run integration tests** as a separate step.
7. **Upload the coverage report** as a build artifact for review.

### Template structure

```yaml
name: CI - Run Tests

on:
  push:
    branches: [ main, "copilot/**", "feature/**" ]
  pull_request:
    branches: [ main ]

permissions:
  contents: read

jobs:
  test:
    name: Run Tests
    runs-on: ubuntu-latest

    strategy:
      matrix:
        # Pin at least two versions of your runtime to catch compatibility issues
        <runtime>-version: ["<stable>", "<latest>"]

    steps:
      - name: Checkout code
        uses: actions/checkout@v4

      - name: Set up <Runtime> ${{ matrix.<runtime>-version }}
        uses: actions/setup-<runtime>@v<N>
        with:
          <runtime>-version: ${{ matrix.<runtime>-version }}

      - name: Install dependencies
        run: |
          # <language-specific install commands>

      - name: Run unit tests with coverage
        run: |
          # <test runner> <unit-test-folder> --coverage

      - name: Run integration tests
        run: |
          # <test runner> <integration-test-folder>

      - name: Upload coverage report
        uses: actions/upload-artifact@v4
        if: matrix.<runtime>-version == '<latest>'
        with:
          name: coverage-report
          path: coverage.<format>
```

**Key points:**
- Pin a minimum of **two runtime versions** in the matrix to catch regressions.
- Keep `permissions: contents: read` (principle of least privilege).
- Separate the unit test step from the integration test step so failures are easier to diagnose.
- Only upload the coverage artifact for one matrix entry to avoid duplicates.

---

## 7. Add Copilot Customization Files

Create `.github/instructions/` with at least two instruction files. These tell GitHub Copilot how to behave in this specific repository:

### `project-structure.instructions.md`

Describe the project domain, folder layout, and the purpose of each layer. This helps Copilot generate code that fits the existing architecture.

```markdown
---
description: "<Short description — when Copilot should use this file>"
---

# <Project Name> — Project Structure

<Brief domain description>

## Folder Structure & Purpose

- **`src/models/`**: ...
- **`src/services/`**: ...
- **`src/utils/`**: ...
- **`tests/`**: ...
- **`integration/`**: ...
```

### `testing-gherkin.instructions.md`

Enforce the test naming and documentation convention across all test files:

```markdown
---
description: "Use when generating, modifying, or writing tests."
applyTo: ["tests/**/*", "integration/**/*"]
---

# Testing Convention

1. Add a `# Scenario: ...` comment directly above every test function.
2. Name every test function using the pattern:
   `given_<precondition>_when_<action>_then_<expected_result>`
```

---

## 8. Write the README and Exercises

The `README.md` is the participant's entry point. It must include:

| Section | Content |
|---------|---------|
| **Project Overview** | Domain description and layered architecture table |
| **Prerequisites** | Runtime version, IDE, Copilot access |
| **Getting Started** | Clone → install dependencies → run tests |
| **Running Tests** | Commands for unit tests, coverage, integration tests |
| **Learning Objectives** | Bulleted list of skills participants will practise |
| **Exercises** | 4–6 graduated exercises (see below) |
| **Tips for Using Copilot** | Editor shortcuts and example chat prompts |

### Suggested Exercise Progression

| # | Title | Skill Practised |
|---|-------|-----------------|
| 1 | Explore the codebase with Copilot | Reading and understanding code |
| 2 | Complete missing unit tests | Generating tests from `# TODO` markers |
| 3 | Improve branch coverage | Interpreting coverage reports |
| 4 | Write integration tests | Testing cross-component interactions |
| 5 | Find and fix a bug | Writing tests that expose a defect |
| 6 | Add a new feature with tests | Full TDD-style feature development |

---

## 9. Validate the Repository

Before publishing the workshop, verify the following checklist:

- [ ] All existing tests pass locally.
- [ ] The CI pipeline runs green on `main`.
- [ ] Coverage report is generated and uploaded as an artifact.
- [ ] `# TODO` comments are present and evenly distributed across test files.
- [ ] The intentional bug exists and is **not** caught by any existing test.
- [ ] The README getting-started steps work on a clean machine.
- [ ] Copilot instruction files are in `.github/instructions/` and reference the correct `applyTo` paths.
- [ ] Branch protection rules are configured on `main`.

---

## Quick Reference — Checklist Summary

```
[ ] Repository created and cloned
[ ] Layered source code written (models / services / utils)
[ ] Mirrored test folders created (tests/ and integration/)
[ ] ~50% of test cases left as # TODO
[ ] At least one intentional bug planted
[ ] CI workflow in .github/workflows/ci.yml
    [ ] Triggers: push (main, copilot/**, feature/**) + PR to main
    [ ] Runtime matrix with 2+ versions
    [ ] Steps: checkout → setup → install → unit tests → integration tests → upload artifact
[ ] Copilot instruction files in .github/instructions/
    [ ] project-structure.instructions.md
    [ ] testing-gherkin.instructions.md (or equivalent naming convention)
[ ] README with overview, setup, exercises, and Copilot tips
[ ] All pre-existing tests pass in CI
```
