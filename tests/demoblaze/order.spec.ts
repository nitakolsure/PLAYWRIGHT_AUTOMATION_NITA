/** Signed-in shopper adds products, changes the cart, and places an order. */
import fs from 'fs';
import { environment } from '../../config/environment';
import { sessionMetaPath } from '../../config/paths';
import { laptop, samsungPhone } from '../../data/catalog';
import { sampleOrder } from '../../data/order';
import { test, expect } from '../../fixtures/test';

test.describe.configure({ mode: 'serial' });
test.use({ baseURL: environment.storeBaseURL });
test.setTimeout(90_000);

function signedInUsername() {
  const session = JSON.parse(fs.readFileSync(sessionMetaPath, 'utf8')) as { username: string };
  return session.username;
}

test('adds a Samsung phone and a laptop, then places the order', { tag: '@e2e' }, async ({
  storePage,
  productPage,
  cartPage,
}) => {
  await storePage.goto();
  await storePage.expectLoggedInAs(signedInUsername());
  await cartPage.clear();

  await storePage.goto();
  await storePage.openProduct('Phones', samsungPhone);
  expect(await productPage.addToCart()).toContain('Product added');

  await storePage.goto();
  await storePage.openProduct('Laptops', laptop);
  expect(await productPage.addToCart()).toContain('Product added');

  await cartPage.open();
  await cartPage.expectProduct(samsungPhone);
  await cartPage.expectProduct(laptop);
  await cartPage.placeOrder(sampleOrder);
  await cartPage.expectOrderPlaced(sampleOrder);
});

test('blocks purchase when the order form is empty', { tag: '@regression' }, async ({
  storePage,
  productPage,
  cartPage,
}) => {
  await cartPage.clear();
  await storePage.goto();
  await storePage.openProduct('Phones', samsungPhone);
  expect(await productPage.addToCart()).toContain('Product added');

  await cartPage.open();
  const message = await cartPage.purchaseWithEmptyForm();
  expect(message).toContain('Please fill out Name and Creditcard.');
});

test('removes the laptop and places the order for the Samsung phone', { tag: '@e2e' }, async ({
  storePage,
  productPage,
  cartPage,
}) => {
  await cartPage.clear();
  await storePage.goto();
  await storePage.openProduct('Phones', samsungPhone);
  expect(await productPage.addToCart()).toContain('Product added');

  await storePage.goto();
  await storePage.openProduct('Laptops', laptop);
  expect(await productPage.addToCart()).toContain('Product added');

  await cartPage.open();
  await cartPage.removeProduct(laptop);
  await cartPage.expectProduct(samsungPhone);
  await cartPage.placeOrder(sampleOrder);
  await cartPage.expectOrderPlaced(sampleOrder);
});
