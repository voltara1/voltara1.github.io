/**
 * User Page Management System
 * Handles user dashboard functionality, project management, and UI interactions
 */

// Define API configuration at the top of the file
const API_CONFIG = {
    BASE_URL: getApiBaseUrl(),
    TUTORIAL_API: '/api/v1/tutorial',
    USER_API: '/api/v1/user/update',
    CATEGORY_API: '/api/v1/category'
};

// Store categories globally once loaded
let categories = [];

/**
 * Determines the correct API base URL based on current origin
 * @returns {string} The correct base URL for API requests
 */
function getApiBaseUrl() {
    // Check if we're running in development mode (common port 5500 for live server)
    const isDevelopment = window.location.port === '5500';
    
    // In development, use proxy URL if available
    if (isDevelopment && window.location.hostname === '127.0.0.1') {
        // Return the backend URL directly for development
        return 'http://localhost:8890';
    } else {
        // For production, use the same origin as the frontend
        return `${window.location.protocol}//${window.location.host}`;
    }
}

/**
 * Checks if a URL is cross-origin compared to the current page
 * @param {string} url - The URL to check
 * @returns {boolean} True if the URL is cross-origin
 */
function isCrossOrigin(url) {
    const parsedUrl = new URL(url, window.location.origin);
    return parsedUrl.origin !== window.location.origin;
}

/**
 * Shows a detailed CORS error message to help users fix the issue
 * @param {string} apiUrl - The URL that caused the CORS error
 */
function showCorsErrorMessage(apiUrl) {
    const corsMessage = `
        <div style="text-align: left; line-height: 1.5">
            <h4 style="color: #e74c3c; margin-top: 0;">CORS Error Detected</h4>
            <p>
                Your application is trying to access the API at:
                <code style="background: #f8f9fa; padding: 2px 5px; border-radius: 3px;">${apiUrl}</code>
            </p>
            <p>
                But your browser is blocking this request because it's from a different origin.
            </p>
            <h5 style="color: #3498db;">How to fix this:</h5>
            <ol style="padding-left: 20px;">
                <li><strong>For Development:</strong> Update your backend's CORS configuration to allow requests from <code>http://127.0.0.1:5500</code></li>
                <li>Add these headers to your backend response:
                    <pre style="background: #f8f9fa; padding: 10px; border-radius: 5px; overflow-x: auto;">
Access-Control-Allow-Origin: http://127.0.0.1:5500
Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS
Access-Control-Allow-Headers: Authorization, Content-Type
Access-Control-Allow-Credentials: true</pre>
                </li>
                <li><strong>Alternative Development Fix:</strong> Add a proxy to your development server (e.g., in vite.config.js or webpack.config.js)</li>
                <li><strong>For Production:</strong> Ensure your backend allows requests from your production domain</li>
            </ol>
            <p><strong>Important:</strong> Never use wildcard (*) in production for Access-Control-Allow-Origin</p>
        </div>
    `;
    
    const notification = document.getElementById('notification');
    if (notification) {
        notification.innerHTML = corsMessage;
        notification.className = 'notification error show';
        
        // Add a close button
        const closeButton = document.createElement('button');
        closeButton.className = 'btn-close float-end';
        closeButton.innerHTML = '&times;';
        closeButton.style.position = 'absolute';
        closeButton.style.top = '10px';
        closeButton.style.right = '10px';
        closeButton.onclick = () => {
            notification.classList.remove('show');
        };
        
        notification.appendChild(closeButton);
        
        // Set timer to hide after 10 seconds
        setTimeout(() => {
            notification.classList.remove('show');
        }, 10000);
    }
}

/**
 * Initializes the user page when DOM is loaded
 */
