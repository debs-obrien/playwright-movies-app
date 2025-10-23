// spec: specs/movies-list-plan.md
// seed: tests/logged-in/seed.spec.ts

import { expect } from '@playwright/test';
import { listTest as test } from '../helpers/list-test';

test.describe('Navigation and User Experience', { tag: '@agent' }, () => {
  test('Access List via User Profile Menu', async ({ listPage }) => {
    const page = listPage;

    // 1. From any page in the application, click "User Profile" button
    await page.getByRole('button', { name: 'User Profile' }).click();

    // 2. Verify dropdown menu appears by checking for the menu items
    // 3. Observe "Create New List" and "My Lists" options
    const myListsLink = page.getByRole('link', { name: 'My Lists' });
    await expect(myListsLink).toBeVisible();
    await expect(page.getByRole('link', { name: 'Create New List' }).first()).toBeVisible();

    // 4. Click "My Lists"
    await myListsLink.click();

    // 5. Verify "My Lists" page loads
    await expect(page.getByRole('heading', { name: 'My Lists' })).toBeVisible();

    // 6. Click a list to view it
    const listLink = page.getByRole('link', { name: 'poster of my favorite movies' });
    await expect(listLink).toBeVisible();
    await listLink.click();

    // 7. Click "User Profile" again
    await page.getByRole('button', { name: 'User Profile' }).click();

    // 8. Click "Create New List"
    await page.getByRole('banner').getByRole('link', { name: 'Create New List' }).click();

    // 9. Verify "Create New List" page loads
    await expect(page.getByRole('heading', { name: 'Create New List' })).toBeVisible();
  });
});
