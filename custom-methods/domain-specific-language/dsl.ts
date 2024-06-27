/**
 * @description     This file contains the Domain Specific Language (DSL) methods.
 *                  The methods are used to create a higher level of abstraction and readability in the test scripts.
 *                  The methods are used to interact with the browser and the web application.
 *                  The methods are used in the test scripts to perform actions like clicking, typing, reading text, etc.
 */

//01. Import libraries and classes.
// Import the Playwright locator.
import { Page, FrameLocator, expect, Locator, BrowserContext } from "@playwright/test"; // Add this to have suggestions in the spec class.
import { Configuration } from "../../configs/configuration"; // Add this to have suggestions in the spec class.
import { TsMethods } from "../other-methods/tsMethods";
import { PositiveInteger, Url, LocatorOrElement, Selector, Element, CheckOrClickAction, UnCheckOrUnClickAction, KeyboardKeys } from "./dsl.d";
import assert from 'assert';

//02. Create the DslHelper class.
/**
 * @description This class contains methods used in Dsl class. Methods defined in that class will be used only in Dsl class.
 */
class DslHelper {
  //02.1. Declare variables.
  // Declare the page variables.
  private page: Page;
  // Declare the tsMethods variable.
  private tsMethods: TsMethods;

  //02.2. Create the constructor.
  /**
   * @description             The constructor method is used to create a new instance of the DslHelper class.
   * @param page              The page object is used to interact with a single tab, frame, or iframe in the browser.
   * @param tsMethods         The tsMethods object is used to call the methods from the TsMethods class.
   */
  constructor(page: Page, tsMethods: TsMethods) {
    this.page = page;
    this.tsMethods = tsMethods;
  }

  //02.3. Define methods.
  /**
   * @description             This method resolves the element.
   * @param locatorOrElement  Provide a locator (string) or element (object).
   * @returns                 The method returns the element.
   * @usage                   await dslHelper.resolveElement(locatorOrElement);
   */
  async resolveElement(
    locatorOrElement: LocatorOrElement,
    pageInstance: Page = this.page
  ): Promise<Element> {
    // Declare an internal variable for assigning the element value.
    let element: Element = null;
    // If the provided value is a string, this is just a selector.
    if (typeof locatorOrElement === "string") {
      // We need to transform this selector into an element.
      element = pageInstance.locator(locatorOrElement);
    }
    // If the provided value is an object containing 'waitFor' property, this is a Playwright locator object.
    else if (locatorOrElement && 'waitFor' in locatorOrElement) {
      // So we don't need to do anything else unique.
      element = locatorOrElement;
    }
    // Validate input type: This block handles unexpected input types that do not meet the function's requirements.
    // If the input is neither a string (selector) nor a Locator object with a 'waitFor' property, throw an error.
    else {
      // Record the error if needed.
      this.tsMethods.errorLog(
        "You have entered a not supported data type. Please provide a locator (string) or element (object)."
      );
      throw new Error(`You have entered a not supported data type. Please provide a locator (string) or element (object).`);
    }
    // Return the element.
    return element;
  }
}

//03. Create the Dsl class.
/**
 * @description This class contains Domain Specific Language methods.
 */
export class Dsl {
  //03.1. Declare variables.
  page: Page;
  context: any;
  config: Configuration;
  ts: TsMethods;
  dslHelper: DslHelper;

  //03.2. Create the constructor.
  /**
   * @description   This constructor method is used to create a new instance of the Dsl class.
   * @param page    The page object is used to interact with a single tab, frame, or iframe in the browser.
   * @param context The context object is used to interact with the browser context.
   */
  constructor(page: Page, context?: any) {
    this.page = page;
    this.context = context;
    this.ts = new TsMethods(page);
    this.config = new Configuration();
    this.dslHelper = new DslHelper(page, this.ts);
  }

  //03.3. Define methods.
  /**
   * @description               This function changes the screen size.
   * @param widthSize           Provide the number for the width screen size.
   * @param heightSize          Provide the number for the height screen size.
   * @param pageInstance        Optional. Provide the page instance. The default value is set to the current page. If you want to use this method with a new page, provide the new page instance.
   * @usage                     - Usage:
   *                              {constructorKeyword}.screenSize({widthSize}, {heightSize});
   * @example                   Example: Provide values for screen width and height.
   *                              await dsl.screenSize(1920, 1080);
   */
  async screenSize(
    widthSize: PositiveInteger,
    heightSize: PositiveInteger,
    pageInstance: Page = this.page
  ): Promise<void> {
    try {
      // If the numbers are positive numbers...
      if (widthSize > 0 || heightSize > 0) {
        // Change the screen size.
        await pageInstance.setViewportSize({
          width: widthSize,
          height: heightSize,
        });
        // Add the information message.
        this.ts.informLog(
          this.config.beginInformMessage +
          "The screen size was set to: '" +
          widthSize +
          "' width and '" +
          heightSize +
          "' height."
        );
      }
      // If the numbers are negative or it is 0.
      else if (widthSize <= 0 || heightSize <= 0) {
        this.ts.errorLog(
          "You entered a negative value. Please enter a positive integer value." +
          this.screenSize.name + " " +
          __filename.split(__dirname + "/").pop()
        );
        throw new Error(`You entered a negative value. Please enter a positive integer value.`);
      }
      // If the numbers are not an integer.
      else if (!Number.isInteger(widthSize) || !Number.isInteger(heightSize)) {
        this.ts.errorLog(
          "You need to enter an integer value." +
          this.screenSize.name + " " +
          __filename.split(__dirname + "/").pop()
        );
        throw new Error(`You need to enter an integer value.`);
      }
      // Everything else...
      else {
        this.ts.errorLog(
          "You entered an invalid value. Please provide a positive integer number for two parameters." +
          this.screenSize.name + " " +
          __filename.split(__dirname + "/").pop()
        );
        throw new Error(`You entered an invalid value. Please provide a positive integer number for two parameters.`);
      }
    } catch (error) {
      // Create the error log and show it to the UI. Show the function name, the class where the function is located and the cached error.
      this.ts.errorLog(
        "Failed to set the screen size. " +
        this.screenSize.name + " " +
        __filename.split(__dirname + "/").pop() + " " +
        await error
      );
      throw new Error(`Failed to set the screen size: ${await error}`);
    }
  }

  /**
   * @description               This function navigates to the URL.
   * @param url                 Provide the destination URL.
   * @param pageInstance        Optional. Provide the page instance. The default value is set to the current page. If you want to use this method with a new page, provide the new page instance.
   * @usage                     - Usage:
   *                              {constructorKeyword}.navigateTo({URL address});
   * @example                   Example: Provide the URL address.
   *                              await dsl.navigateTo("https://domainurladdress/endpoint/");
   */
  async navigateTo(
    url: Url,
    pageInstance: Page = this.page
  ): Promise<void> {
    try {
      // Provide the destination URL.
      await pageInstance.goto(url);
      // Verify that the browser loads the correct URL.
      await expect(pageInstance).toHaveURL(url);
      // Add the information message.
      this.ts.informLog(
        this.config.beginInformMessage +
        "The user was redirected to the URL address: " +
        url
      );
    } catch (error) {
      // Create the error log and show it to the UI. Show the function name, the class where the function is located and the cached error.
      this.ts.errorLog(
        "Failed to navigate to the URL. " +
        this.navigateTo.name + " " +
        __filename.split(__dirname + "/").pop() + " " +
        await error
      );
      throw new Error(`Failed to navigate to the URL: ${await error}`);
    }
  }

  /**
   * @description               This function navigates back to the previous URL.
   * @param verifyUrl           Provide the expected URL address.
   * @param pageInstance        Optional. Provide the page instance. The default value is set to the current page. If you want to use this method with a new page, provide the new page instance.
   * @usage                     - Usage:
   *                              {constructorKeyword}.goBack({expected URL address});
   * @example                   Example: Provide the expected URL address.
   *                              await dsl.goBack("https://domainurladdress/previous/url/");
   */
  async goBack(
    verifyUrl: Url,
    pageInstance: Page = this.page
  ): Promise<void> {
    try {
      // Navigate back to the previous URL.
      await pageInstance.goBack();
      // Verify that the browser loads the correct URL.
      await expect(pageInstance).toHaveURL(verifyUrl);
      // Add the information message.
      this.ts.informLog(
        this.config.beginInformMessage +
        "The use was redirected to the previous URL address: " +
        verifyUrl
      );
    } catch (error) {
      // Create the error log and show it to the UI. Show the function name, the class where the function is located and the cached error.
      this.ts.errorLog(
        "Failed to navigate back to the previous URL. " +
        this.goBack.name + " " +
        __filename.split(__dirname + "/").pop() + " " +
        await error
      );
      throw new Error(`Failed to navigate back to the previous URL: ${await error}`);
    }
  }

  /**
   * @description               This function navigates to the forward URL.
   * @param verifyUrl           Provide the expected URL address.
   * @param pageInstance        Optional. Provide the page instance. The default value is set to the current page. If you want to use this method with a new page, provide the new page instance.
   * @usage                     - Usage:
   *                              {constructorKeyword}.goForward({expected URL address});
   * @example                   Example: Provide the expected URL address.
   *                              await dsl.goForward("https://domainurladdress/forward/url/");
   */
  async goForward(
    verifyUrl: Url,
    pageInstance: Page = this.page
  ): Promise<void> {
    try {
      // Navigate to the forward URL.
      await pageInstance.goForward();
      // Verify that the browser loads the correct URL.
      assert.strictEqual(pageInstance.url(), verifyUrl, 'Current page URL does not match the expected URL.');
      // Add the information message.
      this.ts.informLog(
        this.config.beginInformMessage +
        "The user was redirected to the forward URL address: " +
        verifyUrl
      );
    } catch (error) {
      // Create the error log and show it to the UI. Show the function name, the class where the function is located and the cached error.
      this.ts.errorLog(
        "Failed to navigate forward to the URL. " + 
        this.goForward.name + " " +
        __filename.split(__dirname + "/").pop() + " " +
        await error
      );
      throw new Error(`Failed to navigate forward to the URL: ${await error}`);
    }
  }

