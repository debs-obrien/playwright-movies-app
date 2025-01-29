import { test, expect } from '@playwright/test';

// List of genres to test navigation
const genres = [
  'Action',
  'Adventure',
  'Animation',
  'Comedy',
  'Documentary',
  'Drama',
  'Family',
  'Fantasy',
  'History',
  'Horror',
  'Music',
  'Mystery',
  'Romance',
  'Science Fiction',
  'TV Movie',
  'Thriller',
  'War',
  'Western',
];

// List of discover items to test navigation
const discover = ['Top Rated', 'Upcoming', 'Popular'];

test.beforeEach(async ({ page }) => {
  // Navigate to the base URL before each test
  await page.goto('');
});

test.describe('navigates to menu items', async () => {
  test('navigates to menu items under Discover label', async ({ page }) => {
    for (const item of discover) {
      await test.step(`navigates to ${item}`, async () => {
        // Click on the menu and navigate to the discover item
        await page.getByRole('menu').click();
        await page
          .getByRole('navigation')
          .getByRole('link', { name: item })
          .click();
        // Verify the heading and URL
        await expect(page.getByRole('heading', { level: 1 }))
          .toHaveText(item);
        await expect(page).toHaveURL(new RegExp(item.replace(/\s+/g, '\\+')));
      });
    }
  });

  test('navigates to Genres', async ({ page }) => {
    for (const genre of genres) {
      await test.step(`navigates to ${genre}`, async () => {
        // Click on the menu and navigate to the genre
        await page.getByRole('menu').click();
        await page
          .getByRole('navigation')
          .getByRole('link', { name: genre })
          .click();
        // Verify the URL and heading
        await expect(page).toHaveURL(/genre/);
        await expect(page.getByRole('heading', { level: 1 })).toHaveText(genre);
      });
    }
  });
});

test.describe('navigates to Discover and Genres menu items with larger viewport', () => {
  // Set a larger viewport for these tests
  test.use({ viewport: { width: 1600, height: 1200 } });

  test('navigates to menu items under Discover label', async ({ page }) => {
    for (const item of discover) {
      // Navigate to the discover item and verify the heading and URL
      await page
        .getByRole('navigation')
        .getByRole('link', { name: item })
        .click();
      await expect(page.getByRole('heading', { level: 1 })).toHaveText(item);
      await expect(page).toHaveURL(new RegExp(item.replace(/\s+/g, '\\+')));
    }
  });

  test(`navigates to Genres`, async ({ page }) => {
    for (const genre of genres) {
      // Navigate to the genre and verify the URL and heading
      await page
        .getByRole('navigation')
        .getByRole('link', { name: genre })
        .click();
      await expect(page).toHaveURL(/genre/);
      await expect(page.getByRole('heading', { level: 1 })).toHaveText(genre);
    }
  });
});
