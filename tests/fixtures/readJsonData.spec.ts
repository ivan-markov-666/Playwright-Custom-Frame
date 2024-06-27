/**
 * @description     This class shows an example of how to read data from an Json file.
 */

//01. Import libraries and classes.
// Import Playwright test library.
import { test } from "@playwright/test";
// Import data from JSON file.
import data from "../../fixtures/json/test-data.json";

//02. Create the "describe" block.
test.describe("Read data from Json file.", () => {
    let gender: string = data.testData.gender;
    let dateOfBirth: string = data.testData.dateOfBirth;
    let verifyDateOfBirth: string = data.testData.verifyDateOfBirth;
    let subject: string = data.testData.department;
    let hobbies: string = data.testData.hobbies;
    let uploadFile: string = data.testData.uploadFile;
    let verifySelectedStateDropDownList: string = data.testData.state;
    let verifySelectedCityDropDownList: string = data.testData.city;

    //03. Create the "test" block.
    test("Read data from Json file.", async () => {
        console.log(`Gender: ${gender}`);
        console.log(`Date of Birth: ${dateOfBirth}`);
        console.log(`Verify Date of Birth: ${verifyDateOfBirth}`);
        console.log(`Subject: ${subject}`);
        console.log(`Hobbies: ${hobbies}`);
        console.log(`Upload File: ${uploadFile}`);
        console.log(`Verify Selected State Drop Down List: ${verifySelectedStateDropDownList}`);
        console.log(`Verify Selected City Drop Down List: ${verifySelectedCityDropDownList}`);
    });
});