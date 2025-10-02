# Movie List Management - Comprehensive Test Plan

## Application Overview

The Movie List Management feature is a comprehensive system for logged-in users to create, manage, and organize personal movie lists. The application integrates with TMDB (The Movie Database) to provide movie data and imagery. Key features include:

- **List Creation**: Create new custom movie lists with names and descriptions
- **List Editing**: Modify list metadata including name, description, and visibility settings
- **Movie Management**: Add and remove movies from lists using an intuitive search interface
- **Visual Customization**: Choose custom backdrop images from movies in the list
- **Sharing**: Generate shareable URLs for public lists
- **List Deletion**: Permanently remove lists from the user's account
- **Privacy Controls**: Toggle between public and private list visibility
- **User Interface**: Clean navigation with persistent header, search functionality, and theme toggle

## Test Scenarios

### 1. Creating a New Movie List

**Seed:** `tests/logged-in/seed.spec.ts`

#### 1.1 Create List with Valid Basic Information
**Steps:**
1. Navigate to the list view page
2. Click the "Create New List" button
3. Enter "Action Movies" in the Name field
4. Enter "My favorite action movies collection" in the Description field
5. Leave "Public List?" set to "Yes" (default)
6. Click the "Continue" button

**Expected Results:**
- User is redirected to the add/remove movies page for the new list
- The list name "Action Movies" appears in the page heading
- The navigation shows Edit List, View List, Add/Remove Movies, Choose Image, and Delete List options
- An empty movie list is displayed with the search box to add items

#### 1.2 Create List with Private Visibility
**Steps:**
1. Navigate to the list view page
2. Click the "Create New List" button
3. Enter "Personal Watchlist" in the Name field
4. Enter "Movies I want to watch privately" in the Description field
5. Click on the "Public List?" dropdown
6. Select "No"
7. Click the "Continue" button

**Expected Results:**
- List is created with private visibility setting
- User is redirected to the add/remove movies page
- List name appears correctly in the heading

#### 1.3 Create List with Empty Name (Validation)
**Steps:**
1. Navigate to the list view page
2. Click the "Create New List" button
3. Leave the Name field empty
4. Enter "Test description" in the Description field
5. Click the "Continue" button

**Expected Results:**
- Form validation prevents submission
- Error message or visual indicator shows Name field is required
- User remains on the create list page

#### 1.4 Create List with Empty Description
**Steps:**
1. Navigate to the list view page
2. Click the "Create New List" button
3. Enter "Horror Classics" in the Name field
4. Leave the Description field empty
5. Click the "Continue" button

**Expected Results:**
- List is created successfully (description may be optional)
- OR validation error appears if description is required
- User behavior is consistent with field requirements

#### 1.5 Create List with Special Characters in Name
**Steps:**
1. Navigate to the list view page
2. Click the "Create New List" button
3. Enter "90's Action & Adventure!" in the Name field
4. Enter "Classic action movies from the 1990s" in the Description field
5. Click the "Continue" button

**Expected Results:**
- List is created successfully with special characters preserved
- List name displays correctly throughout the application
- No encoding issues or character corruption

#### 1.6 Create List with Very Long Name and Description
**Steps:**
1. Navigate to the list view page
2. Click the "Create New List" button
3. Enter a name with 200+ characters in the Name field
4. Enter a description with 1000+ characters in the Description field
5. Click the "Continue" button

**Expected Results:**
- Application handles long text appropriately
- Either accepts the long text with proper display/truncation
- OR shows validation error with maximum length requirements
- No layout breaking or overflow issues

### 2. Editing an Existing List

**Seed:** `tests/logged-in/seed.spec.ts`

#### 2.1 Edit List Name
**Steps:**
1. Navigate to an existing list (e.g., "my favorite movies")
2. Click the "Edit" button
3. Clear the Name field
4. Enter "Updated Favorites" in the Name field
5. Click the "Save" button

**Expected Results:**
- List name is updated successfully
- Page heading shows the new name "Updated Favorites"
- User is redirected back to the list view
- Success notification may appear

#### 2.2 Edit List Description
**Steps:**
1. Navigate to an existing list
2. Click the "Edit" button
3. Modify the Description field to "An updated description of my favorite movies"
4. Click the "Save" button

**Expected Results:**
- Description is updated successfully
- New description appears in the list subheading
- All other list properties remain unchanged

