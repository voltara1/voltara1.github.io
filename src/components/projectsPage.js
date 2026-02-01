
/**
 * Create HTML for one project card
 * 
 * @param {Object} project - One project with title, description, image, etc.
 * @returns {string} HTML code for the project card
 */
function renderExploreProjectCard(project) {
    const placeholderSrc = `https://placehold.co/400x300/23374D/FFFFFF?text=${encodeURIComponent(project.category.name)}`;
    const uploadsBasePath = 'http://127.0.0.1:8890/api/v1/uploads/';
    const imageFileName = project.imageMain || project.image_main;
    const imageSrc = imageFileName ? (uploadsBasePath + encodeURIComponent(imageFileName)) : placeholderSrc;

    return `
        <div class="col">
            <div class="card h-100 ms-0 rounded-4 border bg-light tutorial-card">
                <a href="project-details.html?id=${project.id}" class="text-decoration-none">
                    <img src="${imageSrc}" 
                         class="card-img-top rounded-top-3 tutorial-card-img" 
                         alt="${project.title}"
                         onerror="this.onerror=null;this.src='${placeholderSrc}'" />
                    <div class="card-body tutorial-card-body">
                        <h5 class="card-title text-secondary fw-bolder tutorial-card-title">
                            ${project.title}
                        </h5>
                        <p class="card-text text-dark small tutorial-card-desc">
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
        filteredProjects = voltaraTutorials;
    } else {
        // Filter projects that match the selected category
        filteredProjects = voltaraTutorials.filter(project =>
            project.category.name.toLowerCase() === category.toLowerCase()
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
    // Check if voltaraTutorials exists
    if (typeof voltaraTutorials === 'undefined') {
        console.error('Error: Project data (voltaraTutorials) not found.');
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

// Wait for the page to fully load, then either render immediately or load tutorials
document.addEventListener('DOMContentLoaded', function () {
    const exploreGrid = document.getElementById('explore-projects-grid');
    if (!exploreGrid) {
        // Nothing to render on this page
        return;
    }

    // if tutorials are already loaded, render immediately
    // otherwise, wait for tutorials to load - show loading spinner
    if (voltaraTutorials.length > 0) {
        exploreGrid.innerHTML = '';
        startExploreProjects();
    } else {
        exploreGrid.innerHTML = '<div class="text-center py-5"><div class="spinner-border text-primary" role="status"><span class="visually-hidden">Loading...</span></div></div>';

        ensureTutorialsLoaded().then(function () {
            if (!voltaraTutorials.length) {
                exploreGrid.innerHTML = '<div class="text-center py-5">No tutorials available.</div>';
                return;
            }

            exploreGrid.innerHTML = '';
            startExploreProjects();
        });
    }
});
