import {Page, Locator} from '@playwright/test';

export type SortOption = 'az' | 'za' | 'lohi' | 'hilo';

export class ProductsPage {
    readonly page: Page;
    readonly title: Locator;
    readonly productCards: Locator;
    readonly productNames: Locator;
    readonly productPrices: Locator;
    readonly cartBadge: Locator;
    readonly sortDropdown: Locator;
    

    constructor(page : Page) {
        this.page = page;
        this.title = page.locator('[data-test="title"]');
        this.productCards = page.locator('[data-test="inventory-item"]');
        this.productNames = page.locator('[data-test="inventory_item_name"]');
        this.productPrices = page.locator('[data-test="inventory_item_price"]');
        this.cartBadge = page.locator('[data-test="shopping-cart-badge"]');
        this.sortDropdown = page.locator('[data-test="product-sort-container"]');
    }

   private card(productName: string): Locator {
        return this.productCards.filter({ hasText: productName });
    }

      addToCartButton(productName: string): Locator {
        return this.card(productName).getByRole('button', { name: 'Add to cart' });
    }

    removeButton(productName: string): Locator {
        return this.card(productName).getByRole('button', { name: 'Remove' });
    }
        async addToCart(productName: string) {
        await this.addToCartButton(productName).click();
    }

    async removeFromCart(productName: string) {
        await this.removeButton(productName).click();
    }

    async sortBy(option: SortOption) {
        await this.sortDropdown.selectOption(option);
    }

    async getProductNames(): Promise<string[]> {
        return this.productNames.allTextContents();
    }

    async getProductPrices(): Promise<number[]> {
        const texts = await this.productPrices.allTextContents();
        return texts.map((t) => parseFloat(t.replace('$', '')));
    }
}