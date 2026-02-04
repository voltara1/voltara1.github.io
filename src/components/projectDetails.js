/**
 * Get the  ID from the URL
 * When you visit project-details.html?id=5, this extracts the "5"
 */
function getProjectIdFromURL() {
    // URLSearchParams helps us read the ?id=5 part of the URL
    const urlParams = new URLSearchParams(window.location.search);

    // Get the 'id' value and convert it to a number
    return parseInt(urlParams.get('id'));
}

/**
 * Find a specific tutorial by its ID number
 * 
 * @param {number} id - The tutorial ID to search for
 * @returns {Object} The tutorial object, or undefined if not found
 */
function getProjectById(id) {
    // Search through all tutorial, get the ID
    return voltaraTutorials.find(project => project.id === id);
}

/**
 * Get other tutorial created by the same author
 * 
 * @param {string} authorName - The author's display name (user.user_name)
 * @param {number} excludeId - The current tutorial ID to exclude
 * @returns {Array} Up to 3 other tutorial by this author
 */
function getProjectsByAuthor(authorName, excludeId) {
    return voltaraTutorials
        .filter(project => project.user && project.user.user_name === authorName && project.id !== excludeId)
        .slice(0, 3); // Only get the first 3
}

/**
 * Main function - Load and display all tutorial details
 */
function loadProjectDetails() {
    // Get the tutorial ID from the URL
    const projectId = getProjectIdFromURL();

    // Check if there is a valid ID
    if (!projectId) {
        document.getElementById('project-header').innerHTML =
            '<div class="alert alert-danger">Project ID not found in URL. Please click on a project card to view details.</div>';
        return; // 
    }

    // Find the tutorial with this ID
    const project = getProjectById(projectId);

    // Check if tutorial exists
    if (!project) {
        document.getElementById('project-header').innerHTML =
            '<div class="alert alert-danger">Project not found. This project may not exist.</div>';
        return; // Stop here if project doesn't exist
    }

    // Display all tutorial information
    renderProjectHeader(project);
    renderMainImage(project);
    renderDescription(project);
    renderSchematic(project);
    renderLayout(project);
    renderBOM(project);
    updateGitHubLink(project);
    renderCreatorProjects(project);
}

/**
 * Display the tutorial title and tags
 */
function renderProjectHeader(project) {
    // Display tags (category, proficiency, curated flag)
    const tags = [];
    if (project.category && project.category.name) tags.push(project.category.name);
    if (project.proficiency) tags.push(project.proficiency);
    if (typeof project.curated === 'boolean') tags.push(project.curated ? 'Curated' : '');

    const headerHTML = `
        <h1 class="project-title mb-4">${project.title}</h1>
        <div class="project-tags mb-4">
            ${tags.map(tag => `<span class="badge bg-secondary me-2 mb-2">${tag}</span>`).join('')}
        </div>
    `;

    document.getElementById('project-header').innerHTML = headerHTML;
}

/**
 * Display the main tutorial image
 */
function renderMainImage(project) {
    const placeholderSrc = `https://placehold.co/1200x400/FF6B35/FFFFFF?text=${encodeURIComponent(project.title)}`;
    const uploadsBasePath = 'http://127.0.0.1:8890/api/v1/uploads/';
    const imageFileName = project.imageMain || project.image_main;
    const imageSrc = imageFileName ? (uploadsBasePath + encodeURIComponent(imageFileName)) : placeholderSrc;

    const imageHTML = `
        <img src="${imageSrc}" 
             class="img-fluid rounded" 
             alt="${project.title}"
             style="width: 100%; height: auto;"
             onerror="this.onerror=null;this.src='${placeholderSrc}'">
    `;

    document.getElementById('project-main-image').innerHTML = imageHTML;
}

function renderSchematic(project) {
    const section = document.getElementById('project-schematic-section');
    const container = document.getElementById('project-schematic');
    if (!section || !container) return;

    const uploadsBasePath = 'http://127.0.0.1:8890/api/v1/uploads/';
    const imageFileName = project.imageSchematic || project.image_schematic;
    if (!imageFileName) {
        section.style.display = 'none';
        return;
    }

    const imageSrc = uploadsBasePath + encodeURIComponent(imageFileName);
    const imageHTML = `
        <img src="${imageSrc}" 
             class="img-fluid rounded" 
             alt="Circuit schematic for ${project.title}"
             onerror="this.closest('section').style.display='none';">
    `;
    container.innerHTML = imageHTML;
}

function renderLayout(project) {
    const section = document.getElementById('project-layout-section');
    const container = document.getElementById('project-layout');
    if (!section || !container) return;

    const uploadsBasePath = 'http://127.0.0.1:8890/api/v1/uploads/';
    const imageFileName = project.imageLayout || project.image_layout;
    if (!imageFileName) {
        section.style.display = 'none';
        return;
    }

    const imageSrc = uploadsBasePath + encodeURIComponent(imageFileName);
    const imageHTML = `
        <img src="${imageSrc}" 
             class="img-fluid rounded" 
             alt="PCB layout for ${project.title}"
             onerror="this.closest('section').style.display='none';">
    `;
    container.innerHTML = imageHTML;
}

/**
 * Display the tutorial description with details
 */
function renderDescription(project) {
    // Create description HTML with multiple paragraphs
    const descriptionHTML = `
        <p>${project.description}</p>
        
        <p>This ${project.category.name} tutorial demonstrates innovative use of modern electronics and microcontroller technology. 
        It combines practical hardware design with efficient software implementation to create a functional and reliable system.</p>
        
        <p>The system integrates multiple sensors and actuators to achieve its functionality. The project has been designed 
        with modularity in mind, allowing easy customization and expansion for different use cases. All components are readily 
        available from common electronics suppliers, making this tutorial accessible to makers of all skill levels.</p>

        <p>Detailed build instructions, code comments, and troubleshooting tips are provided to ensure successful replication. 
        The tutorial has been thoroughly tested and validated by the community, with many successful builds reported.</p>
    `;

    // Put it on the page
    document.getElementById('project-description').innerHTML = descriptionHTML;
}

