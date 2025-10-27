// spec: specs/movies-list-plan.md
// seed: tests/helpers/list-test.ts

import { expect } from '@playwright/test';
import { listTest as test } from '../helpers/list-test';

test.describe('Integration with Search Functionality', { tag: '@agent' }, () => {
  test('Search with Partial Movie Name', async ({ listPage }) => {
    const page = listPage;

    // 1. Navigate to Add/Remove Movies page
    await page.getByRole('link', { name: 'Add/Remove Movies' }).click();

    // 2. Type "Twi" in the search field
    await page.getByRole('textbox', { name: 'Add Item' }).fill('Twi');

    // 3. Verify "Twisters" appears in results
    await expect(page.getByRole('button', { name: /Twisters/ }).first()).toBeVisible();

    // Verify partial search works correctly - "Twisters" contains "Twi"
    await expect(page.getByRole('textbox', { name: 'Add Item' })).toHaveValue('Twi');

    // 4. Type more characters: "Twist"
    await page.getByRole('textbox', { name: 'Add Item' }).fill('Twist');

    // 5. Verify results update
    // "Twisters" should still appear as it contains "Twist"
    await expect(page.getByRole('button', { name: /Twisters/ }).first()).toBeVisible();

    // Verify results update as user types
    await expect(page.getByRole('textbox', { name: 'Add Item' })).toHaveValue('Twist');

    // Verify relevant movies appear in results - Twisters matches the partial search
    await expect(page.getByRole('button', { name: /Twisters/ })).toBeVisible();
  });
});
