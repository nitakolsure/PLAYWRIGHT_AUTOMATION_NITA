import { type Page } from '@playwright/test';
import { acceptNextDialog } from '../../utils/dialog';

export class ProductPage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async addToCart(): Promise<string> {
    const added = acceptNextDialog(this.page);
    await this.page.getByRole('link', { name: 'Add to cart' }).click();
    return added;
  }
}
