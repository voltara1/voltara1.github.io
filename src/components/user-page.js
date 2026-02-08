/**
 * User Page Management System
 * Handles user dashboard functionality and tutorial management
 */

// Verify authentication before proceeding
document.addEventListener('DOMContentLoaded', function() {
    if (!isAuthenticated()) {
        window.location.href = 'index.html';
        return;
    }
    
    const userName = localStorage.getItem('userName') || 'User';
    const userEmail = localStorage.getItem('userEmail') || '';
    updateUserInfo(userName, userEmail);
    
    initialisePage();

    const shouldOpenMyTutorials = localStorage.getItem('openMyTutorials') === 'true';
    if (shouldOpenMyTutorials) {
        showProjectsSection();
        localStorage.removeItem('openMyTutorials');
    } else {
        showUploadSection();
    }
    // Do not load tutorials on initial page load; they will be fetched when the My Tutorials section is opened.
});

// Create category mapping based on categories.csv
const categoryMap = {
    '1': 'Arduino',
    '2': 'ESP32',
    '3': 'IoT',
    '4': 'PCB Design',
    '5': 'Raspberry Pi',
    '6': 'Robotics',
    '7': 'Sensors',
    '8': 'STM32'
};

/**
 * Loads the current user's tutorials from the backend API
 */
function loadUserTutorials() {
    const loadingElement = document.getElementById('loading');
    if (loadingElement) loadingElement.style.display = 'block';
    
    // Get the user ID directly from localStorage (which was saved on login)
    const userId = localStorage.getItem('userId');
    
    if (!userId) {
        showNotification('Authentication error: User ID not found', 'error');
        if (loadingElement) loadingElement.style.display = 'none';
        return;
    }
    
    console.log(`Loading tutorials for user ID: ${userId}`);
    
    // Get tutorials using the user ID
    fetch(`${API_BASE_URL}/tutorial/user/${userId}`, {
        method: 'GET',
        headers: getAuthHeaders()
    })
    .then(response => {
        if (!response.ok) {
            if (response.status === 401) {
                logout();
                throw new Error('Unauthorized - please log in again');
            }
            throw new Error(`Failed to load tutorials: ${response.statusText}`);
        }
        return response.json();
    })
    .then(tutorials => {
        console.log(`Successfully loaded ${tutorials.length} tutorials`);
        renderTutorialsTable(tutorials);
        if (loadingElement) loadingElement.style.display = 'none';
    })
    .catch(error => {
        console.error('Error loading tutorials:', error);
        // Suppress the toast; errors are logged to the console instead.
        if (loadingElement) loadingElement.style.display = 'none';
    });
}

/**
 * Renders the tutorials in a table format
 * @param {Array} tutorials - Array of tutorial objects
 */
function renderTutorialsTable(tutorials) {
    const tableBody = document.getElementById('projectsTableBody');
    if (!tableBody) return;
    
    if (tutorials.length === 0) {
        tableBody.innerHTML = `
            <tr>
                <td colspan="4" class="text-center py-4">
                    <i class="fas fa-folder-open fa-2x mb-3"></i>
                    <h5>No tutorials found</h5>
                    <p class="text-muted">Create your first tutorial to get started</p>
                </td>
            </tr>
        `;
        return;
    }
    
    let html = '';
    
    tutorials.forEach(tutorial => {
        // Extract category name safely
        const categoryName = tutorial.category ? 
            categoryMap[tutorial.category.id] || `Category ${tutorial.category.id}` : 
            'Uncategorized';
        
        // Format proficiency level with appropriate badge
        const proficiencyClass = tutorial.proficiency === 'BEGINNER' ? 'bg-success' : 
                                tutorial.proficiency === 'INTERMEDIATE' ? 'bg-warning text-dark' : 
                                'bg-danger';
        
        html += `
            <tr>
                <td>
                    <a href="tutorial-details.html?id=${tutorial.id}" target="_blank" rel="noopener noreferrer" style="text-decoration: none; color: inherit;">
                        ${tutorial.title || 'Untitled Tutorial'}
                    </a>
                </td>
                <td><span class="badge bg-primary">${categoryName}</span></td>
                <td><span class="badge ${proficiencyClass}">${tutorial.proficiency || 'N/A'}</span></td>
                <td>${formatDate(tutorial.createdAt)}</td>
                <td>
                    <button class="action-btn delete" title="Delete Tutorial" onclick="deleteTutorial(${tutorial.id})">
                        <i class="fas fa-trash"></i>
                    </button>
                </td>
            </tr>
        `;
    });
    
    tableBody.innerHTML = html;
}

/**
 * Shows details for a specific tutorial
 * @param {number} tutorialId - ID of the tutorial to display
 */
