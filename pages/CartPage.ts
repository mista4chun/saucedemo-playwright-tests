import {Page, Locator} from '@playwright/test';

export class CartPage {
    readonly page: Page;
    readonly cartBadge: Locator;
    readonly cartItems: Locator;
    readonly cartRemoveButton: Locator;
    readonly checkoutButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.cartBadge = page.locator('.shopping_cart_badge');
        this.cartItems = page.locator('.cart_item');
        this.cartRemoveButton = page.locator('[data-test^="remove-"]');
        this.checkoutButton = page.locator('[data-test="checkout"]');
    }

    async openCart() {
        await this.page.goto('/cart.html');
    }

    async getCartItemCount(): Promise<number> {
        return await this.cartItems.count();
    }

    async removeFromCart(itemName: string) {
        const removeButton = this.page.locator(`[data-test="remove-${itemName.toLowerCase().replace(/ /g, '-')}"]`);
        await removeButton.click();
    }

    async proceedToCheckout() {
        await this.checkoutButton.click();
    }
}