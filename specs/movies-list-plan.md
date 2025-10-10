# Movies List Feature - Comprehensive Test Plan

## Application Overview

The Movies List Feature is a core component of the Movies App that allows authenticated users to create, manage, and share custom movie collections. The feature provides comprehensive list management capabilities with the following functionality:

- **List Creation**: Create new movie lists with name, description, and privacy settings
- **List Management**: Edit list details, add/remove movies, select cover images, and delete lists
- **Movie Management**: Search and add movies to lists, remove movies from lists
- **List Viewing**: Display lists with movie posters, ratings, and details
- **List Sharing**: Generate shareable URLs for public lists
- **Image Selection**: Choose cover images from movies in the list
- **Privacy Control**: Toggle lists between public and private visibility
- **Navigation**: Tab-based navigation between different list management views

## Test Scenarios

### 1. Creating New Lists

**Seed:** `tests/logged-in/seed.spec.ts`

#### 1.1 Create List with Valid Details
**Steps:**
1. Click the "User Profile" button in the header
2. Click the "Create New List" link from the dropdown menu
3. Verify the "Create New List" page loads with the form
4. Fill in the "Name" field with "My Action Movies"
5. Fill in the "Description" field with "A collection of my favorite action films"
6. Verify "Public List?" field is set to "Yes" by default
7. Click the "Continue" button

**Expected Results:**
- Form is successfully submitted
- User is redirected to the "Add/Remove Movies" page
- URL contains a unique `listId` parameter
- Page title shows the new list name "My Action Movies"
- The Add Item search field is available and ready for input

#### 1.2 Create Private List
**Steps:**
1. Click the "User Profile" button in the header
2. Click the "Create New List" link
3. Fill in the "Name" field with "My Private Collection"
4. Fill in the "Description" field with "Personal favorite movies"
5. Click the "Public List?" field and change to "No"
6. Click the "Continue" button
7. Navigate to "My Lists" via User Profile menu

**Expected Results:**
- List is created successfully
- List appears in "My Lists" with "(PRIVATE)" label
- List is not publicly accessible

#### 1.3 Create List with Empty Name (Negative Test)
**Steps:**
1. Click the "User Profile" button in the header
2. Click the "Create New List" link
3. Leave the "Name" field empty
4. Fill in the "Description" field with "Test description"
5. Attempt to click the "Continue" button

**Expected Results:**
- Form validation prevents submission
- Error message or visual indicator appears for required Name field
- User remains on the Create New List page

#### 1.4 Create List with Only Name (Minimum Valid Data)
**Steps:**
1. Click the "User Profile" button in the header
2. Click the "Create New List" link
3. Fill in the "Name" field with "Minimal List"
4. Leave "Description" field empty
5. Click the "Continue" button

**Expected Results:**
- List is created successfully with empty description
- User is redirected to Add/Remove Movies page
- List appears in "My Lists" with name but no description

#### 1.5 Create List with Very Long Name and Description (Boundary Test)
**Steps:**
1. Click the "User Profile" button in the header
2. Click the "Create New List" link
3. Fill in the "Name" field with a 200-character string
4. Fill in the "Description" field with a 1000-character string
5. Click the "Continue" button

**Expected Results:**
- If character limits exist, fields should truncate or prevent input beyond limit
- List is created with the allowed maximum length
- Text displays properly without breaking the UI layout

### 2. Adding Movies to Lists

**Seed:** Use `listTest` fixture from `tests/helpers/list-test.ts`

#### 2.1 Add Single Movie by Search
**Steps:**
1. On the list view page, click "Add/Remove Movies" button or link
2. Click in the "Add Item" search field
3. Type "Inside Out 2"
4. Wait for search results to appear
5. Click the movie button matching "Inside Out 2" from the search results

**Expected Results:**
- Movie appears in the list immediately
- Movie is displayed with its title
- Remove button appears next to the movie
- Movie count increases by 1

#### 2.2 Add Multiple Movies Sequentially
**Steps:**
1. Navigate to Add/Remove Movies page using `addMovie` utility
2. Add "Deadpool & Wolverine" using the `addMovie` utility
3. Add "Dune: Part Two" using the `addMovie` utility
4. Add "Kung Fu Panda 4" using the `addMovie` utility

