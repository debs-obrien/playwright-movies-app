# Movie List Management - Comprehensive Test Plan

## Application Overview

The Movie List Management feature allows authenticated users to create, manage, and share custom movie lists. This comprehensive functionality includes:

- **List Creation**: Create new movie lists with name, description, and privacy settings
- **List Editing**: Modify list details including name, description, and public/private status
- **Movie Management**: Add and remove movies from lists using an autocomplete search interface
- **Visual Customization**: Choose backdrop images from movies in the list
- **List Sharing**: Generate and copy shareable URLs for public lists
- **List Deletion**: Remove lists with confirmation
- **List Viewing**: View all movies in a list with poster images and ratings
- **Navigation**: Seamless navigation between list operations

## Test Scenarios

### 1. Creating a New Movie List

**Seed:** `tests/logged-in/seed.spec.ts`

#### 1.1 Create List with Valid Information
**Steps:**
1. Navigate to the home page or any page with the main navigation
2. Click the "Create New List" button in the navigation (if on a list page) OR navigate directly to `/list/add-or-edit`
3. In the "Name" field, enter "Summer Blockbusters 2024"
4. In the "Description" field, enter "My favorite action movies from summer 2024"
5. Verify the "Public List?" dropdown shows "Yes" by default
6. Click the "Continue" button

**Expected Results:**
- Form fields are clearly labeled and accept text input
- The Continue button is enabled after entering required information
- After clicking Continue, user is redirected to add movies to the new list
- List is saved with the provided name and description

#### 1.2 Create Private List
**Steps:**
1. Navigate to `/list/add-or-edit`
2. Enter "My Private Collection" in the Name field
3. Enter "Personal favorites not for sharing" in the Description field
4. Click on the "Public List?" dropdown
5. Select "No" from the dropdown options
6. Click the "Continue" button

**Expected Results:**
- Dropdown successfully changes from "Yes" to "No"
- List is created as a private list
- Private lists should not be accessible via shared URLs (to be verified separately)

#### 1.3 Create List with Minimum Information
**Steps:**
1. Navigate to `/list/add-or-edit`
2. Enter only a name: "Quick List"
3. Leave description field empty
4. Keep default "Public List?" setting
5. Click the "Continue" button

**Expected Results:**
- List is created successfully with just a name
- Empty description field is accepted
- User can proceed to add movies

#### 1.4 Attempt to Create List with Empty Name
**Steps:**
1. Navigate to `/list/add-or-edit`
2. Leave the Name field empty
3. Enter description "Test description"
4. Attempt to click the "Continue" button

**Expected Results:**
- Continue button is either disabled or shows validation error
- Clear error message indicates name is required
- Form prevents submission without a name

#### 1.5 Create List with Special Characters in Name
**Steps:**
1. Navigate to `/list/add-or-edit`
2. Enter name with special characters: "Top 10 Movies (2024) - Action & Thriller!"
3. Enter description "Special characters test"
4. Click the "Continue" button

**Expected Results:**
- Special characters are accepted in the name field
- List is created successfully
- Name displays correctly with all special characters preserved

#### 1.6 Create List with Very Long Name
**Steps:**
1. Navigate to `/list/add-or-edit`
2. Enter a very long name (200+ characters): "This is an extremely long movie list name that tests the character limit and how the application handles very lengthy inputs that might exceed typical database field lengths or UI display constraints and might cause layout issues..."
3. Enter description "Long name test"
4. Attempt to click the "Continue" button

**Expected Results:**
- System either enforces character limit with visual indicator OR
- Accepts long name and handles display appropriately (truncation, wrapping)
- No system error occurs
- If limit exists, clear message about maximum characters

---

### 2. Editing Existing Lists

**Seed:** `tests/logged-in/seed.spec.ts` (starts with "my favorite movies" list)

