import { test, expect } from '../../src/fixtures/ui.fixture';
import { standardUser, buyer } from '../../src/data/checkout.data';

test.describe('SauceDemo checkout', () => {
  test('standard_user completes a purchase of two distinct products', async ({
    loginPage, inventoryPage, cartPage, checkoutPage,
  }) => {
    await loginPage.goto();
    await loginPage.login(standardUser.username, standardUser.password);

    const added = await inventoryPage.addTwoDistinctProducts();
    await inventoryPage.openCart();

    // A single expect covers the number of products, their names, and quantity 1 of each.
    const items = await cartPage.getItems();
    expect(items).toEqual(added.map((name) => ({ name, quantity: 1 })));

    await cartPage.proceedToCheckout();
    await checkoutPage.fillInformation(buyer);
    await checkoutPage.finish();

    await expect(checkoutPage.confirmationMessage).toHaveText('Thank you for your order!');
  });
});
