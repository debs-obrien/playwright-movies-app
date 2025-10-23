// spec: specs/movies-list-plan.md
// seed: tests/logged-in/seed.spec.ts

import { expect } from '@playwright/test';
import { listTest as test } from '../helpers/list-test';

test.describe('Removing Movies from Lists', { tag: '@agent' }, () => {
  test('Remove All Movies from List', async ({ listPage }) => {
    const page = listPage;

    // 1. Navigate to Add/Remove Movies page
    await page.getByRole('link', { name: 'Add/Remove Movies' }).click();

    // 2. Note the total number of movies in the list
    let movieCount = await page.getByRole('listitem', { name: 'movie' }).count();
    expect(movieCount).toBeGreaterThan(0);

    // 3. Click "Remove" button for each movie sequentially until list is empty
    while (movieCount > 0) {
      const firstMovie = page.getByRole('listitem', { name: 'movie' }).first();
      await firstMovie.getByRole('button', { name: 'Remove' }).click();
      
      // Wait for the movie count to decrease
      await expect(page.getByRole('listitem', { name: 'movie' })).not.toHaveCount(movieCount);
      
      movieCount = await page.getByRole('listitem', { name: 'movie' }).count();
    }

    // 4. Verify the list is empty
    await expect(page.getByRole('listitem', { name: 'movie' })).toHaveCount(0);

    // Verify Add Item search field is still available
    await expect(page.getByRole('textbox', { name: 'Add Item' })).toBeVisible();

    // Verify no errors occur when removing the last movie
    await expect(page.getByRole('textbox', { name: 'Add Item' })).toBeEnabled();
  });
});
