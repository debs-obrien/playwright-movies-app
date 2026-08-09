// spec: specs/movies-list-plan.md
// seed: tests/logged-in/seed.spec.ts

import { expect } from '@playwright/test';
import { addMovie } from '../helpers/list-utilities';
import { listTest as test } from '../helpers/list-test';

test.describe('Removing Movies from Lists', { tag: '@agent' }, () => {
  test('Remove and Re-add Same Movie', async ({ listPage }) => {
    const page = listPage;
    const movies = page.getByRole('listitem', { name: 'movie' });

    await page.getByRole('link', { name: 'Add/Remove Movies' }).click();

    await movies.filter({ hasText: 'Twisters' }).getByRole('button', { name: 'Remove' }).click();
    await expect(movies.filter({ hasText: 'Twisters' })).toHaveCount(0);
    await expect(movies).toHaveCount(2);

    await addMovie(page, 'Twisters');

    await expect(movies.filter({ hasText: 'Twisters' })).toBeVisible();
    await expect(movies).toHaveCount(3);
    await expect(movies.filter({ hasText: 'Twisters' })).toHaveCount(1);
  });
});
