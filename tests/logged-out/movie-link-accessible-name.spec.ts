import { test, expect } from '@playwright/test';

test.describe('Movie card accessible names', () => {
  test('Popular movie links are named by title only', async ({ page }) => {
    await page.goto('/?category=Popular&page=1');

    // Superman has a half-star rating; pre-fix its link name is polluted as soon as
    // the poster loads (e.g. "poster of Superman Superman rating").
    const title = 'Superman';
    const movie = page
      .getByRole('listitem', { name: 'movie' })
      .filter({ has: page.getByRole('heading', { name: title, exact: true }) });

    const poster = movie.getByRole('img', { name: `poster of ${title}` });
    await expect
      .poll(async () =>
        poster.evaluate((img: HTMLImageElement) => img.complete && img.naturalWidth > 0),
      )
      .toBe(true);

    const link = movie.getByRole('link');

    await test.step('exact title matches the card link', async () => {
      await expect(page.getByRole('link', { name: title, exact: true })).toHaveCount(1);
      await expect(link).toHaveAccessibleName(title);
    });

    await test.step('link name is not polluted by poster alt, rating, or CSS', async () => {
      await expect(link).not.toHaveAccessibleName(/poster of|rating|\.react-stars/i);
    });
  });
});
