# 08 — Network mocking and API testing

## Goal

Stub HTTP with `page.route` for deterministic UI tests, and call the mock API directly with `request`.

## Read first

- [Network mocking](https://playwright.dev/docs/network)
- [API testing](https://playwright.dev/docs/api-testing)
- Ask your agent to walk through [`sort-by.spec.ts`](../tests/logged-out/sort-by.spec.ts) and [`api.spec.ts`](../tests/logged-out/api.spec.ts)

## Network mocking (`page.route`)

1. [] Find where routes fulfill JSON from `tests/mocks/`.
2. [] Pattern to remember:

```ts
await page.route('*/**/**sort_by=vote_average.desc', async (route) => {
  await route.fulfill({
    path: path.join(__dirname, '../mocks/sort-by-vote-average.json'),
  });
});
```

3. [] Run:

```bash
npx playwright test tests/logged-out/sort-by.spec.ts --project=chromium
```

4. [] Bonus: have the agent temporarily point a route at a tiny inline body, observe the UI, then revert.

## API testing (`request`)

1. [] Note `test.use({ baseURL: TMDB_API_BASE_URL })` targeting the mock in `api.spec.ts`.
2. [] Run:

```bash
npx playwright test tests/logged-out/api.spec.ts --project=chromium
```

3. [] Confirm one test uses `request.get`, `expect(response).toBeOK()`, and JSON ordering asserts.

## Check-in

- [] You can fulfill a route from a fixture file
- [] You can run a pure API spec against the mock
- [] You know why mocking beats depending on live third-party data for sort order

Next: [Lab 09 — AI writing path](./09-ai-writing-path.md).
