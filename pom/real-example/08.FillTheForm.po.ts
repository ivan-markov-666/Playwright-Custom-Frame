/**
 * @description         That is a page object (PO) class. That means we declare locators of the elements and methods we will use from the spec (test) class. If you don't know the "page object model" design pattern, it will be good to read about it.
 *                      That is a wonderful practice we can use for the page object class.
 *                        - We are declaring only locators. We are using only selectors because we have a mechanism to make locators into the elements in the "element()" method from domain-specific language. However, you can provide an element to the method if you want. We will call the locators from the spec (test) class.
 *                        - We are inhering the BaseClass.
 *                        - We describe the test functions we called from the spec (test) class.
 *                          -- These functions are fully defined here.
 *                          -- The functions contain custom commands (domain-specific language).
 */

//01. Import libraries and classes.
// Import Playwright test library.
import { Page } from "@playwright/test";
// Import BaseClass.
import { BaseClass } from "../../baseClass/baseClass";

//02. Declare a class.
class Pom extends BaseClass {
  //03. Declare a page variable.
  page: Page;
  //04. Declare elements and selectors.
  firstName_InputTextElement: string;
  lastName_InputTextElement: string;
  email_InputTextElement: string;
  gender_RadioButton: string;
  mobilePhone_InputTextElement: string;
  dateOfBirth_DropDownCalendar: string;
  subject_InputTextElement: string;
  hobbies_CheckBox: string;
  uploadImage_Button: string;
  currentAddress_InputTextElement: string;
  state_DropDownList: string;
  state_DropDownValue: string;
  state_SelectedDropDownValue: string;
  city_DropDownList: string;
  city_DropDownValue: string;
  city_SelectedDropDownValue: string;
  submit_Button: string;
  // Declare assertion elements and selectors.
  name_actualResultElement: string;
  email_actualResultElement: string;
  gender_actualResultElement: string;
  mobilePhone_actualResultElement: string;
  dateOfBirth_actualResultElement: string;
  subject_actualResultElement: string;
  subject_SelectedValue: string;
  hobbies_actualResultElement: string;
  uploadedFile_actualResultElement: string;
  address_actualResultElement: string;
  stateAndCity_actualResultElement: string;

  //05. Declare a constructor.
  constructor(page: Page) {
    // Add 'super' because the constructor for the derived class must contain that call. Add 'page' argument inside.
    super(page);
    //06. Get access to the page property.
    this.page = page;

    //07. Add selectors.
    this.firstName_InputTextElement = "#firstName";
    this.lastName_InputTextElement = "#lastName";
    this.email_InputTextElement = "#userEmail";
    this.gender_RadioButton =
      '//*[@id="gender-radio-1"]/following-sibling::label';
    this.mobilePhone_InputTextElement = "#userNumber";
    this.dateOfBirth_DropDownCalendar = "#dateOfBirthInput";
    this.subject_InputTextElement = "#subjectsInput";
    this.subject_SelectedValue =
      '(//*[@id="subjectsWrapper"]/div/div/div/div/div/div)[1]';

    this.hobbies_CheckBox =
      '//*[@id="hobbies-checkbox-1"]/following-sibling::label';
    this.uploadImage_Button = "#uploadPicture";
    this.currentAddress_InputTextElement = "#currentAddress";
    this.state_DropDownList = "#state";
    this.state_DropDownValue = '//*[@id="react-select-3-option-1"]';
    this.state_SelectedDropDownValue =
      "(//*[@id='stateCity-wrapper']/div/div/div/div/div)[1]";

    this.city_DropDownList = "#city";
    this.city_DropDownValue = '//*[@id="react-select-4-option-0"]';
    this.city_SelectedDropDownValue =
      "(//*[@id='stateCity-wrapper']/div/div/div/div/div)[4]";

    this.submit_Button = "#submit";
    //08. Add assertion selectors.
    this.name_actualResultElement =
      '//*[contains(text(),"Student Name")]/following-sibling::td';

    this.email_actualResultElement =
      '//*[contains(text(),"Student Email")]/following-sibling::td';

    this.gender_actualResultElement =
      '//*[contains(text(),"Gender")]/following-sibling::td';

    this.mobilePhone_actualResultElement =
      '//*[contains(text(),"Mobile")]/following-sibling::td';

    this.dateOfBirth_actualResultElement =
      '//*[contains(text(),"Date of Birth")]/following-sibling::td';

    this.subject_actualResultElement =
      '//*[contains(text(),"Subjects")]/following-sibling::td';

    this.hobbies_actualResultElement =
      '//*[contains(text(),"Hobbies")]/following-sibling::td';

    this.uploadedFile_actualResultElement =
      '//*[contains(text(),"Picture")]/following-sibling::td';

    this.address_actualResultElement =
      '//*[contains(text(),"Address")]/following-sibling::td';

    this.stateAndCity_actualResultElement =
      '//*[contains(text(),"State and City")]/following-sibling::td';
  }

  /**
   * @description       This method changes the screen size.
   */
  async screenSize() {
    // Set the screen size to 1920-1080.
    await this.dsl.screenSize(1920, 1080);
  }

  /**
   * @description       This method navigates the user to the URL address.
   * @param url         Provide the URL address where the automation will redirect the user.
   */
  async navigate(url: string) {
    // Navigate to: https://demoqa.com/automation-practice-form .
    await this.dsl.navigateTo(url);
  }

  /**
   * @description       This method fills the input text element.
   * @param firstName   Provide the firstName value.
   */
  async firstNameFill_InputTextElement(firstName: string) {
    // Fill with correct data into the "First Name" input text element.
    await this.dsl.sendKeys(this.firstName_InputTextElement, firstName);
  }