#### 2.1 Edit List Name
**Steps:**
1. Navigate to an existing list (e.g., `/list?id=f068093d-07e7-4b30-abad-fa3a09f85d82&page=1`)
2. Click the "Edit" button in the navigation
3. Verify current name is displayed in the Name field: "my favorite movies"
4. Clear the Name field and enter new name: "My Top Movies"
5. Click the "Save" button

**Expected Results:**
- Existing list data loads correctly in edit form
- Name field shows current name pre-populated
- Name updates successfully
- User is redirected back to the list view
- Updated name is displayed on the list page

#### 2.2 Edit List Description
**Steps:**
1. Navigate to existing list page
2. Click the "Edit" button
3. Verify current description: "list of my favorite movies"
4. Modify description to: "Updated list of movies I absolutely love"
5. Click the "Save" button

**Expected Results:**
- Description field shows current description
- Description updates successfully
- New description appears on list page

#### 2.3 Change List Privacy Setting
**Steps:**
1. Navigate to existing public list
2. Click the "Edit" button
3. Verify "Public List?" shows "Yes"
4. Click the dropdown and select "No"
5. Click the "Save" button
6. Attempt to access the list via shared URL (in logged-out state)

**Expected Results:**
- Privacy setting changes from public to private
- Private list is no longer accessible via shared URL
- List owner can still access the list when logged in

#### 2.4 Edit List Without Changes
**Steps:**
1. Navigate to existing list
2. Click the "Edit" button
3. Don't modify any fields
4. Click the "Save" button

**Expected Results:**
- Save operation completes without errors
- User is redirected back to list view
- All data remains unchanged

#### 2.5 Edit List - Clear Required Fields
**Steps:**
1. Navigate to existing list
2. Click the "Edit" button
3. Clear the Name field completely
4. Attempt to click the "Save" button

**Expected Results:**
- Save button is disabled OR validation error appears
- Form prevents saving without required name field
- User receives clear feedback about the issue

---

### 3. Adding Movies to a List

**Seed:** `tests/logged-in/seed.spec.ts`

#### 3.1 Add Movie Using Search
**Steps:**
1. Navigate to existing list
2. Click "Add/Remove Movies" button
3. Click in the "Add Item" search box
4. Observe the default movie suggestions dropdown that appears
5. Select "Deadpool & Wolverine" from the dropdown by clicking it

**Expected Results:**
- Search box is clearly visible and clickable
- Dropdown appears immediately on focus showing popular movies
- Selected movie is added to the list below
- Movie appears in the movies list with a "Remove" button
- Search box clears after selection

#### 3.2 Add Movie by Typing Search Term
**Steps:**
1. Navigate to list's Add/Remove Movies page
2. Click in the "Add Item" search box
3. Type "Inception" slowly (character by character)
4. Wait for autocomplete suggestions to update
5. Click on "Inception" from the filtered results

**Expected Results:**
- Autocomplete responds to typing input
- Results filter as user types
- Matching movies appear in dropdown
- Selected movie is added to the list
- Search box is ready for next search

#### 3.3 Add Multiple Movies in Sequence
**Steps:**
1. Navigate to Add/Remove Movies page
2. Search for and add "The Matrix"
3. Search for and add "The Dark Knight"
4. Search for and add "Interstellar"
5. Verify all three movies appear in the list

**Expected Results:**
- Multiple movies can be added consecutively
- All added movies appear in the list
- No duplicate entries if movie already exists
- List order is maintained (newest additions at bottom or top consistently)

#### 3.4 Search for Non-Existent Movie
**Steps:**
1. Navigate to Add/Remove Movies page
2. Click in the search box
3. Type "XYZ123NONEXISTENTMOVIE456"
4. Wait for search results

**Expected Results:**
- Search attempts to find matching results
- Either shows "No results found" message OR empty dropdown
- No error occurs
- User can clear search and try again

#### 3.5 Add Movie That Already Exists in List
**Steps:**
1. Navigate to Add/Remove Movies page for list containing "Twisters"
2. Verify "Twisters" is already in the movies list
3. Search for "Twisters" in the Add Item search box
4. Attempt to add "Twisters" again

