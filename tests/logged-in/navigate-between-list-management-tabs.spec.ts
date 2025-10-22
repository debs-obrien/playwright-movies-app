// spec: specs/movies-list-plan.md
// seed: tests/logged-in/seed.spec.ts

import { expect } from '@playwright/test';
import { listTest as test } from '../helpers/list-test';

test.describe('Navigation and User Experience', { tag: '@agent' }, () => {
  test('Navigate Between List Management Tabs', async ({ listPage }) => {
    const page = listPage;

    // 1. From the list view page, observe the navigation tabs
    await expect(page.getByRole('navigation', { name: '' })).toBeVisible();

    // 2. Click "Edit List" tab
    await page.getByRole('link', { name: 'Edit' }).click();

    // 3. Verify Edit page loads
    await expect(page.getByRole('heading', { name: 'Edit' })).toBeVisible();

    // 4. Click "View List" tab
    await page.getByRole('link', { name: 'View List' }).click();

    // 5. Verify View List page loads
    await expect(page.getByRole('list', { name: 'movies' })).toBeVisible();

    // 6. Click "Add/Remove Movies" tab
    await page.getByRole('link', { name: 'Add/Remove Movies' }).click();

    // 7. Verify Add/Remove page loads
    await expect(page.getByRole('textbox', { name: 'Add Item' })).toBeVisible();

    // 8. Click "Choose Image" tab
    await page.getByRole('link', { name: 'Choose Image' }).click();

    // 9. Verify Choose Image page loads
    await expect(page.getByRole('list', { name: 'movie lists' })).toBeVisible();

    // 10. Click "Delete List" tab
    await page.getByRole('link', { name: 'Delete List' }).click();

    // 11. Verify Delete page loads
    await expect(page.getByRole('heading', { name: 'Delete List' })).toBeVisible();
  });
});
