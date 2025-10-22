// spec: specs/movies-list-plan.md
// seed: tests/logged-in/seed.spec.ts

import { expect } from '@playwright/test';
import { test } from '@playwright/test';

test.describe('Deleting Movie Lists', { tag: '@agent' }, () => {
  test('Delete Multiple Lists', async ({ page }) => {
    await page.goto('');

    // 1. Create three lists (first list already exists from seed, creating second and third)
    // Navigate to My Lists page first
    await page.getByRole('button', { name: 'User Profile' }).click();
    await page.getByRole('link', { name: 'My Lists' }).click();

    // Create first list - my favorite movies
    await page.getByRole('link', { name: 'Create New List' }).click();
    await page.getByRole('textbox', { name: 'Name' }).fill('my favorite movies');
    await page.getByRole('textbox', { name: 'Description' }).fill('list of my favorite movies');
    await page.getByRole('button', { name: 'Continue' }).click();

    // Add movie to first list
    await page.getByRole('textbox', { name: 'Add Item' }).fill('Twisters');
    await page.getByText("Twisters").first().waitFor({ state: 'visible' });
    await page.getByRole('button', { name: /Twisters/ }).first().click();

    // Create second list - Action Movies
    await page.getByRole('button', { name: 'User Profile' }).click();
    await page.getByRole('link', { name: 'Create New List' }).click();
    await page.getByRole('textbox', { name: 'Name' }).fill('Action Movies');
    await page.getByRole('textbox', { name: 'Description' }).fill('Action movies collection');
    await page.getByRole('button', { name: 'Continue' }).click();

    // 2. Add movie to second list
    await page.getByRole('textbox', { name: 'Add Item' }).fill('Deadpool');
    await page.getByText("Deadpool & Wolverine").first().waitFor({ state: 'visible' });
    await page.getByRole('button', { name: 'Deadpool & Wolverine Deadpool' }).click();

    // Create third list - Comedy Movies
    await page.getByRole('button', { name: 'User Profile' }).click();
    await page.getByRole('link', { name: 'Create New List' }).click();
    await page.getByRole('textbox', { name: 'Name' }).fill('Comedy Movies');
    await page.getByRole('textbox', { name: 'Description' }).fill('Comedy movies collection');
    await page.getByRole('button', { name: 'Continue' }).click();

    // 2. Add movie to third list
    await page.getByRole('textbox', { name: 'Add Item' }).fill('Inside Out');
    await page.getByText("Inside Out 2").first().waitFor({ state: 'visible' });
    await page.getByRole('button', { name: 'Inside Out 2 Inside Out' }).click();

    // 3. Navigate to "My Lists" and verify all three lists appear
    await page.getByRole('button', { name: 'User Profile' }).click();
    await page.getByRole('link', { name: 'My Lists' }).click();
    await expect(page.getByRole('list', { name: 'movie lists' })).toMatchAriaSnapshot(`
- listitem "movie list":
  - link /my favorite movies/:
    - img /my favorite movies/
    - heading "my favorite movies" [level=2]
- listitem "movie list":
  - link /Action Movies/:
    - img /Action Movies/
    - heading "Action Movies" [level=2]
- listitem "movie list":
  - link /Comedy Movies/:
    - img /Comedy Movies/
    - heading "Comedy Movies" [level=2]
`);

    // 4. Delete the first list
    await page.getByRole('link', { name: 'poster of my favorite movies' }).click();
    await page.getByRole('link', { name: 'Edit' }).click();
    await page.getByRole('link', { name: 'Delete List' }).click();
    await page.getByRole('button', { name: 'Click the button below if you' }).click();
    await page.getByRole('button', { name: 'Yes' }).click();

    // 5. Verify it's removed from "My Lists"
    await expect(page.getByRole('list', { name: 'movie lists' })).toMatchAriaSnapshot(`
- listitem "movie list":
  - link /Action Movies/:
    - img /Action Movies/
    - heading "Action Movies" [level=2]
- listitem "movie list":
  - link /Comedy Movies/:
    - img /Comedy Movies/
    - heading "Comedy Movies" [level=2]
`);

    // 6. Delete the second list
    await page.getByRole('link', { name: 'poster of Action Movies' }).click();
    await page.getByRole('link', { name: 'Edit' }).click();
    await page.getByRole('link', { name: 'Delete List' }).click();
    await page.getByRole('button', { name: 'Click the button below if you' }).click();
    await page.getByRole('button', { name: 'Yes' }).click();

    // 7. Verify it's removed from "My Lists"
    await expect(page.getByRole('heading', { name: 'Comedy Movies' })).toBeVisible();

    // 8. Delete the third list
    await page.getByRole('link', { name: 'poster of Comedy Movies' }).click();
    await page.getByRole('link', { name: 'Edit' }).click();
    await page.getByRole('link', { name: 'Delete List' }).click();
    await page.getByRole('button', { name: 'Click the button below if you' }).click();
    await page.getByRole('button', { name: 'Yes' }).click();

    // 9. Verify "no lists" message appears
    await expect(page.getByText('There\'s no lists yet. Let\'s change that!')).toBeVisible();
  });
});
