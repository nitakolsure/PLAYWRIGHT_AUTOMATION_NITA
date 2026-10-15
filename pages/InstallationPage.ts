import { expect, type Locator, type Page } from '@playwright/test';

export class InstallationPage {
  readonly page: Page;
  readonly heading: Locator;

  constructor(page: Page) {
    this.page = page;
    this.heading = page.getByRole('heading', { name: 'Installation' });
  }

  async expectVisible() {
    await expect(this.heading).toBeVisible();
  }
}