document.addEventListener('DOMContentLoaded', function() {
    // Verify authentication before proceeding
    if (!isAuthenticated()) {
        window.location.href = 'index.html';
        return;
    }
    
    // Get user information from localStorage
    const userName = localStorage.getItem('userName') || 'User';
    const userEmail = localStorage.getItem('userEmail') || '';
    
    // Update UI with user information
    updateUserInfo(userName, userEmail);
    
    // Initialize all page functionality
    initializePage();
    
    // Setup profile modal event handlers
    setupProfileModalHandlers();
    
    // Load categories for the dropdown
    loadCategories();
});

/**
 * Load categories from the database
 */
function loadCategories() {
    showNotification('Loading categories...', 'info');
    
    // Check if this is a cross-origin request
    const apiUrl = API_CONFIG.BASE_URL + API_CONFIG.CATEGORY_API;
    if (isCrossOrigin(apiUrl)) {
        // Show a specific CORS error message
        showCorsErrorMessage(apiUrl);
        return;
    }
    
    fetch(apiUrl, {
        method: 'GET',
        headers: getAuthHeaders()
    })
    .then(response => {
        if (!response.ok) {
            if (response.status === 0) {
                // This typically indicates a CORS issue
                showCorsErrorMessage(apiUrl);
                throw new Error('CORS error: Request failed due to cross-origin restrictions');
            }
            throw new Error('Failed to load categories');
        }
        return response.json();
    })
    .then(categoryList => {
        categories = categoryList;
        setupCategoryDropdown();
        showNotification('Categories loaded successfully', 'success');
    })
    .catch(error => {
        console.error('Error loading categories:', error);
        
        // Check if this was a CORS error
        if (error.message.includes('CORS') || error.message.includes('Failed to fetch')) {
            showCorsErrorMessage(apiUrl);
        } else {
            showNotification('Failed to load categories: ' + error.message, 'error');
        }
        
        // Fallback: add some default categories
        categories = [
            {id: 1, name: 'Arduino', description: 'All tutorials related to Arduino microcontrollers'},
            {id: 2, name: 'ESP32', description: 'All tutorials related to ESP32 microcontrollers'},
            {id: 3, name: 'IoT', description: 'All tutorials related to IoT'},
            {id: 4, name: 'PCB Design', description: 'All tutorials related to PCB Design'},
            {id: 5, name: 'Raspberry Pi', description: 'All tutorials related to Raspberry Pi microcontrollers'},
            {id: 6, name: 'Robotics', description: 'All tutorials related to robotics'},
            {id: 7, name: 'Sensors', description: 'All tutorials related to sensors'},
            {id: 8, name: 'STM32', description: 'All tutorials related to STM32 microcontrollers'}
        ];
        setupCategoryDropdown();
    });
}

// Rest of your userpage.js code remains the same...
// (All other functions stay unchanged)

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
 * Sets up the profile modal functionality
 */
