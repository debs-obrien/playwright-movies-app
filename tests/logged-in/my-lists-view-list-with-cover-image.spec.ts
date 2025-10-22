// spec: specs/movies-list-plan.md
// seed: tests/helpers/list-test.ts

import { expect } from '@playwright/test';
import { listTest as test } from '../helpers/list-test';

test.describe('My Lists Overview Page', { tag: '@agent' }, () => {
  test('View List with Cover Image', async ({ listPage }) => {
    const page = listPage;

    // 1. Navigate to User Profile menu
    await page.getByRole('button', { name: 'User Profile' }).click();

    // 1. Navigate to My Lists page
    await page.getByRole('link', { name: 'My Lists' }).click();

    // 2. Verify the cover image displays on the list card
    await expect(page.getByRole('img', { name: 'poster of my favorite movies' })).toBeVisible();

    // 3. Verify the list name is displayed
    await expect(page.getByRole('heading', { name: 'my favorite movies' })).toBeVisible();

    // 4. Verify the privacy status is displayed
    await expect(page.getByRole('heading', { name: 'movies (PUBLIC)' })).toBeVisible();
  });
});
