import { expect } from '@playwright/test';
import { listTest as test } from '../helpers/list-test';
import { addMovie } from '../helpers/list-utilities';

test('editing an existing list', async ({ listPage }) => {
  // set the page to the listPage fixture
  const page = listPage;

  await page.getByRole('link', { name: 'Edit' }).click();

  await test.step('update list name and description', async () => {
    await page.getByRole('textbox', { name: 'Name' }).fill('my action movies');
    await page.getByRole('textbox', { name: 'Description' }).fill('my favorite action movies');
    await page.getByRole('button', { name: 'Save' }).click();

    // Verify that the list name and description have been updated
    await expect(page.getByRole('textbox', { name: 'Name' })).toHaveValue('my action movies');
    await expect(page.getByRole('textbox', { name: 'Description' }))
      .toHaveValue('my favorite action movies');
    // TODO: replace regex with text when Playwright is rolled.
    await expect(page.locator('main')).toMatchAriaSnapshot(`
      - heading "my action movies" [level=1]
      - textbox "Name": my action movies
      - textbox "Description": /my favorite action movies/
    `);
    await page.getByRole('button', { name: 'Save' }).click();
  });

  await test.step('verify updated list name and description on my list page', async () => {
    await page.getByRole('link', { name: 'View List' }).click();
    await expect(page.getByRole('main')).toMatchAriaSnapshot(`
      - heading "my action movies" [level=1]
      - heading "my favorite action movies" [level=2]
    `);
  });
});

test('adding movies to a list', async ({ listPage }) => {
  // set the page to the listPage fixture
  const page = listPage;
  await page.getByRole('button', { name: 'Add/Remove Movies' }).click();

  await addMovie(page, 'Inside Out 2');
  await addMovie(page, 'Gunner');

  // Verify that the movies have been added to the list
  await expect(page.getByRole('list', { name: 'movies' })).toMatchAriaSnapshot(`
    - listitem: "Twisters"
    - listitem: "The Garfield Movie"
    - listitem: "Bad Boys: Ride or Die"
    - listitem: "Inside Out 2"
    - listitem: "Gunner"
  `);
});

test('deleting movies from a list', async ({ listPage }) => {
  // set the page to the listPage fixture
  const page = listPage;

  await page.getByRole('button', { name: 'Add/Remove Movies' }).click();
  await expect(page.getByRole('list', { name: 'movies' })).toMatchAriaSnapshot(`
    - listitem: "Twisters"
    - listitem: "The Garfield Movie"
    - listitem: "Bad Boys: Ride or Die"
  `);

  await test.step('delete the second movie from list', async () => {
    const movie2 = page
      .getByRole('listitem')
      .filter({ hasText: /The Garfield Movie/ });
    await movie2.getByRole('button', { name: 'Remove' }).click();
  });

  await expect(page.getByRole('list', { name: 'movies' })).toMatchAriaSnapshot(`
    - listitem: "Twisters"
    - listitem: "Bad Boys: Ride or Die"
  `);
  await expect(page.getByRole('listitem', { name: 'movie' })).toHaveCount(2);
});

test('sharing a list', async ({ listPage }) => {
  // set the page to the listPage fixture
  const page = listPage;

  await page.getByRole('button', { name: 'Share' }).click();
  await expect(page.getByRole('dialog')).toMatchAriaSnapshot(`
    - heading "Share my favorite movies" [level=2]
    - textbox "URL": /list/
  `);

  await test.step('close the share dialog', async () => {
    // Close the dialog by clicking outside of it
    await page.locator('body').click({ position: { x: 0, y: 0 } });
    await expect(page.getByRole('dialog')).not.toBeVisible();
  });
});

test('deleting a list', async ({ listPage }) => {
  // set the page to the listPage fixture
  const page = listPage;

  await page.getByRole('link', { name: 'Edit' }).click();
  await page.getByRole('link', { name: 'Delete List' }).click();

  await test.step('confirm the deletion', async () => {
    await page.getByRole('button', { name: /Click the button below/ }).click();
    await page.getByRole('button', { name: 'Yes' }).click();
  });

  // Verify that the list has been deleted
  await expect(page).toHaveURL(/my-lists/);
  await expect(page.getByRole('heading', { level: 3 }))
    .toHaveText(/no lists/);
  await expect(page.getByRole('listitem', { name: 'movie' })).toHaveCount(0);
});
