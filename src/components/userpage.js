document.addEventListener('DOMContentLoaded', function() {
    // Check if user is logged in
    const token = localStorage.getItem('authToken');
    const userName = localStorage.getItem('userName') || 'User';
    const userEmail = localStorage.getItem('userEmail') || '';
    
    // Redirect to login if no token
    if (!token) {
        window.location.href = 'index.html';
        return;
    }
    
    // Update user name in the login button
    const loginBtn = document.getElementById('loginBtn');
    if (loginBtn) {
        loginBtn.innerHTML = `<i class="fas fa-user"></i> ${userName}`;
    }
    
    // Profile Modal Elements
    const profileModal = document.getElementById('profileModal');
    const closeProfileModal = document.getElementById('closeProfileModal');
    const cancelProfile = document.getElementById('cancelProfile');
    const saveProfile = document.getElementById('saveProfile');
    const loginButton = document.getElementById('loginBtn');
    
    // Load user data into profile modal
    if (document.getElementById('username')) {
        document.getElementById('username').value = userName;
    }
    if (document.getElementById('email')) {
        document.getElementById('email').value = userEmail || '';
    }
    
    // Event Listeners for Profile Modal
    if (loginButton) {
        loginButton.addEventListener('click', function() {
            if (profileModal) {
                profileModal.style.display = 'flex';
            }
        });
    }
    
    if (closeProfileModal) {
        closeProfileModal.addEventListener('click', function() {
            if (profileModal) {
                profileModal.style.display = 'none';
            }
        });
    }
    
    if (cancelProfile) {
        cancelProfile.addEventListener('click', function() {
            if (profileModal) {
                profileModal.style.display = 'none';
            }
        });
    }
    
    // Save Profile Handler
    if (saveProfile) {
        saveProfile.addEventListener('click', function() {
            const username = document.getElementById('username').value;
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;
            const confirmPassword = document.getElementById('confirmPassword').value;
            
            // Validate passwords match if password is provided
            if (password && password !== confirmPassword) {
                showNotification('Passwords do not match!', 'error');
                return;
            }
            
            // In a real implementation, this would call your backend API
            // For now, we'll just update localStorage and UI
            
            if (username) {
                localStorage.setItem('userName', username);
                // Update the button text
                if (loginButton) {
                    loginButton.innerHTML = `<i class="fas fa-user"></i> ${username}`;
                }
            }
            
            if (email) {
                localStorage.setItem('userEmail', email);
            }
            
            showNotification('Profile updated successfully!', 'success');
            
            // Close modal
            if (profileModal) {
                profileModal.style.display = 'none';
            }
            
            // Clear password fields
            if (document.getElementById('password')) {
                document.getElementById('password').value = '';
            }
            if (document.getElementById('confirmPassword')) {
                document.getElementById('confirmPassword').value = '';
            }
        });
    }
    
    // Close modal when clicking outside
    window.addEventListener('click', function(event) {
        if (profileModal && event.target === profileModal) {
            profileModal.style.display = 'none';
        }
    });
    
    // Notification function
    function showNotification(message, type) {
        const notification = document.getElementById('notification');
        if (notification) {
            notification.textContent = message;
            notification.className = `notification ${type} show`;
            
            setTimeout(() => {
                notification.classList.remove('show');
            }, 3000);
        }
    }
    
    // Logout function
    window.logout = function() {
        localStorage.removeItem('authToken');
        localStorage.removeItem('refreshToken');
        localStorage.removeItem('userName');
        localStorage.removeItem('userEmail');
        window.location.href = 'index.html';
    };
    
    // Initialize the rest of the page functionality
    initializePage();
});

