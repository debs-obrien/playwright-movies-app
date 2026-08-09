/**
 * Lesson: AI raw coverage vs idiomatic house style.
 *
 * The first test mirrors dense @agent output (re-walks create/open on page).
 * The second does the same checks with list fixtures + utilities + ARIA.
 * Prefer the idiomatic form when reviewing generated tests — see docs/AI-TESTING.md.
 */
import { expect, test } from '../../helpers/list-fixtures';
import { addMovie, createList, openLists } from '../../helpers/list-utilities';

test.describe('Lesson: AI raw vs idiomatic', () => {
  test('raw-style: re-walks setup on page (coverage-shaped)', async ({ page }) => {
    await page.goto('');
    await page.getByRole('button', { name: 'User Profile' }).click();
    await page.getByRole('banner').getByRole('link', { name: 'Create New List' }).click();
    await page.getByRole('textbox', { name: 'Name' }).fill('raw style list');
    await page.getByRole('textbox', { name: 'Description' }).fill('created without fixtures');
    await page.getByRole('button', { name: 'Continue' }).click();

    await page.getByRole('textbox', { name: 'Add Item' }).fill('Twisters');
    await page.getByRole('button', { name: /Twisters/i }).first().click();
    await expect(page.getByLabel('movies').getByText(/Twisters/i)).toBeVisible();

    await page.getByRole('button', { name: 'User Profile' }).click();
    await page.getByRole('link', { name: 'My Lists' }).click();
    await expect(page.getByRole('heading', { name: /raw style list/i })).toBeVisible();
  });

  test('idiomatic: fixtures, utilities, ARIA snapshot', async ({ emptyListPage }) => {
    const page = emptyListPage;

    await addMovie(page, 'Twisters');
    await expect(page.getByRole('list', { name: 'movies' })).toMatchAriaSnapshot(`
      - listitem "movie":
        - text: Twisters
        - button "Remove"
    `);

    await openLists(page);
    await expect(page.getByRole('heading', { name: 'my favorite movies', exact: true })).toBeVisible();
  });

  test('idiomatic: createList helper when you need a custom name', async ({ page }) => {
    await page.goto('');
    await createList(page, 'helper list', 'named via utility');
    await addMovie(page, 'Twisters');
    await openLists(page);
    await expect(page.getByRole('heading', { name: /helper list/i })).toBeVisible();
  });
});
