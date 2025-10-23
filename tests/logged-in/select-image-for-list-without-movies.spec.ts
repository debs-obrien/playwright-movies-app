// spec: specs/movies-list-plan.md
// seed: tests/logged-in/seed.spec.ts

import { expect } from '@playwright/test';
import { listTest as test } from '../helpers/list-test';

test.describe('Selecting List Cover Images', { tag: '@agent' }, () => {
  test('Select Image for List Without Movies', async ({ listPage }) => {
    const page = listPage;

    // 1. Create a new list using the createList utility
    await page.getByRole('link', { name: 'Create New List' }).click();
    await page.getByRole('textbox', { name: 'Name' }).fill('Empty Test List');
    await page.getByRole('textbox', { name: 'Description' }).fill('A list with no movies');
    await page.getByRole('button', { name: 'Continue' }).click();

    // 2. Do not add any movies to the list

    // 3. Click "Choose Image" link
    await page.getByRole('link', { name: 'Choose Image' }).click();

    // Verify appropriate message or empty state is shown
    await expect(page.getByRole('heading', { name: 'Sorry!' })).toBeVisible();
    await expect(page.getByText('This list is empty. Add some movies to select a cover image.')).toBeVisible();

    // Verify user can navigate back to add movies first
    await page.getByRole('link', { name: 'Add/Remove Movies' }).click();
  });
});