function setupProfileModal() {
    const profileModal = document.getElementById('profileModal');
    
    // Close modal when clicking outside
    window.addEventListener('click', function(event) {
        if (profileModal && event.target === profileModal) {
            profileModal.style.display = 'none';
        }
    });
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
 * Gets the user ID from the authentication token
 * @returns {string|null} User ID if available, null otherwise
 */
function getUserIdFromToken() {
    const token = localStorage.getItem('authToken');
    if (!token) return null;
    
    try {
        // Access the payload (second part of the JWT)
        const payload = JSON.parse(atob(token.split('.')[1]));
        
        // Spring Security usually stores the user identifier in 'sub'
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
    if (emailInput) emailInput.value = userEmail;
}

/**
 * Gets authentication headers
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
 * Formats a date string for display
 * @param {string} dateString - Date string to format
 * @returns {string} Formatted date string
 */
function formatDate(dateString) {
    if (!dateString) return 'N/A';
    
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
}

/**
 * Shows a notification message to the user
 * @param {string} message - Message to display
 * @param {string} type - Type of notification (success, error, info, etc.)
 */
function showNotification(message, type) {
    const notification = document.getElementById('notification');
    if (notification) {
        notification.textContent = message;
        notification.className = `notification ${type} show`;
        
        // Automatically hide notification after 3 seconds for success/info, 5 seconds for error
        const duration = type === 'error' ? 5000 : 3000;
        setTimeout(() => {
            notification.classList.remove('show');
        }, duration);
    }
}

/**
 * Initializes the user page when DOM is loaded
 */
document.addEventListener('DOMContentLoaded', function() {
    // Verify authentication before proceeding
    if (!isAuthenticated()) {
        window.location.href = 'index.html';
        return;
    }
    
    // Get user information from localStorage
    const userName = localStorage.getItem('userName') || 'User';
    const userEmail = localStorage.getItem('userEmail') || '';
    
    // Update UI with user information
    updateUserInfo(userName, userEmail);
    
    // Initialize all page functionality
    initializePage();
    
    // Setup profile modal event handlers
    setupProfileModalHandlers();
    
    // Load categories for the dropdown
    loadCategories();
});

/**
 * Initializes all page functionality and event listeners
 */
function initializePage() {
    // Get all DOM elements needed for functionality
    const projectForm = document.getElementById('projectForm');
    const imageUploadArea = document.getElementById('imageUploadArea');
    const fileUploadArea = document.getElementById('fileUploadArea');
    const bomUploadArea = document.getElementById('bomUploadArea');
    const imageInput = document.getElementById('projectImages');
    const fileInput = document.getElementById('projectFiles');
    const bomInput = document.getElementById('bomFiles');
    const projectsLink = document.getElementById('projectsLink');
    const uploadLink = document.getElementById('uploadLink');
    const backToUpload = document.getElementById('backToUpload');
    const backToProjects = document.getElementById('backToProjects');
    const logoutBtn = document.getElementById('logoutBtn');
    
    // Add category dropdown to the UI
    setupCategoryDropdown();
    
    // Setup form submission handler
    if (projectForm) {
        projectForm.addEventListener('submit', function(e) {
            e.preventDefault();
            addProject();
        });
    }
    
    // Setup file upload area click handlers
    if (imageUploadArea) {
        imageUploadArea.addEventListener('click', () => imageInput && imageInput.click());
    }
    
    if (fileUploadArea) {
        fileUploadArea.addEventListener('click', () => fileInput && fileInput.click());
    }
    
    if (bomUploadArea) {
        bomUploadArea.addEventListener('click', () => bomInput && bomInput.click());
    }
    
    // Setup file input change handlers
    if (imageInput) {
        imageInput.addEventListener('change', handleImageUpload);
    }
    
    if (fileInput) {
        fileInput.addEventListener('change', handleFileUpload);
    }
    
    if (bomInput) {
        bomInput.addEventListener('change', handleBomUpload);
    }
    
    // Setup navigation handlers
    if (projectsLink) {
        projectsLink.addEventListener('click', function(e) {
            e.preventDefault();
            showProjectsSection();
        });
    }
    
    if (uploadLink) {
        uploadLink.addEventListener('click', function(e) {
            e.preventDefault();
            showUploadSection();
        });
    }
    
    if (backToUpload) {
        backToUpload.addEventListener('click', showUploadSection);
    }
    
    if (backToProjects) {
        backToProjects.addEventListener('click', showProjectsSection);
    }
    
    if (logoutBtn) {
        logoutBtn.addEventListener('click', function(e) {
            e.preventDefault();
            logout();
        });
    }
    
    // Load user's projects and setup profile modal
    loadUserProjects();
    setupProfileModal();
}

/**
 * Setup category dropdown for the project form
 */
function setupCategoryDropdown() {
    const platformSelect = document.getElementById('projectPlatform');
    if (!platformSelect) return;
    
    // Clear existing options
    platformSelect.innerHTML = '<option value="">Select a category</option>';
    
    // Add categories to the dropdown
    categories.forEach(category => {
        const option = document.createElement('option');
        option.value = category.id;
        option.textContent = category.name;
        platformSelect.appendChild(option);
    });
    
    // Set first category as default if none selected
    if (platformSelect.value === "" && categories.length > 0) {
        platformSelect.value = categories[0].id;
    }
}

/**
 * Load categories from the database
 */
function loadCategories() {
    showNotification('Loading categories...', 'info');
    
    // Use the correct API endpoint for categories
    fetch(API_CONFIG.BASE_URL + API_CONFIG.CATEGORY_API, {
        method: 'GET',
        headers: getAuthHeaders()
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Failed to load categories');
        }
        return response.json();
    })
    .then(categoryList => {
        categories = categoryList;
        setupCategoryDropdown();
        showNotification('Categories loaded successfully', 'success');
    })
    .catch(error => {
        console.error('Error loading categories:', error);
        showNotification('Failed to load categories: ' + error.message, 'error');
        // Fallback: add some default categories
        categories = [
            {id: 1, name: 'Arduino', description: 'All tutorials related to Arduino microcontrollers'},
            {id: 2, name: 'ESP32', description: 'All tutorials related to ESP32 microcontrollers'},
            {id: 3, name: 'IoT', description: 'All tutorials related to IoT'},
            {id: 4, name: 'PCB Design', description: 'All tutorials related to PCB Design'},
            {id: 5, name: 'Raspberry Pi', description: 'All tutorials related to Raspberry Pi microcontrollers'},
            {id: 6, name: 'Robotics', description: 'All tutorials related to robotics'},
            {id: 7, name: 'Sensors', description: 'All tutorials related to sensors'},
            {id: 8, name: 'STM32', description: 'All tutorials related to STM32 microcontrollers'}
        ];
        setupCategoryDropdown();
    });
}

/**
 * Setup profile modal event handlers
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
                userData.currentPassword = currentPassword;
            }
            
            // Show loading notification
            showNotification('Updating profile...', 'info');
            
            // Update user profile via backend API using JSON
            fetch(API_CONFIG.BASE_URL + API_CONFIG.USER_API, {
                method: 'PUT',
                headers: {
                    'Authorization': getAuthHeaders().Authorization,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(userData)
            })
            .then(response => {
                if (!response.ok) {
                    return response.text().then(text => {
                        try {
                            const errorData = JSON.parse(text);
                            throw new Error(errorData.message || 'Failed to update profile');
                        } catch (e) {
                            throw new Error(text || 'Failed to update profile');
                        }
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
                
                // Clear password fields
                document.getElementById('currentPassword').value = '';
                document.getElementById('newPassword').value = '';
                document.getElementById('confirmPassword').value = '';
                
                // Show specific success message for password update
                if (newPassword) {
                    showNotification('Password updated successfully! You will be logged out for security.', 'success');
                    
                    // Clear authentication tokens and redirect to login
                    localStorage.removeItem('authToken');
                    localStorage.removeItem('refreshToken');
                    localStorage.removeItem('userId');
                    
                    setTimeout(() => {
                        window.location.href = 'index.html';
                    }, 3000);
                } else {
                    showNotification('Profile updated successfully!', 'success');
                }
                
                // Close modal
                if (profileModal) profileModal.style.display = 'none';
            })
            .catch(error => {
                console.error('Error updating profile:', error);
                let errorMessage = 'Failed to update profile';
                if (error.message.includes('Invalid credentials')) {
                    errorMessage = 'Current password is incorrect. Please try again.';
                }
                showNotification(errorMessage + ': ' + error.message, 'error');
            });
        });
    }
}

/**
 * Shows the upload section and hides others
 */
function showUploadSection() {
    document.getElementById('projectsSection').style.display = 'none';
    document.getElementById('projectDetailSection').style.display = 'none';
    document.getElementById('uploadSection').style.display = 'block';
}

/**
 * Shows the projects section and hides others
 */
function showProjectsSection() {
    document.getElementById('uploadSection').style.display = 'none';
    document.getElementById('projectDetailSection').style.display = 'none';
    document.getElementById('projectsSection').style.display = 'block';
    
    // Reload projects when showing projects section
    loadUserProjects();
}

/**
 * Shows the project detail section and hides others
 */
function showProjectDetailSection() {
    document.getElementById('uploadSection').style.display = 'none';
    document.getElementById('projectsSection').style.display = 'none';
    document.getElementById('projectDetailSection').style.display = 'block';
}

/**
 * Loads user's projects from the backend API
 */
function loadUserProjects() {
    // Show loading notification
    showNotification('Loading projects...', 'info');
    
    // Fetch projects for the authenticated user
    fetch(API_CONFIG.BASE_URL + API_CONFIG.TUTORIAL_API, {
        method: 'GET',
        headers: getAuthHeaders()
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Failed to load projects');
        }
        return response.json();
    })
    .then(projects => {
        // Filter projects to show only those belonging to the current user
        renderProjectsTable(projects);
        setupProjectsPagination(projects);
        showNotification('Projects loaded successfully', 'success');
    })
    .catch(error => {
        console.error('Error loading projects:', error);
        showNotification('Failed to load projects: ' + error.message, 'error');
    });
}

