// spec: specs/movies-list-plan.md
// seed: tests/logged-in/seed.spec.ts

import { expect } from '@playwright/test';
import { listTest as test } from '../helpers/list-test';

test.describe('Persistence and Data Integrity', { tag: '@agent' }, () => {
  test('Edit List and Verify Changes Persist', async ({ listPage }) => {
    const page = listPage;

    // 1. Edit list name from "my favorite movies" to "Updated List Name for Persistence Test"
    await page.getByRole('link', { name: 'Edit' }).click();
    await page.getByRole('textbox', { name: 'Name' }).fill('Updated List Name for Persistence Test');
    await page.getByRole('button', { name: 'Save' }).click();

    // Verify the updated name appears in the heading
    await expect(page.getByRole('heading', { name: 'Updated List Name for Persistence Test' })).toBeVisible();

    // 2. Navigate to another page (home)
    await page.goto('http://localhost:3000');
    await expect(page.getByText("Popular").first()).toBeVisible();

    // 3. Return to "My Lists"
    await page.getByRole('button', { name: 'User Profile' }).click();
    await page.getByRole('link', { name: 'My Lists' }).click();

    // Verify the updated name appears in My Lists
    await expect(page.getByRole('heading', { name: 'Updated List Name for Persistence Test' })).toBeVisible();

    // 4. Open the list
    await page.getByRole('link', { name: /Updated List Name for Persistence Test/i }).click();

    // 5. Verify name is still "Updated List Name for Persistence Test"
    await expect(page.getByRole('heading', { name: 'Updated List Name for Persistence Test' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'list of my favorite movies' })).toBeVisible();
  });
});