  /**
   * @description               This function is responsible for selecting an element and verifying that the element is ready to be used.
   * @param locatorOrElement    Provide a locator (string) or element (object). The method uses a mechanism to use a locator (string) and an element (object). That is useful if we want to provide just a locator or give the whole element (in cases when we want to use this method with iFrames or want to use the method with other browser windows).
   * @param timeoutPeriod       Optional. Provide the time out in miliseconds.
   * @param pageInstance        Optional. Provide the page instance. The default value is set to the current page. If you want to use this method with a new page, provide the new page instance.
   * @return                    We are returning the element.
   * @usage                     - Usage 1: Use the method by providing a locator parameter and timeout period.
   *                              {constructorKeyword}.element({locator}, {timeout});
   *                            - Usage 2: Use the method by providing a locator parameter without timeout period.
   *                              {constructorKeyword}.element({locator});
   *                            - Usage 3: Use the method by providing an element parameter and timeout period.
   *                              {constructorKeyword}.element({element}, {timeout});
   *                            - Usage 4: Use the method by providing an element parameter without timeout period.
   *                              {constructorKeyword}.element({element});
   * @example                   Example 1: Provide the locator and timeout.
   *                              let elementName: any = page.locator("#id");
   *                              await dsl.element(elementName, 10000);
   *                            Example 2: Provide the locator without the timeout.
   *                              let elementName: any = page.locator("#id");
   *                              await dsl.element(elementName);
   *                            Example 3: Provide the element and timeout.
   *                              await dsl.element("#id", 10000);
   *                            Example 4: Provide the element without timeout.
   *                               await dsl.element("#id");
   */
  async element(
    locatorOrElement: LocatorOrElement,
    timeoutPeriod?: PositiveInteger,
    pageInstance: Page = this.page
  ): Promise<Locator> {
    try {
      // Get the element, no matter if it is a locator or an object (Playwright locator), we will will work with Playwright locator object as a result.
      const element = await this.dslHelper.resolveElement(locatorOrElement, pageInstance);

      // If the element is null, we can continue with the verification.
      if (!element) {
        throw new Error("The element value is null. Please provide a valid element.");
      }

      // Wait for the element to be visible.
      await element.waitFor({ state: "visible", timeout: timeoutPeriod });
      // Verify that the element is visible.
      await expect(element).toBeVisible({ timeout: timeoutPeriod });
      // Verify that the element is not hidden.
      await expect(element).not.toBeHidden({ timeout: timeoutPeriod });
      // Verify that the element is enabled.
      await expect(element).toBeEnabled({ timeout: timeoutPeriod });
      // Verify that the element is not disabled.
      await expect(element).not.toBeDisabled({ timeout: timeoutPeriod });
      // Verify that the element is the only one in the DOM tree.
      await expect(element).toHaveCount(1, { timeout: timeoutPeriod });

      // Add the information message.
      if (timeoutPeriod == null) {
        this.ts.informLog(this.config.beginInformMessage + "The element was selected.");
      } else {
        this.ts.informLog(this.config.beginInformMessage + "The element was selected. Timeout was set to: " + timeoutPeriod + " milliseconds.");
      }
      // Return the selected element.
      return element;
    } catch (error) {
      // Throw an error using the error log method.
      this.ts.errorLog(
        "Failed to retrieve or interact with the element. " + 
        this.element.name + " " + 
        __filename.split(__dirname + "/").pop() + " " + 
        await error
      );
      throw new Error("Failed to retrieve or interact with the element: " + await error);
    }
  }

  async elementLightAssertion(
    locatorOrElement: LocatorOrElement,
    timeoutPeriod?: PositiveInteger,
    pageInstance: Page = this.page
  ): Promise<Locator> {
    try {
      // Get the element, no matter if it is a locator or an object (Playwright locator), we will will work with Playwright locator object as a result.
      const element = await this.dslHelper.resolveElement(locatorOrElement, pageInstance);

      // If the element is null, we can continue with the verification.
      if (!element) {
        throw new Error("The element value is null. Please provide a valid element.");
      }

      // Verify that the element is the only one in the DOM tree.
      await expect(element).toHaveCount(1, { timeout: timeoutPeriod });

      // Add the information message.
      if (timeoutPeriod == null) {
        this.ts.informLog(this.config.beginInformMessage + "The element was selected.");
      } else {
        this.ts.informLog(this.config.beginInformMessage + "The element was selected. Timeout was set to: " + timeoutPeriod + " milliseconds.");
      }
      // Return the selected element.
      return element;
    } catch (error) {
      // Throw an error using the error log method.
      this.ts.errorLog(
        "Failed to retrieve or interact with the element. " +
        this.element.name + " " +
        __filename.split(__dirname + "/").pop() + " " +
        await error
      ); 
      throw new Error("Failed to retrieve or interact with the element: " + error);
    }
  }

  /**
 * @description               This function takes a locator and returns an array of elements found by that locator.
 * @param locatorStr          The locator string to find the elements.
 * @param pageInstance        Optional. Provide the page instance. The default value is set to the current page. If you want to use this method with a new page, provide the new page instance.
 * @returns                   A promise that resolves to an array of elements found by the locator.
 */
  async getElementsByLocator(
    locatorStr: Selector,
    pageInstance: Page = this.page
  ): Promise<Locator[]> {
    try {
      // Find the locator
      const locator = pageInstance.locator(locatorStr);

      // Get the count of elements matching the locator
      const count = await locator.count();

      // Create an array to hold the locators
      const elements: Locator[] = [];

      // Loop through each element and add to the array
      for (let i = 0; i < count; i++) {
        elements.push(locator.nth(i));
      }

      this.ts.informLog(`Found ${count} elements matching the locator: ${locatorStr}`);

      // Return the array of locators
      return elements;
    } catch (error) {
      // Throw an error using the error log method.
      this.ts.errorLog(
        "Failed to retrieve or interact with the elements. " +
        this.getElementsByLocator.name + " " +
        __filename.split(__dirname + "/").pop() + " " +
        await error
      );
      throw new Error("Failed to retrieve or interact with the elements: " + error);
    }
  }

  /**
   * @description                   This method gets the attribute value of an element.
   * @param locatorOrElement        Provide a locator (string) or element (object). The method uses a mechanism to use a locator (string) and an element (object). That is useful if we want to provide just a locator or give the whole element (in cases when we want to use this method with iFrames or want to use the method with other browser windows).
   * @param attributeName           Provide the attribute name.
   * @param expectedAttributeValue  Optional. Provide the expected attribute value.
   * @param pageInstance            Optional. Provide the page instance. The default value is set to the current page. If you want to use this method with a new page, provide the new page instance.
   * @return                        The method returns the attribute value.
   * @usage                         - Usage 1: Use the method by providing a locator parameter of an element we want to inspect, providing an attribute name and expected attribute value.
   *                                  {constructorKeyword}.getAttribute({locator}, {attribute-name}, {expected-attribute-value});
   *                                - Usage 2: Use the method by providing a locator parameter of an element we want to inspect, providing an attribute name without expected attribute value.
   *                                  {constructorKeyword}.getAttribute({locator}, {attribute-name});
   *                                - Usage 3: Use the method by providing an element parameter we want to inspect, providing an attribute name and expected attribute value.
   *                                  {constructorKeyword}.getAttribute({element}, {attribute-name}, {expected-attribute-value});
   *                                - Usage 4: Use the method by providing an element parameter we want to inspect, providing an attribute name without expected attribute value.
   *                                  {constructorKeyword}.getAttribute({element}, {attribute-name});
   * @example                       Example 1: Provide the locator, attribute name and expected attribute value.
   *                                  await dsl.getAttribute("#id", "attribute-name", "expected-attribute-value");
   *                                Example 2: Provide the locator, attribute name without expected attribute value.
   *                                  let attribute = await dsl.getAttribute("#id", "attribute-name");
   *                                  await expect(attribute).toEqual("expected-attribute-value");
   *                                Example 3: Provide the element, attribute name and expected attribute value.
   *                                  let inspectedElement: any = page.locator("#id");
   *                                  await dsl.getAttribute(inspectedElement, "attribute-name", "expected-attribute-value");
   *                                Example 4: Provide the element, attribute name without expected attribute value.
   *                                  let inspectedElement: any = page.locator("#id");
   *                                  let attribute = await dsl.getAttribute(inspectedElement, "attribute-name");
   *                                  await expect(attribute).toEqual("expected-attribute-value");
   */
  async getAttribute(
    locatorOrElement: LocatorOrElement,
    attributeName: string,
    expectedAttributeValue?: string,
    pageInstance: Page = this.page
  ): Promise<string | null> {
    try {
      // Get the element, no matter if it is a locator or an object (Playwright locator), we will will work with Playwright locator object as a result.
      const element = await this.element(locatorOrElement, this.config.elementTimeOut, pageInstance);

      // Get the attribute value from the element.
      let attributeValue = await element.getAttribute(attributeName);
      // Throw an error if the attribute value is null and the attribute value is not like the expected attribute value.
      if (expectedAttributeValue != null && attributeValue !== expectedAttributeValue) {
        throw new Error(`Expected attribute value '${expectedAttributeValue}', but got '${attributeValue}'`);
      }

      // Add the information message.
      this.ts.informLog(
        this.config.beginInformMessage +
        "The automated test reads the attribute value from the used element. The attribute value is: '" +
        attributeValue +
        "'."
      );

      // Return the attribute value.
      return attributeValue;
    } catch (error) {
      // Create the error log and show it to the UI. Show the function name, the class where the function is located and the cached error.
      this.ts.errorLog(
        "Failed to check the radio button or checkbox. " +
        this.getAttribute.name + " " +
        __filename.split(__dirname + "/").pop() + " " +
        await error
      );
      throw new Error(`Failed to get the attribute value: ${await error}`);
    }
  }

