# Movies List Feature - Comprehensive Test Plan

## Application Overview

The Movies List feature is a core component of the Playwright Movies App that enables authenticated users to create, manage, and share custom movie collections. The feature integrates with The Movie Database (TMDB) API to provide rich movie data and imagery. Key capabilities include:

- **List Management**: Create, edit, view, and delete custom movie lists
- **Movie Operations**: Add and remove movies from lists via search functionality
- **Visual Customization**: Select custom cover images for lists from available movie backdrops
- **Sharing**: Generate shareable URLs for public lists
- **Privacy Controls**: Toggle between public and private list visibility
- **Organization**: View all personal lists in a dedicated "My Lists" section with visual previews

## Test Scenarios

### 1. Creating a New List

**Seed:** `tests/logged-in/seed.spec.ts`

**Utility Functions Available:**
- `createList(page, listName, listDescription)` from `list-utilities.ts`
- `openLists(page, name)` from `list-utilities.ts`

#### 1.1 Create List with Valid Name and Description
**Assumptions:** User is logged in and on any page

**Steps:**
1. Click the "User Profile" button in the header
2. Click "Create New List" from the dropdown menu
3. Type "Summer Blockbusters 2024" in the "Name" textbox
4. Type "Best action movies from summer 2024" in the "Description" textbox
5. Verify "Public List?" field shows "Yes" by default
6. Click the "Continue" button

**Expected Results:**
- Redirected to the Add/Remove Movies page for the new list
- URL contains `listId` parameter
- List name "Summer Blockbusters 2024" displays as page heading
- "Add Item" search textbox is visible and ready for input

#### 1.2 Create List with Minimum Required Fields
**Assumptions:** User is logged in and on any page

**Steps:**
1. Click the "User Profile" button
2. Click "Create New List"
3. Type "Minimal List" in the "Name" textbox
4. Leave "Description" textbox empty
5. Click "Continue"

**Expected Results:**
- List is created successfully
- Redirected to Add/Remove Movies page
- Empty description does not prevent list creation

#### 1.3 Create Private List
**Assumptions:** User is logged in on the Create New List page

**Steps:**
1. Type "My Private Collection" in the "Name" textbox
2. Type "Personal favorites" in the "Description" textbox
3. Click the "Public List?" dropdown/textbox
4. Select "No" option
5. Click "Continue"

**Expected Results:**
- List is created as private
- List appears in My Lists section
- List visibility indicator shows "PRIVATE"

#### 1.4 Attempt to Create List Without Name
**Assumptions:** User is on the Create New List page

**Steps:**
1. Leave "Name" textbox empty
2. Type "This should fail" in the "Description" textbox
3. Click "Continue"

**Expected Results:**
- Error message or validation appears
- List is not created
- User remains on the Create New List page

#### 1.5 Create Multiple Lists Sequentially
**Assumptions:** User is logged in

**Steps:**
1. Create first list named "Action Movies"
2. Navigate to User Profile → Create New List
3. Create second list named "Comedy Films"
4. Navigate to User Profile → My Lists

**Expected Results:**
- Both lists appear in My Lists section
- Each list displays correct name and preview
- Lists are ordered by creation date (newest first or oldest first)

---

### 2. Adding Movies to a List

**Seed:** `tests/logged-in/seed.spec.ts`

**Utility Functions Available:**
- `addMovie(page, movieName)` from `list-utilities.ts`

#### 2.1 Add Single Movie by Search
**Assumptions:** List exists and user is on Add/Remove Movies page

**Steps:**
1. Click in the "Add Item" search textbox
2. Type "The Matrix"
3. Wait for search suggestions to appear
4. Click the "The Matrix" button from the suggestions

**Expected Results:**
- Movie appears in the movies list below the search box
- Movie name displays as "The Matrix"
- "Remove" button appears next to the movie
- Search textbox clears and is ready for next entry

#### 2.2 Add Multiple Movies
**Assumptions:** List exists and user is on Add/Remove Movies page

**Steps:**
1. Add "Inception" using search
2. Add "Interstellar" using search
3. Add "Tenet" using search

**Expected Results:**
- All three movies appear in the list
- Movies display in the order they were added
- Each movie has a "Remove" button
- List counter updates (if present)

#### 2.3 Search for Non-Existent Movie
**Assumptions:** User is on Add/Remove Movies page

**Steps:**
1. Type "ZZZNonExistentMovie12345" in the search textbox
2. Wait for search results

