const { chromium } = require('playwright');
(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({ viewport: { width: 1400, height: 2000 } });
  await page.goto('https://www.amazon.in/s?k=HP+laptop', { waitUntil: 'domcontentloaded' });
  await page.waitForTimeout(5000);
  const url = page.url();
  console.log('URL', url);
  const tags = await page.locator('a[href*="/dp/"]').evaluateAll(els => els.slice(0,10).map(el => el.href));
  console.log('DP_LINKS', JSON.stringify(tags, null, 2));
  const allA = await page.locator('a').evaluateAll(els => els.slice(0,20).map(el => ({href: el.href, text: (el.textContent||'').trim().slice(0,80)})));
  console.log('FIRST_LINKS', JSON.stringify(allA, null, 2));
  await browser.close();
})();
