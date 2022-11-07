/**
 * @description     This class shows a simple example of the usage of testing suites.
 *                  This is example for class 1.
 */

//01. Import libraries and classes.
// Import Playwright test library.
import { test, Page } from "@playwright/test";

//02. Create the "describe" block.
test.describe("Class 1", async () => {
  let page: Page;
  test.beforeAll(async ({ browser }) => {
    page = await browser.newPage();
  });

  //03. Create the "test" block/s.
  test("Name of test 1. This test is included in the following suite/s: @smoke", async () => {
    // As you can see, add "@smoke" to your test name. Every annotation will be acceptable. To start your test suite, just hit the following command "npx playwright test --grep smoke".
    await page.goto("https://google.com/");
  });

  test("Name of test 2. This test is included in the following suite/s: @smoke @regression", async () => {
    // As you can see, add "@smoke" to your test name. Every annotation will be acceptable. To start your test suite, just hit the following command "npx playwright test --grep smoke".
    await page.goto("https://abv.bg");
  });
});
