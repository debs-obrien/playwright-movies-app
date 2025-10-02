# Movies List Application - Comprehensive Test Plan

## Application Overview

The Movies List application is a Next.js-based movie list management system that provides comprehensive list management functionality. The application features:

- **List Management**: Create, view, edit, and delete custom movie lists
- **Movie Operations**: Add and remove movies from lists using search functionality
- **List Customization**: Edit list name, description, and privacy settings (public/private)
- **List Image Selection**: Choose custom backdrop images for lists from available movie scenery
- **Sharing Functionality**: Share lists via URL
- **Movie Display**: View movies with posters and star ratings
- **Navigation**: Access movies directly from lists to view details
- **User Authentication**: Logged-in user state with profile access
- **Theme Toggle**: Light and dark mode support
- **Global Search**: Search for movies across the application
- **Genre Navigation**: Browse movies by genre categories

## Test Scenarios

### 1. Viewing Movie Lists

**Seed:** `tests/logged-in/seed.spec.ts`

#### 1.1 View Existing List
**Steps:**
1. Navigate to an existing list page (e.g., `/list?id={listId}&page=1`)
2. Wait for page to fully load

**Expected Results:**
- List title is displayed as heading (e.g., "my favorite movies")
- List description is displayed as subheading (e.g., "list of my favorite movies")
- Action buttons are visible: Edit, Share, Add/Remove Movies, Create New List
- Movie posters are displayed in a grid layout
- Each movie shows:
  - Movie poster image
  - Movie title as heading
  - Star rating visualization
- Movies are clickable links to movie detail pages

#### 1.2 View Empty List
**Steps:**
1. Create a new list without adding any movies
2. Navigate to the list view page

**Expected Results:**
- List title and description are displayed
- Action buttons are visible
- No movies are displayed
- Appropriate empty state is shown (if applicable)

#### 1.3 View List with Multiple Pages
**Steps:**
1. Navigate to a list with more than 20 movies
2. Observe pagination controls
3. Click to navigate between pages

**Expected Results:**
- Pagination controls are visible when applicable
- Page parameter updates in URL
- Movies load correctly on each page
- Navigation between pages works smoothly

---

### 2. Creating New Movie Lists

**Seed:** `tests/logged-in/seed.spec.ts`

#### 2.1 Create Basic List
**Steps:**
1. Click "Create New List" button from any list view
2. Enter list name: "My Action Movies"
3. Enter description: "Collection of my favorite action films"
4. Leave "Public List?" as default
5. Click "Save" button

**Expected Results:**
- User is redirected to the new list view page
- New list name "My Action Movies" is displayed
- Description "Collection of my favorite action films" is displayed
- List is empty (no movies)
- URL contains new list ID parameter

#### 2.2 Create List with Empty Name
**Steps:**
1. Click "Create New List" button
2. Leave name field empty
3. Enter description: "Test description"
4. Click "Save" button

**Expected Results:**
- Validation error appears for required name field
- OR List is created with empty/default name
- User remains on create/edit page OR is redirected with appropriate feedback

#### 2.3 Create Public List
**Steps:**
1. Click "Create New List" button
2. Enter list name: "Public Recommendations"
3. Enter description: "Movies I recommend to everyone"
4. Click on "Public List?" field
5. Select "Yes" option
6. Click "Save" button

**Expected Results:**
- List is created successfully
- Public list setting is saved
- List is accessible via direct URL without authentication (if applicable)

#### 2.4 Create Private List
**Steps:**
1. Click "Create New List" button
2. Enter list name: "Private Collection"
3. Enter description: "My personal movie collection"
4. Click on "Public List?" field
5. Select "No" option
6. Click "Save" button

**Expected Results:**
- List is created successfully
- Private list setting is saved
- List requires authentication to view (if applicable)

---

### 3. Editing Existing Lists

**Seed:** `tests/logged-in/seed.spec.ts`

#### 3.1 Edit List Name and Description
**Steps:**
1. Navigate to an existing list view
2. Click "Edit" button
3. Update name field to: "Updated List Name"
4. Update description to: "Updated description text"
5. Click "Save" button

**Expected Results:**
- Changes are saved successfully
- User is redirected to list view
- Updated name appears as page heading
- Updated description appears as subheading
- Movies remain in the list unchanged

