# 08 Network mocking and API testing

## Goal

Stub HTTP with `page.route` for deterministic UI tests, and call the mock API directly with `request`.

## Read first

- [Network mocking](https://playwright.dev/docs/network)
- [API testing](https://playwright.dev/docs/api-testing)

## Network mocking (`page.route`)

Fulfill JSON from files under `tests/mocks/`:

```typescript
await page.route('*/**/**sort_by=vote_average.desc', async (route) => {
  await route.fulfill({
    path: path.join(__dirname, '../mocks/sort-by-vote-average.json'),
  });
});
```

Run the sort UI spec:

```bash
npx playwright test tests/logged-out/sort-by.spec.ts --project=chromium
```

Mocking keeps sort order stable instead of depending on live third-party data.

## API testing (`request`)

Target the mock API with `request` and assert JSON ordering:

```typescript
test.use({ baseURL: TMDB_API_BASE_URL });

test('first popular movie', async ({ request }) => {
  const response = await request.get('/3/movie/popular', { params: { page: 1 } });
  await expect(response).toBeOK();
  const movies = (await response.json()).results;

  for (let i = 0; i < movies.length - 1; i++) {
    expect(movies[i].popularity).toBeGreaterThanOrEqual(movies[i + 1].popularity);
  }
});
```

```bash
npx playwright test tests/logged-out/api.spec.ts --project=chromium
```

## Key takeaways

- You can fulfill a route from a fixture file.
- You can run a pure API spec against the mock.
- You know why mocking beats live data for deterministic UI tests.

Next: [09 AI writing path](/09-ai-writing-path).
