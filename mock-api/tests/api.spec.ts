import { test, expect } from '@playwright/test';

test('login redirects with tokens and access_token works without cookies', async ({
  request,
}) => {
  const redirectTo = 'https://debs-obrien.github.io/playwright-movies-app/';
  const tokenRes = await request.post('/4/auth/request_token', {
    data: { redirect_to: redirectTo },
  });
  await expect(tokenRes).toBeOK();
  const { request_token } = await tokenRes.json();
  expect(request_token).toBeTruthy();

  const loginRes = await request.post(
    `/auth/access?request_token=${encodeURIComponent(request_token)}`,
    {
      form: {
        email: 'cors-fix@example.com',
        password: 'password',
      },
      maxRedirects: 0,
    },
  );
  expect(loginRes.status()).toBe(302);
  const location = loginRes.headers()['location'];
  expect(location).toBeTruthy();
  const redirected = new URL(location!);
  const accessToken = redirected.searchParams.get('access_token');
  const accountId = redirected.searchParams.get('account_id');
  expect(accessToken).toBeTruthy();
  expect(accountId).toBe(encodeURIComponent('cors-fix@example.com'));

  // New context has no cookies — exchange must use in-memory approval.
  const exchange = await request.post('/4/auth/access_token', {
    data: { request_token },
  });
  await expect(exchange).toBeOK();
  const body = await exchange.json();
  expect(body.access_token).toBe(accessToken);
  expect(body.account_id).toBe(accountId);
});

test('test reset endpoint clears list store', async ({ request }) => {
  const create = await request.post('/4/list', {
    data: { name: 'temp', description: 'reset me', public: false },
  });
  await expect(create).toBeOK();
  const { id } = await create.json();
  expect(id).toBeTruthy();

  const reset = await request.post('/test/reset');
  await expect(reset).toBeOK();
  expect(await reset.json()).toEqual({ success: true });

  // A second reset should still succeed (idempotent).
  const resetAgain = await request.post('/test/reset');
  await expect(resetAgain).toBeOK();
});

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