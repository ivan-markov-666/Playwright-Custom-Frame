//01. Import classes.
import { Page, Locator, FrameLocator } from "@playwright/test"; // Add this to have suggestions in the spec class.
import { Dsl } from "../../custom-methods/domain-specific-language/dsl";
import { TsMethods } from "../../custom-methods/other-methods/tsMethods";

//02. Declare a class.
class HomePage_WU {
  //03. Declare a page varible.
  page: Page;
  dsl: Dsl;
  ts: TsMethods;

  iFrameLocator: string;
  accpetCookies_Button: string;
  searchLocations_InputTextElement: Locator;
  stationLocation_WebElement: string;
  stationPageHyperlink_WebElement: string;
  monthly_DropDownList: string;
  month_DropDownList: string;
  year_DropDownList: string;
  view_Button: string;
  table_Builder: string;
  dateValue_WebElement: string;
  precipitation_TextContent: string;
  windSpeed_TextContent: string;
  windGust_TextContent: string;
  stationInfo_Button: string;
  stationName_TextContent: string;
  stationCoordinates_TextContent: string;

  //04. Declare a constructor.
  constructor(page: Page) {
    // Get access to the page property.
    this.page = page;

    //05. Add locators.
    this.iFrameLocator = `//*[@id='sp_message_iframe_1100082']`;
    this.accpetCookies_Button = `//*[@*='Accept all']`;
    this.searchLocations_InputTextElement = page.locator(`(//*[@id='wuSearch'])[2]`);
    this.stationLocation_WebElement = `(//li[contains(text(),'city')]/following::a)[1]`;
    this.stationPageHyperlink_WebElement = `//*[@class="station-nav"]/*[@href]`;
    this.monthly_DropDownList = `//*[@id='modeSelect']`;
    this.month_DropDownList = `//*[@id='monthSelect']`;
    this.year_DropDownList = `//*[@id='yearSelect']`;
    this.view_Button = `//button[contains(text(),'View')]`;

    this.table_Builder = `//*[@*='history_graphs']/*[contains(text(),'table')]`;
    this.dateValue_WebElement = `//*[@class='scrollable']//strong`;

    this.precipitation_TextContent = `(//*[contains(text(),'Precipitation')]/following-sibling::*//span)[2]`;
    this.windSpeed_TextContent = `(//*[contains(text(),'Wind Speed')]/following-sibling::*//span)[2]`;
    this.windGust_TextContent = `(//*[contains(text(),'Wind Gust')]/following-sibling::*//span)[2]`;
    this.stationInfo_Button = `//*[@class='icons']/lib-pws-info-icon`;
    this.stationName_TextContent = `//*[contains(text(),'Weather Station ID:')]/span`;
    this.stationCoordinates_TextContent = `(//*[contains(text(),'Latitude / Longitude:')]/following-sibling::span)[1]`;

    // Create a new instance of the Dsl class.
    this.dsl = new Dsl(this.page);
    // Create a new instance of the Ts class.
    this.ts = new TsMethods(this.page);
  }