**Expected Results:**
- All three movies appear in the list
- Movies are displayed in the order they were added
- Each movie has a Remove button
- List displays all movies with correct titles

#### 2.3 Add Movie That Already Exists (Duplicate Prevention)
**Steps:**
1. Navigate to Add/Remove Movies page
2. Verify "Twisters" is already in the list (from fixture)
3. Search for "Twisters" in the Add Item field
4. Attempt to click "Twisters" from search results

**Expected Results:**
- System should prevent adding duplicate movie, OR
- If duplicate is added, only one instance should appear in the list
- No duplicate entries visible in the movie list

#### 2.4 Search for Non-Existent Movie
**Steps:**
1. Navigate to Add/Remove Movies page
2. Type "zxqwertyjklmnop12345" in the Add Item field
3. Wait for search results

**Expected Results:**
- No results found message appears, OR
- Search results remain empty
- No error occurs
- User can clear search and try again

#### 2.5 Add Movie and Verify on View List Page
**Steps:**
1. Navigate to Add/Remove Movies page
2. Add "The Fall Guy" using the `addMovie` utility
3. Click "View List" link from navigation
4. Scroll through the movie posters

**Expected Results:**
- "The Fall Guy" appears in the View List page
- Movie displays with poster image
- Movie displays with title
- Movie displays with rating stars
- Movie poster is clickable and links to movie details

### 3. Removing Movies from Lists

**Seed:** Use `listTest` fixture from `tests/helpers/list-test.ts`

#### 3.1 Remove Single Movie
**Steps:**
1. Navigate to Add/Remove Movies page
2. Verify list contains "The Garfield Movie" (from fixture)
3. Locate the "The Garfield Movie" list item
4. Click the "Remove" button for "The Garfield Movie"

**Expected Results:**
- Movie is immediately removed from the list
- Movie no longer appears in the list
- Remaining movies shift position appropriately
- Movie count decreases by 1

#### 3.2 Remove All Movies from List
**Steps:**
1. Navigate to Add/Remove Movies page
2. Note the total number of movies in the list
3. Click "Remove" button for each movie sequentially until list is empty
4. Verify the list is empty

**Expected Results:**
- All movies are successfully removed
- List displays as empty (no movie items remain)
- Add Item search field is still available
- No errors occur when removing the last movie

#### 3.3 Remove Movie and Verify on View List Page
**Steps:**
1. Navigate to Add/Remove Movies page
2. Remove "Bad Boys: Ride or Die"
3. Navigate to "View List" via the navigation tabs
4. Scroll through the displayed movies

**Expected Results:**
- "Bad Boys: Ride or Die" no longer appears in View List
- Only remaining movies are displayed with posters
- Page layout adjusts correctly for reduced movie count

#### 3.4 Remove and Re-add Same Movie
**Steps:**
1. Navigate to Add/Remove Movies page
2. Remove "Twisters"
3. Verify "Twisters" is no longer in the list
4. Search for and add "Twisters" again using the `addMovie` utility

**Expected Results:**
- Movie is successfully removed
- Movie is successfully re-added
- Movie appears at the end of the list (or in appropriate position)
- No duplicate entries exist

### 4. Editing List Details

**Seed:** Use `listTest` fixture from `tests/helpers/list-test.ts`

#### 4.1 Edit List Name
**Steps:**
1. From the list view page, click the "Edit" button/link
2. Clear the "Name" field
3. Type "My Updated Action Movies"
4. Click the "Save" button
5. Verify the updated name appears in the main heading
6. Click "View List" to navigate back

**Expected Results:**
- Name is successfully updated
- Main heading displays "My Updated Action Movies"
- Name persists after clicking Save
- Updated name appears on View List page
- Updated name appears in "My Lists" overview

#### 4.2 Edit List Description
**Steps:**
1. From the list view page, click the "Edit" button/link
2. Clear the "Description" field
3. Type "An updated collection of thrilling action films"
4. Click the "Save" button
5. Verify the description is updated
6. Click "View List" to navigate back

