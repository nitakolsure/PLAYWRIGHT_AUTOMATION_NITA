import { IWorldOptions, World, setWorldConstructor } from '@cucumber/cucumber';
import {
  type APIRequestContext,
  type APIResponse,
  type Browser,
  type BrowserContext,
  type Page,
  chromium,
  request as playwrightRequest,
} from '@playwright/test';
import { PostsApi } from '../../api/PostsApi';
import { UsersApi } from '../../api/UsersApi';
import { environment } from '../../config/environment';
import { CartPage } from '../../pages/demoblaze/CartPage';
import { LoginPage } from '../../pages/demoblaze/LoginPage';
import { ProductPage } from '../../pages/demoblaze/ProductPage';
import { SignUpPage } from '../../pages/demoblaze/SignUpPage';
import { StorePage } from '../../pages/demoblaze/StorePage';
import { HomePage } from '../../pages/HomePage';
import { InstallationPage } from '../../pages/InstallationPage';

export class CustomWorld extends World {
  browser?: Browser;
  context?: BrowserContext;
  page?: Page;
  api?: APIRequestContext;
  lastAlert?: string;
  lastResponse?: APIResponse;
  lastJson?: unknown;
  storeUser?: { username: string; password: string };

  constructor(options: IWorldOptions) {
    super(options);
  }

  homePage() {
    return new HomePage(this.requirePage());
  }

  installationPage() {
    return new InstallationPage(this.requirePage());
  }

  storePage() {
    return new StorePage(this.requirePage());
  }

  loginPage() {
    return new LoginPage(this.requirePage());
  }

  signUpPage() {
    return new SignUpPage(this.requirePage());
  }

  productPage() {
    return new ProductPage(this.requirePage());
  }

  cartPage() {
    return new CartPage(this.requirePage());
  }

  postsApi() {
    return new PostsApi(this.requireApi());
  }

  usersApi() {
    return new UsersApi(this.requireApi());
  }

  async openUi(baseURL: string) {
    this.browser = await chromium.launch({ headless: true });
    this.context = await this.browser.newContext({ baseURL });
    this.page = await this.context.newPage();
  }

  async openApi() {
    this.api = await playwrightRequest.newContext({ baseURL: environment.apiBaseURL });
  }

  async close() {
    await this.api?.dispose();
    await this.context?.close();
    await this.browser?.close();
  }

  private requirePage(): Page {
    if (!this.page) {
      throw new Error('UI was not started. Tag the scenario with @docs or @store.');
    }
    return this.page;
  }

  private requireApi(): APIRequestContext {
    if (!this.api) {
      throw new Error('API was not started. Tag the scenario with @api.');
    }
    return this.api;
  }
}

setWorldConstructor(CustomWorld);
