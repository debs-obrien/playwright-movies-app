// spec: specs/movies-list-plan.md
// seed: tests/logged-in/seed.spec.ts

import { expect } from '@playwright/test';
import { test } from '@playwright/test';
import { createList } from '../helpers/list-utilities';

test.describe('Viewing Movie Lists', { tag: '@agent' }, () => {
  test('View List with No Movies', async ({ page }) => {
    await page.goto('');

    // 1. Create a new list using the createList utility
    await createList(page, 'Empty List Test', 'Testing empty list view');

    // 2. Click "View List" from the navigation
    await page.getByRole('link', { name: 'View List' }).click();

    // 3. Observe the empty list state
    await expect(page.getByText('This list is empty.')).toBeVisible();
    await expect(page.getByRole('link', { name: 'Add some movies.' })).toBeVisible();

    // Verify navigation and controls remain accessible
    await expect(page.getByRole('button', { name: 'Add/Remove Movies' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Edit' })).toBeVisible();

    // Verify no movie items are displayed
    await expect(page.getByRole('list', { name: 'movies' })).not.toBeVisible();
  });
});
