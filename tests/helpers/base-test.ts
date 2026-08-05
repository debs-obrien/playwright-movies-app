import { test as base } from '@playwright/test';
import { resetMockApi } from './reset-mock-api';

/**
 * Base test for logged-in specs: resets mock list state before each test.
 * Requires a single worker (see playwright.config) so resets do not race.
 */
export const test = base.extend({
  _resetMockApi: [
    async ({ request }, use) => {
      await resetMockApi(request);
      await use(undefined);
    },
    { auto: true },
  ],
});

export { expect } from '@playwright/test';
