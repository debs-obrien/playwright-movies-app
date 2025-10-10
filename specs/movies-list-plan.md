# Movies List Feature - Comprehensive Test Plan

## Application Overview

The Movies List feature is a comprehensive list management system within the Playwright Movies App that allows authenticated users to create, manage, and share custom movie collections. The application integrates with TMDB (The Movie Database) to provide movie data and imagery. Key features include:

- **List Creation**: Create new movie lists with name, description, and privacy settings
- **List Management**: Edit list details, add/remove movies, and choose custom list images
- **List Viewing**: View all user lists and individual list contents with movie posters and ratings
- **Sharing**: Share public lists via URL
- **Navigation**: Intuitive navigation between list management functions
- **Privacy Controls**: Toggle between public and private list visibility

## Test Scenarios

### 1. Creating a New Movie List

**Seed:** `tests/logged-in/seed.spec.ts`

#### 1.1 Create List with Valid Details
**Steps:**
1. Click on the "User Profile" button in the header
2. Click on "Create New List" link from the dropdown menu
3. In the "Name" textbox, enter "My Action Movies"
4. In the "Description" textbox, enter "Collection of my favorite action films"
5. Verify "Public List?" field shows "Yes" (default)
6. Click "Continue" button

**Expected Results:**
- User is redirected to the Add/Remove Movies page for the newly created list
- URL contains a `listId` parameter
- Page heading shows "My Action Movies"
- Page subheading shows "Edit"

#### 1.2 Create List with Private Setting
**Steps:**
1. Click on the "User Profile" button
2. Click on "Create New List" link
3. Enter "My Private Collection" in the "Name" field
4. Enter "Movies I don't want to share" in the "Description" field
5. Click on the "Public List?" field and select "No"
6. Click "Continue" button

**Expected Results:**
- List is created successfully
- List privacy is set to private
- User is redirected to Add/Remove Movies page

#### 1.3 Create List with Empty Name (Negative Test)
**Steps:**
1. Navigate to Create New List page
2. Leave the "Name" field empty
3. Enter "Some description" in the "Description" field
4. Click "Continue" button

**Expected Results:**
- Validation error is displayed
- User remains on Create New List page
- List is not created

#### 1.4 Create List with Only Name
**Steps:**
1. Navigate to Create New List page
2. Enter "Minimal List" in the "Name" field
3. Leave the "Description" field empty
4. Click "Continue" button

**Expected Results:**
- List is created successfully (description is optional)
- User is redirected to Add/Remove Movies page

### 2. Adding Movies to a List

**Seed:** `tests/logged-in/seed.spec.ts`

**Prerequisite:** Create a list named "Summer Blockbusters" with description "Best summer movies"

#### 2.1 Add Single Movie to List
**Steps:**
1. From the Add/Remove Movies page, click in the "Add Item" search textbox
2. Type "Twisters"
3. Click on the "Twisters" button from the search results

**Expected Results:**
- Movie appears in the movies list below the search box
- Movie name "Twisters" is displayed
- Remove button appears next to the movie name
- Search field is cleared

**Utility Usage:** `addMovie(page, 'Twisters')`

#### 2.2 Add Multiple Movies to List
**Steps:**
1. Add "Twisters" using the search and select
2. Add "The Garfield Movie" using the search and select
3. Add "Bad Boys: Ride or Die" using the search and select

**Expected Results:**
- All three movies appear in the list
- Movies are displayed in order of addition
- Each movie has a Remove button

**Utility Usage:** Multiple calls to `addMovie()`

#### 2.3 Search for Non-Existent Movie (Negative Test)
**Steps:**
1. In the "Add Item" search box, type "MovieThatDoesNotExist12345"
2. Wait for search results

**Expected Results:**
- No results are displayed
- No buttons appear to select
- Search field retains the typed text

#### 2.4 Add Movie with Partial Name
**Steps:**
1. In the "Add Item" search box, type "Garfield"
2. Select "The Garfield Movie" from results

**Expected Results:**
- Movie is added successfully
- Full movie name is displayed in the list

