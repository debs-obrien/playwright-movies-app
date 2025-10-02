// spec: specs/movies-list-plan.md
// seed: tests/logged-in/seed.spec.ts

import { listTest as test } from '../helpers/list-test';
import { expect } from '@playwright/test';

test.describe('Adding Movies to a List', () => {
  test('Add Movie Already in the List (Duplicate Prevention)', async ({ listPage }) => {
    const page = listPage;

    // 1. Navigate to a list that contains "Twisters" - 2. Click the "Add/Remove Movies" button
    await page.getByRole('link', { name: 'Add/Remove Movies' }).click();

    // Verify Twisters is already in the list
    await expect(page.getByText('Twisters').first()).toBeVisible();

    // 3. Search for "Twisters" - Click search field
    await page.getByRole('textbox', { name: 'Add Item' }).click();

    // 4. Attempt to click on "Twisters" from the search results
    await page.getByRole('button', { name: 'Twisters Twisters' }).click();

    // Verify only one instance of Twisters exists (no duplicate created)
    const twistersCount = await page.getByText('Twisters').count();
    expect(twistersCount).toBe(1);
  });
});
