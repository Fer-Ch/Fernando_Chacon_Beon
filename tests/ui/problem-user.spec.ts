import { test, expect } from '../../src/fixtures/ui.fixture';
import { problemUser, buyer } from '../../src/data/checkout.data';

/**
 * Exploratory flow for problem_user. Asserts the EXPECTED behaviour with soft assertions,
 * so one run lists every defect found. Failures here are the bugs to report.
 */
test.describe('SauceDemo problem_user flow', () => {
  test('problem_user can browse, add two products and complete checkout', async ({
    page, loginPage, inventoryPage, cartPage, checkoutPage,
  }) => {
    await loginPage.goto();
    await loginPage.login(problemUser.username, problemUser.password);
    await expect(page).toHaveURL(/inventory\.html/);

    // 1. Every product should show its own image.
    const sources = await page.getByTestId('inventory-item').locator('img').evaluateAll(
      (imgs) => imgs.map((img) => (img as HTMLImageElement).getAttribute('src')),
    );
    expect.soft(new Set(sources).size, `Image sources: ${sources.join(', ')}`).toBe(sources.length);

    // 2. Adding two products should leave the cart badge at 2.
    const added = await inventoryPage.addTwoDistinctProducts();
    await expect.soft(page.getByTestId('shopping-cart-badge')).toHaveText('2');

    // 3. Cart should list exactly the two products added.
    await inventoryPage.openCart();
    const items = await cartPage.getItems();
    expect.soft(items).toEqual(added.map((name) => ({ name, quantity: 1 })));

    // 4. Checkout info: after Continue, the overview step must be reached.
    await cartPage.proceedToCheckout();
    await checkoutPage.fillInformation(buyer);
    await expect.soft(page, 'Should reach the overview step').toHaveURL(/checkout-step-two\.html/);
    await expect.soft(page.getByTestId('error')).toHaveCount(0);

    // 5. Finish and confirm the order.
    if (/checkout-step-two/.test(page.url())) {
      await checkoutPage.finish();
      await expect.soft(checkoutPage.confirmationMessage).toHaveText('Thank you for your order!');
    }
  });
});
