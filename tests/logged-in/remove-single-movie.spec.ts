// spec: specs/movies-list-plan.md
// seed: tests/logged-in/seed.spec.ts

import { expect } from '@playwright/test';
import { listTest as test } from '../helpers/list-test';

test.describe('Removing Movies from Lists', { tag: '@agent' }, () => {
  test('Remove Single Movie', async ({ listPage }) => {
    const page = listPage;
    const movies = page.getByRole('listitem', { name: 'movie' });

    await page.getByRole('link', { name: 'Add/Remove Movies' }).click();

    await expect(movies.filter({ hasText: 'The Garfield Movie' })).toBeVisible();
    await expect(movies).toHaveCount(3);

    await movies.filter({ hasText: 'The Garfield Movie' }).getByRole('button', { name: 'Remove' }).click();

    await expect(movies.filter({ hasText: 'The Garfield Movie' })).toHaveCount(0);
    await expect(movies).toHaveCount(2);
    await expect(movies.filter({ hasText: 'Twisters' })).toBeVisible();
    await expect(movies.filter({ hasText: 'Bad Boys: Ride or Die' })).toBeVisible();
  });
});
