import { defineConfig, devices } from '@playwright/test';
import path from 'path'; // Add this line to import the 'path' module

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
import dotenv from 'dotenv';
import assert from 'assert';
dotenv.config({ path: path.resolve(__dirname, '.env'), quiet: true });

assert(process.env.MOVIES_USERNAME, 'MOVIES_USERNAME env var is not set');
assert(process.env.MOVIES_PASSWORD, 'MOVIES_PASSWORD env var is not set');

export const STORAGE_STATE = path.join(__dirname, 'playwright/.auth/user.json');

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
  testDir: './tests',
  /* Run tests in files in parallel */
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 1 : undefined,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: process.env.CI 
    ? [
        ['html'], 
        ['list'], 
        ['github'],
        ['blob']
      ] 
    : 'html',
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    /* Base URL to use in actions like `await page.goto('/')`. */
    baseURL: 'http://localhost:3000/',

    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: 'on-first-retry',
  },
  captureGitInfo: { commit: true, diff: true },

  /* Configure projects for major browsers */
  projects: [
    {
      name: 'setup',
      testDir: 'tests/logged-in',
      testMatch: '**/*.setup.ts',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'logged-in chrome',
      testDir: 'tests/logged-in',
      dependencies: ['setup'],
      use: {
        storageState: STORAGE_STATE,
        ...devices['Desktop Chrome'],
      },
    },
    {
      name: 'chromium',
      testDir: 'tests/logged-out',
      use: { ...devices['Desktop Chrome'] },
    },

    /* Test against mobile viewports. */
    // {
    //   name: 'Mobile Chrome',
    //   use: { ...devices['Pixel 5'] },
    // },
    // {
    //   name: 'Mobile Safari',
    //   use: { ...devices['iPhone 12'] },
    // },

    /* Test against branded browsers. */
    // {
    //   name: 'Microsoft Edge',
    //   use: { ...devices['Desktop Edge'], channel: 'msedge' },
    // },
    // {
    //   name: 'Google Chrome',
    //   use: { ...devices['Desktop Chrome'], channel: 'chrome' },
    // },
  ],

  /* Run your local dev server before starting the tests */
  webServer: {
    command: `npm run dev`,
    url: "http://127.0.0.1:3000/",
    reuseExistingServer: !process.env.CI,
  },
});
