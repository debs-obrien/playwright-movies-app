// spec: specs/movies-list-plan.md
// seed: tests/logged-in/seed.spec.ts

import { expect } from '@playwright/test';
import { addMovie } from '../helpers/list-utilities';
import { listTest as test } from '../helpers/list-test';

test.describe('Removing Movies from Lists', { tag: '@agent' }, () => {
  test('Remove and Re-add Same Movie', async ({ listPage }) => {
    const page = listPage;

    // 1. Navigate to Add/Remove Movies page
    await page.getByRole('link', { name: 'Add/Remove Movies' }).click();

    // 2. Remove "Twisters"
    await page.getByRole('listitem', { name: 'movie' }).filter({ hasText: 'Twisters' }).getByRole('button', { name: 'Remove' }).click();

    // 3. Verify "Twisters" is no longer in the list
    await expect(page.getByRole('listitem', { name: 'movie' }).filter({ hasText: 'Twisters' })).not.toBeVisible();

    // Verify movie count decreased
    const countAfterRemoval = await page.getByRole('listitem', { name: 'movie' }).count();
    expect(countAfterRemoval).toBe(2);

    // 4. Search for and add "Twisters" again using the `addMovie` utility
    await addMovie(page, 'Twisters');

    // Verify movie is successfully re-added
    await expect(page.getByRole('listitem', { name: 'movie' }).filter({ hasText: 'Twisters' })).toBeVisible();

    // Verify movie count increased
    const countAfterReAdd = await page.getByRole('listitem', { name: 'movie' }).count();
    expect(countAfterReAdd).toBe(3);

    // Verify no duplicate entries exist
    const twistersCount = await page.getByRole('listitem', { name: 'movie' }).filter({ hasText: 'Twisters' }).count();
    expect(twistersCount).toBe(1);
  });
});
