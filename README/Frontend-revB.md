## Frontend Architecture Overview
This frontend is a JavaScript app built with static HTML pages and modular JS components under `src/components`. It relies on:

- A shared in‑memory tutorials array (`voltaraTutorials`) loaded from the backend.
- JWT‑based authentication stored in `localStorage`.
- Plain DOM manipulation (no framework) for rendering and updating views.
- A reusable `Pagination` utility for large lists.
- Bootstrap 5 and Font Awesome for styling and layout.
- Centralised backend configuration via `config-const.js`.

The backend API base URL is configured in `src/components/config-const.js`:

- `const API_BASE_URL = 'http://localhost:8890/api/v1';`
- `const UPLOADS_BASE_URL = \`${API_BASE_URL}/uploads/\`;` – used for images, BOM files, etc.


## File & Page Structure

### Top‑level pages

- `index.html` – Landing page with featured tutorials, curated collection, category filters, global search and newsletter subscription.
- `tutorials-explore.html` – Explore page listing all tutorials with category filters and pagination.
- `tutorial-details.html` – Detail page for a single tutorial (title, media, BOM and related tutorials).
- `user-page.html` – Authenticated user dashboard for uploading and managing the logged‑in user’s tutorials.
- `admin-page.html` – Admin dashboard (manage tutorials and users).

### Key JS components (under `src/components/`)

**Configuration & shared data**

- `config-const.js`
  - Define `API_BASE_URL` and `UPLOADS_BASE_URL` used by all network calls.
- `tutorials-loader.js`
  - Global tutorial fetch & caching.
  - Owns:
    - `let voltaraTutorials = []`
    - `async function ensureTutorialsLoaded()` – fetch tutorials once and store the Promise.
- `tutorials-pagination.js`
  - `class Pagination` – reusable pagination helper used by homepage, explore and search views.
- `tutorials-search.js`
  - Global search feature:
    - Listen to `#search-input`.
    - Filter `voltaraTutorials` by title/description.
    - Render results into `#results` with its own pagination.
- `tutorials-curated.js`
  - Curated Collections on the homepage:
    - Use `voltaraTutorials` to select up to 3 curated tutorials with a proficiency/likes weighting.

**Public views**

- `index.js`
  - Landing page featured tutorials, category filters, curated section integration.
  - Newsletter subscription validation (`submitForm`).
  - Shared toast & notification:
    - `showToast({ bgColor, msg })` – Bootstrap toast wrapper.
    - `showNotification(message, type)` – to interface showToast() with other previous similar function (showNotification).
- `tutorials-explore.js`
  - Explore page grid and filters:
    - `renderExploreTutorialCard(tutorial)` – card HTML.
    - `filterExploreTutorials(category)` – filter `voltaraTutorials` and paginate.
    - `startExploreTutorials()` – initialisation on `DOMContentLoaded`.
- `tutorial-details.js`
  - Tutorial detail rendering:
    - Extract `id` from URL query string.
    - Fetch the tutorial from `voltaraTutorials`.
    - Render:
      - Header (title, tags, creator),
      - Main image,
      - Description,
      - Schematic and layout images (if present),
      - BOM (image/CSV/other),
      - Related tutorials by the same creator.

**Auth & navbar**

- `script.js`
  - Login/signup modal, form binding and navbar auth state.
  - Handle `POST` to `/public/signin` and `/public/signup`.
  - Store token and user metadata in `localStorage`.
- `auth.js`
  - JWT helper:
    - `isAuthenticated()`, `requireAuth()`.
    - `getAuthHeaders()` – build `Authorization: Bearer <token>` headers.
    - `logout()` – clear auth, shows toast via `showToast`, then redirect.
  - On `DOMContentLoaded`, enforce auth on `user-page.html`.
- `profilemodal.js`
  - Profile update modal and `/user/update` integration.
  - Use `getAuthHeaders()` and `showNotification()`.

**User dashboard**

