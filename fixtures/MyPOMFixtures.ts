import {test as base} from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { ProductsPage } from '../pages/ProductsPage';
import { users } from '../test-data/users';
import { CartPage } from '../pages/CartPage';
import { CheckoutPage } from '../pages/CheckoutPage';
import { CheckoutOverviewPage } from '../pages/CheckoutOverviewPage';
import { MenuPage } from '../pages/MenuPage';

type MyPOMFixtures = {
    loginPage: LoginPage;
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
    productsPage: async ({ page, loginPage }, use) => {
        await loginPage.openApplication('/');
        await loginPage.login(users.standard.username, users.standard.password);
        const productsPage = new ProductsPage(page);
        await use(productsPage);
    },
    cartPage: async ({ page, loginPage }, use) => {
        await loginPage.openApplication('/');
        await loginPage.login(users.standard.username, users.standard.password);
        const cartPage = new CartPage(page);
        await use(cartPage);
    },
    checkoutPage: async ({ page, loginPage }, use) => {
        await loginPage.openApplication('/');
        await loginPage.login(users.standard.username, users.standard.password);
        const checkoutPage = new CheckoutPage(page);
        await use(checkoutPage);
    },
    checkoutOverviewPage: async ({ page, loginPage }, use) => {
        await loginPage.openApplication('/');
        await loginPage.login(users.standard.username, users.standard.password);
        const checkoutOverviewPage = new CheckoutOverviewPage(page);
        await use(checkoutOverviewPage);
    },
    menu: async ({ page, loginPage }, use) => {
        await loginPage.openApplication('/');
        await loginPage.login(users.standard.username, users.standard.password);
        const menu = new MenuPage(page);
        await use(menu);
    },
});

export { expect } from '@playwright/test';