**Expected Results:**
- No movie suggestions appear, or
- "No results found" message displays
- List remains unchanged

#### 2.4 Add Duplicate Movie
**Assumptions:** List contains "The Matrix"

**Steps:**
1. Type "The Matrix" in search
2. Click "The Matrix" from suggestions

**Expected Results:**
- System either prevents duplicate addition with message, or
- Duplicate movie does not appear twice in list
- Original movie entry remains intact

#### 2.5 Add Movie with Special Characters in Title
**Assumptions:** User is on Add/Remove Movies page

**Steps:**
1. Search for "Amélie"
2. Click the movie from suggestions

**Expected Results:**
- Movie adds successfully
- Special characters display correctly in the list
- No encoding issues visible

---

### 3. Removing Movies from a List

**Seed:** `tests/logged-in/seed.spec.ts` (uses `listPage` fixture which creates a list with 3 movies)

#### 3.1 Remove Single Movie
**Assumptions:** List contains "Twisters", "The Garfield Movie", "Bad Boys: Ride or Die"

**Steps:**
1. Navigate to Add/Remove Movies page
2. Locate "The Garfield Movie" in the list
3. Click the "Remove" button next to it

**Expected Results:**
- "The Garfield Movie" is removed from the list
- Remaining movies ("Twisters", "Bad Boys: Ride or Die") still display
- List count updates to 2 items

#### 3.2 Remove All Movies
**Assumptions:** List contains 3 movies

**Steps:**
1. Navigate to Add/Remove Movies page
2. Click "Remove" for first movie
3. Click "Remove" for second movie
4. Click "Remove" for third movie

**Expected Results:**
- All movies are removed
- List is empty but still exists
- Message may display: "No movies in this list"
- Add Item search remains available

#### 3.3 Remove Movie and Re-add Immediately
**Assumptions:** List contains "Inception"

**Steps:**
1. Remove "Inception" using Remove button
2. Search for "Inception" in Add Item search
3. Add "Inception" back to the list

**Expected Results:**
- Movie is removed successfully
- Movie can be re-added without issues
- Movie position may change (appears at end of list)

---

### 4. Editing List Details

**Seed:** `tests/logged-in/seed.spec.ts` (uses `listPage` fixture)

#### 4.1 Update List Name and Description
**Assumptions:** List exists with name "my favorite movies" and description "list of my favorite movies"

**Steps:**
1. Navigate to list View page
2. Click "Edit" button
3. Change "Name" textbox to "Top Action Films"
4. Change "Description" textbox to "Best action movies of all time"
5. Click "Save" button

**Expected Results:**
- Success message appears (if implemented)
- Name updates to "Top Action Films" in the textbox
- Description updates to "Best action movies of all time"
- Page heading reflects new list name
- Changes persist after navigation

#### 4.2 Change List Privacy Setting
**Assumptions:** List exists and is public

**Steps:**
1. Navigate to Edit List page
2. Click "Public List?" dropdown
3. Select "No" to make private
4. Click "Save"
5. Navigate to My Lists

**Expected Results:**
- Privacy setting updates successfully
- List shows "PRIVATE" indicator in My Lists view
- Share functionality may be disabled/removed for private lists

#### 4.3 Clear List Description
**Assumptions:** List has a description

**Steps:**
1. Navigate to Edit List page
2. Clear all text from "Description" textbox
3. Click "Save"

**Expected Results:**
- Description is removed successfully
- No description displays on View List page
- List name still displays correctly

#### 4.4 Update with Invalid/Empty Name
**Assumptions:** List has valid name

**Steps:**
1. Navigate to Edit List page
2. Clear "Name" textbox completely
3. Click "Save"

**Expected Results:**
- Validation error appears
- Changes are not saved
- Original name remains
- User stays on Edit page

#### 4.5 Update Name to Very Long Text
**Assumptions:** User is on Edit List page

**Steps:**
1. Type a name with 500+ characters in "Name" textbox
2. Click "Save"

**Expected Results:**
- System either truncates name to maximum length, or
- Validation error displays with character limit
- List name displays correctly throughout UI without breaking layout

---

### 5. Choosing List Cover Image

**Seed:** `tests/logged-in/seed.spec.ts`

**Utility Functions Available:**
- `addImageToList(page, movieName)` from `list-utilities.ts`

#### 5.1 Select Cover Image from List Movies
**Assumptions:** List contains "Twisters", "The Garfield Movie", "Bad Boys: Ride or Die"