  /**
   * @description               This method gets a text from an element that contains the text.
   * @param locatorOrElement    Provide a locator (string) or element (object). The method uses a mechanism to use a locator (string) and an element (object). That is useful if we want to provide just a locator or give the whole element (in cases when we want to use this method with iFrames or want to use the method with other browser windows).
   * @param expectedTextValue   Optional. Provide a string value to verify that the inspected text is like provided parameter (expected value).
   * @param pageInstance        Optional. Provide the page instance. The default value is set to the current page. If you want to use this method with a new page, provide the new page instance.
   * @return                    We return the text (string) value we read from the inspected element.
   * @usage                     - Usage 1: Use the method by providing a locator parameter and expected text value.
   *                              {constructorKeyword}.getInnerText({locator}, "expected text value");
   *                            - Usage 2: Use the method by providing a locator parameter without expected text value.
   *                              {constructorKeyword}.getInnerText({locator});
   *                            - Usage 3: Use the method by providing an element parameter and expected text value.
   *                              {constructorKeyword}.getInnerText({element}, "expected text value");
   *                            - Usage 4: Use the method by providing a element parameter without expected text value.
   *                              {constructorKeyword}.getInnerText({element});
   * @example                   Example 1: Provide the locator and expected text value.
   *                              await dsl.getInnerText("#id", "expected text value");
   *                            Example 2: Provide the locator without expected text value.
   *                              dsl.getInnerText("#id");
   *                            Example 3: Provide the element and expected text value.
   *                              let elementName = await dsl.element("#id", 10000);
   *                              await dsl.getInnerText(elementName, "expected text value");
   *                            Example 4: Provide the element without expected text value.
   *                              let elementName = await dsl.element("#id", 10000);
   *                              await dsl.getInnerText(elementName);
   */
  async getInnerText(
    locatorOrElement: LocatorOrElement,
    expectedTextValue?: string,
    pageInstance: Page = this.page
  ): Promise<string> {
    try {
      // Get the element, no matter if it is a locator or an object (Playwright locator), we will will work with Playwright locator object as a result.
      const element = await this.element(locatorOrElement, this.config.elementTimeOut, pageInstance);

      // Get the text of an inspected element and assign it to a variable.
      let elementTextValue = await element.innerText();
      // Make a verification. If there is provided string for the expected value parameter - assert to verify that the inspected element contains the exact text.
      if (expectedTextValue != null) {
        expect(elementTextValue).toEqual(expectedTextValue);
      }

      // Add the information message.
      this.ts.informLog(
        this.config.beginInformMessage +
        "The automated test reads the element text value. The element text value is: '" +
        (elementTextValue) +
        "'."
      );

      // Return the containing element text.
      return elementTextValue;
    } catch (error) {
      // Create the error log and show it to the UI. Show the function name, the class where the function is located and the cached error.
      this.ts.errorLog(
        "Failed to check the radio button or checkbox. " +
        this.getInnerText.name + " " +
        __filename.split(__dirname + "/").pop() + " " +
        await error
      );
      throw new Error(`Failed to get the inner text: ${await error}`);
    }
  }

  /**
   * @description               This method gets all texts from an element that contains the text. We are using the Playwright method "allTextContents()". This (our) method returns a list with values. In our method - we are using only the first value from the list. So you need to give a selector (or element) with only one coordinate in the DOM tree.
   * @param locatorOrElement    Provide a locator (string) or element (object). The method uses a mechanism to use a locator (string) and an element (object). That is useful if we want to provide just a locator or give the whole element (in cases when we want to use this method with iFrames or want to use the method with other browser windows).
   * @param expectedTextValue   Optional. Provide a string value to verify that the inspected text is like provided parameter (expected value).
   * @param pageInstance        Optional. Provide the page instance. The default value is set to the current page. If you want to use this method with a new page, provide the new page instance.
   * @return                    We return the text (string) value we read from the inspected element.
   * @usage                     - Usage 1: Use the method by providing a locator parameter and expected text value.
   *                              {constructorKeyword}.getText({locator}, "expected text value");
   *                            - Usage 2: Use the method by providing a locator parameter without expected text value.
   *                              {constructorKeyword}.getText({locator});
   *                            - Usage 3: Use the method by providing an element parameter and expected text value.
   *                              {constructorKeyword}.getText({element}, "expected text value");
   *                            - Usage 4: Use the method by providing a element parameter without expected text value.
   *                              {constructorKeyword}.getText({element});
   * @example                   Example 1: Provide the locator and expected text value.
   *                              await dsl.getText("#id", "expected text value");
   *                            Example 2: Provide the locator without expected text value.
   *                              dsl.getText("#id");
   *                            Example 3: Provide the element and expected text value.
   *                              let elementName = await dsl.element("#id", 10000);
   *                              await dsl.getText(elementName, "expected text value");
   *                            Example 4: Provide the element without expected text value.
   *                              let elementName = await dsl.element("#id", 10000);
   *                              await dsl.getText(elementName);
   */
  async getText(
    locatorOrElement: LocatorOrElement,
    expectedTextValue?: string,
    pageInstance: Page = this.page
  ): Promise<string> {
    try {
      // Get the element, no matter if it is a locator or an object (Playwright locator), we will will work with Playwright locator object as a result.
      const element = await this.element(locatorOrElement, this.config.elementTimeOut, pageInstance);

      // Get the text of an inspected element and assign it to a variable. As you can see, we are getting the first value from the list because "all text contents" return an array list.
      let elementTextValue: string = (await element.allTextContents())[0];

      // Make a verification. If there is provided string for the expected value parameter - assert to verify that the inspected element contains the exact text.
      if (expectedTextValue != null) {
        expect(elementTextValue).toEqual(expectedTextValue);
      }

      // Add the information message.
      this.ts.informLog(
        this.config.beginInformMessage +
        "The automated test reads the element text value. The element text value is: '" +
        elementTextValue +
        "'."
      );

      // Return the containing element text.
      return elementTextValue;
    } catch (error) {
      // Create the error log and show it to the UI. Show the function name, the class where the function is located and the cached error.
      this.ts.errorLog(
        "Failed to check the radio button or checkbox. " +
        this.getText.name + " " +
        __filename.split(__dirname + "/").pop() + " " +
        await error
      );
      throw new Error(`Failed to get the text: ${await error}`);
    }
  }

  /**
   * @description               This method gets all texts from an element that contains the text. We are using the Playwright method "allTextContents()". This (our) method returns a list with values.
   * @param locatorOrElement    Provide a locator (string) or element (object). The method uses a mechanism to use a locator (string) and an element (object). That is useful if we want to provide just a locator or give the whole element (in cases when we want to use this method with iFrames or want to use the method with other browser windows).
   * @param sequenceNumber      Provide the sequence number of the list, that we want to inspect.
   * @param expectedTextValue   Optional. Provide a string value to verify that the inspected text is like provided parameter (expected value).
   * @param pageInstance        Optional. Provide the page instance. The default value is set to the current page. If you want to use this method with a new page, provide the new page instance.
   * @return                    We return the text (string) value we read from the inspected element.
   * @usage                     - Usage 1: Use the method by providing a locator parameter, sequence number and expected text value.
   *                              {constructorKeyword}.getAllTexts({locator}, {number} "expected text value");
   *                            - Usage 2: Use the method by providing a locator parameter, sequence number without expected text value.
   *                              {constructorKeyword}.getAllTexts({locator}, {number});
   *                            - Usage 3: Use the method by providing an element parameter, sequence number and expected text value.
   *                              {constructorKeyword}.getAllTexts({element}, {number}, "expected text value");
   *                            - Usage 4: Use the method by providing a element parameter, sequence number without expected text value.
   *                              {constructorKeyword}.getAllTexts({element}, {number});
   * @example                   Example 1: Provide the locator, sequence number and expected text value.
   *                              await dsl.getAllTexts("#id", 0, "expected text value");
   *                            Example 2: Provide the locator, sequence number without expected text value.
   *                              dsl.getAllTexts("#id", 1);
   *                            Example 3: Provide the element, sequence number and expected text value.
   *                              let elementName = await dsl.element("#id", 10000);
   *                              await dsl.getAllTexts(elementName, 2, "expected text value");
   *                            Example 4: Provide the element, sequence number without expected text value.
   *                              let elementName = await dsl.element("#id", 10000);
   *                              await dsl.getAllTexts(elementName, 3);
   */
  async getAllTexts(
    locatorOrElement: LocatorOrElement,
    sequenceNumber: PositiveInteger,
    expectedTextValue?: string,
    pageInstance: Page = this.page
  ): Promise<string> {
    try {
      // Get the element, no matter if it is a locator or an object (Playwright locator), we will will work with Playwright locator object as a result.
      const element = await this.element(locatorOrElement, this.config.elementTimeOut, pageInstance);

      // Get the list length.
      let listLenght = (await element.allTextContents()).length;

      // Check if the provided number is contained in the list length.
      if (sequenceNumber <= (listLenght)) {
        // Get the text of an inspected element and assign it to a variable. As you can see, we are getting the first value from the list because "all text contents" return an array list.
        let elementTextValue: string = (await element.allTextContents())[sequenceNumber];

        // Make a verification. If there is provided string for the expected value parameter - assert to verify that the inspected element contains the exact text.
        if (expectedTextValue != null) {
          expect(elementTextValue).toEqual(expectedTextValue);
        }

        // Add the information message.
        this.ts.informLog(
          this.config.beginInformMessage +
          "The automated test reads the element text value. The element text value is: '" +
          elementTextValue +
          "'."
        );

        // Return the containing element text.
        return elementTextValue;
      }
      // Else - we need to provide a valid number.
      else {
        this.ts.errorLog(
          "It seems that you call value that doesn't exist. The list size is '" +
          (await listLenght) +
          "'. Please provide number between 0 and " +
          (await listLenght) +
          "."
        );
        throw new Error(`It seems that you call value that doesn't exist. The list size is '${listLenght}'. Please provide number between 0 and ${listLenght}.`);
      }
    } catch (error) {
      // Create the error log and show it to the UI. Show the function name, the class where the function is located and the cached error.
      this.ts.errorLog(
        "Failed to check the radio button or checkbox. " +
        this.getAllTexts.name + " " +
        __filename.split(__dirname + "/").pop() + " " +
        await error
      );
      throw new Error(`Failed to get the text: ${await error}`);
    }
  }

