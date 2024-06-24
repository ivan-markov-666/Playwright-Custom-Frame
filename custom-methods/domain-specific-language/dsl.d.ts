import { Locator } from "@playwright/test";  // Приемаме, че Locator е правилният тип от @playwright/test

/**
 * @description Type representing positive integers used for screen sizes.
 */
export type PositiveInteger = number;

/**
 * @description Type representing a URL.
 */
export type Url = string;

/**
 * @description Type representing a CSS or XPATH selector as a string or a Playwright locator object.
 */
export type LocatorOrElement = string | Locator;

/**
 * @description Type representing a CSS or XPATH selector as a string. 
 */
export type Selector = string;

/**
 * @description Type representing a Playwright locator object.
 */
export type Element = Locator | null;

/**
 * @description Type representing valid actions for checkable elements such as radio buttons and checkboxes.
 */
export type CheckOrClickAction = 'check' | 'click';

/**
 * @description Type representing valid actions for cunheckable elements such as radio buttons and checkboxes.
 */
export type UnCheckOrUnClickAction = 'uncheck' | 'click';

/**
 * @description Type representing valid actions for the keyboard.
 */
export type KeyboardKeys = "Alt" | "Control" | "Meta" | "Shift";

/**
 * Интерфейс, дефиниращ структурата на параметрите за задаване на размер на екрана.
 */
export interface interfaceExampleParam {
  propertyOne: PositiveInteger;
  properyTwo: PositiveInteger;
}
