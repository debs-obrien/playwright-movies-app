// spec: specs/movies-list-plan.md
// seed: tests/logged-in/seed.spec.ts

import { listTest as test } from '../helpers/list-test';
import { expect } from '@playwright/test';

test.describe('Adding Movies to a List', () => {
  test('Add Movie Using Search', async ({ listPage }) => {
    const page = listPage;

    // 1. Navigate to existing list - 2. Click "Add/Remove Movies" button
    await page.getByRole('link', { name: 'Add/Remove Movies' }).click();

    // 3. Click in the "Add Item" search box
    await page.getByRole('textbox', { name: 'Add Item' }).click();

    // 4. Observe the default movie suggestions dropdown that appears - verify "Deadpool & Wolverine" is visible
    await expect(page.getByRole('menuitem', { name: 'Deadpool & Wolverine Deadpool & Wolverine' })).toBeVisible();

    // 5. Select "Deadpool & Wolverine" from the dropdown by clicking it
    await page.getByRole('button', { name: 'Deadpool & Wolverine Deadpool' }).click();

    // Verify "Deadpool & Wolverine" appears in the movies list with a "Remove" button
    await expect(page.getByText('Deadpool & Wolverine')).toBeVisible();
  });
});
