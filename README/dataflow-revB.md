## 14. End-to-End Data Flow (Frontend ↔ Backend ↔ MySQL)

This section explains how data flows between the frontend, backend, and MySQL for key use cases:

- Public/user signup
- Public/user signin
- Browsing tutorials (public)
- Posting a tutorial (authenticated user/admin)
- Admin management (tutorials and users)

---

### 14.1 Shared Building Blocks

**Frontend**

- Static HTML pages:
  - `index.html`, `tutorials-explore.html`, `tutorial-details.html`, `user-page.html`, `admin-page.html`.
- Modular JS components under `src/components`:
  - `config-const.js` – define `API_BASE_URL` and `UPLOADS_BASE_URL`.
  - `tutorials-loader.js` – `ensureTutorialsLoaded()` and shared `voltaraTutorials` array.
  - `tutorials-pagination.js` – `Pagination` class for all paged tutorial lists.
  - `index.js`, `tutorials-explore.js`, `tutorial-details.js` – public browsing views.
  - `user-page.js` – user dashboard for “My Tutorials” and uploads.
  - `admin-page.js`, `manage-tutorials.js`, `manage-users.js`, `users-loader.js`, `curated-set-reset.js` – admin views.
  - `script.js`, `auth.js` – login/signup and auth helpers.
- Use `fetch` to call REST APIs.
- After signin:
  - Store `authToken`, `refreshToken`, `userId`, `userName`, `userEmail`, `isAdmin` in `localStorage`.
  - Add `Authorization: Bearer <token>` for protected endpoints via `getAuthHeaders()` (in `auth.js` / `user-page.js`).

**Backend**

- Controllers:
  - `AuthController` or `UserController` – signup, signin, user profile, admin user management (`/public/*`, `/admin/users`).
  - `TutorialController` – tutorial CRUD and public read/search (`/tutorial/**`).
  - `AdminTutorialController` – curated flag and admin tutorial operations (`/admin/tutorial/**`).
- Services:
  - `AuthService`, `UserService`, `TutorialService`, `AdminTutorialService`.
- Repositories:
  - `UserRepository`, `TutorialRepository`, 
  - Category list is fixed to 8 categories (IDs stable):
    1. Arduino
    2. ESP32
    3. IoT
    4. PCB Design
    5. Raspberry Pi
    6. Robotics
    7. Sensors
    8. STM32
- Security:
  - `SecurityConfig`, `JwtAuthFilter`, `JwtUtils`, `UserDetailsService`, `User` (implements `UserDetails`).
- Persistence:
  - JPA/Hibernate entities (`User`, `Tutorial`, `Category`) mapped to MySQL tables:
    - `users`, `tutorials`, `categories`.

---

### 14.2 Public Signup Flow

**Actor**: Public (no authentication)  
**Endpoint**: `POST /api/v1/public/signup`

**Frontend → Backend**

1. User open landing page (`index.html`).
2. Signup form is handled by JS in `script.js`:
   - Collect `userName`, `email`, `password` from the form.
3. Frontend send JSON:

        {
          "userName": "alice",
          "email": "alice@example.com",
          "password": "12345678"
        }

4. Request:

   - Method: `POST`
   - URL: `/api/v1/public/signup`
   - Headers:

        Content-Type: application/json

**Backend Processing**

1. Request reach `UserController.signup(...)`.
2. Controller:
   - Validate required fields and uniqueness of `email`.
   - Call `AuthService.registerUser(signupRequest)`.
3. `AuthService`:
   - Hash password.
   - Create and saves `User` entity via `UserRepository`.
   - Assign default role (e.g. `ROLE_USER`).
4. DB:
   - Insert new row into `users` table.
5. Controller return success JSON (basic info or generic message).

**Backend → Frontend**

- On success:
  - Frontend may:
    - Show success notification.
    - Redirect to signin page or keep user on same page.
- On error:
  - Backend returns appropriate status code (e.g. `409 CONFLICT` for duplicate email).
  - Frontend shows the error message in the form.

---

### 14.3 Public Signin Flow (JWT Issuance)

**Actor**: Public (user with existing account)  
**Endpoint**: `POST /api/v1/public/signin`

**Frontend → Backend**

1. User fill signin form (email + password) in login modal.
2. `script.js` sends JSON:

        {
          "email": "alice@example.com",
          "password": "12345678"
        }

3. Request:

   - Method: `POST`
   - URL: `/api/v1/public/signin`
   - Headers:

        Content-Type: application/json