**Steps:**
1. Navigate to list View page
2. Click navigation link "Choose Image"
3. Hover over "The Garfield Movie" movie item
4. Click "SELECT" heading/button that appears

**Expected Results:**
- Button text changes to "SELECTED"
- Navigation back to View List or My Lists shows updated cover image
- Cover image uses The Garfield Movie backdrop/scenery

#### 5.2 Change Existing Cover Image
**Assumptions:** List has cover image from "Twisters"

**Steps:**
1. Navigate to Choose Image page
2. Verify "Twisters" shows "SELECTED"
3. Hover over "Bad Boys: Ride or Die"
4. Click "SELECT" on that movie

**Expected Results:**
- "Twisters" no longer shows as selected
- "Bad Boys: Ride or Die" shows "SELECTED"
- List cover updates to new image
- Change reflects in My Lists view

#### 5.3 Select Image from List with One Movie
**Assumptions:** List contains only one movie

**Steps:**
1. Navigate to Choose Image page
2. Verify only one movie appears
3. Hover and click "SELECT"

**Expected Results:**
- Single movie image can be selected
- Selection works without errors
- Cover image applies successfully

#### 5.4 Navigate Without Selecting Image
**Assumptions:** User is on Choose Image page

**Steps:**
1. View available images without clicking
2. Click "View List" navigation link

**Expected Results:**
- No image is selected
- List retains previous cover image (or default)
- No error occurs from not selecting

#### 5.5 Choose Image with Empty List
**Assumptions:** List has no movies added

**Steps:**
1. Navigate to Choose Image page

**Expected Results:**
- Message displays: "No movies available" or similar
- No selection options appear
- User can navigate away without errors

---

### 6. Viewing Lists

**Seed:** `tests/logged-in/seed.spec.ts` (uses `listPage` fixture)

#### 6.1 View List with Movies
**Assumptions:** List contains "Twisters", "The Garfield Movie", "Bad Boys: Ride or Die"

**Steps:**
1. Navigate to View List page

**Expected Results:**
- List name displays as heading (level 1)
- Description displays as heading (level 2)
- All three movies display with:
  - Movie poster images
  - Movie titles
  - Star ratings
  - Clickable links to movie detail pages
- Navigation menu shows: Edit, Share, Add/Remove Movies, Create New List

#### 6.2 View Empty List
**Assumptions:** List exists with no movies

**Steps:**
1. Navigate to View List page

**Expected Results:**
- List name and description display
- Message shows: "No movies in this list" or similar
- Add/Remove Movies option remains available
- No error occurs from empty state

#### 6.3 Click on Movie to View Details
**Assumptions:** List displays "Twisters"

**Steps:**
1. On View List page, click on "Twisters" poster/title link

**Expected Results:**
- Redirected to movie detail page
- URL contains movie ID parameter
- Movie details page loads correctly
- Browser back button returns to list view

#### 6.4 View List from My Lists Section
**Assumptions:** User has list named "Action Favorites"

**Steps:**
1. Click "User Profile" button
2. Click "My Lists"
3. Click on "Action Favorites" card

**Expected Results:**
- List view page opens
- Correct list content displays
- URL matches list ID
- Navigation breadcrumb or back option available

#### 6.5 View Public List as Non-Owner
**Assumptions:** Another user created a public list with shareable URL

**Steps:**
1. Log in as different user (or log out)
2. Navigate to public list URL directly
3. View the list content

**Expected Results:**
- List displays with name, description, and movies
- Edit controls are not visible
- Share button may still be available
- "Add to My Lists" option may appear (if implemented)

---

### 7. Deleting Lists

**Seed:** `tests/logged-in/seed.spec.ts` (uses `listPage` fixture)

#### 7.1 Delete List with Confirmation
**Assumptions:** List exists and user is viewing it

**Steps:**
1. Navigate to View List page
2. Click "Edit" button
3. Click "Delete List" navigation link
4. Read confirmation message
5. Click "Delete" button
6. Click "Yes" button in confirmation dialog

**Expected Results:**
- List is permanently deleted
- Redirected to My Lists page
- Deleted list no longer appears in My Lists
- Message displays: "no lists" if this was the only list

#### 7.2 Cancel List Deletion
**Assumptions:** User is on Delete List page

**Steps:**
1. Navigate to Delete List page
2. Click "Delete" button
3. Click "No" or "Cancel" in confirmation dialog

