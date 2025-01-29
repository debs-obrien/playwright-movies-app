import { test, expect, Page } from '@playwright/test';

test('search for "Twisters" movie', async ({ page }) => {
  await page.goto('');

  await searchForMovie(page, 'twisters');

  // Verify that the URL contains the search term 'twisters'
  await expect(page).toHaveURL(/searchTerm=twisters/);

  // Verify that the search results contain an image with the alt text matching 'Twisters'
  await expect(page.getByRole('list').getByLabel('movie').getByRole('img'))
    .toHaveAttribute('alt', /Twisters/);

  // Click on the link for the movie 'Twisters'
  await page.getByRole('link', { name: /twisters/i }).click();

  // Verify that the main heading on the movie page is 'Twisters'
  await expect(page.getByRole('main')).toMatchAriaSnapshot(`
    - heading "Twisters" [level=1]
  `);
});

test('search for non-existent-movie', async ({ page }) => {
  await page.goto('');

  await searchForMovie(page, 'non-existent-movie');

  // Verify that the URL contains the search term 'non-existent movie'
  await expect(page).toHaveURL(/searchTerm=non-existent-movie/);

  await expect(page.getByRole('main')).toMatchAriaSnapshot(`
    - heading "Sorry!"
    - heading /There were no results for/
    - img "Not found!"
    - link "Home":
      - button "Home":
        - img
    `);

  await test.step('Navigate back to homepage', async () => {
    await page.getByRole('button', { name: 'Home' }).click();

    // Verify that the URL is the homepage URL with the default category and page
    await expect(page).toHaveURL('/?category=Popular&page=1');
  });
});

/**
 * Searches for a movie using the provided page and movie title.
 */
async function searchForMovie(page: Page, movie: string) {
  const searchInput = page.getByPlaceholder('Search for a movie...');
  await test.step(`Search for "${movie}" movie`, async () => {
    await page.getByRole('banner').getByRole('search').click();
    await searchInput.click();
    await searchInput.fill(movie);
    await searchInput.press('Enter');
  });
}