  /**
   * @description               This method sends a text to the input text element.
   * @param locatorOrElement    Provide a locator (string) or element (object). The method uses a mechanism to use a locator (string) and an element (object). That is useful if we want to provide just a locator or give the whole element (in cases when we want to use this method with iFrames or want to use the method with other browser windows).
   * @param text                Provide the text that we will send to the input text element.
   * @param pageInstance        Optional. Provide the page instance. The default value is set to the current page. If you want to use this method with a new page, provide the new page instance.
   * @usage                     - Usage 1: Use the method by providing a locator parameter.
   *                              {constructorKeyword}.sendKeys({locator}, "the text we send");
   *                            - Usage 2: Use the method by providing an element parameter.
   *                              {constructorKeyword}.sendKeys({element}, "the text we send");
   * @example                   Example 1: Provide the locator and the text value.
   *                              await dsl.sendKeys("#id", "the text we send");
   *                            Example 2: Provide the element and the text value.
   *                              let elementName: any = dsl.element("#userName");
   *                              await dsl.sendKeys(await elementName, "test");
   */
  async sendKeys(
    locatorOrElement: LocatorOrElement,
    text: string,
    pageInstance: Page = this.page
  ): Promise<void> {
    try {
      // Get the element, no matter if it is a locator or an object (Playwright locator), we will will work with Playwright locator object as a result.
      const element = await this.element(locatorOrElement, this.config.elementTimeOut, pageInstance);

      // Send Ctrl+A to the element. This will work for Windows and Linux. We are using this to select all containing text inside inspected input text element.
      await this.page.keyboard.press("Control+A");
      // Send Meta+A to the element. This will work for macOS. We are using this to select all containing text inside inspected input text element.
      await this.page.keyboard.press("Meta+A");

      // Fill the element with text.
      await element.fill(text);
      // Verify that the input text element contains the sent text data.
      expect(await element.inputValue()).toEqual(text);

      // Add the information message.
      this.ts.informLog(
        this.config.beginInformMessage +
        "The automated test fill with text inside the input text element with value: '" +
        text +
        "'."
      );
    } catch (error) {
      // Create the error log and show it to the UI. Show the function name, the class where the function is located and the cached error.
      this.ts.errorLog(
        "Failed to check the radio button or checkbox. " +
        this.sendKeys.name + " " +
        __filename.split(__dirname + "/").pop() + " " +
        await error
      )
      throw new Error(`Failed to send the keys: ${await error}`);
    }
  }

  /**
 * @description                       This method sends a text to the input text element.
 * @param locatorOrElement            Provide a locator (string) or element (object). The method uses a mechanism to use a locator (string) and an element (object). That is useful if we want to provide just a locator or give the whole element (in cases when we want to use this method with iFrames or want to use the method with other browser windows).
 * @param text                        Provide the text that we will send to the input text element.
 * @param loctorOrElementVerificator  Optional. Provide the verification element. If you don't provide this parameter - the used element will be used for verification.
 * @type                              The type of this method is set to "Promise<void>".
 * @usage                             - Usage 1: Use the method by providing a locator parameter.
 *                                      {constructorKeyword}.sendKeys_MultySelect({locator}, "the text we send", {locator});
 *                                    - Usage 2: Use the method by providing an element parameter.
 *                                      {constructorKeyword}.sendKeys_MultySelect({element}, "the text we send", {element});
 * @example                           Example 1: Provide the locator and the text value.
 *                                      await dsl.sendKeys_MultySelect("#id", "the text we send", "#verificatorId");
 *                                    Example 2: Provide the element and the text value.
 *                                      let elementName: any = dsl.element("#id");
 *                                      let elementVerificatorName: any = dsl.element("#verificatorId");
 *                                      await dsl.sendKeys_MultySelect(await elementName, "test", await elementVerificatorName);
 */
  async sendKeys_MultySelect(
    locatorOrElement: any,
    text: string,
    loctorOrElementVerificator?: any
  ): Promise<void> {
    try {
      // Create the method steps here. Describe the custom command in this "try" statement (Domain Specific Language).

      let element: any; // Declare an internal variable for assigning the element value.
      let elementVerificator: any; // Declare an internal variable for assigning the element value.
      // If the provided value is a string, this is just a selector.
      if (typeof locatorOrElement === "string") {
        // We need to transform this selector into an element.
        element = this.page.locator(locatorOrElement);
      }
      // If the provided value is an object, this is the whole element.
      else if (
        typeof locatorOrElement === "object" ||
        locatorOrElement instanceof Object
      ) {
        // So we don't need to do anything else unique.
        element = locatorOrElement;
      }
      // Unit test.
      else {
        this.ts.errorLog(
          "You have entered a not supported data type. Please provide a locator (string) or element (object)." + " " +
          this.sendKeys_MultySelect.name + " " +
          __filename.split(__dirname + "/").pop()
        );
        throw new Error(`You have entered a not supported data type. Please provide a locator (string) or element (object).`);
      }

      // If the provided value is a string, this is just a selector.
      if (
        typeof loctorOrElementVerificator === "string" &&
        loctorOrElementVerificator != null
      ) {
        // We need to transform this selector into an element.
        elementVerificator = this.page.locator(loctorOrElementVerificator);
      }
      // If the provided value is an object, this is the whole element.
      else if (
        typeof loctorOrElementVerificator === "object" ||
        (loctorOrElementVerificator instanceof Object &&
          loctorOrElementVerificator != null)
      ) {
        // So we don't need to do anything else unique.
        elementVerificator = loctorOrElementVerificator;
      } else if (loctorOrElementVerificator == null) {
        // Do nothing, because the parameter is optional.
      }
      // Unit test.
      else {
        this.ts.errorLog(
          "You have entered a not supported data type. Please provide a locator (string) or element (object)." + " " +
          this.sendKeys_MultySelect.name + " " +
          __filename.split(__dirname + "/").pop()
        );
        throw new Error(`You have entered a not supported data type. Please provide a locator (string) or element (object).`);
      }

      // Call this method, to verify that the element is present and it is ready for usage.
      await this.element(element, this.config.elementTimeOut);
      // Send Ctrl+A to the element. This will work for Windows and Linux. We are using this to select all containing text inside inspected input text element.
      await this.page.keyboard.press("Control+A");
      // Send Meta+A to the element. This will work for macOS. We are using this to select all containing text inside inspected input text element.
      await this.page.keyboard.press("Meta+A");

      // Fill the element with text.
      await element.fill(text);
      // Press the "Enter" key of the keyboard.
      await this.page.keyboard.press("Enter");
      // Verify that the input text element contains the sent text data.
      // If the element we use is the same as the element, that will verify the operation was compleated correctly. Or if we don't provide a verification element - because it is the same as a used element.
      if (
        locatorOrElement == loctorOrElementVerificator ||
        loctorOrElementVerificator == null
      ) {
        let verificateValueIsCorrect: string = await (
          await element.allTextContents()
        )[0];
        expect(verificateValueIsCorrect).toEqual(text);
      }
      // If we provide different element for verificaiton.
      else {
        let verificateValueIsCorrect: string = await (
          await elementVerificator.allTextContents()
        )[0];
        expect(verificateValueIsCorrect).toEqual(text);
      }

      // Add the information message.
      this.ts.informLog(
        this.config.beginInformMessage +
        "The automated test fill with text inside the multi-select element with the value: '" +
        text +
        "'."
      );
    } catch (error) {
      // Unit Test.
      // Create the error log and show it to the UI. Show the function name, the class where the function is located and the cached error.
      this.ts.errorLog(
        "Failed to check the radio button or checkbox. " +
        this.sendKeys_MultySelect.name + " " +
        __filename.split(__dirname + "/").pop() + " " +
        error
      );
      throw new Error(`Failed to send the keys: ${error}`);
    }
  }

