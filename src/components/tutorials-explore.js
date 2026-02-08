
/**
 * Create HTML for one tutorial card
 * 
 * @param {Object} tutorial - One tutorial with title, description, image, etc.
 * @returns {string} HTML code for the tutorial card
 */
function renderExploreTutorialCard(tutorial) {
    const placeholderSrc = `https://placehold.co/400x300/23374D/FFFFFF?text=${encodeURIComponent(tutorial.category.name)}`;
    const uploadsBasePath = UPLOADS_BASE_URL;
    const imageFileName = tutorial.imageMain || tutorial.image_main;
    const imageSrc = imageFileName ? (uploadsBasePath + encodeURIComponent(imageFileName)) : placeholderSrc;

    return `
        <div class="col">
            <div class="card h-100 ms-0 rounded-4 border bg-light tutorial-card">
                <a href="tutorial-details.html?id=${tutorial.id}" class="text-decoration-none">
                    <img src="${imageSrc}" 
                         class="card-img-top rounded-top-3 tutorial-card-img" 
                         alt="${tutorial.title}"
                         onerror="this.onerror=null;this.src='${placeholderSrc}'" />
                    <div class="card-body tutorial-card-body">
                        <h5 class="card-title text-secondary fw-bolder tutorial-card-title">
                            ${tutorial.title}
                        </h5>
                        <p class="card-text text-dark small tutorial-card-desc">
                            ${tutorial.description}
                        </p>
                    </div>
                </a>
            </div>
        </div>
    `;
}

/**
 * Filter tutorials by category for Explore page
 * @param {string} category - The category to filter by
 */
function filterExploreTutorials(category) {
    let filteredTutorials;

    // If "ALL" or no category, show all tutorials
    if (!category || category === 'ALL') {
        filteredTutorials = voltaraTutorials;
    } else {
        // Filter tutorials that match the selected category
        filteredTutorials = voltaraTutorials.filter(function (tutorial) {
            return tutorial.category.name.toLowerCase() === category.toLowerCase();
        });
    }

    // Create new pagination with filtered tutorials
    const tutorialsPagination = new Pagination(
        filteredTutorials,                  // Use filtered tutorials
        6,                                  // Show 6 tutorials per page
        'explore-projects-grid',
        'explore-projects-pagination',
        renderExploreTutorialCard
    );

    tutorialsPagination.start();

    console.log(`Filtered by ${category}: Found ${filteredTutorials.length} tutorials`);
}

/**
 * Set up click handlers for filter buttons
 */
function setupExploreFilterButtons() {
    // Find all filter buttons
    const filterButtons = document.querySelectorAll('.btn-filter');

    // Add click handler to each button
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Get category from data attribute
            const category = button.getAttribute('data-category');

            // Filter tutorials
            filterExploreTutorials(category);

            // Update active state
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
        });
    });
}

/**
 * Set up and start the pagination for the Explore Tutorials page
 */
function startExploreTutorials() {
    if (typeof voltaraTutorials === 'undefined') {
        console.error('Error: Tutorial data (voltatraTutorials) not found.');
        return;
    }

    // Check if Pagination class exists
    if (typeof Pagination === 'undefined') {
        console.error('Error: Pagination class not found. Make sure tutorials-pagination.js is loaded.');
        return;
    }

    // Show all tutorials initially
    filterExploreTutorials('ALL');

    // Set up filter button click handlers
    setupExploreFilterButtons();

    console.log('✓ Explore Tutorials page with filtering initialized!');
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
        startExploreTutorials();
    } else {
        exploreGrid.innerHTML = '<div class="text-center py-5"><div class="spinner-border text-primary" role="status"><span class="visually-hidden">Loading...</span></div></div>';

        ensureTutorialsLoaded().then(function () {
            if (!voltaraTutorials.length) {
                exploreGrid.innerHTML = '<div class="text-center py-5">No tutorials available.</div>';
                return;
            }

            exploreGrid.innerHTML = '';
            startExploreTutorials();
        });
    }
});
