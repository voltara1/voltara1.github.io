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
    toastElement.classList.remove("bg-success", "bg-danger");
    toastElement.classList.add("bg-" + bgColor);

    const toast = new bootstrap.Toast(toastElement, { delay: 10000 });
    toast.show(); /* display the toast message for 10 secs */
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

// ========== CATEGORY FILTERING CODE ==========

/**
 * Filter projects by category
 * @param {string} category - The category to filter by (e.g., "Arduino", "ESP32", "ALL")
 */
function filterProjectsByCategory(category) {
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
    // Check if mockProjects exists
    if (typeof mockProjects === 'undefined') {
        console.error('mockProjects not loaded. Make sure mockData.js is included.');
        return;
    }

    // Check if Pagination class exists
    if (typeof Pagination === 'undefined') {
        console.error('Pagination class not loaded. Make sure pagination.js is included.');
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
// This is the ONLY DOMContentLoaded listener
document.addEventListener('DOMContentLoaded', initializeFeaturedProjects);