#### 3.2 Edit List Privacy Setting
**Steps:**
1. Navigate to an existing list view
2. Click "Edit" button
3. Click on "Public List?" field
4. Change selection to opposite value
5. Click "Save" button

**Expected Results:**
- Privacy setting is updated
- List view is displayed with unchanged content
- Privacy setting persists on page reload

#### 3.3 Clear List Name
**Steps:**
1. Navigate to an existing list view
2. Click "Edit" button
3. Clear the name field completely
4. Click "Save" button

**Expected Results:**
- Validation error appears OR
- List name becomes empty/default
- Appropriate error message is displayed

#### 3.4 Edit Navigation from List View
**Steps:**
1. Navigate to list view page
2. Note navigation tabs: Edit List, View List, Add/Remove Movies, Choose Image, Delete List
3. Click "Edit List" tab

**Expected Results:**
- Edit List tab becomes active
- Edit form is displayed
- All navigation tabs remain visible
- User can switch between tabs

---

### 4. Adding Movies to Lists

**Seed:** `tests/logged-in/seed.spec.ts`

#### 4.1 Add Movie via Search
**Steps:**
1. Navigate to list view
2. Click "Add/Remove Movies" button
3. Click in "Add Item" search field
4. Observe popular movies dropdown appears
5. Type "inception" in search field
6. Wait for search results to load
7. Click on "Inception" from search results

**Expected Results:**
- Search field displays typed text
- Dropdown appears with matching movie results
- Selected movie is added to the list below
- Movie appears in the "movies" section with Remove button
- Search field clears after selection

#### 4.2 Add Movie from Popular List
**Steps:**
1. Navigate to Add/Remove Movies page
2. Click in "Add Item" search field
3. Without typing, observe popular movies dropdown
4. Click on any popular movie (e.g., "Deadpool & Wolverine")

**Expected Results:**
- Popular movies dropdown appears immediately on focus
- Shows approximately 20 popular movie options
- Each option displays movie poster thumbnail and title
- Selected movie is added to the list
- Movie appears in list section with Remove button

#### 4.3 Add Multiple Movies
**Steps:**
1. Navigate to Add/Remove Movies page
2. Click "Add Item" search field
3. Select first movie from dropdown
4. Click "Add Item" search field again
5. Select second movie from dropdown
6. Repeat for third movie

**Expected Results:**
- Each movie is successfully added
- All movies appear in the list section
- Movies maintain order of addition
- Each movie has its own Remove button

#### 4.4 Search for Non-existent Movie
**Steps:**
1. Navigate to Add/Remove Movies page
2. Click "Add Item" search field
3. Type "zzzznonexistentmovie12345"
4. Wait for search results

**Expected Results:**
- No results message appears OR
- Empty results dropdown is shown
- No error occurs
- Search field remains functional

#### 4.5 Add Duplicate Movie
**Steps:**
1. Navigate to Add/Remove Movies page
2. Add "Twisters" to the list
3. Search for "Twisters" again
4. Attempt to add it a second time

**Expected Results:**
- Duplicate prevention message appears OR
- Movie appears twice in list OR
- Second add attempt is ignored
- No application error occurs

---

### 5. Removing Movies from Lists

**Seed:** `tests/logged-in/seed.spec.ts`

#### 5.1 Remove Single Movie
**Steps:**
1. Navigate to Add/Remove Movies page
2. Observe existing movies in list (e.g., "Twisters", "The Garfield Movie", "Bad Boys: Ride or Die")
3. Click "Remove" button next to "Twisters"

**Expected Results:**
- "Twisters" is immediately removed from the list
- Remaining movies stay in the list
- No confirmation dialog appears (or confirmation works if present)
- List count updates if displayed

#### 5.2 Remove All Movies
**Steps:**
1. Navigate to Add/Remove Movies page
2. Click "Remove" button for first movie
3. Click "Remove" button for second movie
4. Click "Remove" button for last movie

**Expected Results:**
- Each movie is removed in sequence
- List becomes empty
- Empty state is shown (if applicable)
- No errors occur

#### 5.3 Remove and Re-add Movie
**Steps:**
1. Navigate to Add/Remove Movies page
2. Click "Remove" button for "The Garfield Movie"
3. Search for "The Garfield Movie"
4. Add it back to the list

**Expected Results:**
- Movie is successfully removed
- Movie can be found via search
- Movie is re-added successfully
- Movie appears in the list again

