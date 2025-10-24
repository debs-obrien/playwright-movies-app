// spec: specs/movies-list-plan.md
// seed: tests/logged-in/seed.spec.ts

import { expect } from '@playwright/test';
import { listTest } from '../helpers/list-test';

listTest.describe('Error Handling and Edge Cases', { tag: '@agent' }, () => {
  listTest('Add Movie with Very Long Title', async ({ listPage }) => {
    const page = listPage;

    // 1. Navigate to Add/Remove Movies page
    await page.getByRole('link', { name: 'Add/Remove Movies' }).click();

    // 2. Search for a movie with a very long title
    await page.getByRole('textbox', { name: 'Add Item' }).fill('The Ministry of Ungentlemanly Warfare');
    
    // 3. Wait for search results and add the movie to the list
    await expect(page.getByRole('menuitem', { name: /The Ministry of Ungentlemanly Warfare/ })).toBeVisible();
    
    // Click the button within the menuitem to add the movie
    await page.getByRole('menuitem', { name: /The Ministry of Ungentlemanly Warfare/ }).getByRole('button').click();
    
    // Verify movie was added to the list
    await expect(page.getByRole('listitem', { name: 'movie' }).filter({ hasText: 'The Ministry of Ungentlemanly Warfare' })).toBeVisible();

    // 4. Navigate to View List
    await page.getByRole('link', { name: 'View List' }).click();

    // 5. Observe how the long title is displayed - verify layout remains intact and title is readable
    await expect(page.getByRole('heading', { name: 'The Ministry of Ungentlemanly Warfare' })).toBeVisible();
  });
});
