/**
 * @description     This class shows the solution for printing messages inside the terminal.
 *                  The class contains examples of Playwright commands and domain-specific language (custom methods).
 */

//01. Import libraries and classes.
// Import Playwright test library.
import { test, Page } from "@playwright/test";
// Import the domain-specific language class.
import tsMethods from "../../custom-methods/other-methods/tsMethods";

//02. Create the "describe" block.
test.describe("This block contains examples for printing messages inside the terminal.", async () => {
  let page: Page; // Create a new variable for Page. Add a specific type (of the Page class) to enable the suggestions.
  let ts: tsMethods; // Create a new variable for type script methods. Add a specific type (of the tsMethods class) to enable the suggestions.

  //03. Create the "beforeAll" block.
  test.beforeAll(async ({ browser }) => {
    page = await browser.newPage(); // Add value to 'page'.
    ts = new tsMethods(page); // Create a new 'ts' and include 'page' inside.
  });

  //04. Create the "test" block/s.
  test("Playwright Example for printing Error Messages.", async () => {
    // Print the error message.
    console.log("\x1b[41m\x1b[1m", "Error Message Inside", "\x1b[0m");
  });

  test("Playwright Example for printing Alert Messages.", async () => {
    // Print the alert message.
    console.log("\x1b[43m\x1b[1m", "Alert Message Inside", "\x1b[0m");
  });

  test("Playwright Example for printing Information Messages.", async () => {
    // Print the information message.
    console.log("\x1b[32m\x1b[1m", "Information Message Inside", "\x1b[0m");
  });

  test("Example using Type Script custom method for Error messages.", async () => {
    // Print the error message by providing a string text.
    // This method will be executed if the 'errorMessagesToggle' from 'configs\configuration.ts' is set to "enable".
    ts.errorLog("Error Message Inside");
  });

  test("Example using Type Script custom method for Alert messages.", async () => {
    // Print the alert message by providing a string text.
    ts.alertLog("Alert Message Inside");
  });

  test("Example using Type Script custom method for Information messages.", async () => {
    // Print the error message by providing a string text.
    ts.informLog("Information Message Inside");
  });
});
