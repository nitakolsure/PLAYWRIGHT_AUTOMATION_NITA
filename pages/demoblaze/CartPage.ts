import { expect, type Page } from '@playwright/test';
import { environment } from '../../config/environment';
import { type OrderDetails } from '../../data/order';

export class CartPage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
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
      const cartLoaded = this.page.waitForResponse(
        (response) => response.url().includes('/viewcart') && response.ok(),
        { timeout: 15000 },
      );
      await this.page.getByRole('link', { name: 'Cart', exact: true }).click();
      await cartLoaded;
    }

    await expect(this.page).toHaveURL(/cart\.html/);
  }

  async clear() {
    await this.open();
    const rows = this.page.locator('#tbodyid tr');

    for (let attempt = 0; attempt < 5 && (await rows.count()) > 0; attempt++) {
      const deleted = this.page.waitForResponse(
        (response) => response.url().includes('/deleteitem') && response.ok(),
        { timeout: 15000 },
      );
      await rows.first().getByRole('link', { name: 'Delete' }).click();
      await deleted;
    }

    await expect(rows).toHaveCount(0);
  }

  async expectProduct(productName: string) {
    await expect(this.page.locator('#tbodyid tr', { hasText: productName })).toBeVisible({ timeout: 15000 });
  }

  async expectProductAbsent(productName: string) {
    await expect(this.page.locator('#tbodyid tr', { hasText: productName })).toHaveCount(0);
  }

  async removeProduct(productName: string) {
    const row = this.page.locator('#tbodyid tr', { hasText: productName });
    const deleted = this.page.waitForResponse(
      (response) => response.url().includes('/deleteitem') && response.ok(),
      { timeout: 15000 },
    );
    await row.getByRole('link', { name: 'Delete' }).click();
    await deleted;
    await this.expectProductAbsent(productName);
  }

  async purchaseWithEmptyForm(): Promise<string> {
    await this.page.getByRole('button', { name: 'Place Order' }).click();
    await expect(this.page.locator('#orderModal')).toBeVisible();

    const message = new Promise<string>((resolve) => {
      this.page.once('dialog', async (dialog) => {
        const text = dialog.message();
        await dialog.accept();
        resolve(text);
      });
    });

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
