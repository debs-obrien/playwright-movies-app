import { test, expect } from '@playwright/test';

test.describe('Movie card accessible names', () => {
  test('Popular movie links are named by title only', async ({ page }) => {
    await page.goto('/?category=Popular&page=1');

    const firstMovie = page.getByRole('listitem', { name: 'movie' }).first();
    const title = (
      await firstMovie.getByRole('heading', { level: 2 }).textContent()
    )?.trim();
    expect(title).toBeTruthy();

    await test.step('exact title matches the card link', async () => {
      const linkByTitle = page.getByRole('link', { name: title!, exact: true });
      await expect(linkByTitle).toHaveCount(1);
      await expect(firstMovie.getByRole('link', { name: title!, exact: true })).toBeVisible();
    });

    await test.step('link name is not polluted by poster alt, rating, or CSS', async () => {
      const link = firstMovie.getByRole('link', { name: title!, exact: true });
      await expect(link).toHaveAccessibleName(title!);
      await expect(link).not.toHaveAccessibleName(/poster of|rating|\.react-stars/i);
    });
  });
});
