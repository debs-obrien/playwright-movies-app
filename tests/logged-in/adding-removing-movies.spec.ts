// spec: specs/movies-list-plan.md
// seed: tests/logged-in/seed.spec.ts

import { listTest as test } from '../helpers/list-test';
import { expect } from '@playwright/test';

test.describe('Adding and Removing Movies', () => {
  test('Access Add/Remove Movies Interface', async ({ listPage }) => {
    const page = listPage;

    // 1. Click the Add/Remove Movies button
    await page.getByRole('link', { name: 'Add/Remove Movies' }).click();

    // 2. Verify page shows heading with list name
    await expect(page.getByRole('heading', { name: 'my favorite movies' })).toBeVisible();

    // 3. Verify 'Edit' subheading is displayed
    await expect(page.getByRole('heading', { name: 'Edit' })).toBeVisible();

    // 4. Verify 'Add/Remove Movies' tab is visible in navigation
    await expect(page.getByRole('link', { name: 'Add/Remove Movies' })).toBeVisible();

    // 5. Verify search box labeled 'Add Item' is visible
    await expect(page.getByRole('textbox', { name: 'Add Item' })).toBeVisible();

    // 6. Verify 'Twisters' movie is displayed in the list
    await expect(page.getByText('Twisters')).toBeVisible();

    // 7. Verify 'The Garfield Movie' is displayed in the list
    await expect(page.getByText('The Garfield Movie')).toBeVisible();
  });

  test('Search for Movies to Add', async ({ listPage }) => {
    const page = listPage;

    // 1. Navigate to Add/Remove Movies page
    await page.getByRole('link', { name: 'Add/Remove Movies' }).click();

    // 2. Click in the 'Add Item' search box
    await page.getByRole('textbox', { name: 'Add Item' }).click();

    // 3. Verify dropdown displays 'Deadpool & Wolverine'
    await expect(page.getByText('Deadpool & Wolverine')).toBeVisible();

    // 4. Verify dropdown displays 'Inside Out 2'
    await expect(page.getByText('Inside Out 2')).toBeVisible();

    // 5. Verify dropdown displays 'Despicable Me 4'
    await expect(page.getByText('Despicable Me 4')).toBeVisible();
  });

  test('Add Movie to List', async ({ listPage }) => {
    const page = listPage;

    // 1. Navigate to Add/Remove Movies page
    await page.getByRole('link', { name: 'Add/Remove Movies' }).click();

    // 2. Click in the search box to show dropdown
    await page.getByRole('textbox', { name: 'Add Item' }).click();

    // 3. Select 'Deadpool & Wolverine' from the dropdown
    await page.getByRole('button', { name: 'Deadpool & Wolverine Deadpool' }).click();

    // 4. Verify 'Deadpool & Wolverine' appears in the movies list
    await expect(page.getByText('Deadpool & Wolverine')).toBeVisible();
  });

  test('Add Multiple Movies', async ({ listPage }) => {
    const page = listPage;

    // 1. Navigate to Add/Remove Movies page
    await page.getByRole('link', { name: 'Add/Remove Movies' }).click();

    // 2. Click in the search box to add 'Inside Out 2'
    await page.getByRole('textbox', { name: 'Add Item' }).click();

    // 3. Add 'Inside Out 2' from the dropdown
    await page.getByRole('button', { name: 'Inside Out 2 Inside Out' }).click();

    // 4. Click in the search box to add 'Despicable Me 4'
    await page.getByRole('textbox', { name: 'Add Item' }).click();

    // 5. Add 'Despicable Me 4' from the dropdown
    await page.getByRole('button', { name: 'Despicable Me 4 Despicable Me' }).click();

    // 6. Click in the search box to add 'Alien: Romulus'
    await page.getByRole('textbox', { name: 'Add Item' }).click();

    // 7. Add 'Alien: Romulus' from the dropdown
    await page.getByRole('button', { name: 'Alien: Romulus Alien: Romulus' }).click();

    // 8. Verify 'Inside Out 2' is in the list
    await expect(page.getByText('Inside Out 2')).toBeVisible();

    // 9. Verify 'Despicable Me 4' is in the list
    await expect(page.getByText('Despicable Me 4')).toBeVisible();

    // 10. Verify 'Alien: Romulus' is in the list
    await expect(page.getByText('Alien: Romulus')).toBeVisible();
  });

  test('Remove Single Movie', async ({ listPage }) => {
    const page = listPage;

    // 1. Navigate to Add/Remove Movies page
    await page.getByRole('link', { name: 'Add/Remove Movies' }).click();

    // 2. Click the 'Remove' button next to 'The Garfield Movie'
    await page.locator('li').filter({ hasText: 'The Garfield Movie' }).getByLabel('Remove').click();

    // 3. Verify 'The Garfield Movie' is no longer visible
    await expect(page.getByText('The Garfield Movie')).not.toBeVisible();
  });

  test('Remove Multiple Movies', async ({ listPage }) => {
    const page = listPage;

    // 1. Navigate to Add/Remove Movies page
    await page.getByRole('link', { name: 'Add/Remove Movies' }).click();

    // 2. Add movies first
    await page.getByRole('textbox', { name: 'Add Item' }).click();
    await page.getByRole('button', { name: 'Deadpool & Wolverine Deadpool' }).click();
    await page.getByRole('textbox', { name: 'Add Item' }).click();
    await page.getByRole('button', { name: 'Inside Out 2 Inside Out' }).click();
    await page.getByRole('textbox', { name: 'Add Item' }).click();
    await page.getByRole('button', { name: 'Despicable Me 4 Despicable Me' }).click();

    // 3. Click 'Remove' on 'Deadpool & Wolverine'
    await page.locator('li').filter({ hasText: 'Deadpool & Wolverine' }).getByLabel('Remove').click();

    // 4. Click 'Remove' on 'Inside Out 2'
    await page.locator('li').filter({ hasText: 'Inside Out' }).getByLabel('Remove').click();

    // 5. Click 'Remove' on 'Despicable Me 4'
    await page.locator('li').filter({ hasText: 'Despicable Me' }).getByLabel('Remove').click();

    // 6. Verify movies are removed
    await expect(page.getByText('Deadpool & Wolverine')).not.toBeVisible();
    await expect(page.getByText('Inside Out 2')).not.toBeVisible();
    await expect(page.getByText('Despicable Me 4')).not.toBeVisible();
  });

  test('Navigate Away After Changes', async ({ listPage }) => {
    const page = listPage;

    // 1. Navigate to Add/Remove Movies page
    await page.getByRole('link', { name: 'Add/Remove Movies' }).click();

    // 2. Add 'Alien: Romulus' to the list
    await page.getByRole('textbox', { name: 'Add Item' }).click();
    await page.getByRole('button', { name: 'Alien: Romulus Alien: Romulus' }).click();

    // 3. Click 'View List' tab to verify changes are persisted
    await page.getByRole('link', { name: 'View List' }).click();

    // 4. Verify 'Twisters' is still in the list
    await expect(page.getByText('Twisters')).toBeVisible();

    // 5. Verify 'Bad Boys: Ride or Die' is in the list
    await expect(page.getByText('Bad Boys: Ride or Die')).toBeVisible();

    // 6. Verify 'Alien: Romulus' was added and is visible
    await expect(page.getByText('Alien: Romulus')).toBeVisible();
  });
});
