# Movie List Management - Comprehensive Test Plan

## Application Overview

The Movie List Management application is a feature-rich system built with Next.js that allows authenticated users to create, manage, and share custom movie lists. The application integrates with TMDB (The Movie Database) to provide movie data, images, and ratings.

### Key Features:
- **List Creation & Management**: Create new movie lists with names, descriptions, and privacy settings
- **Movie Management**: Add and remove movies from lists with search functionality
- **Visual Customization**: Choose backdrop images for lists from available movie artwork
- **List Sharing**: Share public lists via URLs
- **List Navigation**: Browse all user-created lists in a centralized "My Lists" page
- **List Editing**: Modify list metadata including name, description, and privacy settings
- **List Deletion**: Permanently remove lists with confirmation
- **User Authentication**: Profile menu with access to lists and account management

## Test Scenarios

### 1. Viewing Existing Movie Lists

**Seed:** `tests/logged-in/seed.spec.ts`

#### 1.1 View List from My Lists Page
**Steps:**
1. Navigate to the application as a logged-in user
2. Click the "User Profile" button in the header
3. Select "My Lists" from the dropdown menu
4. Observe the list of available movie lists

**Expected Results:**
- "My Lists" page displays with heading "My Lists"
- Lists are shown with poster images, titles, and privacy status (PUBLIC/PRIVATE)
- Each list shows a preview image (backdrop from movies in the list)
- List items are clickable links

#### 1.2 View Individual List Details
**Steps:**
1. From the "My Lists" page, click on a list card
2. Observe the list detail page

**Expected Results:**
- List page displays with the list name as the main heading
- List description appears as a subheading
- Movies in the list are displayed with poster images, titles, and star ratings
- Action buttons appear: "Edit", "Share", "Add/Remove Movies", "Create New List"
- Movie posters are displayed in a grid layout
- Each movie card shows the title and rating visualization

#### 1.3 Navigate Between Lists
**Steps:**
1. From the "My Lists" page, note the available lists
2. Click on the first list
3. Click the "User Profile" button and select "My Lists"
4. Click on a different list

**Expected Results:**
- Each list displays its unique movies and metadata
- Navigation is smooth without errors
- List count and movie details are accurate for each list

### 2. Creating New Movie Lists

**Seed:** `tests/logged-in/seed.spec.ts`

#### 2.1 Create Basic List via Header Button
**Steps:**
1. Navigate to the application as a logged-in user
2. Click the "User Profile" button in the header
3. Select "Create New List" from the dropdown menu
4. Observe the form page

**Expected Results:**
- "Create New List" page displays with heading "Create New List"
- Form contains three fields: "Name", "Description", and "Public List?"
- "Public List?" field shows a dropdown with "Yes" selected by default
- "Continue" button is visible at the bottom of the form
- All fields are initially empty except "Public List?" which defaults to "Yes"

#### 2.2 Create List with Valid Data
**Steps:**
1. Navigate to "Create New List" page
2. Click in the "Name" field and type "Summer Action Movies"
3. Click in the "Description" field and type "My favorite summer blockbusters"
4. Verify "Public List?" is set to "Yes"
5. Click the "Continue" button

**Expected Results:**
- Form accepts input in all fields
- User is redirected to "Add/Remove Movies" page after clicking "Continue"
- List is created with the specified name and description
- New list appears in "My Lists" page

#### 2.3 Create Private List
**Steps:**
1. Navigate to "Create New List" page
2. Enter "Personal Favorites" in the "Name" field
3. Enter "Movies I don't want to share" in the "Description" field
4. Click on the "Public List?" dropdown
5. Select "No" from the dropdown options
6. Click "Continue"

**Expected Results:**
- "Public List?" dropdown allows selection between "Yes" and "No"
- Selected option is displayed in the field
- List is created with private status
- In "My Lists" page, the list shows "(PRIVATE)" indicator

