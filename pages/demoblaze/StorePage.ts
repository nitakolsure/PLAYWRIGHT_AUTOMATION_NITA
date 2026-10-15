import { expect, type Locator, type Page } from '@playwright/test';

export class StorePage {
  readonly page: Page;
  readonly welcome: Locator;
  readonly logoutLink: Locator;

  constructor(page: Page) {
    this.page = page;
    this.welcome = page.locator('#nameofuser');
    this.logoutLink = page.getByRole('link', { name: 'Log out' });
  }

  async goto() {
    await this.page.goto('/');
  }

  async expectLoggedInAs(username: string) {
    await expect(this.welcome).toHaveText(`Welcome ${username}`, { timeout: 15000 });
  }

  async expectLoggedOut() {
    await expect(this.welcome).toBeHidden();
    await expect(this.page.getByRole('link', { name: 'Log in' })).toBeVisible();
  }
}
