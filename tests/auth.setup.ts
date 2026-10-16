import fs from 'fs';
import path from 'path';
import { expect, test as setup } from '@playwright/test';
import { authStatePath, sessionMetaPath } from '../config/paths';
import { newStoreUser } from '../data/storeUser';
import { LoginPage } from '../pages/demoblaze/LoginPage';
import { SignUpPage } from '../pages/demoblaze/SignUpPage';
import { StorePage } from '../pages/demoblaze/StorePage';

setup.setTimeout(60_000);

setup('create a signed-in store session', async ({ page }) => {
  const user = newStoreUser();
  const storePage = new StorePage(page);
  const signUpPage = new SignUpPage(page);
  const loginPage = new LoginPage(page);

  await storePage.goto();
  expect(await signUpPage.signUp(user.username, user.password)).toBe('Sign up successful.');
  await signUpPage.close();
  expect(await loginPage.login(user.username, user.password)).toBeUndefined();
  await storePage.expectLoggedInAs(user.username);

  fs.mkdirSync(path.dirname(authStatePath), { recursive: true });
  await page.context().storageState({ path: authStatePath });
  fs.writeFileSync(sessionMetaPath, JSON.stringify({ username: user.username }));
});
