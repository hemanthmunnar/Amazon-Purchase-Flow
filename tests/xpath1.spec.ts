import { test, expect, Locator } from '@playwright/test';

test('Amazon shopping flow using XPath', async ({ page }) => {
    test.setTimeout(120000);
    
    await page.goto('https://www.amazon.in/');
    
    const logo: Locator = page.locator("//a[@id='nav-logo-sprites' or contains(@href, 'nav_logo')]");
    await expect(logo).toBeVisible();

    await page.click("//a[text()='Computers']");

    await page.click("//span[text()='Laptops']");
    
    await page.locator("//input[@aria-labelledby='HP']/following-sibling::i[contains(@class, 'a-icon-checkbox')]").click();
    const dellFilter = page.locator("//input[@aria-labelledby='Dell']");
    if (await dellFilter.count() > 0) {
        await page.locator("//input[@aria-labelledby='Dell']/following-sibling::i[contains(@class, 'a-icon-checkbox')]").click();
    }

    const lowPrice = page.locator("//input[@id='low-price']");
    const highPrice = page.locator("//input[@id='high-price']");
    if (await lowPrice.count() > 0 && await highPrice.count() > 0) {
        await lowPrice.fill("50000");
        await highPrice.fill("200000");
        await highPrice.press("Enter");
    }

    const items = page.locator("//div[@data-component-type='s-search-result']");
    await expect(items.nth(1)).toBeVisible({ timeout: 30000 });
    const laptopLink = items.nth(1).locator("xpath=.//a[.//h2]").first();
    await expect(laptopLink).toBeVisible({ timeout: 30000 });
    await page.goto(new URL(await laptopLink.getAttribute('href') as string, page.url()).toString());
    const shoppingPage = page;
    await shoppingPage.locator("(//input[@id='add-to-cart-button'] | //input[@name='submit.add-to-cart'] | //button[@id='add-to-cart-button'] | //button[normalize-space()='Add to cart'])[last()]").click();
    await expect(shoppingPage.locator("//span[@id='nav-cart-count']")).toHaveText("1");

    await shoppingPage.locator("//a[@id='nav-cart']").click();

    await shoppingPage.locator("//button[normalize-space()='Delete'] | //input[@value='Delete']").first().click();

    await expect(shoppingPage.locator("//div[contains(concat(' ', normalize-space(@class), ' '), ' sc-list-item-removed-msg ')]").first())
        .toContainText("removed");

    await shoppingPage.fill("//input[@id='twotabsearchtextbox']", "Samsung S25 phone");
    await shoppingPage.press("//input[@id='twotabsearchtextbox']", "Enter");

    const phones = shoppingPage.locator("//div[@data-component-type='s-search-result']");
    await expect(phones.first()).toBeVisible({ timeout: 30000 });
    const phoneLink = phones.first().locator("xpath=.//a[.//h2]").first();
    await expect(phoneLink).toBeVisible({ timeout: 30000 });
    await shoppingPage.goto(new URL(await phoneLink.getAttribute('href') as string, shoppingPage.url()).toString());
    await shoppingPage.locator("(//input[@id='add-to-cart-button'] | //input[@name='submit.add-to-cart'] | //button[@id='add-to-cart-button'] | //button[normalize-space()='Add to cart'])[last()]").click();

    await expect(shoppingPage.locator("//span[@id='nav-cart-count']"))
    .toHaveText("1");

    await shoppingPage.locator("//a[@id='nav-cart']").click();

    await shoppingPage.locator("//button[@id='sc-buy-box-ptc-button'] | //input[@name='proceedToRetailCheckout']").first().click();


})