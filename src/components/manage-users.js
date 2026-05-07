// initialised adminUserStats used by all admin user views
// to store selected/less  properties  of User (id, username, email, tutorials, likes, dates).
let adminUserStats = [];

// True when backend returns an authorization/permission error.
// initialised with false  ~ authorised.
let adminUsersUnauthorized = false;

// Wrapper around ensureUsersLoaded() so the admin page can share the auth flag state
// and reuse the same usersFetch promise from users-loader.js.
function ensureAdminUsersLoaded() {
    adminUsersUnauthorized = false; // starts with user is authorised 
    return ensureUsersLoaded();     
    //users-loader may flag this user as unauthorised by checking return response from backend
}

// Delete a single user from the backend and refresh the admin users view.
// Ask for confirmation, calls DELETE /admin/users/{id} with admin JWT,
// show a notification and update adminUserStats on success.
function deleteUser(userId) {
    // User id cannot be null
    if (userId == null) {
        return;
    }
    // OK or Cancel?
    if (!window.confirm("Are you sure you want to delete this user? This action cannot be undone.")) {
        return;
    }

    // grab the JWT token of the user from local storage and pass the token to backend for authentication
    var token = localStorage.getItem("authToken") || "";
    var headers = {};
    if (token) {
        headers.Authorization = "Bearer " + token;
    }
    headers["Content-Type"] = "application/json";

    // Backend endpoint to delete a user by user id
    fetch(`${API_BASE_URL}/admin/users/${userId}`, {
        method: "DELETE",
        headers: headers
    })
        .then(function (response) {
            if (!response.ok) {
                if (response.status === 401 || response.status === 403) {
                    if (typeof showNotification === "function") {
                        showNotification("Permission denied. Please log in as an admin to delete users.", "error");
                    }
                    throw new Error("Unauthorized");
                }
                return response
                    .json()
                    .then(function (errorData) {
                        throw new Error(errorData.message || "Failed to delete user");
                    })
                    .catch(function () {
                        throw new Error("Failed to delete user");
                    });
            }

            if (typeof showNotification === "function") {
                showNotification("User deleted successfully.", "success");
            }

            adminUserStats = adminUserStats.filter(function (user) {
                return user.id !== userId;
            });

            renderUserSearchView();
        })
        .catch(function (error) {
            console.error("Error deleting user:", error);
            if (typeof showNotification === "function") {
                showNotification("Failed to delete user: " + error.message, "error");
            }
        });
}

// Populate adminUserStats from the voltaraUsers User object array.
// This normalises raw user data and joins tutorials so that each row shows
// tutorial count and total likes per user in the admin UI.
function buildUserStats() {
    // check if no user in array
    if (!Array.isArray(voltaraUsers) || !voltaraUsers.length) {
        adminUserStats = [];
        return;
    }

    const tutorials = Array.isArray(voltaraTutorials) ? voltaraTutorials : [];

    // map user with the following attributes:
    // user id, username, email, creater_at, tutorial count, likes
    adminUserStats = voltaraUsers.map(function (user) {
        const userId = user && typeof user.id !== "undefined" ? user.id : null;
        const username =
            (user && (user.userName || user.username || user.user_name)) || "";
        const email = (user && user.email) || "";
        const createdAt =
            (user && (user.createdAt || user.registrationDate || user.created_at)) ||
            "";

        let tutorialCount = 0;
        let totalLikes = 0;

        if (userId !== null && tutorials.length) {
            tutorials.forEach(function (t) {
                if (!t) {
                    return;
                }
                const tutorialUserId =
                    t.user && typeof t.user.id !== "undefined"
                        ? t.user.id
                        : typeof t.userId !== "undefined"
                        ? t.userId
                        : null;
                if (tutorialUserId !== null && tutorialUserId === userId) {
                    tutorialCount += 1;
                    const rawLikes =
                        typeof t.likes === "number"
                            ? t.likes
                            : parseInt(t.likes || "0", 10);
                    if (!Number.isNaN(rawLikes)) {
                        totalLikes += rawLikes;
                    }
                }
            });
        }

        return {
            id: userId,
            username: username,
            email: email,
            createdAt: createdAt,
            tutorials: tutorialCount,
            likes: totalLikes
        };
    });
}

// Format various backend date string formats into a simple YYYY-MM-DD
// value suitable for display in admin user tables.
function formatUserDate(dateString) {
    if (!dateString) {
        return "";
    }
    var s = dateString.toString();
    return s.slice(0, 10);
}

