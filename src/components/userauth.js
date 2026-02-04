// userauth.js

/**
 * Checks if user is authenticated
 * @returns {boolean} True if authenticated, false otherwise
 */
function isAuthenticated() {
    return !!localStorage.getItem('authToken');
}

/**
 * Logs out the current user
 */
function logout() {
    localStorage.removeItem('authToken');
    localStorage.removeItem('userName');
    localStorage.removeItem('userEmail');
    window.location.href = 'index.html';
}

/**
 * Gets authentication headers with JWT token
 * @returns {Object} Headers object with authorization token
 */
function getAuthHeaders() {
    const token = localStorage.getItem('authToken');
    return {
        'Authorization': token ? `Bearer ${token}` : '',
        'Content-Type': 'application/json'
    };
}

/**
 * Extracts user ID from the authentication token
 * @returns {number} The user ID or null if not found
 */
function getUserIdFromToken() {
    const token = localStorage.getItem('authToken');
    if (!token) return null;
    
    try {
        // Decode the token payload (second part of JWT)
        const payload = JSON.parse(atob(token.split('.')[1]));
        return payload.sub; // Assuming 'sub' contains the user ID
    } catch (e) {
        console.error('Error decoding token:', e);
        return null;
    }
}

/**
 * Updates user information in the UI
 * @param {string} userName - User's display name
 * @param {string} userEmail - User's email address
 */
function updateUserInfo(userName, userEmail) {
    // Update navbar button with user info
    const navButton = document.querySelector('.navbar-nav.nav-pills .btn-primary') || 
                     document.querySelector('.navbar-nav.nav-pills .btn-success');
    
    if (navButton) {
        // Set button text to username
        navButton.textContent = userName;
        navButton.classList.remove('btn-primary');
        navButton.classList.add('btn-success');
        navButton.onclick = logout;
        
        // Add user icon
        const userIcon = document.createElement('i');
        userIcon.classList.add('fas', 'fa-user', 'pe-2');
        navButton.prepend(userIcon);
    }
    
    // Update profile modal fields
    const usernameInput = document.getElementById('profileUsername');
    const emailInput = document.getElementById('profileEmail');
    
    if (usernameInput) usernameInput.value = userName;
    if (emailInput) emailInput.value = userEmail || '';
}
