// import { Page, FrameLocator, expect } from "@playwright/test"; // Add this to have suggestions in the spec class.
// import { Configuration } from "../../configs/configuration"; // Add this to have suggestions in the spec class.
// import { TsMethods } from "../other-methods/tsMethods";
// import { PositiveInteger, Url, LocatorOrElement, Selector } from "./dsl.d";
// import assert from 'assert';

// class DslHelper {
//     private page: Page;
//     private ts: TsMethods;
  
//     constructor(page: Page, ts: TsMethods) {
//       this.page = page;
//       this.ts = ts;
//     }
  
//     async resolveElement(locatorOrElement: LocatorOrElement): Promise<und> {
//       try {
//         let element: any;
//         if (typeof locatorOrElement === "string") {
//           element = this.page.locator(locatorOrElement);
//         } else if (typeof locatorOrElement === "object") {
//           element = locatorOrElement;
//         } else {
//           this.ts.errorLog(
//             "You have entered a not supported data type. Please provide a locator (string) or element (object)."
//           );
//         }
//         return element;
//       } catch (error) {
//         this.ts.errorLog(
//           "Error Message: " + error
//         );
//       }
//     }
//   }
  

// // Declare a class.
// export class Dsl {
//   // Declare a page varible.
//   page: Page;
//   context: any;
//   config: Configuration;
//   ts: TsMethods;
//   dslHelper: DslHelper;

//   // Declare a constructor.
//   constructor(page: Page, context?: any) {
//     // Get access to the page property.
//     this.page = page;
//     this.context = context;
//     this.ts = new TsMethods(page);
//     this.config = new Configuration();
//     this.dslHelper = new DslHelper(page, this.ts);
//   }

//   /**
//    * @description               This function is responsible for selecting an element and verifying that the element is ready to be used.
//    * @param locatorOrElement    Provide a locator (string) or element (object). The method uses a mechanism to use a locator (string) and an element (object). That is useful if we want to provide just a locator or give the whole element (in cases when we want to use this method with iFrames or want to use the method with other browser windows).
//    * @param timeoutPeriod       Optional. Provide the time out in miliseconds.
//    * @return                    We are returning the element.
//    * @type                      The type is set to: "Promise<any>".
//    * @usage                     - Usage 1: Use the method by providing a locator parameter and timeout period.
//    *                              {constructorKeyword}.element({locator}, {timeout});
//    *                            - Usage 2: Use the method by providing a locator parameter without timeout period.
//    *                              {constructorKeyword}.element({locator});
//    *                            - Usage 3: Use the method by providing an element parameter and timeout period.
//    *                              {constructorKeyword}.element({element}, {timeout});
//    *                            - Usage 4: Use the method by providing an element parameter without timeout period.
//    *                              {constructorKeyword}.element({element});
//    * @example                   Example 1: Provide the locator and timeout.
//    *                              let elementName: any = page.locator("#id");
//    *                              await dsl.element(elementName, 10000);
//    *                            Example 2: Provide the locator without the timeout.
//    *                              let elementName: any = page.locator("#id");
//    *                              await dsl.element(elementName);
//    *                            Example 3: Provide the element and timeout.
//    *                              await dsl.element("#id", 10000);
//    *                            Example 4: Provide the element without timeout.
//    *                               await dsl.element("#id");
//    */
//   async element(locatorOrElement: LocatorOrElement, timeoutPeriod?: PositiveInteger): Promise<any> {
//     try {
        
//       // Wait for the element to be visible.
//       await element.waitFor({ state: "visible", timeout: timeoutPeriod });
//       // Verify that the element is visible.
//       await expect(await element).toBeVisible({
//         timeout: timeoutPeriod,
//       });
//       // Verify that the element is not hidden.
//       await expect(await element).not.toBeHidden({
//         timeout: timeoutPeriod,
//       });
//       // Verify that the element is enabled.
//       await expect(await element).toBeEnabled({
//         timeout: timeoutPeriod,
//       });
//       // Verify that the element is not disabled.
//       await expect(await element).not.toBeDisabled({
//         timeout: timeoutPeriod,
//       });
//       // Verify that the element is the only one in the DOM tree.
//       await expect(await element).toHaveCount(1, {
//         timeout: timeoutPeriod,
//       });

//       // Add the information message.
//       if (timeoutPeriod == null) {
//         this.ts.informLog(
//           this.config.beginInformMessage + "The element was selected."
//         );
//       } else {
//         this.ts.informLog(
//           this.config.beginInformMessage +
//           "The element was selected. Timeout was set to: " +
//           timeoutPeriod +
//           " milliseconds."
//         );
//       }

//       // Return the selected element.
//       return await element;
//     } catch (error) {
//       // Unit Test.
//       // Create the error log and show it to the UI. Show the function name, the class where the function is located and the cached error.
//       this.ts.errorLog(
//         this.element.name + " " +
//         __filename.split(__dirname + "/").pop() + " " +
//         await error
//       );
//     }
//   }



//   /**
//  * @description                    This method shows the template for creating a custom DSL function.           
//  */
//   async resolveElement(locatorOrElement: LocatorOrElement): Promise<void> {
//     // We are using try-catch block to catch the error and log it to the console.
//     try {
//       let element: any; // Declare an internal variable for assigning the element value.
//       // If the provided value is a string, this is just a selector.
//       if (typeof locatorOrElement === "string") {
//         // We need to transform this selector into an element.
//         element = this.page.locator(await locatorOrElement);
//       }
//       // If the provided value is an object, this is the whole element.
//       else if (
//         typeof locatorOrElement === "object"
//       ) {
//         // So we don't need to do anything else unique.
//         element = locatorOrElement;
//       }
//       // Unit test.
//       else {
//         this.ts.errorLog(
//           "You have entered a not supported data type. Please provide a locator (string) or element (object)." +
//           this.resolveElement.name + " " +
//           __filename.split(__dirname + "/").pop()
//         );
//       }
//     } catch (error) {
//       this.ts.errorLog(
//         this.resolveElement.name + " " +
//         __filename.split(__dirname + "/").pop() + " " +
//         await error
//       );
//     }
//   }
// }

// // Export the current class.
// export default Dsl;


