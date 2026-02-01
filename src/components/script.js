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

    const toast = new bootstrap.Toast(toastElement, { delay: 4000 });
    toast.show(); /* display the toast message for 4 secs */
}

document.addEventListener('DOMContentLoaded', () => {
  // -----------------------------------------------------------------
  // Grab the modal instance (so we can close it programmatically)
  // -----------------------------------------------------------------
  const loginSignupModalEl = document.getElementById('loginSignupModal');
  const loginSignupModal   = bootstrap.Modal.getOrCreateInstance(loginSignupModalEl);

  // -----------------------------------------------------------------
  // Function to update auth button in navbar
  // -----------------------------------------------------------------
  const updateAuthButton = () => {
    const token = localStorage.getItem('authToken');
    const loginButton = document.querySelector('.navbar-nav.nav-pills .btn-primary') || 
                       document.querySelector('.navbar-nav.nav-pills .btn-success');
    
    if (token && loginButton) {
      // User is logged in - show user name
      const userName = localStorage.getItem('userName') || 'Account';
      loginButton.textContent = userName;
      loginButton.classList.remove('btn-primary');
      loginButton.classList.add('btn-success');
      loginButton.onclick = function() {
        window.location.href = 'userpage.html';
      };
    } else if (loginButton) {
      // User is not logged in - show login button
      loginButton.textContent = 'Login';
      loginButton.classList.remove('btn-success');
      loginButton.classList.add('btn-primary');
      loginButton.onclick = null;
      loginButton.setAttribute('data-bs-toggle', 'modal');
      loginButton.setAttribute('data-bs-target', '#loginSignupModal');
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
            updateAuthButton(); // Update navbar button
          }

          // Redirect to userpage.html on successful login
          if (endpoint.includes('login') || endpoint.includes('signin')) {
            setTimeout(() => {
              window.location.href = 'userpage.html';
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

  // Store the original button text so we can restore it later
  loginForm.querySelector('button[type="submit"]').dataset.originalText   = 'Login';
  signupForm.querySelector('button[type="submit"]').dataset.originalText  = 'Sign Up';

  // Update these to match your actual endpoints
  bindForm(loginForm,  'http://localhost:8890/api/v1/public/signin');   
  bindForm(signupForm, 'http://localhost:8890/api/v1/public/signup'); 

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
    updateAuthButton(); // Switch back to login button
    
    // Show success message
    showToast({ bgColor: "success", msg: "You have been logged out successfully." });
  };
});
