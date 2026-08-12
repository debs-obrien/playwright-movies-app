/**
 * Lesson: classic Page Object Model vs this repo's helper style.
 *
 * Same flows as `tests/logged-out/search.spec.ts` (local helper). Default
 * house style is still helpers + fixtures — see `docs/TESTING.md`.
 * Bonus learn page: `learn/11-bonus-page-objects.md`.
 */
import { test, expect } from '@playwright/test';
import { SearchPage } from '../../pages/search-page';

test('search for "Twisters" movie', async ({ page }) => {
  const searchPage = new SearchPage(page);

  await searchPage.gotoHome();
  await searchPage.searchForMovie('twisters');

  await expect(page).toHaveURL(/searchTerm=twisters/);

  const twistersResult = searchPage.movieResult(/Twisters/i);
  await expect(twistersResult.getByRole('img')).toHaveAttribute('alt', /Twisters/i);

  await searchPage.openMovie(/twisters/i);

  await expect(searchPage.main).toMatchAriaSnapshot(`
    - heading "Twisters" [level=1]
  `);
});

test('search for non-existent-movie', async ({ page }) => {
  const searchPage = new SearchPage(page);

  await searchPage.gotoHome();
  await searchPage.searchForMovie('non-existent-movie');

  await expect(page).toHaveURL(/searchTerm=non-existent-movie/);

  await expect(searchPage.main).toMatchAriaSnapshot(`
    - heading "Sorry!"
    - heading /There were no results for/
    - img "Not found!"
    - link "Home":
      - button "Home":
        - img
    `);

  await test.step('Navigate back to homepage', async () => {
    await searchPage.goHomeFromEmptyState();
    await expect(page).toHaveURL('/?category=Popular&page=1');
  });
});