- `user-page.js`
  - User dashboard controller for `user-page.html`:
    - On `DOMContentLoaded`:
      - Verify auth (`isAuthenticated()`),
      - Populate user name/email,
      - Show either Upload or My Tutorials section depending on state.
  - Tutorial list:
    - `loadUserTutorials()` → `GET ${API_BASE_URL}/tutorial/user/{userId}` using `getAuthHeaders()`.
    - `renderTutorialsTable(tutorials)` – table of the user’s tutorials (category, proficiency, created date, actions).
  - Tutorial upload:
    - `addProject()` – builds JSON tutorial metadata + `FormData`:
      - `{ title, description, content, user: { id }, category: { id }, proficiency, curated: false }`
      - `bill_of_materials` and optional `image_main` files.
    - Send `POST ${API_BASE_URL}/tutorial` (multipart upload with JWT).
    - On success, shows notification and either:
      - Redirect to `tutorial-details.html?id=<newId>`, or
      - Reset form and refreshes My Tutorials.
  - Additional helper for file preview and view switching.
- `user-page.css`
  - Styles for the user dashboard layout and tables.

**Admin dashboard**

- `admin-page.js`
  - Entrypoint for `admin-page.html`.
  - On `DOMContentLoaded`:
    - Sidebar buttons:
      - “Manage users” → user statistics/search view.
      - “Manage tutorials” → unified tutorials management view.
    - Use:
      - `ensureTutorialsLoaded()` from `tutorials-loader.js`.
      - `ensureUsersLoaded()` from `manage-users.js` / `users-loader.js`.
- `users-loader.js`
  - Shared loader for admin users:
    - `ensureUsersLoaded()`:
      - `GET ${API_BASE_URL}/admin/users` with admin JWT.
      - Populate global `voltaraUsers`.
      - Set `adminUsersUnauthorized` flag on 403.
- `manage-users.js`
  - Admin “Manage users” view:
    - `buildUserStats()` – join `voltaraUsers` with `voltaraTutorials` to compute per‑user tutorial counts and total likes.
    - `renderUserSearchView()` – render a searchable table of users.
    - `deleteUser(userId)` – `DELETE ${API_BASE_URL}/admin/users/{id}` with admin JWT; update local stats and re‑renders.
- `manage-tutorials.js`
  - Admin tutorials management:
    - `buildTutorialsList()` – simplify `voltaraTutorials` into `adminTutorials[]` with `{ id, title, category, proficiency, curated, likes }`.
    - `renderAdminProjectTable(tutorials)` – table rows with curated checkbox column.
    - `renderUnifiedTutorialsView()` – unified filters:
      - Category (Arduino/ESP32/etc.),
      - Curated vs non‑curated,
      - Proficiency (BEGINNER/INTERMEDIATE/ADVANCE).
    - Additional view like `renderCategoryView()` for checkbox‑based category filters.
- `curated-set-reset.js`
  - Admin curated flag helpers:
    - `setTutorialCurated(tutorialId, curated, adminToken)` – `PATCH /admin/tutorial/{id}/curated?curated=true|false`.
    - `curatedToggle()` – wire `.admin-curated-toggle` checkbox to the backend with admin JWT.
- `admin-page.css`
  - Styles for admin layout, filter panels and tables.

**Global styling**

- `styles.css`
  - Shared layout card styles (e.g. `.tutorial-card`, `.tutorial-card-body`, `.tutorial-card-title`, `.tutorial-card-desc`).


## Shared Data & Async Fetch

### Global tutorial list: `ensureTutorialsLoaded()`

Defined in `tutorials-loader.js`.

- Expose:
  - `let voltaraTutorials = []` – global array of all tutorials.
  - `async function ensureTutorialsLoaded()` – fetches tutorial data once and caches the Promise.
- Flow:
  1. On first call:
     - Sends `GET ${API_BASE_URL}/tutorial`.
  2. On success:
     - `voltaraTutorials = await response.json()`.
     - Attempt to cache JSON in `localStorage` (errors are logged, not fatal).
  3. On error:
     - Log error, sets `voltaraTutorials = []`.
  4. Subsequent calls reuse the same `tutorialsFetch` Promise, avoiding duplicate requests.