**Expected Results:**
- Description is successfully updated
- Description displays correctly under the heading
- Description persists after saving
- Updated description appears on View List page

#### 4.3 Edit List Name and Description Together
**Steps:**
1. Click the "Edit" button from the list view
2. Update "Name" field to "Top Sci-Fi Films"
3. Update "Description" field to "Best science fiction movies of all time"
4. Click the "Save" button
5. Verify both fields are updated
6. Navigate to "View List"

**Expected Results:**
- Both name and description are updated simultaneously
- Changes persist after save
- Updated values display on Edit page and View List page
- No data loss occurs during update

#### 4.4 Change List Privacy Setting
**Steps:**
1. Click the "Edit" button from the list view
2. Click the "Public List?" field
3. Change from "Yes" to "No"
4. Click the "Save" button
5. Navigate to "My Lists" via User Profile menu

**Expected Results:**
- Privacy setting is successfully updated
- List label changes from "(PUBLIC)" to "(PRIVATE)"
- Setting persists after save
- List becomes private and not publicly accessible

#### 4.5 Edit List with Empty Name (Negative Test)
**Steps:**
1. Click the "Edit" button from the list view
2. Clear the "Name" field completely
3. Leave "Description" as is
4. Attempt to click the "Save" button

**Expected Results:**
- Form validation prevents saving
- Error message appears indicating Name is required
- Original name remains unchanged
- User can enter valid name and retry

#### 4.6 Cancel Edit Without Saving
**Steps:**
1. Click the "Edit" button from the list view
2. Note the current name and description
3. Change the "Name" field to "Test Name Change"
4. Change the "Description" field to "Test Description Change"
5. Click "View List" link without clicking Save
6. Return to Edit page

**Expected Results:**
- Changes are not saved
- Original name and description remain unchanged
- Navigating away without saving discards changes
- No unintended updates occur

### 5. Selecting List Cover Images

**Seed:** Use `listTest` fixture from `tests/helpers/list-test.ts`

#### 5.1 Select Cover Image from Movie
**Steps:**
1. From the list view page, click "Choose Image" link
2. Verify all movies in the list are displayed with scenery images
3. Hover over the first movie (Twisters)
4. Click the "SELECT" button when it appears
5. Verify the button text changes to "SELECTED"
6. Navigate to "My Lists" via User Profile menu

**Expected Results:**
- Image selection page displays all movies with backdrop images
- Hover reveals the SELECT button
- Selection is confirmed with "SELECTED" state
- Selected image becomes the list cover image
- Cover image displays on "My Lists" overview page

#### 5.2 Change Cover Image Selection
**Steps:**
1. Navigate to "Choose Image" page
2. Verify one movie is already selected (marked "SELECTING" or "SELECTED")
3. Hover over a different movie
4. Click "SELECT" for the new movie
5. Navigate to "My Lists" via User Profile menu

**Expected Results:**
- Previous selection is deselected
- New selection is confirmed
- Only one movie can be selected at a time
- Cover image updates to the newly selected movie
- Updated cover displays in "My Lists"

#### 5.3 Select Image for List Without Movies
**Steps:**
1. Create a new list using the `createList` utility
2. Do not add any movies to the list
3. Click "Choose Image" link

**Expected Results:**
- Choose Image page displays with no movies available
- Appropriate message or empty state is shown
- No errors occur
- User can navigate back to add movies first

#### 5.4 Select Image and Verify on View List
**Steps:**
1. Navigate to "Choose Image" page
2. Select an image from "Bad Boys: Ride or Die"
3. Click "View List" link
4. Observe if selected image affects the view

**Expected Results:**
- Image selection persists
- View List page displays correctly
- List functionality remains unaffected by image selection

### 6. Viewing Movie Lists

**Seed:** Use `listTest` fixture from `tests/helpers/list-test.ts`

#### 6.1 View List with Multiple Movies
**Steps:**
1. Navigate to the list view page (fixture provides pre-populated list)
2. Observe the list display
3. Verify each movie shows a poster
4. Verify each movie shows a title
5. Verify each movie shows a rating (stars)

**Expected Results:**
- All movies display in a grid/list layout
- Each movie shows its poster image
- Each movie shows its title as a heading
- Each movie shows a 5-star rating visualization
- All movie elements are properly aligned and styled

