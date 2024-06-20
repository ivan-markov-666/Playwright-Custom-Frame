/**
 * @description         That is a page object (PO) class. That means we declare locators of the elements and methods we will use from the spec (test) class. If you don't know the "page object model" design pattern, it will be good to read about it.
 *                      We can use that great practice for the page object class.
 *                        - We are declaring locators and selectors. We will call the locators from the spec (test) class. 
 *                        - We describe the test functions we called from the spec (test) class.
 *                        - We are inhering the BaseClass.
 *                          -- These functions are fully defined here.
 *                          -- The functions contain only Playwright commands. We are not using custom commands (domain-specific language).
 */

//01. Import libraries and classes.
// Import Playwright test library.
import { Page, Locator, expect } from "@playwright/test";
// Import BaseClass.
import { BaseClass } from "../../baseClass/baseClass";

//02. Declare a class.
class Pom extends BaseClass {
  //03. Declare a page variable.
  page: Page;
  //04. Declare elements and selectors.
  firstName_InputTextElement: Locator;
  lastName_InputTextElement: Locator;
  email_InputTextElement: Locator;
  gender_RadioButton: string; // That is an example of a declaration of selector. The selector variable uses using "string" type of data.
  mobilePhone_InputTextElement: Locator;
  dateOfBirth_DropDownCalendar: Locator;
  subject_InputTextElement: Locator;
  hobbies_CheckBox: string;
  uploadImage_Button: string;
  currentAddress_InputTextElement: Locator;
  state_DropDownList: string;
  state_DropDownValue: string;
  state_SelectedDropDownValue: Locator;
  city_DropDownList: string;
  city_DropDownValue: string;
  city_SelectedDropDownValue: Locator;
  submit_Button: string;
  // Declare assertion elements and selectors.
  name_actualResultElement: Locator;
  email_actualResultElement: Locator;
  gender_actualResultElement: Locator;
  mobilePhone_actualResultElement: Locator;
  dateOfBirth_actualResultElement: Locator;
  subject_actualResultElement: Locator;
  subject_SelectedValue: Locator;
  hobbies_actualResultElement: Locator;
  uploadedFile_actualResultElement: Locator;
  address_actualResultElement: Locator;
  stateAndCity_actualResultElement: Locator;

  //05. Declare a constructor.
  constructor(page: Page) {
    // Add 'super' because the constructor for the derived class must contain that call. Add 'page' argument inside.
    super(page);
    //06. Get access to the page property.
    this.page = page;

    //07. Add elements and selectors.
    this.firstName_InputTextElement = page.locator("#firstName");
    this.lastName_InputTextElement = page.locator("#lastName");
    this.email_InputTextElement = page.locator("#userEmail");
    this.gender_RadioButton =
      '//*[@id="gender-radio-1"]/following-sibling::label';
    this.mobilePhone_InputTextElement = page.locator("#userNumber");
    this.dateOfBirth_DropDownCalendar = page.locator("#dateOfBirthInput");
    this.subject_InputTextElement = page.locator("#subjectsInput");
    this.subject_SelectedValue = page.locator(
      '(//*[@id="subjectsWrapper"]/div/div/div/div/div/div)[1]'
    );
    this.hobbies_CheckBox =
      '//*[@id="hobbies-checkbox-1"]/following-sibling::label';
    this.uploadImage_Button = "#uploadPicture";
    this.currentAddress_InputTextElement = page.locator("#currentAddress");
    this.state_DropDownList = "#state";
    this.state_DropDownValue = '//*[@id="react-select-3-option-1"]';
    this.state_SelectedDropDownValue = page.locator(
      "(//*[@id='stateCity-wrapper']/div/div/div/div/div)[1]"
    );
    this.city_DropDownList = "#city";
    this.city_DropDownValue = '//*[@id="react-select-4-option-0"]';
    this.city_SelectedDropDownValue = page.locator(
      "(//*[@id='stateCity-wrapper']/div/div/div/div/div)[4]"
    );
    this.submit_Button = "#submit";
    //08. Add assertion elements and selectors.
    this.name_actualResultElement = page.locator(
      '//*[contains(text(),"Student Name")]/following-sibling::td'
    );
    this.email_actualResultElement = page.locator(
      '//*[contains(text(),"Student Email")]/following-sibling::td'
    );
    this.gender_actualResultElement = page.locator(
      '//*[contains(text(),"Gender")]/following-sibling::td'
    );
    this.mobilePhone_actualResultElement = page.locator(
      '//*[contains(text(),"Mobile")]/following-sibling::td'
    );
    this.dateOfBirth_actualResultElement = page.locator(
      '//*[contains(text(),"Date of Birth")]/following-sibling::td'
    );
    this.subject_actualResultElement = page.locator(
      '//*[contains(text(),"Subjects")]/following-sibling::td'
    );
    this.hobbies_actualResultElement = page.locator(
      '//*[contains(text(),"Hobbies")]/following-sibling::td'
    );
    this.uploadedFile_actualResultElement = page.locator(
      '//*[contains(text(),"Picture")]/following-sibling::td'
    );
    this.address_actualResultElement = page.locator(
      '//*[contains(text(),"Address")]/following-sibling::td'
    );
    this.stateAndCity_actualResultElement = page.locator(
      '//*[contains(text(),"State and City")]/following-sibling::td'
    );
  }

