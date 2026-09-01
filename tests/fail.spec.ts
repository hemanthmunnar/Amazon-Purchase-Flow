import { test, expect } from '@playwright/test';

test('Amazon shopping flow', async ({ page }) => {
  test.setTimeout(120000);
  page.setDefaultNavigationTimeout(60000);

  await page.goto('https://www.amazon.in/', { waitUntil: 'networkidle' });
  await page.waitForLoadState('networkidle');
  
  await page.click('text=Computers', { timeout: 30000 });
  await page.click('text=Laptops', { timeout: 30000 });
  await page.check('input[name="HP"]', { timeout: 30000 });
  await page.check('input[name="Dell"]', { timeout: 30000 });
  await page.fill('#low-price', '50000');
  await page.fill('#high-price', '200000');
  await page.press('#high-price', 'Enter');
  
  const items = await page.$$('div.s-main-slot div[data-component-type="s-search-result"]');
  await items[1].click({ timeout: 30000 });
  await page.click('#add-to-cart-button', { timeout: 30000 });
  await page.click('#nav-cart', { timeout: 30000 });
  await page.click('input[value="Delete"]', { timeout: 30000 });
  
  await expect(page.locator('.sc-list-item-removed')).toContainText('removed', { timeout: 30000 });
  await page.fill('#twotabsearchtextbox', 'Samsung S25 phone');
  await page.press('#twotabsearchtextbox', 'Enter');
  
  const phones = await page.$$('div.s-main-slot div[data-component-type="s-search-result"]');
  await phones[0].click({ timeout: 30000 });
  await page.click('#add-to-cart-button', { timeout: 30000 });
  await expect(page.locator('#nav-cart-count')).toHaveText('1', { timeout: 30000 });
  await page.click('#nav-cart', { timeout: 30000 });
  await page.click('text=Proceed to Buy', { timeout: 30000 });
});
