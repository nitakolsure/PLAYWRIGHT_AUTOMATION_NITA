import { test as base } from '@playwright/test';
import { PostsApi } from '../api/PostsApi';
import { LoginPage } from '../pages/demoblaze/LoginPage';
import { SignUpPage } from '../pages/demoblaze/SignUpPage';
import { StorePage } from '../pages/demoblaze/StorePage';
import { HomePage } from '../pages/HomePage';
import { InstallationPage } from '../pages/InstallationPage';

type PageFixtures = {
  homePage: HomePage;
  installationPage: InstallationPage;
  postsApi: PostsApi;
  storePage: StorePage;
  loginPage: LoginPage;
  signUpPage: SignUpPage;
};

export const test = base.extend<PageFixtures>({
  homePage: async ({ page }, use) => {
    await use(new HomePage(page));
  },
  installationPage: async ({ page }, use) => {
    await use(new InstallationPage(page));
  },
  postsApi: async ({ request }, use) => {
    await use(new PostsApi(request));
  },
  storePage: async ({ page }, use) => {
    await use(new StorePage(page));
  },
  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
  },
  signUpPage: async ({ page }, use) => {
    await use(new SignUpPage(page));
  },
});

export { expect } from '@playwright/test';
