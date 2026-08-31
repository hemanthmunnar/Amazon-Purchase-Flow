import { test, expect } from '@playwright/test';

test('Amazon shopping flow with XPath', async ({ page }) => {
 
  await page.goto('https://www.amazon.in/');

 
  await page.click("//a[text()='Computers']");

 
  await page.click("//span[text()='Laptops']");

 
  await page.click("//span[text()='HP']/preceding-sibling::div//input[@type='checkbox']");
  await page.click("//span[text()='Dell']/preceding-sibling::div//input[@type='checkbox']");

 
  await page.fill("//input[@id='low-price']", "50000");
  await page.fill("//input[@id='high-price']", "200000");
  await page.press("//input[@id='high-price']", "Enter");

 
  const items = await page.$$("(//div[@data-component-type='s-search-result'])[2]");
  await items[0].click();
  await page.click("//input[@id='add-to-cart-button']");

 
  await page.click("//a[@id='nav-cart']");

 
  await page.click("//input[@value='Delete']");

 
  await expect(page.locator("//div[contains(@class,'sc-list-item-removed')]"))
    .toContainText("removed");

 
  await page.fill("//input[@id='twotabsearchtextbox']", "Samsung S25 phone");
  await page.press("//input[@id='twotabsearchtextbox']", "Enter");

 
  const phones = await page.$$("(//div[@data-component-type='s-search-result'])[1]");
  await phones[0].click();

 
  await page.click("//input[@id='add-to-cart-button']");

 
  await expect(page.locator("//span[@id='nav-cart-count']"))
    .toHaveText("1");

 
  await page.click("//a[@id='nav-cart']");

 
  await page.click("//span[text()='Proceed to Buy']");
});