// Render table rows for the main admin users list (non-search view).
// Returns an HTML string injected into the relevant <tbody> in admin-page.js.
function renderUserTableRows(users) {
    if (!users || !users.length) {
        return '<tr><td colspan="8" class="text-muted text-center small">No users to display.</td></tr>';
    }

    return users
        .map(function (user) {
            return (
                "<tr>" +
                "<td>" +
                (user.id != null ? user.id : "") +
                "</td>" +
                "<td>" +
                (user.username || "") +
                "</td>" +
                "<td>" +
                (user.email || "") +
                "</td>" +
                "<td>" +
                formatUserDate(user.createdAt) +
                "</td>" +
                '<td class="text-end">' +
                (user.tutorials != null ? user.tutorials : 0) +
                "</td>" +
                '<td class="text-end">' +
                (user.likes != null ? user.likes : 0) +
                "</td>" +
                '<td class="text-center">' +
                    '<button type="button" class="btn btn-sm btn-outline-warning" title="Suspend user">' +
                        '<i class="fas fa-ban"></i>' +
                    "</button>" +
                "</td>" +
                '<td class="text-center">' +
                    '<button type="button" class="btn btn-sm btn-outline-danger" title="Delete user" onclick="deleteUser(' + (user.id != null ? user.id : 'null') + ')">' +
                        '<i class="fas fa-trash"></i>' +
                    "</button>" +
                "</td>" +
                "</tr>"
            );
        })
        .join("");
}

// Render the admin "Manage users" view with search input and results table.
// Provides client-side filtering over adminUserStats by username/email.
function renderUserSearchView() {
    if (!adminUserStats.length) {
        setAdminMainContent(
            '<p class="text-muted mb-0">No users available.</p>'
        );
        return;
    }

    var html =
        '<h2 class="admin-main-title mb-3 fs-3 fw-bold text-secondary">Manage users</h2>' +
        '<div class="mb-3 d-flex flex-wrap align-items-center gap-2">' +
        '<label for="admin-users-search-input" class="form-label mb-0 small text-muted">Search:</label>' +
        '<input type="text" id="admin-users-search-input" class="form-control form-control-sm" placeholder="Enter username or email">' +
        '<button type="button" id="admin-users-search-clear" class="btn btn-outline-secondary btn-sm">Clear</button>' +
        "</div>" +
        '<div class="table-responsive">' +
        '<table class="table table-striped table-hover align-middle mb-0">' +
        "<thead>" +
        "<tr>" +
        '<th scope="col">ID</th>' +
        '<th scope="col">Username</th>' +
        '<th scope="col">Email</th>' +
        '<th scope="col">Registered</th>' +
        '<th scope="col" class="text-end">Tutorials</th>' +
        '<th scope="col" class="text-end">Total Likes</th>' +
        '<th scope="col" class="text-center">Suspend</th>' +
        '<th scope="col" class="text-center">Delete</th>' +
        "</tr>" +
        "</thead>" +
        '<tbody id="admin-users-search-body"></tbody>' +
        "</table>" +
        "</div>";

    setAdminMainContent(html);

    var input = document.getElementById("admin-users-search-input");
    var clearBtn = document.getElementById("admin-users-search-clear");
    var body = document.getElementById("admin-users-search-body");

    if (!input || !body) {
        return;
    }

    // Filter adminUserStats by username or email using the current search query.
    function filterUsers(query) {
        var q = (query || "").toString().toLowerCase().trim();
        if (!q) {
            return adminUserStats.slice();
        }
        return adminUserStats.filter(function (user) {
            var name = (user.username || "").toLowerCase();
            var email = (user.email || "").toLowerCase();
            return name.indexOf(q) !== -1 || email.indexOf(q) !== -1;
        });
    }

    // Build table rows for the current filtered user list shown in the search results.
    function renderSearchRows(users) {
        if (!users || !users.length) {
            return '<tr><td colspan="8" class="text-muted text-center small">No users to display.</td></tr>';
        }
        return users.map(function (user) {
            return (
                "<tr>" +
                "<td>" + (user.id != null ? user.id : "") + "</td>" +
                "<td>" + (user.username || "") + "</td>" +
                "<td>" + (user.email || "") + "</td>" +
                "<td>" + formatUserDate(user.createdAt) + "</td>" +
                '<td class="text-end">' + (user.tutorials != null ? user.tutorials : 0) + "</td>" +
                '<td class="text-end">' + (user.likes != null ? user.likes : 0) + "</td>" +
                '<td class="text-center">' +
                    '<button type="button" class="btn btn-sm btn-outline-warning" title="Suspend user">' +
                        '<i class="fas fa-ban"></i>' +
                    "</button>" +
                "</td>" +
                '<td class="text-center">' +
                    '<button type="button" class="btn btn-sm btn-outline-danger" title="Delete user" onclick="deleteUser(' + (user.id != null ? user.id : 'null') + ')">' +
                        '<i class="fas fa-trash"></i>' +
                    "</button>" +
                "</td>" +
                "</tr>"
            );
        }).join("");
    }

    function updateTable() {
        var users = filterUsers(input.value);
        body.innerHTML = renderSearchRows(users);
    }

    input.addEventListener("input", updateTable);
    if (clearBtn) {
        clearBtn.addEventListener("click", function () {
            input.value = "";
            updateTable();
        });
    }

    updateTable();
}