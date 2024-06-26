/**
 * @description       That is a spec (test) class. This class executes the test/s.
 *                     That is a nice practice we can use for the spec (test) class.
 *                      - As you can see - we are using 'beforeEach' hook.
 *                      - As you can see - we are using 'afterEach' hook.
 *                      - As you can see - we are using page object model optimisation.
 *                      - We do not confirm (verify) that the test steps are performed correctly.
 *                      - The tested data is hardcoded directly in the test. The data is not declared outside of the test. No dynamic data - only static data.
 *                      - We are asserting the birth date, but the date is hardcoded. That can fail the test if the date is not correct. 
 *                      - We are not using a base test class to execute the precondition code.
 *                      - We are not using methods for similar steps. The methods are not defined in the PO classes.
 *                      - We are not using domain-specific language.
 */

//01. Import libraries and classes.
// Import Playwright test library.
import { test, expect } from "@playwright/test";
// Import the PO class.
import PomExample from "../../pom/real-example/02.FillTheForm.po";

//02. Create the "describe" block.
test.describe("Fill the form.", () => {
  let pom: PomExample; // Create a new variable for pom. Add specific type (of the PomExample class) to enable the suggestions.

  //03. Create the "beforeEach" block.
  test.beforeEach(async ({ page }) => {
    // Create a new PomExample and include page.
    pom = new PomExample(page);
    //04. Precondition Steps.
    // 0. Set the screen size to 1920-1080.
    await page.setViewportSize({
      width: 1920,
      height: 1080,
    });
    // 1. Navigate to: https://demoqa.com/automation-practice-form .
    await page.goto("https://demoqa.com/automation-practice-form/");
  });

  //05. Create the "afterEach" block.
  test.afterEach(async ({ page }) => {
    // Close the page (browser tab).
    await page.close();
  });

  //05. Create the "test" block.
  test("Fill the form with valid data.", async ({ page }) => {
    // 2. Fill with correct data into the "First Name" input text element.
    await pom.firstName_InputTextElement.fill("Tester");
    // 3. Fill with valid data into the "Last Name" input text element.
    await pom.lastName_InputTextElement.fill("Testerov");
    // 4. Fill with accurate data into the "Email" input text element.
    await pom.email_InputTextElement.fill("testingemail@testemail.com");
    // 5. Select the correct random option from the "Gender" section.
    await page.check(pom.gender_RadioButton);
    // 6. Fill with valid data into the "Mobile Number" input text element.
    await pom.mobilePhone_InputTextElement.fill("1232131231");
    // 7. Fill with accurate data into the "Date of Birth" input text element.
    await page.click(pom.dateOfBirth_DropDownCalendar);
    await page.click(pom.dateOfBirth_DropDownValue);
    // 8. The select random correct date for "Subjects".
    await pom.subject_InputTextElement.fill("Computer Science");
    // Press the "Enter" key of the keyboard.
    await page.keyboard.press("Enter");
    // 9. Check random correct value/s from the "Hobbies" section.
    await page.click(pom.hobbies_CheckBox);
    // 10. Upload a random correct picture file.
    await page.setInputFiles(pom.uploadImage_Button, "uploads/test-image.jpg");
    // 11. Fill with correct data into the "Current Address" input text element.
    await pom.currentAddress_InputTextElement.fill("Test Address");
    // 12. Select the random correct date for the "State" drop-down list.
    await page.click(pom.state_DropDownList);
    await page.click(pom.state_DropDownValue, { force: true });
    // 13. Select an arbitrary valid date for the "City" drop-down list.
    await page.click(pom.city_DropDownList);
    await page.click(pom.city_DropDownValue);
    // 14. Press the "Submit" button.
    await page.click(pom.submit_Button);
    // 15. Verify that the test case ware executed everything correctly.
    let name_actualResult_value = (
      await pom.name_actualResultElement.innerText()
    ).valueOf();
    expect(name_actualResult_value).toEqual("Tester Testerov");
    let email_actualResult_value = (
      await pom.email_actualResultElement.innerText()
    ).valueOf();
    expect(email_actualResult_value).toEqual("testingemail@testemail.com");
    let gender_actualResult_value = (
      await pom.gender_actualResultElement.innerText()
    ).valueOf();
    expect(gender_actualResult_value).toEqual("Male");
    let mobilePhone_actualResult_value = (
      await pom.mobilePhone_actualResultElement.innerText()
    ).valueOf();
    expect(mobilePhone_actualResult_value).toEqual("1232131231");
    // To verify that the "Date of Birth" vas saved correctly - we need to change the containing text every day because we provide the data statically.
    let dateOfBirth_actualResult_value = (
      await pom.dateOfBirth_actualResultElement.innerText()
    ).valueOf();
    expect(dateOfBirth_actualResult_value).toEqual("26 May,2024");
    let subject_actualResult_value = (
      await pom.subject_actualResultElement.innerText()
    ).valueOf();
    expect(subject_actualResult_value).toEqual("Computer Science");
    let hobbies_actualResult_value = (
      await pom.hobbies_actualResultElement.innerText()
    ).valueOf();
    expect(hobbies_actualResult_value).toEqual("Sports");
    let uploadedFile_actualResult_value = (
      await pom.uploadedFile_actualResultElement.innerText()
    ).valueOf();
    expect(uploadedFile_actualResult_value).toEqual("test-image.jpg");
    let address_actualResult_value = (
      await pom.address_actualResultElement.innerText()
    ).valueOf();
    expect(address_actualResult_value).toEqual("Test Address");
    let stateAndCity_actualResult_value = (
      await pom.stateAndCity_actualResultElement.innerText()
    ).valueOf();
    expect(stateAndCity_actualResult_value).toEqual("Uttar Pradesh Agra");
  });
});