This shared `voltaraTutorials` array is the source of truth for:

- Homepage featured projects & curated collection.
- Explore tutorials page.
- Tutorial details page.
- Search results.
- Admin tutorials views.
- Any other future views using tutorials data.

### Pagination

Implemented in `tutorials-pagination.js` as a `Pagination` class.

- Constructor (usage):

      new Pagination(data, itemsPerPage, containerId, paginationId, renderCallback)

  - `data` – full array to paginate (e.g. filtered tutorials).
  - `itemsPerPage` – items per page (e.g. 6 or 9).
  - `containerId` – ID of the grid container to fill with cards.
  - `paginationId` – ID of the container that holds `<ul class="pagination">`.
  - `renderCallback(item)` – function that returns HTML for a single item.

- `start()`:
  - Calculates total pages.
  - Renders the first page of items into `containerId`.
  - Builds Previous/Next and numbered pagination buttons.
  - Attaches click handlers and scroll‑to‑top behaviour.

Used in:

- Homepage featured projects (`index.js`).
- Explore tutorials (`tutorials-explore.js`).
- Search results (`tutorials-search.js`).


## Authentication & JWT

### Login / Signup Flow

Implemented mainly in `script.js`:

- Sign in:
  - `POST ${API_BASE_URL}/public/signin` with body:

        { "email": "...", "password": "..." }

- Sign up:
  - `POST ${API_BASE_URL}/public/signup` with body:

        {
          "userName": "...",
          "email": "...",
          "password": "..."
        }

- On success:
  - Parse JSON response.
  - Store in `localStorage`:
    - `authToken` – access token (JWT).
    - `refreshToken` (if present).
    - `userName`, `userEmail`.
    - `userId` – numeric ID from response.
    - `isAdmin` – derived from roles/authorities in the response.
  - Update navbar auth button/state.
  - Redirect to `index.html`.

- On error:
  - Handle various HTTP status codes.
  - Display appropriate Bootstrap alerts/notifications.

### JWT Helpers

`auth.js` (and usage in `user-page.js`) provides:

- `isAuthenticated()` – check presence (and optionally expiry) of the JWT.
- `requireAuth()` – redirect unauthenticated users from protected pages to `index.html`.
- `getAuthHeaders()` – return an object like:

      {
        Authorization: `Bearer <token>`,
        'Content-Type': 'application/json'
      }

- `logout()` – clear auth keys in `localStorage`, shows a toast via `showToast`, then redirects.

Protected pages (e.g. `user-page.html`, admin views) guard access by checking auth on `DOMContentLoaded` and using `getAuthHeaders()` for API calls.


## Public Browsing Data Flow

### 1. Landing Page (`index.html`) – Featured & Curated

Logic is in `index.js` and `tutorials-curated.js`.

- Initial load:

  1. On `DOMContentLoaded`, check for `#featured-projects-grid`.
  2. If `voltaraTutorials` already filled:
     - Clear the grid and calls `initialiseFeaturedProjects()`.
  3. Otherwise:
     - Show a spinner in the grid.
     - Call `ensureTutorialsLoaded()`. When resolved:
       - If no tutorials → “No tutorials available.”
       - Else → clear spinner and run `initialiseFeaturedProjects()`.

- Featured grid:

  - `initialiseFeaturedProjects()`:
    - Validate that `voltaraTutorials` and `Pagination` are available.
    - Call `filterProjectsByCategory('ALL')` to show all tutorials.
    - Set up category filter buttons via `setupCategoryButtons()`.

  - `filterProjectsByCategory(category)`:
    - Filter `voltaraTutorials` by `project.category.name` (case‑insensitive), or uses all when `ALL`.
    - Create a `Pagination` instance (9 per page) with `renderProjectCard(project)` and starts it.

