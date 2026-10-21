import { expect, type Locator, type Page } from '@playwright/test';
import { acceptNextDialog } from '../../utils/dialog';

export class SignUpPage {
  readonly page: Page;
  readonly usernameInput: Locator;
  readonly passwordInput: Locator;
  readonly submitButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.usernameInput = page.locator('#sign-username');
    this.passwordInput = page.locator('#sign-password');
    this.submitButton = page.locator('#signInModal').getByRole('button', { name: 'Sign up' });
  }

  async open() {
    await this.page.getByRole('link', { name: 'Sign up' }).click();
    await this.usernameInput.waitFor({ state: 'visible' });
  }

  async signUp(username: string, password: string): Promise<string> {
    const alertMessage = acceptNextDialog(this.page);

    await this.open();
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.submitButton.click();
    return alertMessage;
  }

  async close() {
    const modal = this.page.locator('#signInModal');
    await expect(modal).toBeHidden();
    await expect(this.page.locator('.modal-backdrop')).toHaveCount(0);
  }
}
