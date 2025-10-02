// spec: specs/movies-list-plan.md
// seed: tests/logged-in/seed.spec.ts

import { listTest as test } from '../helpers/list-test';
import { expect } from '@playwright/test';

test.describe('Adding Movies to a List', () => {
  test('Add Multiple Movies Sequentially', async ({ listPage }) => {
    const page = listPage;

    // 1. Navigate to an existing list - 2. Click the "Add/Remove Movies" button
    await page.getByRole('link', { name: 'Add/Remove Movies' }).click();

    // 3. Search for and add "Inside Out 2"
    await page.getByRole('textbox', { name: 'Add Item' }).click();
    await page.getByRole('button', { name: 'Inside Out 2 Inside Out' }).click();

    // 4. Search for and add "Despicable Me 4"
    await page.getByRole('textbox', { name: 'Add Item' }).click();
    await page.getByRole('button', { name: 'Despicable Me 4 Despicable Me' }).click();

    // 5. Search for and add "The Union"
    await page.getByRole('textbox', { name: 'Add Item' }).click();
    await page.getByRole('button', { name: 'The Union The Union' }).click();

    // Verify all three movies are added to the list
    await expect(page.getByText('Inside Out 2')).toBeVisible();
    await expect(page.getByText('Despicable Me 4')).toBeVisible();
    await expect(page.getByText('The Union')).toBeVisible();
  });
});