#### 5.4 View List After Removing Movie
**Steps:**
1. Navigate to Add/Remove Movies page
2. Remove one movie from the list
3. Click "View List" navigation tab

**Expected Results:**
- List view page loads
- Removed movie is not displayed
- Remaining movies are displayed correctly
- Changes persist on page reload

---

### 6. Choosing List Images

**Seed:** `tests/logged-in/seed.spec.ts`

#### 6.1 View Available Images
**Steps:**
1. Navigate to list view
2. Click "Choose Image" navigation tab or navigate to choose-image page

**Expected Results:**
- Page displays backdrop images from movies in the list
- Each image shows movie scenery/backdrop
- Movie titles are displayed with images
- Images are displayed in a grid layout

#### 6.2 Select List Image
**Steps:**
1. Navigate to Choose Image page
2. Observe available scenery images
3. Click on a scenery image (e.g., "The Garfield Movie" backdrop)

**Expected Results:**
- Selected image is highlighted or marked as "SELECTING"
- Selection state is visually indicated
- Image selection persists
- List uses selected image (if applicable to list display)

#### 6.3 Change List Image
**Steps:**
1. Navigate to Choose Image page with previously selected image
2. Click on a different scenery image

**Expected Results:**
- Previous selection is deselected
- New selection is highlighted
- Only one image can be selected at a time
- New selection is saved

#### 6.4 Choose Image with No Movies
**Steps:**
1. Create new empty list
2. Navigate to Choose Image page

**Expected Results:**
- Page displays empty state OR
- Message indicating no images available
- No errors occur
- User can navigate back to add movies

---

### 7. Sharing Lists

**Seed:** `tests/logged-in/seed.spec.ts`

#### 7.1 Open Share Dialog
**Steps:**
1. Navigate to list view page
2. Click "Share" button

**Expected Results:**
- Share dialog/modal appears
- Dialog shows heading "Share [list name]"
- URL field displays full list URL
- URL is pre-filled with current list URL (e.g., `http://localhost:3000/list?id=...&page=1`)

#### 7.2 Copy Share URL
**Steps:**
1. Navigate to list view page
2. Click "Share" button
3. Click on URL textbox
4. Select all text (Ctrl/Cmd+A)
5. Copy text (Ctrl/Cmd+C)

**Expected Results:**
- URL text can be selected
- URL is copyable
- URL contains list ID parameter
- Copied URL can be pasted elsewhere

#### 7.3 Close Share Dialog
**Steps:**
1. Navigate to list view page
2. Click "Share" button to open dialog
3. Press Escape key OR click outside dialog

**Expected Results:**
- Share dialog closes
- User returns to normal list view
- List content remains visible
- Share button can be clicked again

#### 7.4 Share Private List
**Steps:**
1. Create or edit a list to be private
2. Navigate to list view
3. Click "Share" button
4. Copy the URL
5. Open URL in incognito/private browser window

**Expected Results:**
- Share URL is generated for private list
- URL requires authentication when accessed by non-owner
- Appropriate access control is enforced

---

### 8. List Navigation and Tabs

**Seed:** `tests/logged-in/seed.spec.ts`

#### 8.1 Navigate Between List Tabs
**Steps:**
1. Navigate to list view page
2. Click "Edit List" tab
3. Click "View List" tab
4. Click "Add/Remove Movies" tab
5. Click "Choose Image" tab
6. Return to "View List" tab

**Expected Results:**
- Each tab loads its corresponding page
- Active tab is visually highlighted
- URL updates with each navigation
- Content changes appropriately
- All tabs remain accessible

#### 8.2 Direct URL Access to Tabs
**Steps:**
1. Navigate directly to `/list/add-or-edit?id={listId}`
2. Navigate directly to `/list/add-or-remove-items?listId={listId}&page=1`
3. Navigate directly to `/list/choose-image?listId={listId}&page=1`
4. Navigate directly to `/list?id={listId}&page=1`

**Expected Results:**
- Each URL loads the correct page
- Navigation tabs show correct active state
- Page content matches the URL
- User authentication is maintained

#### 8.3 Browser Back/Forward Navigation
**Steps:**
1. Navigate to list view
2. Click "Add/Remove Movies"
3. Click browser back button
4. Click browser forward button

**Expected Results:**
- Back button returns to previous page
- Forward button returns to Add/Remove page
- Page state is maintained
- No errors occur

---

### 9. Deleting Lists