- Curated collection:

  - `tutorials-curated.js`:
    - Use `voltaraTutorials` as `projectData`.
    - `updateCuratedCollections(category)`:
      - Pick up to 3 curated tutorials, weighted by proficiency (`BEGINNER`, `INTERMEDIATE`, `ADVANCE`) and sorted by likes.
      - Fill the curated cards in `#curatedProjectCardGroup`.

### 2. Explore Page (`tutorials-explore.html`)

Logic in `tutorials-explore.js`.

- On `DOMContentLoaded`:

  - Check for `#explore-projects-grid`.
  - If tutorials already present:
    - Clear the grid and calls `startExploreTutorials()`.
  - Else:
    - Show a spinner and waits on `ensureTutorialsLoaded()`.
    - If still no tutorials → “No tutorials available.”
    - Else → clears spinner and calls `startExploreTutorials()`.

- `startExploreTutorials()`:

  - Validates that `voltaraTutorials` and `Pagination` are available.
  - Call `filterExploreTutorials('ALL')` to render all tutorials.
  - Set up `.btn-filter` category buttons:
    - Clicking a filter re‑filters `voltaraTutorials`, construct a new `Pagination` (6 per page), and start it.

### 3. Tutorial Details Flow (`tutorial-details.html`)

Logic in `tutorial-details.js`.

User flow:

1. User click a card on any list (home/explore/search/admin/user):
   - `<a href="tutorial-details.html?id=<ID>">…</a>`
2. Browser load `tutorial-details.html` with `?id=<ID>` query string.

Page logic:

- On load / initialisation:

  1. Read tutorial ID from URL via `getTutorialIdFromURL()` (`URLSearchParams`).
  2. Find the tutorial in `voltaraTutorials` via `getTutorialById(id)`.
  3. If not found:
     - Show an error message in `#project-header`.
  4. If found:
     - Render:
       - Title and tags (`renderTutorialHeader`).
       - Hero/main image (`renderMainImage`).
       - Long description (`renderDescription`).
       - Optional schematic and layout images (`renderSchematic`, `renderLayout`).
       - BOM (`renderBOM`), including:
         - Inline image + download button for image‑type BOM,
         - Download button for CSV/other types.
       - Related tutorials from same creator (`renderCreatorTutorials`).

No extra fetch call is made for the tutorial detail itself; the data comes from the shared `voltaraTutorials` array.


## Search Feature

Implemented in `tutorials-search.js` and designed to be reusable on any page that opts in.

- On load:

  - Grab references to:
    - `const searchInput = document.getElementById('search-input');`
    - `const resultsContainer = document.getElementById('results');`
    - `const searchProjectsGrid = document.querySelector('.search-projects-grid');`

- `search(query)`:

  - Filter `voltaraTutorials`:
    - Check `title` and `description` fields (case‑insensitive).

- `displayResults(results, query)`:

  - Clear previous results.
  - If none → show “No results found” message for that query.
  - Otherwise:
    - Render a heading with the query and result count.
    - Create a `Pagination` instance:
      - 9 results per page,
      - Container `#search-results-grid`,
      - Pagination container `#search-pagination`,
      - Card renderer `renderSearchResultCard(project)`.

- Input behaviour:

  - On `input` event of `searchInput`:
    - If query is non‑empty:
      - Hides the main grids (e.g. featured or explore) and their pagination (`#featured-projects-pagination`, `#explore-projects-pagination`).
      - Call `search(query)` and `displayResults(results, query)`.
    - If query becomes empty:
      - Restore main grids and their pagination.
      - Clear search results container and resets `searchPagination`.

- On `window.load`:

  - `clearSearchOnPageLoad()`:
    - Reset search input, clears previous results.
    - Restore visibility of any main grids and paginations.


## User Dashboard & Upload Flow

Implemented mainly in `user-page.js` (used by `user-page.html`), together with `auth.js` and the shared notification/toast helpers.

### Access Control