#### 2.4 Create List from Within Another List
**Steps:**
1. Navigate to an existing list detail page
2. Click the "Create New List" button in the action navigation
3. Fill out the form with "Holiday Movies" as name
4. Enter "Movies to watch during holidays" as description
5. Click "Continue"

**Expected Results:**
- "Create New List" page opens from within list context
- Form behaves identically to accessing from profile menu
- New list is created successfully
- User can navigate back to original list

#### 2.5 Attempt to Create List with Empty Name
**Steps:**
1. Navigate to "Create New List" page
2. Leave the "Name" field empty
3. Enter text in the "Description" field
4. Click "Continue"

**Expected Results:**
- Form validation prevents submission
- Error message or visual indicator shows that name is required
- User remains on the form page
- No new list is created

#### 2.6 Create List with Long Name and Description
**Steps:**
1. Navigate to "Create New List" page
2. Enter a name with 100+ characters
3. Enter a description with 500+ characters
4. Select "Yes" for public list
5. Click "Continue"

**Expected Results:**
- Form accepts long text entries or shows character limits
- If there are limits, they are enforced clearly
- If accepted, list is created with full text
- Text displays properly on list pages without breaking layout

### 3. Editing Movie Lists

**Seed:** `tests/logged-in/seed.spec.ts`

#### 3.1 Access Edit Form
**Steps:**
1. Navigate to an existing list detail page
2. Click the "Edit" button in the action navigation

**Expected Results:**
- Edit page displays with the list name as the heading
- "Edit" appears as subheading
- Navigation tabs show: "Edit List", "View List", "Add/Remove Movies", "Choose Image", "Delete List"
- "Edit List" tab is active/highlighted
- Form contains three fields: "Name", "Description", "Public List?"
- All fields are pre-filled with current list data
- "Save" button is visible at the bottom

#### 3.2 Edit List Name
**Steps:**
1. Navigate to the edit page for "my favorite movies" list
2. Clear the "Name" field
3. Type "My Top Action Movies"
4. Click "Save"

**Expected Results:**
- Name field allows editing
- Upon saving, user is redirected to the list view page
- List page displays the new name "My Top Action Movies"
- Navigation breadcrumbs/titles reflect the new name
- Changes are persisted when navigating away and back

#### 3.3 Edit List Description
**Steps:**
1. Navigate to the edit page for a list
2. Modify the "Description" field to "Updated list of amazing movies"
3. Click "Save"

**Expected Results:**
- Description field allows editing
- Updated description is saved successfully
- List detail page displays the new description
- Description change is visible in all relevant locations

#### 3.4 Change List Privacy Setting
**Steps:**
1. Navigate to the edit page for a public list
2. Click on the "Public List?" dropdown
3. Select "No" to make it private
4. Click "Save"

**Expected Results:**
- Dropdown allows changing between "Yes" and "No"
- List privacy status is updated upon saving
- In "My Lists" page, indicator changes from "(PUBLIC)" to "(PRIVATE)"
- Public URL sharing behavior reflects the privacy change

#### 3.5 Edit Multiple Fields Simultaneously
**Steps:**
1. Navigate to the edit page
2. Change the name to "Sci-Fi Classics"
3. Change the description to "Timeless science fiction films"
4. Change privacy to "No"
5. Click "Save"

**Expected Results:**
- All changes are accepted
- All fields are updated simultaneously
- Changes persist across navigation
- No data loss occurs during multi-field update

#### 3.6 Cancel Edit Without Saving
**Steps:**
1. Navigate to the edit page for a list
2. Modify the name field
3. Modify the description field
4. Click "View List" tab instead of "Save"

**Expected Results:**
- User can navigate away from edit form
- Changes are not saved
- List retains original values
- No error or data corruption occurs

#### 3.7 Edit with Empty Name
**Steps:**
1. Navigate to the edit page
2. Clear the "Name" field completely
3. Click "Save"

**Expected Results:**
- Form validation prevents saving empty name
- Error message indicates name is required
- User remains on edit page
- Original list name is preserved

