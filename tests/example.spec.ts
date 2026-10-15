import { test } from '../fixtures/test';

test('has title', async ({ homePage }) => {
  await homePage.goto();
  await homePage.expectTitle();
});

test('get started link', async ({ homePage, installationPage }) => {
  await homePage.goto();
  await homePage.clickGetStarted();
  await installationPage.expectVisible();
});
