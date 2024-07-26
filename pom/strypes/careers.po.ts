//01. Import libraries and classes.
// Import Playwright test library.
import { expect, Page } from "@playwright/test";
// Import BaseClass.
import { BaseClass } from "../../baseClass/baseClass";

//02. Declare a class.
class CareersPom extends BaseClass {
  //03. Declare a page variable.

  //04. Declare elements and selectors.
  greatPlaceToWork_button: string;
 
  //05. Declare a constructor.
  constructor(page: Page) {
    // Add 'super' because the constructor for the derived class must contain that call. Add 'page' argument inside.
    super(page);
    //06. Get access to the page property.
    this.page = page;

    //07. Add selectors.
    this.greatPlaceToWork_button = `(//*[@class="elementor-widget-container"]/a)[3]`;
  }

  /**
   * @description       This method changes the screen size.
   */
  async screenSize() {
    // Set the screen size to 1920-1080.
    await this.dsl.screenSize(1920, 1080);
  }

  /**
   * @description       This method navigates the user to the URL address.
   * @param url         Provide the URL address where the automation will redirect the user.
   */
  async navigate(url: string) {
    // Navigate to: https://strypes.eu/careers/ .
    await this.dsl.navigateTo(url);
  }

  /**
   * @description       This method fills the input text element.
   * @param assertUrl   Provide the URL address that should be loaded after pressing the 'Great Place To Work' button.
   */
  async clickGreatPlaceToWork(assertUrl: string) {
    // Click on the "Great Place To Work"
    await this.dsl.click(this.greatPlaceToWork_button, this.page);
    await expect(this.page).toHaveURL(assertUrl) 
  }
}

//09. Export the class.
export default CareersPom;
