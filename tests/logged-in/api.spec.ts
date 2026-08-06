import { test, expect } from '../helpers/base-test';
import { TMDB_API_BASE_URL } from '../../movies-app/config/tmdb';

test.use({ baseURL: TMDB_API_BASE_URL });

test('lists', async ({ request, context }) => {
  // create a list
  let response = await request.post(`/4/list`, {
    data: {
      name: 'christmas favourites',
      description: 'the best christmas movies',
      public: false,
    },
  });
  await expect(response).toBeOK();
  const { id } = await response.json();
  expect(typeof id).toBe('string');
  expect(id).not.toHaveLength(0);

  // add items to it
  response = await request.post(`/4/list/${id}/items`, {
    data: {
      items: [
        {
          media_type: 'movie',
          media_id: 'tt5779228', // the garfield movie
        },
        {
          media_type: 'movie',
          media_id: 'tt18259086', // sonic the hedgehog
        },
      ],
    },
  });
  await expect(response).toBeOK();

  // check updated response
  response = await request.get(`/4/list/${id}`);
  await expect(response).toBeOK();
  expect(await response.json()).toEqual(
    expect.objectContaining({
      id,
      name: 'christmas favourites',
      description: 'the best christmas movies',
      public: false,
      created_by: { id: expect.any(String) },
      movies: ['tt5779228', 'tt18259086'],
      page: 1,
      total_pages: 1,
      total_results: 2,
      results: [
        expect.objectContaining({ title: 'The Garfield Movie' }),
        expect.objectContaining({ title: 'Sonic the Hedgehog 3' }),
      ],
    }),
  );

  // remove sonic the hedgehog
  response = await request.delete(`/4/list/${id}/items`, {
    data: { items: [{ media_id: 'tt18259086' }] }, // Sonic the Hedgehog
  });
  await expect(response).toBeOK();

  // check updated response
  response = await request.get(`/4/list/${id}`);
  await expect(response).toBeOK();
  expect(await response.json()).toEqual(
    expect.objectContaining({
      movies: ['tt5779228'],
      total_results: 1,
      results: [expect.objectContaining({ title: 'The Garfield Movie' })],
    }),
  );

  // check account lists
  const [{ value: account_id }] = (await context.cookies()).filter(
    (cookie) => cookie.name === 'current_account',
  );
  response = await request.get(
    `/4/account/${decodeURIComponent(account_id)}/lists`,
  );
  await expect(response).toBeOK();
  expect(await response.json()).toEqual(
    expect.objectContaining({
      total_results: 1,
      results: [expect.objectContaining({ name: 'christmas favourites' })],
    }),
  );

  // delete list
  response = await request.delete(`/4/list/${id}`);
  await expect(response).toBeOK();

  // ensure list is deleted
  response = await request.get(
    `/4/account/${decodeURIComponent(account_id)}/lists`,
  );
  await expect(response).toBeOK();
  expect(await response.json()).toEqual(
    expect.objectContaining({
      total_results: 0,
      results: [],
    }),
  );
});
