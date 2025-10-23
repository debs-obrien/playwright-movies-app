/* eslint-disable @typescript-eslint/no-unused-vars */
import { expect } from '@playwright/test';
import { addMovie, createList, openLists, addImageToList, navigateToMovieList } from '../helpers/list-utilities';
import { listTest as test } from '../helpers/list-test';


test.describe('Test group', () => {
  test('seed', async ({ listPage }) => {
    const page = listPage; //set the page to the list page fixture
  });
});
