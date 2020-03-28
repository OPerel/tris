const puppeteer = require('puppeteer');

let browser, page;

const scrollTo = async (linkId) => {
  await page.click(linkId);
  await page.waitFor(1300);
}

const isVisible = async (sectionId, bool) => {
  const section = await page.$(sectionId);
  const visible = await section.isIntersectingViewport();
  expect(visible).toBe(bool);
}

describe('test', () => {

  beforeAll(async () => {
    browser = await puppeteer.launch({ headless: false });
    page = await browser.newPage();
    await page.goto('http://localhost:8080');
  });

  afterAll(async () => {
    try { 
      await browser.close();
      console.log('testing session terminated!');
    } catch (err) {
      console.log('failed closing testing session: ', err);
    }
  });

  test('should see Hero section', async () => {
    await scrollTo('#h');
    await isVisible('#Hero', true);
  });

  test('should not see any other section', async () => {
    await isVisible('#About', false);
    await isVisible('#Projects', false);
    await isVisible('#Skills', false);
    // await isVisible('#Contact', false);
  })

  test('should see welcome message in header', async () => {
    await page.waitForSelector('h1');
    const h = await page.$('h1');
    const text = await page.evaluate(h => h.textContent, h);
    expect(text).toEqual('Welcome!');
  });

  test('should not see About', async () => {
    await isVisible('#About', false);
  });

  test('should scroll to About section', async () => {
    await scrollTo('#a');
    await isVisible('#About', true);
  });

  test('should not see Home after scrolling', async () => {
    await isVisible('#Hero', false);
  });

  test('should scroll to Portfolio section', async () => {
    await scrollTo('#p');
    await isVisible('#Projects', true);
  });

  test('should scroll to Skills section', async () => {
    await scrollTo('#s');
    await isVisible('#Skills', true);
  });

  test('should not see portfolio section', async () => {
    await isVisible('#Projects', false);
  });

  test('should scroll back home', async () => {
    await scrollTo('#h');
    await isVisible('#Hero', true);
  });

  test('should not see any other section', async () => {
    await isVisible('#About', false);
    await isVisible('#Projects', false);
    await isVisible('#Skills', false);
    // await isVisible('#Contact', false);
  })

  // TODO
  // test('should scroll to Contact footer', async () => {})
});