**Backend Processing**

1. Request reach `UserController.signin(...)` (or `AuthController`).
2. Controller call `AuthService.authenticate(email, password)`.
3. `AuthService`:
   - Use Spring Security to validate credentials via `AuthenticationManager` / `UserDetailsService`.
   - On success:
     - Generate JWT access token (and optional refresh token) using `JwtUtils`.
     - Determine authorities (e.g. `ROLE_USER`, `ROLE_ADMIN`).
4. Response body typically includes:

        {
          "authToken": "<jwt>",
          "refreshToken": "<refresh>",
          "userId": 1,
          "userName": "alice",
          "email": "alice@example.com",
          "roles": ["ROLE_USER"]
        }

**Backend → Frontend**

- On success:
  - `script.js` stores values in `localStorage`:
    - `authToken`, `refreshToken`, `userId`, `userName`, `userEmail`, `isAdmin`.
  - Update navbar (login/logout button).
  - Redirect to `index.html` or remains on page depending on UX.
- On error:
  - Backend return `401` or `403` with error JSON.
  - Frontend show a toast/alert and clears any stale tokens.

---

### 14.4 Browsing Tutorials (Public Read Access)

**Actor**: Public, User, or Admin (no login required just to browse)

**Main endpoints** (all `GET`):

- List all tutorials: `GET /api/v1/tutorial`
- Tutorial details: `GET /api/v1/tutorial/{id}`
- Tutorials by user: `GET /api/v1/tutorial/user/{id}`
- Tutorials by category: `GET /api/v1/tutorial/category/{id}`
- Filtered search: `GET /api/v1/tutorial/search?userId=&categoryId=&proficiency=&curated=`
- Tutorial IDs only: `GET /api/v1/tutorial/ids`
- Serve uploads (images/BOM): `GET /api/v1/uploads/{fileName}`

`SecurityConfig` explicitly permits:

- `GET /api/v1/tutorial/**`
- `GET /api/v1/category/**`
- `GET /api/v1/uploads/**`

So no JWT is required to read tutorial and category data.

**Frontend → Backend**

- `tutorials-loader.js`:

  - Global state:

        let voltaraTutorials = [];
        let tutorialsFetch = false;

  - `async function ensureTutorialsLoaded()`:

    - On first call:
      - If `tutorialsFetch` is falsy, starts a new fetch:

            GET /api/v1/tutorial

      - Stores the resulting Promise in `tutorialsFetch`.
      - Fills `voltaraTutorials` with the JSON array.

    - On subsequent calls:
      - Returns the same Promise (`tutorialsFetch`) so the tutorials are fetched only once per page load.

- This function is used by:
  - `index.js` – to show featured/latest tutorials.
  - `tutorials-explore.js` – to populate the explore list and filters.
  - `tutorial-details.js` – as a fallback if a single tutorial is not found yet.
  - `admin-page.js` – to provide tutorial data for admin dashboards.

**Backend Processing**

Example: `GET /api/v1/tutorial`

1. Request reachs `TutorialController.getAll(...)`.
2. Controller calls `TutorialService.findAll()`.
3. `TutorialService` calls `tutorialRepository.findAll()`:
   - JPA loads `Tutorial` rows from MySQL.
4. If no records:
   - Returns an empty list or raises a `ResourceNotFoundException` depending on implementation.
5. Non-empty list is returned as JSON.

Search and filter methods use repository queries such as:

- `findByUser_Id(userId)`
- `findByCategory_Id(categoryId)`
- `findByProficiency(proficiency)`
- `findByCurated(curated)`
- Combinations like `findByCategory_IdAndProficiencyAndCurated(...)`.

Uploads:

- `GET /api/v1/uploads/{fileName}` is mapped to local files by a resource handler:
  - `ApiConfig.addResourceHandlers` maps `/api/v1/uploads/**` to the directory `file.upload-dir` on disk.

**Backend → Frontend**

- Frontend receive tutorial objects with fields such as:
  - `id`, `title`, `description`, `content`, `curated`, `proficiency`, `user`, `category`, `likes`.
  - `fileBom`, `imageMain`, `imageSchematic`, `imageLayout` (filenames).
- Frontend build asset URLs using `UPLOADS_BASE_URL`:

      {API_BASE_URL}/uploads/{imageMain}

