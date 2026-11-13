import { expect, type Locator, type Page } from '@playwright/test';
import { environment } from '../../config/environment';
import { BasePage } from '../../core/BasePage';
import { type OrderDetails } from '../../data/order';
import { acceptNextDialog } from '../../utils/dialog';
import { waitForStoreApi } from '../../utils/storeApi';

export class CartPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  private productRows(productName: string): Locator {
    return this.page.locator('#tbodyid tr', { hasText: productName });
  }

  async dismissConfirmation() {
    const okButton = this.page.locator('.sweet-alert').getByRole('button', { name: 'OK' });
    if (await okButton.isVisible()) {
      await okButton.click();
    }
  }

  async open() {
    await this.dismissConfirmation();

    if (!this.page.url().startsWith(environment.storeBaseURL)) {
      await this.page.goto('/');
    }

    if (!this.page.url().includes('cart.html')) {
      const cartLoaded = waitForStoreApi(this.page, '/viewcart');
      await this.page.getByRole('link', { name: 'Cart', exact: true }).click();
      await cartLoaded;
    }

    await expect(this.page).toHaveURL(/cart\.html/);
  }

  async clear() {
    await this.open();
    const rows = this.page.locator('#tbodyid tr');

    for (let attempt = 0; attempt < 20 && (await rows.count()) > 0; attempt++) {
      const deleted = waitForStoreApi(this.page, '/deleteitem');
      await rows.first().getByRole('link', { name: 'Delete' }).click();
      await deleted;
    }

    await expect(rows).toHaveCount(0);
  }

  async expectProduct(productName: string, count = 1) {
    await expect(this.productRows(productName)).toHaveCount(count, { timeout: 15000 });
  }

  async expectProductAbsent(productName: string) {
    await this.expectProduct(productName, 0);
  }

  async removeProduct(productName: string) {
    const row = this.productRows(productName).first();
    const deleted = waitForStoreApi(this.page, '/deleteitem');
    await row.getByRole('link', { name: 'Delete' }).click();
    await deleted;
    await this.expectProductAbsent(productName);
  }

  async purchaseWithEmptyForm(): Promise<string> {
    await this.page.getByRole('button', { name: 'Place Order' }).click();
    await expect(this.page.locator('#orderModal')).toBeVisible();

    const message = acceptNextDialog(this.page);

    await this.page.getByRole('button', { name: 'Purchase' }).click();
    return message;
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