/**
 * Renders the projects table with data from backend
 * @param {Array} projects - Array of project objects
 */
function renderProjectsTable(projects) {
    const projectsTableBody = document.getElementById('projectsTableBody');
    if (!projectsTableBody) return;
    
    let tableHTML = '';
    
    projects.forEach(project => {
        // Determine category name from ID
        const category = categories.find(c => c.id == project.category?.id);
        const categoryName = category ? category.name : project.category_id;
        
        // Create table row for each project
        tableHTML += `
            <tr>
                <td>${project.title || project.name || 'Untitled'}</td>
                <td>${categoryName}</td>
                <td>${formatDate(project.createdAt || project.date)}</td>
                <td>
                    <button class="action-btn view" title="View Details" onclick="showProjectDetails(${project.id})">
                        <i class="fas fa-eye"></i>
                    </button>
                    <button class="action-btn delete" title="Delete Project" onclick="deleteProject(${project.id})">
                        <i class="fas fa-trash"></i>
                    </button>
                </td>
            </tr>
        `;
    });
    
    projectsTableBody.innerHTML = tableHTML;
}

/**
 * Sets up pagination controls for projects
 * @param {Array} projects - Array of project objects
 */
function setupProjectsPagination(projects) {
    const projectsPagination = document.getElementById('projectsPagination');
    if (!projectsPagination) return;
    
    // For simplicity, we'll show all projects on one page
    projectsPagination.innerHTML = '';
}