### 3. Removing Movies from a List

**Seed:** `tests/logged-in/seed.spec.ts`

**Prerequisite:** Create a list with three movies: "Twisters", "The Garfield Movie", "Bad Boys: Ride or Die"

#### 3.1 Remove Single Movie
**Steps:**
1. Navigate to Add/Remove Movies page for the list
2. Locate "The Garfield Movie" in the movies list
3. Click the "Remove" button next to "The Garfield Movie"

**Expected Results:**
- "The Garfield Movie" is removed from the list
- Only "Twisters" and "Bad Boys: Ride or Die" remain
- No error messages are displayed

#### 3.2 Remove All Movies
**Steps:**
1. Navigate to Add/Remove Movies page for the list
2. Click "Remove" button for each movie in the list

**Expected Results:**
- All movies are removed
- Movies list is empty
- Page remains functional for adding new movies

#### 3.3 Remove and Re-add Same Movie
**Steps:**
1. Remove "Twisters" from the list
2. Search for "Twisters" and add it back

**Expected Results:**
- Movie is removed successfully
- Movie can be re-added without errors
- Movie appears in the list again

### 4. Editing List Details

**Seed:** `tests/logged-in/seed.spec.ts`

**Prerequisite:** Create a list named "Original Name" with description "Original description"

#### 4.1 Edit List Name
**Steps:**
1. Navigate to the list view page
2. Click on "Edit" link/button
3. Clear the "Name" field
4. Enter "Updated List Name"
5. Click "Save" button

**Expected Results:**
- List name is updated successfully
- Page heading reflects new name
- User is redirected back to list view or remains on edit page with success message

#### 4.2 Edit List Description
**Steps:**
1. Navigate to Edit List page
2. Clear the "Description" field
3. Enter "This is my updated description with more details"
4. Click "Save" button

**Expected Results:**
- Description is updated successfully
- New description is visible on the list page

#### 4.3 Change Privacy Setting from Public to Private
**Steps:**
1. Navigate to Edit List page
2. Verify "Public List?" shows "Yes"
3. Click on "Public List?" field and select "No"
4. Click "Save" button

**Expected Results:**
- Privacy setting is updated to private
- List is no longer publicly accessible (if tested with public URL)

#### 4.4 Change Privacy Setting from Private to Public
**Steps:**
1. Navigate to Edit List page for a private list
2. Click on "Public List?" field and select "Yes"
3. Click "Save" button

**Expected Results:**
- Privacy setting is updated to public
- List becomes shareable via public URL

#### 4.5 Edit Without Making Changes
**Steps:**
1. Navigate to Edit List page
2. Don't modify any fields
3. Click "Save" button

**Expected Results:**
- No errors occur
- User is redirected appropriately
- List details remain unchanged

### 5. Choosing a List Image

**Seed:** `tests/logged-in/seed.spec.ts`

**Prerequisite:** Create a list with at least one movie added (e.g., "Twisters")

#### 5.1 Select Image from Available Movies
**Steps:**
1. Navigate to the list view page
2. Click on "Choose Image" link from the navigation
3. Hover over a movie backdrop image (e.g., "Twisters")
4. Click the "SELECT" button that appears

**Expected Results:**
- Button text changes to "SELECTED"
- Image is set as the list cover image

**Utility Usage:** `addImageToList(page, 'Twisters')`

#### 5.2 Change Selected Image
**Steps:**
1. Select "Twisters" as the list image
2. Click on "Choose Image" again
3. Select "The Garfield Movie" instead

**Expected Results:**
- Previous selection is deselected
- New image becomes the list cover
- List thumbnail on "My Lists" page shows new image

#### 5.3 View List After Image Selection
**Steps:**
1. After selecting an image, navigate back to "My Lists"
2. Verify the list thumbnail displays the selected image

**Expected Results:**
- List card displays selected movie backdrop
- Image is clearly visible and properly sized
- List name and description are still visible

#### 5.4 Choose Image with No Movies in List (Edge Case)
**Steps:**
1. Create a new list without adding any movies
2. Navigate to Choose Image page

