/** Covers sign-up, a valid login, and rejected login attempts. */
import { environment } from '../../config/environment';
import { invalidStoreLogin, newStoreUser } from '../../data/storeUser';
import { test, expect } from '../../fixtures/test';

test.use({ baseURL: environment.storeBaseURL });
test.setTimeout(60_000);

test('logs in with a new account', { tag: '@smoke' }, async ({ storePage, signUpPage, loginPage }) => {
  const { username, password } = newStoreUser();

  await storePage.goto();

  const signUpMessage = await signUpPage.signUp(username, password);
  expect(signUpMessage).toBe('Sign up successful.');
  await signUpPage.close();
  await storePage.expectLoggedOut();

  const loginMessage = await loginPage.login(username, password);
  expect(loginMessage).toBeUndefined();
  await storePage.expectLoggedInAs(username);
});

test('rejects a wrong password', { tag: '@regression' }, async ({ storePage, loginPage }) => {
  await storePage.goto();

  const loginMessage = await loginPage.login(invalidStoreLogin.username, invalidStoreLogin.password);
  expect(loginMessage).toMatch(/Wrong password|User does not exist/);
  await storePage.expectLoggedOut();
});

test('rejects a blank password', { tag: '@regression' }, async ({ storePage, loginPage }) => {
  await storePage.goto();

  const loginMessage = await loginPage.login('pwuser', '');
  expect(loginMessage).toContain('Please fill out Username and Password.');
  await storePage.expectLoggedOut();
});
