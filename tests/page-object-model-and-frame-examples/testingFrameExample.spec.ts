/**
 * @description     This class shows a simple example of a Playwright testing framework. Please review the "Playwright Test" form official Playwright documentation for more details.
 */

//01. Import libraries and classes.
// Import Playwright test library.
import { test, Page } from "@playwright/test";

//02. Create the "describe" block.
test.describe("test", async () => {
  let page: Page;
  //03. Create the "beforeAll" block.
  test.beforeAll(async ({ browser }) => {
    page = await browser.newPage();
  });

  //04. Create the "beforeRach" block.
  test.beforeEach(async () => {});

  //05. Create the "afterAll" block.
  test.afterAll(async () => {});

  //06. Create the "afterEach" block.
  test.afterEach(async () => {});

  //07. Add more hooks if it is needed...

  //08. Create the "test" block/s.
  test("test1", async () => {
    await page.goto("https://google.com/");
  });

  test("test2", async () => {
    await page.goto("https://abv.bg");
  });
});