**Expected Results:**
- List is NOT deleted
- User can navigate back to list
- List still appears in My Lists
- All list data remains intact

#### 7.3 Delete List from Edit Page
**Assumptions:** User is on Edit List page

**Steps:**
1. On Edit List page, click "Delete List" link in navigation
2. Confirm deletion

**Expected Results:**
- List is deleted successfully
- Process is same as deleting from View page
- No duplicate delete actions occur

#### 7.4 Delete Last Remaining List
**Assumptions:** User has only one list

**Steps:**
1. Navigate to the list
2. Delete the list through Edit → Delete List
3. Confirm deletion
4. Navigate to My Lists

**Expected Results:**
- List is deleted
- My Lists page shows empty state
- Message: "no lists" or "Create your first list"
- Create New List option remains available

#### 7.5 Attempt to Access Deleted List URL
**Assumptions:** List was previously deleted, URL saved

**Steps:**
1. Navigate directly to deleted list URL
2. Observe result

**Expected Results:**
- 404 page displays, or
- "List not found" error message
- Redirect to My Lists or home page
- No application crash

---

### 8. Sharing Lists

**Seed:** `tests/logged-in/seed.spec.ts` (uses `listPage` fixture)

#### 8.1 Open Share Dialog for Public List
**Assumptions:** List is public and contains movies

**Steps:**
1. Navigate to View List page
2. Click "Share" button in navigation

**Expected Results:**
- Dialog/modal opens with heading "Share [list name]"
- URL textbox displays complete shareable URL
- URL format: `http://localhost:3000/list?id=[listId]&page=1`
- URL is pre-selected for easy copying

#### 8.2 Copy Share URL
**Assumptions:** Share dialog is open

**Steps:**
1. Click on URL textbox
2. Use keyboard shortcut Cmd+C (Mac) or Ctrl+C (Windows) to copy
3. Close dialog
4. Open new browser tab
5. Paste and navigate to URL

**Expected Results:**
- URL copies successfully to clipboard
- Navigating to URL opens the shared list
- List displays correctly in new context

#### 8.3 Close Share Dialog
**Assumptions:** Share dialog is open

**Steps:**
1. Click outside the dialog on the backdrop
2. Verify dialog closes

**Expected Results:**
- Dialog closes smoothly
- User returns to View List page
- No errors occur

#### 8.4 Share Private List
**Assumptions:** List privacy is set to "No" (private)

**Steps:**
1. Navigate to View List page
2. Observe Share button availability

**Expected Results:**
- Share button may be hidden/disabled for private lists, or
- Share dialog shows warning about privacy settings
- Private lists cannot be accessed by non-owners even with URL

#### 8.5 Share URL Persistence
**Assumptions:** Share URL was generated

**Steps:**
1. Generate share URL
2. Navigate away from list
3. Return to same list
4. Open Share dialog again

**Expected Results:**
- URL remains consistent (same ID)
- URL does not change between sessions
- URL is permanent unless list is deleted

---

### 9. Navigating Between List Views

**Seed:** `tests/logged-in/seed.spec.ts` (uses `listPage` fixture)

#### 9.1 Navigate Through All Tabs
**Assumptions:** User is viewing a list

**Steps:**
1. Start on View List page
2. Click "Edit" navigation link
3. Verify Edit List page displays
4. Click "Add/Remove Movies" navigation link
5. Verify Add/Remove Movies page displays
6. Click "Choose Image" navigation link
7. Verify Choose Image page displays
8. Click "View List" navigation link
9. Return to View List page

**Expected Results:**
- Each navigation link works correctly
- Each page displays appropriate content
- URL updates with each navigation
- No 404 or broken page errors
- List data persists across all views

#### 9.2 Navigate from Edit to Delete
**Assumptions:** User is on Edit List page

**Steps:**
1. On Edit List page, click "Delete List" link
2. Verify Delete confirmation page displays

**Expected Results:**
- Navigation to Delete page succeeds
- All navigation links remain functional
- Confirmation UI displays correctly

#### 9.3 Navigate with Unsaved Changes
**Assumptions:** User is editing list name

**Steps:**
1. On Edit List page, change name
2. Without clicking Save, click "View List" link
3. Observe behavior

**Expected Results:**
- Either: Warning dialog "Unsaved changes, continue?" appears, or
- Navigation proceeds without saving
- Data consistency maintained