#### 2.3 Change List Visibility from Public to Private
**Steps:**
1. Navigate to an existing public list
2. Click the "Edit" button
3. Click on the "Public List?" dropdown
4. Select "No"
5. Click the "Save" button

**Expected Results:**
- List visibility is changed to private
- List is no longer accessible via public URLs (if applicable)
- Owner can still access and manage the list normally

#### 2.4 Change List Visibility from Private to Public
**Steps:**
1. Navigate to an existing private list
2. Click the "Edit" button
3. Click on the "Public List?" dropdown
4. Select "Yes"
5. Click the "Save" button

**Expected Results:**
- List visibility is changed to public
- Share button functionality becomes available/active
- Shareable URL can be generated

#### 2.5 Edit List Without Making Changes
**Steps:**
1. Navigate to an existing list
2. Click the "Edit" button
3. Do not modify any fields
4. Click the "Save" button

**Expected Results:**
- No errors occur
- User is redirected back to the list view
- All list properties remain unchanged

#### 2.6 Edit List and Cancel via Browser Navigation
**Steps:**
1. Navigate to an existing list
2. Click the "Edit" button
3. Modify the Name field
4. Click the "View List" navigation link without saving

**Expected Results:**
- Changes are not saved
- User is redirected to the list view
- Original list name is preserved
- No data loss or corruption

### 3. Adding Movies to a List

**Seed:** `tests/logged-in/seed.spec.ts`

#### 3.1 Add Movie Using Search - Popular Movie
**Steps:**
1. Navigate to an existing list
2. Click the "Add/Remove Movies" button
3. Click in the "Search for a movie..." input field
4. Observe the dropdown of popular movies that appears
5. Click on "Deadpool & Wolverine" from the dropdown

**Expected Results:**
- Movie is added to the list immediately
- "Deadpool & Wolverine" appears in the movies list with a Remove button
- Search field clears and dropdown closes
- Movie appears at the end or beginning of the list (consistent position)

#### 3.2 Add Movie Using Search - Type to Search
**Steps:**
1. Navigate to an existing list
2. Click the "Add/Remove Movies" button
3. Click in the "Search for a movie..." input field
4. Type "Inception"
5. Wait for search results to appear
6. Click on "Inception" from the search results

**Expected Results:**
- Search results update as user types
- Relevant movies matching "Inception" appear
- Selected movie is added to the list
- Search field is cleared for next search

#### 3.3 Add Multiple Movies Sequentially
**Steps:**
1. Navigate to an existing list
2. Click the "Add/Remove Movies" button
3. Search for and add "Inside Out 2"
4. Search for and add "Despicable Me 4"
5. Search for and add "The Union"

**Expected Results:**
- All three movies are added to the list
- Movies appear in the list in the order added (or consistent ordering)
- Each movie has its own Remove button
- No duplicate entries

#### 3.4 Add Movie Already in the List (Duplicate Prevention)
**Steps:**
1. Navigate to a list that contains "Twisters"
2. Click the "Add/Remove Movies" button
3. Search for "Twisters"
4. Attempt to click on "Twisters" from the search results

**Expected Results:**
- System prevents adding duplicate movie
- Either movie is not clickable/selectable in search results
- OR clicking shows an error message "Movie already in list"
- No duplicate entry is created

#### 3.5 Add Movie with Special Characters in Title
**Steps:**
1. Navigate to an existing list
2. Click the "Add/Remove Movies" button
3. Search for "Bad Boys: Ride or Die"
4. Click on the movie from search results

**Expected Results:**
- Movie with special characters (colon) is added successfully
- Movie title displays correctly in the list
- Remove button functions properly
- No encoding or display issues

#### 3.6 Search for Non-existent Movie
**Steps:**
1. Navigate to an existing list
2. Click the "Add/Remove Movies" button
3. Type "XYZ123NonExistentMovieTitle" in the search field
4. Observe search results

**Expected Results:**
- Search completes without error
- Either "No results found" message appears
- OR empty results list is displayed
- User can clear search and try again

#### 3.7 Add Movie to Empty List
**Steps:**
1. Create a new empty list
2. Navigate to Add/Remove Movies page
3. Search for and add "Longlegs"

**Expected Results:**
- Movie is added successfully to the empty list
- List now shows one movie
- View List page displays the movie with poster and rating
- List counter shows accurate count

