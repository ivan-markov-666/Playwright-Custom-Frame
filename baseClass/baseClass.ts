// Import Playwright test library.
import { Page } from "@playwright/test";
// Import faker-js library. Data-Driven Testing with dynamically generated data using faker-js.
import { faker } from "@faker-js/faker";
// Import tsMethods class.
import { tsMethods } from "../custom-methods/other-methods/tsMethods";
import { dsl } from "../custom-methods/domain-specific-language/dsl";
// Import data from JSON file.
import env from "../fixtures/env/env.json";

// Declare a class.
export class BaseClass {
  // Declare a page constructor.
  constructor(public page: Page) {}

  public readonly ts = new tsMethods(this.page);
  public readonly dsl = new dsl(this.page);

  public readonly url = env.toolsqa.protocol + "://" + env.toolsqa.production;
  public async beforeTest() {}
}

// Export the current class.
export default BaseClass;