### 4. Adding and Removing Movies

**Seed:** `tests/logged-in/seed.spec.ts`

#### 4.1 Access Add/Remove Movies Interface
**Steps:**
1. Navigate to an existing list detail page
2. Click "Add/Remove Movies" button

**Expected Results:**
- "Add/Remove Movies" page loads
- Page shows heading with list name
- "Edit" subheading is displayed
- Navigation includes tabs: "Edit List", "View List", "Add/Remove Movies", "Choose Image", "Delete List"
- "Add/Remove Movies" tab is active
- Search box labeled "Add Item" with placeholder "Search for a movie..." is visible
- Current movies in the list are displayed below with "Remove" buttons
- Each movie shows its title and a remove icon

#### 4.2 Search for Movies to Add
**Steps:**
1. Navigate to "Add/Remove Movies" page
2. Click in the "Add Item" search box
3. Observe the dropdown that appears

**Expected Results:**
- Clicking the search box triggers a dropdown menu
- Dropdown displays popular/trending movies by default
- Each movie option shows a small poster image and title
- List displays approximately 20 movie options
- Movies are displayed as clickable buttons/menu items

#### 4.3 Search for Specific Movie
**Steps:**
1. Navigate to "Add/Remove Movies" page
2. Click in the "Add Item" search box
3. Type "Inception"
4. Wait for search results

**Expected Results:**
- Search field accepts text input
- Dropdown updates with matching movies
- "Inception" appears in the results
- Results show poster images and titles
- Typing filters the available movies in real-time

#### 4.4 Add Movie to List
**Steps:**
1. Navigate to "Add/Remove Movies" page for a list with 3 movies
2. Click in the "Add Item" search box
3. Select "Deadpool & Wolverine" from the dropdown

**Expected Results:**
- Selected movie is added to the list
- Movie appears in the movies list section below
- Movie shows with its title and a "Remove" button
- Search box clears after selection
- List now contains 4 movies
- Change is visible immediately without page reload

#### 4.5 Add Multiple Movies
**Steps:**
1. Navigate to "Add/Remove Movies" page
2. Add "Inside Out 2" from the search dropdown
3. Add "Despicable Me 4" from the search dropdown
4. Add "Alien: Romulus" from the search dropdown

**Expected Results:**
- Each movie is added successfully
- All three movies appear in the list
- Order of addition is preserved or follows a consistent sorting
- No duplicate entries occur
- All movies display with remove buttons

#### 4.6 Attempt to Add Duplicate Movie
**Steps:**
1. Navigate to "Add/Remove Movies" page
2. Note that "Twisters" is already in the list
3. Search for and select "Twisters" from the dropdown

**Expected Results:**
- System prevents duplicate additions OR
- System allows it but shows a warning OR
- "Twisters" already appears in the dropdown as already added/disabled
- List integrity is maintained

#### 4.7 Remove Single Movie
**Steps:**
1. Navigate to "Add/Remove Movies" page with a list containing "The Garfield Movie"
2. Click the "Remove" button next to "The Garfield Movie"

**Expected Results:**
- Movie is removed from the list immediately
- Movie no longer appears in the current list
- Removal happens without full page reload
- List count decreases by one
- Movie can be re-added if desired

#### 4.8 Remove Multiple Movies
**Steps:**
1. Navigate to "Add/Remove Movies" page with multiple movies
2. Click "Remove" on the first movie
3. Click "Remove" on another movie
4. Click "Remove" on a third movie

**Expected Results:**
- Each movie is removed individually
- Removals happen immediately after each click
- No errors occur during multiple removals
- List updates correctly after each removal
- Page remains stable and responsive

#### 4.9 Remove All Movies from List
**Steps:**
1. Navigate to "Add/Remove Movies" page
2. Click "Remove" on each movie until the list is empty

**Expected Results:**
- All movies can be removed
- Empty state is handled gracefully
- Page shows empty list or appropriate message
- Search functionality still works with empty list
- No errors occur with empty list

