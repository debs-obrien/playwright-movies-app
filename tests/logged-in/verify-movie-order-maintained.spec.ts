// spec: specs/movies-list-plan.md
// seed: tests/logged-in/seed.spec.ts

import { expect } from '@playwright/test';
import { listTest as test } from '../helpers/list-test';

test.describe('Persistence and Data Integrity', { tag: '@agent' }, () => {
  test('Verify Movie Order is Maintained', async ({ listPage }) => {
    const page = listPage;

    // 1. Navigate to Add/Remove Movies page
    await page.getByRole('link', { name: 'Add/Remove Movies' }).click();

    // 2. Add movies in specific order: "Deadpool & Wolverine", "Inside Out 2", "Despicable Me 4"
    await page.getByRole('textbox', { name: 'Add Item' }).fill('Deadpool');
    await page.getByRole('button', { name: /Deadpool & Wolverine/i }).first().click();
    await expect(page.getByLabel('movies').getByText(/Deadpool & Wolverine/i)).toBeVisible();

    await page.getByRole('textbox', { name: 'Add Item' }).fill('Inside Out 2');
    await page.getByRole('button', { name: /Inside Out 2/i }).first().click();
    await expect(page.getByLabel('movies').getByText(/Inside Out 2/i)).toBeVisible();

    await page.getByRole('textbox', { name: 'Add Item' }).fill('Despicable Me 4');
    await page.getByRole('button', { name: /Despicable Me 4/i }).first().click();
    await expect(page.getByLabel('movies').getByText(/Despicable Me 4/i)).toBeVisible();

    // 3. Navigate to View List
    await page.getByRole('link', { name: 'View List' }).click();

    // 4. Verify order matches
    const movies = page.getByRole('list', { name: 'movies' }).getByRole('listitem');
    await expect(movies.nth(0)).toContainText('Twisters');
    await expect(movies.nth(1)).toContainText('The Garfield Movie');
    await expect(movies.nth(2)).toContainText('Bad Boys: Ride or Die');
    await expect(movies.nth(3)).toContainText('Deadpool & Wolverine');
    await expect(movies.nth(4)).toContainText('Inside Out 2');
    await expect(movies.nth(5)).toContainText('Despicable Me 4');

    // 5. Navigate back to "My Lists" and re-open the list
    await page.getByRole('button', { name: 'User Profile' }).click();
    await page.getByRole('link', { name: 'My Lists' }).click();
    await page.getByRole('link', { name: /my favorite movies/i }).click();

    // 6. Verify order is still maintained
    const moviesAfterNavigation = page.getByRole('list', { name: 'movies' }).getByRole('listitem');
    await expect(moviesAfterNavigation.nth(0)).toContainText('Twisters');
    await expect(moviesAfterNavigation.nth(1)).toContainText('The Garfield Movie');
    await expect(moviesAfterNavigation.nth(2)).toContainText('Bad Boys: Ride or Die');
    await expect(moviesAfterNavigation.nth(3)).toContainText('Deadpool & Wolverine');
    await expect(moviesAfterNavigation.nth(4)).toContainText('Inside Out 2');
    await expect(moviesAfterNavigation.nth(5)).toContainText('Despicable Me 4');
  });
});
