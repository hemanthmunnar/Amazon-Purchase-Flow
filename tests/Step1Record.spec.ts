import { test, expect } from '@playwright/test';

test('Amazon shopping flow', async ({ page }) => {
  await page.goto('https://www.amazon.in/');
  await page.getByRole('button', { name: 'Open All Categories Menu' }).click();
  await page.getByRole('button', { name: 'Mobiles, Computers' }).click();
  await page.getByRole('link', { name: 'Laptops' }).click();
  await page.getByRole('link', { name: 'HP HP' }).click();
  await page.getByRole('link', { name: 'Apply the filter Dell to' }).click();
  await page.getByRole('slider', { name: 'Minimum price' }).fill('28');
  await page.goto('https://www.amazon.in/s?i=computers&rh=n%3A1375424031%2Cp_123%3A241862%257C308445&dc=&qid=1787847538&rnid=7252027031&ref=sr_nr_p_36_0_0&low-price=56100&high-price=');
  await page.getByRole('slider', { name: 'Minimum price' }).fill('0');
  await page.getByRole('slider', { name: 'Maximum price' }).fill('141');
  await page.goto('https://www.amazon.in/s?i=computers&rh=n%3A1375424031%2Cp_123%3A241862%257C308445&dc=&qid=1787847538&rnid=7252027031&ref=sr_nr_p_36_0_0&low-price=&high-price=201600');
  const page1Promise = page.waitForEvent('popup');
  await page.getByRole('link', { name: 'Sponsored Ad - HP OmniBook 5' }).click();
  const page1 = await page1Promise;
  await page1.goto('https://www.amazon.in/HP-Previously-Snapdragon-Processor-Light-Weight/dp/B0F8P4Y7VF/ref=sr_1_2_sspa?dib=eyJ2IjoiMSJ9.bBIdcNRn75o58bHtmX_4H7B3oHukhcxPQPlvePgS5VjyEzn4IzcCpuMoosWMqQlUZrLofl6M3ELgF9mui2s1Wlk-p95WHcAunpoV3hzMdxF3jcae57dLAaeuev6fXEMBV5HRnqiAsMeGBM8eO_IsU4fC3VK7ubJFm_Ot6CyeLwcQHXwhxi02sfRcYr3sAVHnopvSSx2-nol1fS1qASMgKeA_VncmzKtJkPg2l8LKn9na5U-wNlvlpLxk4msX7_capQBK1_cbMPHQnbvbbW4cfSFYOLGz_dIC5DPEKHJNeZc.s7Hn8NL7tJS_UgwtJyDKGlUYPZ47ebezYHTLzNF_Qi8&dib_tag=se&qid=1787847582&refinements=p_36%3A-20160000%2Cp_123%3A241862%7C308445&rnid=7252027031&s=computers&sr=1-2-spons&aref=XCvFJyYctD&sp_csd=d2lkZ2V0TmFtZT1zcF9hdGZfYnJvd3Nl&th=1');
  await page1.getByRole('button', { name: 'Add to cart' }).click();
  await page1.locator('#sw-gtc').getByRole('link', { name: 'Go to Cart' }).click();
  await page1.getByRole('group', { name: 'Quantity is' }).getByLabel('Delete HP OmniBook 5 OLED (').click();
  await page1.getByRole('searchbox', { name: 'Search Amazon.in' }).click();
  await page1.getByRole('searchbox', { name: 'Search Amazon.in' }).fill('samsung s25');
  await page1.getByRole('searchbox', { name: 'Search Amazon.in' }).press('Enter');
  await page1.getByText('Samsung', { exact: true }).nth(1).click();
  await page1.getByText('Samsung', { exact: true }).nth(1).click();
  const page2Promise = page1.waitForEvent('popup');
  await page1.getByRole('link', { name: 'Galaxy S25 5G (Navy, 12GB RAM' }).click();
  const page2 = await page2Promise;
  await page2.goto('https://www.amazon.in/Samsung-Snapdragon-Processor-6-2-inch-Smartphone/dp/B0H3FLD9NM/ref=sr_1_1?crid=2YPH6E9R67Y0M&dib=eyJ2IjoiMSJ9.iARejB5XmkeCiOSO1XQiR1lq481jbI6JZD9XyDZEQjL-7Gv3INkm7rxgP2T1BHa12kGQr61HGUnDZvEpvbhAnJRzd0BDY8ebM37dvjGDa8DWUT8ZD7N2YCzDWuc6A7sesjQ6e2pBj5L7FI5HoFHzieSkel0cAOyrH4Xa3uCzOjWnOwW1PCRkV9SHrKOyT3tYIxWMrR08EUmQKQEb86QaoWyL5dnZYLiFkhhMqJmTZ7I.EyvaqC_sDu45QgVIzzZ9URYKAAp11GeCCFvRIuXexKU&dib_tag=se&keywords=samsung%2Bs25&qid=1787847709&sprefix=samsung%2Bs25%2Caps%2C1413&sr=8-1&th=1');
  await page2.getByRole('button', { name: 'Add to cart' }).click();
  await page2.getByRole('link', { name: 'item in cart' }).click();
  await page2.getByRole('button', { name: 'Proceed to Buy Buy Amazon' }).click();
  
});