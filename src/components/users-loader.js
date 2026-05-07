// This asynchronous function fetches all user objects from back-end API
// HTTP method: GET
// End-point URL (Users table, GET all users): `${API_BASE_URL}/admin/users`

var usersFetch = null;

function ensureUsersLoaded() {

    // Fetch only on first request or when the HTML page is reloaded.
    if (usersFetch) {
        return usersFetch;
    }

    var token = localStorage.getItem('authToken') || '';
    var fetchOptions = {};
    if (token) {
        fetchOptions.headers = {
            Authorization: 'Bearer ' + token
        };
    }

    usersFetch = fetch(`${API_BASE_URL}/admin/users`, fetchOptions)
        .then(function (response) {
            // If the response is NOT ok, throw a custom message
            if (response.status === 403) {
                window.adminUsersUnauthorized = true;  // unauthorised user.
                throw new Error('Permission denied. Please confirm authentication');
            } else if (!response.ok) {
                throw new Error('Failed to load users: ' + response.status);
            }

            // Otherwise return the response in JSON format
            return response.json();
        })
        .then(function (data) {
            // Response is ok: load all user data into a global array
            voltaraUsers = data;  // global, similar to voltaraTutorials
            return data;
        })
        .catch(function (error) {
            // Response not ok: set voltaraUsers to empty array
            console.error('Failed to load users', error);
            voltaraUsers = [];
            return [];
        });

    return usersFetch;
}