//01. Import classes.
import { Page, Locator, FrameLocator } from "@playwright/test"; // Add this to have suggestions in the spec class.
import { Dsl } from "../../custom-methods/domain-specific-language/dsl";

//02. Declare a class.
class HomePage_WU {
  //03. Declare a page varible.
  page: Page;
  dsl: Dsl;

  accpetCookies_Button: string;
  searchLocations_InputTextElement: Locator;
  stationLocation_WebElement: string;
  stationPageHyperlink_WebElement: string;
  monthly_DropDownList: string;
  month_DropDownList: string;
  year_DropDownList: string;
  view_Button: string;
  precipitation_TextContent: string;
  windSpeed_TextContent: string;
  windGust_TextContent: string;
  stationName_TextContent: string;
  stationCoordinates_TextContent: string;

  //04. Declare a constructor.
  constructor(page: Page) {
    // Get access to the page property.
    this.page = page;

    //05. Add locators.
    this.accpetCookies_Button = `//*[contains(text(),'Accept all')]`;
    this.searchLocations_InputTextElement = page.locator(`(//*[@id='wuSearch'])[2]`);
    this.stationLocation_WebElement = `(//li[contains(text(),'city')]/following::a)[1]`;
    this.stationPageHyperlink_WebElement = (`//*[@class="station-nav"]/*[@href]`);
    this.monthly_DropDownList = `//*[@id='modeSelect']`;
    this.month_DropDownList = `//*[@id='monthSelect']`;
    this.year_DropDownList = `//*[@id='yearSelect']`;
    this.view_Button = `//button[contains(text(),'View')]`;
    this.precipitation_TextContent = `(//*[contains(text(),'Precipitation')]/following-sibling::*//span)[2]`;
    this.windSpeed_TextContent = `(//*[contains(text(),'Wind Speed')]/following-sibling::*//span)[2]`;
    this.windGust_TextContent = `(//*[contains(text(),'Wind Gust')]/following-sibling::*//span)[2]`;
    this.stationName_TextContent = `//*[contains(text(),'Weather Station ID:')]/span`;
    this.stationCoordinates_TextContent = `(//*[contains(text(),'Latitude / Longitude:')]/following-sibling::span)[1]`;

    // Create a new instance of the Dsl class.
    this.dsl = new Dsl(this.page);
  }

  //06. Add custom methods.
  /**
   * @description     Find the station by location.
   * @param url       Provide the URL.
   * @param location  Provide the location of the station.
   * @param month     Provide the month.
   * @param year      Provide the year.
   */
  async findStationByLocation(url: string, location: string, month: string, year: string) {
    await this.dsl.navigateTo(url);
    await this.clickAcceptCookies('iframe[title="SP Consent Message"]', this.accpetCookies_Button);
    await this.dsl.sendKeys(this.searchLocations_InputTextElement, location);
    await this.dsl.click(this.stationLocation_WebElement);
    await this.dsl.click(this.stationPageHyperlink_WebElement);
    await this.dsl.dropDown_oldStyle(this.monthly_DropDownList, "monthly");
    await this.dsl.dropDown_oldStyle(this.month_DropDownList, month);
    await this.dsl.dropDown_oldStyle(this.year_DropDownList, year);
    await this.dsl.click(this.view_Button);
    const percipitation = await this.dsl.getInnerText(this.precipitation_TextContent);
    console.log('-------------------------' + percipitation);
    const windSpeed = await this.dsl.getInnerText(this.windSpeed_TextContent);
    console.log('-------------------------' + windSpeed);
    const windGust = await this.dsl.getInnerText(this.windGust_TextContent);
    console.log('-------------------------' + windGust);
    const stationName = await this.dsl.getInnerText(this.stationName_TextContent);
    console.log('-------------------------' + stationName);
    const stationCoordinates = await this.dsl.getInnerText(this.stationCoordinates_TextContent);
    console.log('-------------------------' + stationCoordinates);
  }

  async clickAcceptCookies(frameSelector: string, elementSelector: string): Promise<void> {
    // Намира iFrame чрез селектор и създава FrameLocator
    const frame: FrameLocator = this.page.frameLocator(frameSelector);

    // Достъпва елемент вътре в iFrame и изпълнява действие (например клик)
    await frame.locator(elementSelector).click();

    // Допълнително, можеш да използваш други методи като getText(), fill(), etc.
    // Например, ако искаш да вземеш текста на елемента
    const text = await frame.locator(elementSelector).textContent();
    console.log("Text of the element:", text);
  }
}


//07. Export the class.
export default HomePage_WU;
