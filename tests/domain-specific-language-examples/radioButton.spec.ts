/**
 * @description     This class shows the solution for checking radio buttons.
 *                  The class contains examples of Playwright commands and domain-specific language (custom methods).
 *                  As you can see in the Playwright example/s, we use both domain-specific language methods and Playwright functions. The example related to this class is shown in Playwright functions, and the other part of the code is shown (most probably) in domain-specific language methods.
 */

//01. Import libraries and classes.
// Import Playwright test library.
import { test, expect, Page } from "@playwright/test";
// Import the domain-specific language class.
import DomainSpecificLanguage from "../../custom-methods/domain-specific-language/dsl";

//02. Create the "describe" block.
test.describe("This block contains examples for checking radio buttons.", async () => {
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
    await dsl.navigateTo("https://demoqa.com/radio-button/");
  });

  //05. Create the "test" block/s.
  test("Playwright Example 1", async () => {
    // Declare a locator of an element.
    let radioButtonLocator: string = "#yesRadio";
    // Declare an element.
    let radioButtonElement = await dsl.element(radioButtonLocator, 10000);
    // Verify the element is not checked.
    expect(await page.isChecked(radioButtonLocator)).toBeFalsy();
    await expect(radioButtonElement).not.toBeChecked();
    // Check the element using "check" action.
    await page.check(radioButtonLocator, { force: true });
    // Verify the element is checked.
    await expect(radioButtonElement).toBeChecked();
    expect(await page.isChecked(radioButtonLocator)).toBeTruthy();
  });

  test("Playwright Example 2", async () => {
    // Declare a locator of an element.
    let radioButtonLocator: string = "#yesRadio";
    // Declare an element.
    let radioButtonElement = await dsl.element(radioButtonLocator, 10000);
    // Verify the element is not checked.
    expect(await page.isChecked(radioButtonLocator)).toBeFalsy();
    await expect(radioButtonElement).not.toBeChecked();
    // Check the element using "click" action.
    await page.click(radioButtonLocator, { force: true });
    // Verify the element is checked.
    await expect(radioButtonElement).toBeChecked();
    expect(await page.isChecked(radioButtonLocator)).toBeTruthy();
  });

  test("Domain-Specific Language Example 1", async () => {
    // Provide the locator only.
    await dsl.checkRadioButtonCheckBox("#yesRadio");
  });

  test("Domain-Specific Language Example 2", async () => {
    // Provide the locator and "check" action
    await dsl.checkRadioButtonCheckBox("#yesRadio", "check");
  });

  test("Domain-Specific Language Example 3", async () => {
    // Provide the locator and "click" action.
    await dsl.checkRadioButtonCheckBox("#yesRadio", "click");
  });
});