function showTutorialDetails(tutorialId) {
    showNotification('Loading tutorial details...', 'info');
    
    // API request for a single tutorial
    fetch(`${API_BASE_URL}/tutorial/${tutorialId}`, {
        method: 'GET',
        headers: getAuthHeaders()
    })
    .then(response => {
        if (!response.ok) {
            if (response.status === 401) {
                logout();
                throw new Error('Unauthorized - please log in again');
            }
            throw new Error('Failed to load tutorial details');
        }
        return response.json();
    })
    .then(tutorial => {
        displayTutorialDetails(tutorial);
        showProjectDetailSection();
        showNotification('Tutorial details loaded successfully', 'success');
    })
    .catch(error => {
        console.error('Error loading tutorial details:', error);
        showNotification(`Failed to load tutorial details: ${error.message}`, 'error');
    });
}

/**
 * Displays tutorial details in the detail view
 * @param {Object} tutorial - Tutorial object to display
 */
function displayTutorialDetails(tutorial) {
    const detailTitle = document.getElementById('detailTitle');
    const detailDescription = document.getElementById('detailDescription');
    const detailCategory = document.getElementById('detailCategory');
    const detailProficiency = document.getElementById('detailProficiency');
    const detailDate = document.getElementById('detailDate');
    
    if (detailTitle) detailTitle.textContent = tutorial.title || 'Untitled Tutorial';
    if (detailDescription) detailDescription.textContent = tutorial.description || 'No description available';
    
    // Display category information
    if (detailCategory) {
        const categoryName = tutorial.category ? 
            categoryMap[tutorial.category.id] || `Category ${tutorial.category.id}` : 
            'Uncategorized';
        detailCategory.innerHTML = `<i class="fas fa-layer-group"></i> Category: ${categoryName}`;
    }
    
    // Display proficiency
    if (detailProficiency) {
        const proficiencyClass = tutorial.proficiency === 'BEGINNER' ? 'bg-success' : 
                                tutorial.proficiency === 'INTERMEDIATE' ? 'bg-warning text-dark' : 
                                'bg-danger';
        detailProficiency.innerHTML = `<span class="badge ${proficiencyClass}">${tutorial.proficiency || 'N/A'}</span>`;
    }
    
    // Display creation date
    if (detailDate) {
        detailDate.innerHTML = `<i class="far fa-calendar"></i> Created: ${formatDate(tutorial.createdAt)}`;
    }
    
    // Populate tutorial files
    populateTutorialFiles(tutorial);
}

/**
 * Populates tutorial files in the detail view
 * @param {Object} tutorial - Tutorial object containing file information
 */
function populateTutorialFiles(tutorial) {
    // Get file grid elements
    const bomFilesGrid = document.getElementById('bomFilesGrid');
    const imageFilesGrid = document.getElementById('imageFilesGrid');
    
    // Clear existing content
    if (bomFilesGrid) bomFilesGrid.innerHTML = '';
    if (imageFilesGrid) imageFilesGrid.innerHTML = '';
    
    // Populate BOM files if available
    if (bomFilesGrid && tutorial.fileBom) {
        const fileName = tutorial.fileBom.split('/').pop();
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
        fileCard.addEventListener('click', () => downloadFile(tutorial.fileBom));
        bomFilesGrid.appendChild(fileCard);
    } else if (bomFilesGrid) {
        bomFilesGrid.innerHTML = '<p>No BOM files available</p>';
    }
    
    // Populate image files if available
    if (imageFilesGrid && tutorial.imageMain) {
        const fileName = tutorial.imageMain.split('/').pop();
        const fileCard = document.createElement('div');
        fileCard.className = 'file-card';
        fileCard.innerHTML = `
            <i class="fas fa-image file-icon"></i>
            <div class="file-name">${fileName}</div>
            <div class="file-type">Image File</div>
        `;
        fileCard.addEventListener('click', () => downloadFile(tutorial.imageMain));
        imageFilesGrid.appendChild(fileCard);
    } else if (imageFilesGrid) {
        imageFilesGrid.innerHTML = '<p>No images available</p>';
    }
}

/**
 * Deletes a tutorial from the system
 * @param {number} tutorialId - ID of the tutorial to delete
 */
function deleteTutorial(tutorialId) {
    if (!confirm('Are you sure you want to delete this tutorial? This action cannot be undone.')) {
        return;
    }
    
    showNotification('Deleting tutorial...', 'info');
    
    // API request to delete the tutorial
    fetch(`${API_BASE_URL}/tutorial/${tutorialId}`, {
        method: 'DELETE',
        headers: getAuthHeaders()
    })
    .then(response => {
        if (!response.ok) {
            if (response.status === 401) {
                logout();
                throw new Error('Unauthorized - please log in again');
            }
            return response.json().then(errorData => {
                throw new Error(errorData.message || 'Failed to delete tutorial');
            });
        }
        showNotification('Tutorial deleted successfully!', 'success');
        loadUserTutorials(); // Reload tutorials
    })
    .catch(error => {
        console.error('Error deleting tutorial:', error);
        showNotification(`Failed to delete tutorial: ${error.message}`, 'error');
    });
}



// The following functions are also defined in user-auth.js
// They're included here for completeness but should be in user-auth.js

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

