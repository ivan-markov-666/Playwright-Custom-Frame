/**
 * @description     This class shows the solution for giving a focus to the Neasted iFrame.
 *                  The class contains examples of Playwright commands and domain-specific language (custom methods).
 *                  As you can see in the Playwright example/s, we use both domain-specific language methods and Playwright functions. The example related to this class is shown in Playwright functions, and the other part of the code is shown (most probably) in domain-specific language methods.
 */

//01. Import libraries and classes.
// Import Playwright test library.
import { test, Page } from "@playwright/test";
// Import the domain-specific language class.
import DomainSpecificLanguage from "../../custom-methods/domain-specific-language/dsl";

//02. Create the "describe" block.
test.describe("This block contains examples for giving a focus to the Neasted iFrame.", async () => {
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
    await dsl.navigateTo("https://demoqa.com/nestedframes/");
  });

  //05. Create the "test" block/s.
  test("Playwright Example", async () => {
    // Declare a parent iFrame element. Provide the locator of the iFrame element.
    let iFrameParent = await dsl.iFrame("#frame1");
    // Declare a child iFrame element. Provide the locator of the iFrame element.
    let iFrameChild = iFrameParent.frameLocator("//iframe[@srcdoc]");
    // Declare an element. This element is positioned inside the child iFrame.
    let iFrameChildElement = dsl.element(
      iFrameChild.locator('//*[contains(text(),"Child Iframe")]')
    );
    // Assert that the operation was compleated correctly.
    await dsl.getText(await iFrameChildElement, "Child Iframe");
  });

  test("Domain-Specific Language Example", async () => {
    // Provide the locators for parent and child iFrame elements.
    let iFrameChild = await dsl.iFrameNested("#frame1", "//iframe[@srcdoc]", '//body/p');
    // Declare an element. This element is positioned inside the child iFrame.
    let iFrameChildElement = dsl.element(
      iFrameChild.locator('//*[contains(text(),"Child Iframe")]')
    );
    // Assert that the operation was compleated correctly.
    await dsl.getText(await iFrameChildElement, "Child Iframe");
  });
});
