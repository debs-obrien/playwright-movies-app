// spec: specs/movies-list-plan.md
// seed: tests/logged-in/seed.spec.ts

import { expect } from '@playwright/test';
import { listTest } from '../helpers/list-test';

listTest.describe('Error Handling and Edge Cases', { tag: '@agent' }, () => {
  listTest('Rapid Navigation Between Pages', async ({ listPage }) => {
    const page = listPage;

    // 1-2. Rapidly click Edit List, then immediately View List
    await page.getByRole('link', { name: 'Edit' }).click();
    await page.getByRole('link', { name: 'View List' }).click();

    // 3. Click Add/Remove Movies, then immediately Choose Image
    await page.getByRole('link', { name: 'Add/Remove Movies' }).click();
    await page.getByRole('link', { name: 'Choose Image' }).click();

    // 4. Click View List, then immediately Edit List
    await page.getByRole('link', { name: 'View List' }).click();
    await page.getByRole('link', { name: 'Edit' }).click();

    // 5. Verify no errors occur - application remains stable and pages load correctly
    await expect(page.getByRole('heading', { name: 'my favorite movies', exact: true })).toBeVisible();
  });
});
