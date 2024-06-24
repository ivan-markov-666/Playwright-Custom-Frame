/**
 * @description     This class shows the solution for using of wait assertion.
 *                  The class contains examples of Playwright commands.
 */

//01. Import libraries and classes.
// Import Playwright test library.
import { test, expect, Page } from "@playwright/test";
// Import the domain-specific language class.
import DomainSpecificLanguage from "../../custom-methods/domain-specific-language/dsl";

//02. Create the "describe" block.
test.describe("This block contains examples for using wait assertion.", async () => {
  let page: Page; // Create a new variable for Page. Add a specific type (of the Page class) to enable the suggestions.
  let dsl: DomainSpecificLanguage; // Create a new variable for a domain-specific language. Add a specific type (of the domainSpecificLanguage class) to enable the suggestions.

  //03. Create the "beforeAll" block.
  test.beforeAll(async ({ browser }) => {
    page = await browser.newPage(); // Add value to 'page'.
    dsl = new DomainSpecificLanguage(page); // Create a new 'dsl' and include 'page' inside.
  });

  //04. Create the "beforeEach" block.
  test.beforeEach(async () => {
    // Navigate to the URL address.
    await dsl.navigateTo("https://demoqa.com/text-box/");
  });

  //05. Create the "test" block/s.
  test("Playwright Example", async () => {
    // Declare an element.
    let fullName_InputTextElement = page.locator("//input[@id='userName']");
    // Assertions.
    // Verify that the element is visible and set timeout. That is the assertion, wait.
    await expect(fullName_InputTextElement).toBeVisible({ timeout: 10000 });
  });
});
