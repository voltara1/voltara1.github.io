// Uses global API_BASE_URL provided by config-const.js

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


// Attach change handlers to curated checkboxes in admin tables
function attachCuratedToggleHandlers() {
    const checkboxes = document.querySelectorAll('.admin-curated-toggle');
    if (!checkboxes.length) {
        return;
    }

    checkboxes.forEach(cb => {
        cb.addEventListener('change', async (event) => {
            const checkbox = event.target;
            const tutorialId = parseInt(checkbox.dataset.projectId, 10);
            if (!tutorialId) {
                alert('Invalid tutorial ID.');
                return;
            }

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