  /**
   * @description               This method checks radio buttons or checkboxes.
   * @param locator             Provide the locator of the element that we want to check.
   * @param checkOrClickAction  Optional. If we don't provide a value for this parameter, the method will use the "click" action for checking the element. Provide a "check" or "click" value to choose the action we will use for checking the radio button or checkbox. We can checks radio buttons and checkboxes using two action methods - "check" and "click".
   * @param pageInstance        Optional. Provide the page instance. The default value is set to the current page. If you want to use this method with a new page, provide the new page instance.
   * @usage                     - Usage 1: Use the method by providing a locator parameter only.
   *                              {constructorKeyword}.checkRadioButtonCheckBox({locator});
   *                            - Usage 2: Use the method by providing a locator parameter and "check" action.
   *                              {constructorKeyword}.checkRadioButtonCheckBox({locator}, "check");
   *                            - Usage 3: Use the method by providing a locator parameter and "click" action.
   *                              {constructorKeyword}.checkRadioButtonCheckBox({locator}, "click");
   * @example                   Example 1: Provide the locator only.
   *                              await dsl.checkRadioButtonCheckBox("#id");
   *                            Example 2: Provide the locator and "check" action.
   *                              await dsl.checkRadioButtonCheckBox("#id", "check");
   *                            Example 3: Provide the locator and "click" action.
   *                              await dsl.checkRadioButtonCheckBox("#id", "click");

   */
  async checkRadioButtonCheckBox(
    locator: Selector,
    checkOrClickAction?: CheckOrClickAction,
    pageInstance: Page = this.page
  ): Promise<void> {
    try {
      // Get the element, no matter if it is a locator or an object (Playwright locator), we will will work with Playwright locator object as a result.
      const element = await this.element(locator, this.config.elementTimeOut, pageInstance);

      // If the element is not null, we can continue with the verification.
      if (element) {
        // Verify the element is not checked.
        expect(await pageInstance.isChecked(locator)).toBeFalsy();
        await expect(element).not.toBeChecked();
        // If the checkOrClickAction value is not null.
        if (checkOrClickAction != null) {
          // If the provided action is "check".
          if (checkOrClickAction == "check") {
            // Check the element using "check" action.
            await pageInstance.check(locator, { force: true });
          }
          // If the provided action is "click".
          else if (checkOrClickAction == "click") {
            // Check the element using "click" action.
            await pageInstance.click(locator, { force: true });
          }
          else {
            this.ts.errorLog(
              "You provided the wrong action data. If you want to provide data for this parameter, please provide only the 'check' or 'click' value for the 'checkOrClickAction' parameter." +
              this.checkRadioButtonCheckBox.name + " " +
              __filename.split(__dirname + "/").pop()
            );
            throw new Error(`You provided the wrong action data. If you want to provide data for this parameter, please provide only the 'check' or 'click' value for the 'checkOrClickAction' parameter.`);
          }
        } else {
          // Check the element using "click" action.
          await pageInstance.click(locator, { force: true });
        }
        // Verify the element is checked.
        expect(await pageInstance.isChecked(locator)).toBeTruthy();
        await expect(element).toBeChecked();

        // Add the information message.
        this.ts.informLog(
          this.config.beginInformMessage + "The automated test checks the element."
        );
      }
      // If the element is null, we need to throw an error.
      else {
        this.ts.errorLog("The element value is null. Please provide a valid element.");
      }
    } catch (error) {
      // Create the error log and show it to the UI. Show the function name, the class where the function is located and the cached error.
      this.ts.errorLog(
        "Failed to check the radio button or checkbox. " +
        this.checkRadioButtonCheckBox.name + " " +
        __filename.split(__dirname + "/").pop() + " " +
        await error
      );
      throw new Error(`Failed to check the radio button or checkbox: ${await error}`);
    }
  }

  /**
   * @description               This method unchecks radio buttons or checkboxes.
   * @param locator             Provide the locator of the element that we want to uncheck.
   * @param checkOrClickAction  Optional. If we don't provide a value for this parameter, the method will use the "click" action for checking the element. Provide a "uncheck" or "click" value to choose the action we will use for unchecking the checkbox. We can unchecks checkboxes using two action methods - "uncheck" and "click".
   * @param pageInstance        Optional. Provide the page instance. The default value is set to the current page. If you want to use this method with a new page, provide the new page instance.
   * @usage                     - Usage 1: Use the method by providing a locator parameter only.
   *                              {constructorKeyword}.checkRadioButtonCheckBox({locator});
   *                            - Usage 2: Use the method by providing a locator parameter and "uncheck" action.
   *                              {constructorKeyword}.checkRadioButtonCheckBox({locator}, "uncheck");
   *                            - Usage 3: Use the method by providing a locator parameter and "click" action.
   *                              {constructorKeyword}.checkRadioButtonCheckBox({locator}, "click");
   * @example                   Example 1: Provide the locator only.
   *                              await dsl.checkRadioButtonCheckBox("#id");
   *                            Example 2: Provide the locator and "uncheck" action.
   *                              await dsl.checkRadioButtonCheckBox("#id", "uncheck");
   *                            Example 3: Provide the locator and "click" action.
   *                              await dsl.checkRadioButtonCheckBox("#id", "click");
   */
  async unCheckBox(
    locator: Selector,
    checkOrClickAction?: UnCheckOrUnClickAction,
    pageInstance: Page = this.page
  ): Promise<void> {
    try {
      // Get the element, no matter if it is a locator or an object (Playwright locator), we will will work with Playwright locator object as a result.
      const element = await this.element(locator, this.config.elementTimeOut, pageInstance);

      // If the element is not null, we can continue with the verification.
      if (element) {
        // Verify the element is checked.
        expect(await pageInstance.isChecked(locator)).toBeTruthy();
        await expect(element).toBeChecked();
        // If the checkOrClickAction value is not null.
        if (checkOrClickAction != null) {
          // If the provided action is "uncheck".
          if (checkOrClickAction == "uncheck") {
            // Check the element using "uncheck" action.
            await pageInstance.uncheck(locator, { force: true });
          }
          // If the provided action is "click".
          else if (checkOrClickAction == "click") {
            // Check the element using "click" action.
            await pageInstance.click(locator, { force: true });
          }
          else {
            this.ts.errorLog(
              "You provided the wrong action data. If you want to provide data for this parameter, please provide only the 'uncheck' or 'click' value for the 'checkOrClickAction' parameter." +
              this.unCheckBox.name + " " +
              __filename.split(__dirname + "/").pop()
            );
            throw new Error(`You provided the wrong action data. If you want to provide data for this parameter, please provide only the 'uncheck' or 'click' value for the 'checkOrClickAction' parameter.`);
          }
        } else {
          // Check the element using "click" action.
          await pageInstance.click(locator, { force: true });
        }
        // Verify the element is not checked.
        expect(await pageInstance.isChecked(locator)).toBeFalsy();
        await expect(element).not.toBeChecked();

        // Add the information message.
        this.ts.informLog(
          this.config.beginInformMessage +
          "The automated test unchecks the check box element."
        );
      }
      // If the element is null, we need to throw an error.
      else {
        this.ts.errorLog("The element value is null. Please provide a valid element.");
        throw new Error(`The element value is null. Please provide a valid element.`);
      }
    } catch (error) {
      // Create the error log and show it to the UI. Show the function name, the class where the function is located and the cached error.
      this.ts.errorLog(
        "Failed to uncheck the checkbox. " +
        this.unCheckBox.name + " " +
        __filename.split(__dirname + "/").pop() + " " +
        await error
      );
      throw new Error(`Failed to uncheck the checkbox: ${await error}`);
    }
  }

  /**
   * @description               This method makes a double-click mouse action over an element.
   * @param locator             Provide the locator of the element that we will use.
   * @param pageInstance        Optional. Provide the page instance. The default value is set to the current page. If you want to use this method with a new page, provide the new page instance.
   * @usage                     - Usage: Use the method by providing a locator parameter only.
   *                              {constructorKeyword}.doubleClick({locator});
   * @exaple                    Example: Provide the locator.
   *                              await dsl.doubleClick("#id");
   */
  async doubleClick(
    locator: Selector,
    pageInstance: Page = this.page
  ): Promise<void> {
    try {
      // Call this method, to verify that the element is present and it is ready for usage.
      await this.element(locator, this.config.elementTimeOut, pageInstance);
      // Make double-click mouse action over selected element.
      await pageInstance.dblclick(locator, { force: true });

      // Add the information message.
      this.ts.informLog(
        this.config.beginInformMessage +
        "The automated test makes the double mouse (left) click over the element."
      );
    } catch (error) {
      // Create the error log and show it to the UI. Show the function name, the class where the function is located and the cached error.
      this.ts.errorLog(
        "Failed to make the double-click. " +
        this.doubleClick.name + " " +
        __filename.split(__dirname + "/").pop() + " " +
        await error
      );
      throw new Error(`Failed to make the double-click: ${await error}`);
    }
  }

  /**
   * @description               This method makes a right-click mouse action over an element.
   * @param locator             Provide the locator of the element that we will use.
   * @param pageInstance        Optional. Provide the page instance. The default value is set to the current page. If you want to use this method with a new page, provide the new page instance.
   * @usage                     - Usage: Use the method by providing a locator parameter only.
   *                              {constructorKeyword}.rightClick({locator});
   * @exaple                    Example: Provide the locator.
   *                              await dsl.rightClick("#id");
   */
  async rightClick(
    locator: Selector,
    pageInstance: Page = this.page
  ): Promise<void> {
    try {
      // Call this method, to verify that the element is present and it is ready for usage.
      await this.element(locator, this.config.elementTimeOut, pageInstance);
      // Make right-click mouse action over selected element.
      await pageInstance.click(locator, {
        button: "right",
        force: true,
      });

      // Add the information message.
      this.ts.informLog(
        this.config.beginInformMessage +
        "The automated test makes the right click with the mouse over the element."
      );
    } catch (error) {
      // Create the error log and show it to the UI. Show the function name, the class where the function is located and the cached error.
      this.ts.errorLog(
        "Failed to make the right-click. " +
        this.rightClick.name + " " +
        __filename.split(__dirname + "/").pop() + " " +
        await error
      );
      throw new Error(`Failed to make the right-click: ${await error}`);
    }
  }

