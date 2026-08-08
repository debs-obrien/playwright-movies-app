import { test, expect } from '@playwright/test';

test('The Dark Knight is the first top rated movie', async ({
  page,
}) => {
  await page.goto('/?category=Top+Rated&page=1');

  const firstMovie = page.getByRole('listitem', { name: 'movie' }).first();
  const firstMovieRating = page.getByLabel('rating').first();

  await expect(firstMovie).toMatchAriaSnapshot(`
    - 'link /The Dark Knight/':
      - 'img "poster of The Dark Knight"'
  `);
  await expect(firstMovieRating).toHaveAccessibleName('rating');

  await test.step('Verify movie rating tooltip content', async (step) => {
    await firstMovieRating.hover();
    const tooltip = page.getByRole('tooltip');
    const tooltipText = await tooltip.textContent() ?? '';
    await expect(tooltip).toContainText(/average rating on/);

    // Attach the tooltip text content to the test report
    await step.attach('first movies tooltip text content', { body: tooltipText, contentType: 'text/markdown' });
  });

  await test.step('Click on movie and verify details page', async () => {
    await firstMovie.click();
    await expect(page.getByRole('main')).toMatchAriaSnapshot(`
    - 'heading "The Dark Knight" [level=1]'
    - heading "Some men just want to watch the world burn." [level=2]
    - text: /★/
    - paragraph: /\\d+\\.\\d+/
    - heading "The Genres" [level=3]
    - heading "The Synopsis" [level=3]
    - heading "The Cast" [level=3]
    - link "Website"
    - link "IMDB"
    - button "Back"
    `);
  });
});

test('dynamic content for first upcoming movie', async ({ page }, testInfo) => {
  await page.goto('/?category=Upcoming&page=1');

  const firstMovie = page.getByRole('listitem', { name: 'movie' }).first();
  const firstMovieRating = page.getByLabel('rating').first();
  const movieName = await firstMovie
    .getByRole('heading', { level: 2 })
    .textContent();

  // Attach the movie name to the test report
  await testInfo.attach('name of first movie', {
    body: movieName??'',
    contentType: 'text/markdown',
  });

  await expect(firstMovie).toContainText(movieName ?? '');
  await expect(firstMovie.getByRole('img'))
    .toHaveAccessibleName(`poster of ${movieName ?? ''}`);
  await expect(firstMovieRating).toHaveAccessibleName('rating');

  await test.step('Verify movie rating tooltip content', async (step) => {
    await firstMovieRating.hover();
    const tooltip = page.getByRole('tooltip');
    const tooltipText = await tooltip.textContent() ?? '';
    await expect(tooltip).toContainText(/average rating on/);

    // Attach the tooltip text content to the test report
    await step.attach('first movies tooltip text content', {
      body: tooltipText,
      contentType: 'text/markdown',
    });
  });

  await test.step('Click on movie and verify details page', async () => {
    await firstMovie.click();
    await expect(page.getByRole('main')).toMatchAriaSnapshot(`
    - 'heading "${movieName ?? ''}" [level=1]'
    `);
    // Mock fixtures currently omit trailer videos and spoken languages.
    await expect(page.getByRole('main')).toMatchAriaSnapshot(`
    - 'heading "${movieName ?? ''}" [level=1]'
    - heading [level=2]
    - text: /★/
    - paragraph: /\\d+\\.\\d+/
    - heading "The Genres" [level=3]
    - heading "The Synopsis" [level=3]
    - heading "The Cast" [level=3]
    - link "Website"
    - link "IMDB"
    - button "Back"
    `);
  });
});