function initializePage() {
    // Sample projects data (would come from backend in real implementation)
    let projects = [
        { 
            id: 1, 
            name: "Smart Home Automation System", 
            description: "An ESP32-based home automation system with temperature monitoring and control. This project includes automatic climate control based on occupancy detection and integrates with popular smart home platforms.",
            platform: "esp32",
            date: "2026-05-15",
            bom: ["bom_smart_home.pdf", "components_list.xlsx"],
            images: ["diagram1.png", "setup.jpg"],
            docs: ["manual.pdf", "api_docs.pdf"]
        },
        { 
            id: 2, 
            name: "IoT Weather Station", 
            description: "Monitor environmental conditions with this Arduino-based weather station. Tracks temperature, humidity, pressure, and light levels with data logging capabilities.",
            platform: "arduino",
            date: "2026-06-22",
            bom: ["weather_station_bom.pdf", "parts_list.csv"],
            images: ["sensor_setup.jpg", "display.png"],
            docs: ["assembly_guide.pdf", "calibration.pdf"]
        },
        { 
            id: 3, 
            name: "Raspberry Pi Security Camera", 
            description: "Motion detection security camera using Raspberry Pi and Pi Camera module. Features real-time alerts, cloud storage, and night vision capabilities.",
            platform: "raspberry",
            date: "2026-07-10",
            bom: ["security_camera_bom.pdf", "hardware_list.xlsx"],
            images: ["camera_placement.jpg", "interface.png"],
            docs: ["installation.pdf", "configuration.pdf"]
        },
        { 
            id: 4, 
            name: "IoT Plant Watering System", 
            description: "ESP32-based system that monitors soil moisture and waters plants automatically. Includes scheduling, remote monitoring, and water usage analytics.",
            platform: "esp32",
            date: "2026-08-05",
            bom: ["plant_watering_bom.pdf", "component_list.csv"],
            images: ["system_diagram.png", "prototype.jpg"],
            docs: ["user_manual.pdf", "troubleshooting.pdf"]
        },
        { 
            id: 5, 
            name: "Smart Door Lock", 
            description: "Bluetooth-controlled door lock using Arduino and servo motor. Features fingerprint authentication, temporary access codes, and activity logging.",
            platform: "arduino",
            date: "2026-09-12",
            bom: ["door_lock_bom.pdf", "parts.xlsx"],
            images: ["lock_mechanism.jpg", "app_interface.png"],
            docs: ["programming_guide.pdf", "security_specs.pdf"]
        },
        { 
            id: 6, 
            name: "Air Quality Monitor", 
            description: "NodeMCU-based air quality monitor with real-time data visualization. Measures PM2.5, PM10, CO2, and other pollutants with historical data tracking.",
            platform: "nodemcu",
            date: "2026-10-03",
            bom: ["air_monitor_bom.pdf", "materials_list.csv"],
            images: ["sensor_array.jpg", "dashboard.png"],
            docs: ["technical_specs.pdf", "maintenance.pdf"]
        }
    ];

    // DOM Elements
    const projectForm = document.getElementById('projectForm');
    const notification = document.getElementById('notification');
    const imageUploadArea = document.getElementById('imageUploadArea');
    const fileUploadArea = document.getElementById('fileUploadArea');
    const bomUploadArea = document.getElementById('bomUploadArea');
    const imageInput = document.getElementById('projectImages');
    const fileInput = document.getElementById('projectFiles');
    const bomInput = document.getElementById('bomFiles');
    const imagePreview = document.getElementById('imagePreview');
    const filePreview = document.getElementById('filePreview');
    const bomPreview = document.getElementById('bomPreview');
    const loginBtn = document.getElementById('loginBtn');
    const uploadSection = document.getElementById('uploadSection');
    const projectsSection = document.getElementById('projectsSection');
    const projectDetailSection = document.getElementById('projectDetailSection');
    const projectsLink = document.getElementById('projectsLink');
    const uploadLink = document.getElementById('uploadLink');
    const helpLink = document.getElementById('helpLink');
    const projectsTableBody = document.getElementById('projectsTableBody');
    const projectsPagination = document.getElementById('projectsPagination');
    const backToUpload = document.getElementById('backToUpload');
    const backToProjects = document.getElementById('backToProjects');
    
    // Profile Modal Elements
    const profileModal = document.getElementById('profileModal');
    const closeProfileModal = document.getElementById('closeProfileModal');
    const cancelProfile = document.getElementById('cancelProfile');
    const saveProfile = document.getElementById('saveProfile');
    
    // Project Detail Elements
    const detailTitle = document.getElementById('detailTitle');
    const detailDescription = document.getElementById('detailDescription');
    const detailPlatform = document.getElementById('detailPlatform');
    const detailDate = document.getElementById('detailDate');
    const bomFilesGrid = document.getElementById('bomFilesGrid');
    const imageFilesGrid = document.getElementById('imageFilesGrid');
    const docFilesGrid = document.getElementById('docFilesGrid');
    
    // Pagination settings
    const itemsPerPage = 5;
    let currentPage = 1;
    let currentProjectId = null;

    // Form submission handler
    if (projectForm) {
        projectForm.addEventListener('submit', function(e) {
            e.preventDefault();
            addProject();
        });
    }
    
    // File upload handlers
    if (imageUploadArea) {
        imageUploadArea.addEventListener('click', () => {
            if (imageInput) imageInput.click();
        });
    }
    
    if (fileUploadArea) {
        fileUploadArea.addEventListener('click', () => {
            if (fileInput) fileInput.click();
        });
    }
    
    if (bomUploadArea) {
        bomUploadArea.addEventListener('click', () => {
            if (bomInput) bomInput.click();
        });
    }
    
    if (imageInput) {
        imageInput.addEventListener('change', handleImageUpload);
    }
    
    if (fileInput) {
        fileInput.addEventListener('change', handleFileUpload);
    }
    
    i    // File upload handlers
    if (imageUploadArea) {
        imageUploadArea.addEventListener('click', () => {
            if (imageInput) imageInput.click();
        });
    }
    
    if (fileUploadArea) {
        fileUploadArea.addEventListener('click', () => {
            if (fileInput) fileInput.click();
        });
    }
    
    if (bomUploadArea) {
        bomUploadArea.addEventListener('click', () => {
            if (bomInput) bomInput.click();
        });
    }
    
    if (imageInput) {
        imageInput.addEventListener('change', handleImageUpload);
    }
    
    if (fileInput) {
        fileInput.addEventListener('change', handleFileUpload);
    }
    
    if (bomInput) {
        bomInput.addEventListener('change', handleBomUpload);
    }
    
    // Navigation handlers
    if (loginBtn) {
        loginBtn.addEventListener('click', function() {
            if (profileModal) {
                profileModal.style.display = 'flex';
            }
        });
    }
    
    if (projectsLink) {
        projectsLink.addEventListener('click', function(e) {
            e.preventDefault();
            if (uploadSection) uploadSection.style.display = 'none';
            if (projectDetailSection) projectDetailSection.style.display = 'none';
            if (projectsSection) projectsSection.style.display = 'block';
        });
    }
    
    if (uploadLink) {
        uploadLink.addEventListener('click', function(e) {
            e.preventDefault();
            if (projectsSection) projectsSection.style.display = 'none';
            if (projectDetailSection) projectDetailSection.style.display = 'none';
            if (uploadSection) uploadSection.style.display = 'block';
        });
    }
    
    if (backToUpload) {
        backToUpload.addEventListener('click', function() {
            if (projectsSection) projectsSection.style.display = 'none';
            if (projectDetailSection) projectDetailSection.style.display = 'none';
            if (uploadSection) uploadSection.style.display = 'block';
        });
    }
    
    if (backToProjects) {
        backToProjects.addEventListener('click', function() {
            if (projectDetailSection) projectDetailSection.style.display = 'none';
            if (uploadSection) uploadSection.style.display = 'none';
            if (projectsSection) projectsSection.style.display = 'block';
        });
    }
    
        // Profile modal handlers
    if (closeProfileModal) {
        closeProfileModal.addEventListener('click', function() {
            if (profileModal) {
                profileModal.style.display = 'none';
            }
        });
    }
    
    if (cancelProfile) {
        cancelProfile.addEventListener('click', function() {
            if (profileModal) {
                profileModal.style.display = 'none';
            }
        });
    }
    
    if (saveProfile) {
        saveProfile.addEventListener('click', function() {
            const newPassword = document.getElementById('password').value;
            const confirmPassword = document.getElementById('confirmPassword').value;
            
            if (newPassword && newPassword !== confirmPassword) {
                showNotification('Passwords do not match!', 'error');
                return;
            }
            
            // In a real implementation, this would call the backend API
            const username = document.getElementById('username').value;
            const email = document.getElementById('email').value;
            
            // Update localStorage
            if (username) {
                localStorage.setItem('userName', username);
                // Update the button text
                if (loginBtn) {
                    loginBtn.innerHTML = `<i class="fas fa-user"></i> ${username}`;
                }
            }
            
            if (email) {
                localStorage.setItem('userEmail', email);
            }
            
            showNotification('Profile updated successfully!', 'success');
            if (profileModal) {
                profileModal.style.display = 'none';
            }
            
            // Clear password fields
            if (document.getElementById('password')) {
                document.getElementById('password').value = '';
            }
            if (document.getElementById('confirmPassword')) {
                document.getElementById('confirmPassword').value = '';
            }
        });
    }
    
    // Close modal when clicking outside
    window.addEventListener('click', function(event) {
        if (profileModal && event.target === profileModal) {
            profileModal.style.display = 'none';
        }
    });
    
    // Initialize projects table and pagination
    renderProjectsTable();
    setupProjectsPagination();
});

