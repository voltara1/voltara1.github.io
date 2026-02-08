// submitForm() function is called from onsubmit event on the index.html newsletter section
// the purpose is to validate the email input and show a toast message accordingly.
function submitForm(event) {
    event.preventDefault(); /* prevent the default form submission */

    const emailInput = document.getElementById('txtEmail'); /* get the email input element */
    const email = emailInput.value;

    // validate the email input
    // if the email input is empty, show a toast message and return
    if (email === "") {
        showToast({ bgColor: "danger", msg: "All inputs must not be empty." });
        return;
    }

    // validate the email format using a regular expression
    // if the email format is invalid, show a toast message and return
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    if (!emailRegex.test(email)) {
        showToast({ bgColor: "danger", msg: "Email is invalid. Please check." });
        return;
    }

    // if the email format is valid, show a success toast message
    showToast({ bgColor: "success", msg: "Subscription successful!" });
    event.target.reset();/* reset the form after successful submission */
}

/**
 * function() to display a toast message with the given message and background color
 * @param {string} bgColor the background color (success/danger/info/...)
 * @param {string} msg the message to be displayed in the toast
 */
function showToast({ bgColor, msg }) {
    const toastElement = document.getElementById('msg-toast');
    const toastBodyElement = document.getElementById('msg-toast-body');
    
    toastBodyElement.textContent = msg;

    // Remove ALL possible Bootstrap background classes to prevent color mixing
    toastElement.classList.remove("bg-success", "bg-danger", "bg-warning", "bg-info", "bg-primary");
    
    // Add the new background class
    toastElement.classList.add("bg-" + bgColor);

    // If using Bootstrap 5, consider adding 'text-white' for danger/success
    // or use 'text-bg-' classes instead of 'bg-'
    
    const toast = new bootstrap.Toast(toastElement, { delay: 10000 });
    toast.show();
}

// helper function to map different implementation of toast to use standardised showToast()
function showNotification(message, type) {
    let bg;
    if (type === 'error') {
        bg = 'danger';
    } else if (type === 'success') {
        bg = 'success';
    } else if (type === 'warning') {
        bg = 'warning';
    } else if (type) {
        bg = type;
    } else {
        bg = 'info';
    }
    showToast({ bgColor: bg, msg: message });
}

// ========== PAGINATION CODE ==========

/**
 * renderProjectCard - Creates HTML for one project card
 * This function takes a project object and returns HTML string
 * 
 * @param {Object} project - One project with title, description, image, etc.
 * @returns {string} HTML for the card
 */
function renderProjectCard(project) {
    const placeholderSrc = `https://placehold.co/400x300/23374D/FFFFFF?text=${encodeURIComponent(project.category.name)}`;
    const uploadsBasePath = UPLOADS_BASE_URL;
    const imageFileName = project.imageMain || project.image_main;
    const imageSrc = imageFileName ? (uploadsBasePath + encodeURIComponent(imageFileName)) : placeholderSrc;

    return `
        <div class="col">
            <div class="card h-100 ms-0 rounded-4 border bg-light tutorial-card">
                <a href="tutorial-details.html?id=${project.id}" class="text-decoration-none">
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

// ========== CATEGORY FILTERING CODE ==========

/**
 * Filter projects by category
 * @param {string} category - The category to filter by (e.g., "Arduino", "ESP32", "ALL")
 */
function filterProjectsByCategory(category) {
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
    const featuredProjectsPagination = new Pagination(
        filteredProjects,                   // Use filtered projects instead of all
        9,                                  // Still show 9 per page
        'featured-projects-grid',
        'featured-projects-pagination',
        renderProjectCard
    );

    // Start the pagination with filtered projects
    featuredProjectsPagination.start();

    // Log for debugging
    console.log(`Filtered by ${category}: Found ${filteredProjects.length} projects`);
}

/**
 * Set up click handlers for category buttons
 */
function setupCategoryButtons() {
    // Find all category buttons
    const categoryButtons = document.querySelectorAll('.category-item .btn');

    // Add click handler to each button
    categoryButtons.forEach(button => {
        button.addEventListener('click', (event) => {
            event.preventDefault(); // Prevent default link behavior

            // Get the category text from the button
            const buttonText = button.textContent.trim();

            // Extract just the category name (remove icon text)
            const category = buttonText.split('\n').pop().trim();

            // Filter projects by this category
            filterProjectsByCategory(category);

            updateCuratedCollections(category);

            // Update active state (makes clicked button look selected)
            categoryButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
        });
    });
}

/**
 * Initialize featured projects with filtering
 * This is the ONLY initialization function - runs when page loads
 */
function initializeFeaturedProjects() {
    // Check if voltaraTutorials exists
    if (typeof voltaraTutorials === 'undefined') {
        console.error('voltaraTutorials not loaded. Make sure voltara-db.js is included.');
        return;
    }

    // Check if Pagination class exists
    if (typeof Pagination === 'undefined') {
        console.error('Pagination class not loaded. Make sure tutorials-pagination.js is included.');
        return;
    }

    // Show all projects initially
    filterProjectsByCategory('ALL');

    // Set up category button click handlers
    setupCategoryButtons();

    console.log('✓ Featured Projects with filtering initialized!');
}

// ========== START EVERYTHING ==========
// Wait for page to load, then initialize
// This is the ONLY DOMContentLoaded listener for homepage features

document.addEventListener('DOMContentLoaded', function () {
    const featuredGrid = document.getElementById('featured-projects-grid');
    if (!featuredGrid) {
        // Nothing to render on this page
        return;
    }

    // if tutorials are already loaded, render immediately
    // otherwise, wait for tutorials to load - show loading spinner
    if (voltaraTutorials.length > 0) {
        featuredGrid.innerHTML = '';
        initializeFeaturedProjects();
    } else {
        featuredGrid.innerHTML = '<div class="text-center py-5"><div class="spinner-border text-primary" role="status"><span class="visually-hidden">Loading...</span></div></div>';

        ensureTutorialsLoaded().then(function () {
            if (!voltaraTutorials.length) {
                featuredGrid.innerHTML = '<div class="text-center py-5">No tutorials available.</div>';
                return;
            }

            featuredGrid.innerHTML = '';
            initializeFeaturedProjects();
        });
    }
});