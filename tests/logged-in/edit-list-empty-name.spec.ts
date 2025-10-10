// spec: specs/movies-list-plan.md
// seed: tests/logged-in/seed.spec.ts

import { expect } from '@playwright/test';
import { listTest as test } from '../helpers/list-test';

test.describe('Editing List Details', { tag: '@agent' }, () => {
  test('Edit List with Empty Name - Negative Test', async ({ listPage }) => {
    const page = listPage;

    // 1. Click the "Edit" button from the list view
    await page.getByRole('link', { name: 'Edit' }).click();

    // 2. Clear the "Name" field completely
    await page.getByRole('textbox', { name: 'Name' }).fill('');

    // 4. Attempt to click the "Save" button
    await page.getByRole('button', { name: 'Save' }).click();

    // Verify the Name field remains empty (validation prevented save)
    await expect(page.getByRole('textbox', { name: 'Name' })).toHaveValue('');
  });
});
