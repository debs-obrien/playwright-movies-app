import { test, expect } from '@playwright/test';
import { TMDB_API_BASE_URL } from '../../movies-app/config/tmdb';

test.use({ baseURL: TMDB_API_BASE_URL });

test.describe('movie categories', () => {
  test('first popular movie', async ({ request }) => {
    const response = await request.get(`/3/movie/popular`, {
      params: { page: 1 },
    });
    await expect(response).toBeOK();
    const jsonResponse = await response.json();
    const movies = jsonResponse.results;
    // Loops over the popularity and checks they are in the correct order
    for (let i = 0; i < movies.length - 1; i++) {
      expect(movies[i].popularity).toBeGreaterThanOrEqual(
        movies[i + 1].popularity,
      );
    }
  });

  test('first top rated movie', async ({ request }) => {
    const response = await request.get(`/3/movie/top_rated`, {
      params: { page: 1 },
    });
    await expect(response).toBeOK();
    const jsonResponse = await response.json();
    const movies = jsonResponse.results;
    // Loops over the vote averages and checks they are in the correct order
    for (let i = 0; i < movies.length - 1; i++) {
      expect(movies[i].vote_average).toBeGreaterThanOrEqual(
        movies[i + 1].vote_average,
      );
    }
  });

  test('order of upcoming movie', async ({ request }) => {
    const response = await request.get(`/3/movie/upcoming`, {
      params: { page: 1 },
    });
    await expect(response).toBeOK();
    const jsonResponse = await response.json();
    const movies = jsonResponse.results;
    // Loops over the release dates and checks they are in the correct order
    for (let i = 0; i < movies.length - 1; i++) {
      expect(new Date(movies[i].release_date).getTime()).toBeGreaterThanOrEqual(
        new Date(movies[i + 1].release_date).getTime(),
      );
    }
  });
});

test('action genre movies', async ({ request }) => {
  const response = await request.get(`/3/discover/movie`, {
    params: { with_genres: 28, page: 1 },
  }); // genre id for action is 28
  await expect(response).toBeOK();
  const jsonResponse = await response.json();
  // Filters out action movies from the JSON response
  const nonActionMovies = jsonResponse.results.filter(
    (movie: {genre_ids:number[]}) => !movie.genre_ids.includes(28),
  );
  expect(nonActionMovies).toEqual([]);
});

test('movie search', async ({ request }) => {
  const response = await request.get(`/3/search/movie`, {
    params: { query: 'Twisters' },
  });
  await expect(response).toBeOK();
  expect(await response.json()).toEqual({
    total_pages: 1,
    total_results: 1,
    page: 1,
    results: [
      expect.objectContaining({
        id: 'tt12584954',
        title: 'Twisters',
        original_title: 'Twisters',
        original_language: 'en',
        status: 'Released',
        tagline: 'Chase. Ride. Survive.',
        backdrop_path: expect.any(String),
        poster_path: expect.any(String),
        popularity: expect.any(Number),
        revenue: expect.any(Number),
      }),
    ],
  });
});

test('movie credits', async ({ request }) => {
  const response = await request.get(`/3/movie/tt12584954/credits`);
  await expect(response).toBeOK();
  expect(await response.json()).toEqual(
    expect.objectContaining({
      cast: expect.arrayContaining([
        expect.objectContaining({
          name: 'Daisy Edgar-Jones',
          original_name: 'Daisy Edgar-Jones',
          known_for_department: 'Acting',
          popularity: expect.any(Number),
          profile_path: expect.any(String),
          character: 'Kate',
        }),
      ]),
      crew: expect.arrayContaining([
        expect.objectContaining({
          name: 'Ashley Nicole Hudson',
          original_name: 'Ashley Nicole Hudson',
          known_for_department: 'Crew',
          popularity: expect.any(Number),
          profile_path: expect.any(String),
          department: 'Crew',
          job: 'Stunts',
        }),
      ]),
    }),
  );
});

test.describe('movie sorting', () => {
  test('movie sorted by popularity', async ({ request }) => {
    const response = await request.get(`/3/discover/movie`, {
      params: { with_genres: 28, page: 1, sort_by: 'popularity.desc' },
    });
    await expect(response).toBeOK();
    const jsonResponse = await response.json();
    const movies = jsonResponse.results;
    // Loops over the popularity and checks they are in the correct order
    for (let i = 0; i < movies.length - 1; i++) {
      expect(movies[i].popularity).toBeGreaterThanOrEqual(
        movies[i + 1].popularity,
      );
    }
  });

  test('movie sorted by vote average', async ({ request }) => {
    const response = await request.get(`/3/discover/movie`, {
      params: { with_genres: 28, page: 1, sort_by: 'vote_average.desc' },
    });
    await expect(response).toBeOK();
    const jsonResponse = await response.json();
    const movies = jsonResponse.results;
    // Loops over the vote averages and checks they are in the correct order
    for (let i = 0; i < movies.length - 1; i++) {
      expect(movies[i].vote_average).toBeGreaterThanOrEqual(
        movies[i + 1].vote_average,
      );
    }
  });

  test('movie sorted by original title', async ({ request }) => {
    const response = await request.get(`/3/discover/movie`, {
      params: { with_genres: 28, page: 1, sort_by: 'original_title.asc' },
    });
    await expect(response).toBeOK();
    const jsonResponse = await response.json();
    const movies = jsonResponse.results;
    // Loops over the titles and checks they are in the correct order
    for (let i = 0; i < movies.length - 1; i++) {
      expect(
        movies[i].original_title.localeCompare(movies[i + 1].original_title),
      ).toBeLessThanOrEqual(0);
    }
  });

  test('movie sorted by release date', async ({ request }) => {
    const response = await request.get(`/3/discover/movie`, {
      params: { with_genres: 28, page: 1, sort_by: 'release_date.desc' },
    });
    await expect(response).toBeOK();
    const jsonResponse = await response.json();
    const movies = jsonResponse.results;
    // Loops over the release dates and checks they are in the correct order
    for (let i = 0; i < movies.length - 1; i++) {
      expect(new Date(movies[i].release_date).getTime()).toBeGreaterThanOrEqual(
        new Date(movies[i + 1].release_date).getTime(),
      );
    }
  });
});

test('configuration', async ({ request }) => {
  const response = await request.get(`/3/configuration`);
  await expect(response).toBeOK();
  expect(await response.json()).toEqual({
    change_keys: expect.any(Array),
    images: expect.objectContaining({
      logo_sizes: expect.any(Array),
      backdrop_sizes: expect.any(Array),
      base_url: expect.any(String),
      secure_base_url: expect.any(String),
    }),
  });
});