/**
 * Shows details for a specific project
 * @param {number} projectId - ID of the project to display
 */
function showProjectDetails(projectId) {
    // Show loading notification
    showNotification('Loading project details...', 'info');
    
    // Fetch project details from backend
    fetch(`${API_CONFIG.BASE_URL}${API_CONFIG.TUTORIAL_API}/${projectId}`, {
        method: 'GET',
        headers: getAuthHeaders()
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Failed to load project details');
        }
        return response.json();
    })
    .then(project => {
        displayProjectDetails(project);
        showProjectDetailSection();
        showNotification('Project details loaded successfully', 'success');
    })
    .catch(error => {
        console.error('Error loading project details:', error);
        showNotification('Failed to load project details: ' + error.message, 'error');
    });
}

/**
 * Displays project details in the detail view
 * @param {Object} project - Project object to display
 */
function displayProjectDetails(project) {
    // Get DOM elements for project details
    const detailTitle = document.getElementById('detailTitle');
    const detailDescription = document.getElementById('detailDescription');
    const detailPlatform = document.getElementById('detailPlatform');
    const detailDate = document.getElementById('detailDate');
    const detailProficiency = document.getElementById('detailProficiency');
    
    // Set project title and description
    if (detailTitle) detailTitle.textContent = project.title || 'Untitled Project';
    if (detailDescription) detailDescription.textContent = project.description || 'No description available';
    
    // Determine category name from ID
    const category = categories.find(c => c.id == project.category?.id);
    const categoryName = category ? category.name : project.category_id;
    
    // Set category information
    if (detailPlatform) {
        detailPlatform.innerHTML = `<i class="fas fa-microchip"></i> Category: ${categoryName}`;
    }
    
    // Set proficiency level
    if (detailProficiency) {
        detailProficiency.innerHTML = `<i class="fas fa-graduation-cap"></i> Proficiency: ${project.proficiency}`;
    }
    
    // Set creation date
    if (detailDate) {
        detailDate.innerHTML = `<i class="far fa-calendar"></i> Date: ${formatDate(project.createdAt || project.date)}`;
    }
    
    // Populate project files
    populateProjectFiles(project);
}