- JS modules:
  - `index.js` – render cards on the home page.
  - `tutorials-explore.js` – render cards, applies filters, uses `Pagination`.
  - `tutorial-details.js` – show full content, BOM download, images, and “More Tutorials” sidebar.

---

### 14.5 Posting a Tutorial (Authenticated User/Admin)

**Actor**: Authenticated User or Admin  
**Endpoint**: `POST /api/v1/tutorial`

**Frontend → Backend**

1. User sign in; `authToken` and `userId` are in `localStorage`.
2. On `user-page.html`, `user-page.js` provides an upload form for new tutorials.
3. User fill:
   - Title, description, content.
   - Category (select list using fixed category IDs).
   - Proficiency.
   - Optional curated flag for admins (if UI supports it).
   - Chooses BOM file and images.

4. `user-page.js` build a `FormData` object:

   - Entry `data` containing JSON (tutorial metadata):

         {
           "user": { "id": 1 },
           "category": { "id": 3 },
           "title": "My ESP32 Project",
           "description": "Intro...",
           "content": "Full tutorial content...",
           "curated": false,
           "proficiency": "BEGINNER"
         }

   - File entries:
     - `bill_of_materials` – BOM (PDF/XLS/CSV).
     - `image_main` – main image.
     - `image_layout` – optional.
     - `image_schematic` – optional.

5. The request:

   - Method: `POST`
   - URL: `/api/v1/tutorial`
   - Headers:

        Authorization: Bearer <token>

   - Body: multipart/form-data (browser sets boundary automatically).

6. `SecurityConfig`:

   - Require authentication for this endpoint.
   - `JwtAuthFilter`:
     - Extract token from `Authorization` header.
     - Validate and sets security context for the user.

**Backend Processing**

1. `TutorialController.save(...)` handle multipart request.
2. Controller:
   - Read `data` param (JSON string) and file parts.
   - Use `ObjectMapper` to map `data` into a `Tutorial` entity.
3. Call:

       TutorialService.save(tutorial, bill_of_materials, image_main, image_layout, image_schematic);

4. `TutorialService.save`:

   1. Persist base tutorial:

          tutorialRepository.saveAndFlush(tutorial);

      - Insert into `tutorials` table, generating an `id`.

   2. Process files for each non-null part:

      - Generate unique filenames:

            bom_{timestamp}_{originalName}
            main_{timestamp}_{originalName}
            layout_{timestamp}_{originalName}
            schematic_{timestamp}_{originalName}

      - Build disk paths:

            uploadDir + File.separator + fileName

      - Save files using `MultipartFile.transferTo(...)`.
      - Set filename fields on the tutorial entity:

            setFileBom(fileName)
            setImageMain(fileName)
            setImageLayout(fileName)
            setImageSchematic(fileName)

   3. Save tutorial again with filenames:

          tutorialRepository.save(tutorial);

5. Controller returns created tutorial JSON with status `201 CREATED`.

**Backend → Frontend**

- `user-page.js` receive the created tutorial.
- On success:
  - Shows success notification.
  - If response contains tutorial `id`, it can redirect to:

        tutorial-details.html?id={id}

  - Optionally refreshes the “My Tutorials” list using `loadUserTutorials()`.

---

### 14.6 Deleting a Tutorial (Authenticated User)

**Actor**: Authenticated User  
**Endpoint**: `DELETE /api/v1/tutorial/{id}`

**Frontend → Backend**

- On `user-page.html`, `deleteTutorial(tutorialId)` is used:

  1. User click delete button in the “My Tutorials” table.
  2. `deleteTutorial` confirms via `window.confirm`.
  3. Send:

         DELETE /api/v1/tutorial/{tutorialId}
         Authorization: Bearer <token>

**Backend Processing**

1. Request reach `TutorialController.delete(id)`.
2. Controller call `TutorialService.deleteById(id, currentUser)`.
3. `TutorialService`:
   - Ensure requester is:
     - Owner of the tutorial, or
     - Has `ROLE_ADMIN`.
   - Delete the tutorial row from `tutorials` table.
   - Optionally delete the associated files from disk.
4. Return `204 NO CONTENT` or `200 OK`.

**Backend → Frontend**

- On success:
  - `deleteTutorial` show success notification.
  - Call `loadUserTutorials()` to reload the list.
- On error:
  - 401 → trigger `logout()` and redirect to signin.
  - Other errors → shows error message to user.

---

### 14.7 Admin-Specific Flows (Tutorials and Users)