**Expected Results:**
- System either prevents adding duplicate OR
- Shows message that movie already exists in list OR
- Adds duplicate if allowed (verify expected behavior)
- No system error occurs

#### 3.6 Add Movie with Special Characters in Title
**Steps:**
1. Navigate to Add/Remove Movies page
2. Search for "Bad Boys: Ride or Die" (contains colon)
3. Select it from dropdown
4. Verify it appears in the list

**Expected Results:**
- Movies with special characters are searchable
- Title displays correctly with all special characters
- Movie is added successfully

#### 3.7 Test Search Box Keyboard Navigation
**Steps:**
1. Navigate to Add/Remove Movies page
2. Click in search box and type "Star"
3. Use Arrow Down key to navigate through results
4. Use Arrow Up key to navigate back
5. Press Enter to select highlighted movie

**Expected Results:**
- Keyboard navigation works in dropdown
- Arrow keys move selection highlight
- Enter key adds the selected movie
- Tab key and Escape key handle appropriately

---

### 4. Removing Movies from a List

**Seed:** `tests/logged-in/seed.spec.ts` (has "Twisters", "The Garfield Movie", "Bad Boys: Ride or Die")

#### 4.1 Remove Single Movie
**Steps:**
1. Navigate to Add/Remove Movies page
2. Verify "Twisters" is in the movies list
3. Click the "Remove" button (X icon) next to "Twisters"

**Expected Results:**
- Remove button is clearly visible and clickable
- "Twisters" is immediately removed from the list
- Removal happens without page reload
- Other movies remain in the list

#### 4.2 Remove All Movies from List
**Steps:**
1. Navigate to Add/Remove Movies page with 3 movies
2. Click "Remove" button next to first movie
3. Click "Remove" button next to second movie
4. Click "Remove" button next to third movie
5. Verify list is now empty

**Expected Results:**
- All movies can be removed
- Empty list state is displayed appropriately
- No errors occur with empty list
- User can still add new movies to empty list

#### 4.3 Remove and Re-add Same Movie
**Steps:**
1. Navigate to Add/Remove Movies page
2. Remove "The Garfield Movie" from the list
3. Immediately search for "The Garfield Movie"
4. Re-add it to the list

**Expected Results:**
- Movie can be removed and re-added
- No conflicts or errors
- Movie appears in list after re-adding

#### 4.4 Remove Movie Then Navigate Away
**Steps:**
1. Navigate to Add/Remove Movies page
2. Remove "Bad Boys: Ride or Die"
3. Click "View List" to go back to main list page
4. Verify "Bad Boys: Ride or Die" is not displayed

**Expected Results:**
- Changes persist when navigating away
- Removed movie doesn't appear in list view
- Movie count updates appropriately

---

### 5. Viewing Movie Lists

**Seed:** `tests/logged-in/seed.spec.ts`

#### 5.1 View List with Movies
**Steps:**
1. Navigate to list page `/list?id=f068093d-07e7-4b30-abad-fa3a09f85d82&page=1`
2. Verify list displays correctly

**Expected Results:**
- List title "my favorite movies" is displayed prominently
- List description "list of my favorite movies" is shown
- All movies (Twisters, The Garfield Movie, Bad Boys: Ride or Die) display with:
  - Movie poster image
  - Movie title
  - Star rating
- Movies are displayed in a grid or list layout
- Page is visually appealing and loads quickly

#### 5.2 Click on Movie Poster
**Steps:**
1. Navigate to list page
2. Click on "Twisters" poster image or title

**Expected Results:**
- User is redirected to movie detail page
- Movie detail page shows comprehensive information about "Twisters"
- Back navigation returns to the list

#### 5.3 View Empty List
**Steps:**
1. Create a new list
2. Don't add any movies
3. Navigate to View List

**Expected Results:**
- List displays with title and description
- Empty state is shown clearly (e.g., "No movies in this list yet")
- Add/Remove Movies button is still accessible
- No errors with empty list

