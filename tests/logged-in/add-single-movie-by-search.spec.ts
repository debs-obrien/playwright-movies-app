// spec: specs/movies-list-plan.md
// seed: tests/helpers/list-test.ts

import { expect } from '@playwright/test';
import { listTest as test } from '../helpers/list-test';

test.describe('Adding Movies to Lists', { tag: '@agent' }, () => {
  test('Add Single Movie by Search', async ({ listPage }) => {
    const page = listPage;
    const movies = page.getByRole('listitem', { name: 'movie' });

    await expect(movies).toHaveCount(3);

    await page.getByRole('link', { name: 'Add/Remove Movies' }).click();
    await page.getByRole('textbox', { name: 'Add Item' }).fill('Inside Out 2');
    await page.getByRole('button', { name: 'Inside Out 2' }).click();

    const addedMovie = movies.filter({ hasText: 'Inside Out 2' });
    await expect(addedMovie).toBeVisible();
    await expect(addedMovie.getByText('Inside Out 2')).toBeVisible();
    await expect(addedMovie.getByRole('button', { name: 'Remove' })).toBeVisible();
    await expect(movies).toHaveCount(4);
  });
});
