// spec: specs/movies-list-plan.md
// seed: tests/logged-in/seed.spec.ts

import { expect } from '@playwright/test';
import { listTest as test } from '../helpers/list-test';

test.describe('Deleting Movie Lists', { tag: '@agent' }, () => {
  test('Navigate to Delete Page and Cancel', async ({ listPage }) => {
    const page = listPage;

    // 1. From the list view page, click "Edit" button
    await page.getByRole('link', { name: 'Edit' }).click();

    // 2. Click "Delete List" link
    await page.getByRole('link', { name: 'Delete List' }).click();

    // 3. Observe the Delete List page
    await expect(page.getByRole('heading', { name: 'Delete List' })).toBeVisible();

    // 4. Click "View List" to navigate away without deleting
    await page.getByRole('link', { name: 'View List' }).click();

    // 5. Verify list still exists
    await expect(page.getByRole('heading', { name: 'my favorite movies', exact: true })).toBeVisible();
  });
});
