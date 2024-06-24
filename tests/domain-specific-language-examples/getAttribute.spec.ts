/**
 * @description     This class shows the solution for getting the attribute value of an element.
 *                  The class contains examples of Playwright commands and domain-specific language (custom methods).
 *                  As you can see in the Playwright example/s, we use both domain-specific language methods and Playwright functions. The example related to this class is shown in Playwright functions, and the other part of the code is shown (most probably) in domain-specific language methods.
 */

//01. Import libraries and classes.
// Import Playwright test library.
import { test, expect, Page } from "@playwright/test";
// Import the domain-specific language class.
import DomainSpecificLanguage from "../../custom-methods/domain-specific-language/dsl";

//02. Create the "describe" block.
test.describe("This block contains examples for getting the attribute value of an element.", async () => {
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
    let element = await dsl.element("//input[@id='userName']", 10000);
    // Get the attribute value from the element.
    let attributeValue = await element.getAttribute("placeholder");
    // Assert that the operation was compleated correctly.
    expect(attributeValue).toEqual("Full Name");
  });

  test("Domain-Specific Language Example 1", async () => {
    // Provide the locator, attribute name and expected attribute value.
    await dsl.getAttribute(
      "//input[@id='userName']",
      "placeholder",
      "Full Name"
    );
  });

  test("Domain-Specific Language Example 2", async () => {
    // Provide the locator and attribute name.
    let attribute = await dsl.getAttribute(
      "//input[@id='userName']",
      "placeholder"
    );
    // Assert that the operation was compleated correctly.
    expect(attribute).toEqual("Full Name");
  });

  test("Domain-Specific Language Example 3", async () => {
    // Declare an element.
    let inspectedElement: any = page.locator("//input[@id='userName']");
    // Provide the element, attribute name and expected attribute value.
    await dsl.getAttribute(inspectedElement, "placeholder", "Full Name");
  });

  test("Domain-Specific Language Example 4", async () => {
    // Declare an element.
    let inspectedElement: any = page.locator("//input[@id='userName']");
    // Provide the element and attribute name.
    let attribute = await dsl.getAttribute(inspectedElement, "placeholder");
    // Assert that the operation was compleated correctly.
    expect(attribute).toEqual("Full Name");
  });
});