  /**
   * @description               This method clicks on an element.
   * @param locator             Provide the locator of the element that we want to click.
   * @param pageInstance        Optional. Provide the page instance. The default value is set to the current page. If you want to use this method with a new page, provide the new page instance.
   * @usage                     - Usage: Use the method by providing a locator parameter.
   *                              {constructorKeyword}.click({locator});
   * @example                   Example: Provide the locator.
   *                              await dsl.click("#id");
   */
  async click(
    locator: Selector,
    pageInstance: Page = this.page
  ): Promise<void> {
    try {
      // Call this method, to verify that the element is present and it is ready for usage.
      await this.element(locator, this.config.elementTimeOut, pageInstance);

      // Click over the element using the locator.
      await pageInstance.click(locator, { force: true });

      // Add the information message.
      this.ts.informLog(
        this.config.beginInformMessage +
        "The automated test makes the left click with the mouse over the element."
      );
    } catch (error) {
      // Create the error log and show it to the UI. Show the function name, the class where the function is located and the cached error.
      this.ts.errorLog(
        "Failed to click the element. " +
        this.click.name + " " +
        __filename.split(__dirname + "/").pop() + " " +
        await error
      );
      throw new Error(`Failed to click the element: ${await error}`);
    }
  }

  /**
   * @description               This method hovers over the element.
   * @param locator             Provide the locator of the element that we want to hover.
   * @param pageInstance        Optional. Provide the page instance. The default value is set to the current page. If you want to use this method with a new page, provide the new page instance.
   * @usage                     - Usage: Use the method by providing a locator parameter.
   *                              {constructorKeyword}.hover({locator});
   * @example                   Example: Provide the locator.
   *                              await dsl.hover("#id");
   */
  async hover(
    locator: Selector,
    pageInstance: Page = this.page
  ): Promise<void> {
    try {
      // Call this method, to verify that the element is present and it is ready for usage.
      await this.element(locator, this.config.elementTimeOut, pageInstance);
      // Hover over the element.
      await pageInstance.hover(locator, { force: true });

      // Add the information message.
      this.ts.informLog(
        this.config.beginInformMessage + "The automated test hovers the element."
      );
    } catch (error) {
      // Create the error log and show it to the UI. Show the function name, the class where the function is located and the cached error.
      this.ts.errorLog(
        "Failed to hover the element. " +
        this.hover.name + " " +
        __filename.split(__dirname + "/").pop() + " " +
        await error
      );
      throw new Error(`Failed to hover the element: ${await error}`);
    }
  }

  /**
   * @description               This method clicks over an element on the exact element position. Every element has size. We can click over the element on the exact position (in pixels)
   * @param locator             Provide the locator of the element that we want to hover.
   * @param xValue              Provide the position where we will click the element for X (horizontal) value.
   * @param yValue              Provide the position where we will click the element for Y (vertical) value.
   * @param pageInstance        Optional. Provide the page instance. The default value is set to the current page. If you want to use this method with a new page, provide the new page instance.
   * @usage                     - Usage: Use the method by providing a locator parameter and position for X and Y.
   *                              {constructorKeyword}.clickPosition({locator}, {integer number for x}, {integer number for y});
   * @example                   Example: Provide the locator and position where the click action should happen.
   *                              await dsl.clickPosition("#id", 12, 22);
   */
  async clickPosition(
    locator: Selector,
    xValue: PositiveInteger,
    yValue: PositiveInteger,
    pageInstance: Page = this.page
  ): Promise<void> {
    try {
      // Call this method, to verify that the element is present and it is ready for usage.
      await this.element(locator, this.config.elementTimeOut, pageInstance);
      // If the numbers are positive numbers...
      if (xValue > 0 || yValue > 0) {
        // ...click over the element on the exact position using the locator.
        await pageInstance.click(locator, {
          position: { x: xValue, y: yValue },
          force: true,
        });
      }
      // If the numbers are negative or it is 0.
      else if (xValue <= 0 || yValue <= 0) {
        this.ts.errorLog(
          "You entered a negative value. Please enter a positive integer value." +
          this.clickPosition.name + " " +
          __filename.split(__dirname + "/").pop()
        );
        throw new Error(`You entered a negative value. Please enter a positive integer value.`);
      }
      // If the numbers are not an integer.
      else if (!Number.isInteger(xValue) || !Number.isInteger(yValue)) {
        this.ts.errorLog(
          "You need to enter an integer value. " +
          this.clickPosition.name + " " +
          __filename.split(__dirname + "/").pop()
        );
        throw new Error(`You need to enter an integer value.`);
      }
      // Everything else...
      else {
        this.ts.errorLog(
          "You entered an invalid value. Please provide a positive integer number for two parameters." +
          this.clickPosition.name + " " +
          __filename.split(__dirname + "/").pop()
        );
        throw new Error(`You entered an invalid value. Please provide a positive integer number for two parameters.`);
      }

      // Add the information message.
      this.ts.informLog(
        this.config.beginInformMessage +
        "The automated test makes the left click with the mouse over the element on a specific position with coordinates: X:" +
        xValue +
        " and Y:" +
        yValue +
        "."
      );
    } catch (error) {
      // Create the error log and show it to the UI. Show the function name, the class where the function is located and the cached error.
      this.ts.errorLog(
        "Failed to click on the exact position. " +
        this.clickPosition.name + " " +
        __filename.split(__dirname + "/").pop() + " " +
        await error
      );
      throw new Error(`Failed to click on the exact position: ${await error}`);
    }
  }

  /**
   * @description               This method sends keyboard keys to the element.
   * @param locator             Provide the locator of the element that we want to use.
   * @param keyboardKey         Provide the key or combination of keys.
   * @param pageInstance        Optional. Provide the page instance. The default value is set to the current page. If you want to use this method with a new page, provide the new page instance.
   * @usage                     - Usage: Use the method by providing a locator parameter and keyboard key/s.
   *                              {constructorKeyword}.clickWithHoldingKeyboardKey({locator}, {keyboardKey/s});
   * @example                   Example: Provide the locator and keyboard key/s.
   *                              await dsl.clickWithHoldingKeyboardKey("#id", "Shift");
   *                              await dsl.clickWithHoldingKeyboardKey("#id", "Shift+A");
   */
  async clickWithHoldingKeyboardKey(
    locator: Selector,
    keyboardKey: KeyboardKeys,
    pageInstance: Page = this.page
  ): Promise<void> {
    try {
      // Call this method, to verify that the element is present and it is ready for usage.
      await this.element(locator, this.config.elementTimeOut, pageInstance);
      // Send keyboard key/s to inspected element.
      await pageInstance.click(locator, {
        modifiers: [keyboardKey],
        force: true,
      });

      // Add the information message.
      this.ts.informLog(
        this.config.beginInformMessage +
        "The automated test makes click with keyboard key/s using: '" +
        keyboardKey +
        "'."
      );
    } catch (error) {
      // Create the error log and show it to the UI. Show the function name, the class where the function is located and the cached error.
      this.ts.errorLog(
        "Failed to click with holding the keyboard key. " +
        this.clickWithHoldingKeyboardKey.name + " " +
        __filename.split(__dirname + "/").pop() + " " +
        await error
      );
      throw new Error(`Failed to click with holding the keyboard key: ${await error}`);
    }
  }

  /**
   * @description                                       This function downloads a file.
   * @param locator                                     Provide the locator of the element (button/hyperlink) that we want to use.
   * @param downloadFolderPathWithFileNameAndExtension  Optional. Provide the downloads folder path with the file name and file extension. If we don't provide this parameter, the automation will download and delete the file when the test is ready. We can use this approach to verify that the download process is working.
   * @param pageInstance                                Optional. Provide the page instance. The default value is set to the current page. If you want to use this method with a new page, provide the new page instance.
   * @usage                                             - Usage 1: Use the method by providing a button locator to force the downloading process and provide the destination path to download the file. Alert, ensure that you add the file name and extension to the destination folder path.
   *                                                      {constructorKeyword}.downloadFile({locator}, {destination path});
   *                                                    - Usage 2: Use the method by providing a button locator to force the downloading process without giving the destination path to download the file. We can use this approach only to verify that the download process is working as expected and the file is downloaded. The file will be deleted when the test is ready.
   *                                                      {constructorKeyword}.downloadFile({locator});
   * @example                                           Example 1: Provide the locator of a button that triggers the downloading process and the destination folder path where the automation will download the file. Alert, ensure that you add the file name and extension to the destination folder path.
   *                                                      await dsl.downloadFile("#id", "C:/download-folder/file.jpg");
   *                                                    Example 2: Provide the locator of a button that triggers the downloading process without the destination folder path where the automation will download the file.  We can use this approach only to verify that the download process is working as expected and the file is downloaded. The file will be deleted when the test is ready.
   *                                                      await dsl.downloadFile("#id");
   */
  async downloadFile(
    locator: Selector,
    downloadFolderPathWithFileNameAndExtension?: string,
    pageInstance: Page = this.page
  ): Promise<void> {
    try {
      // Call this method, to verify that the element is present and it is ready for usage.
      await this.element(locator, this.config.elementTimeOut, pageInstance);
      // Wait for the download process to complete. Wait for some period of time to download the file.
      await new Promise(resolve => setTimeout(resolve, this.config.elementTimeOut));
      // Get the download object and initialize the downloading process.
      let [download] = await Promise.all([
        // Start waiting for the download process.
        pageInstance.waitForEvent('download'),
        // Perform the action that initiates the download.
        pageInstance.locator(locator).click()
      ]);
      // Wait for the download process to complete.
      if (downloadFolderPathWithFileNameAndExtension != null) {
        // Save downloaded file in specific path direcotry.
        await download.saveAs(downloadFolderPathWithFileNameAndExtension);
      } else if (downloadFolderPathWithFileNameAndExtension == null) {
        // Save downloaded files automatically. Alert the downloaded file will download with a random name, with no extension, and it will be deleted when the automation is stopped.
        await download.path();
      } else {
        this.ts.errorLog(
          "This error should never happen." +
          this.downloadFile.name + " " +
          __filename.split(__dirname + "/").pop()
        );
        throw new Error(`This error should never happen.`);
      }

      // Add the information message.
      if (downloadFolderPathWithFileNameAndExtension != null) {
        this.ts.informLog(
          this.config.beginInformMessage + "The automated test downloads a file."
        );
      } else {
        this.ts.informLog(
          this.config.beginInformMessage +
          "The automated test downloads a file in the: '" +
          await download.path() +
          "'."
        );
      }
    } catch (error) {
      // Create the error log and show it to the UI. Show the function name, the class where the function is located and the cached error.
      this.ts.errorLog(
        "Failed to download the file. " +
        this.downloadFile.name + " " +
        __filename.split(__dirname + "/").pop() + " " +
        await error
      );
      throw new Error(`Failed to download the file: ${await error}`);
    }
  }

