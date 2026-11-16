import { After, Before, Status, setDefaultTimeout } from '@cucumber/cucumber';

setDefaultTimeout(90_000);
import { environment } from '../../config/environment';
import { CustomWorld } from './world';

Before({ tags: '@docs' }, async function (this: CustomWorld) {
  await this.openUi(environment.webBaseURL);
});

Before({ tags: '@store' }, async function (this: CustomWorld) {
  await this.openUi(environment.storeBaseURL);
});

Before({ tags: '@api' }, async function (this: CustomWorld) {
  await this.openApi();
});

After(async function (this: CustomWorld, { result }) {
  if (result?.status === Status.FAILED && this.page) {
    const screenshot = await this.page.screenshot();
    this.attach(screenshot, 'image/png');
  }
  await this.close();
});
