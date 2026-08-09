/* eslint-disable @typescript-eslint/no-unused-vars */
import { expect } from '@playwright/test';
import { addMovie, createList, openLists, addImageToList, navigateToMovieList } from '../helpers/list-utilities';
import { listTest as test } from '../helpers/list-test';

/**
 * Seed file for Playwright test agents. Skipped in normal runs so the heavy
 * listTest fixture is not paid for an empty body.
 */
test.describe('Test group', () => {
  test.skip('seed', async ({ listPage }) => {
    const page = listPage;
    void page;
  });
});
