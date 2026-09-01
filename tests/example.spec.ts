import { test, expect } from '@playwright/test';

test('Amazon Shopping Flow', async ({ page }) => {
  test.setTimeout(180000);
  page.setDefaultNavigationTimeout(90000);

  await page.goto('https://www.amazon.in/', { waitUntil: 'networkidle' });
  await page.waitForLoadState('networkidle');
  
  await page.getByRole('button', { name: 'Open All Categories Menu' }).click({ timeout: 30000 });
  await page.getByRole('link', { name: 'Computers', exact: true }).click({ force: true, timeout: 30000 });
  await page.getByRole('link', { name: 'Laptops', exact: true }).last().click({ timeout: 30000 });

  await page.goto(
    'https://www.amazon.in/s?i=computers&rh=n%3A1375424031%2Cp_123%3A241862%257C308445&low-price=50000&high-price=200000',
    { waitUntil: 'networkidle' },
  );
  await page.waitForLoadState('networkidle');

  const laptopResults = page
    .locator('[data-component-type="s-search-result"]')
    .filter({ has: page.locator('a[href*="/dp/"]') });
  await expect(laptopResults.nth(1)).toBeVisible({ timeout: 30000 });
  const laptopLink = laptopResults.nth(1).locator('a[href*="/dp/"]').first();
  const laptopHref = await laptopLink.getAttribute('href');
  expect(laptopHref).toBeTruthy();
  await page.goto(new URL(laptopHref as string, 'https://www.amazon.in').toString(), {
    waitUntil: 'networkidle',
  });
  await page.waitForLoadState('networkidle');
  await expect(page.locator('#productTitle:visible')).toBeVisible({ timeout: 30000 });
  await page.locator('#buybox #add-to-cart-button').last().click({ timeout: 30000 });

  await page.getByRole('link', { name: /Go to Cart/i }).click({ timeout: 30000 });
  const cartItem = page.locator('#sc-active-cart .sc-list-item').first();
  await expect(cartItem).toBeVisible({ timeout: 30000 });
  await cartItem.locator('input[data-action="delete-active"]').click({ force: true });
  await page.reload({ waitUntil: 'networkidle' });
  await page.waitForLoadState('networkidle');
  await expect(page.locator('#sc-active-cart .sc-list-item')).toHaveCount(0, { timeout: 30000 });

  await page.getByRole('searchbox', { name: 'Search Amazon.in' }).fill('Samsung S25 phone');
  await page.getByRole('button', { name: 'Go', exact: true }).click({ timeout: 30000 });
  const phoneLink = page.locator('[data-component-type="s-search-result"] a[href*="/dp/"]').first();
  await expect(phoneLink).toBeVisible({ timeout: 30000 });
  const phoneHref = await phoneLink.getAttribute('href');
  expect(phoneHref).toBeTruthy();
  await page.goto(new URL(phoneHref as string, 'https://www.amazon.in').toString(), {
    waitUntil: 'networkidle',
  });
  await page.waitForLoadState('networkidle');
  await expect(page.locator('#productTitle:visible')).toBeVisible({ timeout: 30000 });
  await page.locator('#buybox #add-to-cart-button').last().click({ timeout: 30000 });

  const cartLink = page.getByRole('link', { name: /item in cart|cart/i }).first();
  await expect(cartLink).toContainText(/1|2/, { timeout: 30000 });
  await cartLink.click({ timeout: 30000 });
  await page.getByRole('button', { name: /Proceed to Buy/i }).click({ timeout: 30000 });
  await expect(page).toHaveURL(/(signin|buy|checkout)/i);
});
