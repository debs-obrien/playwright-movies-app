/**
 * Lesson: network interruption on Add Item search via page.route abort.
 * Waits on accessible signals (aria-busy / role=status) instead of timers.
 */
import { expect, test } from '../../helpers/list-fixtures';

test.describe('Lesson: network abort during movie search', () => {
  test('search fails gracefully when the search request is aborted', async ({
    emptyListPage,
  }) => {
    const page = emptyListPage;

    await page.route('**/search/movie**', async (route) => {
      await route.abort('failed');
    });

    const searchBox = page.getByRole('textbox', { name: 'Add Item' });
    await searchBox.fill('Twisters');

    await expect(searchBox).toHaveAttribute('aria-busy', 'true');
    await expect(page.getByRole('status')).toContainText(/Search failed|Searching/i);

    await expect(page.getByRole('status').filter({ hasText: 'Search failed' })).toBeVisible();
    await expect(page.getByText('Please try again')).toBeVisible();
    await expect(searchBox).toHaveAttribute('aria-busy', 'false');

    await page.unroute('**/search/movie**');
    await searchBox.clear();
    await searchBox.fill('Twisters');
    await expect(page.getByRole('button', { name: /Twisters/i }).first()).toBeVisible();
  });
});
