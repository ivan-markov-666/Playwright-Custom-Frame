//01. Import classes.
import { Page, Locator, expect } from "@playwright/test"; // Add this to have suggestions in the spec class.

//02. Declare a class.
class PomExample {
  //03. Declare a page varible.
  page: Page;
  fullName_InputTextElement: Locator;
  //04. Declare a constructor.
  constructor(page: Page) {
    // Get access to the page property.
    this.page = page;

    //05. Add locators.
    this.fullName_InputTextElement = page.locator("#userName");
  }

  //06. Add custom methods.
  async navigate() {
    // Navigate to URL.
    await this.page.goto("https://demoqa.com/text-box");
    // Verify that the browser loads the correct URL.
    await expect(this.page).toHaveURL("https://demoqa.com/text-box");
  }
}

//07. Export the class.
export default PomExample;
