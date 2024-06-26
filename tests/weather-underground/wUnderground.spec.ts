//01. Import libraries and classes.
// Import Playwright test library.
import { test } from "@playwright/test";
// Import BaseClass.
import { BaseClass } from "../../baseClass/baseClass";
// Import the PO class.
import PomExample from "../../pom/weather-underground/wUnderground.po";
// Import the custom method for reading Excel files.
import { readExcelAsObject } from '../../custom-methods/other-methods/excelFixture';
// Import path.
import path from 'path';

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
    // Excel file path.
    const filePath = path.resolve('fixtures/excel/test-data.xlsx');
    // Read data from the Excel file.
    const excelData = await readExcelAsObject(filePath, 'sheet name');
    // Accessing all values of a specific key, e.g., "Damage Type"
    const damageTypes = excelData.map(entry => entry["gender"]);
    console.log(damageTypes[0]);
  });

  //07. Create the "test" block.
  test("Get data from station.", async () => {
    // 1. Navigate to: https://www.wunderground.com/
    // await pom.findStationByLocation(url, "26.6630,-81.9535", "October", "2022");
  });
});