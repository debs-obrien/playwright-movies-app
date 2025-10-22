// spec: specs/movies-list-plan.md
// seed: tests/logged-in/seed.spec.ts

import { expect } from '@playwright/test';
import { listTest as test } from '../helpers/list-test';

test.describe('Deleting Movie Lists', { tag: '@agent' }, () => {
  test('Delete List with Confirmation', async ({ listPage }) => {
    const page = listPage;

    // 1. From the list view page, click "Edit" button
    await page.getByRole('link', { name: 'Edit' }).click();

    // 2. Click "Delete List" link from the navigation
    await page.getByRole('link', { name: 'Delete List' }).click();

    // 3-4. Verify the Delete List page loads and read the confirmation message
    await expect(page.getByText('Click the button below if you are sure you want to delete this list.')).toBeVisible();

    // 5. Click the "Delete" button
    await page.getByRole('button', { name: 'Click the button below if you' }).click();

    // 6. Click "Yes" to confirm deletion
    await page.getByRole('button', { name: 'Yes' }).click();

    // 7. Verify redirection to "My Lists" page and that "no lists" message displays
    await expect(page.getByText('There\'s no lists yet. Let\'s change that!')).toBeVisible();
  });
});
