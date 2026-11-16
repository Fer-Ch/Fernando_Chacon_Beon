import type { Locator, Page } from '@playwright/test';

export class CheckoutPage {
  private readonly firstName: Locator;
  private readonly lastName: Locator;
  private readonly postalCode: Locator;
  private readonly continueButton: Locator;
  private readonly finishButton: Locator;
  readonly confirmationMessage: Locator;

  constructor(private readonly page: Page) {
    this.firstName = page.getByPlaceholder('First Name');
    this.lastName = page.getByPlaceholder('Last Name');
    this.postalCode = page.getByPlaceholder('Zip/Postal Code');
    this.continueButton = page.getByRole('button', { name: 'Continue' });
    this.finishButton = page.getByRole('button', { name: 'Finish' });
    this.confirmationMessage = page.getByTestId('complete-header');
  }

  async fillInformation(buyer: { firstName: string; lastName: string; postalCode: string }): Promise<void> {
    await this.firstName.fill(buyer.firstName);
    await this.lastName.fill(buyer.lastName);
    await this.postalCode.fill(buyer.postalCode);
    await this.continueButton.click();
  }

  async finish(): Promise<void> {
    await this.finishButton.click();
  }
}
