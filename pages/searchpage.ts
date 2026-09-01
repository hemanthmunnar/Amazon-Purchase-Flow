import { Page, Locator } from '@playwright/test';

export class searchpage {
  readonly page: Page;
  readonly items: Locator;

  constructor(page: Page) {
    this.page = page;
    this.items = page.locator("//div[@data-component-type='s-search-result']");
  }

  async applyBrandFilter(brand: string) {
    try {
      const brandCheckbox = this.page.locator(`//span[text()='${brand}']/preceding::input[1]`);
      if (await brandCheckbox.count() > 0) {
        await brandCheckbox.click();
        await this.page.waitForTimeout(2000);
      }
    } catch (e) {
      console.log(`Brand filter ${brand} not available`);
    }
  }

  async setPriceRange(min: string, max: string) {
    try {
      const lowPrice = this.page.locator("//input[@id='low-price']");
      const highPrice = this.page.locator("//input[@id='high-price']");
      
      if (await lowPrice.count() > 0) {
        await lowPrice.fill(min);
      }
      if (await highPrice.count() > 0) {
        await highPrice.fill(max);
        await highPrice.press('Enter');
        await this.page.waitForTimeout(2000);
      }
    } catch (e) {
      console.log('Price filter not available');
    }
  }

  async openNthItem(n: number) {
    try {
      await this.page.waitForTimeout(2000);
      const itemCount = await this.items.count();
      console.log(`Total items found: ${itemCount}`);
      
      if (n >= itemCount) {
        console.log(`Item ${n} not found, using item ${itemCount - 1}`);
        const lastItem = this.items.nth(itemCount - 1);
        const link = lastItem.locator('a[href*="/dp/"]').first();
        if (await link.count() > 0) {
          const href = await link.getAttribute('href');
          if (href) {
            const fullUrl = new URL(href, this.page.url()).toString();
            await this.page.goto(fullUrl);
            await this.page.waitForLoadState('domcontentloaded');
            await this.page.waitForTimeout(3000);
            return;
          }
        }
      }
      
      const item = this.items.nth(n);
      const itemLink = item.locator('a[href*="/dp/"]').first();
      
      if (await itemLink.count() > 0) {
        const href = await itemLink.getAttribute('href');
        if (href) {
          const fullUrl = new URL(href, this.page.url()).toString();
          await this.page.goto(fullUrl);
          await this.page.waitForLoadState('domcontentloaded');
          await this.page.waitForTimeout(3000);
        }
      } else {
        console.log(`No product link found in item ${n}`);
      }
    } catch (e) {
      console.log(`Could not open item ${n}: ${e}`);
    }
  }
}
