/**
 * profilemodal.js
 * Handles all profile modal functionality including setup, form handling, and user updates
 */

/**
 * Sets up all event handlers for the profile modal
 */
function setupProfileModalHandlers() {
    // Setup profile settings button
    const profileSettingsBtn = document.getElementById('profileSettingsBtn');
    const profileModal = document.getElementById('profileModal');
    const closeProfileModal = document.getElementById('closeProfileModal');
    const cancelProfile = document.getElementById('cancelProfile');
    const saveProfileBtn = document.getElementById('saveProfileBtn');
    
    if (profileSettingsBtn && profileModal) {
        profileSettingsBtn.addEventListener('click', function(e) {
            e.preventDefault();
            profileModal.style.display = 'flex';
            
            // Pre-fill user data
            const usernameInput = document.getElementById('profileUsername');
            const emailInput = document.getElementById('profileEmail');
            const userName = localStorage.getItem('userName') || 'User';
            const userEmail = localStorage.getItem('userEmail') || '';
            
            if (usernameInput) usernameInput.value = userName;
            if (emailInput) emailInput.value = userEmail;
        });
    }
    
    if (closeProfileModal) {
        closeProfileModal.addEventListener('click', function() {
            if (profileModal) profileModal.style.display = 'none';
        });
    }
    
    if (cancelProfile) {
        cancelProfile.addEventListener('click', function() {
            if (profileModal) profileModal.style.display = 'none';
        });
    }
    
    if (saveProfileBtn) {
        saveProfileBtn.addEventListener('click', function() {
            // Get form values
            const username = document.getElementById('profileUsername').value;
            const email = document.getElementById('profileEmail').value;
            const currentPassword = document.getElementById('currentPassword').value;
            const newPassword = document.getElementById('newPassword').value;
            const confirmPassword = document.getElementById('confirmPassword').value;
            
            // Validate passwords match if new password is provided
            if (newPassword && newPassword !== confirmPassword) {
                showNotification('New passwords do not match!', 'error');
                return;
            }
            
            // Prepare user data for update
            const userData = {
                userName: username,
                email: email
            };
            
            // Add password if provided
            if (newPassword) {
                userData.password = newPassword;
            }
            
            // Create FormData for multipart request
            const formData = new FormData();
            formData.append('data', JSON.stringify(userData));
            
            // Show loading notification
            showNotification('Updating profile...', 'info');
            
            // Update user profile via backend API
            fetch('http://localhost:8890/api/v1/user/update', {
                method: 'PUT',
                headers: {
                    'Authorization': getAuthHeaders().Authorization
                    // Don't set Content-Type, let browser set it with boundary for FormData
                },
                body: formData
            })
            .then(response => {
                if (!response.ok) {
                    return response.json().then(errorData => {
                        throw new Error(errorData.message || 'Failed to update profile');
                    });
                }
                return response.json();
            })
            .then(data => {
                // Update localStorage with new values
                if (username) {
                    localStorage.setItem('userName', username);
                    document.getElementById('userNameDisplay').textContent = username;
                    
                    // Update navbar button
                    const navButton = document.querySelector('.navbar-nav.nav-pills .btn-success');
                    if (navButton) {
                        navButton.textContent = username;
                        const userIcon = document.createElement('i');
                        userIcon.classList.add('fas', 'fa-user', 'pe-2');
                        navButton.prepend(userIcon);
                    }
                }
                
                if (email) {
                    localStorage.setItem('userEmail', email);
                }
                
                // Update token if provided in response
                if (data.token) {
                    localStorage.setItem('authToken', data.token);
                }
                
                // Clear password fields
                document.getElementById('currentPassword').value = '';
                document.getElementById('newPassword').value = '';
                document.getElementById('confirmPassword').value = '';
                
                // Show success message with specific details
                let successMessage = 'Profile updated successfully!';
                if (newPassword) {
                    successMessage = 'Profile and password updated successfully!';
                }
                
                showNotification(successMessage, 'success');
                
                // Close modal
                if (profileModal) profileModal.style.display = 'none';
            })
            .catch(error => {
                console.error('Error updating profile:', error);
                let errorMessage = 'Failed to update profile';
                if (newPassword) {
                    errorMessage = 'Failed to update profile and password';
                }
                showNotification(errorMessage + ': ' + error.message, 'error');
            });
        });
    }
    
    // Close modal when clicking outside
    window.addEventListener('click', function(event) {
        if (profileModal && event.target === profileModal) {
            profileModal.style.display = 'none';
        }
    });
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

/**
 * Logs out the current user
 */
function logout() {
    localStorage.removeItem('authToken');
    localStorage.removeItem('userId');
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
 * Checks if user is authenticated
 * @returns {boolean} True if authenticated, false otherwise
 */
function isAuthenticated() {
    return !!localStorage.getItem('authToken');
}

// Attach setup function to DOMContentLoaded event
document.addEventListener('DOMContentLoaded', function() {
    // Set up profile modal handlers
    setupProfileModalHandlers();
    
    // Check if user is authenticated and update UI
    if (isAuthenticated()) {
        const userName = localStorage.getItem('userName') || 'User';
        const userEmail = localStorage.getItem('userEmail') || '';
        updateUserInfo(userName, userEmail);
    }
});
