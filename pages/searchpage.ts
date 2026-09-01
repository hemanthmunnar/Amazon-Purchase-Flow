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
      let brandCheckbox = this.page.locator(`//span[text()='${brand}']/preceding::input[1]`);
      let count = await brandCheckbox.count();
      
      if (count === 0) {
        brandCheckbox = this.page.locator(`//label[contains(text(), '${brand}')]//input`);
        count = await brandCheckbox.count();
      }
      
      if (count === 0) {
        brandCheckbox = this.page.locator(`//a[contains(@href, 'brand')]//span[contains(text(), '${brand}')]`);
        count = await brandCheckbox.count();
      }
      
      if (count > 0) {
        await brandCheckbox.first().click({ force: true, timeout: 5000 });
        await this.page.waitForTimeout(1500);
        console.log(`Brand filter ${brand} applied`);
      } else {
        console.log(`Brand filter ${brand} not available on page`);
      }
    } catch (e) {
      console.log(`Error applying brand filter ${brand}: ${e.message}`);
    }
  }

  async setPriceRange(min: string, max: string) {
    try {
      let lowPrice = this.page.locator("//input[@id='low-price']");
      let highPrice = this.page.locator("//input[@id='high-price']");
      
      let lowCount = await lowPrice.count();
      let highCount = await highPrice.count();
      
      if (lowCount === 0) {
        lowPrice = this.page.locator("//input[contains(@placeholder, 'Min')]");
        lowCount = await lowPrice.count();
      }
      
      if (highCount === 0) {
        highPrice = this.page.locator("//input[contains(@placeholder, 'Max')]");
        highCount = await highPrice.count();
      }
      
      if (lowCount > 0) {
        await lowPrice.first().fill(min);
        console.log(`Minimum price set to ${min}`);
      }
      
      if (highCount > 0) {
        await highPrice.first().fill(max);
        await highPrice.first().press('Enter');
        await this.page.waitForTimeout(2000);
        console.log(`Maximum price set to ${max}`);
      }
      
      if (lowCount === 0 && highCount === 0) {
        console.log('Price filter inputs not available on page');
      }
    } catch (e) {
      console.log(`Error setting price range: ${e}`);
    }
  }

  async openNthItem(n: number) {
    try {
      await this.page.waitForLoadState('domcontentloaded');
      
      const itemCount = await this.items.count();
      console.log(`Total items found: ${itemCount}`);
      
      if (itemCount === 0) {
        console.log('No search results found');
        return;
      }
      
      const targetIndex = Math.min(n, itemCount - 1);
      
      const item = this.items.nth(targetIndex);
      const itemLink = item.locator('a[href*="/dp/"]').first();
      
      if (await itemLink.count() > 0) {
        const href = await itemLink.getAttribute('href');
        if (href) {
          try {
            const fullUrl = new URL(href, this.page.url()).toString();
            await this.page.goto(fullUrl, { waitUntil: 'domcontentloaded' });
            console.log(`Opened item ${targetIndex} successfully`);
          } catch (navError) {
            console.log(`Navigation error: ${navError}`);
          }
        }
      } else {
        console.log(`No product link found in item ${targetIndex}`);
      }
    } catch (e) {
      console.log(`Error opening item ${n}: ${e}`);
    }
  }
}
