import { expect, type Locator, type Page } from '@playwright/test';
import { BasePage } from '../core/BasePage';

export class InstallationPage extends BasePage {
  readonly heading: Locator;

  constructor(page: Page) {
    super(page);
    this.heading = page.getByRole('heading', { name: 'Installation' });
  }

  async expectVisible() {
    await expect(this.heading).toBeVisible();
  }
}
