/**
 * @description     This class shows the solution for downloading a file.
 *                  The class contains examples of Playwright commands and domain-specific language (custom methods).
 *                  As you can see in the Playwright example/s, we use both domain-specific language methods and Playwright functions. The example related to this class is shown in Playwright functions, and the other part of the code is shown (most probably) in domain-specific language methods.
 */

//01. Import libraries and classes.
// Import Playwright test library.
import { test, Page } from "@playwright/test";
// Import the domain-specific language class.
import DomainSpecificLanguage from "../../custom-methods/domain-specific-language/dsl";

//02. Create the "describe" block.
test.describe("This block contains examples for downloading a file.", async () => {
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
    await dsl.navigateTo("https://demoqa.com/upload-download/");
  });

  //05. Create the "test" block/s.
  test("Playwright Example 1", async () => {
    // Call this method, to verify that the element is present and it is ready for usage.
    await dsl.element("#downloadButton");
    // Initialize the downloading process.
    let [download] = await Promise.all([
      // Start waiting for the download process.
      page.waitForEvent("download"),
      // Perform the action that initiates the download.
      page.locator("#downloadButton").click(),
    ]);
    // Save downloaded file in specific path direcotry.
    await download.saveAs("download/file.jpg");
  });

  test("Playwright Example 2", async () => {
    // Call this method, to verify that the element is present and it is ready for usage.
    await dsl.element("#downloadButton");
    // Initialize the downloading process.
    let [download] = await Promise.all([
      // Start waiting for the download process.
      page.waitForEvent("download"),
      // Perform the action that initiates the download.
      page.locator("#downloadButton").click(),
    ]);
    // Print the downloaded path into the console log.
    console.log(`The file was downloaded in: ${await download.path()}`);
    // Save downloaded file in specific path direcotry.
    await download.path();
  });

  test("Domain-Specific Language Example 1", async () => {
    // Provide the locator of a button that triggers the downloading process and the destination folder path where the automation will download the file. Alert, ensure that you add the file name and extension to the destination folder path.
    await dsl.downloadFile("#downloadButton", "download/file.jpg");
  });

  test("Domain-Specific Language Example 2", async () => {
    // Provide the locator of a button that triggers the downloading process without the destination folder path where the automation will download the file.  We can use this approach only to verify that the download process is working as expected and the file is downloaded. The file will be deleted when the test is ready.
    await dsl.downloadFile("#downloadButton");
  });
});
