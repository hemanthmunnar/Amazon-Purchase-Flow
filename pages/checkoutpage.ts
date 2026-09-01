import { Page } from '@playwright/test';

export class checkoutpage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async proceedToBuy() {
    try {
      const proceedBtn = this.page.locator("//button[@id='sc-buy-box-ptc-button'] | //input[@name='proceedToRetailCheckout']").first();
      if (await proceedBtn.count() > 0) {
        await proceedBtn.click();
        console.log('Proceeding to checkout');
      } else {
        console.log('Proceed to buy button not found');
      }
    } catch (e) {
      console.log(`Error proceeding to checkout: ${e}`);
    }
  }
}
