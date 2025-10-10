// spec: specs/movies-list-plan.md
// seed: tests/helpers/list-test.ts

import { expect } from '@playwright/test';
import { addMovie } from '../helpers/list-utilities';
import { listTest as test } from '../helpers/list-test';

test.describe('Adding Movies to Lists', { tag: '@agent' }, () => {
  test('Add Multiple Movies Sequentially', async ({ listPage }) => {
    const page = listPage;

    // 1. Navigate to Add/Remove Movies page using `addMovie` utility
    await page.getByRole('link', { name: 'Add/Remove Movies' }).click();

    // Get initial movie count
    const initialCount = await page.getByRole('listitem', { name: 'movie' }).count();

    // 2. Add "Deadpool & Wolverine" using the `addMovie` utility
    await addMovie(page, 'Deadpool & Wolverine');

    // 3. Add "Inside Out 2" using the `addMovie` utility
    await addMovie(page, 'Inside Out 2');

    // 4. Add "Despicable Me 4" using the `addMovie` utility
    await addMovie(page, 'Despicable Me 4');

    // Verify all three movies appear in the list
    await expect(page.getByRole('listitem', { name: 'movie' }).filter({ hasText: 'Deadpool & Wolverine' })).toBeVisible();
    await expect(page.getByRole('listitem', { name: 'movie' }).filter({ hasText: 'Inside Out 2' })).toBeVisible();
    await expect(page.getByRole('listitem', { name: 'movie' }).filter({ hasText: 'Despicable Me 4' })).toBeVisible();

    // Verify each movie has a Remove button
    await expect(page.getByRole('listitem', { name: 'movie' }).filter({ hasText: 'Deadpool & Wolverine' }).getByRole('button', { name: 'Remove' })).toBeVisible();
    await expect(page.getByRole('listitem', { name: 'movie' }).filter({ hasText: 'Inside Out 2' }).getByRole('button', { name: 'Remove' })).toBeVisible();
    await expect(page.getByRole('listitem', { name: 'movie' }).filter({ hasText: 'Despicable Me 4' }).getByRole('button', { name: 'Remove' })).toBeVisible();

    // Verify list displays all movies with correct titles
    const finalCount = await page.getByRole('listitem', { name: 'movie' }).count();
    expect(finalCount).toBe(initialCount + 3);
  });
});
