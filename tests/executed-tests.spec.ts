import { test, expect } from '../fixtures/MyPOMFixtures';
import { invalidLogins } from '../test-data/loginData';
import { users } from '../test-data/users';
import { invalidCheckoutInfo } from '../test-data/checkoutData';

test('TC_SwagLabs_001 login successful: valid username and password', async ({
  loginPage,
}) => {
  await loginPage.openApplication('/');
  await loginPage.login(users.standard.username, users.standard.password);
  await expect(loginPage.page).toHaveURL('/inventory.html');
});

for (const data of invalidLogins) {
  test(`${data.id} login rejected: ${data.title}`, async ({ loginPage }) => {
    await loginPage.openApplication('/');
    await loginPage.login(data.username, data.password);

    await expect(loginPage.errorMessage).toHaveText(data.error);
    await expect(loginPage.page).toHaveURL('/');
  });
}

test('TC_SwagLabs_011 all products are shown', async ({ productsPage }) => {
  await expect(productsPage.title).toHaveText('Products');
  await expect(productsPage.productCards).toHaveCount(6);
});

test('TC_SwagLabs_015 add to cart from products page', async ({
  productsPage,
}) => {
  await productsPage.addToCart('Sauce Labs Backpack');
  await expect(productsPage.removeButton('Sauce Labs Backpack')).toBeVisible();
  await expect(productsPage.cartBadge).toHaveText('1');
});

test('TC_SwagLabs_016 remove from cart on products page', async ({
  productsPage,
}) => {
  await productsPage.addToCart('Sauce Labs Backpack');
  await productsPage.removeFromCart('Sauce Labs Backpack');
  await expect(
    productsPage.addToCartButton('Sauce Labs Backpack'),
  ).toBeVisible();
  await expect(productsPage.cartBadge).toHaveCount(0);
});

test('TC_SwagLabs_020 cart badge count increases', async ({ productsPage }) => {
  await productsPage.addToCart('Sauce Labs Backpack');
  await expect(productsPage.cartBadge).toHaveText('1');
  await productsPage.addToCart('Sauce Labs Bike Light');
  await expect(productsPage.cartBadge).toHaveText('2');
});

test('TC_SwagLabs_042 sort by price low to high', async ({ productsPage }) => {
  await productsPage.sortBy('lohi');
  const prices = await productsPage.getProductPrices();
  const sorted = [...prices].sort((a, b) => a - b);
  expect(prices).toEqual(sorted);
});

test('TC_SwagLabs_022 cart list items', async ({ productsPage, cartPage }) => {
  await productsPage.addToCart('Sauce Labs Backpack');
  await productsPage.addToCart('Sauce Labs Bike Light');
  await cartPage.openCart();
  const itemCount = await cartPage.getCartItemCount();
  expect(itemCount).toBe(2);
});

test('TC_SwagLabs_023 remove from cart on cart page', async ({
  productsPage,
  cartPage,
}) => {
  await productsPage.addToCart('Sauce Labs Backpack');
  await productsPage.addToCart('Sauce Labs Bike Light');
  await cartPage.openCart();
  await cartPage.removeFromCart('Sauce Labs Backpack');
  const itemCount = await cartPage.getCartItemCount();
  expect(itemCount).toBe(1);
});

test('TC_SwagLabs_024 proceed to checkout', async ({
  productsPage,
  cartPage,
}) => {
  await productsPage.addToCart('Sauce Labs Backpack');
  await cartPage.openCart();
  await cartPage.proceedToCheckout();
  await expect(cartPage.page).toHaveURL('/checkout-step-one.html');
});

test('TC_SwagLabs_027 valid information proceeds to overview', async ({
  productsPage,
  cartPage,
  checkoutPage,
  checkoutOverviewPage,
  page,
}) => {
  await productsPage.addToCart('Sauce Labs Backpack');
  await cartPage.openCart();
  await cartPage.proceedToCheckout();
  await checkoutPage.fillCheckoutInformation('John', 'Doe', '2345');
  await checkoutPage.continueCheckout();

  await expect(page).toHaveURL('/checkout-step-two.html');
  await expect(checkoutOverviewPage.title).toHaveText('Checkout: Overview');
  await expect(checkoutOverviewPage.itemTotal).toHaveText('Item total: $29.99');
  await expect(checkoutOverviewPage.tax).toHaveText('Tax: $2.40');
  await expect(checkoutOverviewPage.total).toHaveText('Total: $32.39');
});

for (const data of invalidCheckoutInfo) {
  test(`${data.id} checkout information rejected: ${data.title}`, async ({
    productsPage,
    cartPage,
    checkoutPage,
  }) => {
    await productsPage.addToCart('Sauce Labs Backpack');
    await cartPage.openCart();
    await cartPage.proceedToCheckout();
    await checkoutPage.fillCheckoutInformation(
      data.first,
      data.last,
      data.postal,
    );
    await checkoutPage.continueCheckout();

    await expect(checkoutPage.errorMessage).toHaveText(data.error);
    await expect(checkoutPage.page).toHaveURL('/checkout-step-one.html');
  });
}
test('TC_SwagLabs_044 logout from menu', async ({ menu, page }) => {
  await menu.logout();
  await expect(page).toHaveURL('/');
});
