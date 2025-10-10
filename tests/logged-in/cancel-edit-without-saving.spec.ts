// spec: specs/movies-list-plan.md
// seed: tests/logged-in/seed.spec.ts

import { expect } from '@playwright/test';
import { listTest as test } from '../helpers/list-test';

test.describe('Editing List Details', { tag: '@agent' }, () => {
  test('Cancel Edit Without Saving', async ({ listPage }) => {
    const page = listPage;

    // 1. Click the "Edit" button from the list view
    await page.getByRole('link', { name: 'Edit' }).click();

    // 3. Change the "Name" field to "Test Name Change"
    await page.getByRole('textbox', { name: 'Name' }).fill('Test Name Change');

    // 4. Change the "Description" field to "Test Description Change"
    await page.getByRole('textbox', { name: 'Description' }).fill('Test Description Change');

    // 5. Click "View List" link without clicking Save
    await page.getByRole('link', { name: 'View List' }).click();

    // Verify original name and description remain unchanged
    await expect(page.getByRole('heading', { name: 'my favorite movies', exact: true })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'list of my favorite movies' })).toBeVisible();

    // 6. Return to Edit page
    await page.getByRole('link', { name: 'Edit' }).click();

    // Verify original values are still in the form fields
    await expect(page.getByRole('textbox', { name: 'Name' })).toHaveValue('my favorite movies');
    await expect(page.getByRole('textbox', { name: 'Description' })).toHaveValue('list of my favorite movies');
  });
});