#### 6.2 View List with No Movies
**Steps:**
1. Create a new list using the `createList` utility
2. Click "View List" from the navigation
3. Observe the empty list state

**Expected Results:**
- Empty state message or visualization appears
- No movie items are displayed
- Navigation and controls remain accessible
- User can navigate to "Add/Remove Movies" to populate list

#### 6.3 Click Movie Poster to View Details
**Steps:**
1. From the list view page with movies
2. Click on the poster for "Twisters"
3. Verify navigation occurs

**Expected Results:**
- User is navigated to the movie details page
- URL changes to `/movie?id=718821&page=1`
- Movie details page loads successfully
- User can navigate back to the list

#### 6.4 Verify Rating Display
**Steps:**
1. From the list view page
2. Locate each movie's rating section
3. Count the number of stars for each movie
4. Verify star visualization matches expected rating

**Expected Results:**
- Each movie displays a rating with star icons
- Stars are filled/unfilled based on rating value
- Rating is visually clear and easy to understand
- Rating display is consistent across all movies

#### 6.5 View List on Different Screen Sizes (Responsive Design)
**Steps:**
1. Load the list view page
2. Resize browser to mobile width (375px)
3. Observe layout and scroll behavior
4. Resize browser to tablet width (768px)
5. Observe layout adjustment
6. Resize to desktop width (1440px)
7. Observe final layout

**Expected Results:**
- Layout adapts appropriately to each screen size
- Movie posters remain visible and properly sized
- Text remains readable at all sizes
- Navigation remains accessible
- No horizontal scrolling required

### 7. Sharing Movie Lists

**Seed:** Use `listTest` fixture from `tests/helpers/list-test.ts`

#### 7.1 Open Share Dialog
**Steps:**
1. From the list view page, click the "Share" button
2. Observe the dialog that appears

**Expected Results:**
- Share dialog opens with modal overlay
- Dialog displays heading "Share my favorite movies"
- Dialog contains a URL textbox
- URL is pre-populated with the list URL
- URL is in the format: `http://localhost:3000/list?id=[listId]&page=1`

#### 7.2 Copy Share URL
**Steps:**
1. Click the "Share" button to open dialog
2. Click in the URL textbox
3. Select all text (Cmd+A or Ctrl+A)
4. Copy the URL (Cmd+C or Ctrl+C)
5. Paste URL into a new browser tab/window
6. Navigate to the pasted URL

**Expected Results:**
- URL is successfully copied
- Pasted URL navigates to the same list
- List displays correctly when accessed via shared URL
- All movies and details are visible

#### 7.3 Close Share Dialog by Clicking Outside
**Steps:**
1. Click the "Share" button to open dialog
2. Click on the page area outside the dialog (e.g., top-left corner of page)

**Expected Results:**
- Dialog closes
- User returns to list view
- No functionality is affected
- Dialog can be reopened by clicking Share again

#### 7.4 Share Private List (Edge Case)
**Steps:**
1. Create a new list with privacy set to "No" (Private)
2. Add a movie to the list using the `addMovie` utility
3. Navigate to View List
4. Click the "Share" button
5. Note the URL provided

**Expected Results:**
- Share dialog opens (or button is disabled if private lists cannot be shared)
- If URL is provided, accessing it without authentication should show access denied
- Private lists should maintain privacy restrictions

#### 7.5 Verify Share URL Persistence
**Steps:**
1. Click "Share" button and copy the URL
2. Close the share dialog
3. Navigate away from the list (go to home page)
4. Paste the copied URL in the address bar
5. Navigate to the URL

**Expected Results:**
- URL remains valid after navigation
- List loads correctly from the shared URL
- All list content is preserved
- URL parameters are correctly maintained

### 8. Deleting Movie Lists

**Seed:** Use `listTest` fixture from `tests/helpers/list-test.ts`

#### 8.1 Delete List with Confirmation
**Steps:**
1. From the list view page, click "Edit" button
2. Click "Delete List" link from the navigation
3. Verify the Delete List page loads
4. Read the confirmation message
5. Click the "Delete" button
6. Click "Yes" to confirm deletion
7. Verify redirection to "My Lists" page

