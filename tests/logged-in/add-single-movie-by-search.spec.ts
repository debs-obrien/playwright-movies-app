// spec: specs/movies-list-plan.md
// seed: tests/helpers/list-test.ts

import { expect } from '@playwright/test';
import { listTest as test } from '../helpers/list-test';

test.describe('Adding Movies to Lists', { tag: '@agent' }, () => {
  test('Add Single Movie by Search', async ({ listPage }) => {
    const page = listPage;

    // Get initial movie count
    const initialCount = await page.getByRole('listitem', { name: 'movie' }).count();

    // 1. On the list view page, click "Add/Remove Movies" button or link
    await page.getByRole('link', { name: 'Add/Remove Movies' }).click();

    // 2. Click in the "Add Item" search field
    await page.getByRole('textbox', { name: 'Add Item' }).click();

    // 3. Type "Inside Out 2"
    await page.getByRole('textbox', { name: 'Add Item' }).fill('Inside Out 2');

    // 5. Click the movie button matching "Inside Out 2" from the search results
    await page.getByRole('button', { name: 'Inside Out 2' }).click();

    // Verify movie appears in the list immediately
    await expect(page.getByRole('listitem', { name: 'movie' }).filter({ hasText: 'Inside Out 2' })).toBeVisible();

    // Verify movie is displayed with its title
    await expect(page.getByRole('listitem', { name: 'movie' }).filter({ hasText: 'Inside Out 2' }).getByText('Inside Out 2')).toBeVisible();

    // Verify Remove button appears next to the movie
    await expect(page.getByRole('listitem', { name: 'movie' }).filter({ hasText: 'Inside Out 2' }).getByRole('button', { name: 'Remove' })).toBeVisible();

    // Verify movie count increases by 1
    const newCount = await page.getByRole('listitem', { name: 'movie' }).count();
    expect(newCount).toBe(initialCount + 1);
  });
});