**Seed:** `tests/logged-in/seed.spec.ts`

#### 9.1 Navigate to Delete Page
**Steps:**
1. Navigate to list view
2. Observe "Delete List" link in navigation tabs
3. Click "Delete List" link

**Expected Results:**
- Delete list page loads
- Confirmation message or form is displayed
- List details are shown for verification
- User can proceed with deletion or cancel

#### 9.2 Delete List with Confirmation
**Steps:**
1. Navigate to list delete page
2. Review list details
3. Confirm deletion action

**Expected Results:**
- Confirmation dialog appears (if applicable)
- After confirmation, list is deleted
- User is redirected (to home or lists overview)
- Deleted list is no longer accessible
- Deleted list URL returns 404 or error

#### 9.3 Cancel List Deletion
**Steps:**
1. Navigate to list delete page
2. Click cancel or back button

**Expected Results:**
- Deletion is cancelled
- User returns to list view or previous page
- List remains intact
- All list data is preserved

---

### 10. Movie Links and Navigation

**Seed:** `tests/logged-in/seed.spec.ts`

#### 10.1 Click Movie Poster
**Steps:**
1. Navigate to list view
2. Click on any movie poster/link (e.g., "Twisters")

**Expected Results:**
- User is navigated to movie detail page
- URL updates to `/movie?id={movieId}&page=1`
- Movie details are displayed
- User can navigate back to list

#### 10.2 Movie Link Hover State
**Steps:**
1. Navigate to list view
2. Hover over movie poster/link
3. Observe hover effects

**Expected Results:**
- Cursor changes to pointer
- Visual hover effect appears (if implemented)
- Link is clearly interactive
- Movie title remains visible

#### 10.3 Open Movie in New Tab
**Steps:**
1. Navigate to list view
2. Right-click on movie poster/link
3. Select "Open in New Tab"

**Expected Results:**
- Movie opens in new browser tab
- Original list view remains open
- Both tabs function independently
- User can switch between tabs

---

### 11. List Display and Visual Elements

**Seed:** `tests/logged-in/seed.spec.ts`

#### 11.1 Verify Star Ratings Display
**Steps:**
1. Navigate to list view with movies
2. Observe star ratings for each movie

**Expected Results:**
- Each movie shows star rating visualization
- Stars are displayed using ★ symbols
- Rating is visually clear
- Full and partial stars are distinguishable (if applicable)

#### 11.2 Verify Movie Poster Images
**Steps:**
1. Navigate to list view
2. Wait for all images to load
3. Observe movie posters

**Expected Results:**
- All movie posters load successfully
- Images have appropriate alt text (e.g., "poster of Twisters")
- Broken images show appropriate placeholders
- Images maintain aspect ratio

#### 11.3 Responsive Layout
**Steps:**
1. Navigate to list view
2. Resize browser window to various widths
3. Observe layout adjustments

**Expected Results:**
- Layout adapts to different screen sizes
- Movie grid adjusts number of columns
- Content remains readable at all sizes
- No horizontal scrolling occurs (unless intended)

---

### 12. Global Navigation and Header

**Seed:** `tests/logged-in/seed.spec.ts`

#### 12.1 Use Global Search
**Steps:**
1. Navigate to any list page
2. Click on "Search Input" in header
3. Type movie name
4. Observe search functionality

**Expected Results:**
- Search input is accessible from list pages
- Search functionality works independently of list
- User can search for any movie
- Search results are displayed appropriately

#### 12.2 Toggle Dark Mode
**Steps:**
1. Navigate to list view
2. Observe current theme (light or dark)
3. Click on theme toggle switch (☀/☾ buttons or toggle)
4. Observe theme change

**Expected Results:**
- Theme toggle controls are visible in header
- Clicking toggle changes theme
- Theme change applies immediately
- Theme preference persists across navigation

#### 12.3 Access User Profile
**Steps:**
1. Navigate to list view
2. Click on "User Profile" button in header

**Expected Results:**
- User profile menu or page appears
- User information is displayed
- Logout option is available (if applicable)
- User can return to list view

#### 12.4 Open Sidebar Menu
**Steps:**
1. Navigate to list view
2. Click on hamburger menu icon

**Expected Results:**
- Sidebar drawer opens
- Menu shows sections: Discover, Genres
- Popular, Top Rated, Upcoming links are visible
- All genre categories are listed
- User can navigate to any menu item