**Actor**: Admin (has `ROLE_ADMIN`)  

#### 14.7.1 Admin Tutorial Management (Curated Flag)

**Endpoints**

- Public:
  - `GET /api/v1/tutorial` – list tutorials (already used by frontend).
- Admin:
  - `PATCH /api/v1/admin/tutorial/{id}/curated?curated=true|false`

**Frontend → Backend**

1. Admin open `admin-page.html`.
2. `admin-page.js`:
   - Fetch tutorials via `ensureTutorialsLoaded()`.
   - Render admin tutorial view (using `manage-tutorials.js`).
3. Each row in the admin tutorial table includes a curated checkbox:
   - Class: `.admin-curated-toggle`
   - Attribute: `data-project-id="{tutorialId}"`.
4. `curated-set-reset.js`:

   - `curatedToggle()`:

     - Select all `.admin-curated-toggle` checkboxes.
     - Attach `change` event listeners.
     - On change:
       - Read `authToken` and `isAdmin` from `localStorage`.
       - Read tutorial ID from `data-project-id`.
       - Send:

             PATCH /api/v1/admin/tutorial/{id}/curated?curated=true|false
             Authorization: Bearer <token>

       - Disable the checkbox while request is in flight.
       - On success:
         - Use returned tutorial JSON to ensure `checkbox.checked` matches `updated.curated`.
       - On error:
         - Alert the user and reverts the checkbox state.

**Backend Processing**

1. Request reach `AdminTutorialController.setCurated(id, curated)` (name may vary).
2. Controller:
   - Ensure user has `ROLE_ADMIN` (`SecurityConfig` + method-level security).
   - Call `AdminTutorialService.updateCuratedFlag(id, curated)`.
3. Service:
   - Load tutorial by `id` via `TutorialRepository`.
   - Updates `curated` field in entity.
   - Saves via `tutorialRepository.save(tutorial)`.
4. Return updated tutorial as JSON.

**Backend → Frontend**

- `curated-set-reset.js` updates checkbox and leaves the page in sync with DB.

---

#### 14.7.2 Admin User Management

**Endpoints**

- `GET /api/v1/admin/users` – list all users.
- `DELETE /api/v1/admin/users/{id}` – delete a user.

**Frontend → Backend**

1. Admin select “Manage users” in admin sidebar.
2. `admin-page.js`:

   - Call:

         Promise.all([
             ensureTutorialsLoaded(),
             ensureAdminUsersLoaded()
         ])

   - `ensureAdminUsersLoaded()` (in `manage-users.js`) set a local flag and delegates to `ensureUsersLoaded()` from `users-loader.js`.

3. `users-loader.js`:

   - Has a shared `voltoraUsers` array and a memoised `usersFetch` Promise similar to tutorials.
   - On first call:
     - Send:

           GET /api/v1/admin/users
           Authorization: Bearer <token>

     - On 401/403 set an unauthorized flag.
     - Store the resulting user list in `voltoraUsers`.

4. `manage-users.js`:

   - `buildUserStats()`:

     - Read from `voltoraUsers` and `voltaraTutorials`.
     - normalise usernames/emails/dates.
     - For each user:
       - Count how many tutorials they own.
       - Sum up their tutorials’ `likes`.
     - Store derived objects in `adminUserStats`.

   - `renderUserSearchView()`:

     - Render a search input and results table.
     - Use `filterUsers(query)` to filter `adminUserStats` by username/email.
     - Use `renderSearchRows(users)` to render table rows.
     - Hook up search input and clear button.

**Deleting a User**

- `manage-users.js`:

  - `deleteUser(userId)`:

    1. Confirm deletion.
    2. Send:

           DELETE /api/v1/admin/users/{userId}
           Authorization: Bearer <token>

    3. On success:
       - Show success notification.
       - Remove user from `adminUserStats`:

             adminUserStats = adminUserStats.filter(user => user.id !== userId);

       - Re-render `renderUserSearchView()`.

**Backend Processing**

1. Request reach `UserController.deleteUserAsAdmin(id)` (exact name may vary).
2. Controller:
   - Require `ROLE_ADMIN`.
   - Call `UserService.deleteUserByAdmin(id)`.
3. `UserService`:
   - Delete user row in `users` table.
   - May cascade or handle related data depending on backend implementation.
4. Return `200 OK` or `204 NO CONTENT`.

**Backend → Frontend**

- Frontend remove the user from current view and remains in sync with DB.

---

