import { type Locator, type Page } from '@playwright/test';
import { acceptNextDialog } from '../../utils/dialog';

export class LoginPage {
  readonly page: Page;
  readonly usernameInput: Locator;
  readonly passwordInput: Locator;
  readonly submitButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.usernameInput = page.locator('#loginusername');
    this.passwordInput = page.locator('#loginpassword');
    this.submitButton = page.locator('#logInModal').getByRole('button', { name: 'Log in' });
  }

  async open() {
    await this.page.getByRole('link', { name: 'Log in' }).click();
    await this.usernameInput.waitFor({ state: 'visible' });
  }

  async submit(username: string, password: string) {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.submitButton.click();
  }

  async login(username: string, password: string): Promise<string | undefined> {
    const alertMessage = acceptNextDialog(this.page);
    const loggedIn = this.page
      .locator('#nameofuser')
      .waitFor({ state: 'visible', timeout: 15000 })
      .then(() => undefined)
      .catch(() => undefined);

    await this.open();
    await this.submit(username, password);
    return Promise.race([alertMessage, loggedIn]);
  }
}
