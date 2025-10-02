// spec: specs/movies-list-plan.md
// seed: tests/logged-in/seed.spec.ts

import { listTest as test } from '../helpers/list-test';
import { expect } from '@playwright/test';

test.describe('Sharing Lists', () => {
  test('Open Share Dialog', async ({ listPage }) => {
    const page = listPage;

    // 2. Click "Share" button
    await page.getByRole('button', { name: 'Share' }).click();

    // Verify dialog shows heading "Share my favorite movies"
    await expect(page.getByRole('heading', { name: 'Share my favorite movies' })).toBeVisible();

    // Verify URL field contains the list URL
    await expect(page.getByRole('textbox', { name: 'URL' })).toHaveValue(/http:\/\/localhost:3000\/list\?id=.*&page=1/);

    // Verify dialog element is present
    await expect(page.getByRole('dialog')).toBeVisible();
  });
});
