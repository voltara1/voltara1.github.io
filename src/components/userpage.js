/**
 * User Page Management System
 * Handles user dashboard functionality, project management, and UI interactions
 */

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
});

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
    // The backend will identify the user from the JWT token
    fetch('http://localhost:8890/api/v1/tutorial', {
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
        // In a real implementation, the backend would do this filtering
        const userId = getUserIdFromToken();
        const userProjects = projects.filter(project => {
            // This is a workaround since we don't have user ID in the project object
            // In a real app, the backend would return only the user's projects
            return true; // For now, show all projects
        });
        
        renderProjectsTable(userProjects);
        setupProjectsPagination(userProjects);
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
        // Determine platform display name
        let platformName = '';
        switch(project.platform) {
            case 'stm32': platformName = 'STM32'; break;
            case 'arduino': platformName = 'Arduino'; break;
            case 'esp32': platformName = 'ESP32'; break;
            case 'raspberry': platformName = 'Raspberry Pi'; break;
            case 'nodemcu': platformName = 'NodeMCU'; break;
            default: platformName = project.platform;
        }
        
        // Create table row for each project
        tableHTML += `
            <tr>
                <td>${project.title || project.name || 'Untitled'}</td>
                <td>${platformName}</td>
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
    // In a real implementation, this would handle pagination
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
    fetch(`http://localhost:8890/api/v1/tutorial/${projectId}`, {
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
    
    // Set project title and description
    if (detailTitle) detailTitle.textContent = project.title || 'Untitled Project';
    if (detailDescription) detailDescription.textContent = project.description || 'No description available';
    
    // Determine platform display name
    let platformName = '';
    switch(project.platform) {
        case 'stm32': platformName = 'STM32'; break;
        case 'arduino': platformName = 'Arduino'; break;
        case 'esp32': platformName = 'ESP32'; break;
        case 'raspberry': platformName = 'Raspberry Pi'; break;
        case 'nodemcu': platformName = 'NodeMCU'; break;
        default: platformName = project.platform;
    }
    
    // Set platform information
    if (detailPlatform) {
        detailPlatform.innerHTML = `<i class="fas fa-microchip"></i> Platform: ${platformName}`;
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
    const bomInput = document.getElementById('bomFiles');
    
    // Validate form elements exist
    if (!projectName || !projectPlatform || !projectDescription || !bomInput) {
        showNotification('Form elements not found', 'error');
        return;
    }
    
    // Validate required fields
    if (!projectName.value || !projectPlatform.value || !projectDescription.value || bomInput.files.length === 0) {
        showNotification('Please fill in all required fields and upload at least one BOM file', 'error');
        return;
    }
    
    // Prepare form data for upload
    const formData = new FormData();
    
    // Add tutorial data as JSON
    const tutorialData = {
        title: projectName.value,
        description: projectDescription.value,
        content: projectDescription.value, // Using description as content for now
        platform: projectPlatform.value,
        // Add other required fields as needed
    };
    
    formData.append('data', JSON.stringify(tutorialData));
    formData.append('bill_of_materials', bomInput.files[0]);
    
    // Add other files if present
    const imageInput = document.getElementById('projectImages');
    if (imageInput && imageInput.files.length > 0) {
        formData.append('image_main', imageInput.files[0]);
    }
    
    // Show loading notification
    showNotification('Uploading project...', 'info');
    
    // Send to backend
    fetch('http://localhost:8890/api/v1/tutorial', {
        method: 'POST',
        headers: {
            'Authorization': getAuthHeaders().Authorization
            // Don't set Content-Type, let browser set it with boundary for FormData
        },
        body: formData
    })
    .then(response => {
        if (!response.ok) {
            return response.json().then(errorData => {
                throw new Error(errorData.message || 'Failed to upload project');
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
    fetch(`http://localhost:8890/api/v1/tutorial/${projectId}`, {
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
