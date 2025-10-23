// spec: specs/movies-list-plan.md
// seed: tests/logged-in/seed.spec.ts

import { expect } from '@playwright/test';
import { test } from '@playwright/test';

test.describe('Creating New Lists', { tag: '@agent' }, () => {
  test('Create List with Very Long Name and Description - Boundary Test', async ({ page }) => {
    await page.goto('');

    const longName = 'This is a very long name for a movie list that contains exactly two hundred characters to test the boundary conditions of the input field and ensure that the application handles long text appropriately wow';
    const longDescription = 'This is an extremely long description for a movie list that is designed to test the boundary conditions and limits of the description field input. The purpose of this test is to verify that the application can handle very large amounts of text without breaking the user interface or causing any errors. This description continues for many more characters to reach the target of one thousand characters total. We need to ensure that the system properly validates, stores, and displays this lengthy text content. The description field should be able to accommodate detailed explanations about the movie list, including the theme, criteria for inclusion, personal notes, and any other relevant information that a user might want to share. Testing with boundary values is an important part of ensuring application robustness and reliability. This text will help us verify that the UI layout remains intact and readable even with very long content. We are now approaching the target length and should have approximately one thousand characters in this description field to properly test the system boundaries and behavior.';

    // 1. Click the "User Profile" button in the header
    await page.getByRole('button', { name: 'User Profile' }).click();

    // 2. Click the "Create New List" link
    await page.getByRole('banner').getByRole('link', { name: 'Create New List' }).click();

    // 3. Fill in the "Name" field with a 200-character string
    await page.getByRole('textbox', { name: 'Name' }).fill(longName);

    // 4. Fill in the "Description" field with a 1000-character string
    await page.getByRole('textbox', { name: 'Description' }).fill(longDescription);

    // 5. Click the "Continue" button
    await page.getByRole('button', { name: 'Continue' }).click();

    // Verify list is created with long name and displays properly
    await expect(page.getByRole('heading', { name: longName })).toBeVisible();

    // Verify user is redirected to Add/Remove Movies page
    await expect(page.getByRole('textbox', { name: 'Add Item' })).toBeVisible();
  });
});
