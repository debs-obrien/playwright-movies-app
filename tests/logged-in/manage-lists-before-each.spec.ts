import { test, expect } from '@playwright/test';
import { addMovie, createList, openLists } from '../helpers/list-utilities';

// Before each test, navigate to the base URL, create a list, and open the lists page
test.beforeEach(async ({ page }) => {
  await page.goto('');
  await createList(
    page,
    'my favorite movies',
    'here is a list of my favorite movies',
  );
  await openLists(page);
});

test('should create multiple lists', async ({ page }) => {
  const movieList = page.getByRole('listitem', { name: 'movie' });

  // Create a new list named "need to watch"
  await createList(
    page,
    'need to watch',
    'here is a list of movies I need to watch',
  );

  // Navigate to the "My Lists" section
  await openLists(page);

  // Verify that two lists have been created
  await expect(movieList).toHaveText([/my favorite movies/, /need to watch/]);
});

test('should edit an existing list', async ({ page }) => {
  // Navigate to the "my favorite movies" list
  await page.getByRole('link', { name: 'my favorite movies' }).click();

  // Click on the "Edit" link for the list
  await page.getByRole('link', { name: 'Edit' }).click();

  await test.step('update list name and description', async () => {
    await page.getByRole('textbox', { name: 'Name' }).fill('my action movies');
    await page.getByRole('textbox', { name: 'Description' }).fill('my favorite action movies');
    await page.getByRole('button', { name: 'Save' }).click();

    // Verify that the list name and description have been updated
    await expect(page.getByRole('textbox', { name: 'Name' })).toHaveValue('my action movies');
    await expect(page.getByRole('textbox', { name: 'Description' }))
      .toHaveValue('my favorite action movies');
    await page.getByRole('button', { name: 'Save' }).click();
  });

  await test.step('verify updated list name and description', async () => {
    // Navigate to the "View List" link
    await page.getByRole('link', { name: 'View List' }).click();

    // Verify that the list heading contains the updated name and description
    await expect(page.locator('main')).toMatchAriaSnapshot(`
      - heading "my action movies" [level=1]
      - heading "my favorite action movies" [level=2]
    `);
  });
});

test('should add and delete movies from a list', async ({ page }) => {
  const movieList = page.getByRole('listitem', { name: 'movie' });

  // Navigate to "Add/Remove Movies" section of the "my favorite movies" list
  await page.getByRole('link', { name: 'my favorite movies' }).click();
  await page.getByRole('button', { name: 'Add/Remove Movies' }).click();

  await test.step('add and verify movies in the list', async () => {
    await addMovie(page, 'Twisters');
    await addMovie(page, 'Bad Boys: Ride or Die');

    // Verify that the movie list contains the two movies
    await expect.soft(movieList).toHaveCount(2);
    await expect
      .soft(movieList)
      .toHaveText([/Twisters/, /Bad Boys: Ride or Die/]);
  });

  await test.step('remove and verify movies in the list', async () => {
    // Find the list item for the movie "Twisters"
    const movie1 = page.getByRole('listitem').filter({ hasText: 'Twisters' });
    await movie1.getByLabel('Remove').click();

    // Verify that the movie list contains only 1 movie
    await expect.soft(movieList).toHaveCount(1);
    await expect.soft(movieList).toHaveText([/Bad Boys: Ride or Die/]);
  });
});

test('should add an image to a list', async ({ page }) => {
  const movie = page.getByRole('listitem', { name: 'movie' });

  // Navigate to the "Add/Remove Movies" section of the "my favorite movies" list
  await page.getByRole('link', { name: 'my favorite movies' }).click();
  await page.getByRole('button', { name: 'Add/Remove Movies' }).click();

  await addMovie(page, 'Twisters');

  // Click on the "Edit" link for the list and then the "Choose Image" link
  await page.getByRole('link', { name: 'Edit' }).click();
  await page.getByRole('link', { name: 'Choose Image' }).click();

  await test.step('choose and verify image for the list', async () => {
    // Verify that the movie list heading contains the text "Twisters"
    await expect(movie.getByRole('heading')).toHaveText('Twisters');

    // Hover over the movie list item and select image
    await movie.hover();
    await movie.getByRole('heading', { name: 'SELECT' }).click();

    // Verify that the button text has changed to "SELECTED"
    await expect(movie.getByRole('button')).toHaveText('SELECTED');
  });

  // Navigate back to the the "My Lists" section of the user profile
  await page.getByRole('button', { name: 'User Profile' }).click();
  await page.getByRole('link', { name: 'My Lists' }).click();

  // Verify the movie list has been updated with the text "my favorite movies"
  await expect(page.getByRole('listitem', { name: 'movie list' }).getByRole('link')).toHaveText(
    /my favorite movies/,
  );
});

test('should share a list', async ({ page }) => {
  // Navigate to the "my favorite movies" list
  await page.getByRole('link', { name: /my favorite movies/ }).click();

  // Click on the "Share" button and verify the share dialog is displayed
  await page.getByRole('button', { name: 'Share' }).click();
  await expect(page.getByRole('dialog').getByRole('heading'))
    .toHaveText('Share my favorite movies');

  // Verify that the URL input in the dialog contains a value with "list"
  await expect(page.getByRole('dialog').getByLabel('URL'))
    .toHaveValue(/list/);

  // Close the dialog by clicking outside of it
  await page.locator('body').click({ position: { x: 0, y: 0 } });

  // Verify that the dialog is no longer visible
  await expect(page.getByRole('dialog')).not.toBeVisible();
});

test(
  'should delete a list',
  {
    annotation: {
      type: 'issue',
      description: 'https://github.com/microsoft/demo.playwright.dev/issues/58',
    },
  },
  async ({ page }) => {
    // Navigate to the "Edit" section of "my favorite movies" list
    await page.getByRole('link', { name: 'my favorite movies' }).click();
    await page.getByRole('link', { name: 'Edit' }).click();

    // Click on the "Delete List" link
    await page.getByRole('link', { name: 'Delete List' }).click();

    // Confirm the deletion by clicking the button
    await page.getByLabel(/Click the button below/).click();
    await page.getByRole('button', { name: 'Yes' }).click();

    // Verify that the list has been deleted
    await expect(page.getByRole('heading', { level: 3 }))
      .toHaveText(/no lists/);
    await expect(page.getByRole('listitem', { name: 'movie' })).toHaveCount(0);
  },
);
