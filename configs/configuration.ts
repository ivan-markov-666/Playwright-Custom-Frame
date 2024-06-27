// 01. Define class with name.
export class Configuration {
  // 02. Define config values of the automation framework.

  /**
   * @description     This config is about turning the information messaging system on and off for custom methods. The messages appear in the terminal during the execution.
   * @type            The type is set to "string".
   * @public          The variable is public because it is used from outside of the class.
   * @param           enable - to activate.
   * @param           disable - to disable.
   */
  public errorMessagesToggle: "enable" | "disable" = "disable";

  /**
   * @description     This config is used to begin the information messages in the custom methods.
   * @type            The type is set to "string".
   * @public          The variable is public because it is used from outside of the class.
   */
  public beginInformMessage: string = "--Action: ";

  /**
   * @description     This config is used to begin the error messages in the custom methods.
   * @type            The type is set to "string".
   * @public          The variable is public because it is used from outside of the class.
   */
  public beginErrorMessage: string = "--ERROR: ";

  /**
   * @description     This config is used to begin the alert messages in the custom methods.
   * @type            The type is set to "string".
   * @public          The variable is public because it is used from outside of the class.
   */
  public beginAlertMessage: string = "--Alert: ";

  /**
   * @description     This config is used to set the timeout for elements. This config is used in the './custom-methods/domain-specific-language/dsl.ts' class.
   * @type            The type is set to "number".
   * @value           This value is used for milliseconds. Please provide an integer value.
   * @public          The variable is public because it is used from outside of the class.
   */
  public elementTimeOut: number = 10000;
}
