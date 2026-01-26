

/**
 * Get the project ID from the URL
 * When you visit project-details.html?id=5, this extracts the "5"
 */
function getProjectIdFromURL() {
    // URLSearchParams helps us read the ?id=5 part of the URL
    const urlParams = new URLSearchParams(window.location.search);
    
    // Get the 'id' value and convert it to a number
    return parseInt(urlParams.get('id'));
}

/**
 * Find a specific project by its ID number
 * 
 * @param {number} id - The project ID to search for
 * @returns {Object} The project object, or undefined if not found
 */
function getProjectById(id) {
    // Search through all projects and return the one with matching ID
    return mockProjects.find(project => project.id === id);
}

/**
 * Get other projects created by the same author
 * 
 * @param {string} author - The author's name
 * @param {number} excludeId - The current project ID to exclude
 * @returns {Array} Up to 3 other projects by this author
 */
function getProjectsByAuthor(author, excludeId) {
    return mockProjects
        .filter(project => project.author === author && project.id !== excludeId)
        .slice(0, 3); // Only get the first 3
}

/**
 * Main function - Load and display all project details
 * This runs when the page loads
 */
function loadProjectDetails() {
    // Get the project ID from the URL
    const projectId = getProjectIdFromURL();

    // Check if we got a valid ID
    if (!projectId) {
        document.getElementById('project-header').innerHTML =
            '<div class="alert alert-danger">Project ID not found in URL. Please click on a project card to view details.</div>';
        return; // Stop here if no ID
    }

    // Find the project with this ID
    const project = getProjectById(projectId);

    // Check if project exists
    if (!project) {
        document.getElementById('project-header').innerHTML =
            '<div class="alert alert-danger">Project not found. This project may not exist.</div>';
        return; // Stop here if project doesn't exist
    }

    // Display all project information
    renderProjectHeader(project);
    renderMainImage(project);
    renderDescription(project);
    renderBOM(project);
    updateGitHubLink(project);
    renderCreatorProjects(project);
}

/**
 * Display the project title and tags
 */
function renderProjectHeader(project) {
    // Create HTML for the title and tags
    const headerHTML = `
        <h1 class="project-title mb-4">${project.title}</h1>
        <div class="project-tags mb-4">
            ${project.tags.map(tag => `<span class="badge bg-secondary me-2 mb-2">${tag}</span>`).join('')}
        </div>
    `;
    
    // Put it on the page
    document.getElementById('project-header').innerHTML = headerHTML;
}

/**
 * Display the main project image
 */
function renderMainImage(project) {
    // Create a placeholder image with the project title
    const imageHTML = `
        <img src="https://placehold.co/1200x400/FF6B35/FFFFFF?text=${encodeURIComponent(project.title)}" 
             class="img-fluid rounded" 
             alt="${project.title}"
             style="width: 100%; height: 400px; object-fit: cover;">
    `;
    
    // Put it on the page
    document.getElementById('project-main-image').innerHTML = imageHTML;
}

/**
 * Display the project description with details
 */
function renderDescription(project) {
    // Create description HTML with multiple paragraphs
    const descriptionHTML = `
        <p>${project.description}</p>
        
        <p>This ${project.category.name} project demonstrates innovative use of modern electronics and microcontroller technology. 
        It combines practical hardware design with efficient software implementation to create a functional and reliable system.</p>
        
        <p>The system integrates multiple sensors and actuators to achieve its functionality. The project has been designed 
        with modularity in mind, allowing easy customization and expansion for different use cases. All components are readily 
        available from common electronics suppliers, making this project accessible to makers of all skill levels.</p>

        <p>Detailed build instructions, code comments, and troubleshooting tips are provided to ensure successful replication. 
        The project has been thoroughly tested and validated by the community, with many successful builds reported.</p>
    `;
    
    // Put it on the page
    document.getElementById('project-description').innerHTML = descriptionHTML;
}

/**
 * Display the Bill of Materials (BOM) table
 * This shows all components needed for the project
 */