### 4. Removing Movies from a List

**Seed:** `tests/logged-in/seed.spec.ts`

#### 4.1 Remove Single Movie from List
**Steps:**
1. Navigate to a list containing "The Garfield Movie"
2. Click the "Add/Remove Movies" button
3. Locate "The Garfield Movie" in the movies list
4. Click the "Remove" button (trash icon) next to the movie

**Expected Results:**
- Movie is immediately removed from the list
- "The Garfield Movie" no longer appears in the movies list
- Remaining movies stay in the list
- No error messages appear

#### 4.2 Remove Multiple Movies Sequentially
**Steps:**
1. Navigate to a list with at least 3 movies
2. Click the "Add/Remove Movies" button
3. Click "Remove" button for the first movie
4. Click "Remove" button for another movie
5. Click "Remove" button for a third movie

**Expected Results:**
- All three movies are removed successfully
- List updates after each removal
- Remaining movies (if any) are still displayed correctly
- Remove buttons remain functional throughout

#### 4.3 Remove Last Movie from List
**Steps:**
1. Navigate to a list containing only one movie
2. Click the "Add/Remove Movies" button
3. Click the "Remove" button for the only movie in the list

**Expected Results:**
- Movie is removed successfully
- List becomes empty
- No error occurs
- Empty state is displayed (message or empty list)
- User can still add new movies

#### 4.4 Remove Movie and Verify on View List Page
**Steps:**
1. Navigate to a list containing "Twisters"
2. Note the total number of movies in the list
3. Click the "Add/Remove Movies" button
4. Remove "Twisters" from the list
5. Click the "View List" navigation link

**Expected Results:**
- "Twisters" is not displayed on the View List page
- Movie count is decreased by one
- Remaining movies display correctly with posters and ratings
- Layout adjusts appropriately

#### 4.5 Attempt to Remove Movie After Page Reload
**Steps:**
1. Navigate to Add/Remove Movies page
2. Note the movies in the list
3. Refresh the browser page
4. After reload, click "Remove" button for a movie

**Expected Results:**
- Page reloads successfully with current list state
- Remove button still functions after reload
- Movie is removed successfully
- No stale data or conflicts

### 5. Viewing Movie Lists

**Seed:** `tests/logged-in/seed.spec.ts`

#### 5.1 View List with Multiple Movies
**Steps:**
1. Navigate to a list containing at least 3 movies
2. Click the "View List" navigation link (if not already there)
3. Observe the list display

**Expected Results:**
- All movies in the list are displayed
- Each movie shows: poster image, title, and rating (stars)
- Movie posters are properly sized and aligned
- Rating stars display correctly (filled/half-filled/empty)
- Movies are clickable links to movie detail pages

#### 5.2 View Empty List
**Steps:**
1. Create a new list without adding any movies
2. Navigate to the View List page

**Expected Results:**
- Page loads without errors
- List name and description are displayed
- Empty state is shown (no movies or appropriate message)
- Navigation options remain available
- User can click "Add/Remove Movies" to add content

#### 5.3 Click Movie to View Details
**Steps:**
1. Navigate to a list view page with movies
2. Click on a movie poster/title (e.g., "Twisters")

**Expected Results:**
- User is redirected to the movie detail page
- Movie details page shows comprehensive information
- Page parameter maintains context (page=1 preserved in URL)
- User can navigate back to the list

#### 5.4 View List Navigation Options
**Steps:**
1. Navigate to any list view page
2. Observe the navigation options displayed

**Expected Results:**
- Four navigation buttons are visible: Edit, Share, Add/Remove Movies, Create New List
- All buttons are clickable and properly labeled
- Buttons have consistent styling
- Navigation persists as user interacts with the page

#### 5.5 View List with Long Movie Titles
**Steps:**
1. Add movies with long titles to a list (e.g., "Saving Bikini Bottom: The Sandy Cheeks Movie")
2. Navigate to the View List page

**Expected Results:**
- Long titles are displayed appropriately
- Either titles are truncated with ellipsis
- OR titles wrap to multiple lines without breaking layout
- Movie posters remain properly sized
- No text overflow issues

### 6. Choosing List Backdrop Image

**Seed:** `tests/logged-in/seed.spec.ts`

