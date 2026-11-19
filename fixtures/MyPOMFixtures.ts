import { test as base } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { ProductsPage } from '../pages/ProductsPage';
import { users } from '../test-data/users';
import { CartPage } from '../pages/CartPage';
import { CheckoutPage } from '../pages/CheckoutPage';
import { CheckoutOverviewPage } from '../pages/CheckoutOverviewPage';
import { MenuPage } from '../pages/MenuPage';

type MyPOMFixtures = {
  loginPage: LoginPage;
  loggedIn: void;
  productsPage: ProductsPage;
  cartPage: CartPage;
  checkoutPage: CheckoutPage;
  checkoutOverviewPage: CheckoutOverviewPage;
  menu: MenuPage;
};

export const test = base.extend<MyPOMFixtures>({
  loginPage: async ({ page }, use) => {
    const loginPage = new LoginPage(page);
    await use(loginPage);
  },

  // Logs in ONCE per test, no matter how many fixtures depend on it
  loggedIn: async ({ loginPage }, use) => {
    await loginPage.openApplication('/');
    await loginPage.login(users.standard.username, users.standard.password);
    await use();
  },

  productsPage: async ({ page, loggedIn }, use) => {
    const productsPage = new ProductsPage(page);
    await use(productsPage);
  },
  cartPage: async ({ page, loggedIn }, use) => {
    const cartPage = new CartPage(page);
    await use(cartPage);
  },
  checkoutPage: async ({ page, loggedIn }, use) => {
    const checkoutPage = new CheckoutPage(page);
    await use(checkoutPage);
  },
  checkoutOverviewPage: async ({ page, loggedIn }, use) => {
    const checkoutOverviewPage = new CheckoutOverviewPage(page);
    await use(checkoutOverviewPage);
  },
  menu: async ({ page, loggedIn }, use) => {
    const menu = new MenuPage(page);
    await use(menu);
  },
});

export { expect } from '@playwright/test';