#### 5.4 View List Navigation Options
**Steps:**
1. Navigate to any list page
2. Observe navigation buttons/links available

**Expected Results:**
- "Edit" button is visible and functional
- "Share" button is visible and functional
- "Add/Remove Movies" button is visible and functional
- "Create New List" button is visible and functional
- All navigation options work correctly

---

### 6. Choosing List Cover Image

**Seed:** `tests/logged-in/seed.spec.ts`

#### 6.1 View Available Images
**Steps:**
1. Navigate to existing list with movies
2. Click "Choose Image" link
3. Observe available backdrop images

**Expected Results:**
- Page displays backdrop images from all movies in the list
- Each image is labeled with corresponding movie title
- Images are displayed in a clear, selectable format
- Page shows: "Twisters", "The Garfield Movie", "Bad Boys: Ride or Die" with their scenery images

#### 6.2 Select Cover Image
**Steps:**
1. Navigate to Choose Image page
2. Click on "Twisters" backdrop image
3. Navigate back to View List

**Expected Results:**
- Image is selected (visual feedback like border or highlight)
- Selection is saved
- List page displays the selected backdrop as cover image
- Cover image updates immediately or after confirmation

#### 6.3 Change Cover Image
**Steps:**
1. Navigate to Choose Image page (current selection: "Twisters")
2. Click on "The Garfield Movie" backdrop instead
3. Verify selection changes

**Expected Results:**
- Previous selection is deselected
- New selection is highlighted
- List cover updates to new image

#### 6.4 Choose Image for List with No Movies
**Steps:**
1. Create new list without adding movies
2. Navigate to Choose Image page

**Expected Results:**
- Page shows appropriate message (e.g., "Add movies to choose cover image")
- No images are displayed
- User is guided to add movies first

---

### 7. Sharing Lists

**Seed:** `tests/logged-in/seed.spec.ts`

#### 7.1 Open Share Dialog
**Steps:**
1. Navigate to existing public list
2. Click the "Share" button

**Expected Results:**
- Share dialog/modal opens
- Dialog displays heading: "Share [list name]"
- URL field shows the full list URL
- URL is in a copyable text field

#### 7.2 Copy Share URL
**Steps:**
1. Navigate to list page
2. Click "Share" button
3. Click in the URL text field
4. Select all text (Ctrl+A or Cmd+A)
5. Copy text (Ctrl+C or Cmd+C)
6. Paste in another location to verify

**Expected Results:**
- URL is fully selectable
- Copy operation works
- Copied URL is in format: `http://localhost:3000/list?id=[list-id]&page=1`

#### 7.3 Close Share Dialog
**Steps:**
1. Click "Share" button to open dialog
2. Press Escape key

**Expected Results:**
- Dialog closes
- User returns to list view
- No URL is copied

#### 7.4 Share Private List
**Steps:**
1. Navigate to a private list
2. Observe Share button state/behavior

**Expected Results:**
- If private, Share button should either:
  - Be disabled with tooltip explaining "Private list cannot be shared" OR
  - Show warning in share dialog that list must be public to share OR
  - Allow sharing but shared URL requires authentication

#### 7.5 Access Shared URL in New Browser
**Steps:**
1. Share a public list and copy URL
2. Open new incognito/private browser window
3. Paste and navigate to the shared URL

**Expected Results:**
- Public list is accessible without authentication
- All movies in the list are visible
- List details (name, description) are displayed
- Edit functions are not available to non-authenticated users

---

### 8. Deleting Lists

**Seed:** `tests/logged-in/seed.spec.ts`

#### 8.1 Navigate to Delete List Page
**Steps:**
1. Navigate to existing list
2. Click "Delete List" link in navigation

**Expected Results:**
- User is taken to delete confirmation page at `/list/remove?id=[list-id]`
- Page displays "Delete List" heading
- Warning message is shown: "Click the button below if you are sure you want to delete this list."
- "Delete" button is prominently displayed