function renderBOM(project) {
    // Create a table with all components
    const bomHTML = `
        <div class="table-responsive">
            <table class="table table-bordered">
                <thead class="table-light">
                    <tr>
                        <th>Component</th>
                        <th>Quantity</th>
                        <th>Specification</th>
                        <th>Package</th>
                        <th>Notes</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>Microcontroller</td>
                        <td>1</td>
                        <td>ESP32-WROOM-32</td>
                        <td>Module</td>
                        <td>Main processor with WiFi/BT</td>
                    </tr>
                    <tr>
                        <td>Voltage Regulator</td>
                        <td>1</td>
                        <td>AMS1117-3.3V</td>
                        <td>SOT-223</td>
                        <td>3.3V power supply</td>
                    </tr>
                    <tr>
                        <td>Resistor</td>
                        <td>5</td>
                        <td>10kΩ ±5%</td>
                        <td>0805</td>
                        <td>Pull-up resistors</td>
                    </tr>
                    <tr>
                        <td>Resistor</td>
                        <td>2</td>
                        <td>330Ω ±5%</td>
                        <td>0805</td>
                        <td>LED current limiting</td>
                    </tr>
                    <tr>
                        <td>Capacitor</td>
                        <td>4</td>
                        <td>100nF</td>
                        <td>0805</td>
                        <td>Decoupling capacitors</td>
                    </tr>
                    <tr>
                        <td>Capacitor</td>
                        <td>2</td>
                        <td>10µF</td>
                        <td>0805</td>
                        <td>Power filtering</td>
                    </tr>
                    <tr>
                        <td>LED</td>
                        <td>2</td>
                        <td>Green/Red</td>
                        <td>0805</td>
                        <td>Status indicators</td>
                    </tr>
                    <tr>
                        <td>Push Button</td>
                        <td>2</td>
                        <td>Tactile Switch</td>
                        <td>6x6mm</td>
                        <td>Reset & Boot buttons</td>
                    </tr>
                    <tr>
                        <td>USB Connector</td>
                        <td>1</td>
                        <td>USB Type-C</td>
                        <td>Through-hole</td>
                        <td>Programming & Power</td>
                    </tr>
                    <tr>
                        <td>Crystal Oscillator</td>
                        <td>1</td>
                        <td>16MHz</td>
                        <td>HC-49S</td>
                        <td>External clock (optional)</td>
                    </tr>
                    <tr>
                        <td>PCB</td>
                        <td>1</td>
                        <td>Custom Design</td>
                        <td>-</td>
                        <td>See Gerber files</td>
                    </tr>
                </tbody>
            </table>
        </div>
    `;
    
    // Put it on the page
    document.getElementById('project-bom').innerHTML = bomHTML;
}

/**
 * Update the GitHub link with the project-specific URL
 */
function updateGitHubLink(project) {
    // Find the GitHub link element
    const githubLink = document.getElementById('github-link');
    
    if (githubLink) {
        // Create a GitHub repo URL from the project title
        // Example: "Smart Home Hub" becomes "smart-home-hub"
        const repoName = project.title.toLowerCase().replace(/\s+/g, '-');
        githubLink.href = `https://github.com/voltara/${repoName}`;
    }
}

/**
 * Display other projects by the same creator
 * Shows up to 3 project cards at the bottom
 */
function renderCreatorProjects(project) {
    // Get other projects by this author
    const creatorProjects = getProjectsByAuthor(project.author, project.id);

    // Check if there are any other projects
    if (creatorProjects.length === 0) {
        document.getElementById('creator-projects').innerHTML = `
            <div class="col-12">
                <p class="text-muted text-center py-4">No other projects from this creator yet.</p>
            </div>
        `;
        return; // Stop here if no other projects
    }

    // Create HTML for each project card
    const projectsHTML = creatorProjects.map(proj => `
        <div class="col">
            <div class="card h-100 shadow-sm hover-card">
                <img src="${proj.imageUrl}" 
                     class="card-img-top" 
                     alt="${proj.title}"
                     style="height: 250px; object-fit: cover;"
                     onerror="this.src='https://placehold.co/400x300/23374D/FFFFFF?text=${encodeURIComponent(proj.category.name)}'">
                <div class="card-body d-flex flex-column">
                    <span class="badge bg-secondary mb-2 align-self-start">${proj.category.name}</span>
                    <h5 class="card-title">${proj.title}</h5>
                    <p class="card-text text-muted flex-grow-1">${proj.description.substring(0, 100)}...</p>
                    <div class="d-flex justify-content-between align-items-center mt-3">
                        <div>
                            <small class="text-muted me-3">
                                <i class="fa fa-heart text-danger me-1"></i>${proj.likes}
                            </small>
                            <small class="text-muted">
                                <i class="fa fa-comment text-primary me-1"></i>${proj.comments}
                            </small>
                        </div>
                        <a href="project-details.html?id=${proj.id}" class="btn btn-primary btn-sm">
                            View Project
                        </a>
                    </div>
                </div>
            </div>
        </div>
    `).join(''); // join('') combines all the HTML into one string

    // Put the cards on the page
    document.getElementById('creator-projects').innerHTML = projectsHTML;
}

/**
 * Start everything when the page finishes loading
 * DOMContentLoaded means "the HTML is ready"
 */
document.addEventListener('DOMContentLoaded', loadProjectDetails);