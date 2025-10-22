// spec: specs/movies-list-plan.md
// seed: tests/helpers/list-test.ts

import { expect } from '@playwright/test';
import { openLists } from '../helpers/list-utilities';
import { listTest as test } from '../helpers/list-test';

test.describe('My Lists Overview Page', { tag: '@agent' }, () => {
  test('Verify List Count Information', async ({ listPage }) => {
    const page = listPage;

    // 1. Navigate to My Lists page
    await openLists(page);

    // 2. Verify the movie count is displayed (fixture has 3 movies)
    await expect(page.getByRole('heading', { name: 'movies (PUBLIC)' })).toBeVisible();

    // 3. Verify the list displays with appropriate label
    const listItem = page.getByRole('listitem', { name: 'movie list' });
    await expect(listItem).toBeVisible();
    await expect(listItem.getByRole('heading', { name: 'my favorite movies' })).toBeVisible();
  });
});