  /**
   * @description                                       This function uploads a file.
   * @param locator                                     Provide the locator of the element (button/hyperlink) that we want to use.
   * @param uploadFilePathWithFileNameAndExtension      Add the uploaded file path, including the file name and file extension.
   * @param pageInstance                                Optional. Provide the page instance. The default value is set to the current page. If you want to use this method with a new page, provide the new page instance.
   * @usage                                             - Usage: Use the method by providing a button locator to force the uploading process and provide the destination path of the uploading file. Alert, ensure that you add the file name and extension to the destination folder path.
   *                                                      {constructorKeyword}.uploadFile({locator}, {destination path});
   * @example                                           Example: Provide the locator of a button that triggers the uploading process and the destination folder path where the automation will download the file. Alert, ensure that you add the file name and extension to the destination folder path.
   *                                                      await dsl.uploadFile("#id", "C:/upload-folder/file.jpg");
   */
  async uploadFile(
    locator: Selector,
    uploadFilePathWithFileNameAndExtension: string,
    pageInstance: Page = this.page
  ): Promise<void> {
    try {
      // Call this method, to verify that the element is present and it is ready for usage.
      await this.element(locator, this.config.elementTimeOut, pageInstance);
      // Upload the file by providing the element locator and file path.
      await pageInstance.setInputFiles(
        locator,
        uploadFilePathWithFileNameAndExtension
      );

      // Add the information message.
      this.ts.informLog(
        this.config.beginInformMessage +
        " The automated test uploads a file successfully."
      );
    } catch (error) {
      // Create the error log and show it to the UI. Show the function name, the class where the function is located and the cached error.
      this.ts.errorLog(
        "Failed to upload the file. " +
        this.uploadFile.name + " " +
        __filename.split(__dirname + "/").pop() + " " +
        await error
      );
      throw new Error(`Failed to upload the file: ${await error}`);
    }
  }

  /**
   * @description             This method accepts alert pop-up windows.
   * @param locator           Provide the locator of the element that will force the alert window.
   * @param alertMessage      Optional. Provide the alert message contained in the alert pop-up window.
   * @param pageInstance      Optional. Provide the page instance. The default value is set to the current page. If you want to use this method with a new page, provide the new page instance.
   * @usage                   - Usage 1: Use the method by providing a button locator to force the pop-up window and provide the text contained in the alert pop-up window.
   *                            {constructorKeyword}.alertAccept({locator}, {contained text inside alert pop up window});
   *                          - Usage 2: Use the method by providing a button locator to force the pop-up window.
   *                            {constructorKeyword}.alertAccept({locator});
   * @example                 Example 1: Provide the locator of a button that triggers the alert pop-up window and provide the text contained inside the alert pop-up window.
   *                            dsl.alertAccept("#id", "text inside alert pop-up window");
   *                          Example 2: Provide the locator of a button that triggers the alert pop-up window.
   *                            dsl.alertAccept("#id");
   */
  async alertAccept(
    locator: Selector,
    alertMessage?: string,
    pageInstance: Page = this.page
  ): Promise<void> {
    try {
      // Call this method, to verify that the element is present and it is ready for usage.
      await this.element(locator, this.config.elementTimeOut, pageInstance);
      // Handle the alert pop-up window.
      pageInstance.once("dialog", async (dialog) => {
        // If we provide the alertMessage parameter...
        if (alertMessage != null) {
          // ...assert to verify that the pop-up window contains the expected text.
          expect(dialog.message()).toEqual(alertMessage);
        }
        // Accept the pop-up window.
        await dialog.accept();
      });
      // Click the element that forces the alert pop-up window. It is a bit confusing, but we should take this action after handling the alert pop-up window.
      await this.click(locator);

      // Add the information message.
      this.ts.informLog(
        this.config.beginInformMessage +
        " The automation accepted the Alert pop-up window."
      );
    } catch (error) {
      // Create the error log and show it to the UI. Show the function name, the class where the function is located and the cached error.
      this.ts.errorLog(
        "Failed to accept the alert. " +
        this.alertAccept.name + " " +
        __filename.split(__dirname + "/").pop() + " " +
        await error
      );
      throw new Error(`Failed to accept the alert: ${await error}`);
    }
  }

  /**
   * @description             This method dismisses alert pop-up windows.
   * @param locator           Provide the locator of the element that will force the alert window.
   * @param alertMessage      Optional. Provide the alert message contained in the alert pop-up window.
   * @param pageInstance        Optional. Provide the page instance. The default value is set to the current page. If you want to use this method with a new page, provide the new page instance.
   * @usage                   - Usage 1: Use the method by providing a button locator to force the pop-up window and provide the text contained in the alert pop-up window.
   *                            {constructorKeyword}.alertCancel({locator}, {contained text inside alert pop up window});
   *                          - Usage 2: Use the method by providing a button locator to force the pop-up window.
   *                            {constructorKeyword}.alertCancel({locator});
   * @example                 Example 1: Provide the locator of a button that triggers the alert pop-up window and provide the text contained inside the alert pop-up window.
   *                            dsl.alertCancel("#id", "text inside alert pop-up window");
   *                          Example 2: Provide the locator of a button that triggers the alert pop-up window.
   *                            dsl.alertCancel("#id");
   */
  async alertCancel(
    locator: Selector,
    alertMessage?: string,
    pageInstance: Page = this.page
  ): Promise<void> {
    try {
      // Call this method, to verify that the element is present and it is ready for usage.
      await this.element(locator, this.config.elementTimeOut, pageInstance);
      // Handle the alert pop-up window.
      pageInstance.once("dialog", async (dialog) => {
        // If we provide the alertMessage parameter...
        if (alertMessage != null) {
          // ...assert to verify that the pop-up window contains the expected text.
          expect(dialog.message()).toEqual(alertMessage);
        }
        // Dismiss the pop-up window.
        await dialog.dismiss();
      });
      // Click the element that forces the alert pop-up window. It is a bit confusing, but we should take this action after handling the alert pop-up window.
      await this.click(locator);

      // Add the information message.
      this.ts.informLog(
        this.config.beginInformMessage +
        " The automation dismissed the Alert pop-up window."
      );
    } catch (error) {
      // Create the error log and show it to the UI. Show the function name, the class where the function is located and the cached error.
      this.ts.errorLog(
        "Failed to dismiss the alert. " +
        this.alertCancel.name + " " +
        __filename.split(__dirname + "/").pop() + " " +
        await error
      );
      throw new Error(`Failed to dismiss the alert: ${await error}`);
    }
  }

  /**
   * @description             This method accepts an alert pop-up window and fills the input text element with text (located inside the alert pop-up window).
   * @param locator           Provide the locator of the element that will force the alert window.
   * @param textValue         Provide the text value that we will fill inside the alert pop-up window.
   * @param alertMessage      Optional. Provide the alert message contained in the alert pop-up window.
   * @param pageInstance        Optional. Provide the page instance. The default value is set to the current page. If you want to use this method with a new page, provide the new page instance.
   * @usage                   - Usage 1: Use the method by providing a button locator to force the pop-up window, give the text that will be filled inside the alert pop-up window and provide the text (contained) in the alert pop-up window.
   *                            {constructorKeyword}.alertTypeValueAndAccept({locator}, {text value}, {contained text inside alert pop up window});
   *                          - Usage 2: Use the method by providing a button locator to force the pop-up window, give the text that will be filled inside the alert pop-up window.
   *                            {constructorKeyword}.alertTypeValueAndAccept({locator}, {text value});
   * @example                 Example 1: Provide the locator of a button that triggers the alert pop-up window, provide the text that will be filled inside the alert pop-up window and provide the text (contained) inside the alert pop-up window.
   *                            dsl.alertTypeValueAndAccept("#id", "fill with this text" , "text inside alert pop-up window");
   *                          Example 2: Provide the locator of a button that triggers the alert pop-up window, provide the text that will be filled inside the alert pop-up window.
   *                            dsl.alertTypeValueAndAccept("#id", "fill with this text");
   */
  async alertTypeValueAndAccept(
    locator: Selector,
    textValue: string,
    alertMessage?: string,
    pageInstance: Page = this.page
  ): Promise<void> {
    try {
      // Call this method, to verify that the element is present and it is ready for usage.
      await this.element(locator, this.config.elementTimeOut, pageInstance);
      // Handle the alert pop-up window.
      pageInstance.once("dialog", async (dialog) => {
        // If we provide the alertMessage parameter...
        if (alertMessage != null) {
          // ...assert to verify that the pop-up window contains the expected text.
          expect(dialog.message()).toEqual(alertMessage);
        }
        // Accept the pop-up window and provide text that will fill it inside the input text element (located inside the alert pop-up window).
        await dialog.accept(textValue);
      });
      // Click the element that forces the alert pop-up window. It is a bit confusing, but we should take this action after handling the alert pop-up window.
      await this.click(locator);

      // Add the information message.
      this.ts.informLog(
        this.config.beginInformMessage +
        "The automation accepts and fills the value '" +
        textValue +
        "' in the Alert pop-up window."
      );
    } catch (error) {
      // Create the error log and show it to the UI. Show the function name, the class where the function is located and the cached error.
      this.ts.errorLog(
        "Failed to accept and fill the alert. " +
        this.alertTypeValueAndAccept.name + " " +
        __filename.split(__dirname + "/").pop() + " " +
        await error
      );
      throw new Error(`Failed to accept and fill the alert: ${await error}`);
    }
  }

