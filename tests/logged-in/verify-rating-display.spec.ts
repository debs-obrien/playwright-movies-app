// spec: specs/movies-list-plan.md
// seed: tests/logged-in/seed.spec.ts

import { expect } from '@playwright/test';
import { listTest as test } from '../helpers/list-test';

test.describe('Viewing Movie Lists', { tag: '@agent' }, () => {
  test('Verify Rating Display', async ({ listPage }) => {
    const page = listPage;
    const movieItems = page.getByRole('listitem', { name: 'movie' });

    await expect(movieItems).toHaveCount(3);

    for (let i = 0; i < 3; i++) {
      const movieItem = movieItems.nth(i);
      await expect(movieItem.getByText('★').first()).toBeVisible();
      await expect(movieItem.getByText('★')).not.toHaveCount(0);
    }
  });
});
