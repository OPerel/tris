const puppeteer = require('puppeteer');

describe('test', () => {
  let browser;
  let page;

  beforeAll(async () => {
    browser = await puppeteer.launch({
      headless: false,
      devtools: true
    });

    page = await browser.newPage();
    // await page.goto('http://localhost:8080');
  });

  afterAll(async () => {
    try { 
      await browser.close();
      console.log('testing session terminated!');
    } catch (err) {
      console.log('failed closing testing session: ', err);
    }
  });

  // test('should open the browser in the url and see welcome', async () => {
  //   await page.waitForSelector('h1');
  //   const h = await page.$('h1');
  //   const text = await page.evaluate(h => h.textContent, h);
  //   expect(text).toEqual('Welcome!');
  // });

  test('should get performance profile when loading page', async () => {

    await page.tracing.start({
      path: `tests/logs/load-trace-${new Date().getTime()}.json`,
      screenshots: true
    });
    
    await page.goto('http://localhost:8080');
    await page.waitForSelector('title');

    await page.tracing.stop();
  });

  test('should get performance profile while scrolling', async () => {
    await page.goto('http://localhost:8080');
    await page.waitForSelector('h1');

    await page.tracing.start({
      path: `tests/logs/run-trace-${new Date().getTime()}.json`,
      screenshots: true
    });
    
    await page.click('#a');
    await page.waitFor(1300);
    await page.tracing.stop();
  });

  // test('should open and interact with devtools', async () => {
  //   const wsEndpoint = browser.wsEndpoint();

  //   // the page I want to debug
  //   const myPage = await browser.newPage();
  //   const pageId = myPage.target()._targetId;

  //   // use the host:port that Chromium provided, but replace the browser endpoint with the page to inspect
  //   const pageTargeUrl = `${wsEndpoint.replace('ws://', '').match(/.*(?=\/browser)/)[0]}/page/${pageId}`;
                
  //   // generate the full debugging url for the page I want to inspect
  //   const pageDebuggingUrl = `chrome-devtools://devtools/bundled/devtools_app.html?ws=${pageTargeUrl}`;

  //   // open the debugging UI in a new tab that Puppeteer can interact with
  //   const devtoolsPage = await browser.newPage();
  //   await devtoolsPage.goto(pageDebuggingUrl);

  //   // navigate to the page now so that we start capturing data in the debugger UI
  //   await myPage.goto('http://localhost:8080');
    
  //   // the installed extension may open a new tab so make sure we select the debugger UI tab
  //   await devtoolsPage.bringToFront()

  //   // use Cmd + ] shortut to move across tabs until we're on the the Adblock Plus tab
  //   let perfPanelLabel = null;

  //   while (!perfPanelLabel !== 'Performance panel') {
  //       await devtoolsPage.keyboard.down('ControlRight');
  //       await devtoolsPage.keyboard.press(']');
  //       await devtoolsPage.keyboard.up('ControlRight');

  //       // perfToolbar = await devtoolsPage.$('.timeline-toolbar-container');

  //       perfPanelLabel = await devtoolsPage.evaluate(() => {
  //         return document.querySelector('#-blink-dev-tools > div.widget.vbox.root-view > div > div > div > div').getAttribute('aria-label');// querySelector('div').getAttribute('class'); //.querySelector('.widget .vbox .flex-auto .view-container .overflow-auto') //.getElementsByTagName('div')[1].querySelector('div > div > div'); // ...  div.timeline-main-toolbar')
  //           // .shadowRoot.querySelector('span.largeicon-start-recording');
  //       })
        
  //       // perfToolbar = await devtoolsPage.evaluate(() => {
  //       //   return document.querySelector('#-blink-dev-tools > div.widget.vbox.root-view > div > div > div > div').getAttribute('class'); ///.shadowRoot.querySelector('#tab-chrome-extension\\\:\\\/\\\/cfhdojbkjhnklbpkdaibdccddilifddbAdblockPlus[aria-selected="true"]');
  //       // })
  //   }

  //   // 
  //   console.log('perfPanelLabel: ', perfPanelLabel);
  //   console.log('perfToolbar: ', perfToolbar);
  //   // const mainToolbar = await devtoolsPage.evaluate(() => document.querySelector('div.timeline-main-toolbar'));

  //   // const mainToolbar = await devtoolsPage.$('.timeline-main-toolbar');
  //   // const shadow = await perfMainToolbar.shadowRoot;
  //   // console.log('perfPanelLabel.getAttribute(\'class\'): ', perfPanelLabel.getAttribute('class'));

  //     // .shadowRoot.querySelector('.toolbar-shadow > span.spritesheet-largeicons largeicon-start-recording');
  // });
});