// spec: specs/movies-list-plan.md#7.1
// seed: tests/helpers/list-test.ts

import { expect } from '@playwright/test';
import { listTest as test } from '../helpers/list-test';

test.describe('Sharing Movie Lists', { tag: '@agent' }, () => {
  test('Open Share Dialog', async ({ listPage }) => {
    const page = listPage;

    // 1. From the list view page, click the "Share" button
    await page.getByRole('button', { name: 'Share' }).click();

    // 2. Observe the dialog that appears - verify dialog displays heading "Share my favorite movies"
    await expect(page.getByRole('heading', { name: 'Share my favorite movies' })).toBeVisible();

    // Verify dialog contains a URL textbox with pre-populated list URL in the expected format
    const urlTextbox = page.getByRole('textbox', { name: 'URL' });
    await expect(urlTextbox).toBeVisible();
    const urlValue = await urlTextbox.inputValue();
    expect(urlValue).toMatch(/^http:\/\/localhost:3000\/list\?id=.+&page=1$/);
  });
});
