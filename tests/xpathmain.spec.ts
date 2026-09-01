import { test, expect } from '@playwright/test';

test('Amazon shopping flow with XPath', async ({ page }) => {
  test.setTimeout(120000);
  page.setDefaultNavigationTimeout(60000);

  await page.goto('https://www.amazon.in/', { waitUntil: 'networkidle' });
  await page.waitForLoadState('networkidle');

  await page.click("//a[text()='Computers']", { timeout: 30000 });

  await page.click("//span[text()='Laptops']", { timeout: 30000 });

  await page.click("//span[text()='HP']/preceding-sibling::div//input[@type='checkbox']", { timeout: 30000 });
  await page.click("//span[text()='Dell']/preceding-sibling::div//input[@type='checkbox']", { timeout: 30000 });

  await page.fill("//input[@id='low-price']", "50000");
  await page.fill("//input[@id='high-price']", "200000");
  await page.press("//input[@id='high-price']", "Enter");

  const items = await page.$$("(//div[@data-component-type='s-search-result'])[2]");
  await items[0].click({ timeout: 30000 });
  await page.click("//input[@id='add-to-cart-button']", { timeout: 30000 });

  await page.click("//a[@id='nav-cart']", { timeout: 30000 });

  await page.click("//input[@value='Delete']", { timeout: 30000 });

  await expect(page.locator("//div[contains(@class,'sc-list-item-removed')]"))
    .toContainText("removed", { timeout: 30000 });

  await page.fill("//input[@id='twotabsearchtextbox']", "Samsung S25 phone");
  await page.press("//input[@id='twotabsearchtextbox']", "Enter");

  const phones = await page.$$("(//div[@data-component-type='s-search-result'])[1]");
  await phones[0].click({ timeout: 30000 });

  await page.click("//input[@id='add-to-cart-button']", { timeout: 30000 });

  await expect(page.locator("//span[@id='nav-cart-count']"))
    .toHaveText("1", { timeout: 30000 });

  await page.click("//a[@id='nav-cart']", { timeout: 30000 });

  await page.click("//span[text()='Proceed to Buy']", { timeout: 30000 });
});
