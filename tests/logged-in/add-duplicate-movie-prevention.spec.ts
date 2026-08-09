// spec: specs/movies-list-plan.md
// seed: tests/helpers/list-test.ts

import { expect } from '@playwright/test';
import { listTest as test } from '../helpers/list-test';

test.describe('Adding Movies to Lists', { tag: '@agent' }, () => {
  test('Add Movie That Already Exists (Duplicate Prevention)', async ({ listPage }) => {
    const page = listPage;
    const movies = page.getByRole('listitem', { name: 'movie' });
    const twisters = movies.filter({ hasText: 'Twisters' });

    await page.getByRole('link', { name: 'Add/Remove Movies' }).click();

    await expect(twisters).toBeVisible();
    await expect(movies).toHaveCount(3);
    await expect(twisters).toHaveCount(1);

    await page.getByRole('textbox', { name: 'Add Item' }).fill('Twisters');
    await page.getByRole('button', { name: 'Twisters' }).click();
    await expect(page.getByText('Adding an item to the list...')).toBeHidden();

    await expect(twisters).toHaveCount(1);
    await expect(movies).toHaveCount(3);
  });
});
