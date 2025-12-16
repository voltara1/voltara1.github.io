
/**
 * Create HTML for one project card
 * 
 * @param {Object} project - One project with title, description, image, etc.
 * @returns {string} HTML code for the project card
 */
function renderExploreProjectCard(project) {
    return `
        <div class="col">
            <div class="card ms-0 rounded-4 border bg-light">
                <a href="project-details.html?id=${project.id}" class="text-decoration-none">
                    <img src="${project.imageUrl}" 
                         class="card-img-top rounded-top-3" 
                         alt="${project.title}"
                         onerror="this.src='https://placehold.co/400x300/23374D/FFFFFF?text=${encodeURIComponent(project.category)}'" />
                    <div class="card-body">
                        <h5 class="card-title text-secondary fw-bolder">
                            ${project.title}
                        </h5>
                        <p class="card-text text-dark small">
                            ${project.description}
                        </p>
                    </div>
                </a>
            </div>
        </div>
    `;
}

/**
 * Filter projects by category for Explore page
 * @param {string} category - The category to filter by
 */
function filterExploreProjects(category) {
    let filteredProjects;
    
    // If "ALL" or no category, show all projects
    if (!category || category === 'ALL') {
        filteredProjects = mockProjects;
    } else {
        // Filter projects that match the selected category
        filteredProjects = mockProjects.filter(project => 
            project.category.toLowerCase() === category.toLowerCase()
        );
    }
    
    // Create new pagination with filtered projects
    const projectsPagination = new Pagination(
        filteredProjects,                   // Use filtered projects
        6,                                  // Show 6 projects per page
        'explore-projects-grid',
        'explore-projects-pagination',
        renderExploreProjectCard
    );
    
    // Start the pagination
    projectsPagination.start();
    
    // Log for debugging
    console.log(`Filtered by ${category}: Found ${filteredProjects.length} projects`);
}

/**
 * Set up click handlers for filter buttons
 */
function setupFilterButtons() {
    // Find all filter buttons
    const filterButtons = document.querySelectorAll('.btn-filter');
    
    // Add click handler to each button
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Get category from data attribute
            const category = button.getAttribute('data-category');
            
            // Filter projects
            filterExploreProjects(category);
            
            // Update active state
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
        });
    });
}

/**
 * Set up and start the pagination for the Explore Projects page
 */
function startExploreProjects() {
    // Check if mockProjects exists
    if (typeof mockProjects === 'undefined') {
        console.error('Error: Project data (mockProjects) not found. Make sure mockData.js is loaded.');
        return;
    }

    // Check if Pagination class exists
    if (typeof Pagination === 'undefined') {
        console.error('Error: Pagination class not found. Make sure pagination.js is loaded.');
        return;
    }

    // Show all projects initially
    filterExploreProjects('ALL');
    
    // Set up filter button click handlers
    setupFilterButtons();
    
    console.log('✓ Explore Projects page with filtering initialized!');
}

// Wait for the page to fully load, then start
document.addEventListener('DOMContentLoaded', startExploreProjects);