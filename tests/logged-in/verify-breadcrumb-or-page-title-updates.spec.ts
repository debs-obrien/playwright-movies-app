// spec: specs/movies-list-plan.md
// seed: tests/logged-in/seed.spec.ts

import { expect } from '@playwright/test';
import { listTest as test } from '../helpers/list-test';

test.describe('Navigation and User Experience', { tag: '@agent' }, () => {
  test('Verify Breadcrumb or Page Title Updates', async ({ listPage }) => {
    const page = listPage;

    // 1. Create a list named "Navigation Test" using the createList utility
    await page.getByRole('button', { name: 'User Profile' }).click();
    await page.getByRole('banner').getByRole('link', { name: 'Create New List' }).click();
    await page.getByRole('textbox', { name: 'Name' }).fill('Navigation Test');
    await page.getByRole('textbox', { name: 'Description' }).fill('Testing navigation');
    await page.getByRole('button', { name: 'Continue' }).click();

    // 2. Observe the page title in the browser tab and main heading
    await expect(page.getByRole('heading', { name: 'Navigation Test' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Edit' })).toBeVisible();

    // 3. Navigate to "Add/Remove Movies"
    await page.getByRole('link', { name: 'Add/Remove Movies' }).click();

    // 4. Verify page title/heading updates
    await expect(page.getByRole('heading', { name: 'Navigation Test' })).toBeVisible();

    // 5. Navigate to "Edit List"
    await page.getByRole('link', { name: 'Edit List' }).click();

    // 6. Verify page title/heading updates
    await expect(page.getByRole('heading', { name: 'Navigation Test' })).toBeVisible();

    // 7. Navigate to "Choose Image"
    await page.getByRole('link', { name: 'Choose Image' }).click();

    // 8. Verify page title/heading updates
    await expect(page.getByRole('heading', { name: 'Navigation Test' })).toBeVisible();
  });
});
