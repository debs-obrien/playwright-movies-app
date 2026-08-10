import { test } from '../helpers/list-fixtures';

/**
 * Seed file for Playwright test agents. Skipped in normal runs so the heavy
 * listPage fixture is not paid for an empty body.
 */
test.describe('Test group', () => {
  test.skip('seed', async ({ listPage }) => {
    void listPage;
  });
});
