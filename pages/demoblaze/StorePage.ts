import { expect, type Locator, type Page } from '@playwright/test';
import { BasePage } from '../../core/BasePage';
import { waitForStoreApi } from '../../utils/storeApi';

export class StorePage extends BasePage {
  readonly welcome: Locator;
  readonly logoutLink: Locator;

  constructor(page: Page) {
    super(page);
    this.welcome = page.locator('#nameofuser');
    this.logoutLink = page.getByRole('link', { name: 'Log out' });
  }

  async openProduct(category: 'Phones' | 'Laptops' | 'Monitors', productName: string) {
    const catalogLoaded = waitForStoreApi(this.page, '/bycat');
    await this.page.getByRole('link', { name: category, exact: true }).click();
    await catalogLoaded;
    await this.page.getByRole('link', { name: productName, exact: true }).click();
    await expect(this.page).toHaveURL(/prod\.html/);
  }

  async expectLoggedInAs(username: string) {
    await expect(this.welcome).toHaveText(`Welcome ${username}`, { timeout: 15000 });
  }

  async expectLoggedOut() {
    await expect(this.welcome).toBeHidden();
    await expect(this.page.getByRole('link', { name: 'Log in' })).toBeVisible();
  }
}
