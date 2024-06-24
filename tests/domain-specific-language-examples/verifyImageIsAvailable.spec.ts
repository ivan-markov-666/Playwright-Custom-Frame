/**
 * @description     This class shows the solution for verifining that the image is available.
 *                  The class contains examples of Playwright commands and domain-specific language (custom methods).
 *                  As you can see in the Playwright example/s, we use both domain-specific language methods and Playwright functions. The example related to this class is shown in Playwright functions, and the other part of the code is shown (most probably) in domain-specific language methods.
 */

//01. Import libraries and classes.
// Import Playwright test library.
import { test, expect, Page } from "@playwright/test";
// Import the domain-specific language class.
import DomainSpecificLanguage from "../../custom-methods/domain-specific-language/dsl";

//02. Create the "describe" block.
test.describe("This block contains examples for verifying that the image is available.", async () => {
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
    await dsl.navigateTo("https://demoqa.com/broken/");
  });

  //05. Create the "test" block/s.
  test("Playwright Example", async () => {
    // Declare an element.
    let pictureElement = page.locator(
      "//*[contains(text(),'Valid image')]/following-sibling::*[@*='/images/Toolsqa.jpg']"
    );
    // Wait for the element to be visible.
    await pictureElement.waitFor({
      state: "visible",
      timeout: 35000,
    });
    // Focus on the element.
    await pictureElement.focus();
    // Verify that the element is visible.
    await expect(pictureElement).toBeVisible({ timeout: 10000 });
    // Verify that the element is not hidden.
    await expect(pictureElement).not.toBeHidden({ timeout: 10000 });
    // Verify that the element is enabled.
    await expect(pictureElement).toBeEnabled({ timeout: 10000 });
    // Verify that the element is not disabled.
    await expect(pictureElement).not.toBeDisabled({
      timeout: 10000,
    });
    // Verify that the element is the only one in the DOM tree.
    await expect(pictureElement).toHaveCount(1, { timeout: 10000 });
  });

  test("Domain-Specific Language Example", async () => {
    // Use the "element()" function. For more details, review the examples for this function.
    await dsl.element(
      "//*[contains(text(),'Valid image')]/following-sibling::*[@*='/images/Toolsqa.jpg']",
      10000
    );
  });
});
