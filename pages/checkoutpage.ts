import { Page } from '@playwright/test';

export class checkoutpage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async proceedToBuy() {
    await this.page.locator("//button[@id='sc-buy-box-ptc-button'] | //input[@name='proceedToRetailCheckout']").first().click();
  }
}