**Expected Results:**
- Page displays appropriate message (empty state)
- Or no images are available to select
- User can navigate back to add movies first

### 6. Viewing Lists

**Seed:** `tests/logged-in/seed.spec.ts`

**Prerequisite:** Create a list with three movies added and an image selected

#### 6.1 View List from My Lists Page
**Steps:**
1. Click on "User Profile" button
2. Click on "My Lists" link
3. Verify list appears with thumbnail and details
4. Click on the list card

**Expected Results:**
- "My Lists" page displays all user-created lists
- Each list shows thumbnail, name, and privacy status (PUBLIC/PRIVATE)
- Clicking list navigates to list view page

**Utility Usage:** `openLists(page, 'My Lists')` and `navigateToMovieList(page, 'list name')`

#### 6.2 View Individual List Details
**Steps:**
1. Navigate to a specific list view page
2. Verify all page elements are present

**Expected Results:**
- List name is displayed as h1 heading
- List description is displayed as h2 heading
- All added movies are displayed with:
  - Movie poster images
  - Movie titles
  - Star ratings
- Navigation buttons are visible (Edit, Share, Add/Remove Movies, Create New List)

#### 6.3 View Empty List
**Steps:**
1. Create a new list without adding movies
2. Navigate to View List page

**Expected Results:**
- Page displays list name and description
- No movies are shown (empty state)
- Navigation options remain available
- User can click "Add/Remove Movies" to add content

#### 6.4 Navigate Between List Pages
**Steps:**
1. From list view page, click "Edit List"
2. From edit page, click "View List"
3. From view page, click "Add/Remove Movies"
4. From add/remove page, click "Choose Image"
5. From choose image page, click "View List"

**Expected Results:**
- All navigation links work correctly
- Context is preserved (same list throughout)
- No errors occur during navigation
- URL updates appropriately for each page

### 7. Sharing Lists

**Seed:** `tests/logged-in/seed.spec.ts`

**Prerequisite:** Create a public list with movies

#### 7.1 Open Share Dialog
**Steps:**
1. Navigate to list view page
2. Click "Share" button

**Expected Results:**
- Share dialog appears
- Dialog heading shows "Share [list name]"
- URL textbox displays the full list URL
- URL includes list ID parameter

#### 7.2 Copy Share URL
**Steps:**
1. Click "Share" button to open dialog
2. Click on the URL textbox to select text
3. Copy the URL (Cmd+C / Ctrl+C)

