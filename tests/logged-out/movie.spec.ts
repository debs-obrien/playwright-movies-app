import { test, expect } from '@playwright/test';

test.describe('Movie Details Page - Content', () => {
  test(
    'verify static content and dynamic vote average',
    {
      tag: '@mocking',
    },
    async ({ page }) => {
      // Get the response and add to it as average votes is dynamic content
      await page.route(
        '*/**/**718821?append_to_response=videos',
        async (route) => {
          const response = await route.fetch();
          const json = await response.json();
          //mock the average votes as this will normally change
          json.vote_average = 7.02;

          await route.fulfill({ response, json });
        },
      );

      await page.goto('movie?id=718821&page=1');
      const movie = page.getByRole('main');

      await expect(movie.getByLabel('Rating Value')).toHaveText('7.02');

      await expect(movie).toMatchAriaSnapshot(`
        - heading "Twisters" [level=1]
        - heading "Chase. Ride. Survive." [level=2]
        - text: English / 123 min. / 2024
        - heading "The Genres" [level=3]
        - list:
          - listitem:
            - link "Thriller"
          - listitem:
            - link "Action"
        - heading "The Synopsis" [level=3]
        - paragraph: /As storm season intensifies/
      `);
    },
  );
});

test.describe('Movie Details Page - Links', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('movie?id=718821&page=1');
  });

  test('action genre link', async ({ page }) => {
    await page.getByRole('link', { name: 'Action' }).click();
    //await expect(page).toHaveURL(/Action/);
    await expect(page.getByRole('heading', { level: 1 }).first()).toHaveText('Action');
  });

  test('thriller genre link', async ({ page }) => {
    await page.getByRole('link', { name: 'Thriller' }).click();
    await expect(page).toHaveURL(/Thriller/);
    await expect(page.getByRole('heading', { level: 1 })).toHaveText(
      'Thriller',
    );
  });

  test('links to cast page and back button', async ({ page }) => {
    await page.getByRole('link', { name: 'Samantha Ireland' }).click();
    await expect(page.getByRole('main').getByRole('heading', { level: 1 }).first())
      .toHaveText('Samantha Ireland');
    await page.getByRole('button', { name: 'Back' }).click();
    await expect(
      page.getByRole('main').getByRole('heading', { level: 1 }).first(),
    ).toHaveText('Twisters');
  });

  test(
    'trailer opens and modal can be closed',
    {
      tag: '@iframe',
    },
    async ({ page }) => {
      await page.getByRole('button', { name: 'Trailer' }).click();
      await expect(page.frameLocator('iframe').getByRole('link', { name: 'Twisters' }))
        .toBeVisible();
      await page.getByRole('button', { name: 'Close the modal by clicking' }).click();
      await expect(
        page.getByRole('main').getByRole('heading', { level: 1 }).first(),
      ).toHaveText('Twisters');
    },
  );

  test(
    'link to website works',
    {
      tag: '@mocking',
    },
    async ({ page }) => {
      await page.context().route('https://www.twisters-movie.com/**', (route) =>
        route.fulfill({
          body: '<html><body><h1>Twisters movie website</h1></body></html>',
        }),
      );

      const newPagePromise = page.waitForEvent('popup');
      await page.getByRole('button', { name: 'Website' }).click();
      const newPage = await newPagePromise;
      await expect(newPage).toHaveURL(/twisters-movie/);
    },
  );

  test(
    'link to IMDB works',
    {
      tag: '@mocking',
    },
    async ({ page }) => {
      await page.context().route('https://www.imdb.com/**', (route) =>
        route.fulfill({
          body: '<html><body><h1>IMDB website</h1></body></html>',
        }),
      );

      const newPagePromise = page.waitForEvent('popup');
      await page.getByRole('button', { name: 'IMDB' }).click();
      const newPage = await newPagePromise;
      await expect(newPage).toHaveURL(/imdb/);
    },
  );
});