  /**
   * @description       This method changes the screen size.
   */
  async screenSize() {
    // Set the screen size to 1920-1080.
    await this.page.setViewportSize({
      width: 1920,
      height: 1080,
    });
  }

  /**
   * @description       This method navigates the user to the URL address.
   * @param url         Provide the URL address where the automation will redirect the user.
   */
  async navigate(url: string) {
    // Navigate to: https://demoqa.com/automation-practice-form .
    await this.page.goto(url);
  }

  /**
   * @description       This method fills the input text element.
   * @param firstName   Provide the firstName value.
   */
  async firstNameFill_InputTextElement(firstName: string) {
    // Fill with correct data into the "First Name" input text element.
    await this.firstName_InputTextElement.fill(firstName);
    // Verify that the input text element contains the sent text data.
    expect(await this.firstName_InputTextElement.inputValue()).toEqual(
      firstName
    );
  }

  /**
   * @description       This method fills the input text element.
   * @param lastName    Provide the lastName value.
   */
  async lastNameFill_InputTextElement(lastName: string) {
    // Fill with valid data into the "Last Name" input text element.
    await this.lastName_InputTextElement.fill(lastName);
    // Verify that the input text element contains the sent text data.
    expect(await this.lastName_InputTextElement.inputValue()).toEqual(lastName);
  }

  /**
   * @description       This method fills the input text element.
   * @param email       Provide the email value.
   */
  async emailFill_InputTextElement(email: string) {
    // Fill with accurate data into the "Email" input text element.
    await this.email_InputTextElement.fill(email);
    // Verify that the input text element contains the sent text data.
    expect(await this.email_InputTextElement.inputValue()).toEqual(email);
  }

  /**
   * @description       This method checks the radio button.
   */
  async genderCheck_radopButton() {
    // Select the correct random option from the "Gender" section.
    await this.page.check(this.gender_RadioButton);
    // Verify the element is checked.
    expect(await this.page.isChecked(this.gender_RadioButton)).toBeTruthy();
  }

  /**
   * @description       This method fills the input text element.
   * @param mobile      Provide the mobile value.
   */
  async mobileNumberFill_InputTextElement(mobile: string) {
    // Fill with valid data into the "Mobile Number" input text element.
    await this.mobilePhone_InputTextElement.fill(mobile);
    // Verify that the input text element contains the sent text data.
    expect(await this.mobilePhone_InputTextElement.inputValue()).toEqual(
      mobile
    );
  }

  /**
   * @description       This method fills the input text element.
   * @param dateOfBirth Provide the dateOfBirth value.
   */
  async birthDaySelect_DropDownCalendar(dateOfBirth: string) {
    // Fill with accurate data into the "Date of Birth" input text element.
    // Focus on the element.
    await this.dateOfBirth_DropDownCalendar.focus();
    // Send Ctrl+A to the element. This will work for Windows and Linux. We are using this to select all containing text inside inspected input text element.
    await this.page.keyboard.press("Control+A");
    // Send Meta+A to the element. This will work for macOS. We are using this to select all containing text inside inspected input text element.
    await this.page.keyboard.press("Meta+A");
    // Fill with data inside the "Date of Birth" drop-down calendar.
    await this.dateOfBirth_DropDownCalendar.fill(dateOfBirth);
    // Send Excape to the element.
    await this.page.keyboard.press("Escape");
  }

  /**
   * @description       This method fills the input text element.
   * @param subject     Provide the subject value.
   */
  async subjectNumberFill_MultySelect(subject: string) {
    // The select random correct date for "Subjects".
    await this.subject_InputTextElement.fill(subject);
    // Press the "Enter" key of the keyboard.
    await this.page.keyboard.press("Enter");
    // Verify that the input text element contains the sent text data.
    let subject_SelectedValue: string = (
      await this.subject_SelectedValue.allTextContents()
    )[0];
    expect(subject_SelectedValue).toEqual(subject);
  }

  /**
   * @description       This method selects value from multyselect drop-down list.
   */
  async hobbiesSelect_CheckBoxes() {
    // Check random correct value/s from the "Hobbies" section.
    await this.page.click(this.hobbies_CheckBox);
    // Verify the element is checked.
    expect(await this.page.isChecked(this.hobbies_CheckBox)).toBeTruthy();
  }

  /**
   * @description              This method uploads file.
   * @param uploadFilePath     Provide the uploadFilePath value.
   */
  async uploadFile(uploadFilePath: string) {
    // Upload a random correct picture file.
    await this.page.setInputFiles(this.uploadImage_Button, uploadFilePath);
  }

