import { test as base, expect } from '@playwright/test';
import { LoginPage } from '../adapters/ui/login.page';
import { InventoryPage } from '../adapters/ui/inventory.page';
import { CartPage } from '../adapters/ui/cart.page';
import { CheckoutPage } from '../adapters/ui/checkout.page';

type UiFixtures = {
  loginPage: LoginPage;
  inventoryPage: InventoryPage;
  cartPage: CartPage;
  checkoutPage: CheckoutPage;
};

/** `test` scope: `page` is new per test, so every page object is too. Independent scenarios. */
export const test = base.extend<UiFixtures>({
  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
  },
  inventoryPage: async ({ page }, use) => {
    await use(new InventoryPage(page));
  },
  cartPage: async ({ page }, use) => {
    await use(new CartPage(page));
  },
  checkoutPage: async ({ page }, use) => {
    await use(new CheckoutPage(page));
  },
});

export { expect };
