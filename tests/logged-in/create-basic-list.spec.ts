// spec: specs/movies-list-plan.md
// seed: tests/logged-in/seed.spec.ts

import { listTest as test } from '../helpers/list-test';
import { expect } from '@playwright/test';

test.describe('Creating New Movie Lists', () => {
  test('Create Basic List', async ({ listPage }) => {
    const page = listPage;

    // 1. Click "Create New List" button from any list view
    await page.getByRole('button', { name: 'Create New List' }).click();

    // 2. Enter list name: "My Action Movies"
    await page.getByRole('textbox', { name: 'Name' }).fill('My Action Movies');

    // 3. Enter description: "Collection of my favorite action films"
    await page.getByRole('textbox', { name: 'Description' }).fill('Collection of my favorite action films');

    // 5. Click "Save" button
    await page.getByRole('button', { name: 'Continue' }).click();

    // Navigate to view the created list
    await page.getByRole('link', { name: 'View List' }).click();

    // Verify new list name "My Action Movies" is displayed
    await expect(page.getByRole('heading', { name: 'My Action Movies' })).toBeVisible();

    // Verify description "Collection of my favorite action films" is displayed
    await expect(page.getByRole('heading', { name: 'Collection of my favorite action films' })).toBeVisible();

    // Verify list is empty (no movies)
    await expect(page.getByText('This list is empty.')).toBeVisible();

    // Verify URL contains new list ID parameter
    await expect(page).toHaveURL(/list\?id=/);
  });
});
