import { APIRequestContext, expect } from '@playwright/test';
import { TMDB_API_BASE_URL } from '../../movies-app/config/tmdb';

/**
 * Clears in-memory mock list state so logged-in tests do not leak lists
 * across files (shared account + global listStore).
 */
export async function resetMockApi(request: APIRequestContext) {
  const response = await request.post(`${TMDB_API_BASE_URL}/test/reset`);
  expect(response.ok(), `mock API reset failed: ${response.status()}`).toBeTruthy();
}