#### 6.1 View Available Backdrop Images
**Steps:**
1. Navigate to a list with at least 3 movies
2. Click the "Choose Image" navigation link (via Edit navigation or direct URL)

**Expected Results:**
- Choose Image page displays successfully
- List navigation shows "Choose Image" option
- Grid/list of backdrop images from movies in the list is displayed
- Each image shows the movie title below it
- All images are from movies currently in the list

#### 6.2 Select Backdrop Image
**Steps:**
1. Navigate to Choose Image page for a list
2. Click on one of the backdrop images (e.g., "Twisters" backdrop)

**Expected Results:**
- Image is selected (visual feedback may be provided)
- Selection is saved immediately or requires confirmation
- Selected image becomes the list backdrop (visible on list pages)
- User can change selection by clicking another image

#### 6.3 Choose Image for Empty List
**Steps:**
1. Create a new empty list (no movies added)
2. Attempt to navigate to Choose Image page

**Expected Results:**
- Either page shows empty state with message "Add movies to choose backdrop"
- OR no images are available to select
- No errors occur
- User is guided to add movies first

#### 6.4 Choose Image After Removing All Movies
**Steps:**
1. Navigate to a list with backdrop image already selected
2. Remove all movies from the list
3. Navigate to Choose Image page

**Expected Results:**
- Previously selected backdrop is either removed/reset
- OR backdrop persists even with empty list
- No broken image links
- Behavior is consistent and documented

### 7. Sharing Movie Lists

**Seed:** `tests/logged-in/seed.spec.ts`

#### 7.1 Open Share Dialog for Public List
**Steps:**
1. Navigate to a public list view page
2. Click the "Share" button

**Expected Results:**
- Share dialog opens as an overlay/modal
- Dialog shows heading "Share [list name]"
- URL field displays the full shareable URL
- URL is in a text box that can be selected/copied
- Dialog can be closed by clicking outside or pressing Escape

#### 7.2 Copy Share URL
**Steps:**
1. Navigate to a public list view page
2. Click the "Share" button
3. Click in the URL text field
4. Select all text (Ctrl+A or Cmd+A)
5. Copy the URL (Ctrl+C or Cmd+C)
6. Close the dialog

**Expected Results:**
- URL is copied to clipboard successfully
- URL format is correct: http://localhost:3000/list?id=[list-id]&page=1
- Copied URL can be pasted elsewhere
- URL includes the correct list ID

#### 7.3 Close Share Dialog
**Steps:**
1. Navigate to a public list view page
2. Click the "Share" button to open dialog
3. Press the Escape key

**Expected Results:**
- Share dialog closes
- User returns to normal list view
- Share button can be clicked again to reopen dialog
- No functionality is lost

#### 7.4 Close Share Dialog by Clicking Outside
**Steps:**
1. Navigate to a public list view page
2. Click the "Share" button to open dialog
3. Click on the backdrop area outside the dialog box

**Expected Results:**
- Share dialog closes smoothly
- User returns to the list view
- No errors occur
- Page functionality remains intact

#### 7.5 Share Dialog for Private List
**Steps:**
1. Navigate to a private list (Public List? = No)
2. Attempt to access Share button

**Expected Results:**
- Share button may be disabled or hidden for private lists
- OR Share button works but shows message about list being private
- Behavior clearly indicates private lists have restricted sharing
- User can change list to public via Edit if needed

#### 7.6 Verify Shared URL in New Browser Tab
**Steps:**
1. Navigate to a public list
2. Click Share button and copy the URL
3. Open a new browser tab (incognito/private if testing access control)
4. Paste and navigate to the copied URL

**Expected Results:**
- Public list is accessible via the shared URL
- List displays correctly with all movies
- Non-logged-in users can view public lists (if applicable)
- Private lists cannot be accessed by non-owners

### 8. Deleting Movie Lists

**Seed:** `tests/logged-in/seed.spec.ts`

#### 8.1 Navigate to Delete List Page
**Steps:**
1. Navigate to an existing list
2. Click "Edit" button
3. Click "Delete List" from the navigation options

**Expected Results:**
- Delete List page loads successfully
- Page shows clear heading "Delete List"
- Warning message is displayed: "Click the button below if you are sure you want to delete this list."
- Delete button is prominently displayed
- Navigation options remain available to cancel action

#### 8.2 Delete List with Confirmation
**Steps:**
1. Navigate to Delete List page for a list
2. Note the list name and ID
3. Click the "Delete" button

