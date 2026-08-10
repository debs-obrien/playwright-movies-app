// spec: specs/movies-list-plan.md
// seed: tests/logged-in/seed.spec.ts

import { test, expect } from '../helpers/base-test';
import { addMovie, createList, openLists } from '../helpers/list-utilities';

test.describe('Deleting Movie Lists', { tag: '@agent' }, () => {
  test('Delete Multiple Lists', async ({ page }) => {
    await page.goto('');

    await createList(page, 'my favorite movies', 'list of my favorite movies');
    await addMovie(page, 'Twisters');

    await createList(page, 'Action Movies', 'Action movies collection');
    await addMovie(page, 'Deadpool & Wolverine');

    await createList(page, 'Comedy Movies', 'Comedy movies collection');
    await addMovie(page, 'Inside Out 2');

    await openLists(page);
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

    await page.getByRole('link', { name: 'poster of my favorite movies' }).click();
    await page.getByRole('link', { name: 'Edit' }).click();
    await page.getByRole('link', { name: 'Delete List' }).click();
    await page.getByRole('button', { name: 'Click the button below if you' }).click();
    await page.getByRole('button', { name: 'Yes' }).click();

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

    await page.getByRole('link', { name: 'poster of Action Movies' }).click();
    await page.getByRole('link', { name: 'Edit' }).click();
    await page.getByRole('link', { name: 'Delete List' }).click();
    await page.getByRole('button', { name: 'Click the button below if you' }).click();
    await page.getByRole('button', { name: 'Yes' }).click();

    await expect(page.getByRole('heading', { name: 'Comedy Movies' })).toBeVisible();

    await page.getByRole('link', { name: 'poster of Comedy Movies' }).click();
    await page.getByRole('link', { name: 'Edit' }).click();
    await page.getByRole('link', { name: 'Delete List' }).click();
    await page.getByRole('button', { name: 'Click the button below if you' }).click();
    await page.getByRole('button', { name: 'Yes' }).click();

    await expect(page.getByText("There's no lists yet. Let's change that!")).toBeVisible();
  });
});