// Handle BOM file upload
function handleBomUpload() {
    const bomInput = document.getElementById('bomFiles');
    const bomPreview = document.getElementById('bomPreview');
    
    if (!bomInput || !bomPreview) return;
    
    const files = bomInput.files;
    bomPreview.innerHTML = '';
    
    for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const fileType = file.name.split('.').pop().toLowerCase();
        
        if (['pdf', 'xls', 'xlsx', 'csv'].includes(fileType)) {
            const previewItem = document.createElement('div');
            previewItem.className = 'preview-item ' + fileType;
            
            let icon = 'fa-file';
            if (fileType === 'pdf') icon = 'fa-file-pdf';
            if (['xls', 'xlsx', 'csv'].includes(fileType)) icon = 'fa-file-excel';
            
            previewItem.innerHTML = `
                <i class="fas ${icon}"></i>
                <button class="remove-file" onclick="this.parentElement.remove()"><i class="fas fa-times"></i></button>
                <div style="position: absolute; bottom: 5px; left: 5px; font-size: 0.7rem; background: rgba(0,0,0,0.5); padding: 2px 5px; border-radius: 3px;">${fileType.toUpperCase()}</div>
            `;
            bomPreview.appendChild(previewItem);
        }
    }
}

// Handle image upload
function handleImageUpload() {
    const imageInput = document.getElementById('projectImages');
    const imagePreview = document.getElementById('imagePreview');
    
    if (!imageInput || !imagePreview) return;
    
    const files = imageInput.files;
    imagePreview.innerHTML = '';
    
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

// Handle file upload
function handleFileUpload() {
    const fileInput = document.getElementById('projectFiles');
    const filePreview = document.getElementById('filePreview');
    
    if (!fileInput || !filePreview) return;
    
    const files = fileInput.files;
    filePreview.innerHTML = '';
    
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

// Render projects table for the projects page
function renderProjectsTable() {
    const projectsTableBody = document.getElementById('projectsTableBody');
    if (!projectsTableBody) return;
    
    // Sample projects data (would come from backend in real implementation)
    const projects = [
        { 
            id: 1, 
            name: "Smart Home Automation System", 
            platform: "esp32",
            date: "2026-05-15"
        },
        { 
            id: 2, 
            name: "IoT Weather Station", 
            platform: "arduino",
            date: "2026-06-22"
        },
        { 
            id: 3, 
            name: "Raspberry Pi Security Camera", 
            platform: "raspberry",
            date: "2026-07-10"
        },
        { 
            id: 4, 
            name: "IoT Plant Watering System", 
            platform: "esp32",
            date: "2026-08-05"
        },
        { 
            id: 5, 
            name: "Smart Door Lock", 
            platform: "arduino",
            date: "2026-09-12"
        }
    ];
    
    let tableHTML = '';
    
    projects.forEach(project => {
        // Get platform name
        let platformName = '';
        switch(project.platform) {
            case 'stm32': platformName = 'STM32'; break;
            case 'arduino': platformName = 'Arduino'; break;
            case 'esp32': platformName = 'ESP32'; break;
            case 'raspberry': platformName = 'Raspberry Pi'; break;
            case 'nodemcu': platformName = 'NodeMCU'; break;
        }
        
        tableHTML += `
            <tr>
                <td>${project.name}</td>
                <td>${platformName}</td>
                <td>${formatDate(project.date)}</td>
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

// Setup pagination controls for projects page
function setupProjectsPagination() {
    const projectsPagination = document.getElementById('projectsPagination');
    if (!projectsPagination) return;
    
    const projects = [
        { id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }, { id: 5 }
    ];
    
    const itemsPerPage = 5;
    const pageCount = Math.ceil(projects.length / itemsPerPage);
    let currentPage = 1;
    
    if (pageCount <= 1) {
        projectsPagination.innerHTML = '';
        return;
    }
    
    let paginationHTML = '';
    
    // Previous button
    paginationHTML += `
        <li class="page-item ${currentPage === 1 ? 'disabled' : ''}">
            <a class="page-link" href="#" onclick="changeProjectsPage(${currentPage - 1})">
                <i class="fas fa-chevron-left"></i>
            </a>
        </li>
    `;
    
    // Page numbers
    for (let i = 1; i <= pageCount; i++) {
        paginationHTML += `
            <li class="page-item ${i === currentPage ? 'active' : ''}">
                <a class="page-link" href="#" onclick="changeProjectsPage(${i})">${i}</a>
            </li>
        `;
    }
    
    // Next button
    paginationHTML += `
        <li class="page-item ${currentPage === pageCount ? 'disabled' : ''}">
            <a class="page-link" href="#" onclick="changeProjectsPage(${currentPage + 1})">
                <i class="fas fa-chevron-right"></i>
            </a>
        </li>
    `;
    
    projectsPagination.innerHTML = paginationHTML;
}

// Change current page for projects
function changeProjectsPage(page) {
    // In a real implementation, this would fetch projects for the specified page
    console.log('Changing to page:', page);
    // For demo purposes, we'll just log the page change
}

// Show project details
function showProjectDetails(projectId) {
    const uploadSection = document.getElementById('uploadSection');
    const projectsSection = document.getElementById('projectsSection');
    const projectDetailSection = document.getElementById('projectDetailSection');
    
    if (uploadSection) uploadSection.style.display = 'none';
    if (projectsSection) projectsSection.style.display = 'none';
    if (projectDetailSection) projectDetailSection.style.display = 'block';
    
    // Set sample project details
    const detailTitle = document.getElementById('detailTitle');
    const detailDescription = document.getElementById('detailDescription');
    const detailPlatform = document.getElementById('detailPlatform');
    const detailDate = document.getElementById('detailDate');
    
    if (detailTitle) detailTitle.textContent = "Sample Project Title";
    if (detailDescription) detailDescription.textContent = "This is a sample project description. In a real implementation, this would show detailed information about the selected project.";
    if (detailPlatform) detailPlatform.innerHTML = `<i class="fas fa-microchip"></i> Platform: ESP32`;
    if (detailDate) detailDate.innerHTML = `<i class="far fa-calendar"></i> Date: ${formatDate(new Date().toISOString().split('T')[0])}`;
    
    // Populate sample files
    populateSampleFiles();
}

// Populate sample files for project details
function populateSampleFiles() {
    const bomFilesGrid = document.getElementById('bomFilesGrid');
    const imageFilesGrid = document.getElementById('imageFilesGrid');
    const docFilesGrid = document.getElementById('docFilesGrid');
    
    if (bomFilesGrid) {
        bomFilesGrid.innerHTML = `
            <div class="file-card" onclick="downloadFile('bom_sample.pdf')">
                <i class="fas fa-file-pdf file-icon"></i>
                <div class="file-name">bom_sample.pdf</div>
                <div class="file-type">PDF File</div>
            </div>
            <div class="file-card" onclick="downloadFile('components.xlsx')">
                <i class="fas fa-file-excel file-icon"></i>
                <div class="file-name">components.xlsx</div>
                <div class="file-type">Excel File</div>
            </div>
        `;
    }
    
    if (imageFilesGrid) {
        imageFilesGrid.innerHTML = `
            <div class="file-card" onclick="downloadFile('diagram.png')">
                <i class="fas fa-image file-icon"></i>
                <div class="file-name">diagram.png</div>
                <div class="file-type">Image File</div>
            </div>
            <div class="file-card" onclick="downloadFile('setup.jpg')">
                <i class="fas fa-image file-icon"></i>
                <div class="file-name">setup.jpg</div>
                <div class="file-type">Image File</div>
            </div>
        `;
    }
    
    if (docFilesGrid) {
        docFilesGrid.innerHTML = `
            <div class="file-card" onclick="downloadFile('manual.pdf')">
                <i class="fas fa-file-pdf file-icon"></i>
                <div class="file-name">manual.pdf</div>
                <div class="file-type">PDF Document</div>
            </div>
            <div class="file-card" onclick="downloadFile('api_docs.pdf')">
                <i class="fas fa-file-pdf file-icon"></i>
                <div class="file-name">api_docs.pdf</div>
                <div class="file-type">PDF Document</div>
            </div>
        `;
    }
}

// Download file function (placeholder for backend integration)
function downloadFile(filename) {
    showNotification(`Downloading ${filename}...`, 'success');
    // In a real implementation, this would call the backend API to download the file
}

// Add a new project
function addProject() {
    const projectName = document.getElementById('projectName');
    const projectPlatform = document.getElementById('projectPlatform');
    const projectDescription = document.getElementById('projectDescription');
    const bomInput = document.getElementById('bomFiles');
    
    if (!projectName || !projectPlatform || !projectDescription || !bomInput) return;
    
    if (!projectName.value || !projectPlatform.value || !projectDescription.value || bomInput.files.length === 0) {
        showNotification('Please fill in all required fields and upload at least one BOM file', 'error');
        return;
    }
    
    showNotification('Project uploaded successfully!', 'success');
    
    // Reset form
    const projectForm = document.getElementById('projectForm');
    const bomPreview = document.getElementById('bomPreview');
    const imagePreview = document.getElementById('imagePreview');
    const filePreview = document.getElementById('filePreview');
    
    if (projectForm) projectForm.reset();
    if (bomPreview) bomPreview.innerHTML = '';
    if (imagePreview) imagePreview.innerHTML = '';
    if (filePreview) filePreview.innerHTML = '';
}

// Delete a project
function deleteProject(id) {
    if (confirm('Are you sure you want to delete this project? This action cannot be undone.')) {
        showNotification('Project deleted successfully!', 'success');
        // In a real implementation, this would call the backend API
        // For now, we'll just show a success message
    }
}

// Helper functions
function formatDate(dateString) {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
}

function showNotification(message, type) {
    const notification = document.getElementById('notification');
    if (notification) {
        notification.textContent = message;
        notification.className = `notification ${type} show`;
        
        setTimeout(() => {
            notification.classList.remove('show');
        }, 3000);
    }
}

// Logout function
function logout() {
    localStorage.removeItem('authToken');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('userName');
    localStorage.removeItem('userEmail');
    window.location.href = 'index.html';
}
