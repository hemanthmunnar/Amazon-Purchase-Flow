import { test } from '@playwright/test';
import { homepage } from '../pages/homepage';
import { searchpage } from '../pages/searchpage';
import { cartpage } from '../pages/cartpage';
import { checkoutpage } from '../pages/checkoutpage';

test('Amazon shopping flow', async ({ page }) => {
  test.setTimeout(120000);

  const home = new homepage(page);
  const search = new searchpage(page);
  const cart = new cartpage(page);
  const checkout = new checkoutpage(page);

  await home.goto();

  await home.navigateToComputers();
  await home.navigateToLaptops();
  await page.waitForLoadState('domcontentloaded');

  await search.applyBrandFilter('HP');
  await search.applyBrandFilter('Dell');
  await page.waitForTimeout(2000);

  await search.setPriceRange("50000", "200000");
  await page.waitForTimeout(2000);

  await search.openNthItem(1);
  await page.waitForLoadState('domcontentloaded');
  
  const addToCartBtn = page.locator("//button[@id='add-to-cart-button'] | //input[@id='add-to-cart-button'] | //input[@name='submit.add-to-cart']").first();
  if (await addToCartBtn.isVisible({ timeout: 5000 }).catch(() => false)) {
    await addToCartBtn.click();
    await page.waitForLoadState('domcontentloaded');
  } else {
    console.log('Add to cart button not found on product page');
  }
  
  await cart.validateCartCount("1");
  await page.waitForLoadState('domcontentloaded');

  await cart.openCart();
  await page.waitForLoadState('domcontentloaded');

  await cart.deleteItem();
  await page.waitForTimeout(2000);
  await cart.validateItemRemoved();

  await home.searchProduct("Samsung S25 phone");
  await page.waitForLoadState('domcontentloaded');

  await search.openNthItem(0);
  await page.waitForLoadState('domcontentloaded');

  const addBtn2 = page.locator("//button[@id='add-to-cart-button'] | //input[@id='add-to-cart-button'] | //input[@name='submit.add-to-cart']").first();
  if (await addBtn2.isVisible({ timeout: 5000 }).catch(() => false)) {
    await addBtn2.click();
    await page.waitForLoadState('domcontentloaded');
  } else {
    console.log('Add to cart button not found on product page');
  }

  await cart.validateCartCount("1");
  await page.waitForLoadState('domcontentloaded');

  await cart.openCart();
  await page.waitForLoadState('domcontentloaded');

  await checkout.proceedToBuy();
});
