import { type Page } from '@playwright/test';
import { BasePage } from '../../core/BasePage';
import { acceptNextDialog } from '../../utils/dialog';

export class ProductPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  async addToCart(): Promise<string> {
    const added = acceptNextDialog(this.page);
    await this.page.getByRole('link', { name: 'Add to cart' }).click();
    return added;
  }
}
