/** Checks the public Playwright documentation home page. */
import { test } from '../fixtures/test';

test('has title', { tag: '@smoke' }, async ({ homePage }) => {
  await homePage.goto();
  await homePage.expectTitle();
});

test('get started link', { tag: '@regression' }, async ({ homePage, installationPage }) => {
  await homePage.goto();
  await homePage.clickGetStarted();
  await installationPage.expectVisible();
});