/**
 * Populates project files in the detail view
 * @param {Object} project - Project object containing file information
 */
function populateProjectFiles(project) {
    // Get file grid elements
    const bomFilesGrid = document.getElementById('bomFilesGrid');
    const imageFilesGrid = document.getElementById('imageFilesGrid');
    const docFilesGrid = document.getElementById('docFilesGrid');
    
    // Clear existing content
    if (bomFilesGrid) bomFilesGrid.innerHTML = '';
    if (imageFilesGrid) imageFilesGrid.innerHTML = '';
    if (docFilesGrid) docFilesGrid.innerHTML = '';
    
    // Populate BOM files if available
    if (bomFilesGrid && project.fileBom) {
        const fileName = project.fileBom.split('/').pop();
        const fileType = fileName.split('.').pop().toLowerCase();
        let icon = 'fa-file';
        if (fileType === 'pdf') icon = 'fa-file-pdf';
        if (['xls', 'xlsx', 'csv'].includes(fileType)) icon = 'fa-file-excel';
        
        const fileCard = document.createElement('div');
        fileCard.className = 'file-card';
        fileCard.innerHTML = `
            <i class="fas ${icon} file-icon"></i>
            <div class="file-name">${fileName}</div>
            <div class="file-type">${fileType.toUpperCase()} File</div>
        `;
        fileCard.addEventListener('click', () => downloadFile(project.fileBom));
        bomFilesGrid.appendChild(fileCard);
    } else if (bomFilesGrid) {
        bomFilesGrid.innerHTML = '<p>No BOM files available</p>';
    }
    
    // Populate image files if available
    if (imageFilesGrid && project.imageMain) {
        const fileName = project.imageMain.split('/').pop();
        const fileCard = document.createElement('div');
        fileCard.className = 'file-card';
        fileCard.innerHTML = `
            <i class="fas fa-image file-icon"></i>
            <div class="file-name">${fileName}</div>
            <div class="file-type">Image File</div>
        `;
        fileCard.addEventListener('click', () => downloadFile(project.imageMain));
        imageFilesGrid.appendChild(fileCard);
    } else if (imageFilesGrid) {
        imageFilesGrid.innerHTML = '<p>No images available</p>';
    }
    
    // Populate documentation files (placeholder)
    if (docFilesGrid) {
        docFilesGrid.innerHTML = '<p>No documentation files available</p>';
    }
}

/**
 * Handles downloading of project files
 * @param {string} filePath - Path to the file to download
 */
function downloadFile(filePath) {
    // In a real implementation, this would download the file
    showNotification(`Downloading file...`, 'success');
    console.log('Download file:', filePath);
}

/**
 * Adds a new project to the system
 */
