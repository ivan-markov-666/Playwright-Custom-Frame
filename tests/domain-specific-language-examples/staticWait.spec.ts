/**
 * @description     This class shows the solution for static wait (pause execution of the code).
 *                  The class contains examples of Playwright commands and domain-specific language (custom methods).
 *                  As you can see in the Playwright example/s, we use both domain-specific language methods and Playwright functions. The example related to this class is shown in Playwright functions, and the other part of the code is shown (most probably) in domain-specific language methods.
 */

//01. Import libraries and classes.
// Import Playwright test library.
import { test, expect, Page } from "@playwright/test";
// Import the domain-specific language class.
import DomainSpecificLanguage from "../../custom-methods/domain-specific-language/dsl";
// Import the class containing custom type script methods.
import tsMethods from "../../custom-methods/other-methods/tsMethods";

//02. Create the "describe" block.
test.describe("This block contains examples for static wait (pause execution of the code).", async () => {
  let page: Page; // Create a new variable for Page. Add a specific type (of the Page class) to enable the suggestions.
  let dsl: DomainSpecificLanguage; // Create a new variable for a domain-specific language. Add a specific type (of the domainSpecificLanguage class) to enable the suggestions.
  let ts: tsMethods; // Create a new variable for a domain-specific language. Add a specific type (of the tsMethods class) to enable the suggestions.

  //03. Create the "beforeAll" block.
  test.beforeAll(async ({ browser }) => {
    page = await browser.newPage(); // Add value to 'page'.
    dsl = new DomainSpecificLanguage(page); // Create a new 'dsl' and include 'page' inside.
    ts = new tsMethods(page); // Create a new 'ts' and include 'page' inside.
  });

  //04. Create the "beforeEach" block.
  test.beforeEach(async () => {
    // Navigate to the URL address.
    await dsl.navigateTo("https://demoqa.com/text-box/");
  });

  //05. Create "afterEach" block.
  test.afterEach(async () => {
    // Verify that the browser loads the correct URL address.
    await expect(page).toHaveURL("https://demoqa.com/text-box/");
  });

  //06. Create the "test" block/s.
  test("Playwright Example", async () => {
    // Playwright Static wait.
    await page.waitForTimeout(5000);
  });

  test("Domain-Specific Language Example", async () => {
    // Provide a number.
    await ts.staticWait(10000);
  });
});