  /**
   * @description              This method fills the input text element.
   * @param currentAddress     Provide the currentAddress value.
   */
  async currentAddressFill_InputTextElement(currentAddress: string) {
    // Fill with correct data into the "Current Address" input text element.
    await this.currentAddress_InputTextElement.fill(currentAddress);
    // Verify that the input text element contains the sent text data.
    expect(await this.currentAddress_InputTextElement.inputValue()).toEqual(
      currentAddress
    );
  }

  /**
   * @description                             This method selects value from the drop-down list.
   * @param verifySelectedStateDropDownList   Provide the verifySelectedStateDropDownList value.
   */
  async stateSelect_DropDownList(verifySelectedStateDropDownList: string) {
    // Select the random correct date for the "State" drop-down list.
    await this.page.click(this.state_DropDownList);
    await this.page.click(this.state_DropDownValue, { force: true });
    // Verify that the input text element contains the sent text data.
    let state_SelectedValue: string = (
      await this.state_SelectedDropDownValue.allTextContents()
    )[0];
    expect(state_SelectedValue).toEqual(verifySelectedStateDropDownList);
  }

  /**
   * @description                             This method selects value from the drop-down list.
   * @param verifySelectedCityDropDownList    Provide the verifySelectedCityDropDownList value.
   */
  async citySelect_DropDownList(verifySelectedCityDropDownList: string) {
    // Select an arbitrary valid date for the "City" drop-down list.
    await this.page.click(this.city_DropDownList);
    await this.page.click(this.city_DropDownValue);
    // Verify that the input text element contains the sent text data.
    let city_SelectedValue: string = (
      await this.city_SelectedDropDownValue.allTextContents()
    )[0];
    expect(city_SelectedValue).toEqual(verifySelectedCityDropDownList);
  }

  /**
   * @description     This method clicks over the button.
   */
  async submitPress_Button() {
    // Press the "Submit" button.
    await this.page.click(this.submit_Button);
  }

  /**
   * @description                                 This method verifies that the automation ware completed correctly. This method makes a lot of assertions.
   * @param firstName                             Provide the firstName value.
   * @param lastName                              Provide the lastName value.
   * @param email                                 Provide the email value.
   * @param gender                                Provide the gender value.
   * @param mobile                                Provide the mobile value.
   * @param verifyDateOfBirth                     Provide the verifyDateOfBirth value.
   * @param subject                               Provide the subject value.
   * @param hobbies                               Provide the hobbies value.
   * @param uploadFile                            Provide the uploadFile value.
   * @param currentAddress                        Provide the currentAddress value.
   * @param verifySelectedStateDropDownList       Provide the verifySelectedStateDropDownList value.
   * @param verifySelectedCityDropDownList        Provide the verifySelectedCityDropDownList value.
   */
  async assert_All(
    firstName: string,
    lastName: string,
    email: string,
    gender: string,
    mobile: string,
    verifyDateOfBirth: string,
    subject: string,
    hobbies: string,
    uploadFile: string,
    currentAddress: string,
    verifySelectedStateDropDownList: string,
    verifySelectedCityDropDownList: string
  ) {
    let name_actualResult_value = (
      await this.name_actualResultElement.innerText()
    ).valueOf();
    expect(name_actualResult_value).toEqual(firstName + " " + lastName);
    let email_actualResult_value = (
      await this.email_actualResultElement.innerText()
    ).valueOf();
    expect(email_actualResult_value).toEqual(email);
    let gender_actualResult_value = (
      await this.gender_actualResultElement.innerText()
    ).valueOf();
    expect(gender_actualResult_value).toEqual(gender);
    let mobilePhone_actualResult_value = (
      await this.mobilePhone_actualResultElement.innerText()
    ).valueOf();
    expect(mobilePhone_actualResult_value).toEqual(mobile);
    let dateOfBirth_actualResult_value = (
      await this.dateOfBirth_actualResultElement.innerText()
    ).valueOf();
    expect(dateOfBirth_actualResult_value).toEqual(verifyDateOfBirth);
    let subject_actualResult_value = (
      await this.subject_actualResultElement.innerText()
    ).valueOf();
    expect(subject_actualResult_value).toEqual(subject);
    let hobbies_actualResult_value = (
      await this.hobbies_actualResultElement.innerText()
    ).valueOf();
    expect(hobbies_actualResult_value).toEqual(hobbies);
    let uploadedFile_actualResult_value = (
      await this.uploadedFile_actualResultElement.innerText()
    ).valueOf();
    expect(uploadedFile_actualResult_value).toEqual(uploadFile);
    let address_actualResult_value = (
      await this.address_actualResultElement.innerText()
    ).valueOf();
    expect(address_actualResult_value).toEqual(currentAddress);
    let stateAndCity_actualResult_value = (
      await this.stateAndCity_actualResultElement.innerText()
    ).valueOf();
    expect(stateAndCity_actualResult_value).toEqual(
      verifySelectedStateDropDownList + " " + verifySelectedCityDropDownList
    );
  }
}

//09. Export the class.
export default Pom;
