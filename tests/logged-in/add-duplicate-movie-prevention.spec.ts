// spec: specs/movies-list-plan.md
// seed: tests/helpers/list-test.ts

import { expect } from '@playwright/test';
import { listTest as test } from '../helpers/list-test';

test.describe('Adding Movies to Lists', { tag: '@agent' }, () => {
  test('Add Movie That Already Exists (Duplicate Prevention)', async ({ listPage }) => {
    const page = listPage;

    // 1. Navigate to Add/Remove Movies page
    await page.getByRole('link', { name: 'Add/Remove Movies' }).click();

    // 2. Verify "Twisters" is already in the list (from fixture)
    await expect(page.getByRole('listitem', { name: 'movie' }).filter({ hasText: 'Twisters' })).toBeVisible();

    // Get initial count
    const initialCount = await page.getByRole('listitem', { name: 'movie' }).count();

    // Count how many times Twisters appears initially
    const initialTwistersCount = await page.getByRole('listitem', { name: 'movie' }).filter({ hasText: 'Twisters' }).count();

    // 3. Search for "Twisters" in the Add Item field
    await page.getByRole('textbox', { name: 'Add Item' }).fill('Twisters');

    // 4. Attempt to click "Twisters" from search results
    await page.getByRole('button', { name: 'Twisters' }).click();

    // Wait for the operation to complete (loading message should disappear)
    await expect(page.getByText('Adding an item to the list...')).toBeHidden();
    
    // Wait for the movie count to stabilize (duplicate prevention logic to complete)
    await expect(async () => {
      const currentCount = await page.getByRole('listitem', { name: 'movie' }).count();
      const currentTwistersCount = await page.getByRole('listitem', { name: 'movie' }).filter({ hasText: 'Twisters' }).count();
      
      expect(currentTwistersCount).toBe(initialTwistersCount);
      expect(currentCount).toBe(initialCount);
    }).toPass({ timeout: 5000 });

    // Verify system prevents adding duplicate movie OR only one instance appears
    const finalCount = await page.getByRole('listitem', { name: 'movie' }).count();
    const finalTwistersCount = await page.getByRole('listitem', { name: 'movie' }).filter({ hasText: 'Twisters' }).count();

    // Verify no duplicate entries visible in the movie list
    expect(finalTwistersCount).toBe(initialTwistersCount);
    
    // Verify total count hasn't increased (duplicate was prevented)
    expect(finalCount).toBe(initialCount);
  });
});
