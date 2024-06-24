import { Page, expect } from "@playwright/test"; // Add this to have suggestions in the spec class.
import { Configuration } from "../../configs/configuration"; // Add this to have suggestions in the spec class.
import { TsMethods } from "../other-methods/tsMethods";
import { PositiveInteger, LocatorOrElement, Element } from "./dsl.d";


class DslHelper {
    private page: Page;
    private tsMethods: TsMethods;

    constructor(page: Page, tsMethods: TsMethods) {
        this.page = page;
        this.tsMethods = tsMethods;
    }

    async resolveElement(locatorOrElement: LocatorOrElement): Promise<Element> {
        let element: Element = null;
        if (typeof locatorOrElement === "string") {
            element = this.page.locator(locatorOrElement);
        } else if (locatorOrElement && 'waitFor' in locatorOrElement) {
            element = locatorOrElement;
        } else {
            this.tsMethods.errorLog(
                "You have entered a not supported data type. Please provide a locator (string) or element (object)."
            );
        }
        return element;
    }
}

// Declare a class.
export class DslExample {
    // Declare a page varible.
    page: Page;
    context: any;
    config: Configuration;
    ts: TsMethods;
    private dslHelper: DslHelper;  // Instance of the new class

    // Declare a constructor.
    constructor(page: Page, context?: any) {
        // Get access to the page property.
        this.page = page;
        this.context = context;
        this.ts = new TsMethods(page);
        this.config = new Configuration();
        this.dslHelper = new DslHelper(page, this.ts);  // Initialize the resolver
        
    }

    async element(locatorOrElement: LocatorOrElement, timeoutPeriod?: PositiveInteger): Promise<Element> {
        try {
            const element = await this.dslHelper.resolveElement(locatorOrElement);  // Use the resolver

            if (element) {
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
            }
            else {
                this.ts.errorLog("The element value is null. Please provide a valid element.");
            }

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
            this.ts.errorLog(this.element.name + " " + __filename.split(__dirname + "/").pop() + " " + await error);
            // This line of code will never be reached, because 'errorLog' will stop the execution of the code. However, we need to return something, because the TypeScript compiler requires it, otherwise it will throw an error in the console.
            return null;
        }
    }
}

// Export the current class.
export default DslExample;