#### 9.4 Navigate Using Browser Back Button
**Assumptions:** User navigated through several list pages

**Steps:**
1. Navigate: View → Edit → Add/Remove → Choose Image
2. Click browser Back button three times

**Expected Results:**
- Each Back click returns to previous page correctly
- Page state restores accurately
- No navigation errors or loops

#### 9.5 Direct URL Access to List Pages
**Assumptions:** User has list ID

**Steps:**
1. Navigate directly to Edit page URL: `/list/add-or-edit?id=[listId]`
2. Navigate to Add/Remove URL: `/list/add-or-remove-items?listId=[listId]&page=1`
3. Navigate to Choose Image URL: `/list/choose-image?listId=[listId]&page=1`

**Expected Results:**
- All pages load correctly via direct URL
- Authorization checks pass (if user owns list)
- Page content displays without errors

---

### 10. My Lists Overview

**Seed:** `tests/logged-in/seed.spec.ts`

**Utility Functions Available:**
- `openLists(page, name)` from `list-utilities.ts`
- `navigateToMovieList(page, name)` from `list-utilities.ts`

#### 10.1 View My Lists Page
**Assumptions:** User has created "my favorite movies" list with cover image

**Steps:**
1. Click "User Profile" button
2. Click "My Lists" from dropdown

**Expected Results:**
- My Lists page displays with heading "My Lists"
- List card shows:
  - Cover image (if selected)
  - List name "my favorite movies"
  - Privacy indicator "(PUBLIC)"
  - Clickable link to view list
- Page title is "My Lists"

#### 10.2 View My Lists with Multiple Lists
**Assumptions:** User has 5+ lists

**Steps:**
1. Navigate to My Lists page
2. Observe layout and organization

**Expected Results:**
- All lists display in grid or list layout
- Each list shows name, image, and privacy status
- Lists are visually distinct and organized
- Scrolling works if lists exceed viewport

#### 10.3 View My Lists with No Lists
**Assumptions:** User has never created a list

**Steps:**
1. Navigate to My Lists page

**Expected Results:**
- Empty state displays
- Message: "no lists" or similar
- "Create New List" call-to-action appears
- No error occurs from empty state

#### 10.4 Click List from My Lists
**Assumptions:** My Lists page shows multiple lists

**Steps:**
1. On My Lists page, click on specific list card/link

**Expected Results:**
- Navigates to View List page for that list
- Correct list content displays
- URL contains correct list ID

#### 10.5 List Preview Accuracy
**Assumptions:** Lists have different images and privacy settings

**Steps:**
1. Navigate to My Lists
2. Compare preview images with actual list contents
3. Verify privacy indicators (PUBLIC/PRIVATE)

**Expected Results:**
- Preview images match selected cover images
- Privacy labels are accurate
- List names display correctly without truncation issues
- Visual consistency across all list cards

---

### 11. Search and Filter Movies

**Seed:** `tests/logged-in/seed.spec.ts`

#### 11.1 Search with Partial Movie Name
**Assumptions:** User is on Add/Remove Movies page

**Steps:**
1. Type "Star" in Add Item search
2. Observe search results

**Expected Results:**
- Multiple matching movies appear (Star Wars, Star Trek, etc.)
- Results update dynamically as typing
- Most relevant results appear first

#### 11.2 Search with Complete Movie Name
**Assumptions:** User is on Add/Remove Movies page

**Steps:**
1. Type complete title "The Shawshank Redemption"
2. Wait for results

**Expected Results:**
- Exact match appears first
- Other similar titles may appear below
- User can click exact match to add

#### 11.3 Search Results Real-Time Update
**Assumptions:** User is typing in search

**Steps:**
1. Type "A" - observe results
2. Add "v" - observe "Av" results
3. Add "engers" - observe "Avengers" results

**Expected Results:**
- Results update after each character
- Search is responsive and fast
- Previous results clear when query changes

#### 11.4 Search with Year or Keywords
**Assumptions:** User is on Add/Remove Movies page

**Steps:**
1. Type "2024" in search
2. Observe results

**Expected Results:**
- Movies from 2024 appear, or
- No results if search doesn't support year filtering
- Clear feedback provided to user

#### 11.5 Clear Search Results
**Assumptions:** Search has been performed with results

**Steps:**
1. Search for "Batman"
2. Clear the search textbox completely
3. Observe result state

**Expected Results:**
- Search results disappear
- Empty search state displays
- User can start new search

---

