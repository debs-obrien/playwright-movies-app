// spec: specs/movies-list-plan.md
// seed: tests/logged-in/seed.spec.ts

import { expect } from '@playwright/test';
import { listTest as test } from '../helpers/list-test';

test.describe('Editing List Details', { tag: '@agent' }, () => {
  test('Edit List Description', async ({ listPage }) => {
    const page = listPage;

    // 1. From the list view page, click the "Edit" button/link
    await page.getByRole('link', { name: 'Edit' }).click();

    // 2. Clear the "Description" field and 3. Type "An updated collection of thrilling action films"
    await page.getByRole('textbox', { name: 'Description' }).fill('An updated collection of thrilling action films');

    // 4. Click the "Save" button
    await page.getByRole('button', { name: 'Save' }).click();

    // 5. Verify the description is updated
    await expect(page.getByRole('textbox', { name: 'Description' })).toHaveValue('An updated collection of thrilling action films');

    // 6. Click "View List" to navigate back
    await page.getByRole('link', { name: 'View List' }).click();

    // Verify the page loads successfully
    await expect(page.getByRole('heading', { name: 'my favorite movies', exact: true })).toBeVisible();
  });
});