**Expected Results:**
- List is permanently deleted from the system
- User is redirected (likely to home page or lists overview)
- Deleted list no longer appears in user's lists
- Success message may confirm deletion
- List ID is no longer accessible

#### 8.3 Cancel Delete by Navigating Away
**Steps:**
1. Navigate to Delete List page
2. Click "View List" navigation link instead of Delete button

**Expected Results:**
- List is not deleted
- User is redirected to the list view page
- List and all movies remain intact
- No data loss occurs

#### 8.4 Delete List with Many Movies
**Steps:**
1. Create or navigate to a list with 10+ movies
2. Navigate to Delete List page
3. Click the "Delete" button

**Expected Results:**
- List is deleted successfully regardless of number of movies
- All movies are removed from the list
- No orphaned data or references remain
- Operation completes in reasonable time

#### 8.5 Delete Empty List
**Steps:**
1. Create a new list without adding movies
2. Navigate to Delete List page
3. Click the "Delete" button

**Expected Results:**
- Empty list is deleted successfully
- No errors occur
- User is redirected appropriately
- Operation is same as deleting list with content

#### 8.6 Attempt to Access Deleted List by URL
**Steps:**
1. Note the URL of an existing list
2. Delete the list via Delete List page
3. Attempt to navigate to the saved URL

**Expected Results:**
- Page shows 404 Not Found error
- OR redirects to error page with helpful message
- OR redirects to user's lists overview
- No data leakage or broken state

### 9. List Navigation and User Interface

**Seed:** `tests/logged-in/seed.spec.ts`

#### 9.1 Navigate Between List Management Pages
**Steps:**
1. Start at View List page
2. Click "Edit" → observe Edit List page
3. Click "Add/Remove Movies" → observe Add/Remove page
4. Click "Choose Image" → observe Choose Image page
5. Click "View List" → return to View List page

**Expected Results:**
- All navigation links work correctly
- Each page loads without errors
- List context (name, ID) is maintained throughout
- Navigation breadcrumb or tabs show current location
- Page URLs update correctly

#### 9.2 Use Browser Back Button
**Steps:**
1. Navigate from View List → Edit List → Add/Remove Movies
2. Click browser back button twice

**Expected Results:**
- Browser navigates backward through history correctly
- Pages display accurate state (no stale data)
- List information remains correct
- No JavaScript errors occur

#### 9.3 Header Search Functionality
**Steps:**
1. While viewing a list page
2. Click on the global search box in the header
3. Type "Avengers"
4. Press Enter

**Expected Results:**
- Global search initiates
- User is redirected to search results page
- Search works independently of list context
- User can navigate back to list

#### 9.4 Theme Toggle While Managing List
**Steps:**
1. Navigate to any list page
2. Note the current theme (light/dark)
3. Click the theme toggle switch in the header
4. Perform list operations (add movie, edit, etc.)

**Expected Results:**
- Theme toggles successfully between light and dark modes
- All list pages respect the selected theme
- Text, buttons, and images remain readable
- Theme preference persists across page navigation

#### 9.5 User Profile Access from List Pages
**Steps:**
1. While viewing a list page
2. Click the User Profile button in the header

**Expected Results:**
- User profile menu or page opens
- User can access account settings
- List context is not lost
- User can return to the list

#### 9.6 Menu Navigation from List Pages
**Steps:**
1. While viewing a list page
2. Click the menu icon (hamburger menu) in the header
3. Explore navigation options

**Expected Results:**
- Menu opens with all application sections
- User can navigate to other areas (genres, search, other lists)
- Current list is accessible when returning
- Menu closes properly

### 10. Edge Cases and Error Handling

**Seed:** `tests/logged-in/seed.spec.ts`

#### 10.1 Rapid Consecutive Operations
**Steps:**
1. Navigate to Add/Remove Movies page
2. Rapidly add 5 movies in quick succession (clicking as fast as possible)
3. Rapidly remove 3 movies in quick succession

**Expected Results:**
- All operations complete successfully
- No duplicate entries are created
- No movies are lost
- Final list state is accurate
- No race conditions or errors

#### 10.2 Network Interruption During Save
**Steps:**
1. Navigate to Edit List page
2. Modify list name
3. Simulate network failure (browser DevTools offline mode)
4. Click Save button

