/**
 * @description         That is a page object (PO) class for API tests.
 *                      There are examples of sending a request to GET and receiving a response to POST. That is only an example that shows how to use Playwright for API testing. You can combine API requests with standard web UI automation tests.
 *                      That is only an example of a structure for that kind of PO class.
 */

//01. Import libraries and classes.
// Import Playwright test library.
import { Page, expect } from "@playwright/test";
// Import BaseClass.
import { BaseClass } from "../../baseClass/baseClass";

//02. Declare a class.
class Pom extends BaseClass {
  //03. Declare a page variable.
  page: Page;

  //04. Declare a constructor.
  constructor(page: Page) {
    // Add 'super' because the constructor for the derived class must contain that call. Add 'page' argument inside.
    super(page);
    //05. Get access to the page property.
    this.page = page;
  }

  //06. Declare methods that handle the API calls.
  /**
   * @description       This method shows an example of using the GET method.
   * @param request     Provide the "request fixture". 
   * @param url         Provide the URL of the request. The URL should contain the domain URL and endpoint.
   * @return            We are returning the response as an object.
   */
  async getExample(request: any, url: string): Promise<any> {
    // Make a GET request.
    const response = await request.get(url);
    // Verify that the response code is 200.
    expect(response.status()).toBe(200);
    // Parse the JSON response.
    const responseBody = JSON.parse(await response.text());
    // Print the parsed response into the console log. Uncomment it for debugging.
    // console.log(responseBody);
    // Example for working with the response.
    expect(responseBody.books[0].title).toBe('Git Pocket Guide');
    expect(responseBody.books[0].pages).toBeTruthy();
    // Return the reponse.
    return responseBody;
  };

  /**
   * @description       This method shows an example of using the POST method.
   * @param request     Provide the "request fixture". 
   * @param url         Provide the URL of the request. The URL should contain the domain URL and endpoint.
   * @param username    Provide the username value.
   * @param password    Provude the password value.
   * @return            We are returning the response as an object.
   */
  async postExample(request: any, url: string, username: string, password: string): Promise<any> {
    // Make a POST request.
    const response = await request.post(url, {
      // Add body data to the request.
      data: {
        "userName": username,
        "password": password
      },
    });
    // Verify that the response code is 201.
    expect(response.status()).toBe(201);
    // Parse the JSON response.
    const responseBody = JSON.parse(await response.text());
    // Print the parsed response into the console log. Uncomment it for debugging.
    // console.log(responseBody);
    // Example for working with the response.
    expect(responseBody.userID).toBeTruthy();
    expect(responseBody.username).toBe(username);
    // Return the reponse.
    return responseBody;
  }
}

//07. Export the class.
export default Pom;
