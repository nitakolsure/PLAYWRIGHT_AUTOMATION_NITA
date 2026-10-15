import { sampleOrder } from '../../data/order';
import { environment } from '../../config/environment';
import { test, expect } from '../../fixtures/test';

const samsungPhone = 'Samsung galaxy s6';
const laptop = 'Sony vaio i5';

test.use({ baseURL: environment.storeBaseURL });
test.setTimeout(90_000);

test('adds a Samsung phone and a laptop, then places the order', async ({
  storePage,
  productPage,
  cartPage,
}) => {
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
