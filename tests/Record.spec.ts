import { test, expect } from '@playwright/test';

test('Amazon shopping flow', async ({ page }) => {
  test.setTimeout(180000);
  page.setDefaultNavigationTimeout(90000);

  await page.goto('https://www.amazon.in/', { waitUntil: 'networkidle' });
  await page.waitForLoadState('networkidle');

  await page.getByRole('button', { name: 'Open All Categories Menu' }).click({ timeout: 30000 });
  await page.getByRole('button', { name: 'Mobiles, Computers' }).click({ timeout: 30000 });
  await page.getByRole('link', { name: 'Laptops' }).click({ timeout: 30000 });
  await page.getByRole('link', { name: 'HP HP' }).click({ timeout: 30000 });
  await page.getByRole('link', { name: 'Apply the filter Dell to' }).click({ timeout: 30000 });
  await page.getByRole('slider', { name: 'Minimum price' }).fill('28');
  
  await page.goto('https://www.amazon.in/s?i=computers&rh=n%3A1375424031%2Cp_123%3A241862%257C308445&dc=&qid=1787847538&rnid=7252027031&ref=sr_nr_p_36_0_0&low-price=56100&high-price=', { waitUntil: 'networkidle' });
  await page.waitForLoadState('networkidle');

  await page.getByRole('slider', { name: 'Minimum price' }).fill('0');
  await page.getByRole('slider', { name: 'Maximum price' }).fill('141');
  
  await page.goto('https://www.amazon.in/s?i=computers&rh=n%3A1375424031%2Cp_123%3A241862%257C308445&dc=&qid=1787847538&rnid=7252027031&ref=sr_nr_p_36_0_0&low-price=&high-price=201600', { waitUntil: 'networkidle' });
  await page.waitForLoadState('networkidle');

  const page1Promise = page.waitForEvent('popup');
  await page.getByRole('link', { name: 'Sponsored Ad - HP OmniBook 5' }).click({ timeout: 30000 });
  const page1 = await page1Promise;
  await page1.goto('https://www.amazon.in/HP-Previously-Snapdragon-Processor-Light-Weight/dp/B0F8P4Y7VF/ref=sr_1_2_sspa?dib=eyJ2IjoiMSJ9.bBIdcNRn75o58bHtmX_4H7B3oHukhcxPQPlvePgS5VjyEzn4IzcCpuMoosW[...]', { waitUntil: 'networkidle' });
  await page1.waitForLoadState('networkidle');
  
  await page1.getByRole('button', { name: 'Add to cart' }).click({ timeout: 30000 });
  await page1.locator('#sw-gtc').getByRole('link', { name: 'Go to Cart' }).click({ timeout: 30000 });
  await page1.getByRole('group', { name: 'Quantity is' }).getByLabel('Delete HP OmniBook 5 OLED (').click({ timeout: 30000 });
  await page1.getByRole('searchbox', { name: 'Search Amazon.in' }).click({ timeout: 30000 });
  await page1.getByRole('searchbox', { name: 'Search Amazon.in' }).fill('samsung s25');
  await page1.getByRole('searchbox', { name: 'Search Amazon.in' }).press('Enter');
  
  await page1.getByText('Samsung', { exact: true }).nth(1).click({ timeout: 30000 });
  await page1.getByText('Samsung', { exact: true }).nth(1).click({ timeout: 30000 });
  
  const page2Promise = page1.waitForEvent('popup');
  await page1.getByRole('link', { name: 'Galaxy S25 5G (Navy, 12GB RAM' }).click({ timeout: 30000 });
  const page2 = await page2Promise;
  await page2.goto('https://www.amazon.in/Samsung-Snapdragon-Processor-6-2-inch-Smartphone/dp/B0H3FLD9NM/ref=sr_1_1?crid=2YPH6E9R67Y0M&dib=eyJ2IjoiMSJ9.iARejB5XmkeCiOSO1XQiR1lq481jbI6JZD9XyDZEQjL-[...]', { waitUntil: 'networkidle' });
  await page2.waitForLoadState('networkidle');

  await page2.getByRole('button', { name: 'Add to cart' }).click({ timeout: 30000 });
  await page2.getByRole('link', { name: 'item in cart' }).click({ timeout: 30000 });
  await page2.getByRole('button', { name: 'Proceed to Buy Buy Amazon' }).click({ timeout: 30000 });
});
