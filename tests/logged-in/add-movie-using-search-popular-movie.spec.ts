// spec: specs/movies-list-plan.md
// seed: tests/logged-in/seed.spec.ts

import { listTest as test } from '../helpers/list-test';
import { expect } from '@playwright/test';

test.describe('Adding Movies to a List', () => {
  test('Add Movie Using Search - Popular Movie', async ({ listPage }) => {
    const page = listPage;

    // 1. Navigate to an existing list - 2. Click the "Add/Remove Movies" button
    await page.getByRole('link', { name: 'Add/Remove Movies' }).click();

    // 3. Click in the "Search for a movie..." input field
    await page.getByRole('textbox', { name: 'Add Item' }).click();

    // 4. Observe the dropdown of popular movies that appears - 5. Click on "Deadpool & Wolverine" from the dropdown
    await page.getByRole('button', { name: 'Deadpool & Wolverine Deadpool' }).click();

    // Verify "Deadpool & Wolverine" appears in the movies list with a Remove button
    await expect(page.getByText('Deadpool & Wolverine')).toBeVisible();
  });
});