function addProject() {
    // Get form elements
    const projectName = document.getElementById('projectName');
    const projectPlatform = document.getElementById('projectPlatform');
    const projectDescription = document.getElementById('projectDescription');
    const projectContent = document.getElementById('projectContent');
    const projectProficiency = document.getElementById('projectProficiency');
    const bomInput = document.getElementById('bomFiles');
    
    // Validate form elements exist
    if (!projectName || !projectPlatform || !projectDescription || 
        !projectContent || !projectProficiency || !bomInput) {
        showNotification('Form elements not found', 'error');
        return;
    }
    
    // Validate required fields
    if (!projectName.value || !projectPlatform.value || !projectDescription.value || 
        !projectContent.value || !projectProficiency.value || bomInput.files.length === 0) {
        showNotification('Please fill in all required fields and upload at least one BOM file', 'error');
        return;
    }
    
    // Get current user ID from authentication context
    const userId = getUserIdFromToken();
    
    if (!userId) {
        showNotification('Authentication error. Please log in again.', 'error');
        window.location.href = 'index.html';
        return;
    }
    
    // Show loading notification
    showNotification('Uploading project...', 'info');
    
    // Prepare tutorial data in the correct format
    const tutorialData = {
        user: {
            id: userId
        },
        category: {
            id: parseInt(projectPlatform.value)
        },
        title: projectName.value,
        description: projectDescription.value,
        content: projectContent.value,
        curated: false,
        proficiency: projectProficiency.value
    };
    
    // Create FormData and add tutorial data as JSON
    const formData = new FormData();
    formData.append('data', JSON.stringify(tutorialData));
    
    // Add BOM file (required)
    formData.append('bill_of_materials', bomInput.files[0]);
    
    // Add other files if present (always include all fields even if empty)
    const imageInput = document.getElementById('projectImages');
    if (imageInput && imageInput.files.length > 0) {
        formData.append('image_main', imageInput.files[0]);
    } else {
        // Add empty file for image_main to satisfy backend requirement
        const emptyFile = new File([''], 'empty_image_main.txt', {type: 'text/plain'});
        formData.append('image_main', emptyFile, 'empty_image_main.txt');
    }
    
    const fileInput = document.getElementById('projectFiles');
    if (fileInput && fileInput.files.length > 0) {
        formData.append('image_schematic', fileInput.files[0]);
    } else {
        // Add empty file for image_schematic
        const emptyFile = new File([''], 'empty_image_schematic.txt', {type: 'text/plain'});
        formData.append('image_schematic', emptyFile, 'empty_image_schematic.txt');
    }
    
    // Add empty file for image_layout
    const emptyFileLayout = new File([''], 'empty_image_layout.txt', {type: 'text/plain'});
    formData.append('image_layout', emptyFileLayout, 'empty_image_layout.txt');
    
    // Check if token exists
    const token = localStorage.getItem('authToken');
    if (!token) {
        showNotification('Authentication token missing. Please log in again.', 'error');
        window.location.href = 'index.html';
        return;
    }
    
    // Send to backend
    fetch(API_CONFIG.BASE_URL + API_CONFIG.TUTORIAL_API, {
        method: 'POST',
        headers: {
            'Authorization': 'Bearer ' + token
        },
        body: formData
    })
    .then(response => {
        if (!response.ok) {
            return response.text().then(text => {
                try {
                    const errorData = JSON.parse(text);
                    throw new Error(errorData.message || 'Failed to upload project');
                } catch (e) {
                    throw new Error(text || 'Failed to upload project');
                }
            });
        }
        return response.json();
    })
    .then(data => {
        showNotification('Project uploaded successfully!', 'success');
        
        // Reset form and previews
        const projectForm = document.getElementById('projectForm');
        if (projectForm) projectForm.reset();
        clearFilePreviews();
        
        // Reset category dropdown
        setupCategoryDropdown();
        
        // Show projects section and reload projects
        showProjectsSection();
        loadUserProjects();
    })
    .catch(error => {
        console.error('Error uploading project:', error);
        showNotification('Failed to upload project: ' + error.message, 'error');
    });
}

/**
 * Deletes a project from the system
 * @param {number} projectId - ID of the project to delete
 */
function deleteProject(projectId) {
    // Confirm deletion with user
    if (!confirm('Are you sure you want to delete this project? This action cannot be undone.')) {
        return;
    }
    
    // Show loading notification
    showNotification('Deleting project...', 'info');
    
    // Send delete request to backend
    fetch(`${API_CONFIG.BASE_URL}${API_CONFIG.TUTORIAL_API}/${projectId}`, {
        method: 'DELETE',
        headers: getAuthHeaders()
    })
    .then(response => {
        if (!response.ok) {
            return response.json().then(errorData => {
                throw new Error(errorData.message || 'Failed to delete project');
            });
        }
        showNotification('Project deleted successfully!', 'success');
        
        // Reload projects after deletion
        loadUserProjects();
    })
    .catch(error => {
        console.error('Error deleting project:', error);
        showNotification('Failed to delete project: ' + error.message, 'error');
    });
}

