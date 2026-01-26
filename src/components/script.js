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
  const imageSrc = project.imageMain || `https://placehold.co/400x300/23374D/FFFFFF?text=${encodeURIComponent(project.category.name)}`;

  return `
        <div class="col">
            <div class="card ms-0 rounded-4 border bg-light">
                <a href="project-details.html?id=${project.id}" class="text-decoration-none">
                    <img src="${imageSrc}" 
                         class="card-img-top rounded-top-3" 
                         alt="${project.title}"
                         onerror="this.src='https://placehold.co/400x300/23374D/FFFFFF?text=${encodeURIComponent(project.category.name)}'" />
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
// document.addEventListener('DOMContentLoaded', );

document.addEventListener('DOMContentLoaded', () => {

  // -----------------------------------------------------------------
  // Initialize featured Projects with filtering
  // -----------------------------------------------------------------
  initializeFeaturedProjects();

  // -----------------------------------------------------------------
  // Grab the modal instance (so we can close it programmatically)
  // -----------------------------------------------------------------
  const loginSignupModalEl = document.getElementById('loginSignupModal');
  const loginSignupModal = bootstrap.Modal.getOrCreateInstance(loginSignupModalEl);

  // -----------------------------------------------------------------
  // show a temporary alert inside the modal body
  // -----------------------------------------------------------------
  const createAlert = (type, message) => {
    // type: "success", "danger", "warning", "info"
    const alert = document.createElement('div');
    alert.className = `alert alert-${type} alert-dismissible fade show`;
    alert.role = 'alert';
    alert.innerHTML = `
      ${message}
      <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
    `;
    return alert;
  };

  // -----------------------------------------------------------------
  // Attach a submit‑handler to **both** forms
  // -----------------------------------------------------------------
  const bindForm = (formEl, endpoint) => {
    formEl.addEventListener('submit', async (e) => {
      e.preventDefault();                     // stop normal form post
      const submitBtn = formEl.querySelector('button[type="submit"]');
      submitBtn.disabled = true;              // prevent double‑clicks
      submitBtn.textContent = ' Please wait…';

      // -------------------------------------------------------------
      // Simple client‑side validation (HTML5 + custom rules)
      // -------------------------------------------------------------
      if (!formEl.checkValidity()) {
        // If the browser’s native validation fails, let it show the tooltips
        formEl.reportValidity();
        submitBtn.disabled = false;
        submitBtn.textContent = submitBtn.dataset.originalText || 'Submit';
        return;
      }

      // Example of a custom rule (password length for sign‑up)
      if (endpoint.includes('signup')) {
        const pwd = formEl.querySelector('#signupPassword').value;
        if (pwd.length < 8 || pwd.length > 20) {
          const alert = createAlert('danger', 'Password must be 8‑20 characters long.');
          formEl.prepend(alert);
          submitBtn.disabled = false;
          submitBtn.textContent = submitBtn.dataset.originalText || 'Submit';
          return;
        }
      }

      // -------------------------------------------------------------
      //   Gather the data (using FormData → plain object)
      // -------------------------------------------------------------
      const formData = new FormData(formEl);
      const payload = Object.fromEntries(formData.entries());

      // -------------------------------------------------------------
      //  Send it to the server (JSON API)
      // -------------------------------------------------------------
      try {
        const resp = await fetch(endpoint, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            // 'X-CSRF-Token': '<your‑token‑if‑you‑need‑it>'
          },
          body: JSON.stringify(payload)
        });

        const answer = await resp.json(); // assume JSON response

        if (!resp.ok) {
          // ---------------------------------------------------------
          // Server responded with an error (400‑500)
          // ---------------------------------------------------------
          const msg = answer.message || 'Something went wrong.';
          const alert = createAlert('danger', msg);
          formEl.prepend(alert);
        } else {
          // ---------------------------------------------------------
          // Show Message
          // ---------------------------------------------------------
          const successMsg = answer.message ||
            (endpoint.includes('login')
              ? 'You are now logged in!'
              : 'Your account has been created!');

          const alert = createAlert('success', successMsg);
          formEl.prepend(alert);

          // optional: store a token, redirect, etc.
          // localStorage.setItem('authToken', answer.token);
          // window.location.reload();

          // Give the user a short moment to read the message,
          // then hide the modal and reset the forms
          setTimeout(() => {
            loginSignupModal.hide();
            formEl.reset();
            // Remove all alerts that might still be in the DOM
            formEl.querySelectorAll('.alert').forEach(a => a.remove());
          }, 1500);
        }
      } catch (err) {
        // -------------------------------------------------------------
        // Network or unexpected error
        // -------------------------------------------------------------
        const alert = createAlert('danger', 'Network error – try again later.');
        formEl.prepend(alert);
        console.error(err);
      } finally {
        // -------------------------------------------------------------
        // Re‑enable the button no matter what happened
        // -------------------------------------------------------------
        submitBtn.disabled = false;
        submitBtn.textContent = submitBtn.dataset.originalText || 'Submit';
      }
    });
  };

  // -------------------------------------------------------------
  // Merge data
  // -------------------------------------------------------------
  const loginForm = document.querySelector('#pills-login form');
  const signupForm = document.querySelector('#pills-signup form');

  // Store the original button text so we can restore it later
  loginForm.querySelector('button[type="submit"]').dataset.originalText = 'Login';
  signupForm.querySelector('button[type="submit"]').dataset.originalText = 'Sign Up';

  bindForm(loginForm, '/api/login');   // <-- change to your real endpoint
  bindForm(signupForm, '/api/signup'); // <-- change to your real endpoint

  // -------------------------------------------------------------
  //  clear alerts when the user switches tabs
  // -------------------------------------------------------------
  const pills = document.getElementById('pills-tab');
  pills.addEventListener('shown.bs.tab', (event) => {
    // event.target   = newly‑shown tab button
    // event.relatedTarget = previous tab button
    const currentlyVisiblePane = document.querySelector(event.target.getAttribute('data-bs-target'));
    currentlyVisiblePane.querySelectorAll('.alert').forEach(a => a.remove());
  });
});