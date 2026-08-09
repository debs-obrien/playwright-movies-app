// spec: specs/movies-list-plan.md
// seed: tests/logged-in/seed.spec.ts

import { expect } from '@playwright/test';
import { listTest as test } from '../helpers/list-test';

test.describe('Removing Movies from Lists', { tag: '@agent' }, () => {
  test('Remove All Movies from List', async ({ listPage }) => {
    const page = listPage;
    const movies = page.getByRole('listitem', { name: 'movie' });

    await page.getByRole('link', { name: 'Add/Remove Movies' }).click();
    await expect(movies).toHaveCount(3);

    // Fixture seeds exactly three movies; remove them in a known order.
    for (const title of ['Twisters', 'The Garfield Movie', 'Bad Boys: Ride or Die']) {
      await movies.filter({ hasText: title }).getByRole('button', { name: 'Remove' }).click();
      await expect(movies.filter({ hasText: title })).toHaveCount(0);
    }

    await expect(movies).toHaveCount(0);
    await expect(page.getByRole('textbox', { name: 'Add Item' })).toBeVisible();
    await expect(page.getByRole('textbox', { name: 'Add Item' })).toBeEnabled();
  });
});
