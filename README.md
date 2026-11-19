# SauceDemo Playwright Tests

End-to-end UI test automation for **Swag Labs (SauceDemo)**, a public demo e-commerce app, built with **Playwright and TypeScript** using the Page Object Model, custom fixtures and data-driven tests.

This project automates the High-priority cases from my manual testing work: [saucedemo-qa-portfolio](https://github.com/mista4chun/saucedemo-qa-portfolio) (test plan, requirements, test cases and bug reports).

> SauceDemo (https://www.saucedemo.com) is a practice site by Sauce Labs. This project is independent and not affiliated with Sauce Labs.

## Tech Stack

- [Playwright](https://playwright.dev) with TypeScript
- Page Object Model
- Custom fixtures for shared setup (logged-out and logged-in states)
- Data-driven tests with data kept in separate files
- HTML reports, with screenshots, video and traces kept on failure

## Project Structure

```
├── tests/            # Test specs (*.spec.ts)
├── pages/            # Page Objects: Login, Products, Cart, Checkout, Overview, Complete
├── fixtures/         # Custom fixtures (loginPage, productsPage, ...)
├── test-data/        # Test data: users, invalid logins, checkout data
├── playwright.config.ts
└── tsconfig.json
```

## Getting Started

**Prerequisites:** a current LTS version of [Node.js](https://nodejs.org).

```bash
git clone https://github.com/mista4chun/saucedemo-playwright-tests.git
cd saucedemo-playwright-tests
npm install
npx playwright install
```

On Linux you may also need `npx playwright install --with-deps` for system libraries.

## Running the Tests

| Command | What it does |
|---|---|
| `npx playwright test` | Run all tests (headless) |
| `npx playwright test --headed` | Watch the browser while tests run |
| `npx playwright test --ui` | Open Playwright's interactive UI mode |
| `npx playwright test login` | Run only files matching "login" |
| `npx playwright show-report` | Open the HTML report |

## What Is Covered

Each automated test is named with its manual test case ID, so every test traces back to the [test plan](https://github.com/mista4chun/saucedemo-qa-portfolio).

| Area | Test cases |
|---|---|
| Login | TC_SwagLabs_001, 002 to 008, 009 |
| Products | TC_SwagLabs_011, 015, 016, 020, 042 |
| Cart | TC_SwagLabs_022, 024, 025 |
| Checkout | TC_SwagLabs_027, 028 to 031, 034, 036 |
| Menu | TC_SwagLabs_044 |

## Design Decisions

- **Page Object Model:** locators and user actions live in `pages/`. Tests contain only steps and assertions, so a UI change is fixed in one place.
- **Fixtures instead of `beforeEach`:** `loginPage` gives a logged-out page for negative tests, and `productsPage` gives a logged-in user, so tests that need a session don't repeat the login steps.
- **Data-driven tests:** invalid-login and checkout-validation cases are rows in `test-data/`, so a new case is one new row.
- **Independent tests:** each test sets up its own state, so tests can run in parallel.
- **Stable locators:** elements are found with SauceDemo's `data-test` attributes (configured as the test id attribute), not CSS classes that change with styling.

## Known Issues

Defects found during manual testing are tracked as GitHub Issues in the [manual testing repo](https://github.com/mista4chun/saucedemo-qa-portfolio/issues):

- [#1](https://github.com/mista4chun/saucedemo-qa-portfolio/issues/1) Checkout proceeds with an empty cart
- [#2](https://github.com/mista4chun/saucedemo-qa-portfolio/issues/2) Product buttons still show "Remove" after Reset App State until the page is refreshed

## Roadmap

- [x] UI tests with the Page Object Model
- [ ] Cross-browser runs (Firefox, WebKit)
- [ ] API tests (Postman and Playwright)
- [ ] CI pipeline with GitHub Actions, so tests gate every pull request
- [ ] Docker test environment

## Author

HILARY SAMSON