/**
 * initialises all page functionality and event listeners
 */
function initialisePage() {
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
    const shareTutorialBtn = document.getElementById('shareTutorialBtn');
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

    if (shareTutorialBtn) {
        shareTutorialBtn.addEventListener('click', function(e) {
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
    
    // Setup profile modal event handlers (now handled by profilemodal.js)
    
    // Populate the projectPlatform dropdown with category values
    populatePlatformDropdown();
}

/**
 * Populates the projectPlatform dropdown with category values
 */
function populatePlatformDropdown() {
    const projectPlatform = document.getElementById('projectPlatform');
    if (!projectPlatform) return;
    
    // Clear existing options (except the first one which is the default)
    while (projectPlatform.options.length > 1) {
        projectPlatform.remove(1);
    }
    
    // Add options for each category in the map
    for (const [id, name] of Object.entries(categoryMap)) {
        const option = document.createElement('option');
        option.value = id;
        option.textContent = name;
        projectPlatform.appendChild(option);
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
    loadUserTutorials();
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
 * Adds a new project to the system
 */
function addProject() {
    // Get form elements
    const projectName = document.getElementById('projectName');
    const projectPlatform = document.getElementById('projectPlatform');
    const projectDescription = document.getElementById('projectDescription');
    const projectContent = document.getElementById('projectContent'); // Added this
    const projectProficiency = document.getElementById('projectProficiency'); // Added this
    const bomInput = document.getElementById('bomFiles');
    
    // Validate form elements exist
    if (!projectName || !projectPlatform || !projectDescription || !projectContent || !projectProficiency || !bomInput) {
        showNotification('Form elements not found', 'error');
        return;
    }
    
    // Validate required fields
    if (!projectName.value || !projectPlatform.value || !projectDescription.value || !projectContent.value || !projectProficiency.value || bomInput.files.length === 0) {
        showNotification('Please fill in all required fields and upload at least one BOM file', 'error');
        return;
    }
    
    // Get user ID from localStorage
    const userId = localStorage.getItem('userId');
    
    if (!userId) {
        showNotification('Authentication error: User ID not found', 'error');
        return;
    }
    
    // Create the tutorial data object in the EXACT format required by the backend
    const tutorialData = {
        title: projectName.value,
        description: projectDescription.value,
        content: projectContent.value, // Use the actual content field
        user: { id: parseInt(userId) }, // Wrap in object as required
        category: { id: parseInt(projectPlatform.value) }, // Wrap in object as required
        proficiency: projectProficiency.value, // Use the selected proficiency
        curated: false
    };
    
    // DISPLAY THE JSON DATA THAT WILL BE SUBMITTED TO THE BACKEND
    console.log('--------------------------------------------------');
    console.log('JSON data that will be sent to the backend:');
    console.log(JSON.stringify(tutorialData, null, 2));
    console.log('--------------------------------------------------');
    
    // Prepare form data for upload
    const formData = new FormData();
    
    // Add tutorial data as JSON string
    formData.append('data', JSON.stringify(tutorialData));
    
    // Add BOM file
    formData.append('bill_of_materials', bomInput.files[0]);
    
    // Add other files if present
    const imageInput = document.getElementById('projectImages');
    if (imageInput && imageInput.files.length > 0) {
        formData.append('image_main', imageInput.files[0]);
    }
    
    // Show loading notification
    showNotification('Uploading project...', 'info');
    
    // Send to backend
    fetch(`${API_BASE_URL}/tutorial`, {
        method: 'POST',
        headers: {
            'Authorization': getAuthHeaders().Authorization
            // Don't set Content-Type, let browser set it with boundary for FormData
        },
        body: formData
    })
    .then(async response => {
        let result;
        const contentType = response.headers.get("content-type");
        
        // Check if response has JSON content-type before parsing
        if (contentType && contentType.includes("application/json")) {
            result = await response.json();
        } else {
            // Handle cases where server returns something else (HTML, plain text, etc.)
            const text = await response.text();
            throw new Error(`Server responded with status ${response.status}. Response body: ${text}`);
        }

        if (!response.ok) {
            throw new Error(result.message || 'Failed to upload project');
        }

        return result;
    })
    .then(data => {
        // Show success toast/notification
        showNotification('Tutorial uploaded successfully!', 'success');
        //showToast('success','Tutorial uploaded successfully....!');

        // If backend returned the new tutorial ID, wait 2 seconds then redirect
        if (data && data.id) {
            setTimeout(() => {
                window.location.href = `tutorial-details.html?id=${data.id}`;
            }, 2000);
            return;
        }
        
        // Fallback: reset form and show projects list
        const projectForm = document.getElementById('projectForm');
        if (projectForm) projectForm.reset();
        clearFilePreviews();
        
        showProjectsSection();
        loadUserTutorials();
    })
    .catch(error => {
        console.error('Error uploading project:', error);
        showNotification('Failed to upload project: ' + error.message, 'error');
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

