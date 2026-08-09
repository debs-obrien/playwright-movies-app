// spec: specs/movies-list-plan.md
// seed: tests/logged-in/seed.spec.ts

import { expect } from '@playwright/test';
import { listTest as test } from '../helpers/list-test';

test.describe('Removing Movies from Lists', { tag: '@agent' }, () => {
  test('Remove Movie and Verify on View List Page', async ({ listPage }) => {
    const page = listPage;
    const movies = page.getByRole('listitem', { name: 'movie' });

    await page.getByRole('link', { name: 'Add/Remove Movies' }).click();
    await expect(movies).toHaveCount(3);

    await movies.filter({ hasText: 'Bad Boys: Ride or Die' }).getByRole('button', { name: 'Remove' }).click();
    await expect(movies).toHaveCount(2);
    await expect(movies.filter({ hasText: 'Bad Boys: Ride or Die' })).toHaveCount(0);

    await page.getByRole('link', { name: 'View List' }).click();

    await expect(page.getByRole('heading', { name: 'Bad Boys: Ride or Die' })).not.toBeVisible();
    await expect(page.getByRole('heading', { name: 'Twisters' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'The Garfield Movie' })).toBeVisible();
  });
});