- On `DOMContentLoaded`:

  - `user-page.js`:
    - Call `isAuthenticated()` (from `auth.js`).
    - If not authenticated → redirect to `index.html`.
    - Read `userName` / `userEmail` from `localStorage` to update navbar/profile fields.
    - initialise dashboard sections:
      - Show Upload or My Tutorials based on state (e.g. `openMyTutorials` flag in `localStorage`).

### Listing “My Tutorials”

- `loadUserTutorials()`:

  1. Show a loading indicator.
  2. Read `userId` from `localStorage`.
  3. Send:

     - `GET ${API_BASE_URL}/tutorial/user/{userId}` with `getAuthHeaders()` (JWT).

  4. On success:
     - Call `renderTutorialsTable(tutorials)` to populate a table with:
       - Title, category, proficiency badge, created date, and actions (view/delete as implemented).
  5. On `401`:
     - Call `logout()` and force re‑login (token expired or invalid).

### Uploading (Posting) a Tutorial

- `addProject()`:

  1. Validate that all required form fields are filled:
     - Title, category/platform, description, content, proficiency, and at least one BOM file.
  2. Read `userId` from `localStorage`.
  3. Build `tutorialData` in the format expected by the backend:

        {
          "title": "...",
          "description": "...",
          "content": "...",
          "user": { "id": <userId> },
          "category": { "id": <categoryId> },
          "proficiency": "BEGINNER|INTERMEDIATE|ADVANCE",
          "curated": false
        }

  4. Build a `FormData`:

     - `formData.append('data', JSON.stringify(tutorialData))`
     - `formData.append('bill_of_materials', bomFile)`
     - Optionally: `formData.append('image_main', imageFile)`

  5. Send:

     - `POST ${API_BASE_URL}/tutorial`
     - Header: only `Authorization` (lets the browser set `Content-Type` for multipart).

  6. On success:

     - Show a success notification.
     - If response contains a new tutorial id:
       - After a short delay, redirects to `tutorial-details.html?id=<id>`.
     - Else:
       - Reset the form, clears previews and refreshes the “My Tutorials” table.

This flow demonstrates multipart uploads with JSON + files driven by `FormData`, authenticated via JWT.


## Admin Dashboard & Tutorial Management

Admin UI is defined in `admin-page.html` and wired by `admin-page.js`, `manage-tutorials.js`, `manage-users.js`, `users-loader.js` and `curated-set-reset.js`.

### Overall Flow

- `admin-page.html`:

  - Sidebar with entries like “Manage users” and “Manage tutorials”.
  - Main content area: `#admin-main-content`.

- `admin-page.js`:

  - On `DOMContentLoaded`:
    - Bind click handlers for:
      - Manage Users:
        1. Show a loading message and sets the main title.
        2. Call `Promise.all([ensureTutorialsLoaded(), ensureAdminUsersLoaded()])` to fetch tutorials and users.
        3. Call `buildUserStats()` (from `manage-users.js`) to generate user stats.
        4. Show:
           - “Admin login required …” if unauthorized,
           - “No users available.” if empty,
           - Otherwise: `renderUserSearchView()` to display search + table.
      - Manage Tutorials:
        1. Show “Loading projects…” and sets the title.
        2. Call `ensureTutorialsLoaded()`.
        3. Call `buildTutorialsList()` (from `manage-tutorials.js`) to normalise tutorial data.
        4. If no tutorials → “No projects available”.
        5. Otherwise → `renderUnifiedTutorialsView()`.

### Tutorial Management (`manage-tutorials.js` + `curated-set-reset.js`)

- `buildTutorialsList()`:

  - Map `voltaraTutorials` into `adminTutorials`:

        { id, title, category, proficiency, curated, likes }

- `renderAdminProjectTable(tutorials)`:

  - Render `<tr>` rows with ID, title (linked to `tutorial-details.html`), category, proficiency, likes and a curated checkbox (`.admin-curated-toggle`).

- `renderUnifiedTutorialsView()`:

  - Render a unified filter panel with:
    - Category dropdown (Arduino, ESP32, IoT, etc.).
    - Curated filter (all/curated/non-curated).
    - Proficiency filter (BEGINNER/INTERMEDIATE/ADVANCE).
  - Apply filters client‑side to `adminTutorials`.
  - Update the table body and re‑attaches curated toggle handlers.

