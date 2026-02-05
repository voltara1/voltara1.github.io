
document.addEventListener('DOMContentLoaded', () => {
  // -----------------------------------------------------------------
  // Grab the modal instance (if present) so we can close it programmatically
  // -----------------------------------------------------------------
  const loginSignupModalEl = document.getElementById('loginSignupModal');
  const loginSignupModal   = loginSignupModalEl ? bootstrap.Modal.getOrCreateInstance(loginSignupModalEl) : null;

  // -----------------------------------------------------------------
  // Hero CTA: Share Tutorial button behavior
  // -----------------------------------------------------------------
  const shareTutorialBtn = document.getElementById('share-tutorial-btn');
  if (shareTutorialBtn) {
    shareTutorialBtn.addEventListener('click', (e) => {
      e.preventDefault();
      const token = localStorage.getItem('authToken');
      if (token) {
        window.location.href = 'userpage.html';
      } else if (loginSignupModal) {
        loginSignupModal.show();
      }
    });
  }

  // -----------------------------------------------------------------
  // Function to update auth button in navbar
  // -----------------------------------------------------------------
  const updateAuthButton = () => {
    const token = localStorage.getItem('authToken');
    const loginButton = document.getElementById('authButton');
    const dropdownMenu = document.getElementById('authDropdownMenu');
    const dashboardLink = document.getElementById('nav-dashboard-link');
    const profileLink = document.getElementById('nav-profile-link');
    const logoutLink = document.getElementById('nav-logout-link');

    if (token && loginButton) {
      const userName = localStorage.getItem('userName') || 'Account';
      const isAdmin = localStorage.getItem('isAdmin') === 'true';

      // Configure button appearance
      loginButton.innerHTML = '';
      const userIcon = document.createElement('i');
      userIcon.classList.add('pe-2', 'fas', 'fa-user');
      loginButton.appendChild(userIcon);
      loginButton.appendChild(document.createTextNode(userName));

      loginButton.classList.remove('btn-secondary');
      loginButton.classList.add('btn-success');
      loginButton.setAttribute('data-bs-toggle', 'dropdown');
      loginButton.removeAttribute('data-bs-target');
      loginButton.onclick = null; // let Bootstrap handle dropdown

      // Configure dropdown menu if present
      if (dropdownMenu) {
        dropdownMenu.classList.remove('d-none');
      }
      if (dashboardLink) {
        // Pages like index.html, projects.html, project-details.html
        dashboardLink.textContent = isAdmin ? 'Admin Dashboard' : 'My Tutorials';
        dashboardLink.onclick = function (e) {
          e.preventDefault();
          window.location.href = isAdmin ? 'adminPage.html' : 'userpage.html';
        };
      }

      if (profileLink) {
        // Pages like adminPage.html where we only want Update Profile + Logout
        profileLink.textContent = 'Update Profile';
        profileLink.onclick = function (e) {
          e.preventDefault();
          // Placeholder: profile update not implemented yet
        };
      }
      if (logoutLink) {
        logoutLink.onclick = function (e) {
          e.preventDefault();
          if (typeof window.logout === 'function') {
            window.logout();
          }
        };
      }
    } else if (loginButton) {
      // User is not logged in - show login/signup button
      loginButton.textContent = 'Login / Signup';
      loginButton.classList.remove('btn-success');
      loginButton.classList.add('btn-secondary');
      loginButton.onclick = null;
      loginButton.setAttribute('data-bs-toggle', 'modal');
      loginButton.setAttribute('data-bs-target', '#loginSignupModal');

      // Hide dropdown menu if present
      if (dropdownMenu) {
        dropdownMenu.classList.add('d-none');
      }
    }
  };

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
        // If the browser's native validation fails, let it show the tooltips
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

      // Map form fields to match your UserDto model exactly
      let requestBody;
      
      if (endpoint.includes('signin') || endpoint.includes('login')) {
        requestBody = {
          email: document.getElementById('loginEmail').value.trim(),
          password: document.getElementById('loginPassword').value.trim()
        };
      } else if (endpoint.includes('signup')) {
        requestBody = {
          userName: document.getElementById('signupName').value.trim(),
          email: document.getElementById('signupEmail').value.trim(),
          password: document.getElementById('signupPassword').value.trim()
        };
      } else {
        requestBody = payload;
      }

      // -------------------------------------------------------------
      //  Send it to the server (JSON API)
      // -------------------------------------------------------------
      try {
        const resp = await fetch(endpoint, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(requestBody)
        });

        // Check content type before parsing
        const contentType = resp.headers.get('content-type');
        let answer;
        
        if (contentType && contentType.includes('application/json')) {
          answer = await resp.json();
        } else {
          const textResponse = await resp.text();
          answer = { message: textResponse || `Server returned ${resp.status} ${resp.statusText}` };
        }
  
        if (!resp.ok) {
          // ---------------------------------------------------------
          // Server responded with an error (400‑500)
          // ---------------------------------------------------------
          let msg = answer.message || answer.error || `Server returned ${resp.status} ${resp.statusText}`;
          
          // Handle specific HTTP status codes
          if (resp.status === 409) {
            // Conflict - email already exists
            msg = 'User already exists. Please use a different email address.';
          } else if (resp.status === 403) {
            // Forbidden - check if it's a specific security message
            if (answer.message && (answer.message.toLowerCase().includes('email already exists') || 
                                  answer.message.toLowerCase().includes('please use another email'))) {
              msg = 'User already exists. Please use a different email address.';
            } else if (answer.message && answer.message.toLowerCase().includes('access denied')) {
              msg = 'Access forbidden. Please check your permissions.';
            } else {
              // Generic forbidden message
              msg = 'Access forbidden. Please check your permissions.';
            }
          } else if (resp.status === 500) {
            // Server error - might be unhandled exception
            if (answer.message && answer.message.toLowerCase().includes('email already exists')) {
              msg = 'User already exists. Please use a different email address.';
            } else {
              msg = 'Server error occurred. Please try again later.';
            }
          } else if (resp.status === 405) {
            msg = 'HTTP method not allowed. Please check the endpoint URL.';
          } else if (resp.status === 404) {
            msg = 'Server endpoint not found. Please check the URL.';
          } else if (resp.status === 401) {
            msg = 'Invalid credentials.';
          } else if (resp.status === 400) {
            msg = answer.message || 'Please check your input.';
          }
          
          const alert = createAlert('danger', msg);
          formEl.prepend(alert);
        } else {
          // ---------------------------------------------------------
          // Show Message
          // ---------------------------------------------------------
          const successMsg = answer.message ||
            (endpoint.includes('login') || endpoint.includes('signin')
              ? 'You are now logged in!'
              : 'Your account has been created!');

          const alert = createAlert('success', successMsg);
          formEl.prepend(alert);

          // Store token and user info if returned and update auth button
          if (answer.token) {
            localStorage.setItem('authToken', answer.token);
            localStorage.setItem('refreshToken', answer.refreshToken || '');
            localStorage.setItem('userName', answer.userName || document.getElementById('loginEmail').value.split('@')[0]);

            // Detect admin role from response and persist a simple flag
            let isAdminFlag = false;
            const roleCandidates = [answer.roles, answer.authorities, answer.role, answer.userRole, answer.scope];
            for (const val of roleCandidates) {
              if (!val) continue;
              if (typeof val === 'string') {
                if (val.toUpperCase().includes('ADMIN')) { isAdminFlag = true; break; }
              } else if (Array.isArray(val)) {
                if (val.some(r => typeof r === 'string' && r.toUpperCase().includes('ADMIN'))) { isAdminFlag = true; break; }
              }
            }
            localStorage.setItem('isAdmin', isAdminFlag ? 'true' : 'false');
            
            // NEW: Store user ID from the response
            if (answer.id) {
              localStorage.setItem('userId', answer.id);
              // Show user ID in a toast notification if toast helper exists
              if (typeof showToast === 'function') {
                showToast({
                  bgColor: "info",
                  msg: `User ID: ${answer.id} (retrieved successfully)`
                });
              }
            } else {
              console.error('Sign-in response does not contain "id" field');
            }
            
            updateAuthButton(); // Update navbar button
          }

          // Redirect to home page (index.html) on successful login
          if (endpoint.includes('login') || endpoint.includes('signin')) {
            setTimeout(() => {
              window.location.href = 'index.html';
            }, 1500);
          } else if (endpoint.includes('signup')) {
            // Clear the signup form
            document.getElementById('signupName').value = '';
            document.getElementById('signupEmail').value = '';
            document.getElementById('signupPassword').value = '';
            
            // Automatically switch to login tab after successful signup
            setTimeout(() => {
              const loginTab = document.querySelector('#pills-login-tab');
              if (loginTab) {
                new bootstrap.Tab(loginTab).show();
                
                // Pre-fill email in login form for convenience
                const signupEmail = document.getElementById('signupEmail').value;
                if (signupEmail) {
                  document.getElementById('loginEmail').value = signupEmail;
                }
              }
            }, 1000);
          }

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
        console.error('Fetch error details:', err);
        let msg = 'Network error – try again later.';
        
        // Provide more specific error messages
        if (err instanceof TypeError && err.message.includes('fetch')) {
          msg = 'Unable to connect to server. Please check if the server is running.';
        } else if (err.name === 'AbortError') {
          msg = 'Request timed out. Please try again.';
        }
        
        const alert = createAlert('danger', msg);
        formEl.prepend(alert);
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
  // Pagination functions for Featured Projects
  // -------------------------------------------------------------
  const projectsContainer = document.querySelector('.container-fluid.my-2.row');
  const paginationContainer = document.querySelector('.pagination');
  
  // Get all project cards
  if (projectsContainer && paginationContainer) {
    const allProjects = Array.from(projectsContainer.querySelectorAll('.col'));
    const itemsPerPage = 8;
    let currentPage = 1;
    const totalPages = Math.ceil(allProjects.length / itemsPerPage);

    const showPage = (page) => {
      currentPage = page;
      
      // Hide all projects
      allProjects.forEach(project => {
        project.style.display = 'none';
      });
      
      // Show projects for current page
      const startIndex = (page - 1) * itemsPerPage;
      const endIndex = startIndex + itemsPerPage;
      
      for (let i = startIndex; i < endIndex && i < allProjects.length; i++) {
        allProjects[i].style.display = 'block';
      }
      
      // Update pagination controls
      updatePagination();
    };

    const updatePagination = () => {
      paginationContainer.innerHTML = '';
      
      // Previous button
      const prevLi = document.createElement('li');
      prevLi.className = `page-item ${currentPage === 1 ? 'disabled' : ''}`;
      prevLi.innerHTML = '<a class="page-link" href="#" tabindex="-1">Previous</a>';
      if (currentPage > 1) {
        prevLi.addEventListener('click', (e) => {
          e.preventDefault();
          showPage(currentPage - 1);
        });
      }
      paginationContainer.appendChild(prevLi);
      
      // Page numbers
      for (let i = 1; i <= totalPages; i++) {
        const li = document.createElement('li');
        li.className = `page-item ${i === currentPage ? 'active' : ''}`;
        li.innerHTML = `<a class="page-link" href="#">${i}</a>`;
        
        if (i !== currentPage) {
          li.addEventListener('click', (e) => {
            e.preventDefault();
            showPage(i);
          });
        }
        
        paginationContainer.appendChild(li);
      }
      
      // Next button
      const nextLi = document.createElement('li');
      nextLi.className = `page-item ${currentPage === totalPages ? 'disabled' : ''}`;
      nextLi.innerHTML = '<a class="page-link" href="#">Next</a>';
      if (currentPage < totalPages) {
        nextLi.addEventListener('click', (e) => {
          e.preventDefault();
          showPage(currentPage + 1);
        });
      }
      paginationContainer.appendChild(nextLi);
    };

    // Initialize pagination
    if (allProjects.length > 0) {
      showPage(1);
    }
  }

  // -------------------------------------------------------------
  // Merge data
  // -------------------------------------------------------------
  const loginForm   = document.querySelector('#pills-login form');
  const signupForm  = document.querySelector('#pills-signup form');

  if (loginForm && signupForm) {
    // Store the original button text so we can restore it later
    const loginSubmitBtn = loginForm.querySelector('button[type="submit"]');
    const signupSubmitBtn = signupForm.querySelector('button[type="submit"]');
    if (loginSubmitBtn) loginSubmitBtn.dataset.originalText = 'Login';
    if (signupSubmitBtn) signupSubmitBtn.dataset.originalText = 'Sign Up';

    // Update these to match your actual endpoints
    bindForm(loginForm,  'http://localhost:8890/api/v1/public/signin');   
    bindForm(signupForm, 'http://localhost:8890/api/v1/public/signup'); 

    // -----------------------------------------------------------
    //  clear alerts when the user switches tabs
    // -----------------------------------------------------------
    const pills = document.getElementById('pills-tab');
    if (pills) {
      pills.addEventListener('shown.bs.tab', (event) => {
        const targetPaneSelector = event.target.getAttribute('data-bs-target');
        if (!targetPaneSelector) return;
        const currentlyVisiblePane = document.querySelector(targetPaneSelector);
        if (!currentlyVisiblePane) return;
        currentlyVisiblePane.querySelectorAll('.alert').forEach(a => a.remove());
      });
    }
  }

  // -------------------------------------------------------------
  // Check authentication status on page load
  // -------------------------------------------------------------
  const checkAuthStatus = () => {
    const token = localStorage.getItem('authToken');
    if (token) {
      updateAuthButton();
    }
  };

  checkAuthStatus();

  // -------------------------------------------------------------
  // Logout function
  // -------------------------------------------------------------
  window.logout = function() {
    localStorage.removeItem('authToken');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('userName');
    localStorage.removeItem('userId'); // Remove user ID on logout
    localStorage.removeItem('isAdmin');
    updateAuthButton(); // Switch back to login button
    
    // Show success message if toast helper is available
    if (typeof showToast === 'function') {
      showToast({ bgColor: "success", msg: "You have been logged out successfully." });
    }

    // Redirect to home page
    window.location.href = 'index.html';
  };
});
