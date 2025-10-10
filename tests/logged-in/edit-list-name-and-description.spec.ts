// spec: specs/movies-list-plan.md
// seed: tests/logged-in/seed.spec.ts

import { expect } from '@playwright/test';
import { listTest as test } from '../helpers/list-test';

test.describe('Editing List Details', { tag: '@agent' }, () => {
  test('Edit List Name and Description Together', async ({ listPage }) => {
    const page = listPage;

    // 1. Click the "Edit" button from the list view
    await page.getByRole('link', { name: 'Edit' }).click();

    // 2. Update "Name" field to "Top Sci-Fi Films"
    await page.getByRole('textbox', { name: 'Name' }).fill('Top Sci-Fi Films');

    // 3. Update "Description" field to "Best science fiction movies of all time"
    await page.getByRole('textbox', { name: 'Description' }).fill('Best science fiction movies of all time');

    // 4. Click the "Save" button
    await page.getByRole('button', { name: 'Save' }).click();

    // 5. Verify both fields are updated
    await expect(page.getByRole('heading', { name: 'Top Sci-Fi Films' })).toBeVisible();
    await expect(page.getByRole('textbox', { name: 'Description' })).toHaveValue('Best science fiction movies of all time');

    // 6. Navigate to "View List"
    await page.getByRole('link', { name: 'View List' }).click();

    // Verify updated values display on View List page
    await expect(page.getByRole('heading', { name: 'Top Sci-Fi Films', exact: true })).toBeVisible();
  });
});
