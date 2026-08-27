import { test, expect } from '@playwright/test';

test('Amazon shopping flow', async ({ page }) => {
    test.setTimeout(120000);
    page.setDefaultNavigationTimeout(60000);

    await page.goto('https://www.amazon.in/', { waitUntil: 'domcontentloaded' });

    
    await page.getByRole('link', { name: 'Computers', exact: true }).click();
    await page.getByRole('link', { name: 'Laptops', exact: true }).last().click();

    await page.goto('https://www.amazon.in/s?i=computers&rh=n%3A1375424031%2Cp_123%3A241862%257C308445&low-price=50000&high-price=200000',
      { waitUntil: 'domcontentloaded' },
    );

    const products = page.locator('[data-component-type="s-search-result"]');
    await expect(products.nth(1)).toBeVisible({ timeout: 20000 });
    const secondProduct = products.nth(1).getByRole('link').filter({ has: page.locator('h2') }).first();
    const productHref = await secondProduct.getAttribute('href');
    expect(productHref).toBeTruthy();
    await page.goto(new URL(productHref as string, 'https://www.amazon.in').toString(), {
      waitUntil: 'domcontentloaded',
    });
    await expect(page.locator('#productTitle:visible')).toBeVisible({ timeout: 20000 });
    await page.locator('#buybox #add-to-cart-button').last().click();

    await page.getByRole('link', { name: /Go to Cart/i }).click();
    const removedItem = page.locator('#sc-active-cart .sc-list-item').first();
    await expect(removedItem).toBeVisible({ timeout: 20000 });
    await removedItem.locator('input[data-action="delete-active"]').click();
    await expect(removedItem).toHaveCount(0, { timeout: 20000 });

    await page.getByRole('searchbox', { name: 'Search Amazon.in' }).fill('Samsung S25 phone');
    await page.getByRole('searchbox', { name: 'Search Amazon.in' }).press('Enter');
    const firstPhone = page.locator('[data-component-type="s-search-result"] a[href*="/dp/"]').first();
    await expect(firstPhone).toBeVisible({ timeout: 20000 });
    const phoneHref = await firstPhone.getAttribute('href');
    expect(phoneHref).toBeTruthy();
    await page.goto(new URL(phoneHref as string, 'https://www.amazon.in').toString(), {
      waitUntil: 'domcontentloaded',
    });
    await expect(page.locator('#productTitle:visible')).toBeVisible({ timeout: 20000 });
    await page.locator('#buybox #add-to-cart-button').last().click();

    await expect(page.getByRole('link', { name: /item in cart|cart/i }).first()).toContainText(/1|2/);
    await page.getByRole('link', { name: /item in cart|cart/i }).first().click();
    await page.getByRole('button', { name: /Proceed to Buy/i }).click();
    await expect(page).toHaveURL(/(signin|buy|checkout)/i);
  });