//01. Import libraries and classes.
// Import Playwright test library.
import { test } from "@playwright/test";
// Import faker-js library. Data-Driven Testing with dynamically generated data using faker-js.
import { faker } from "@faker-js/faker";
// Import BaseClass.
import { BaseClass } from "../../baseClass/baseClass";
// Import the PO class.
import CareersPom from "../../pom/strypes/careers.po";

//02. Create the "describe" block.
test.describe("Strypes Careers.", () => {
  let baseClass: BaseClass; // Create a new variable for baseClass. Add specific type (of the BaseClass class) to enable the suggestions.
  let pom: CareersPom; // Create a new variable for pom. Add specific type (of the PomExample class) to enable the suggestions).

  //03. Define data.
  // Define testing data.
  let exampleTestingData: string = faker.person.firstName();

  //04. Create the "beforeEach" block.
  test.beforeEach(async ({ page }) => {
    // Create a new CareersPom and include page.
    pom = new CareersPom(page);
    // Create a new baseClass and include page.
    baseClass = new BaseClass(page);

    //05. Declare local variables.
    let url: string = "https://strypes.eu/careers/";

    //06. Precondition Steps.
    // 0. Set the screen size to 1920-1080.
    await pom.screenSize();
    // 1. Navigate to: https://strypes.eu/careers/ .
    await pom.navigate(url);
  });

  //07. Create the "afterEach" block.
  test.afterEach(async ({ page }) => {
    // Close the page (browser tab).
    await page.close();
  });

  //08. Create the "test" block.
  test("Press the 'Great Place To Work' button.", async () => {
    await pom.clickGreatPlaceToWork("https://strypes.eu/blog/strypes-group-great-place-to-work-certification/");
  });
});