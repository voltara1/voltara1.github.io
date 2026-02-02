/**
 * Authentication Management System
 * Handles user authentication, token management, and API integration
 */

// Add a minimal showToast function to auth.js since it's not included in userpage.html
function showToast(options) {
    const toastElement = document.getElementById('msg-toast'); 
    const toastBodyElement = document.getElementById('msg-toast-body');
    
    if (!toastElement || !toastBodyElement) {
        console.error('Toast elements not found in DOM');
        return;
    }
    
    toastBodyElement.textContent = options.msg;
    // Remove existing background classes
    toastElement.classList.remove("bg-success", "bg-danger", "bg-info", "bg-warning");
    // Add the new background class
    toastElement.classList.add("bg-" + options.bgColor);
    
    // Initialize and show the toast
    const toast = new bootstrap.Toast(toastElement, { delay: 4000 });
    toast.show();
}

/**
 * Checks if the user is currently authenticated
 * @returns {boolean} True if user is authenticated and token is valid
 */
function isAuthenticated() {
    const token = localStorage.getItem('authToken');
    
    // No token means not authenticated
    if (!token) return false;
    
    try {
        // Decode JWT token to check expiration
        const payload = JSON.parse(atob(token.split('.')[1]));
        const expirationTime = payload.exp;
        const currentTime = Math.floor(Date.now() / 1000);
        
        // Return true if token hasn't expired
        return expirationTime > currentTime;
    } catch (e) {
        console.error('Error decoding token:', e);
        return false;
    }
}

/**
 * Extracts user ID from the authentication token and ensures it is in localStorage
 * @returns {string|null} User ID if available, null otherwise
 */
function getUserIdFromToken() {
    const token = localStorage.getItem('authToken');
    if (!token) return null;
    
    try {
        // Access the payload (second part of the JWT)
        const payload = JSON.parse(atob(token.split('.')[1]));
        
        // Spring Security usually stores the user identifier in 'sub'
        // If your backend puts the numeric ID in a different field, change 'sub' to that field name.
        const id = payload.sub; 

        if (id) {
            localStorage.setItem('userId', id); // Sync numeric ID to storage for easy access
            return id;
        }
        return null;
    } catch (e) {
        console.error('Error decoding token:', e);
        return null;
    }
}

/**
 * Ensures user is authenticated, redirects to login if not
 * @returns {boolean} True if authenticated, false if redirected
 */
function requireAuth() {
    if (!isAuthenticated()) {
        window.location.href = 'index.html';
        return false;
    }
    // Ensure numeric ID is available in localStorage
    getUserIdFromToken(); 
    return true;
}

/**
 * Generates authorization headers for API requests
 * @returns {Object} Headers object with Authorization token
 */
function getAuthHeaders() {
    const token = localStorage.getItem('authToken');
    return {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
    };
}

/**
 * Handles user logout - clears all auth data and redirects to login
 */
function logout() {
    // Remove all authentication data from localStorage
    localStorage.removeItem('authToken');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('userName');
    localStorage.removeItem('userEmail');
    localStorage.removeItem('userId'); 
    
    // Show success message using the local showToast function
    showToast({ 
        bgColor: "success", 
        msg: "You have been logged out successfully." 
    });
    
    // Redirect to login page
    window.location.href = 'index.html';
}

/**
 * Initializes authentication on page load
 * Redirects unauthenticated users from protected pages
 */
document.addEventListener('DOMContentLoaded', function() {
    // Apply authentication check only to userpage
    if (window.location.pathname.includes('userpage.html')) {
        requireAuth();
    }
});
