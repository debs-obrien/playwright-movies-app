// spec: specs/movies-list-plan.md
// seed: tests/logged-in/seed.spec.ts

import { expect } from '@playwright/test';
import { listTest as test } from '../helpers/list-test';

test.describe('Deleting Movie Lists', { tag: '@agent' }, () => {
  test('Delete List with Movies', async ({ listPage }) => {
    const page = listPage;

    // 1. Verify the list contains movies (fixture provides 3 movies)
    await expect(page.getByRole('list', { name: 'movies' })).toMatchAriaSnapshot(`
- listitem "movie":
  - link /poster of Twisters/:
    - img "poster of Twisters"
    - heading "Twisters" [level=2]
- listitem "movie":
  - link /poster of The Garfield Movie/:
    - img "poster of The Garfield Movie"
    - heading "The Garfield Movie" [level=2]
- listitem "movie":
  - link /Bad Boys/:
    - img /Bad Boys/
    - heading /Bad Boys/ [level=2]
`);

    // 2. Navigate to Delete List page via Edit > Delete List
    await page.getByRole('link', { name: 'Edit' }).click();
    await page.getByRole('link', { name: 'Delete List' }).click();

    // 3. Click the "Delete" button
    await page.getByRole('button', { name: 'Click the button below if you' }).click();

    // 4. Click "Yes" to confirm
    await page.getByRole('button', { name: 'Yes' }).click();

    // 5. Verify list and all its movies are deleted (user sees "no lists" message)
    await expect(page.getByText('There\'s no lists yet. Let\'s change that!')).toBeVisible();
  });
});
