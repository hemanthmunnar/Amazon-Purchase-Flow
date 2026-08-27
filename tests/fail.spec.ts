import { test, expect } from '@playwright/test';

test('Amazon shopping flow', async ({ page }) => {
 
  await page.goto('https://www.amazon.in/');
  await page.click('text=Computers');
  await page.click('text=Laptops');
  await page.check('input[name="HP"]');
  await page.check('input[name="Dell"]');
  await page.fill('#low-price', '50000');
  await page.fill('#high-price', '200000');
  await page.press('#high-price', 'Enter');
  const items = await page.$$('div.s-main-slot div[data-component-type="s-search-result"]');
  await items[1].click(); // second item
  await page.click('#add-to-cart-button');
  await page.click('#nav-cart');
  await page.click('input[value="Delete"]');
  await expect(page.locator('.sc-list-item-removed')).toContainText('removed');
  await page.fill('#twotabsearchtextbox', 'Samsung S25 phone');
  await page.press('#twotabsearchtextbox', 'Enter');
  const phones = await page.$$('div.s-main-slot div[data-component-type="s-search-result"]');
  await phones[0].click();
  await page.click('#add-to-cart-button');
  await expect(page.locator('#nav-cart-count')).toHaveText('1');
  await page.click('#nav-cart');
  await page.click('text=Proceed to Buy');
});
