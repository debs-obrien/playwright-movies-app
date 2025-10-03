// spec: specs/movies-list-plan.md
// seed: tests/logged-in/seed.spec.ts

import { listTest as test } from '../helpers/list-test';
import { expect } from '@playwright/test';

test.describe('Adding Movies to a List', () => {
  test('Add Movie by Typing Search Term', async ({ listPage }) => {
    const page = listPage;

    // 1. Navigate to list's Add/Remove Movies page
    await page.getByRole('link', { name: 'Add/Remove Movies' }).click();

    // 2. Click in the "Add Item" search box
    await page.getByRole('textbox', { name: 'Add Item' }).click();

    // 3. Type "Inside" slowly (character by character)
    await page.getByRole('textbox', { name: 'Add Item' }).pressSequentially('Inside');

    // 4. Wait for autocomplete suggestions to update and click on "Inside Out 2" from the filtered results
    await page.getByRole('button', { name: 'Inside Out 2 Inside Out 2' }).click();

    // Verify "Inside Out 2" appears in the movies list
    await expect(page.getByText('Inside Out 2')).toBeVisible();
  });
});