  //06. Add custom methods.
  /**
   * @description     Find the station by location.
   * @param url       Provide the URL.
   * @param location  Provide the location of the station.
   * @param month     Provide the month.
   * @param year      Provide the year.
   */
  async findStationByLocation(url: string, location: string, month: string, year: string, iterator: number) {

    const expectedMonthDates = this.getDaysInMonth(month, parseInt(year));
    const actualMonthDates: number[] = [];
    await this.dsl.navigateTo(url);
    if (iterator === 0) {
      await this.clickAcceptCookies(this.iFrameLocator, this.accpetCookies_Button);
    }
    await this.ts.staticWait(5000);
    await this.dsl.sendKeys(this.searchLocations_InputTextElement, location);
    await this.dsl.click(this.stationLocation_WebElement);
    await this.dsl.click(this.stationPageHyperlink_WebElement);
    await this.ts.staticWait(5000);
    await this.dsl.dropDown_oldStyle(this.monthly_DropDownList, "monthly");
    await this.dsl.dropDown_oldStyle(this.year_DropDownList, year);
    await this.dsl.dropDown_oldStyle(this.month_DropDownList, month);
    await this.dsl.click(this.view_Button);

    await this.dsl.click(this.table_Builder);
    const dateValues = await this.dsl.getElementsByLocator(this.dateValue_WebElement);
    for (let i = 0; i < dateValues.length; i++) {
      const dateValue = await this.dsl.getText(dateValues[i]);
      // console.log('-------------------------' + dateValue);
      if (dateValue != null) {
        const day = this.extractDayFromDate(dateValue);
        // console.log('-------------------------' + day);
        actualMonthDates.push(day);
      }
    }

    if (actualMonthDates.length === expectedMonthDates) {
      console.log('The number of days in the month is correct.');
    }
    else {
      console.log('The number of days in the month is INCORRECT.');
    }

    // const percipitation = await this.dsl.getInnerText(this.precipitation_TextContent);
    // console.log('-------------------------' + percipitation);
    // const windSpeed = await this.dsl.getInnerText(this.windSpeed_TextContent);
    // console.log('-------------------------' + windSpeed);
    // const windGust = await this.dsl.getInnerText(this.windGust_TextContent);
    // console.log('-------------------------' + windGust);
    // await this.dsl.click(this.stationInfo_Button);
    // const stationName = await this.dsl.getInnerText(this.stationName_TextContent);
    // console.log('-------------------------' + stationName);
    // const stationCoordinates = await this.dsl.getInnerText(this.stationCoordinates_TextContent);
    // console.log('-------------------------' + stationCoordinates);
  }

  async clickAcceptCookies(frameSelector: string, elementSelector: string): Promise<void> {
    // Provide the locator of an iFrame element.
    let iFrame = await this.dsl.iFrame(frameSelector);
    // Declare an element. This element is positioned inside the iFrame.
    const acceptCookiesBotton = await (this.dsl.element(iFrame.locator(elementSelector)));
    await this.ts.staticWait(5000);
    await acceptCookiesBotton.click();
  }

  /**
 * @description This method parses a date from MM-DD-YYYY format and extracts the month and year.
 * @param dateStr The date string in MM-DD-YYYY format.
 * @returns An object containing the month as a string and the year as a number.
 */
  async parseDate(dateStr: string): Promise<{ month: string, year: string }> {
    // Array with month names
    const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    // Split the date string into components
    const [month, day, year] = dateStr.split('-');

    // Convert month and year to appropriate types
    const monthIndex = parseInt(month, 10) - 1; // Month index for array (0-based)
    const yearNumber = parseInt(year, 10).toString();

    // Get the month name from the month index
    const monthName = monthNames[monthIndex];

    // Return the extracted month name and year
    return {
      month: monthName,
      year: yearNumber
    };
  }

  /**
 * @description This function extracts the day from a date string in MM/DD/YYYY format.
 * @param dateStr The date string in MM/DD/YYYY format.
 * @returns The day as a number.
 */
  extractDayFromDate(dateStr: string): number {
    // Split the date string into components
    const [month, day, year] = dateStr.split('/');

    // Convert day to number and return
    return parseInt(day, 10);
  }

  /**
   * @description This function returns the number of days in a given month for a specific year.
   * @param month The month as a string ("January", "February", etc.).
   * @param year The year as a number.
   * @returns The number of days in the month for the given year.
   */
  getDaysInMonth(month: string, year: number): number {
    // Array with month names
    const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    // Find the month index (0-based)
    const monthIndex = monthNames.indexOf(month);

    if (monthIndex === -1) {
      throw new Error("Invalid month name");
    }

    // Create a new Date object set to the first day of the next month, then go back one day.
    // This way we get the last day of the given month.
    return new Date(year, monthIndex + 1, 0).getDate();
  }

}


//07. Export the class.
export default HomePage_WU;
