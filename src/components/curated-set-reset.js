// Uses global API_BASE_URL provided by config-const.js
// async function to toggle curated flag on/off
// to use PATCH instead of PUT since only 1 property is to be updated

/**
 * Set the curated flag for a tutorial (ADMIN only).
 *
 * @param {number} tutorialId - The ID of the tutorial to update.
 * @param {boolean} curated - Desired curated state (true or false).
 * @param {string} adminToken - JWT token for an ADMIN user ("Bearer" payload).
 * @returns {Promise<object>} - Resolves to the updated tutorial JSON.
 */
async function setTutorialCurated(tutorialId, curated, adminToken) {
    const url = `${API_BASE_URL}/admin/tutorial/${encodeURIComponent(
        tutorialId
    )}/curated?curated=${encodeURIComponent(curated)}`;

    const response = await fetch(url, {
        method: 'PATCH',
        headers: {
            // Content-Type is optional here since there is no body,
            // but safe to include?
            'Content-Type': 'application/json',
            // Pass the ADMIN JWT
            Authorization: `Bearer ${adminToken}`,
        },
    });

    if (!response.ok) {
        const errorText = await response.text().catch(() => '');
        throw new Error(
            `Failed to set curated flag (status ${response.status}): ${errorText}`
        );
    }

    return response.json();
}


async function fetchTutorialById(tutorialId) {
    const url = `${API_BASE_URL}/tutorial/${encodeURIComponent(tutorialId)}`;
    const response = await fetch(url);
    if (!response.ok) {
        const errorText = await response.text().catch(() => '');
        throw new Error(
            `Failed to fetch tutorial (status ${response.status}): ${errorText}`
        );
    }
    return response.json();
}


// Attach change handlers to curated checkboxes in admin table
// process:
// 1. locate/target the curated checkbox 
// 2. attach an event listener in case it is clicked
// 3. validate tutorial ID
// 4. Check admin authentication and role
// 5. send PATCH request to backend
function curatedToggle() {

    // 1. locate/target the curated checkbox 
    const checkboxes = document.querySelectorAll('.admin-curated-toggle');
    if (!checkboxes.length) {
        return;
    }
    // 2. attach an event listener in case it is clicked
    checkboxes.forEach(cb => {
        cb.addEventListener('change', async (event) => {
            const checkbox = event.target;
            const tutorialId = parseInt(checkbox.dataset.projectId, 10);
            if (!tutorialId) {
                alert('Invalid tutorial ID.');
                return;
            }
            // 3. validate tutorial ID
            // 4. Check admin authentication and role
            // Use the same auth token / admin flag set during login
            const token = localStorage.getItem('authToken');
            const isAdmin = localStorage.getItem('isAdmin') === 'true';
            if (!token || !isAdmin) {
                alert('Admin login required to change curated status.');
                checkbox.checked = !checkbox.checked;
                return;
            }

            const desiredCurated = checkbox.checked;
            checkbox.disabled = true;

            try {
                // 5. send PATCH request to backend
                const updated = await setTutorialCurated(tutorialId, desiredCurated, token);
                checkbox.checked = !!updated.curated;
            } catch (error) {
                alert(error.message || 'Failed to update curated flag.');
                checkbox.checked = !desiredCurated;
            } finally {
                checkbox.disabled = false;
            }
        });
    });
}


/*
import { setTutorialCurated } from './admin-tutorials.js';

const adminToken = // retrieve admin token, e.g. from localStorage ;

setTutorialCurated(50, true, adminToken)
  .then((updatedTutorial) => {
    console.log('Updated tutorial:', updatedTutorial);
  })
  .catch((err) => {
    console.error('Error updating curated flag:', err);
  });

  */