#### 4.10 Navigate Away After Changes
**Steps:**
1. Navigate to "Add/Remove Movies" page
2. Add two movies to the list
3. Remove one movie from the list
4. Click "View List" tab

**Expected Results:**
- Changes are automatically saved
- List view reflects the updated movies
- No unsaved changes warning appears
- Movie count is accurate on list view
- All changes persist after navigation

### 5. Choosing List Images

**Seed:** `tests/logged-in/seed.spec.ts`

#### 5.1 Access Choose Image Interface
**Steps:**
1. Navigate to an existing list detail page
2. Click the "Edit" button
3. Click the "Choose Image" tab

**Expected Results:**
- "Choose Image" page loads
- Page shows list name as heading and description as subheading
- Navigation tabs are visible with "Choose Image" active
- Grid of backdrop images is displayed
- Each image shows the movie title below it
- Images are from movies currently in the list
- Images are displayed as clickable buttons

#### 5.2 View Available Images
**Steps:**
1. Navigate to "Choose Image" page for a list with 3 movies
2. Count the available image options

**Expected Results:**
- Number of images matches the number of movies in the list
- Each movie contributes one backdrop image
- Images are high-quality backdrop/scenery shots
- Movie titles are clearly labeled under each image
- Images are properly sized and formatted

#### 5.3 Select List Backdrop Image
**Steps:**
1. Navigate to "Choose Image" page
2. Click on the backdrop image for "Twisters"

**Expected Results:**
- Image is selected (visual feedback provided)
- Selection is saved automatically or Save button appears
- Selected image becomes the list's cover image
- Change is reflected on "My Lists" page
- List card shows the selected backdrop

#### 5.4 Change List Image
**Steps:**
1. Navigate to "Choose Image" page
2. Note the current image selection
3. Click on a different movie's backdrop image

**Expected Results:**
- Previous selection is deselected
- New image is selected
- Only one image can be selected at a time
- Change updates the list's appearance
- Changes persist after navigation

#### 5.5 Choose Image with Empty List
**Steps:**
1. Create a new list without adding any movies
2. Navigate to the "Choose Image" page for that empty list

**Expected Results:**
- Page displays appropriately for empty state
- No images are available to select OR default images are shown
- Clear message indicates no images available
- Page doesn't break or show errors
- User can navigate away normally

#### 5.6 Choose Image After Adding Movies
**Steps:**
1. Start with an empty list
2. Navigate to "Choose Image" page (should be empty)
3. Navigate to "Add/Remove Movies"
4. Add 3 movies to the list
5. Navigate back to "Choose Image" page

**Expected Results:**
- Image options now appear for the newly added movies
- Each of the 3 movies has a backdrop available
- Images load correctly
- User can now select an image
- Changes are immediately reflected

### 6. Sharing Movie Lists

**Seed:** `tests/logged-in/seed.spec.ts`

#### 6.1 Open Share Dialog
**Steps:**
1. Navigate to a public list detail page
2. Click the "Share" button in the action navigation

**Expected Results:**
- Share dialog appears as a modal overlay
- Dialog displays heading "Share [list name]"
- Dialog contains a "URL" label
- Full shareable URL is displayed in a text field
- URL is in the format: `http://localhost:3000/list?id=[list-id]&page=1`
- Dialog has a backdrop/overlay behind it

#### 6.2 Copy Share URL
**Steps:**
1. Open the share dialog
2. Click or select the URL text
3. Copy the URL (Ctrl+C or Cmd+C)

**Expected Results:**
- URL text is selectable
- URL can be copied to clipboard
- Full URL is copied without truncation
- No JavaScript errors occur during copy operation

#### 6.3 Close Share Dialog
**Steps:**
1. Open the share dialog
2. Click outside the dialog on the backdrop area

**Expected Results:**
- Dialog closes when clicking outside
- User returns to the list view
- No errors occur during close
- Share button can be clicked again to reopen