**Expected Results:**
- URL is selected in the textbox
- URL can be copied to clipboard
- URL format is correct (http://localhost:3000/list?id=[listId]&page=1)

#### 7.3 Close Share Dialog
**Steps:**
1. Open share dialog
2. Click outside the dialog on the backdrop

**Expected Results:**
- Dialog closes
- User returns to list view page
- No errors occur

#### 7.4 Share Private List
**Steps:**
1. Create or edit a list to be private
2. Attempt to view share functionality

**Expected Results:**
- Share button may not be available for private lists
- Or share dialog shows warning about privacy
- URL access should respect privacy settings (requires authentication testing)

### 8. Deleting Lists

**Seed:** `tests/logged-in/seed.spec.ts`

**Prerequisite:** Create a list that can be deleted

#### 8.1 Delete List with Confirmation
**Steps:**
1. Navigate to list view page
2. Click "Edit" link from navigation
3. Click "Delete List" link from the navigation tabs
4. Read the confirmation message
5. Click "Delete" button

**Expected Results:**
- User is navigated to delete confirmation page
- Warning message is displayed
- After clicking Delete button:
  - List is permanently deleted
  - User is redirected to My Lists or home page
  - List no longer appears in My Lists

#### 8.2 Navigate Away from Delete Page Without Deleting
**Steps:**
1. Navigate to Delete List page
2. Click "View List" or "Edit List" link instead of Delete button

**Expected Results:**
- User navigates away without deleting
- List is preserved
- No changes are made to the list

#### 8.3 Delete List with Movies
**Steps:**
1. Create list with multiple movies and custom image
2. Navigate to Delete List page
3. Click "Delete" button

**Expected Results:**
- Entire list is deleted including all associations
- Movies remain in TMDB database (only list association is removed)
- No orphaned data remains

#### 8.4 Attempt to Access Deleted List
**Steps:**
1. Delete a list and note its list ID from URL
2. Attempt to navigate directly to the list URL using the ID

**Expected Results:**
- Error page or "List not found" message is displayed
- User is redirected to appropriate page
- No server errors occur

### 9. Navigation and User Flow

**Seed:** `tests/logged-in/seed.spec.ts`

#### 9.1 Complete List Creation Flow
**Steps:**
1. Navigate to Create New List page
2. Create a new list
3. Add three movies
4. Choose an image
5. View the list
6. Share the list
7. Edit list details
8. View from My Lists page

**Expected Results:**
- All steps complete without errors
- Data persists across navigation
- All features work cohesively

**Utility Usage:** `createList()`, `addMovie()`, `addImageToList()`, `openLists()`, `navigateToMovieList()`

#### 9.2 Access My Lists from Different Pages
**Steps:**
1. From home page, click User Profile → My Lists
2. From a movie detail page, click User Profile → My Lists
3. From search page, click User Profile → My Lists

**Expected Results:**
- My Lists is accessible from any page
- All lists are displayed correctly regardless of previous page
- Navigation is consistent

#### 9.3 User Profile Menu Interaction
**Steps:**
1. Click "User Profile" button
2. Verify menu items are displayed
3. Click "User Profile" button again

**Expected Results:**
- First click opens the menu showing:
  - Create New List
  - My Lists
  - Logout
- Second click closes the menu
- Menu is properly positioned

### 10. Edge Cases and Error Handling

**Seed:** `tests/logged-in/seed.spec.ts`

#### 10.1 List with Special Characters in Name
**Steps:**
1. Create a list with name "My Movie's & Show's: 2024! (Updated)"
2. Add movies and view the list

**Expected Results:**
- List is created successfully
- Special characters are displayed correctly
- No encoding issues in URLs or display

#### 10.2 List with Very Long Name and Description
**Steps:**
1. Create a list with a name of 200+ characters
2. Create a list with a description of 1000+ characters
3. View the list

**Expected Results:**
- System handles long text gracefully
- Text is truncated or wrapped appropriately in UI
- No layout breaking occurs
- Full text is preserved in edit view

#### 10.3 Rapidly Add/Remove Movies
**Steps:**
1. Quickly add 5 movies in succession
2. Immediately remove 3 of them
3. Add 2 more movies

**Expected Results:**
- All operations complete successfully
- No race conditions or duplicate entries
- Final state is accurate

#### 10.4 Multiple Browser Tabs with Same List
**Steps:**
1. Open list in two browser tabs
2. Edit list name in tab 1
3. Edit list name in tab 2 to different value
4. Save both

**Expected Results:**
- Last save wins (or appropriate conflict resolution)
- No data corruption occurs
- User sees consistent state after refresh

#### 10.5 Navigate Away During List Creation
**Steps:**
1. Start creating a new list
2. Fill in name and description
3. Navigate away without clicking Continue (e.g., click logo to go home)
4. Return to Create New List page

**Expected Results:**
- Unsaved data is lost (expected behavior for forms without auto-save)
- Form is cleared
- No partial list is created

#### 10.6 List Operations While Logged Out
**Steps:**
1. Create a list while logged in
2. Simulate session timeout or logout
3. Attempt to edit the list

**Expected Results:**
- User is redirected to login page
- Authentication is properly enforced
- After re-login, user can access their lists

### 11. Visual and Accessibility Testing

**Seed:** `tests/logged-in/seed.spec.ts`

#### 11.1 Dark Mode Toggle
**Steps:**
1. View a list in light mode
2. Toggle to dark mode using the theme switch
3. Verify all list elements

**Expected Results:**
- All text remains readable
- Contrast ratios meet accessibility standards
- Images and buttons display correctly
- Theme preference persists across page navigation

#### 11.2 Responsive Design - Mobile View
**Steps:**
1. Resize browser to mobile dimensions (375px width)
2. Navigate through all list pages
3. Verify all functionality

**Expected Results:**
- Layout adapts to mobile screen
- All buttons remain accessible and tappable
- Navigation menu becomes mobile-friendly
- Images scale appropriately

#### 11.3 Keyboard Navigation
**Steps:**
1. Use Tab key to navigate through list creation form
2. Use Enter to submit
3. Navigate list view using keyboard only

**Expected Results:**
- All interactive elements are keyboard accessible
- Focus indicators are visible
- Logical tab order is maintained
- Enter and Space keys activate buttons appropriately

#### 11.4 Screen Reader Compatibility
**Steps:**
1. Navigate list pages with screen reader enabled
2. Verify announcements for each action
3. Check ARIA labels and landmarks

**Expected Results:**
- All images have appropriate alt text
- Form fields have associated labels
- List structure is properly announced
- Navigation landmarks are defined

### 12. Performance and Load Testing

**Seed:** `tests/logged-in/seed.spec.ts`

#### 12.1 List with Many Movies
**Steps:**
1. Create a list and add 50+ movies
2. Navigate to View List page
3. Scroll through all movies

**Expected Results:**
- Page loads within acceptable time (< 3 seconds)
- Scrolling is smooth
- Images load progressively or with lazy loading
- No performance degradation

#### 12.2 User with Many Lists
**Steps:**
1. Create 20+ different lists
2. Navigate to My Lists page
3. Scroll through all lists

**Expected Results:**
- My Lists page loads efficiently
- Pagination may be implemented
- All list thumbnails load appropriately
- No browser memory issues

#### 12.3 Search Performance in Add Movies
**Steps:**
1. Type quickly in the Add Item search field
2. Observe search results response time

**Expected Results:**
- Search debouncing is implemented
- Results appear within 1 second
- No duplicate searches for same query
- Smooth typing experience without lag

## Test Execution Notes

### Prerequisites
- User must be logged in (use login setup from `tests/logged-in/login.setup.ts`)
- Application must be running on `http://localhost:3000`
- TMDB API must be accessible for movie data

### Test Data Cleanup
- Each test should create its own list to avoid conflicts
- Consider implementing cleanup utilities to delete test lists after execution
- Use unique, identifiable names for test lists (e.g., "Test List - [timestamp]")

### Reusable Utilities
The following utilities from `tests/helpers/list-utilities.ts` should be leveraged:
- `createList(page, listName, listDescription)` - Create a new list
- `openLists(page, name)` - Navigate to My Lists
- `addMovie(page, movieName)` - Add a movie to the current list
- `addImageToList(page, movieName)` - Select a movie backdrop as list image
- `navigateToMovieList(page, name)` - Navigate to a specific list

### Environment Considerations
- Tests assume localhost:3000 as the base URL
- TMDB data may change over time; use stable, popular movies for reliable testing
- Image loading times may vary based on network conditions
- Consider mocking TMDB API for consistent test data

## Success Criteria

A test scenario passes when:
- All steps execute without errors
- Expected results match actual application behavior
- No console errors are logged (except expected warnings)
- Visual elements render correctly
- Data persists and displays accurately
- Navigation flows work as intended
- No accessibility violations are detected

## Priority Classification

**P0 (Critical):**
- Scenarios 1.1, 2.1, 2.2, 4.1, 6.1, 6.2, 8.1, 9.1

**P1 (High):**
- Scenarios 1.2, 3.1, 3.3, 4.2, 4.3, 5.1, 7.1, 7.2, 9.2

**P2 (Medium):**
- Scenarios 1.4, 2.4, 3.2, 4.4, 4.5, 5.2, 5.3, 6.3, 6.4, 7.3, 8.2, 8.3, 9.3, 10.1-10.3

**P3 (Low):**
- Scenarios 1.3, 2.3, 5.4, 7.4, 8.4, 10.4-10.6, 11.1-11.4, 12.1-12.3
