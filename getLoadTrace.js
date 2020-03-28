const puppeteer = require('puppeteer');

(async () => {
  // launch puppeteer browser in headful mode
  browser = await puppeteer.launch({
    headless: false,
    devtools: true
  });

  // start a page instance in the browser
  page = await browser.newPage();

  // start the profiling, with a path to the out file and screenshots collected
  await page.tracing.start({
    path: `tests/logs/loadScript-trace-${new Date().getTime()}.json`,
    screenshots: true
  });
  
  // go to the page
  await page.goto('http://localhost:8080');

  // wait for as long as you want
  await page.waitFor(4000);

  // or you can for an element to appear with:
  // await page.waitForSelector('some-css-selector');

  // stop the tracing
  await page.tracing.stop();

  // close the browser
  await browser.close();
})();