#### 6.4 Close Share Dialog with Escape Key
**Steps:**
1. Open the share dialog
2. Press the Escape key

**Expected Results:**
- Dialog closes on Escape key press
- User returns to normal list view
- Keyboard functionality works as expected

#### 6.5 Share Private List
**Steps:**
1. Navigate to a private list (Public List? = No)
2. Attempt to click the "Share" button

**Expected Results:**
- Share button is either disabled/hidden OR
- Share dialog explains that private lists cannot be shared OR
- URL is shown with a warning about privacy settings
- Private lists maintain their privacy status

#### 6.6 Verify Shared URL
**Steps:**
1. Open share dialog for a public list
2. Copy the URL
3. Close the dialog
4. Open a new browser tab
5. Paste and navigate to the copied URL

**Expected Results:**
- URL leads directly to the list page
- List displays with all movies visible
- All list information is accessible via the URL
- Page loads without authentication errors (if list is public)

### 7. Deleting Movie Lists

**Seed:** `tests/logged-in/seed.spec.ts`

#### 7.1 Access Delete List Page
**Steps:**
1. Navigate to an existing list detail page
2. Click the "Edit" button
3. Click the "Delete List" tab in the navigation

**Expected Results:**
- "Delete List" page loads
- Page displays heading "Delete List"
- "Edit" appears as subheading
- Navigation tabs are visible with "Delete List" highlighted
- Warning message is displayed: "Click the button below if you are sure you want to delete this list."
- Red "Delete" button is prominently displayed
- Button has clear destructive styling

#### 7.2 View Delete Warning
**Steps:**
1. Navigate to the "Delete List" page
2. Read the warning message
3. Observe the delete button styling

**Expected Results:**
- Warning text is clear and explicit
- Message explains the action is permanent
- Delete button is visually distinct (likely red color)
- Page layout emphasizes the serious nature of the action
- Navigation allows user to exit without deleting

#### 7.3 Delete List Successfully
**Steps:**
1. Navigate to "Delete List" page for a test list
2. Note the current number of lists in "My Lists"
3. Click the "Delete" button

**Expected Results:**
- Confirmation dialog may appear OR deletion happens immediately
- User is redirected (likely to "My Lists" page)
- Deleted list no longer appears in "My Lists"
- Total list count decreases by one
- No orphaned data remains
- Success message may be displayed

#### 7.4 Cancel Delete Operation
**Steps:**
1. Navigate to "Delete List" page
2. Instead of clicking "Delete", click the "View List" tab

**Expected Results:**
- Navigation away from delete page works
- No deletion occurs
- List remains intact and accessible
- User can return to viewing the list normally
- No changes are made to the list

#### 7.5 Delete List with Many Movies
**Steps:**
1. Create a test list with 20+ movies
2. Navigate to "Delete List" page for that list
3. Click the "Delete" button

**Expected Results:**
- List is deleted regardless of movie count
- All movie associations are removed
- No performance issues during deletion
- Deletion completes successfully
- No error messages appear

#### 7.6 Verify List is Deleted
**Steps:**
1. Delete a list named "Test List to Delete"
2. Navigate to "My Lists" page
3. Search for the deleted list
4. Attempt to access the list via direct URL

**Expected Results:**
- List does not appear in "My Lists"
- Direct URL access shows 404 or "List not found" page
- List ID is no longer valid in the system
- No traces of the list remain in the interface

#### 7.7 Delete Last Remaining List
**Steps:**
1. Ensure user has only one list
2. Navigate to that list's "Delete List" page
3. Click "Delete"

**Expected Results:**
- List is deleted successfully
- "My Lists" page shows empty state or message
- User can still create new lists
- Application handles zero-list state gracefully
- No errors occur with empty list state

### 8. Navigation and List Management

**Seed:** `tests/logged-in/seed.spec.ts`

