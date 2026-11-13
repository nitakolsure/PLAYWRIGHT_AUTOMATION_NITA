import { expect, type Locator, type Page } from '@playwright/test';
import { BasePage } from '../core/BasePage';

export class HomePage extends BasePage {
  readonly getStartedLink: Locator;

  constructor(page: Page) {
    super(page);
    this.getStartedLink = page.getByRole('link', { name: 'Get started' });
  }

  async expectTitle() {
    await expect(this.page).toHaveTitle(/Playwright/);
  }

  async clickGetStarted() {
    await this.getStartedLink.click();
  }
}
