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

  });

  //07. Create the "test" block.
  test("Get data from station.", async () => {
    // Excel file path.
    const filePath = 'C:/Users/test657/Desktop/test-data2.xlsx';
    // Read data from the Excel file.
    const excelData = await readExcelAsObject(filePath, 'January 2023', 1);
    // Accessing all values of a specific key, e.g., "Damage Type"
    let damageType_data = excelData.map(entry => entry["Damage Type"]);
    damageType_data = damageType_data.filter(value => value !== undefined);
    const latLong_data = excelData.map(entry => entry["Lat,Long"]);
    const dateOfLoss_data = excelData.map(entry => entry["Date of Loss"]);

    for (let i = 0; i < damageType_data.length; i++) {
      // console.log(`The ${i + 1} value of 'Damage Type' from the Excel file is: ${damageType_data[i]}`);
      // console.log(`The ${i + 1} value of 'Lat,Long' from the Excel file is: ${latLong_data[i]}`);
      // console.log(`The ${i + 1} value of 'Date of Loss' from the Excel file is: ${dateOfLoss_data[i]}`);
      const time = pom.parseDate(dateOfLoss_data[i]);
      // 1. Navigate to: https://www.wunderground.com/
      await pom.findStationByLocation(url, latLong_data[i], (await time).month, (await time).year, i);
    }

  });
});