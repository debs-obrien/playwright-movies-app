// spec: specs/movies-list-plan.md
// seed: tests/logged-in/seed.spec.ts

import { listTest as test } from '../helpers/list-test';
import { expect } from '@playwright/test';

test.describe('Adding Movies to a List', () => {
  test('Add Multiple Movies in Sequence', async ({ listPage }) => {
    const page = listPage;

    // 1. Navigate to Add/Remove Movies page
    await page.getByRole('link', { name: 'Add/Remove Movies' }).click();

    // 2. Search for and add "The Instigators"
    await page.getByRole('textbox', { name: 'Add Item' }).fill('The Matrix');
    await page.getByRole('button', { name: 'The Instigators The' }).click();

    // 3. Search for and add "The Union"
    await page.getByRole('textbox', { name: 'Add Item' }).fill('The Union');
    await page.getByRole('button', { name: 'The Union The Union' }).click();

    // 4. Search for and add "Inside Out 2"
    await page.getByRole('textbox', { name: 'Add Item' }).fill('Inside Out 2');
    await page.getByRole('button', { name: 'Inside Out 2 Inside Out' }).click();

    // 5. Verify all three movies appear in the list
    await expect(page.getByText('The Instigators')).toBeVisible();
    await expect(page.getByText('The Union')).toBeVisible();
    await expect(page.getByText('Inside Out 2')).toBeVisible();
  });
});
