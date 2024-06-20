/**
 * @description     This class contains configuration for Weather Underground automation.
 */

import type { PlaywrightTestConfig } from '@playwright/test';
import { devices } from '@playwright/test';

/**
 * See https://playwright.dev/docs/test-configuration.
 */
const config: PlaywrightTestConfig = {
  /* Set up the test folder. That's the place where we put the tests. If we want to add another folder containing tests, we need to add the path to this folder here. */
  testDir: './tests/weather-underground',
  /* Maximum time one test can run for. */
  timeout: 3600000,
  expect: {
    /**
     * Maximum time expect() should wait for the condition to be met.
     * For example in `await expect(locator).toHaveText();`
     */
    timeout: 25000
  },
  /* Run tests in files in parallel */
  fullyParallel: true,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: 'html',
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    /* Maximum time each action such as `click()` can take. Defaults to 0 (no limit). */
    actionTimeout: 45000,
    trace: 'on',
  },

  /* Configure projects for major browsers */
  projects: [
    {
      name: 'chromium',
      use: {
        ...devices['Desktop Chrome'],
        /** Change the value from "false" to "true" if we want to use a headless browser version. */
        headless: false
      },
    },
  ],
};

export default config;
