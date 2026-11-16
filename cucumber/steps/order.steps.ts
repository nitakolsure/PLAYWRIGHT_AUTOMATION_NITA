import { Given, Then, When } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { laptop, samsungPhone } from '../../data/catalog';
import { sampleOrder } from '../../data/order';
import { CustomWorld } from '../support/world';

Given('the cart is empty', async function (this: CustomWorld) {
  await this.cartPage().clear();
});

When('I add {string} from {string}', async function (this: CustomWorld, product: string, category: 'Phones' | 'Laptops' | 'Monitors') {
  await this.storePage().goto();
  await this.storePage().openProduct(category, product);
  const added = await this.productPage().addToCart();
  expect(added).toContain('Product added');
});

When('I add a Samsung phone and a laptop', async function (this: CustomWorld) {
  await this.storePage().goto();
  await this.storePage().openProduct('Phones', samsungPhone);
  expect(await this.productPage().addToCart()).toContain('Product added');
  await this.storePage().goto();
  await this.storePage().openProduct('Laptops', laptop);
  expect(await this.productPage().addToCart()).toContain('Product added');
});

When('I open the cart', async function (this: CustomWorld) {
  await this.cartPage().open();
});

Then('the cart contains {int} {string}', async function (this: CustomWorld, count: number, product: string) {
  await this.cartPage().expectProduct(product, count);
});

When('I remove {string} from the cart', async function (this: CustomWorld, product: string) {
  await this.cartPage().removeProduct(product);
});

When('I place the sample order', async function (this: CustomWorld) {
  await this.cartPage().placeOrder(sampleOrder);
});

Then('the purchase is confirmed', async function (this: CustomWorld) {
  await this.cartPage().expectOrderPlaced(sampleOrder);
});

When('I purchase with an empty order form', async function (this: CustomWorld) {
  this.lastAlert = await this.cartPage().purchaseWithEmptyForm();
});

Then('the purchase alert contains {string}', function (this: CustomWorld, expected: string) {
  expect(this.lastAlert).toContain(expected);
});