  /**
   * @description       This method fills the input text element.
   * @param lastName    Provide the lastName value.
   */
  async lastNameFill_InputTextElement(lastName: string) {
    // Fill with valid data into the "Last Name" input text element.
    await this.dsl.sendKeys(this.lastName_InputTextElement, lastName);
  }

  /**
   * @description       This method fills the input text element.
   * @param email       Provide the email value.
   */
  async emailFill_InputTextElement(email: string) {
    // Fill with accurate data into the "Email" input text element.
    await this.dsl.sendKeys(this.email_InputTextElement, email);
  }

  /**
   * @description       This method checks the radio button.
   */
  async genderCheck_radopButton() {
    // Select the correct random option from the "Gender" section.
    await this.dsl.checkRadioButtonCheckBox(this.gender_RadioButton);
  }

  /**
   * @description       This method fills the input text element.
   * @param mobile      Provide the mobile value.
   */
  async mobileNumberFill_InputTextElement(mobile: string) {
    // Fill with valid data into the "Mobile Number" input text element.
    await this.dsl.sendKeys(this.mobilePhone_InputTextElement, mobile);
  }

  /**
   * @description       This method fills the input text element.
   * @param dateOfBirth Provide the dateOfBirth value.
   */
  async birthDaySelect_DropDownCalendar(dateOfBirth: string) {
    // Fill with accurate data into the "Date of Birth" input text element.
    await this.dsl.sendKeys(this.dateOfBirth_DropDownCalendar, dateOfBirth);
    // Send Excape to the element.
    await this.page.keyboard.press("Escape");
  }

  /**
   * @description       This method fills the input text element.
   * @param subject     Provide the subject value.
   */
  async subjectNumberFill_MultySelect(subject: string) {
    // The select random correct date for "Subjects".
    await this.dsl.sendKeys_MultySelect(
      this.subject_InputTextElement,
      subject,
      this.subject_SelectedValue
    );
  }

  /**
   * @description       This method selects value from multyselect drop-down list.
   */
  async hobbiesSelect_CheckBoxes() {
    // Check random correct value/s from the "Hobbies" section.
    await this.dsl.checkRadioButtonCheckBox(this.hobbies_CheckBox);
  }

  /**
   * @description              This method uploads file.
   * @param uploadFilePath     Provide the uploadFilePath value.
   */
  async uploadFile(uploadFilePath: string) {
    // Upload a random correct picture file.
    await this.dsl.uploadFile(this.uploadImage_Button, uploadFilePath);
  }

  /**
   * @description              This method fills the input text element.
   * @param currentAddress     Provide the currentAddress value.
   */
  async currentAddressFill_InputTextElement(currentAddress: string) {
    // Fill with correct data into the "Current Address" input text element.
    await this.dsl.sendKeys(
      this.currentAddress_InputTextElement,
      currentAddress
    );
  }

  /**
   * @description                             This method selects value from the drop-down list.
   * @param verifySelectedStateDropDownList   Provide the verifySelectedStateDropDownList value.
   */
  async stateSelect_DropDownList(verifySelectedStateDropDownList: string) {
    // Select the random correct date for the "State" drop-down list.
    await this.dsl.dropDown_ByDoubleClick(
      this.state_DropDownList,
      this.state_DropDownValue
    );
    // Verify that the input text element contains the sent text data.
    await this.dsl.getText(
      this.state_SelectedDropDownValue,
      verifySelectedStateDropDownList
    );
  }

  /**
   * @description                             This method selects value from the drop-down list.
   * @param verifySelectedCityDropDownList    Provide the verifySelectedCityDropDownList value.
   */
  async citySelect_DropDownList(verifySelectedCityDropDownList: string) {
    // Select an arbitrary valid date for the "City" drop-down list.
    await this.dsl.dropDown_ByDoubleClick(
      this.city_DropDownList,
      this.city_DropDownValue
    );

    // Verify that the input text element contains the sent text data.
    await this.dsl.getText(
      this.city_SelectedDropDownValue,
      verifySelectedCityDropDownList
    );
  }

  /**
   * @description     This method clicks over the button.
   */
  async submitPress_Button() {
    // We need to wait some time, because the button is enabled before the drop down list is selected.
    await this.ts.staticWait(5000);
    // Press the "Submit" button.
    await this.dsl.click(this.submit_Button);
    // We need to wait some time, because there is a delay in the response.
    await this.ts.staticWait(5000);
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
    await this.dsl.getText(
      this.name_actualResultElement,
      firstName + " " + lastName
    );
    await this.dsl.getText(this.email_actualResultElement, email);
    await this.dsl.getText(this.gender_actualResultElement, gender);
    await this.dsl.getText(this.mobilePhone_actualResultElement, mobile);
    await this.dsl.getText(
      this.dateOfBirth_actualResultElement,
      verifyDateOfBirth
    );
    await this.dsl.getText(this.subject_actualResultElement, subject);
    await this.dsl.getText(this.hobbies_actualResultElement, hobbies);
    await this.dsl.getText(this.uploadedFile_actualResultElement, uploadFile);
    await this.dsl.getText(this.address_actualResultElement, currentAddress);
    await this.dsl.getText(
      this.stateAndCity_actualResultElement,
      verifySelectedStateDropDownList + " " + verifySelectedCityDropDownList
    );
    // We need to wait some time, because there is a delay in the response.
    await this.ts.staticWait(3000);
  }
}

//09. Export the class.
export default Pom;
