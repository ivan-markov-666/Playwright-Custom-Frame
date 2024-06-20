import { Page } from "@playwright/test";
import { TsMethods } from "../custom-methods/other-methods/tsMethods";
import { Dsl } from "../custom-methods/domain-specific-language/dsl";

// Ensure dotenv is configured (if not already configured in your entry file)
import * as dotenv from 'dotenv';
dotenv.config();

// Declare a class.
export class BaseClass {
  // Declare page, ts, and dsl as readonly members of the class.
  public readonly ts: TsMethods;
  public readonly dsl: Dsl;
  public readonly url: string;

  // Declare a page constructor.
  constructor(public page: Page) {
    this.ts = new TsMethods(page);
    this.dsl = new Dsl(page);

    // Construct the URL from environment variables. Default to HTTP and localhost if not specified.
    const protocol = process.env.DEMOQA_PROTOCOL || 'http'; // Use HTTPS as default protocol if not specified in .env
    const url = process.env.DEMOQA_URL || 'localhost'; // Use localhost as default URL if not specified in .env
    this.url = `${protocol}://${url}`;
  }

  // It is still empty because we don't have any data to put in it yet. Feel free to add data to it.
  public async beforeTest() {
    // Placeholder for method to run before each test. Add any setup code here.
  }
}

// Export the current class.
export default BaseClass;
