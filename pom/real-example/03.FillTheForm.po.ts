/**
 * @description         That is a page object (PO) class. That means we declare locators of the elements and methods we will use from the spec (test) class. If you don't know the "page object model" design pattern, it will be good to read about it.
 *                      That is a nice practice we can use for the page object class. This class is similar to previeus one ('02.FillTheForm.po'). The main difference is in the 'spec' class.
 *                        - We are declaring locators and selectors. We will call the locators from the spec (test) class. 
 *                        - We are not inhering the BaseClass.  
 *                        - We are not describing any test functions here.
 */

//01. Import classes.
import { Page, Locator } from "@playwright/test";

//02. Declare a class.
class Pom {
  //03. Declare a page variable.
  page: Page;
  //04. Declare elements and selectors.
  firstName_InputTextElement: Locator;
  lastName_InputTextElement: Locator;
  email_InputTextElement: Locator;
  gender_RadioButton: string; // That is an example of a declaration of selector. The selector variable uses using "string" type of data.
  mobilePhone_InputTextElement: Locator;
  dateOfBirth_DropDownCalendar: string;
  dateOfBirth_DropDownValue: string;
  subject_InputTextElement: Locator;
  subject_SelectedValue: Locator;
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
  hobbies_actualResultElement: Locator;
  uploadedFile_actualResultElement: Locator;
  address_actualResultElement: Locator;
  stateAndCity_actualResultElement: Locator;

  //05. Declare a constructor.
  constructor(page: Page) {
    //06. Get access to the page property.
    this.page = page;

    //07. Add elements and selectors.
    this.firstName_InputTextElement = page.locator("#firstName");
    this.lastName_InputTextElement = page.locator("#lastName");
    this.email_InputTextElement = page.locator("#userEmail");
    this.gender_RadioButton =
      '//*[@id="gender-radio-1"]/following-sibling::label';
    this.mobilePhone_InputTextElement = page.locator("#userNumber");
    this.dateOfBirth_DropDownCalendar = "#dateOfBirthInput";
    this.dateOfBirth_DropDownValue = '(//div[@role="option"])[1]';
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
}

//09. Export the class.
export default Pom;
