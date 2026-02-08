// Sets the main title text in the admin main content header.
function setAdminMainTitle(text) {
  const title = document.querySelector(".admin-main-title");
  if (title) {
    title.textContent = text;
  }
}

// Replaces the HTML content inside the admin main content container:
// area where list of tutorials are rendered
function setAdminMainContent(html) {
  const container = document.getElementById("admin-main-content");
  if (container) {
    container.innerHTML = html;
  }
}


// Initialise admin page after the DOM has fully loaded.
// Attach event handler so each admin menu button loads data and renders its view.
document.addEventListener("DOMContentLoaded", function () {
  const adminSection = document.querySelector(".admin-section");
  if (!adminSection) {
    return;
  }

  //  Manage users section.
  const manageUsersButton = document.getElementById("admin-users-manage");
  const manageTutorialsButton = document.getElementById("admin-tutorials-manage");

  if (manageUsersButton) {
    manageUsersButton.addEventListener("click", async function () {
      setAdminMainContent('<p class="text-muted mb-0">Loading users…</p>');
      setAdminMainTitle("Manage users");
      try {
        await Promise.all([ensureTutorialsLoaded(), ensureAdminUsersLoaded()]);
        buildAdminUserStats();
        if (adminUsersUnauthorized) {
          setAdminMainContent('<p class="text-muted mb-0">Admin login required to view users.</p>');
          return;
        }
        if (!adminUserStats.length) {
          setAdminMainContent('<p class="text-muted mb-0">No users available.</p>');
          return;
        }
        renderAdminUserSearchView();
      } catch (error) {
        console.error("Failed to load users or tutorials", error);
        setAdminMainContent('<p class="text-muted mb-0">Error loading users. Please try again.</p>');
      }
    });
  }

  // Manage Tutorials: unified view with combined filters
  if (manageTutorialsButton) {
    manageTutorialsButton.addEventListener("click", async function () {
      setAdminMainContent('<p class="text-muted mb-0">Loading projects…</p>');
      setAdminMainTitle("Manage tutorials");
      try {
        await ensureTutorialsLoaded();
        buildTutorialsList();
        if (!adminTutorials.length) {
          setAdminMainContent('<p class="text-muted mb-0">No projects available.</p>');
          return;
        }
        renderUnifiedTutorialsView();
      } catch (error) {
        console.error("Failed to load tutorials", error);
        setAdminMainContent('<p class="text-muted mb-0">Error loading tutorials. Please try again.</p>');
      }
    });
  }
});
