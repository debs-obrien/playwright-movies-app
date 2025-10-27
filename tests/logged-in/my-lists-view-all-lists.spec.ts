// spec: specs/movies-list-plan.md
// seed: tests/helpers/list-test.ts

import { expect } from '@playwright/test';
import { listTest as test } from '../helpers/list-test';

test.describe('My Lists Overview Page', { tag: '@agent' }, () => {
  test('View All Lists', async ({ listPage }) => {
    const page = listPage;

    // 1. Navigate to User Profile menu to create additional lists
    await page.getByRole('button', { name: 'User Profile' }).click();

    // 1. Click Create New List to create first additional list
    await page.getByRole('banner').getByRole('link', { name: 'Create New List' }).click();

    // 1. Fill in the name for the first additional list
    await page.getByRole('textbox', { name: 'Name' }).fill('Action Movies Collection');

    // 1. Fill in the description for the first additional list
    await page.getByRole('textbox', { name: 'Description' }).fill('Best action films');

    // 1. Submit the first additional list creation form
    await page.getByRole('button', { name: 'Continue' }).click();

    // 2. Search for and add first movie to the first additional list
    await page.getByRole('textbox', { name: 'Add Item' }).fill('Inside Out 2');
    
    // 2. Click to add Inside Out 2 to the list
    await page.getByRole('button', { name: /Inside Out 2/i }).first().click();
    
    // Wait for movie to be added to the list
    await expect(page.getByLabel('movies').getByText('Inside Out 2')).toBeVisible();

    // 3. Navigate to Choose Image to select a cover image for the first list
    await page.getByRole('link', { name: 'Choose Image' }).click();

    // 3. Select Inside Out 2 as the cover image
    const insideOutButton = page
      .getByRole('listitem', { name: 'movie' })
      .filter({ hasText: 'Inside Out 2' })
      .getByRole('button');
    await insideOutButton.click();

    // 1. Navigate to User Profile menu to create second list
    await page.getByRole('button', { name: 'User Profile' }).click();

    // 1. Click Create New List to create second additional list
    await page.getByRole('link', { name: 'Create New List' }).click();

    // 1. Fill in the name for the second additional list
    await page.getByRole('textbox', { name: 'Name' }).fill('Comedy Favorites');

    // 1. Fill in the description for the second additional list
    await page.getByRole('textbox', { name: 'Description' }).fill('Hilarious comedy movies');

    // 1. Submit the second additional list creation form
    await page.getByRole('button', { name: 'Continue' }).click();

    // 2. Search for and add first movie to the second additional list
    await page.getByRole('textbox', { name: 'Add Item' }).fill('Deadpool');
    
    // 2. Click to add Deadpool & Wolverine to the list
    await page.getByRole('button', { name: /Deadpool/i }).first().click();
    
    // Wait for movie to be added to the list
    await expect(page.getByLabel('movies').getByText(/Deadpool/i)).toBeVisible();

    // 3. Navigate to Choose Image to select a cover image for the second list
    await page.getByRole('link', { name: 'Choose Image' }).click();

    // 3. Select Deadpool & Wolverine as the cover image
    const deadpoolButton = page
      .getByRole('listitem', { name: 'movie' })
      .filter({ hasText: /Deadpool/ })
      .getByRole('button');
    await deadpoolButton.click();

    // 1. Navigate to User Profile menu to create third list
    await page.getByRole('button', { name: 'User Profile' }).click();

    // 1. Click Create New List to create third additional list
    await page.getByRole('link', { name: 'Create New List' }).click();

    // 1. Fill in the name for the third additional list
    await page.getByRole('textbox', { name: 'Name' }).fill('Sci-Fi Adventures');

    // 1. Fill in the description for the third additional list
    await page.getByRole('textbox', { name: 'Description' }).fill('Epic science fiction movies');

    // 1. Submit the third additional list creation form
    await page.getByRole('button', { name: 'Continue' }).click();

    // 2. Type the full movie name to search
    await page.getByRole('textbox', { name: 'Add Item' }).fill('Furiosa');
    
    // 2. Click to add Furiosa: A Mad Max Saga to the list
    await page.getByRole('button', { name: /Furiosa/i }).first().click();
    
    // Wait for movie to be added to the list
    await expect(page.getByLabel('movies').getByText(/Furiosa/i)).toBeVisible();

    // 3. Navigate to Choose Image to select a cover image for the third list
    await page.getByRole('link', { name: 'Choose Image' }).click();

    // 3. Select Furiosa as the cover image
    const furiosaButton = page
      .getByRole('listitem', { name: 'movie' })
      .filter({ hasText: /Furiosa/ })
      .getByRole('button');
    await furiosaButton.click();

    // 4. Navigate to User Profile menu to access My Lists
    await page.getByRole('button', { name: 'User Profile' }).click();

    // 4. Click My Lists to navigate to the My Lists page
    await page.getByRole('link', { name: 'My Lists' }).click();

    // 5. Verify that all four lists appear on My Lists page
    await expect(page.getByRole('heading', { name: 'my favorite movies' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Action Movies Collection' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Comedy Favorites' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Sci-Fi Adventures' })).toBeVisible();
    // Verify all lists show the public status (check that we have at least 4 list items)
    await expect(page.getByRole('listitem', { name: 'movie list' })).toHaveCount(4);
  });
});
