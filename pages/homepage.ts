import { Page, Locator } from '@playwright/test';

export class homepage {
  readonly page: Page;
  readonly searchBox: Locator;
  readonly computersDropdown: Locator;

  constructor(page: Page) {
    this.page = page;
    this.searchBox = page.locator("//input[@id='twotabsearchtextbox']");
    this.computersDropdown = page.locator("//select[@id='searchDropdownBox']");
  }

  async goto() {
    await this.page.goto('https://www.amazon.in/');
    await this.page.waitForLoadState('domcontentloaded');
  }

  async navigateToComputers() {
    await this.computersDropdown.selectOption('search-alias=computers');
  }

  async navigateToLaptops() {
    await this.searchBox.fill('Laptops');
    await this.searchBox.press('Enter');
    await this.page.waitForLoadState('domcontentloaded');
    await this.page.waitForTimeout(3000);
  }

  async searchProduct(product: string) {
    await this.searchBox.click();
    await this.searchBox.clear();
    await this.searchBox.fill(product);
    await this.searchBox.press('Enter');
    await this.page.waitForLoadState('domcontentloaded');
    await this.page.waitForTimeout(3000);
  }
}