#### 12.5 Navigate to Genre from List
**Steps:**
1. Navigate to list view
2. Open sidebar menu
3. Click on a genre (e.g., "Action")

**Expected Results:**
- User is navigated to genre page
- Action movies are displayed
- Original list is still accessible via back button
- Genre navigation works correctly

---

### 13. Error Handling and Edge Cases

**Seed:** `tests/logged-in/seed.spec.ts`

#### 13.1 Access Non-existent List
**Steps:**
1. Navigate to `/list?id=non-existent-id&page=1`
2. Observe behavior

**Expected Results:**
- Appropriate error message is displayed OR
- 404 page is shown
- User can navigate to home or create new list
- No application crash occurs

#### 13.2 Access List Without Page Parameter
**Steps:**
1. Navigate to `/list?id={validListId}` (without page parameter)
2. Observe behavior

**Expected Results:**
- List loads with default page (page 1)
- OR Page parameter defaults to 1
- List displays correctly
- No errors occur

#### 13.3 Rapid Button Clicking
**Steps:**
1. Navigate to Add/Remove Movies page
2. Click "Remove" button rapidly multiple times
3. Observe behavior

**Expected Results:**
- Button click is processed only once OR
- Button is disabled after first click
- No duplicate actions occur
- Application remains stable

#### 13.4 Network Error During Save
**Steps:**
1. Navigate to edit list page
2. Simulate network disconnection (browser dev tools)
3. Make changes and click "Save"
4. Observe error handling

**Expected Results:**
- Error message appears
- User is informed of network issue
- Changes are not lost (if possible)
- User can retry save action

---

### 14. Authentication and Permissions

**Seed:** `tests/logged-in/seed.spec.ts`

#### 14.1 Access List While Logged In
**Steps:**
1. Verify user is logged in (using seed.spec.ts)
2. Navigate to owned list
3. Observe available actions

**Expected Results:**
- All list actions are available
- Edit, Share, Add/Remove, Delete buttons are visible
- User can perform all list operations
- User profile is displayed in header

#### 14.2 Session Persistence
**Steps:**
1. Navigate to list while logged in
2. Refresh the page
3. Observe authentication state

**Expected Results:**
- User remains logged in after refresh
- List view loads correctly
- Authentication persists
- No re-login required

---

### 15. Performance and Loading

**Seed:** `tests/logged-in/seed.spec.ts`

#### 15.1 List Loading Time
**Steps:**
1. Navigate to list view
2. Measure time from navigation to full page load
3. Verify all content loads

**Expected Results:**
- Page loads within acceptable time (< 3 seconds)
- All movie posters load
- No loading errors occur
- Page is interactive after load

#### 15.2 Image Loading States
**Steps:**
1. Navigate to list view
2. Observe image loading progression
3. Note placeholder states

**Expected Results:**
- Image placeholders are shown during load
- Images load progressively
- Failed image loads show appropriate placeholder
- Page remains usable during image loading

#### 15.3 Multiple List Navigation
**Steps:**
1. Navigate between multiple different lists
2. Observe loading behavior
3. Check for memory leaks or slowdowns

**Expected Results:**
- Each list loads correctly
- Navigation speed remains consistent
- No performance degradation
- Browser memory usage is reasonable

---

## Test Data Requirements

- **Authenticated User**: Test user with valid login credentials (provided by seed.spec.ts)
- **Existing List**: List with ID containing 3+ movies
- **Empty List**: List with no movies
- **Large List**: List with 20+ movies for pagination testing
- **Public List**: List with public visibility setting
- **Private List**: List with private visibility setting

## Testing Notes

- All tests assume the application is running locally at `http://localhost:3000`
- Tests are designed for logged-in user state (using `tests/logged-in/seed.spec.ts` fixture)
- Movie data is provided by TMDB (The Movie Database) API
- Some features may require specific configuration or API keys
- Test execution should start with a clean/known state using the seed file

## Browser Compatibility

Tests should be executed across:
- Chromium-based browsers (Chrome, Edge)
- Firefox
- Safari (WebKit)

## Accessibility Considerations

- All interactive elements should be keyboard accessible
- Proper ARIA labels and roles should be present
- Screen reader compatibility should be verified
- Focus management should work correctly through navigation

---

**Document Version**: 1.0  
**Last Updated**: October 2, 2025  
**Test Coverage**: Movies List Management Features