#### 8.1 Navigate Between List Management Pages
**Steps:**
1. Navigate to a list's edit page
2. Click "View List" tab
3. Click "Edit" button
4. Click "Add/Remove Movies" tab
5. Click "Choose Image" tab
6. Click "Delete List" tab
7. Click "Edit List" tab

**Expected Results:**
- All navigation tabs work correctly
- Context is maintained (same list ID throughout)
- No errors occur during navigation
- Active tab is highlighted
- Page content changes appropriately for each section
- Browser back button works correctly

#### 8.2 Use Browser Back Button
**Steps:**
1. Navigate to "My Lists" page
2. Click on a list
3. Click "Edit" button
4. Click browser back button
5. Click browser back button again

**Expected Results:**
- First back button returns to list view
- Second back button returns to "My Lists" page
- Navigation history is preserved
- No JavaScript errors occur
- Page state is maintained correctly

#### 8.3 Direct URL Access to List Pages
**Steps:**
1. Copy URL of a list view page
2. Open new browser tab
3. Paste URL and navigate
4. Copy URL of edit page
5. Open new tab and navigate to edit URL

**Expected Results:**
- Direct URL access works for all list pages
- Authentication is maintained
- List data loads correctly
- No redirect loops occur
- Appropriate page renders based on URL

#### 8.4 Access Non-Existent List
**Steps:**
1. Navigate to a list URL with invalid ID: `/list?id=invalid-id-12345&page=1`

**Expected Results:**
- Application handles invalid list ID gracefully
- 404 page or "List not found" message appears
- No application crash occurs
- User can navigate back to valid pages
- Error message is clear and helpful

### 9. List Visibility and Privacy

**Seed:** `tests/logged-in/seed.spec.ts`

#### 9.1 View Public List Indicator
**Steps:**
1. Navigate to "My Lists" page
2. Observe lists with "PUBLIC" indicator

**Expected Results:**
- Public lists display "(PUBLIC)" label
- Label is clearly visible
- Label is consistently positioned
- Public lists are easily distinguishable from private ones

#### 9.2 View Private List Indicator
**Steps:**
1. Create or navigate to a private list
2. View the list in "My Lists" page

**Expected Results:**
- Private lists display "(PRIVATE)" label OR different visual indicator
- Indicator is clear and consistent
- Private lists are distinguishable from public lists

#### 9.3 Convert Public List to Private
**Steps:**
1. Navigate to edit page for a public list
2. Change "Public List?" to "No"
3. Click "Save"
4. Navigate to "My Lists"

**Expected Results:**
- Privacy setting is updated successfully
- "My Lists" page shows "(PRIVATE)" indicator
- Previously shared URLs may show access restriction
- Change is reflected immediately

#### 9.4 Convert Private List to Public
**Steps:**
1. Navigate to edit page for a private list
2. Change "Public List?" to "Yes"
3. Click "Save"
4. Navigate to "My Lists"

**Expected Results:**
- Privacy setting is updated
- "My Lists" page shows "(PUBLIC)" indicator
- List becomes shareable via URL
- Share button becomes functional

### 10. User Profile and List Access

**Seed:** `tests/logged-in/seed.spec.ts`

#### 10.1 Access Profile Menu
**Steps:**
1. Navigate to any page in the application
2. Click the "User Profile" button in the header

**Expected Results:**
- Dropdown menu appears
- Menu contains three options: "Create New List", "My Lists", "Logout"
- Menu is properly positioned below the profile button
- Menu items are clickable

#### 10.2 Navigate from Profile Menu
**Steps:**
1. Click "User Profile" button
2. Click "My Lists"
3. Verify page loads
4. Click "User Profile" button again
5. Click "Create New List"
6. Verify page loads

**Expected Results:**
- Each menu item navigates to correct page
- Menu closes after selection
- No broken links
- Navigation is smooth and responsive

#### 10.3 Close Profile Menu
**Steps:**
1. Click "User Profile" button to open menu
2. Click anywhere outside the menu