  /**
   * @description             This method gives a focus to the iFrame.
   * @param iFrameLocator     Provide the iFrame locator.
   * @param pageInstance       Optional. Provide the page instance. The default value is set to the current page. If you want to use this method with a new page, provide the new page instance.
   * @returns                 Returns the switched iFrame element.
   * @usage                   - Usage: Use the method by providing a iFrame locator.
   *                            {constructorKeyword}.iFrame({locator});
   * @example                 Example: Provide the locator of an iFrame element.
   *                            let iFrame = await dsl.iFrame("#id1");
   *                            let iFrameElement = dsl.element(await iFrame.locator('#id2'));
   */
  async iFrame(
    iFrameLocator: Selector,
    pageInstance: Page = this.page
  ): Promise<FrameLocator> {
    try {
      // Add the information message.
      this.ts.informLog(
        this.config.beginInformMessage +
        " The automation successfully switched to iFrame."
      );

      // Verify that the iFrame element is present and ready for usage.
      await this.element(iFrameLocator, this.config.elementTimeOut, pageInstance);

      // Return the switched focus inside the iFrame.
      const frame = pageInstance.frameLocator(iFrameLocator);
      // If the frame is not present, throw an error.
      if (!frame) {
        this.ts.errorLog(`Failed to switch to iFrame with locator "${iFrameLocator}".`);
        throw new Error(`Failed to switch to iFrame with locator "${iFrameLocator}".`);
      }
      // Return the switched focus inside the iFrame.
      return frame;
    } catch (error) {
      // Create the error log and show it to the UI. Show the function name, the class where the function is located and the cached error.
      this.ts.errorLog(
        "Failed to switch to iFrame. " +
        this.iFrame.name + " " +
        __filename.split(__dirname + "/").pop() + " " +
        await error
      );
      throw new Error(`Failed to switch to iFrame: ${await error}`);
      // This return should never be reached, because the 'errorLog' method will throw an error. We need to return null here because of the TypeScript compiler.
      throw error;
    }
  }

  /**
   * @description                           This method focuses on the iFrame inside another iFrame (Nested iFrame).
   * @param parentIframeLocator             Provide the locator of the parent (first) iFrame element.
   * @param childIframeLocator              Provide the locator of the child (Nested) iFrame element.
   * @param childIframeVerificationLocator  Optional. Provide the locator of the element inside the child iFrame to verify that the iFrame is ready for interaction. Default value is "body".
   * @param pageInstance                    Optional. Provide the page instance. The default value is set to the current page. If you want to use this method with a new page, provide the new page instance.
   * @returns                               Returns the switched nested iFrame element.
   * @usage                                 - Usage: Use the method by providing parent and child iFrame locators.
   *                                          {constructorKeyword}.iFrameNested({locator}, {locator});
   * @example                               Example: Provide the locators for parent and child iFrame elements.
   *                                          let iFrameChild = await dsl.iFrameNested("#id1", "id2");
   *                                          let iFrameChildElement = dsl.element(await iFrameChild.locator("#id3"));
   */
  async iFrameNested(
    parentIframeLocator: Selector,
    childIframeLocator: Selector,
    childIframeVerificationLocator: Selector = "body",
    pageInstance: Page = this.page
  ): Promise<FrameLocator> {
    try {
      // Verify that the parent iFrame element is present and ready for usage.
      await this.element(parentIframeLocator, this.config.elementTimeOut, pageInstance);

      // Obtain the parent iFrame using FrameLocator
      const parentFrameLocator = pageInstance.frameLocator(parentIframeLocator);

      // Obtain the child FrameLocator
      const childFrameLocator = parentFrameLocator.frameLocator(childIframeLocator);

      // Ensure that the child iFrame is ready for interaction, by checking for any element inside it
      await childFrameLocator.locator(childIframeVerificationLocator).waitFor({ state: "attached" });

      // Inform about successful navigation to the nested iFrame
      this.ts.informLog(
        this.config.beginInformMessage +
        " The automation successfully switched to nested iFrame."
      );

      // Return the FrameLocator for the nested iFrame
      return childFrameLocator;
    } catch (error) {
      // Error handling
      this.ts.errorLog(
        "Failed to switch to nested iFrame. " +
        this.iFrameNested.name + " " +
        __filename.split(__dirname + "/").pop() + " " +
        error
      );
      throw new Error(`Failed to switch to nested iFrame: ${error}`);
    }
  }

  /**
   * @description                       This method selects a value from the drop-down list by clicking over the drop-down list and the drop-down value.
   * @param locatorDropDownList         Provide a locator (string) of drop-down list.
   * @param locatorDropDownValue        Provide a locator (string) of drop-down value.
   * @param pageInstance                Optional. Provide the page instance. The default value is set to the current page. If you want to use this method with a new page, provide the new page instance.
   * @usage                             - Usage : Use the method by providing locator parameters.
   *                                      {constructorKeyword}.dropDown_ByDoubleClick({locator}, {locator});
   * @example                           Example : Provide the locators for two elemets.
   *                                      await dsl.dropDown_ByDoubleClick("#drop-down-list-id", "#drop-down-value-id");
   */
  async dropDown_ByDoubleClick(
    locatorDropDownList: Selector,
    locatorDropDownValue: Selector
  ): Promise<void> {
    try {
      // Click over the drop-down list element to list the drop-down values. In the same function we are verifying that the element is present and ready for usage.
      await this.click(locatorDropDownList);
      // Add a static wait, just to be sure that the drop-down list is opened.
      await this.ts.staticWait(3000);
      // Click over the drop-down value to choose this value. In the same function we are verifying that the element is present and ready for usage.
      await this.click(locatorDropDownValue);

      // Add the information message.
      this.ts.informLog(
        this.config.beginInformMessage +
        "The automated test selected successfully selected a value from the drop-down list."
      );

      // Add the alert message.
      this.ts.alertLog(
        "This method doesn't do any assertion. You need to check if the automation test selected correct drop-down value. Method name is '" +
        this.dropDown_ByDoubleClick.name +
        "', the class of the method is '" +
        __filename.split(__dirname + "/").pop() +
        "'"
      );
    } catch (error) {
      // Create the error log and show it to the UI. Show the function name, the class where the function is located and the cached error.
      this.ts.errorLog(
        "Failed to select the drop-down value. " +
        this.dropDown_ByDoubleClick.name + " " +
        __filename.split(__dirname + "/").pop() + " " +
        await error
      );
      throw new Error(`Failed to select the drop-down value: ${await error}`);
    }
  }

  /**
  * @description                       This method selects a value from the drop-down list by providing the value of the attribute "value".
  * @param locatorDropDownList         Provide a locator (string) of drop-down list.
  * @param DropDownAttributeValue      Provide a "value" attribute of the "option" element.
  * @param pageInstance                Optional. Provide the page instance. The default value is set to the current page. If you want to use this method with a new page, provide the new page instance.
  * @usage                             - Usage : Use the method by providing locator parameters and attribute "value".
  *                                      {constructorKeyword}.dropDown_oldStyle({locator}, {attribute value});
  * @example                           Example : Provide the locators for two elemets.
  *                                      await dsl.dropDown_oldStyle("#drop-down-list-id", "2");
  */
  async dropDown_oldStyle(
    locatorDropDownList: Selector,
    DropDownAttributeValue: Selector
  ): Promise<void> {
    try {
      // Call this method, to verify that the element is present and it is ready for usage.
      await this.element(locatorDropDownList, this.config.elementTimeOut);

      // Declare an element.
      let oldStyleDropDownList = this.page.locator(locatorDropDownList);
      // Select by value.
      await oldStyleDropDownList.selectOption(DropDownAttributeValue);
      // Verify that automation selected the value correctly.
      const selectedValue = await this.page.$eval(locatorDropDownList, (select) => (select as HTMLSelectElement).value);
      expect(selectedValue).toContain(DropDownAttributeValue);

      // Add the information message.
      this.ts.informLog(
        this.config.beginInformMessage +
        " The automated test selected a value '" +
        DropDownAttributeValue +
        "' from the drop-down list."
      );
    } catch (error) {
      // Create the error log and show it to the UI. Show the function name, the class where the function is located and the cached error.
      this.ts.errorLog(
        "Failed to select the drop-down value. " +
        this.dropDown_ByDoubleClick.name + " " +
        __filename.split(__dirname + "/").pop() + " " +
        await error
      );
      throw new Error(`Failed to select the drop-down value: ${await error}`);
    }
  }

  /**
   * @description                    This method shows the template for creating a custom DSL function.           
   */
  async templateDslFunction(): Promise<void> {
    // We are using try-catch block to catch the error and log it to the console.
    try {
      // Create the method steps here. Describe the custom command in this "try" statement (Domain Specific Language).
    } catch (error) {
      this.ts.errorLog(
        "Failed to create the custom DSL function. " +
        this.templateDslFunction.name + " " +
        __filename.split(__dirname + "/").pop() + " " +
        await error
      );
      throw new Error(`Failed to create the custom DSL function: ${await error}`);
    }
  }
}

// Export the current class.
export default Dsl;
