import { test, expect } from '../../fixtures/test';

test.use({ baseURL: 'https://www.demoblaze.com' });
test.setTimeout(60_000);

const password = 'Pass1234';

test('logs in with a new account', async ({ storePage, signUpPage, loginPage }) => {
  const username = `pwuser${Date.now()}`;

  await storePage.goto();

  const signUpMessage = await signUpPage.signUp(username, password);
  expect(signUpMessage).toBe('Sign up successful.');
  await signUpPage.close();
  await storePage.expectLoggedOut();

  const loginMessage = await loginPage.login(username, password);
  expect(loginMessage).toBeUndefined();
  await storePage.expectLoggedInAs(username);
});

test('rejects a wrong password', async ({ storePage, loginPage }) => {
  await storePage.goto();

  const loginMessage = await loginPage.login('pwuser', 'wrong-password');
  expect(loginMessage).toMatch(/Wrong password|User does not exist/);
  await storePage.expectLoggedOut();
});
