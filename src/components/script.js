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
    toast.show(); /* display the toast message for 4 secs */
}


document.addEventListener('DOMContentLoaded', () => {
  // -----------------------------------------------------------------
  // Grab the modal instance (so we can close it programmatically)
  // -----------------------------------------------------------------
  const loginSignupModalEl = document.getElementById('loginSignupModal');
  const loginSignupModal   = bootstrap.Modal.getOrCreateInstance(loginSignupModalEl);

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
  const loginForm   = document.querySelector('#pills-login form');
  const signupForm  = document.querySelector('#pills-signup form');

  // Store the original button text so we can restore it later
  loginForm.querySelector('button[type="submit"]').dataset.originalText   = 'Login';
  signupForm.querySelector('button[type="submit"]').dataset.originalText  = 'Sign Up';

  bindForm(loginForm,  '/api/login');   // <-- change to your real endpoint
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