//01. Import libraries and classes.
// Import Playwright test library.
import { test } from "@playwright/test";
// Import BaseClass.
import { BaseClass } from "../../baseClass/baseClass";
// Import the PO class.
import PomExample from "../../pom/weather-underground/wUnderground.po";

//02. Create the "describe" block.
test.describe("Weather Underground Report", () => {
  let baseClass: BaseClass; // Create a new variable for baseClass. Add specific type (of the BaseClass class) to enable the suggestions.
  let pom: PomExample; // Create a new variable for pom. Add specific type (of the PomExample class) to enable the suggestions).

  //03. Define data.
  // Define testing data.
  let url: string = "https://www.wunderground.com/";

  //04. Create the "beforeEach" block.
  test.beforeEach(async ({ page }) => {
    // Create a new PomExample and include page.
    pom = new PomExample(page);
    // Create a new baseClass and include page.
    baseClass = new BaseClass(page);
  });

  //07. Create the "test" block.
  test("Get data from station.", async () => {
    // 1. Navigate to: https://www.wunderground.com/
    await pom.findStationByLocation(url, "42.4200,-71.1876", "January", "2023");
  });
});