/**
 * @description     This class shows the solution for selecting an element and verifying that the element is ready to be used.
 *                  The class contains examples of Playwright commands and domain-specific language (custom methods).
 *                  As you can see in the Playwright example/s, we use both domain-specific language methods and Playwright functions. The example related to this class is shown in Playwright functions, and the other part of the code is shown (most probably) in domain-specific language methods.
 */

//01. Import libraries and classes.
// Import Playwright test library.
import { test, expect, Page } from "@playwright/test";
// Import the domain-specific language class.
import DomainSpecificLanguage from "../../custom-methods/domain-specific-language/dsl";

import { Element } from "../../custom-methods/domain-specific-language/dsl.d";

//02. Create the "describe" block.
test.describe("This block contains examples for selecting an element and verifying that the element is ready to be used.", async () => {
  let page: Page; // Create a new variable for Page. Add a specific type (of the Page class) to enable the suggestions.
  let dsl: DomainSpecificLanguage; // Create a new variable for a domain-specific language. Add a specific type (of the domainSpecificLanguage class) to enable the suggestions.

  //03. Create the "beforeAll" block.
  test.beforeAll(async ({ browser }) => {
    page = await browser.newPage(); // Add value to 'page'.
    dsl = new DomainSpecificLanguage(page); // Create a new 'dsl' and include 'page' inside.
  });

  //04. Create the "beforeEach" block.
  test.beforeEach(async () => {
    await dsl.navigateTo("https://demoqa.com/text-box/");
  });

  //05. Create the "test" block/s.
  test("Playwright Example", async () => {
    // Declare an element.
    let fullName_InputTextElement = page.locator("//input[@id='userName']");
    // Focus on the element.
    await fullName_InputTextElement.focus();
    // Wait for the element to be visible.
    await fullName_InputTextElement.waitFor({
      state: "visible",
      timeout: 35000,
    });
    // Verify that the element is visible.
    await expect(fullName_InputTextElement).toBeVisible({ timeout: 10000 });
    // Verify that the element is not hidden
    await expect(fullName_InputTextElement).not.toBeHidden({ timeout: 10000 });
    // Verify that the element is enabled.
    await expect(fullName_InputTextElement).toBeEnabled({ timeout: 10000 });
    // Verify that the element is not disabled.
    await expect(fullName_InputTextElement).not.toBeDisabled({
      timeout: 10000,
    });
    // Verify that the element is the only one in the DOM tree.
    await expect(fullName_InputTextElement).toHaveCount(1, { timeout: 10000 });
  });

  test("Domain-Specific Language Example 1", async () => {
    // Declare an element.
    let fullName_InputTextElement: Element = page.locator(
      "//input[@id='userName']"
    );
    // Provide the element and timeout.
    await dsl.element(fullName_InputTextElement, 10000);
  });

  test("Domain-Specific Language Example 2", async () => {
    // Declare an element.
    let fullName_InputTextElement: Element = page.locator(
      "//input[@id='userName']"
    );
    // Provide the element.
    await dsl.element(fullName_InputTextElement);
  });

  test("Domain-Specific Language Example 3", async () => {
    // Provide the locator and timeout.
    await dsl.element("//input[@id='userName']", 10000);
  });

  test("Domain-Specific Language Example 4", async () => {
    // Provide the locator.
    await dsl.element("//input[@id='userName']");
  });
});
