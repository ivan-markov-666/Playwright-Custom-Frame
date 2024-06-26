/**
 * @description       That is a spec (test) class. This class executes the test/s.
 *                    We can use that great practice for the spec (test) class.
 *                      - As you can see - we are using 'beforeEach' hook.
 *                      - As you can see - we are using 'afterEach' hook.
 *                      - As you can see - we are using page object model optimisation.
 *                      - We confirm (verify) that the test steps are performed correctly.
 *                      - The tested data is not hardcoded directly in the test. The data is declared outside of the test.
 *                        -- We use dynamic data (using fakerJS) for some of the test steps, but we still use no static (hardcoded) data for some of the test steps.
 *                      - We are not using a base test class to execute the precondition code.
 *                      - We are not using methods for similar steps. The methods are not defined in the PO classes.
 *                      - We are not using domain-specific language.
 */

//01. Import libraries and classes.
// Import Playwright test library.
import { test, expect } from "@playwright/test";
import { faker } from "@faker-js/faker"; // Data-Driven Testing with dynamically generated data using faker-js.
// Import the PO class.
import PomExample from "../../pom/real-example/04.FillTheForm.po";

//02. Create the "describe" block.
test.describe("Fill the form.", () => {
  let pom: PomExample; // Create a new variable for pom. Add specific type (of the PomExample class) to enable the suggestions.

  //03. Define data.
  // Define testing data
  let firstNameValue: string = faker.person.firstName();
  let lastNameValue: string = faker.person.lastName();
  let email: string = faker.internet.email({
    firstName: firstNameValue,
    lastName: lastNameValue,
    provider: "fake.email.com",
    allowSpecialCharacters: false
  });
  let gender: string = "Male";
  let mobile: string = faker.number.int({
    min: 1000000000,
    max: 9999999999,
  })
    .toString();
  let dateOfBirth: string = "22 May 2002";
  let verifyDateOfBirth: string = "22 May,2002";
  let subject: string = "Computer Science";
  let hobbies: string = "Sports";
  let uploadFile: string = "test-image.jpg";
  let uploadFilePath: string = "uploads/" + uploadFile;
  let currentAddress: string =
    faker.location.country() +
    " " +
    faker.location.city() +
    " " +
    faker.location.streetAddress(true);
  let verifySelectedStateDropDownList: string = "Uttar Pradesh";
  let verifySelectedCityDropDownList: string = "Agra";

  //04. Create the "beforeEach" block.
  test.beforeEach(async ({ page }) => {
    // Create a new PomExample and include page.
    pom = new PomExample(page);
    //05. Precondition Steps.
    // 0. Set the screen size to 1920-1080.
    await page.setViewportSize({
      width: 1920,
      height: 1080,
    });
    // 1. Navigate to: https://demoqa.com/automation-practice-form .
    await page.goto("https://demoqa.com/automation-practice-form/");
  });

  //06. Create the "afterEach" block.
  test.afterEach(async ({ page }) => {
    // Close the page (browser tab).
    await page.close();
  });

  //06. Create the "test" block.
  test("Fill the form with valid data.", async ({ page }) => {
    // 2. Fill with correct data into the "First Name" input text element.
    await pom.firstName_InputTextElement.fill(firstNameValue);
    // Verify that the input text element contains the sent text data.
    expect(await pom.firstName_InputTextElement.inputValue()).toEqual(
      firstNameValue
    );
    // 3. Fill with valid data into the "Last Name" input text element.
    await pom.lastName_InputTextElement.fill(lastNameValue);
    // Verify that the input text element contains the sent text data.
    expect(await pom.lastName_InputTextElement.inputValue()).toEqual(lastNameValue);
    // 4. Fill with accurate data into the "Email" input text element.
    await pom.email_InputTextElement.fill(email);
    // Verify that the input text element contains the sent text data.
    expect(await pom.email_InputTextElement.inputValue()).toEqual(email);
    // 5. Select the correct random option from the "Gender" section.
    await page.check(pom.gender_RadioButton);
    // Verify the element is checked.
    expect(await page.isChecked(pom.gender_RadioButton)).toBeTruthy();
    // 6. Fill with valid data into the "Mobile Number" input text element.
    await pom.mobilePhone_InputTextElement.fill(mobile);
    // Verify that the input text element contains the sent text data.
    expect(await pom.mobilePhone_InputTextElement.inputValue()).toEqual(mobile);
    // 7. Fill with accurate data into the "Date of Birth" input text element.
    // Focus on the element.
    await pom.dateOfBirth_DropDownCalendar.focus();
    // Send Ctrl+A to the element. This will work for Windows and Linux. We are using this to select all containing text inside inspected input text element.
    await page.keyboard.press("Control+A");
    // Send Meta+A to the element. This will work for macOS. We are using this to select all containing text inside inspected input text element.
    await page.keyboard.press("Meta+A");
    // Fill with data inside the "Date of Birth" drop-down calendar.
    await pom.dateOfBirth_DropDownCalendar.fill(dateOfBirth);
    // Send Excape to the element.
    await page.keyboard.press("Escape");
    // 8. The select random correct date for "Subjects".
    await pom.subject_InputTextElement.fill(subject);
    // Press the "Enter" key of the keyboard.
    await page.keyboard.press("Enter");
    // Verify that the input text element contains the sent text data.
    let subject_SelectedValue: string = (
      await pom.subject_SelectedValue.allTextContents()
    )[0];
    expect(subject_SelectedValue).toEqual(subject);
    // 9. Check random correct value/s from the "Hobbies" section.
    await page.click(pom.hobbies_CheckBox);
    // Verify the element is checked.
    expect(await page.isChecked(pom.hobbies_CheckBox)).toBeTruthy();
    // 10. Upload a random correct picture file.
    await page.setInputFiles(pom.uploadImage_Button, uploadFilePath);
    // 11. Fill with correct data into the "Current Address" input text element.
    await pom.currentAddress_InputTextElement.fill(currentAddress);
    // Verify that the input text element contains the sent text data.
    expect(await pom.currentAddress_InputTextElement.inputValue()).toEqual(
      currentAddress
    );
    // 12. Select the random correct date for the "State" drop-down list.
    await page.click(pom.state_DropDownList);
    await page.click(pom.state_DropDownValue, { force: true });
    // Verify that the input text element contains the sent text data.
    let state_SelectedValue: string = (
      await pom.state_SelectedDropDownValue.allTextContents()
    )[0];
    expect(state_SelectedValue).toEqual(verifySelectedStateDropDownList);
    // 13. Select an arbitrary valid date for the "City" drop-down list.
    await page.click(pom.city_DropDownList);
    await page.click(pom.city_DropDownValue);
    // Verify that the input text element contains the sent text data.
    let city_SelectedValue: string = (
      await pom.city_SelectedDropDownValue.allTextContents()
    )[0];
    expect(city_SelectedValue).toEqual(verifySelectedCityDropDownList);
    // 14. Press the "Submit" button.
    await page.click(pom.submit_Button);
    // 15. Verify that the test case ware executed everything correctly.
    let name_actualResult_value = (
      await pom.name_actualResultElement.innerText()
    ).valueOf();
    expect(name_actualResult_value).toEqual(firstNameValue + " " + lastNameValue);
    let email_actualResult_value = (
      await pom.email_actualResultElement.innerText()
    ).valueOf();
    expect(email_actualResult_value).toEqual(email);
    let gender_actualResult_value = (
      await pom.gender_actualResultElement.innerText()
    ).valueOf();
    expect(gender_actualResult_value).toEqual(gender);
    let mobilePhone_actualResult_value = (
      await pom.mobilePhone_actualResultElement.innerText()
    ).valueOf();
    expect(mobilePhone_actualResult_value).toEqual(mobile);
    let dateOfBirth_actualResult_value = (
      await pom.dateOfBirth_actualResultElement.innerText()
    ).valueOf();
    expect(dateOfBirth_actualResult_value).toEqual(verifyDateOfBirth);
    let subject_actualResult_value = (
      await pom.subject_actualResultElement.innerText()
    ).valueOf();
    expect(subject_actualResult_value).toEqual(subject);
    let hobbies_actualResult_value = (
      await pom.hobbies_actualResultElement.innerText()
    ).valueOf();
    expect(hobbies_actualResult_value).toEqual(hobbies);
    let uploadedFile_actualResult_value = (
      await pom.uploadedFile_actualResultElement.innerText()
    ).valueOf();
    expect(uploadedFile_actualResult_value).toEqual(uploadFile);
    let address_actualResult_value = (
      await pom.address_actualResultElement.innerText()
    ).valueOf();
    expect(address_actualResult_value).toEqual(currentAddress);
    let stateAndCity_actualResult_value = (
      await pom.stateAndCity_actualResultElement.innerText()
    ).valueOf();
    expect(stateAndCity_actualResult_value).toEqual(
      verifySelectedStateDropDownList + " " + verifySelectedCityDropDownList
    );
  });
});
