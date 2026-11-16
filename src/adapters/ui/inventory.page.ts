import type { Locator, Page } from '@playwright/test';

export class InventoryPage {
  private readonly items: Locator;
  private readonly cartLink: Locator;

  constructor(private readonly page: Page) {
    this.items = page.getByTestId('inventory-item');
    this.cartLink = page.getByTestId('shopping-cart-link');
  }

  /** Adds the first two products in the list (read dynamically) and returns their names. */
  async addTwoDistinctProducts(): Promise<string[]> {
    const names: string[] = [];
    for (let i = 0; i < 2; i++) {
      const item = this.items.nth(i);
      names.push((await item.getByTestId('inventory-item-name').innerText()).trim());
      await item.getByRole('button', { name: 'Add to cart' }).click();
    }
    return names;
  }

  async openCart(): Promise<void> {
    await this.cartLink.click();
  }
}
