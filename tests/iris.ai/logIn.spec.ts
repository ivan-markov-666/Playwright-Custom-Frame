//01. Import libraries and classes.
// Import Playwright test library.
import { test } from "@playwright/test";
// Import BaseClass.
import { BaseClass } from "../../baseClass/baseClass";
// Import the PO class.
import Pom from "../../pom/iris.ai/logIn.po";

//02. Create the "describe" block.
test.describe("Log in with already registered user.", () => {
  let baseClass: BaseClass; // Create a new variable for baseClass. Add specific type (of the BaseClass class) to enable the suggestions.
  let pom: Pom; // Create a new variable for pom. Add specific type (of the PomExample class) to enable the suggestions).

  //03. Define data.
  // Define testing data.
  let loginUrl: string = process.env.IRIS_URL + "auth/sign-in";
  let emailValue: string = process.env.IRIS_EMAIL as string;
  let passwordValue: string = process.env.IRIS_PASSWORD as string;
  let firstNameValue: string = process.env.IRIS_FIRSTNAME as string;
  let lastNameValue: string = process.env.IRIS_LASTNAME as string;

  //04. Create the "beforeEach" block.
  test.beforeEach(async ({ page }) => {
    // Create a new PomExample and include page.
    pom = new Pom(page);
    // Create a new baseClass and include page.
    baseClass = new BaseClass(page);

    //05. Declare local variables.

    //06. Precondition Steps.
    // 0. Set the screen size to 1920-1080.
    await pom.screenSize();
    // 1. Navigate to: https://rspace.iris.ai/auth/sign-in .
    await pom.navigate(loginUrl);
  });

  //07. Create the "test" block.
  test("Fill the form with valid data.", async () => {
    // 2. Fill with correct data into the login form and press the "Sign In" button.
    await pom.signIn(emailValue, passwordValue);
    // // 3. Verify that the user is logged in by checking the users full name, that is displayed in the top right corner.
    await pom.verifyUserLoggedIn(firstNameValue + " " + lastNameValue);
  });
});