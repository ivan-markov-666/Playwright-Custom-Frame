/**
 * @description     This class shows an example of how to read data from an Excel file.
 */

//01. Import libraries and classes.
// Import Playwright test library.
import { test } from "@playwright/test";
// Import the custom method for reading Excel files.
import { readExcelAsObject } from '../../custom-methods/other-methods/excelFixture';
// Import path.
import path from 'path';

//02. Create the "describe" block.
test.describe("Read data from Excel file.", () => {

    //03. Create the "test" block.
    test("Read data from Excel file.", async () => {
        // Excel file path.
        const filePath = path.resolve('fixtures/excel/test-data.xlsx');
        // Read data from the Excel file.
        const excelData = await readExcelAsObject(filePath, 'sheet name', 0);
        // Accessing all values of a specific key, e.g., "gender"
        const departmentValue = excelData.map(entry => entry["gender"]);
        // Print the first value.
        console.log(`Print the first value of the 'department' column: ${departmentValue[0]}`);
        // Read all values of the "department" key.
        console.log(`Print all values of the 'department' column: ${departmentValue}`);
        // Print all values of the "department" key using a loop.
        for (let i = 0; i < departmentValue.length; i++) {
            console.log(`The ${i + 1} value of 'department' from the Excel file is: ${departmentValue[i]}`);
        }
    });
});