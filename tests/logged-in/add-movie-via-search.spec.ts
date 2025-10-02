// spec: specs/movies-list-plan.md
// seed: tests/logged-in/seed.spec.ts

import { listTest as test } from '../helpers/list-test';
import { expect } from '@playwright/test';

test.describe('Adding Movies to Lists', () => {
  test('Add Movie via Search', async ({ listPage }) => {
    const page = listPage;

    // 2. Click "Add/Remove Movies" button
    await page.getByRole('button', { name: 'Add/Remove Movies' }).click();

    // 3. Click in "Add Item" search field
    await page.getByRole('textbox', { name: 'Add Item' }).click();

    // 5. Type "inside" in search field
    await page.getByRole('textbox', { name: 'Add Item' }).pressSequentially('inside');

    // 7. Click on "Inside Out 2" from search results
    await page.getByRole('button', { name: 'Inside Out 2 Inside Out' }).click();

    // Verify selected movie appears in the movies section
    await expect(page.getByText('Inside Out 2')).toBeVisible();

    // Verify movie has Remove button
    await expect(page.getByRole('button', { name: 'Remove' })).toBeVisible();

    // Verify search field clears after selection
    await expect(page.getByRole('textbox', { name: 'Add Item' })).toHaveValue('');
  });
});
