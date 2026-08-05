import { test, expect } from '@playwright/test';

test('genre filter', async ({ request }) => {
  const resp = await request.get('/3/discover/movie?with_genres=16');
  await expect(resp).toBeOK();
  const { results } = await resp.json();
  for (const movie of results) {
    expect(movie.genre_ids).toContain(16);
  }
});

test('sorting', async ({ request }) => {
  const resp = await request.get('/3/discover/movie?sort_by=vote_average.asc');
  await expect(resp).toBeOK();
  const { results } = await resp.json();
  const votes = results.map((movie: any) => movie.vote_average);
  expect(votes).toEqual(votes.slice().sort((a: number, b: number) => a - b));
});