import type { Locator, Page } from '@playwright/test';

export class CartPage {
  private readonly items: Locator;
  private readonly checkoutButton: Locator;

  constructor(private readonly page: Page) {
    this.items = page.getByTestId('inventory-item');
    this.checkoutButton = page.getByRole('button', { name: 'Checkout' });
  }

  async getItems(): Promise<{ name: string; quantity: number }[]> {
    await this.items.first().waitFor();
    return this.items.evaluateAll((els) =>
      els.map((el) => ({
        name: (el.querySelector('[data-test="inventory-item-name"]')?.textContent ?? '').trim(),
        quantity: Number(el.querySelector('[data-test="item-quantity"]')?.textContent ?? '0'),
      })),
    );
  }

  async proceedToCheckout(): Promise<void> {
    await this.checkoutButton.click();
  }
}
