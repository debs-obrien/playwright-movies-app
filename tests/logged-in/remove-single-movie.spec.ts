// spec: specs/movies-list-plan.md
// seed: tests/logged-in/seed.spec.ts

import { expect } from '@playwright/test';
import { listTest as test } from '../helpers/list-test';

test.describe('Removing Movies from Lists', { tag: '@agent' }, () => {
  test('Remove Single Movie', async ({ listPage }) => {
    const page = listPage;

    // 1. Navigate to Add/Remove Movies page
    await page.getByRole('link', { name: 'Add/Remove Movies' }).click();

    // 2. Verify list contains "The Garfield Movie" (from fixture)
    await expect(page.getByRole('listitem', { name: 'movie' }).filter({ hasText: 'The Garfield Movie' })).toBeVisible();

    // Get initial movie count
    const initialCount = await page.getByRole('listitem', { name: 'movie' }).count();

    // 3. Locate the "The Garfield Movie" list item
    // 4. Click the "Remove" button for "The Garfield Movie"
    await page.getByRole('listitem', { name: 'movie' }).filter({ hasText: 'The Garfield Movie' }).getByRole('button', { name: 'Remove' }).click();

    // Verify movie is immediately removed from the list
    await expect(page.getByRole('listitem', { name: 'movie' }).filter({ hasText: 'The Garfield Movie' })).not.toBeVisible();

    // Verify movie count decreases by 1
    const finalCount = await page.getByRole('listitem', { name: 'movie' }).count();
    expect(finalCount).toBe(initialCount - 1);

    // Verify remaining movies are still visible
    await expect(page.getByRole('listitem', { name: 'movie' }).filter({ hasText: 'Twisters' })).toBeVisible();
    await expect(page.getByRole('listitem', { name: 'movie' }).filter({ hasText: 'Bad Boys: Ride or Die' })).toBeVisible();
  });
});
