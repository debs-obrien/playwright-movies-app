import { test, expect, Page } from '@playwright/test';

/**
 * Creates a new list with the specified name and description.
 *
 * @param page - The Playwright Page object representing the browser page.
 * @param listName - The name of the new list to be created.
 * @param listDescription - The description of the new list to be created.
 *
 * @example
 * ```typescript
 * await createList(page, 'my list', 'list of my movies');
 * ```
 */
export async function createList(
  page: Page,
  listName: string,
  listDescription: string,
) {
  await test.step('create a new list', async () => {
    await page.getByRole('button', { name: 'User Profile' }).click();
    await page.getByRole('link', { name: 'Create New List' }).first().click();
    await page.getByRole('textbox', { name: 'Name' }).fill(listName);
    await page.getByRole('textbox', { name: 'Description' }).fill(listDescription);
    await page.getByRole('button', { name: 'Continue' }).click();
    // wait until the list was created and we're on its add/remove movies page
    await page.waitForURL(url => url.searchParams.has('listId'));
  });
}

/**
 * Navigates to the "My Lists" section of the user profile.
 *
 * @param page - The Playwright Page object representing the browser page.
 *
 * @example
 * ```typescript
 * await openLists(page, 'My Lists');
 * ```
 */
export async function openLists(page: Page, name: string = 'My Lists') {
  await test.step('open list from menu', async () => {
    await page.getByRole('button', { name: 'User Profile' }).click();
    await page.getByRole('link', { name }).click();
  });
}

/**
 * Adds a movie to the list on the given page.
 *
 * @param page - The Playwright Page object representing the browser page.
 * @param movieName - The name of the movie to be added to the list.
 *
 * @example
 * ```typescript
 * await addMovie(page, 'The Matrix');
 * ```
 */
export async function addMovie(page: Page, movieName: string) {
  await test.step('add movie to list', async () => {
    // Clear the field first, then fill with the movie name
    const searchBox = page.getByRole('textbox', { name: 'Add Item' });
    await searchBox.clear();
    await searchBox.fill(movieName);
    
    // Use Playwright's built-in auto-waiting with getByRole - it will wait for the button to appear
    await page.getByRole('button', { name: new RegExp(movieName, 'i') }).first().click();
    // Verify movie was added by checking for the movie text (partial match)
    await expect(page.getByLabel('movies').getByText(new RegExp(movieName, 'i'))).toBeVisible();
  });
}

/**
 * Adds an image to the list for the specified movie.
 *
 * @param page - The Playwright Page object representing the browser page.
 * @param movieName - The name of the movie to which the image will be added. Defaults to 'Twister'.
 *
 * @example
 * ```typescript
 * await addImageToList(page, 'The Matrix');
 * ```
 */
export async function addImageToList(page: Page, movieName: string) {
  await test.step('add image to list', async () => {
    // Click on the "Choose Image" link
    await page.getByRole('link', { name: 'Choose Image' }).click();

    // Find the movie list item and verify its heading contains the movie name
    const movie = page.getByRole('listitem', { name: 'movie' });
    await expect(movie.getByRole('heading')).toHaveText(movieName);

    // Hover over the movie list item and select the image
    await movie.hover();
    await movie.getByRole('heading', { name: 'SELECT' }).click();

    // Verify that the button text has changed to "SELECTED"
    await expect(movie.getByRole('button')).toHaveText('SELECTED');

    // Navigate back to the the "My Lists" section of the user profile
    await openLists(page, 'My Lists');

    // Verify the movie list has been updated with the text "my favorite movies"
    await expect(page.getByRole('listitem', { name: 'movie list' }).getByRole('link')).toHaveText(
      /my favorite movies/,
    );
  });
}

/**
 * Navigates to the movie list page by clicking on a link with the specified name.
 *
 * @param page - The Playwright Page object representing the browser page.
 * @param name - The name of the link to click on to navigate to the movie list.
 * @returns A promise that resolves when the navigation is complete.
 *
 * @example
 * ```typescript
 * await navigateToMovieList(page, 'My Favorite Movies');
 * ```
 */
export async function navigateToMovieList(page: Page, name: string) {
  await page.getByRole('link', { name }).click();
}
