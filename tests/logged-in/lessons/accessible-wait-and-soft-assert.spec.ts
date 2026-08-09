/**
 * Lesson: wait on accessible search signals; gather soft assertion failures.
 */
import { expect, test } from '../../helpers/list-fixtures';

test.describe('Lesson: accessible wait and soft asserts', () => {
  test('waits on aria-busy and status while searching', async ({ emptyListPage }) => {
    const page = emptyListPage;
    const searchBox = page.getByRole('textbox', { name: 'Add Item' });

    await searchBox.fill('Inside Out 2');
    await expect(searchBox).toHaveAttribute('aria-busy', 'true');
    await expect(page.getByRole('status')).toContainText(/Searching|Inside Out/i);

    const result = page.getByRole('button', { name: /Inside Out 2/i }).first();
    await expect(result).toBeVisible();
    await expect(searchBox).toHaveAttribute('aria-busy', 'false');
    await result.click();

    await expect(page.getByLabel('movies').getByText(/Inside Out 2/i)).toBeVisible();
  });

  test('expect.soft collects multiple assertion failures', async ({ listPage }) => {
    const page = listPage;

    // Soft expects continue after a failure so traces show every mismatch.
    await expect.soft(page.getByRole('heading', { name: 'my favorite movies', exact: true })).toBeVisible();
    await expect.soft(page.getByRole('button', { name: 'Share' })).toBeVisible();
    await expect.soft(page.getByRole('listitem', { name: 'movie' })).toHaveCount(3);
  });
});