- `curated-set-reset.js`:

  - `setTutorialCurated(tutorialId, curated, adminToken)`:

        PATCH ${API_BASE_URL}/admin/tutorial/{tutorialId}/curated?curated=true|false

  - `curatedToggle()`:

    - Find `.admin-curated-toggle` checkboxes.
    - On change:
      - Validate `authToken` and `isAdmin === 'true'` in `localStorage`.
      - Call `setTutorialCurated(...)`.
      - Update checkbox state based on backend response.
      - On error, reverts checkbox and shows an alert.

### User Management (`manage-users.js` + `users-loader.js`)

- `users-loader.js`:

  - `ensureUsersLoaded()`:

        GET ${API_BASE_URL}/admin/users

    - Use `Authorization: Bearer <token>` if present.
    - Populate global `voltaraUsers`.
    - Set `adminUsersUnauthorized` on 403 and logs errors.

- `manage-users.js`:

  - `buildAdminUserStats()`:

    - Combine `voltaraUsers` with `voltaraTutorials` to compute, per user:
      - Registration date,
      - Number of tutorials,
      - Total likes across tutorials.

  - `renderUserSearchView()`:

    - Renders:
      - Search input for username/email.
      - Table with columns: ID, Username, Email, Registered, Tutorials, Total Likes, Suspend, Delete.
    - Filter are done client‑side on `UserStats`.

  - `deleteUser(userId)`:

    - Ask for confirmation.
    - Send `DELETE ${API_BASE_URL}/admin/users/{userId}` with admin JWT.
    - On success:
      - Show a success notification (via `showNotification`).
      - Remove user from `adminUserStats` and re‑renders the view.
    - On error:
      - Show an error notification and logs details.


## Key Concepts Recap

- **Async fetch and caching**
  - `ensureTutorialsLoaded()` fetche tutorials once and shares them via `voltaraTutorials` across multiple pages.
  - Admin users use `ensureUsersLoaded()` and `voltoraUsers` to avoid redundant network calls.
  - User and admin flows reuse shared data for consistent views.

- **JWT authentication**
  - Login/signup use JSON POSTs to `/public/signin` and `/public/signup`.
  - Tokens are stored in `localStorage` and attached via `Authorization: Bearer <token>` for protected endpoints.
  - `auth.js` and page scripts (`user-page.js`, admin modules) decode tokens, build headers and gate protected pages.

- **DOM‑driven UI**
  - No front‑end framework is used; everything is done with:
    - `document.querySelector` / `getElementById`,
    - `innerHTML` updates,
    - `addEventListener` for click, input, submit, etc.
  - `index.html`, `tutorials-explore.html`, `tutorial-details.html`, `user-page.html` and `admin-page.html` act as templates whose dynamic areas are filled by JS modules.

- **Search and pagination**
  - Search is client‑side, filtering `voltaraTutorials` and paginating results with the shared `Pagination` class.
  - List (featured, explore, search) are all different filters over the same base tutorial data.

- **Multipart uploads**
  - Uploading a tutorial uses `FormData` with:
    - A JSON payload for tutorial metadata (`data`),
    - File for BOM and main image.
  - The backend parses mixed JSON + files; the frontend only needs to shape the data correctly.

This structure is designed so that adding a new view usually means:
- Creating a new HTML section or page,
- Adding a small JS module under `src/components` that:
  - Use `ensureTutorialsLoaded()` / `ensureUsersLoaded()` as needed,
  - Render into a specific container,
  - Reuse `Pagination`, `tutorials-search.js` and `showNotification` where appropriate.

##Features not implemented at the moment:
- Likes
- Public Q&A
- Discussion Forum
These features require moderate to significant modifications in backend including new column, new table in MySQL database, new API endpoints with DELETE capability for public (for "unlike") and significant DOM manipulation and additional UI.