/**
 * Handles BOM file uploads and previews
 */
function handleBomUpload() {
    const bomInput = document.getElementById('bomFiles');
    const bomPreview = document.getElementById('bomPreview');
    
    if (!bomInput || !bomPreview) return;
    
    const files = bomInput.files;
    bomPreview.innerHTML = '';
    
    // Create preview for each file
    for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const fileType = file.name.split('.').pop().toLowerCase();
        
        // Only allow specific file types
        if (['pdf', 'xls', 'xlsx', 'csv'].includes(fileType)) {
            const previewItem = document.createElement('div');
            previewItem.className = 'preview-item ' + fileType;
            
            // Determine icon based on file type
            let icon = 'fa-file';
            if (fileType === 'pdf') icon = 'fa-file-pdf';
            if (['xls', 'xlsx', 'csv'].includes(fileType)) icon = 'fa-file-excel';
            
            // Create preview element
            previewItem.innerHTML = `
                <i class="fas ${icon}"></i>
                <button class="remove-file" onclick="this.parentElement.remove()"><i class="fas fa-times"></i></button>
                <div style="position: absolute; bottom: 5px; left: 5px; font-size: 0.7rem; background: rgba(0,0,0,0.5); padding: 2px 5px; border-radius: 3px;">${fileType.toUpperCase()}</div>
            `;
            bomPreview.appendChild(previewItem);
        }
    }
}

/**
 * Handles image file uploads and previews
 */
function handleImageUpload() {
    const imageInput = document.getElementById('projectImages');
    const imagePreview = document.getElementById('imagePreview');
    
    if (!imageInput || !imagePreview) return;
    
    const files = imageInput.files;
    imagePreview.innerHTML = '';
    
    // Create preview for each image
    for (let i = 0; i < files.length; i++) {
        const file = files[i];
        if (file.type.startsWith('image/')) {
            const reader = new FileReader();
            reader.onload = function(e) {
                const previewItem = document.createElement('div');
                previewItem.className = 'preview-item';
                previewItem.innerHTML = `
                    <img src="${e.target.result}" alt="Preview">
                    <button class="remove-file" onclick="this.parentElement.remove()"><i class="fas fa-times"></i></button>
                `;
                imagePreview.appendChild(previewItem);
            };
            reader.readAsDataURL(file);
        }
    }
}

/**
 * Handles documentation file uploads and previews
 */
function handleFileUpload() {
    const fileInput = document.getElementById('projectFiles');
    const filePreview = document.getElementById('filePreview');
    
    if (!fileInput || !filePreview) return;
    
    const files = fileInput.files;
    filePreview.innerHTML = '';
    
    // Create preview for each PDF file
    for (let i = 0; i < files.length; i++) {
        const file = files[i];
        if (file.type === 'application/pdf') {
            const previewItem = document.createElement('div');
            previewItem.className = 'preview-item pdf';
            previewItem.innerHTML = `
                <i class="fas fa-file-pdf"></i>
                <button class="remove-file" onclick="this.parentElement.remove()"><i class="fas fa-times"></i></button>
            `;
            filePreview.appendChild(previewItem);
        }
    }
}

/**
 * Clears all file previews
 */
function clearFilePreviews() {
    const bomPreview = document.getElementById('bomPreview');
    const imagePreview = document.getElementById('imagePreview');
    const filePreview = document.getElementById('filePreview');
    
    if (bomPreview) bomPreview.innerHTML = '';
    if (imagePreview) imagePreview.innerHTML = '';
    if (filePreview) filePreview.innerHTML = '';
}
