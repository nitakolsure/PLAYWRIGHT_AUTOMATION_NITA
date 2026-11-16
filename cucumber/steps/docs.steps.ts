import { Given, Then, When } from '@cucumber/cucumber';
import { CustomWorld } from '../support/world';

Given('I open the Playwright documentation', async function (this: CustomWorld) {
  await this.homePage().goto();
});

Then('the documentation title contains Playwright', async function (this: CustomWorld) {
  await this.homePage().expectTitle();
});

When('I open the Get started link', async function (this: CustomWorld) {
  await this.homePage().clickGetStarted();
});

Then('the Installation heading is visible', async function (this: CustomWorld) {
  await this.installationPage().expectVisible();
});
