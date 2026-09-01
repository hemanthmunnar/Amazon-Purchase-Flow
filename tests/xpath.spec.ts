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

  await search.applyBrandFilter('HP');
  await search.applyBrandFilter('Dell');

  await search.setPriceRange("50000", "200000");

  await search.openNthItem(1);
  
  const addToCartBtn = page.locator("//button[@id='add-to-cart-button'] | //input[@id='add-to-cart-button'] | //input[@name='submit.add-to-cart']").first();
  if (await addToCartBtn.count() > 0) {
    await addToCartBtn.click();
    await page.waitForTimeout(3000);
  }
  await cart.validateCartCount("1");

  await cart.openCart();

  await cart.deleteItem();
  await cart.validateItemRemoved();

  await home.searchProduct("Samsung S25 phone");

  await search.openNthItem(0);

  const addBtn2 = page.locator("//button[@id='add-to-cart-button'] | //input[@id='add-to-cart-button'] | //input[@name='submit.add-to-cart']").first();
  if (await addBtn2.count() > 0) {
    await addBtn2.click();
    await page.waitForTimeout(3000);
  }

  await cart.validateCartCount("1");

  await cart.openCart();

  await checkout.proceedToBuy();
});
