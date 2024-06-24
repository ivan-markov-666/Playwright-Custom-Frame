/**
 * @description     This class shows the solution for sending a text to the input text element.
 *                  The class contains examples of Playwright commands and domain-specific language (custom methods).
 *                  As you can see in the Playwright example/s, we use both domain-specific language methods and Playwright functions. The example related to this class is shown in Playwright functions, and the other part of the code is shown (most probably) in domain-specific language methods.
 */

//01. Import libraries and classes.
// Import Playwright test library.
import { test, expect, Page } from "@playwright/test";
// Import the domain-specific language class.
import DomainSpecificLanguage from "../../custom-methods/domain-specific-language/dsl";

//02. Create the "describe" block.
test.describe("This block contains examples for sending a text to the input text element.", async () => {
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
    // Declare an element and call this method, to verify that the element is present and it is ready for usage.
    let fullName_InputTextElement = await dsl.element("#userName", 10000);
    // Send Ctrl+A to the element. This will work for Windows and Linux. We are using this to select all containing text inside inspected input text element.
    await page.keyboard.press("Control+A");
    // Send Meta+A to the element. This will work for macOS. We are using this to select all containing text inside inspected input text element.
    await page.keyboard.press("Meta+A");
    // Fill the element with text.
    await fullName_InputTextElement.fill("test");
    // Verify that the input text element contains the sent text data.
    expect(await fullName_InputTextElement.inputValue()).toEqual("test");
  });

  test("Domain-Specific Language Example 1", async () => {
    // Provide the locator and expected text value.
    await dsl.sendKeys("#userName", "test");
  });

  test("Domain-Specific Language Example 2", async () => {
    // Declare an element.
    let fullName_InputTextElement: any = dsl.element("#userName");
    // Provide the element and the text value.
    await dsl.sendKeys(await fullName_InputTextElement, "test");
  });
});
