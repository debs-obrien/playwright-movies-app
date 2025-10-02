import { test as baseTest, Page } from '@playwright/test';
import { createList, addMovie } from './list-utilities';

/**
 * Extends the base test with a custom fixture `listPage` that gives
 * a Page instance with a prepopulated list of movies.
 *
 * Depends on `context` fixture to create the page inside it.
 *
 * The fixture performs the following steps:
 * 1. Creates a page and navigates it.
 * 2. Creates lists and adds movies to them.
 * 3. Adds an image to the first movie in each list.
 * 4. Opens the lists page.
 *
 */

export const listTest = baseTest.extend<{ listPage: Page }>({
  listPage: async ({ context }, use) => {
    // fixture setup
    const page = await context.newPage();
    await page.goto('');
    await createList(page, 'my favorite movies', 'list of my favorite movies');

    await listTest.step('add movies to list', async () => {
      await addMovie(page, 'Twisters');
      await addMovie(page, 'The Garfield Movie');
      await addMovie(page, 'Bad Boys: Ride or Die');
    });

    await listTest.step('add image to list', async () => {
      await page.getByRole('link', { name: 'Choose Image' }).click();
      
      // Wait for navigation to choose-image page
      await page.waitForURL(/\/list\/choose-image/);
      
      // Wait for movie items to be loaded
      await page.getByRole('listitem', { name: 'movie' }).first().waitFor();
      
      const movie = page
        .getByRole('listitem', { name: 'movie' })
        .filter({ hasText: /Garfield/ })
        .getByRole('button');
      await movie.hover();
      await movie.getByRole('heading', { name: 'SELECT' }).click();
    });

    await page.getByRole('link', { name: 'View List' }).click();
    
    // Wait for navigation to the list view page
    await page.waitForURL(/\/list\?id=.+&page=1/);
    
    // Wait for the list content to be visible
    await page.getByRole('heading', { name: 'my favorite movies', level: 1 }).waitFor();

    // the value of this fixture is the page object
    await use(page);

    // teardown the fixture
    await page.close();
  },
});