**Expected Results:**
- Delete confirmation page displays warning message
- Message states: "Click the button below if you are sure you want to delete this list"
- After clicking Delete and confirming with Yes, list is deleted
- User is redirected to "My Lists" page
- List no longer appears in "My Lists"
- Message displays "no lists" if no lists remain

#### 8.2 Navigate to Delete Page and Cancel
**Steps:**
1. From the list view page, click "Edit" button
2. Click "Delete List" link
3. Observe the Delete List page
4. Click "View List" to navigate away without deleting
5. Verify list still exists

**Expected Results:**
- Delete page is displayed
- User can navigate away without deleting
- List remains unchanged
- List still appears in "My Lists"

#### 8.3 Delete List with Movies
**Steps:**
1. Verify the list contains movies (fixture provides 3 movies)
2. Navigate to Delete List page via Edit > Delete List
3. Click the "Delete" button
4. Click "Yes" to confirm
5. Verify list and all its movies are deleted

**Expected Results:**
- List is completely deleted
- All movies associated with the list are removed from the list
- Movies still exist in the database (only removed from this list)
- User sees "no lists" message if this was the only list

#### 8.4 Delete Multiple Lists
**Steps:**
1. Create three lists using the `createList` utility
2. Add movies to each list using the `addMovie` utility
3. Navigate to "My Lists" and verify all three lists appear
4. Delete the first list
5. Verify it's removed from "My Lists"
6. Delete the second list
7. Verify it's removed from "My Lists"
8. Delete the third list
9. Verify "no lists" message appears

**Expected Results:**
- Each list is successfully deleted
- "My Lists" updates after each deletion
- After deleting all lists, "no lists" message displays
- No errors occur during multiple deletions

### 9. Navigation and User Experience

**Seed:** Use `listTest` fixture from `tests/helpers/list-test.ts`

#### 9.1 Navigate Between List Management Tabs
**Steps:**
1. From the list view page, observe the navigation tabs
2. Click "Edit List" tab
3. Verify Edit page loads
4. Click "View List" tab
5. Verify View List page loads
6. Click "Add/Remove Movies" tab
7. Verify Add/Remove page loads
8. Click "Choose Image" tab
9. Verify Choose Image page loads
10. Click "Delete List" tab
11. Verify Delete page loads

**Expected Results:**
- All navigation tabs are clearly visible
- Each tab navigates to the correct page
- Active tab is visually indicated
- Page content updates correctly for each tab
- No navigation errors occur

#### 9.2 Use Browser Back Button
**Steps:**
1. From the list view page, click "Add/Remove Movies"
2. Add a movie using the `addMovie` utility
3. Click browser back button
4. Verify previous page loads
5. Click browser forward button
6. Verify forward navigation works

**Expected Results:**
- Browser back button returns to previous page
- Browser forward button advances to next page
- Page state is preserved correctly
- No errors occur during browser navigation
- Added movie persists when navigating back and forth

#### 9.3 Access List via User Profile Menu
**Steps:**
1. From any page in the application, click "User Profile" button
2. Verify dropdown menu appears
3. Observe "Create New List" and "My Lists" options
4. Click "My Lists"
5. Verify "My Lists" page loads
6. Click a list to view it
7. Click "User Profile" again
8. Click "Create New List"
9. Verify "Create New List" page loads

**Expected Results:**
- User Profile menu is accessible from all pages
- Dropdown displays with list management options
- All menu options navigate correctly
- Menu provides quick access to list features

#### 9.4 Verify Breadcrumb or Page Title Updates
**Steps:**
1. Create a list named "Navigation Test" using the `createList` utility
2. Observe the page title in the browser tab and main heading
3. Navigate to "Add/Remove Movies"
4. Verify page title/heading updates
5. Navigate to "Edit List"
6. Verify page title/heading updates
7. Navigate to "Choose Image"
8. Verify page title/heading updates

**Expected Results:**
- Page title in browser tab matches current page
- Main heading displays list name on all pages
- Sub-heading indicates current action (Edit, View, etc.)
- Page titles update correctly during navigation
- Titles provide clear context about current location