**Expected Results:**
- Menu closes when clicking outside
- No selection is made
- User remains on current page
- Menu can be reopened

### 11. Search and Discovery

**Seed:** `tests/logged-in/seed.spec.ts`

#### 11.1 Search in Add Movies Interface
**Steps:**
1. Navigate to "Add/Remove Movies" page
2. Click in search box
3. Observe default results (popular movies)

**Expected Results:**
- Default popular movies are displayed
- Approximately 20 movies shown
- Each movie has poster and title
- Movies are current/recent releases
- List is scrollable if needed

#### 11.2 Type to Filter Movies
**Steps:**
1. Navigate to "Add/Remove Movies" page
2. Click in search box
3. Type "Dead"
4. Observe filtered results

**Expected Results:**
- Results filter in real-time as you type
- "Deadpool & Wolverine" and similar titles appear
- Irrelevant movies are filtered out
- Search is case-insensitive
- Results update smoothly

#### 11.3 Search with No Results
**Steps:**
1. Navigate to "Add/Remove Movies" page
2. Type "zzzzzzzzz12345" or other nonsensical text

**Expected Results:**
- Empty results are handled gracefully
- "No results found" message appears OR
- Empty dropdown is shown
- No JavaScript errors occur
- User can clear search and try again

#### 11.4 Clear Search
**Steps:**
1. Navigate to "Add/Remove Movies" page
2. Type a search term
3. Clear the search box

**Expected Results:**
- Clearing search returns to default popular movies
- Dropdown updates to show popular list again
- Previous search state doesn't persist incorrectly

### 12. Edge Cases and Error Handling

**Seed:** `tests/logged-in/seed.spec.ts`

#### 12.1 Rapid List Operations
**Steps:**
1. Quickly create 5 new lists in succession
2. Navigate between them rapidly
3. Edit multiple lists quickly

**Expected Results:**
- Application handles rapid operations
- No race conditions occur
- All lists are created successfully
- Data integrity is maintained
- No UI freezing or crashes

#### 12.2 Very Long List Name
**Steps:**
1. Create list with 500 character name
2. View list in various pages

**Expected Results:**
- Long names are handled gracefully
- Text is truncated with ellipsis where needed
- Tooltips show full name on hover
- Layout doesn't break
- Name is stored and retrieved fully

#### 12.3 Special Characters in List Names
**Steps:**
1. Create list with name: "Movies & Shows: 2024 Edition (Part 1) [Updated]"
2. Navigate to various pages

**Expected Results:**
- Special characters are handled correctly
- No encoding issues occur
- Characters display properly
- URLs are encoded correctly
- Search and filtering work with special characters

#### 12.4 List with 100+ Movies
**Steps:**
1. Create a list
2. Add 100+ movies to the list
3. Navigate through different pages

**Expected Results:**
- Large lists are handled efficiently
- Pagination may appear if implemented
- Performance remains acceptable
- All movies are accessible
- No memory issues occur

#### 12.5 Simultaneous Edits (If applicable)
**Steps:**
1. Open list in two different browser tabs
2. Edit name in first tab and save
3. Edit description in second tab and save

**Expected Results:**
- Application handles concurrent edits appropriately
- Last save wins OR conflict resolution occurs
- Data doesn't become corrupted
- User receives appropriate feedback

#### 12.6 Network Interruption During Save
**Steps:**
1. Begin editing a list
2. Disable network connection
3. Attempt to save changes

**Expected Results:**
- Error message indicates network issue
- User is informed save failed
- Changes are not lost (if possible)
- User can retry when connection restored
- No data corruption occurs

### 13. Visual and Layout Testing

**Seed:** `tests/logged-in/seed.spec.ts`

#### 13.1 Responsive Layout - Mobile View
**Steps:**
1. Resize browser to mobile width (375px)
2. Navigate through all list pages
3. Test all interactions

**Expected Results:**
- Layout adapts to mobile screen
- All functionality remains accessible
- Text is readable
- Buttons are tappable
- Images scale appropriately

