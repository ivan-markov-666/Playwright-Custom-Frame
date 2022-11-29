/**
 * @description       That is a spec (test) class for API tests.
 *                    There are examples of calling functions containing tests for GET and POST.
 *                    That is only an example of a structure for that kind of test.
 */

//01. Import libraries and classes.
// Import Playwright test library.
import { test, expect } from "@playwright/test";
// Import faker-js library. Data-Driven Testing with dynamically generated data using faker-js.
import { faker } from "@faker-js/faker";
// Import BaseClass.
import { BaseClass } from "../../baseClass/baseClass";
// Import the PO class.
import PomExample from "../../pom/api/api.po";

//02. Create the "describe" block.
test.describe("API examples.", () => {
  let baseClass: BaseClass; // Create a new variable for baseClass. Add specific type (of the BaseClass class) to enable the suggestions.
  let pom: PomExample; // Create a new variable for pom. Add specific type (of the PomExample class) to enable the suggestions).
  let getUrl: string; // Create a new variable for getUrl.
  let postUrl: string; // Create a new variable for postUrl.
  let putUrl: string; // Create a new variable for putUrl.
  let uniqueUserName: string; // Create a new variable for uniqueUserName.
  let password: string; // Create a new variable for password.
  let currentTime_UnixFormat: string; // Create a new variable for currentTime_UnixFormat.

  //03. Create the "beforeEach" block.
  test.beforeEach(async ({ page }) => {
    // Create a new PomExample and include page.
    pom = new PomExample(page);
    // Create a new baseClass and include page.
    baseClass = new BaseClass(page);
    //04. Declare local variables.
    currentTime_UnixFormat = baseClass.ts.currentTimeUnixFormat().toString();
    uniqueUserName = faker.name.firstName() + currentTime_UnixFormat;
    password = "Password123!@$";
    getUrl = baseClass.url + "BookStore/v1/Books";
    postUrl = baseClass.url + "Account/v1/User";
    putUrl = baseClass.url + "/BookStore/v1/Books/";
  });

  // 05. Create the "test" blocks.
  test("Example shows how to use GET request.", async ({ request }) => {
    // Call the method from the page object model class.
    let bookStore_Response = await pom.getExample(request, getUrl);
    // Print value from the response.
    console.log("ISBN: " + await bookStore_Response.books[0].isbn);
  });

  test("Example shows how to use POST request.", async ({ request }) => {
    // Call the method from the page object model class.
    let createNewUser_Response = await pom.postExample(request, postUrl, uniqueUserName, password);
    // Print value from the response.
    console.log("userID: " + await createNewUser_Response.userID);
  });
});