### 10. "My Lists" Overview Page

**Seed:** Use `listTest` fixture from `tests/helpers/list-test.ts`

#### 10.1 View All Lists
**Steps:**
1. Create three lists using the `createList` utility with different names
2. Add movies to each list using the `addMovie` utility
3. Select cover images for each list using the `addImageToList` utility
4. Navigate to "My Lists" via User Profile menu
5. Observe all lists displayed

**Expected Results:**
- All created lists appear on "My Lists" page
- Each list displays its cover image (if selected)
- Each list displays its name as a heading
- Each list displays movie count
- Each list displays privacy status (PUBLIC or PRIVATE)

#### 10.2 View List with Cover Image
**Steps:**
1. Navigate to "My Lists" page
2. Locate a list with a cover image (fixture provides one)
3. Verify the cover image displays correctly
4. Verify image is from a movie in the list

**Expected Results:**
- Cover image displays prominently on the list card
- Image is clear and properly sized
- Image represents a movie from the list
- Image loads without errors

#### 10.3 View List Without Cover Image
**Steps:**
1. Create a new list using the `createList` utility
2. Add movies but do not select a cover image
3. Navigate to "My Lists"
4. Observe the list without a cover image

**Expected Results:**
- List appears without cover image
- Default placeholder or movie poster is shown, OR
- List displays with text-only representation
- Layout remains consistent with other lists

#### 10.4 Click List to View Details
**Steps:**
1. Navigate to "My Lists" page
2. Click on "my favorite movies" list card
3. Verify navigation to list view page

**Expected Results:**
- Clicking list navigates to its View List page
- Correct list loads with all its movies
- URL includes the correct listId parameter
- All list details and movies display correctly

#### 10.5 Verify List Count Information
**Steps:**
1. Navigate to "My Lists" page
2. For each list, locate the movie count indicator
3. Verify the count matches the actual number of movies

**Expected Results:**
- Movie count is displayed for each list
- Count is accurate (matches actual number of movies)
- Count updates when movies are added/removed
- Count displays with appropriate label (e.g., "3 movies")

### 11. Error Handling and Edge Cases

**Seed:** `tests/logged-in/seed.spec.ts`

#### 11.1 Access Non-Existent List
**Steps:**
1. Manually navigate to URL: `http://localhost:3000/list?id=invalid-id&page=1`
2. Observe the response

**Expected Results:**
- Error page displays, OR
- User is redirected to "My Lists" page
- Appropriate error message is shown
- No application crash occurs

#### 11.2 Access List Without Authentication
**Steps:**
1. Logout using the Logout button in User Profile menu
2. Attempt to navigate to a list URL directly
3. Observe the behavior

**Expected Results:**
- User is redirected to login page
- List is not accessible without authentication
- After login, user can access lists normally

#### 11.3 Create List with Special Characters
**Steps:**
1. Navigate to "Create New List" page
2. Enter name with special characters: `My List! @#$%^&*()`
3. Enter description with special characters: `Description with "quotes" & <brackets>`
4. Click "Continue"
5. Verify list is created

**Expected Results:**
- Special characters are properly handled
- Name and description display correctly with special characters
- No XSS vulnerabilities (HTML is escaped)
- Characters don't break the layout

#### 11.4 Add Movie with Very Long Title
**Steps:**
1. Navigate to Add/Remove Movies page
2. Search for a movie with a very long title
3. Add the movie to the list
4. Navigate to View List
5. Observe how the long title is displayed

**Expected Results:**
- Long title is truncated with ellipsis, OR
- Long title wraps to multiple lines
- Layout remains intact
- Title remains readable

#### 11.5 Rapid Navigation Between Pages
**Steps:**
1. From list view page, rapidly click through all navigation tabs
2. Click Edit List, then immediately View List
3. Click Add/Remove Movies, then immediately Choose Image
4. Click View List, then immediately Edit List
5. Verify no errors occur

**Expected Results:**
- All navigation completes without errors
- Pages load correctly despite rapid switching
- No race conditions or loading issues
- Application remains stable

#### 11.6 Network Interruption During Movie Search
**Steps:**
1. Navigate to Add/Remove Movies page
2. Begin typing a movie name in the search field
3. Simulate network interruption (disconnect WiFi or use DevTools)
4. Observe the behavior