#### 8.2 Confirm List Deletion
**Steps:**
1. Navigate to Delete List page for "my favorite movies"
2. Click the "Delete" button
3. Observe result

**Expected Results:**
- List is permanently deleted
- User is redirected (likely to home or my-lists page)
- Deleted list no longer appears in user's lists
- Success message confirms deletion
- Cannot access deleted list URL

#### 8.3 Cancel List Deletion
**Steps:**
1. Navigate to Delete List page
2. Instead of clicking Delete, click "View List" or use browser back button
3. Verify list is still intact

**Expected Results:**
- List is not deleted
- All list data remains unchanged
- User can continue using the list

#### 8.4 Delete List with Many Movies
**Steps:**
1. Create list with 20+ movies
2. Navigate to Delete List page
3. Click "Delete" button

**Expected Results:**
- List deletes successfully regardless of number of movies
- All associated data (movies, images, settings) are removed
- No errors occur

#### 8.5 Attempt to Access Deleted List URL
**Steps:**
1. Delete a list and note its URL
2. Try to navigate directly to that URL after deletion

**Expected Results:**
- 404 error page OR
- "List not found" message OR
- Redirect to appropriate page
- No system error or crash

---

### 9. List Navigation and User Experience

**Seed:** `tests/logged-in/seed.spec.ts`

#### 9.1 Navigate Between List Sections
**Steps:**
1. Start at View List page
2. Click "Edit" - verify edit page loads
3. Click "Add/Remove Movies" - verify add/remove page loads
4. Click "Choose Image" - verify choose image page loads
5. Click "View List" - return to list view

**Expected Results:**
- All navigation links work correctly
- Each page loads without errors
- Navigation is consistent across all pages
- User can easily move between different list management functions

#### 9.2 Breadcrumb or Back Navigation
**Steps:**
1. Navigate through multiple list pages
2. Use browser back button
3. Verify pages load correctly

**Expected Results:**
- Browser back button works correctly
- Page state is preserved appropriately
- No broken pages or errors

#### 9.3 View Multiple Lists
**Steps:**
1. Create 2-3 different lists
2. Navigate to `/my-lists` or user profile
3. Verify all lists are displayed

**Expected Results:**
- All user's lists are visible
- Each list shows title and basic info
- Can click on any list to view it
- Lists are organized clearly

#### 9.4 Direct URL Access
**Steps:**
1. Copy URL of list page: `/list?id=[id]&page=1`
2. Paste in new browser tab
3. Access directly

**Expected Results:**
- List loads correctly from direct URL
- All data displays properly
- No errors with direct access
- User must be authenticated if required

#### 9.5 List Persistence Across Sessions
**Steps:**
1. Create and modify a list
2. Log out
3. Log back in
4. Navigate to the list

**Expected Results:**
- All changes are persisted
- List appears exactly as left
- Movies, settings, and images are preserved

---

### 10. Search Functionality

**Seed:** `tests/logged-in/seed.spec.ts`

#### 10.1 Global Search for Movies
**Steps:**
1. From any page, locate the search bar in header
2. Click "Search Input" field
3. Type "Avengers"
4. Observe autocomplete results

**Expected Results:**
- Search bar is accessible from all pages
- Autocomplete shows matching movies
- Can search for movies globally
- Clicking result navigates to movie details page

#### 10.2 Search Performance with Fast Typing
**Steps:**
1. Click in Add Item search on list management page
2. Type quickly: "TheGodfather"
3. Observe results update

**Expected Results:**
- Search keeps up with fast typing
- Results update smoothly without lag
- No duplicate API calls
- Debouncing is implemented appropriately

---

### 11. Responsive Design and Accessibility

**Seed:** `tests/logged-in/seed.spec.ts`

#### 11.1 View Lists on Mobile Viewport
**Steps:**
1. Resize browser to mobile viewport (375x667)
2. Navigate to list page
3. Test all list functions

**Expected Results:**
- Layout adapts to mobile screen
- All buttons and links are tappable
- Images resize appropriately
- Navigation is accessible
- Text is readable

