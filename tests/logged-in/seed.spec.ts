/* eslint-disable @typescript-eslint/no-unused-vars */
import { listTest as test } from '../helpers/list-test';
import { expect } from '@playwright/test';

test.describe('seed for logged in user', () => {
  test('seed using listPage fixture', async ({ listPage }) => {
    const page = listPage; // set the page to the listPage fixture
  });
});
