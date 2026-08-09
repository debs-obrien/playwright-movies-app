// spec: specs/movies-list-plan.md
// seed: tests/helpers/list-test.ts

import { expect } from '@playwright/test';
import { listTest as test } from '../helpers/list-test';

test.describe('Adding Movies to Lists', { tag: '@agent' }, () => {
  test('Search for Non-Existent Movie', async ({ listPage }) => {
    const page = listPage;

    await page.getByRole('link', { name: 'Add/Remove Movies' }).click();

    await page.getByRole('textbox', { name: 'Add Item' }).fill('zxqwertyjklmnop12345');
    await expect(page.getByRole('status')).toContainText(/No movies found/i);

    await page.getByRole('textbox', { name: 'Add Item' }).clear();
    await page.getByRole('textbox', { name: 'Add Item' }).fill('Inside Out');

    await expect(page.getByRole('button', { name: /Inside Out/ }).first()).toBeVisible();
  });
});
