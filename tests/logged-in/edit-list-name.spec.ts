// spec: specs/movies-list-plan.md
// seed: tests/logged-in/seed.spec.ts

import { expect } from '@playwright/test';
import { listTest as test } from '../helpers/list-test';

test.describe('Editing List Details', { tag: '@agent' }, () => {
  test('Edit List Name', async ({ listPage }) => {
    const page = listPage;

    // 1. From the list view page, click the "Edit" button/link
    await page.getByRole('link', { name: 'Edit' }).click();

    // 2. Clear the "Name" field and 3. Type "My Updated Action Movies"
    await page.getByRole('textbox', { name: 'Name' }).fill('My Updated Action Movies');

    // 4. Click the "Save" button
    await page.getByRole('button', { name: 'Save' }).click();

    // 5. Verify the updated name appears in the main heading
    await expect(page.getByRole('heading', { name: 'My Updated Action Movies' })).toBeVisible();

    // 6. Click "View List" to navigate back
    await page.getByRole('link', { name: 'View List' }).click();

    // Verify the updated name appears on View List page
    await expect(page.getByRole('heading', { name: 'My Updated Action Movies' })).toBeVisible();
  });
});
