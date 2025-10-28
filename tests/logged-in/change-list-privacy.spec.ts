// spec: specs/movies-list-plan.md
// seed: tests/logged-in/seed.spec.ts

import { expect } from '@playwright/test';
import { openLists } from '../helpers/list-utilities';
import { listTest as test } from '../helpers/list-test';

test.describe('Editing List Details', { tag: '@agent' }, () => {
  test('Change List Privacy Setting', async ({ listPage }) => {
    const page = listPage;

    // 1. Click the "Edit" button from the list view
    await page.getByRole('link', { name: 'Edit' }).click();

    // 2. Click the "Public List?" field
    await page.getByRole('combobox', { name: 'Public List?' }).click();

    // 3. Change from "Yes" to "No"
    await page.getByRole('option', { name: 'No' }).click();

    // 4. Click the "Save" button
    await page.getByRole('button', { name: 'Save' }).click();

    // 5. Navigate to "My Lists" via User Profile menu
    await openLists(page);

    // Verify list label shows "(PRIVATE)"
    await expect(page.getByText('(PRIVATE)')).toBeVisible();
  });
});