#### 11.2 Keyboard Navigation
**Steps:**
1. Navigate to list page using only keyboard (Tab, Enter, Space)
2. Access all functions without mouse

**Expected Results:**
- All interactive elements are keyboard accessible
- Tab order is logical
- Focus indicators are visible
- Can perform all actions with keyboard

#### 11.3 Screen Reader Compatibility
**Steps:**
1. Enable screen reader (NVDA, JAWS, VoiceOver)
2. Navigate through list management features
3. Verify all elements are announced clearly

**Expected Results:**
- All buttons have clear labels
- Form fields have associated labels
- Images have appropriate alt text
- Navigation structure is semantic and clear

---

### 12. Error Handling and Edge Cases

**Seed:** `tests/logged-in/seed.spec.ts`

#### 12.1 Network Failure During Movie Search
**Steps:**
1. Open DevTools and simulate offline mode
2. Try to search for movies in Add Item field

**Expected Results:**
- Clear error message appears
- User understands they're offline
- No cryptic errors
- Graceful degradation

#### 12.2 Session Expiry
**Steps:**
1. Start editing a list
2. Wait for session to expire (or clear session cookies)
3. Attempt to save changes

**Expected Results:**
- User is prompted to log in again
- Data entered is not lost if possible
- Clear messaging about what happened
- Can resume work after re-authentication

#### 12.3 Invalid List ID in URL
**Steps:**
1. Navigate to `/list?id=invalid-id-12345&page=1`

**Expected Results:**
- Error page or "List not found" message
- No system crash
- Option to return to valid page

#### 12.4 Concurrent Edits
**Steps:**
1. Open same list in two browser tabs
2. Edit different fields in each tab
3. Save in both tabs

**Expected Results:**
- Later save wins OR
- Conflict detection with warning
- Data integrity is maintained
- No silent data loss

#### 12.5 XSS Protection in User Inputs
**Steps:**
1. Create list with name: `<script>alert('XSS')</script>`
2. Create list with description containing HTML tags
3. View the list

**Expected Results:**
- Scripts do not execute
- HTML is escaped/sanitized
- Display shows text literally, not rendered as code
- Application is protected against XSS attacks

---

### 13. Performance and Load Testing

**Seed:** `tests/logged-in/seed.spec.ts`

#### 13.1 List with Many Movies
**Steps:**
1. Create list and add 100+ movies
2. Navigate to View List
3. Test scrolling and interaction

**Expected Results:**
- Page loads in reasonable time (< 3 seconds)
- Scrolling is smooth
- Pagination is implemented if needed
- No browser freezing or crashes

#### 13.2 Create Multiple Lists Rapidly
**Steps:**
1. Create 10 lists in quick succession
2. Navigate between them

**Expected Results:**
- All lists are created successfully
- No conflicts or data corruption
- Navigation works smoothly
- System handles rapid requests

#### 13.3 Search Performance
**Steps:**
1. Type in search box and measure response time
2. Verify results appear quickly

**Expected Results:**
- Search results appear within 500ms
- Smooth user experience
- No noticeable lag

---

## Test Execution Notes

- **Authentication Required**: All tests require user to be logged in via the seed file
- **Test Data**: Tests assume TMDB API is available and returning consistent data
- **Browser Compatibility**: Tests should be run on Chrome, Firefox, Safari, and Edge
- **Mobile Testing**: Include iOS Safari and Chrome Android
- **Visual Testing**: Consider screenshot comparisons for UI consistency
- **API Mocking**: Consider mocking TMDB API for consistent, fast tests
- **Cleanup**: Each test should either create its own data or properly clean up after execution

## Success Criteria

- All happy path scenarios pass consistently
- Error scenarios are handled gracefully with clear user feedback
- Performance meets acceptable thresholds
- Accessibility standards (WCAG 2.1 AA) are met
- Cross-browser compatibility is verified
- Mobile experience is fully functional
- No critical security vulnerabilities (XSS, CSRF, etc.)