**Expected Results:**
- Error message indicates network failure
- User is notified that changes were not saved
- Form data is preserved for retry
- User can retry after network restoration

#### 10.3 Session Timeout During Edit
**Steps:**
1. Navigate to Edit List page
2. Let session idle until timeout (if applicable)
3. Attempt to save changes

**Expected Results:**
- User is redirected to login page
- OR session refresh occurs transparently
- User is notified of session expiration
- No data loss if possible
- Clear guidance provided to user

#### 10.4 Invalid List ID in URL
**Steps:**
1. Manually enter URL with invalid list ID: `/list?id=invalid-id&page=1`
2. Navigate to the URL

**Expected Results:**
- Page shows 404 Not Found error
- OR displays "List not found" error message
- User is not shown an error stack trace
- Helpful links guide user back to valid content

#### 10.5 SQL Injection Attempt in List Name
**Steps:**
1. Create a new list
2. Enter `'; DROP TABLE lists; --` in the Name field
3. Click Continue

**Expected Results:**
- Input is properly sanitized
- No SQL injection occurs
- Either special characters are stripped/escaped
- OR error message indicates invalid characters
- Database integrity is maintained

#### 10.6 XSS Attempt in List Description
**Steps:**
1. Create or edit a list
2. Enter `<script>alert('XSS')</script>` in the Description field
3. Save the list
4. View the list

**Expected Results:**
- Script tags are sanitized/escaped
- No JavaScript execution occurs
- Description displays as plain text
- XSS attack is prevented

#### 10.7 Extremely Long Search Query
**Steps:**
1. Navigate to Add/Remove Movies page
2. Paste 1000+ character string into search field
3. Observe behavior

**Expected Results:**
- Application handles long input gracefully
- Either search is limited to reasonable length
- OR search processes without crashing
- Performance remains acceptable
- No server errors

#### 10.8 Unicode and Emoji in List Name
**Steps:**
1. Create a new list
2. Enter "My Movies 🎬🍿 (2024) 日本映画" in the Name field
3. Save and view the list

**Expected Results:**
- Unicode characters and emoji are supported
- List name displays correctly across all pages
- No encoding issues or character corruption
- Share URLs work correctly with unicode

#### 10.9 Concurrent Edits from Multiple Browser Tabs
**Steps:**
1. Open list edit page in Tab 1
2. Open same list edit page in Tab 2
3. Modify list name in Tab 1 and save
4. Modify list description in Tab 2 and save

**Expected Results:**
- Application handles concurrent edits gracefully
- Either last save wins (with possible warning)
- OR conflict resolution mechanism is triggered
- No data corruption occurs
- User is informed of any conflicts

#### 10.10 Page Refresh During Movie Addition
**Steps:**
1. Navigate to Add/Remove Movies page
2. Begin adding a movie (search initiated)
3. Refresh the browser page before selection completes

**Expected Results:**
- Page refreshes without errors
- List state before refresh is maintained
- No partial/corrupted data is saved
- User can continue adding movies normally

### 11. Accessibility and Usability

**Seed:** `tests/logged-in/seed.spec.ts`

#### 11.1 Keyboard Navigation Through List Forms
**Steps:**
1. Navigate to Create New List page
2. Use Tab key to navigate through form fields
3. Use Tab to reach Continue button
4. Press Enter to submit

**Expected Results:**
- Tab order is logical: Name → Description → Public List? → Continue
- All interactive elements are reachable via keyboard
- Visual focus indicator is clearly visible
- Enter key submits the form from Continue button

#### 11.2 Keyboard Navigation in Search Dropdown
**Steps:**
1. Navigate to Add/Remove Movies page
2. Click in search field
3. Use arrow keys to navigate search results
4. Press Enter to select a movie

**Expected Results:**
- Arrow keys navigate through movie results
- Selected item has visual highlight
- Enter key adds the highlighted movie
- Escape key closes dropdown without selection

#### 11.3 Screen Reader Announcement for Movie Addition
**Steps:**
1. Enable screen reader (or test with accessibility tools)
2. Navigate to Add/Remove Movies page
3. Add a movie to the list

**Expected Results:**
- Screen reader announces movie was added
- Accessible labels present for all form fields
- Button actions are announced clearly
- List updates are communicated to assistive technology

