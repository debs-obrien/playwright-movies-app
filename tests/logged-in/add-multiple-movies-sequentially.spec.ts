// spec: specs/movies-list-plan.md
// seed: tests/helpers/list-test.ts

import { expect } from '@playwright/test';
import { addMovie } from '../helpers/list-utilities';
import { listTest as test } from '../helpers/list-test';

test.describe('Adding Movies to Lists', { tag: '@agent' }, () => {
  test('Add Multiple Movies Sequentially', async ({ listPage }) => {
    const page = listPage;
    const movies = page.getByRole('listitem', { name: 'movie' });

    await page.getByRole('link', { name: 'Add/Remove Movies' }).click();
    await expect(page.getByRole('textbox', { name: 'Add Item' })).toBeVisible();
    await expect(movies).toHaveCount(3);

    await addMovie(page, 'Deadpool & Wolverine');
    await addMovie(page, 'Inside Out 2');
    await addMovie(page, 'Despicable Me 4');

    await expect(movies.filter({ hasText: 'Deadpool & Wolverine' })).toBeVisible();
    await expect(movies.filter({ hasText: 'Inside Out 2' })).toBeVisible();
    await expect(movies.filter({ hasText: 'Despicable Me 4' })).toBeVisible();

    await expect(movies.filter({ hasText: 'Deadpool & Wolverine' }).getByRole('button', { name: 'Remove' })).toBeVisible();
    await expect(movies.filter({ hasText: 'Inside Out 2' }).getByRole('button', { name: 'Remove' })).toBeVisible();
    await expect(movies.filter({ hasText: 'Despicable Me 4' }).getByRole('button', { name: 'Remove' })).toBeVisible();

    await expect(movies).toHaveCount(6);
  });
});
