import { Page, Locator } from '@playwright/test';
export class MenuPage {
  readonly page: Page;
  readonly menuButton: Locator;
  readonly logoutButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.menuButton = page.getByRole('button', { name: 'Open Menu' });
    this.logoutButton = page.locator('[data-test="logout-sidebar-link"]');
  }

  async logout() {
    await this.menuButton.click();
    await this.logoutButton.click();
  }
}