#### 11.4 Color Contrast in Light and Dark Themes
**Steps:**
1. Toggle to light theme
2. Review text contrast on all list management pages
3. Toggle to dark theme
4. Review text contrast on all list management pages

**Expected Results:**
- All text meets WCAG AA contrast requirements (4.5:1 for normal text)
- Important actions (buttons) have sufficient contrast
- Focus indicators are visible in both themes
- No information is conveyed by color alone

#### 11.5 Touch Target Sizes on Mobile
**Steps:**
1. View list pages on mobile device or mobile viewport
2. Attempt to tap Remove buttons next to movies
3. Attempt to tap navigation buttons

**Expected Results:**
- All touch targets are at least 44x44 pixels
- Buttons are easy to tap without misclicks
- Adequate spacing between interactive elements
- Mobile layout is usable and accessible

#### 11.6 Form Labels and Accessibility
**Steps:**
1. Navigate to Edit List form
2. Inspect form elements with accessibility tools
3. Verify all fields have proper labels

**Expected Results:**
- All form inputs have associated labels
- Labels are properly connected via for/id or implicit nesting
- Placeholder text does not replace labels
- Error messages are associated with fields

### 12. Performance and Data Handling

**Seed:** `tests/logged-in/seed.spec.ts`

#### 12.1 List with 50+ Movies Loading Performance
**Steps:**
1. Create a list and add 50+ movies
2. Navigate to View List page
3. Measure page load time

**Expected Results:**
- Page loads within acceptable time (< 3 seconds)
- Images lazy load if necessary
- Smooth scrolling through movie list
- No performance degradation with large lists

#### 12.2 Search Performance with Rapid Typing
**Steps:**
1. Navigate to Add/Remove Movies page
2. Type quickly in the search field: "actionthrillercomedy"
3. Observe search behavior

**Expected Results:**
- Search debounces or throttles requests appropriately
- No excessive API calls
- Results appear promptly after typing stops
- No UI lag or freezing

#### 12.3 Multiple Lists Management
**Steps:**
1. Create 10+ different movie lists
2. Navigate between lists
3. Edit different lists
4. Verify data isolation

**Expected Results:**
- Each list maintains its own data independently
- No cross-contamination between lists
- Navigation between lists is smooth
- List IDs are unique and properly handled

#### 12.4 Data Persistence After Browser Refresh
**Steps:**
1. Add several movies to a list
2. Edit list name and description
3. Refresh the browser
4. Verify all changes are saved

**Expected Results:**
- All changes persist after refresh
- No data loss occurs
- List state is accurately restored
- Session is maintained (or user is prompted to log in)

#### 12.5 Image Loading and Caching
**Steps:**
1. Navigate to a list with multiple movies
2. Note image loading behavior
3. Navigate away and return to the same list
4. Observe image loading on return

**Expected Results:**
- Images load efficiently (progressive or lazy loading)
- Cached images load instantly on return visit
- Broken image links are handled gracefully
- Placeholder images show while loading

---

## Test Environment Setup

- **Base URL**: http://localhost:3000
- **Authentication**: Tests use `tests/logged-in/seed.spec.ts` which utilizes authenticated user state
- **Test Data**: Tests assume TMDB integration is active with live or mocked movie data
- **Browser Support**: Test across Chrome, Firefox, Safari, and Edge
- **Viewport Sizes**: Test desktop (1920x1080), tablet (768x1024), and mobile (375x667) viewports

## Pre-conditions

All test scenarios assume:
- User is logged in with valid credentials
- Application has network connectivity to TMDB API (or appropriate mocks)
- Fresh/blank state unless otherwise specified in test scenario
- JavaScript is enabled in the browser
- Cookies and local storage are enabled

## Success Criteria

- All happy path scenarios pass without errors
- Edge cases are handled gracefully with appropriate error messages
- No data loss or corruption in any scenario
- User experience is smooth and intuitive
- Accessibility standards are met (WCAG 2.1 AA)
- Performance benchmarks are achieved
- Security vulnerabilities (XSS, SQL injection) are prevented

## Notes for Test Execution

- Tests should be executed in isolation where possible to avoid state contamination
- Some scenarios may require test data setup or teardown
- Network conditions can be simulated using browser DevTools
- Accessibility tests should be validated with actual screen readers when possible
- Performance measurements should be taken on representative hardware
- Cross-browser testing is essential for production readiness
