import { test, expect } from '@playwright/test';
import path from 'path';

test('sort movies by average votes and original title', async ({ page }) => {
  // Navigate to the movies page with Action genre
  await page.goto('/genre?id=28&name=Action&page=1');

  // Get all the movies on the page
  const movies = page.getByRole('listitem', { name: 'movie' });

  await test.step('sort by average votes and verify order', async () => {
    // Sort movies by average votes
    await page.getByRole('textbox', { name: 'Sort By' }).click();
    await page.getByRole('button', { name: 'Votes Average' }).click();
    await expect(movies).toHaveCount(20);

    // Extracts and parses the number of votes from a list of movie elements.
    const movieVotes = await movies.evaluateAll((movies) =>
      movies
        .map((movie) => movie.textContent ? movie.textContent.match(/★★★★★\s*(\d+(\.\d+)?)/)?.[1] : null)
        .filter(Boolean)
        .map((rating) => parseFloat(rating!)),
    );

    await test.info().attach('movies list sorted by average votes', {
      body: `${movieVotes.join(', ')}`,
      contentType: 'text/plain',
    });

    // Verify that the order is correct:
    for (let i = 0; i < movieVotes.length - 1; i++) {
      expect(movieVotes[i]).toBeGreaterThanOrEqual(movieVotes[i + 1]);
    }
  });

  await test.step('sort by original title and verify order', async () => {
    const movieTitlesArray: string[] = [];
    const movieTitles = movies.getByRole('heading');

    // Sort movies by original title
    await page.getByRole('textbox', { name: 'Sort By' }).click();
    await page.getByRole('button', { name: 'Original Title' }).click();

    // Get text content of the first four movies after sorting
    for (let i = 0; i < 4; i++) {
      const textContent = await movieTitles.nth(i).textContent(); if (textContent) movieTitlesArray.push(textContent);
    }

    // Create an attachment to see the text content for movies sorted by original title
    await test.info().attach('movies sorted by original title', {
      body: `${movieTitlesArray.join(', ')}`,
      contentType: 'text/plain',
    });

    // Compare titles to ensure they are sorted in ascending order
    const sortedMovieTitles = [...movieTitlesArray].sort((a, b) =>
      a.localeCompare(b),
    );
    expect(movieTitlesArray).toEqual(sortedMovieTitles);
  });
});

test('sort by with api mocking', { tag: '@mocking' }, async ({ page }) => {
  // Mock the API call for sorting by popularity
  await page.route('*/**/**sort_by=popularity.desc', async (route) => {
    await route.fulfill({
      path: path.join(__dirname, '../mocks/sort-by-popularity.json'),
    });
  });

  // Mock the API call for sorting by vote average
  await page.route('*/**/**sort_by=vote_average.desc', async (route) => {
    await route.fulfill({
      path: path.join(__dirname, '../mocks/sort-by-vote-average.json'),
    });
  });

  // Mock the API call for sorting by title
  await page.route('*/**/**sort_by=original_title.asc', async (route) => {
    await route.fulfill({
      path: path.join(__dirname, '../mocks/sort-by-original-title.json'),
    });
  });

  // Mock the API call for sorting by release date
  await page.route('*/**/**sort_by=release_date.desc', async (route) => {
    await route.fulfill({
      path: path.join(__dirname, '../mocks/sort-by-release-date.json'),
    });
  });

  // Navigate to the movies page with Action genre
  await page.goto('/genre?id=28&name=Action&page=1');

  // Get all the movies on the page
  const movieTitles = page
    .getByRole('listitem', { name: 'movie' })
    .getByRole('heading');

  await test.step('check initial movies', async () => {
    // Verify the text content of all movies matches the expected array
    await expect(movieTitles)
      .toHaveText([
        'Deadpool and Wolverine',
        'The Garfield movie',
        'Sonic the Hedgehog 3',
        'Kung Fu Panda 4',
      ]);
  });

  await test.step('sort by average votes', async () => {
    // Sort movies by average votes
    await page.getByRole('textbox', { name: 'Sort By' }).click();
    await page.getByRole('button', { name: 'Votes Average' }).click();

    // Check the text content for all the movies contains an array with the following
    await expect(movieTitles)
      .toHaveText([
        'The Garfield movie',
        'Deadpool and Wolverine',
        'Sonic the Hedgehog 3',
        'Kung Fu Panda 4',
      ]);
  });

  await test.step('sort by original title', async () => {
    // Sort movies by original title
    await page.getByRole('textbox', { name: 'Sort By' }).click();
    await page.getByRole('button', { name: 'Original Title' }).click();

    // Check the text content for all the movies contains an array with the following
    await expect(movieTitles)
      .toHaveText([
        'Deadpool and Wolverine',
        'Kung Fu Panda 4',
        'Sonic the Hedgehog 3',
        'The Garfield movie',
      ]);
  });

  await test.step('sort by release date', async () => {
    // Sort movies by release date
    await page.getByRole('textbox', { name: 'Sort By' }).click();
    await page.getByRole('button', { name: 'Release Date' }).click();

    // Check the text content for all the movies contains an array with the following
    await expect(movieTitles)
      .toHaveText([
        'Kung Fu Panda 4',
        'Deadpool and Wolverine',
        'Sonic the Hedgehog 3',
        'The Garfield movie',
      ]);
  });

  await test.step('sort by popularity', async () => {
    // Sort movies by popularity
    await page.getByRole('textbox', { name: 'Sort By' }).click();
    await page.getByRole('button', { name: 'Popularity' }).click();

    // Check the text content for all the movies contains an array with the following
    await expect(movieTitles).toHaveText([
      'Deadpool and Wolverine',
      'The Garfield movie',
      'Sonic the Hedgehog 3',
      'Kung Fu Panda 4',
    ]);
  });
});
