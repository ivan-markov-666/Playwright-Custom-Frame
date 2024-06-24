/**
 * @description     This class shows the solution for clicking over an element that forces are opening a new browser window. We handle the newly opened browser window and assign it to an object.
 *                  The class contains examples of Playwright commands and domain-specific language (custom methods).
 *                  As you can see in the Playwright example/s, we use both domain-specific language methods and Playwright functions. The example related to this class is shown in Playwright functions, and the other part of the code is shown (most probably) in domain-specific language methods.
 */

//01. Import libraries and classes.
// Import Playwright test library.
import { test, Page } from "@playwright/test";
// Import the domain-specific language class.
import domainSpecificLanguage from "../../custom-methods/domain-specific-language/dsl";

//02. Create the "describe" block.
test.describe("This block contains examples for clicking over an element that forces are opening a new browser window. We handle the newly opened browser window and assign it to an object.", async () => {
  let page: Page; // Create a new variable for Page. Add a specific type (of the Page class) to enable the suggestions.
  let dsl: domainSpecificLanguage; // Create a new variable for a domain-specific language. Add a specific type (of the domainSpecificLanguage class) to enable the suggestions.

  //03. Create the "beforeEach" block.
  test.beforeEach(async ({ context }) => {
    page = await context.newPage(); // Create a new 'page' and include 'page' inside.
    dsl = new domainSpecificLanguage(page, context); // Create a new 'dsl' and include 'page' and 'context' inside.
    // Navigate to the URL address.
    await dsl.navigateTo("https://demoqa.com/browser-windows");
  });

  //05. Create the "test" block/s.
  test("Playwright Example", async ({ context }) => {
    // Get a page after a specific action (e.g. clicking a link).
    let [newPage] = await Promise.all([
      // Wait for a specific event to happen. In this case, we are waiting for the browser to open a new window.
      context.waitForEvent("page"),
      // Click over an element to force open the new browser window.
      dsl.click("#tabButton"),
    ]);
    // Wait until the opening of the new browser window happens.
    await newPage.waitForLoadState();
    // Assert that the operation was compleated correctly by locating an element.
    await dsl.element(newPage.locator("#sampleHeading"));
  });

  test("Domain-Specific Language Example 1", async () => {
    // Use the method by providing a verification locator parameter.
    await dsl.browserWindowAfterClick("#tabButton", "#sampleHeading");
  });

  test("Domain-Specific Language Example 2", async () => {
    // Use the method without providing a verification locator parameter.
    let newPage = await dsl.browserWindowAfterClick("#tabButton");
    // Assert that the operation was compleated correctly by locating an element.
    await dsl.element(newPage.locator("#sampleHeading"));
  });
});