**Expected Results:**
- Appropriate error message displays
- Search fails gracefully
- Application doesn't crash
- User can retry after network is restored

#### 11.7 Concurrent List Editing (Multiple Tabs)
**Steps:**
1. Open a list in two browser tabs
2. In Tab 1: Edit the list name to "Version A"
3. In Tab 2: Edit the list name to "Version B"
4. Save changes in Tab 1
5. Save changes in Tab 2
6. Refresh both tabs and verify final state

**Expected Results:**
- Last saved version (Version B) persists
- No data corruption occurs
- Both tabs eventually show the same state after refresh
- No errors are thrown

### 12. Integration with Search Functionality

**Seed:** Use `listTest` fixture from `tests/helpers/list-test.ts`

#### 12.1 Search for Movie in Add Item Field
**Steps:**
1. Navigate to Add/Remove Movies page
2. Click in the "Add Item" search field
3. Type "Spider"
4. Wait for autocomplete/search results to appear
5. Observe the results

**Expected Results:**
- Search results appear as dropdown or suggestions
- Results include movies with "Spider" in the title
- Results display with movie titles and relevant info
- Search is responsive and fast

#### 12.2 Search with Partial Movie Name
**Steps:**
1. Navigate to Add/Remove Movies page
2. Type "Twi" in the search field
3. Verify "Twisters" appears in results
4. Type more characters: "Twist"
5. Verify results update

**Expected Results:**
- Partial search works correctly
- Results update as user types
- Relevant movies appear in results
- Search is case-insensitive

#### 12.3 Clear Search and Search Again
**Steps:**
1. Navigate to Add/Remove Movies page
2. Search for "Deadpool"
3. Clear the search field
4. Search for "Avengers"
5. Verify new results appear

**Expected Results:**
- Search field can be cleared
- Previous results are removed
- New search returns fresh results
- No interference between searches

### 13. Persistence and Data Integrity

**Seed:** Use `listTest` fixture from `tests/helpers/list-test.ts`

#### 13.1 Verify List Persists After Logout/Login
**Steps:**
1. Create a list using the `createList` utility
2. Add movies using the `addMovie` utility
3. Note the list details
4. Click "User Profile" and select "Logout"
5. Log back in using the login flow
6. Navigate to "My Lists"
7. Verify the list still exists with all data intact

**Expected Results:**
- List persists after logout
- All list details are preserved (name, description, movies)
- List is accessible after logging back in
- No data loss occurs

#### 13.2 Verify Movie Order is Maintained
**Steps:**
1. Navigate to Add/Remove Movies page
2. Add movies in specific order: "Movie A", "Movie B", "Movie C"
3. Navigate to View List
4. Verify order matches
5. Navigate back to "My Lists" and re-open the list
6. Verify order is still maintained

**Expected Results:**
- Movies maintain their order
- Order persists across navigation
- Order persists across sessions
- No unexpected reordering occurs

#### 13.3 Edit List and Verify Changes Persist
**Steps:**
1. Edit list name from "Old Name" to "New Name"
2. Navigate to another page (e.g., home)
3. Return to "My Lists"
4. Open the list
5. Verify name is still "New Name"

**Expected Results:**
- Changes persist after navigation
- Changes persist after closing and reopening list
- No data reversion occurs
- All edits are saved correctly

## Summary

This comprehensive test plan covers all major functionality of the Movies List feature, including:

- **13 test categories** covering the full feature set
- **60+ individual test scenarios** including happy paths, edge cases, and negative tests
- **Reusable utilities** from `list-utilities.ts` for common operations like `createList()`, `addMovie()`, `openLists()`, `addImageToList()`, and `navigateToMovieList()`
- **Test fixtures** using `listTest` fixture for pre-populated test data
- **Comprehensive coverage** of user flows, error handling, and data integrity

Each scenario is designed to be independent and can be executed in any order, assuming a fresh/blank state or using the specified seed file/fixture. The test plan is structured to enable efficient test automation using Playwright while ensuring thorough coverage of all user-facing functionality and potential edge cases.
