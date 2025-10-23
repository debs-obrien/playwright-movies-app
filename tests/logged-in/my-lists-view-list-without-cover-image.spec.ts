// spec: specs/movies-list-plan.md
// seed: tests/helpers/list-test.ts

import { expect } from '@playwright/test';
import { createList, addMovie, openLists } from '../helpers/list-utilities';
import { listTest as test } from '../helpers/list-test';

test.describe('My Lists Overview Page', { tag: '@agent' }, () => {
  test('View List Without Cover Image', async ({ listPage }) => {
    const page = listPage;

    // 1. Create a new list without selecting a cover image
    await createList(page, 'List Without Cover', 'A list with no cover image');
    
    // 2. Add a movie but do not select cover image
    await addMovie(page, 'Deadpool');
    
    // 3. Navigate to My Lists
    await openLists(page);

    // Wait for My Lists page to fully load
    await expect(page.getByRole('heading', { name: 'My Lists' })).toBeVisible();

    // 4. Verify the list without selected cover image is displayed
    await expect(page.getByRole('heading', { name: 'List Without Cover' })).toBeVisible();

    // 4. Verify the poster is displayed (default placeholder or movie poster)
    await expect(page.getByRole('img', { name: 'poster of List Without Cover' })).toBeVisible();
  });
});
