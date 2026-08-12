import { type Locator, type Page, test } from '@playwright/test';

/**
 * Teaching example of a classic Page Object. Default style in this repo is
 * helpers + fixtures (`tests/helpers/`), not POM. Compare with
 * `tests/logged-out/search.spec.ts`. See `learn/11-bonus-page-objects.md`.
 *
 * One class on purpose: a fuller POM would split search results and movie
 * detail. Keep this example small.
 */
export class SearchPage {
  readonly search: Locator;
  readonly searchInput: Locator;
  readonly main: Locator;

  constructor(readonly page: Page) {
    this.search = page.getByRole('banner').getByRole('search');
    this.searchInput = page.getByPlaceholder('Search for a movie...');
    this.main = page.getByRole('main');
  }

  async gotoHome() {
    await this.page.goto('');
  }

  async searchForMovie(movie: string) {
    await test.step(`Search for "${movie}" movie`, async () => {
      await this.search.click();
      await this.searchInput.click();
      await this.searchInput.fill(movie);
      await this.searchInput.press('Enter');
    });
  }

  /**
   * Scope to a result under main. A bare list/img locator can race with the
   * home grid.
   */
  movieResult(name: string | RegExp) {
    return this.main
      .getByRole('listitem', { name: 'movie' })
      .filter({ hasText: name });
  }

  async openMovie(name: string | RegExp) {
    await this.movieResult(name).getByRole('link', { name }).click();
  }

  async goHomeFromEmptyState() {
    await this.page.getByRole('button', { name: 'Home' }).click();
  }
}