/**
 * Display  Bill of Materials (BOM)
 * Use the backend file_bom field:
 *  - Images: show on page + download button
 *  - CSV: download button
 *  - XLS/XLSX/other: download button
 */
function renderBOM(project) {
    const bomContainer = document.getElementById('project-bom');
    if (!bomContainer) return;

    const bomSection = bomContainer.closest('section');
    const uploadsBasePath = 'http://127.0.0.1:8890/api/v1/uploads/';
    const fileName = project.fileBom || project.file_bom;

    if (!fileName) {
        if (bomSection) bomSection.style.display = 'none';
        return;
    }

    const fileUrl = uploadsBasePath + encodeURIComponent(fileName);
    const lowerName = fileName.toLowerCase();

    // Images: show on page + download button
    // use file name Regex.
    if (/\.(png|jpe?g|gif|webp|bmp|svg)$/.test(lowerName)) {
        bomContainer.innerHTML = `
            <img src="${fileUrl}"
                 class="img-fluid rounded mb-3"
                 alt="Bill of materials for ${project.title}">
            <a href="${fileUrl}" class="btn btn-outline-info" target="_blank" rel="noopener">
                <i class="fa fa-download me-1"></i>
                Download BOM
            </a>
        `;
        return;
    }

    // CSV: download button
    if (lowerName.endsWith('.csv')) {
        bomContainer.innerHTML = '<p class="text-muted">Loading Bill of Materials...</p>';

        fetch(fileUrl)
            .then(function (response) {
                if (!response.ok) {
                    throw new Error('Failed to load BOM CSV');
                }
                return response.text();
            })

            .catch(function () {
                bomContainer.innerHTML = `
                    <a href="${fileUrl}" class="btn btn-outline-info" target="_blank" rel="noopener">
                        <i class="fa fa-download me-1"></i>
                        Download BOM (CSV)
                    </a>
                `;
            });

        return;
    }

    // XLS/XLSX/other: downloadbutton
    bomContainer.innerHTML = `
        <a href="${fileUrl}" class="btn btn-outline-info" target="_blank" rel="noopener">
            <i class="fa fa-download me-1"></i>
            View / Download BOM
        </a>
    `;
}

/**
 * Update the GitHub link with the tutorial-specific URL
 */
function updateGitHubLink(project) {
    // Find the GitHub link element
    const githubLink = document.getElementById('github-link');

    if (githubLink) {
        // Create a GitHub repo URL from the tutorial title
        // Example: "Smart Home Hub" becomes "smart-home-hub"
        const repoName = project.title.toLowerCase().replace(/\s+/g, '-');
        githubLink.href = `https://github.com/voltara/${repoName}`;
    }
}

/**
 * Display other tutorials by the same creator
 * Shows up to 3 tutorial cards at the bottom
 */
function renderCreatorProjects(project) {
    const creatorProjects = getProjectsByAuthor(project.user.user_name, project.id);

    if (creatorProjects.length === 0) {
        document.getElementById('creator-projects').innerHTML = `
            <div class="col-12">
                <p class="text-muted text-center py-4">No other projects from this creator yet.</p>
            </div>
        `;
        return;
    }

    const uploadsBasePath = 'http://127.0.0.1:8890/api/v1/uploads/';

    const projectsHTML = creatorProjects.map(proj => {
        const placeholderSrc = `https://placehold.co/400x300/23374D/FFFFFF?text=${encodeURIComponent(proj.category.name)}`;
        const imageFileName = proj.imageMain || proj.image_main;
        const imageSrc = imageFileName ? (uploadsBasePath + encodeURIComponent(imageFileName)) : placeholderSrc;

        return `
        <div class="col">
            <div class="card h-100 ms-0 rounded-4 border bg-light tutorial-card">
                <a href="project-details.html?id=${proj.id}" class="text-decoration-none">
                    <img src="${imageSrc}" 
                         class="card-img-top rounded-top-3 tutorial-card-img" 
                         alt="${proj.title}"
                         onerror="this.onerror=null;this.src='${placeholderSrc}'" />
                    <div class="card-body tutorial-card-body">
                        <h5 class="card-title text-secondary fw-bolder tutorial-card-title">
                            ${proj.title}
                        </h5>
                        <p class="card-text text-dark small tutorial-card-desc">
                            ${proj.description}
                        </p>
                    </div>
                </a>
            </div>
        </div>
        `;
    }).join('');

    document.getElementById('creator-projects').innerHTML = projectsHTML;
}

/**
 * Start everything when the page finishes loading
 * DOMContentLoaded means "the HTML is ready".
 */
document.addEventListener('DOMContentLoaded', function () {
    var header = document.getElementById('project-header');
    if (!header) {
        // Nothing to render on this page
        return;
    }

    // if tutorials are already loaded, render immediately
    // otherwise, wait for tutorials to load - show loading spinner
    if (voltaraTutorials.length > 0) {
        header.innerHTML = '';
        loadProjectDetails();
    } else {
        header.innerHTML = '<div class="text-center py-5"><div class="spinner-border text-primary" role="status"><span class="visually-hidden">Loading...</span></div></div>';

        ensureTutorialsLoaded().then(function () {
            if (!voltaraTutorials.length) {
                header.innerHTML = '<div class="text-center py-5">Tutorial not found.</div>';
                return;
            }

            header.innerHTML = '';
            loadProjectDetails();
        });
    }
});