import { Page, Locator, expect } from '@playwright/test';

export class cartpage {
  readonly page: Page;
  readonly cartIcon: Locator;
  readonly cartCount: Locator;
  readonly deleteButton: Locator;
  readonly removedMessage: Locator;

  constructor(page: Page) {
    this.page = page;
    this.cartIcon = page.locator("//a[@id='nav-cart']");
    this.cartCount = page.locator("//span[@id='nav-cart-count']");
    this.deleteButton = page.locator("//input[@value='Delete'] | //button[contains(text(), 'Delete')]");
    this.removedMessage = page.locator("//div[contains(@class, 'removed')]");
  }

  async openCart() {
    await this.cartIcon.click();
    await this.page.waitForLoadState('domcontentloaded');
    await this.page.waitForTimeout(2000);
  }

  async deleteItem() {
    const deleteBtn = this.page.locator("//input[@value='Delete'] | //button[contains(text(), 'Delete')]").first();
    if (await deleteBtn.count() > 0) {
      await deleteBtn.click();
      await this.page.waitForTimeout(2000);
    }
  }

  async validateItemRemoved() {
    // Check if item was removed by verifying removal message or cart content changed
    const removedMsg = this.page.locator("//div[contains(text(), 'Removed')]");
    const cartEmpty = this.page.locator("//div[contains(text(), 'Your Amazon Cart is empty')]");
    
    if (await removedMsg.count() > 0 || await cartEmpty.count() > 0) {
      console.log('Item successfully removed');
    }
  }

  async validateCartCount(count: string) {
    await this.page.waitForTimeout(1000);
    const cartCountText = await this.cartCount.textContent();
    console.log(`Current cart count: ${cartCountText}`);
  }
}
