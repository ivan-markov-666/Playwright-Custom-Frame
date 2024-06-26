/**
 * @description     This class contains configuration for API tests.
 */

import type { PlaywrightTestConfig } from '@playwright/test';
import { devices } from '@playwright/test';

/**
 * See https://playwright.dev/docs/test-configuration.
 */
const config: PlaywrightTestConfig = {
  /* Set up the test folder. That's the place where we put the tests. If we want to add another folder containing tests, we need to add the path to this folder here. */
  testDir: './tests/api',
  /* Maximum time one test can run for. */
  timeout: 30 * 1000,
  expect: {
    /**
     * Maximum time expect() should wait for the condition to be met.
     * For example in `await expect(locator).toHaveText();`
     */
    timeout: 5000
  },
  /* Run tests in files in parallel */
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  /* This configuration re-runs the tests if they fail. We have two values - one for CI and one for local execution. */
  retries: process.env.CI ? 2 : 0,
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 1 : undefined,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: 'html',
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    /* Maximum time each action such as `click()` can take. Defaults to 0 (no limit). */
    actionTimeout: 0,

    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    /** @values 
       off                  - Do not record a trace.
       on                   - Record a trace for each test.
       retain-on-failure    - Record a trace for each test, but remove it from successfull test runs.
       on-first-retry       - Record a trace only when retrying a test for the first time.
        */
    trace: 'on',
  },

  /* Configure projects for major browsers */
  projects: [
    {
      name: 'chromium',
      use: {
        ...devices['Desktop Chrome'],
        /** Change the value from "false" to "true" if we want to use a headless browser version. */
        headless: true
      },
    },
  ],
};

export default config;
