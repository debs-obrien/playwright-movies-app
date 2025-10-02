// spec: specs/movies-list-plan.md
// seed: tests/logged-in/seed.spec.ts

import { listTest as test } from '../helpers/list-test';
import { expect } from '@playwright/test';

test.describe('Adding Movies to a List', () => {
  test('Add Movie Using Search - Type to Search', async ({ listPage }) => {
    const page = listPage;

    // 1. Navigate to an existing list - 2. Click the "Add/Remove Movies" button
    await page.getByRole('link', { name: 'Add/Remove Movies' }).click();

    // 3. Click in the "Search for a movie..." input field
    await page.getByRole('textbox', { name: 'Add Item' }).click();

    // 4. Type "Inception"
    await page.getByRole('textbox', { name: 'Add Item' }).pressSequentially('Inception');

    // 5. Wait for search results to appear
    await page.waitForTimeout(2000);

    // 6. Click on "Incoming" from the search results
    await page.getByRole('button', { name: 'Incoming Incoming' }).click();

    // Verify movie is added to the list
    await expect(page.getByText('Incoming')).toBeVisible();
  });
});
