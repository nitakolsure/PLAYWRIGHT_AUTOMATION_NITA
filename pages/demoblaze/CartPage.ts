import { expect, type Page } from '@playwright/test';
import { type OrderDetails } from '../../data/order';

export class CartPage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async open() {
    await this.page.getByRole('link', { name: 'Cart', exact: true }).click();
    await expect(this.page).toHaveURL(/cart\.html/);
  }

  async expectProduct(productName: string) {
    await expect(this.page.locator('#tbodyid')).toContainText(productName, { timeout: 15000 });
  }

  async placeOrder(order: OrderDetails) {
    await this.page.getByRole('button', { name: 'Place Order' }).click();
    await expect(this.page.locator('#orderModal')).toBeVisible();
    await this.page.locator('#name').fill(order.name);
    await this.page.locator('#country').fill(order.country);
    await this.page.locator('#city').fill(order.city);
    await this.page.locator('#card').fill(order.card);
    await this.page.locator('#month').fill(order.month);
    await this.page.locator('#year').fill(order.year);
    await this.page.getByRole('button', { name: 'Purchase' }).click();
  }

  async expectOrderPlaced(order: OrderDetails) {
    const confirmation = this.page.locator('.sweet-alert');
    await expect(confirmation.getByRole('heading', { name: 'Thank you for your purchase!' })).toBeVisible();
    await expect(confirmation).toContainText(order.name);
    await expect(confirmation).toContainText(order.card);
  }
}