### 12. Edge Cases and Error Scenarios

**Seed:** `tests/logged-in/seed.spec.ts`

#### 12.1 Network Failure During Movie Search
**Assumptions:** User is on Add/Remove Movies page

**Steps:**
1. Simulate network failure (disconnect or use dev tools)
2. Type "Inception" in search
3. Observe behavior

**Expected Results:**
- Error message displays: "Unable to load results"
- Application does not crash
- User can retry when network restored

#### 12.2 Session Timeout During List Edit
**Assumptions:** User is editing a list, session expires

**Steps:**
1. Open Edit List page
2. Wait for session timeout (or simulate)
3. Make changes and click Save

**Expected Results:**
- Redirect to login page, or
- Error message: "Session expired, please log in"
- Changes are not saved
- User can log in and retry

#### 12.3 Access Another User's Private List
**Assumptions:** Have URL to another user's private list

**Steps:**
1. Log in as User A
2. Navigate to User B's private list URL

**Expected Results:**
- Access denied message displays
- 403 Forbidden or similar error
- User cannot view or edit list
- Redirect to My Lists or home page

#### 12.4 Create List with Maximum Length Inputs
**Assumptions:** User is on Create New List page

**Steps:**
1. Paste 1000+ character string in Name field
2. Paste 5000+ character string in Description field
3. Click Continue

**Expected Results:**
- System validates input length
- Error messages for exceeded limits, or
- Inputs are truncated to max allowed
- List creation fails gracefully if invalid

#### 12.5 Rapid Button Clicking
**Assumptions:** User is on Add/Remove Movies page

**Steps:**
1. Search for "Matrix"
2. Rapidly click Add button 10 times in quick succession

**Expected Results:**
- Movie only adds once (duplicate prevention)
- No UI freezing or crashes
- Proper loading states prevent multiple submissions

#### 12.6 Special Characters in List Name
**Assumptions:** User is creating a new list

**Steps:**
1. Name list: `<script>alert("XSS")</script>`
2. Create list

**Expected Results:**
- Special characters are escaped properly
- No XSS vulnerability executed
- Name displays safely as plain text
- Security validation prevents malicious input

#### 12.7 Navigate to Invalid List ID
**Assumptions:** None

**Steps:**
1. Navigate to `/list?id=invalid-uuid-12345`
2. Observe result

**Expected Results:**
- 404 page or "List not found" message
- Application does not crash
- User can navigate back to valid page

#### 12.8 Delete List While Viewing It in Another Tab
**Assumptions:** List open in two browser tabs

**Steps:**
1. Open list in Tab 1 and Tab 2
2. In Tab 1, delete the list
3. In Tab 2, try to interact with list

**Expected Results:**
- Tab 2 shows error when trying actions, or
- Tab 2 automatically detects deletion and updates
- No data corruption occurs

---

## Test Data Requirements

- **Test User Account**: Authenticated user with permissions to create lists
- **TMDB API Access**: Valid API connection for movie search
- **Sample Movies**: Known movies for consistent testing (e.g., "Twisters", "The Matrix", "Inception")
- **Multiple Lists**: Test scenarios requiring 0, 1, 3, and 10+ lists
- **Public/Private Lists**: Mix of privacy settings
- **Lists with/without Images**: Various states of list customization

## Browser and Device Coverage

- **Desktop Browsers**: Chrome, Firefox, Safari, Edge
- **Mobile Browsers**: iOS Safari, Android Chrome (responsive design testing)
- **Screen Sizes**: Desktop (1920x1080), Tablet (768x1024), Mobile (375x667)

## Test Execution Notes

- **Test Isolation**: Each test should start with a clean/known state using the seed file and fixtures
- **Reusable Utilities**: Use `createList()`, `addMovie()`, `addImageToList()`, `openLists()`, and `navigateToMovieList()` from `list-utilities.ts`
- **Fixtures**: Use `listPage` fixture from `list-test.ts` for tests requiring a pre-populated list
- **Aria Snapshots**: Leverage `toMatchAriaSnapshot()` for accessibility-focused assertions
- **Test Steps**: Wrap logical groups of actions in `test.step()` for better reporting

## Success Criteria

- All happy path scenarios pass consistently
- Edge cases are handled gracefully without crashes
- Error messages are clear and actionable
- Data persistence works across sessions
- UI remains responsive during all operations
- Accessibility standards are maintained
- Security vulnerabilities (XSS, unauthorized access) are prevented
