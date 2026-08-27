const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 2200 } });

  await page.goto('https://www.amazon.in/', { waitUntil: 'domcontentloaded' });
  await page.getByRole('combobox', { name: 'Select the department you want to search in' }).selectOption({ label: 'Computers & Accessories' });
  await page.getByRole('searchbox', { name: 'Search Amazon.in' }).fill('HP Dell laptops');
  await page.locator('#nav-search-submit-button').click();
  await page.waitForSelector('div[data-component-type="s-search-result"]', { timeout: 20000 });

  const resultCount = await page.locator('div[data-component-type="s-search-result"]').count();
  console.log('RESULT_COUNT', resultCount);
  for (let i = 0; i < Math.min(resultCount, 3); i++) {
    const text = await page.locator('div[data-component-type="s-search-result"]').nth(i).innerText();
    console.log('RESULT_' + i + ': ' + text.slice(0, 500).replace(/\n/g, ' '));
  }

  const hrefs = await page.locator('div[data-component-type="s-search-result"] a[href*="/dp/"]').evaluateAll(els => els.slice(0,5).map(el => el.href));
  console.log('HREFS', hrefs);

  const firstLink = page.locator('div[data-component-type="s-search-result"] a[href*="/dp/"]').first();
  console.log('FIRST_LINK_COUNT', await firstLink.count());
  if ((await firstLink.count()) > 0) {
    console.log('FIRST_LINK_HREF', await firstLink.getAttribute('href'));
    await firstLink.click();
    await page.waitForLoadState('domcontentloaded');
    console.log('AFTER_CLICK_URL', page.url());
    const pageText = (await page.locator('body').innerText()).slice(0, 3000);
    console.log('PAGE_BODY_TEXT', pageText.replace(/\s+/g, ' '));
    const addCandidate = page.locator('button:has-text("Add to Cart"), input:has-text("Add to Cart"), #add-to-cart-button, input[name="submit.add-to-cart"], input[name="addToCart"], button[name="submit.add-to-cart"]');
    console.log('ADD_CANDIDATE_COUNT', await addCandidate.count());
    for (let i = 0; i < Math.min(await addCandidate.count(), 10); i++) {
      const text = await addCandidate.nth(i).innerText();
      console.log('ADD_CANDIDATE_' + i + ':', text.trim());
    }
  }

  await browser.close();
})();
