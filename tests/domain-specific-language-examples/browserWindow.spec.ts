/**
 * @description     This class shows the solution for clicking over an element that forces are opening a new browser window. We handle the newly opened browser window and assign it to an object.
 *                  The class contains examples of Playwright commands and domain-specific language (custom methods).
 *                  As you can see in the Playwright example/s, we use both domain-specific language methods and Playwright functions. The example related to this class is shown in Playwright functions, and the other part of the code is shown (most probably) in domain-specific language methods.
 */

//01. Import libraries and classes.
// Import Playwright test library.
import { test, Page, BrowserContext, expect } from "@playwright/test";
// Import the domain-specific language class.
import DomainSpecificLanguage from "../../custom-methods/domain-specific-language/dsl";

//02. Create the "describe" block.
test.describe("This block contains examples for clicking over an element that forces are opening a new browser window. We handle the newly opened browser window and assign it to an object.", async () => {
  let page: Page; // Create a new variable for Page. Add a specific type (of the Page class) to enable the suggestions.
  let context: BrowserContext;
  let dsl: DomainSpecificLanguage; // Create a new variable for a domain-specific language. Add a specific type (of the domainSpecificLanguage class) to enable the suggestions.

  //03. Create the "beforeEach" block.
  test.beforeEach(async ({ context: testContext }) => {
    context = testContext;
    page = await context.newPage(); // Create a new 'page' and include 'page' inside.
    dsl = new DomainSpecificLanguage(page, context); // Create a new 'dsl' and include 'page' and 'context' inside.
    // Navigate to the URL address.
    await dsl.navigateTo("https://demoqa.com/browser-windows");
  });

  test('Playwright Example. Interact with a new tab and check elements', async () => {
    // Click over an element that forces opening a new browser window.
    await dsl.click('#tabButton');

    // Wait for the new tab to open and bring it to the front of the browser window.
    const [newTab] = await Promise.all([
      await context.waitForEvent('page'),
    ]);

    // Verify that the new tab is in front and use newTab for the next steps.
    await newTab.bringToFront();

    // Verify that the element is present and visible
    const text = await newTab.textContent('#sampleHeading', { timeout: 10000 });
    // Check if the text located in the new tab is the expected one.
    expect(text).toBe('This is a sample page');

    // Cloase the new tab.
    await newTab.close();

    // Get the original tab back to the front.
    await page.bringToFront();

  });

  test('Domain-Specific Language Example 1. Interact with a new tab and navigate to new URL.', async () => {
    // Click over an element that forces opening a new browser window.
    await dsl.click('#tabButton');

    // Wait for the new tab to open and bring it to the front of the browser window.
    const [newTab] = await Promise.all([
      // Wait for a specific event to happen. In this case, we are waiting for the browser to open a new window.
      await context.waitForEvent('page'),
    ]);

    // Bring the new tab to the front and focus on it.
    await newTab.bringToFront();

    // Navigate to a new URL in the new .
    await dsl.navigateTo("https://example.com/different-page", newTab);

    // Close the new tab.
    await newTab.close();

    // Bring the original tab to the front.
    await page.bringToFront();
  });

  test('Domain-Specific Language Example 2. Interact with a new tab and validate text inside.', async () => {
    // Click over an element that forces opening a new browser window.
    await dsl.click('#tabButton');

    // Wait for the new tab to open and bring it to the front of the browser window.
    const [newTab] = await Promise.all([
      // Wait for a specific event to happen. In this case, we are waiting for the browser to open a new window.
      await context.waitForEvent('page'),
    ]);

    // Bring the new tab to the front and focus on it.
    await newTab.bringToFront();

    // Navigate to a new URL in the new .
    await dsl.getText('#sampleHeading', 'This is a sample page', newTab);

    // Close the new tab.
    await newTab.close();

    // Bring the original tab to the front.
    await page.bringToFront();
  });
});