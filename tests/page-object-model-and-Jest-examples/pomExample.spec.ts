/**
 * @description    This class shows an example how to use the Page Object Model (POM) pattern.
 */

//01. Import libraries and classes.
// Import Playwright test library.
import { test, expect } from "@playwright/test";
// Import the PO class.
import PomExample from "../../pom/page-object-model-examples/pomExample.po";

test.describe("Describe block", () => {
  let pom: PomExample; // Create a new variable for pom. Add specific type (of the PomExample class) to enable the suggestions).
  test("The example shows how to fill with text in the input text element and verify that the text ware filled correctly.", async ({
    page,
  }) => {
    pom = new PomExample(page); // Create a new PomExample and include page.

    await pom.navigate();

    // create a locator
    let fullName_InputTextElement = pom.fullName_InputTextElement;
    // Assertions.
    // Verify that the element is visible.
    await expect(fullName_InputTextElement).toBeVisible();
    // Verify that the element is enabled.
    await expect(fullName_InputTextElement).toBeEnabled();
    // Verify that the selector is the only one in the DOM tree.
    await expect(fullName_InputTextElement).toHaveCount(1);

    await fullName_InputTextElement.focus();
    // on Windows and Linux
    await page.keyboard.press("Control+A");
    // on macOS
    await page.keyboard.press("Meta+A");
    // backspace
    await page.keyboard.press("Backspace");

    await fullName_InputTextElement.fill("test");
    let value = await fullName_InputTextElement.inputValue();
    await expect(value).toEqual("test");
  });
});
