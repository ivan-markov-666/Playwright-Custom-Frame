/**
 * @description       That is a spec (test) class. This class executes the test/s.
 *                    That is the worst practice we can use for the spec (test) class.
 *                      - As you can see - we are using the 'beforeAll' hook because we need to assign value to the 'page' inside. Otherwise, other hooks like 'beforeEach', 'afterEach', etc., are not used.
 *                      - We are not using page object model optimisation.
 *                      - We do not confirm (verify) that the test steps are performed correctly.
 *                      - The tested data is hardcoded directly in the test. The data is not declared outside of the test. No dynamic data - only static data.
 *                      - We are asserting the birth date, but the date is hardcoded. That can fail the test if the date is not correct.
 *                      - We are not using a base test class to execute the precondition code.
 *                      - We are not using methods for similar steps. The methods are not defined in the PO classes.
 *                      - We are not using domain-specific language.
 */

//01. Import libraries and classes.
// Import Playwright test library.
import { test, Page, expect } from "@playwright/test";

//02. Create the "describe" block.
test.describe("Fill the form.", async () => {
  // Define the 'page' variable.
  let page: Page;
  //03. Create the "beforeAll" block.
  test.beforeAll(async ({ browser }) => {
    // Create a new page.
    page = await browser.newPage();
  });

  //04. Create the "test" block/s.
  test("Fill the form with valid data.", async () => {
    // 0. Set the screen size to 1920-1080.
    await page.setViewportSize({
      width: 1920,
      height: 1080,
    });
    // 1. Navigate to: https://demoqa.com/automation-practice-form .
    await page.goto("https://demoqa.com/automation-practice-form/");
    // 2. Fill with correct data into the "First Name" input text element.
    let firstName_InputTextElement = page.locator("#firstName");
    await firstName_InputTextElement.fill("Tester");
    // 3. Fill with valid data into the "Last Name" input text element.
    let lastName_InputTextElement = page.locator("#lastName");
    await lastName_InputTextElement.fill("Testerov");
    // 4. Fill with accurate data into the "Email" input text element.
    let email_InputTextElement = page.locator("#userEmail");
    await email_InputTextElement.fill("testingemail@testemail.com");
    // 5. Select the correct random option from the "Gender" section.
    await page.check('//*[@id="gender-radio-1"]/following-sibling::label');
    // 6. Fill with valid data into the "Mobile Number" input text element.
    let mobilePhone_InputTextElement = page.locator("#userNumber");
    await mobilePhone_InputTextElement.fill("1232131231");
    // 7. Fill with accurate data into the "Date of Birth" input text element.
    await page.click("#dateOfBirthInput");
    await page.click('(//div[@role="option"])[1]');
    // 8. The select random correct date for "Subjects".
    let subject_InputTextElement = page.locator("#subjectsInput");
    await subject_InputTextElement.fill("Computer Science");
    // Press the "Enter" key of the keyboard.
    await page.keyboard.press("Enter");
    // 9. Check random correct value/s from the "Hobbies" section.
    await page.click('//*[@id="hobbies-checkbox-1"]/following-sibling::label');
    // 10. Upload a random correct picture file.
    await page.setInputFiles("#uploadPicture", "uploads/test-image.jpg");
    // 11. Fill with correct data into the "Current Address" input text element.
    let currentAddress_InputTextElement = page.locator("#currentAddress");
    await currentAddress_InputTextElement.fill("Test Address");
    // 12. Select the random correct date for the "State" drop-down list.
    await page.click("#state");
    await page.click('//*[@id="react-select-3-option-1"]', { force: true });
    // 13. Select an arbitrary valid date for the "City" drop-down list.
    await page.click("#city");
    await page.click('//*[@id="react-select-4-option-0"]');
    // 14. Press the "Submit" button.
    await page.click("#submit");
    // 15. Verify that the test case ware executed everything correctly.
    let name_actualResultElement = page.locator(
      '//*[contains(text(),"Student Name")]/following-sibling::td'
    );
    let name_actualResult_value = (
      await name_actualResultElement.innerText()
    ).valueOf();
    expect(name_actualResult_value).toEqual("Tester Testerov");

    let email_actualResultElement = page.locator(
      '//*[contains(text(),"Student Email")]/following-sibling::td'
    );
    let email_actualResult_value = (
      await email_actualResultElement.innerText()
    ).valueOf();
    expect(email_actualResult_value).toEqual("testingemail@testemail.com");

    let gender_actualResultElement = page.locator(
      '//*[contains(text(),"Gender")]/following-sibling::td'
    );
    let gender_actualResult_value = (
      await gender_actualResultElement.innerText()
    ).valueOf();
    expect(gender_actualResult_value).toEqual("Male");

    let mobilePhone_actualResultElement = page.locator(
      '//*[contains(text(),"Mobile")]/following-sibling::td'
    );
    let mobilePhone_actualResult_value = (
      await mobilePhone_actualResultElement.innerText()
    ).valueOf();
    expect(mobilePhone_actualResult_value).toEqual("1232131231");

    // To verify that the "Date of Birth" vas saved correctly - we need to change the containing text every day because we provide the data statically.
    let dateOfBirth_actualResultElement = page.locator(
      '//*[contains(text(),"Date of Birth")]/following-sibling::td'
    );
    let dateOfBirth_actualResult_value = (
      await dateOfBirth_actualResultElement.innerText()
    ).valueOf();
    expect(dateOfBirth_actualResult_value).toEqual("26 May,2024");

    let subject_actualResultElement = page.locator(
      '//*[contains(text(),"Subjects")]/following-sibling::td'
    );
    let subject_actualResult_value = (
      await subject_actualResultElement.innerText()
    ).valueOf();
    expect(subject_actualResult_value).toEqual("Computer Science");

    let hobbies_actualResultElement = page.locator(
      '//*[contains(text(),"Hobbies")]/following-sibling::td'
    );
    let hobbies_actualResult_value = (
      await hobbies_actualResultElement.innerText()
    ).valueOf();
    expect(hobbies_actualResult_value).toEqual("Sports");

    let uploadedFile_actualResultElement = page.locator(
      '//*[contains(text(),"Picture")]/following-sibling::td'
    );
    let uploadedFile_actualResult_value = (
      await uploadedFile_actualResultElement.innerText()
    ).valueOf();
    expect(uploadedFile_actualResult_value).toEqual("test-image.jpg");

    let address_actualResultElement = page.locator(
      '//*[contains(text(),"Address")]/following-sibling::td'
    );
    let address_actualResult_value = (
      await address_actualResultElement.innerText()
    ).valueOf();
    expect(address_actualResult_value).toEqual("Test Address");

    let stateAndCity_actualResultElement = page.locator(
      '//*[contains(text(),"State and City")]/following-sibling::td'
    );
    let stateAndCity_actualResult_value = (
      await stateAndCity_actualResultElement.innerText()
    ).valueOf();
    expect(stateAndCity_actualResult_value).toEqual("Uttar Pradesh Agra");

    // Close the page (browser tab).
    await page.close();
  });
});