#### 13.2 Responsive Layout - Tablet View
**Steps:**
1. Resize browser to tablet width (768px)
2. Test all list management features

**Expected Results:**
- Layout optimizes for tablet screen
- Grid layouts adjust appropriately
- Navigation remains usable
- No horizontal scrolling occurs

#### 13.3 Dark Mode Theme Toggle
**Steps:**
1. Observe current theme (light or dark)
2. Click the theme toggle (☀/☾ buttons)
3. Navigate through list pages

**Expected Results:**
- Theme toggles between light and dark
- All pages respect theme setting
- Contrast remains readable
- Theme preference persists across pages
- No visual glitches during toggle

#### 13.4 Image Loading States
**Steps:**
1. Navigate to "My Lists" with network throttling enabled
2. Observe movie poster and backdrop loading

**Expected Results:**
- Loading placeholders appear while images load
- Images load progressively
- Broken image states are handled
- Alt text is provided for accessibility
- Page layout doesn't shift as images load

### 14. Data Persistence and State Management

**Seed:** `tests/logged-in/seed.spec.ts`

#### 14.1 Page Refresh Preserves State
**Steps:**
1. Navigate to a specific list
2. Refresh the browser (F5 or Cmd+R)

**Expected Results:**
- Page reloads to same list
- All data is preserved
- User remains on same page
- No data loss occurs

#### 14.2 Create List and Immediately View
**Steps:**
1. Create new list "Fresh List"
2. Immediately after creation, navigate to "My Lists"
3. Click on "Fresh List"

**Expected Results:**
- New list appears immediately in "My Lists"
- List is clickable and accessible
- No delay in list availability
- All entered data is present

#### 14.3 Edit and Verify Across Sessions
**Steps:**
1. Edit a list's name and description
2. Log out
3. Log back in
4. Navigate to the edited list

**Expected Results:**
- Changes persist across sessions
- Edited data is retained
- No data loss occurs during logout/login
- List state is correctly restored

## Test Execution Notes

### Prerequisites
- User must be logged in before executing these tests
- Application must be running on `http://localhost:3000`
- TMDB API must be accessible for movie data
- Test data should be in a known state (use seed file)

### Test Data Considerations
- Use unique list names for each test scenario to avoid conflicts
- Clean up test data after scenario completion where appropriate
- Some scenarios may require specific list configurations from seed data

### Browser Compatibility
- Tests should be executed on major browsers: Chrome, Firefox, Safari, Edge
- Mobile browser testing recommended for responsive scenarios
- Ensure consistent behavior across all supported browsers

### Performance Benchmarks
- List page should load within 2 seconds
- Movie search results should appear within 500ms
- List creation should complete within 1 second
- Image loading should not block interface interaction

### Accessibility Considerations
- All interactive elements should be keyboard accessible
- Screen reader compatibility should be verified
- Color contrast should meet WCAG AA standards
- Focus indicators should be visible
- ARIA labels should be present on key elements

## Known Limitations

1. **Share Dialog**: May require clicking backdrop to close (Escape key handling needs verification)
2. **Movie Search**: Limited to TMDB database availability
3. **Image Selection**: Images limited to backdrops from movies in the list
4. **List Ordering**: Test if lists maintain creation order or if custom sorting is available
5. **Pagination**: Verify if pagination exists for lists with many movies

## Success Criteria

A successful test execution should demonstrate:
- ✅ All CRUD operations (Create, Read, Update, Delete) work correctly for lists
- ✅ Movie management (add/remove) functions without errors
- ✅ Privacy settings are respected and enforced
- ✅ Navigation is intuitive and error-free
- ✅ Data persistence across sessions
- ✅ Responsive design adapts to different screen sizes
- ✅ Share functionality generates correct URLs
- ✅ Error states are handled gracefully
- ✅ Performance meets acceptable standards
- ✅ Accessibility requirements are met
