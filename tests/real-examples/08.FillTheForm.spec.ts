/**
 * @description       That is a spec (test) class. This class executes the test/s.
 *                    The best of the best practice we can use for the spec (test) class. This class is the same as the previous example (07.FillTheForm.spec.ts). The difference is in the "PO" class.
 *                      - As you can see - we are using 'beforeEach' hook.
 *                      - As you can see - we are using 'afterEach' hook.
 *                      - As you can see - we are using page object model optimisation.
 *                      - We confirm (verify) that the test steps are performed correctly.
 *                      - The tested data is not hardcoded directly in the test. The data is declared outside of the test.
 *                        -- We use dynamic data (using fakerJS) for some of the test steps, and we call the static data from a JSON file.
 *                        -- Our data is dynamically generated through this process or can be changed from a JSON file. Now our test (spec) calss are independent of the testing data.
 *                      - We are using a base test class to execute the precondition code.
 *                      - We are using methods for similar steps. The methods are defined in the PO classes.
 *                      - We use domain-specific language in the PO class.
 */

//01. Import libraries and classes.
// Import Playwright test library.
import { test } from "@playwright/test";
// Import faker-js library. Data-Driven Testing with dynamically generated data using faker-js.
import { faker } from "@faker-js/faker";
// Import BaseClass.
import { BaseClass } from "../../baseClass/baseClass";
// Import the PO class.
import PomExample from "../../pom/real-example/08.FillTheForm.po";
// Import data from JSON file.
import data from "../../fixtures/json/test-data.json";

//02. Create the "describe" block.
test.describe("Fill the form.", () => {
  let baseClass: BaseClass; // Create a new variable for baseClass. Add specific type (of the BaseClass class) to enable the suggestions.
  let pom: PomExample; // Create a new variable for pom. Add specific type (of the PomExample class) to enable the suggestions).

  //03. Define data.
  // Define testing data.
  let firstNameValue: string = faker.person.firstName();
  let lastNameValue: string = faker.person.lastName();
  let email: string = faker.internet.email({
    firstName: firstNameValue,
    lastName: lastNameValue,
    provider: "fake.email.com",
    allowSpecialCharacters: false
  });
  let gender: string = data.testData.gender;
  let mobile: string = faker.number.int({
    min: 1000000000,
    max: 9999999999,
  })
    .toString();
  let dateOfBirth: string = data.testData.dateOfBirth;
  let verifyDateOfBirth: string = data.testData.verifyDateOfBirth;
  let subject: string = data.testData.department;
  let hobbies: string = data.testData.hobbies;
  let uploadFile: string = data.testData.uploadFile;
  let uploadFilePath: string = data.testData.uploadPath + uploadFile;
  let currentAddress: string =
    faker.location.country() +
    " " +
    faker.location.city() +
    " " +
    faker.location.streetAddress(true);
  let verifySelectedStateDropDownList: string = data.testData.state;
  let verifySelectedCityDropDownList: string = data.testData.city;

  //04. Create the "beforeEach" block.
  test.beforeEach(async ({ page }) => {
    // Create a new PomExample and include page.
    pom = new PomExample(page);
    // Create a new baseClass and include page.
    baseClass = new BaseClass(page);

    //05. Declare local variables.
    let url: string = baseClass.url + "automation-practice-form/";

    //06. Precondition Steps.
    // 0. Set the screen size to 1920-1080.
    await pom.screenSize();
    // 1. Navigate to: https://demoqa.com/automation-practice-form .
    await pom.navigate(url);
  });

  //07. Create the "afterEach" block.
  test.afterEach(async ({ page }) => {
    // Close the page (browser tab).
    await page.close();
  });

  //08. Create the "test" block.
  test("Fill the form with valid data.", async () => {
    // 2. Fill with correct data into the "First Name" input text element.
    await pom.firstNameFill_InputTextElement(firstNameValue);
    // // 3. Fill with valid data into the "Last Name" input text element.
    await pom.lastNameFill_InputTextElement(lastNameValue);
    // // 4. Fill with accurate data into the "Email" input text element.
    await pom.emailFill_InputTextElement(email);
    // // 5. Select the correct random option from the "Gender" section.
    await pom.genderCheck_radopButton();
    // // 6. Fill with valid data into the "Mobile Number" input text element.
    await pom.mobileNumberFill_InputTextElement(mobile);
    // // 7. Fill with accurate data into the "Date of Birth" input text element.
    await pom.birthDaySelect_DropDownCalendar(dateOfBirth);
    // // 8. The select random correct date for "Subjects".
    await pom.subjectNumberFill_MultySelect(subject);
    // // 9. Check random correct value/s from the "Hobbies" section.
    await pom.hobbiesSelect_CheckBoxes();
    // // 10. Upload a random correct picture file.
    await pom.uploadFile(uploadFilePath);
    // // 11. Fill with correct data into the "Current Address" input text element.
    await pom.currentAddressFill_InputTextElement(currentAddress);
    // // 12. Select the random correct date for the "State" drop-down list.
    await pom.stateSelect_DropDownList(verifySelectedStateDropDownList);
    // // 13. Select an arbitrary valid date for the "City" drop-down list.
    await pom.citySelect_DropDownList(verifySelectedCityDropDownList);
    // // 14. Press the "Submit" button.
    await pom.submitPress_Button();
    // // 15. Verify that the test case ware executed everything correctly.
    await pom.assert_All(
      firstNameValue,
      lastNameValue,
      email,
      gender,
      mobile,
      verifyDateOfBirth,
      subject,
      hobbies,
      uploadFile,
      currentAddress,
      verifySelectedStateDropDownList,
      verifySelectedCityDropDownList
    );
  });
});