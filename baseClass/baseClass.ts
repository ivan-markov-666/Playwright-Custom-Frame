// Import Playwright test library.
import { Page } from "@playwright/test";
// Import faker-js library. Data-Driven Testing with dynamically generated data using faker-js.
import { faker } from "@faker-js/faker";
// Import tsMethods class.
import { TsMethods } from "../custom-methods/other-methods/tsMethods";
import { Dsl } from "../custom-methods/domain-specific-language/dsl";
// Import data from JSON file.
import env from "../fixtures/env/env.json";

// Declare a class.
export class BaseClass {
  // Declare a page constructor.
  constructor(public page: Page) {}

  public readonly ts = new TsMethods(this.page);
  public readonly dsl = new Dsl(this.page);

  public readonly url = env.toolsqa.protocol + "://" + env.toolsqa.production;
  public async beforeTest() {}
}

// Export the current class.
export default BaseClass;
