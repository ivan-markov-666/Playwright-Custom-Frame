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
  email_InputTextElement: string;
  password_InputTextElement: string;
  signIn_Button: string;
  // Declare assertion elements and selectors.
  verifyUserIsLoggedIn: string;

  //05. Declare a constructor.
  constructor(page: Page) {
    // Add 'super' because the constructor for the derived class must contain that call. Add 'page' argument inside.
    super(page);
    //06. Get access to the page property.
    this.page = page;

    //07. Add selectors.
    this.email_InputTextElement = "#email";
    this.password_InputTextElement = "#password";
    this.signIn_Button = "//form/button";
    //08. Add assertion selectors.
    this.verifyUserIsLoggedIn = "//*[contains(text(),'My Content')]/parent::*//div/div/div";
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
   * @description       This method register a new user.
   * @param email       Provide the email value.
   * @param password    Provide the password value.
   * @usage             await pom.signIn(emailValue, passwordValue);
   */
  async signIn(email: string, password: string) {
    // Fill with correct data into the "First Name" input text element.
    await this.dsl.sendKeys(this.email_InputTextElement, email);
    // Fill with correct data into the "Last Name" input text element.
    await this.dsl.sendKeys(this.password_InputTextElement, password);
    // Press the "Sign In" button.
    await this.dsl.click(this.signIn_Button);
  }

  /**
   * @description         This method verifies if the user is logged in.
   * @param userFullName  Provide the user full name.
   * @usage               await pom.verifyUserLoggedIn(firstNameValue + " " + lastNameValue);
   */
  async verifyUserLoggedIn(userFullName: string) {
    //Verify that the user is logged in.
    await this.dsl.getInnerText(this.verifyUserIsLoggedIn, userFullName);
  }

}

//09. Export the class.
export default Pom;
