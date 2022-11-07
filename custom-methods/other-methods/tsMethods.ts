// Import Playwright test library.
import { Page } from "@playwright/test";
import { configuration } from "../../configs/configuration"; // Import configuration class. This class contains config data like messages, values, etc.

// Declare a class.
export class tsMethods {
  // Declare a page varible.
  page: Page;
  // Declare a constructor.
  constructor(page: Page) {
    // Get access to the page property.
    this.page = page;
  }
  public readonly conf = new configuration(); // Configuration constructor.

  /**
   * @description           This method waits for some time. We provide the time that we want to stay at this statement.
   * @param periodTime      Provide the time that we want to wait. The provided number is milliseconds.
   * @type                  The type of this method is set to "Promise<void>".
   * @usage                 - Usage: Use the method by providing number for milliseconds.
   *                          {constructorKeyword}.staticWait({milliseconds});
   * @example               Example: Provide a number.
   *                        await dsl.staticWait(10000);
   *
   */
  async staticWait(periodTime: number): Promise<void> {
    // Static wait.
    await this.page.waitForTimeout(periodTime);
    this.informLog(
      this.methodMessages_informMessage(
        this.conf.beginInformMessage +
          " The automation test paused the execution of the code for '" +
          periodTime +
          "' milliseconds."
      )
    );
  }

  /**
   * @description           This method listens for all console events and handles errors.
   * @type                  The type of this method is set to "Promise<void>".
   * @usage                 - Usage: Use the method by providing parent and child iFrame locators.
   *                          {constructorKeyword}.consoleLog();
   * @example               Example: Provide the locators for parent and child iFrame elements.
   *                        await dsl.consoleLog();
   */
  async consoleLog(): Promise<void> {
    // Listen for all console events and handle errors.
    this.page.on("console", (msg) => {
      if (msg.type() === "error") console.log(`Error text: "${msg.text()}"`);
    });
  }

  /**
   * @description           This method returns error messages in the console. The error message is colourized in red background.
   * @param errorMessage    Provide the error text message.
   * @type                  The type of this method is set to "void".
   * @usage                 - Usage: Use the method by providing a text error message.
   *                          {constructorKeyword}.errorLog({error text message});
   * @example               Example: Provide the error string.
   *                        await dsl.errorLog("ERROR MESSAGE!");
   */
  errorLog(errorMessage: string): void {
    // Print the error message.
    console.log(
      "\x1b[41m\x1b[1m",
      this.conf.beginErrorMessage + " " + errorMessage,
      "\x1b[0m"
    );
  }

  /**
   * @description           This method returns alert messages in the console. The alert message is colourized in yellow background.
   * @param alertMessage   Provide the alert text message.
   * @type                  The type of this method is set to "void".
   * @usage                 - Usage: Use the method by providing a text alert message.
   *                          {constructorKeyword}.informLog({alert text message});
   * @example               Example: Provide the alert string.
   *                        await dsl.informLog("INFORMATION MESSAGE!");
   */
  alertLog(alertMessage: string): void {
    // Print the alert message.
    console.log(
      "\x1b[43m\x1b[1m",
      this.conf.beginAlertMessage + " " + alertMessage,
      "\x1b[0m"
    );
  }

  /**
   * @description           This method returns information messages in the console. The information message is colourized in yellow background.
   * @param informMessage   Provide the information text message.
   * @type                  The type of this method is set to "void".
   * @usage                 - Usage: Use the method by providing a text information message.
   *                          {constructorKeyword}.informLog({information text message});
   * @example               Example: Provide the information string.
   *                        await dsl.informLog("INFORMATION MESSAGE!");
   */
  informLog(informMessage: string): void {
    // Print the inform message.
    console.log("\x1b[32m\x1b[1m", informMessage, "\x1b[0m");
  }

  /**
   * @description              This method adds an error message template to custom methods.
   * @param methodName         Provide the method name.
   * @param classPath          Provide the method classpath.
   * @param errorMessage       Optional. Provide the handled error.
   * @returns                  Return the string with the whole error message.
   */
  public methodMessages_errorMessage(
    methodName: any,
    classPath: any,
    errorMessage?: string
  ): string {
    if (errorMessage != null) {
      return (
        this.conf.beginErrorMessage +
        " from the unit! The function with the name '" +
        methodName +
        "' located inside the '" +
        classPath +
        "' class has the following error: '" +
        errorMessage +
        "'."
      );
    } else {
      return (
        this.conf.beginErrorMessage +
        " from the unit! The function with the name '" +
        methodName +
        "' located inside the '" +
        classPath +
        "' class."
      );
    }
  }

  /**
   * @description              This method adds an error message template to custom methods inside if-else statements..
   * @param methodName         Provide the method name.
   * @param classPath          Provide the method classpath.
   * @returns                  Return the string with the whole error message.
   */
  public methodMessages_errorMessage2(methodName: any, classPath: any): string {
    return (
      " For more details review The function with the name '" +
      methodName +
      "' located inside the '" +
      classPath +
      "' class."
    );
  }

  /**
   * @description              This method adds an information message template to custom methods.
   * @param informMessage      Provide the information message.
   * @returns                  Return the string with the whole information message.
   */
  public methodMessages_informMessage(informMessage: string): string {
    if (this.conf.methodMessages_informationMessage == "enable") {
      return informMessage;
    } else if (this.conf.methodMessages_informationMessage == "disable") {
      // No message, because it is disabled!
      return "";
    } else {
      this.errorLog(
        this.conf.beginErrorMessage +
          " It seems that you provided the wrong string value. Please give an 'enable' or 'disable' value only!"
      );
      return (
        this.conf.beginErrorMessage +
        " It seems that you provided the wrong string value. Please give an 'enable' or 'disable' value only!"
      );
    }
  }
}

// Export the current class.
export default tsMethods;
