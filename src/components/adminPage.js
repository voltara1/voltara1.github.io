function setAdminMainTitle(text) {
  const title = document.querySelector(".admin-main-title");
  if (title) {
    title.textContent = text;
  }
}

function setAdminMainContent(html) {
  const container = document.getElementById("admin-main-content");
  if (container) {
    container.innerHTML = html;
  }
}


document.addEventListener("DOMContentLoaded", function () {
  const adminSection = document.querySelector(".admin-section");
  if (!adminSection) {
    return;
  }
  const listAllButton = document.getElementById("admin-users-list-all");
  const searchUsersButton = document.getElementById("admin-users-search");
  const projectsByCategoryButton = document.querySelector('[data-bs-target="#admin-projects-menu"] ~ #admin-projects-menu .admin-menu-item:nth-child(1)');
  const curatedProjectsButton = document.querySelector('[data-bs-target="#admin-projects-menu"] ~ #admin-projects-menu .admin-menu-item:nth-child(2)');
  const nonCuratedProjectsButton = document.querySelector('[data-bs-target="#admin-projects-menu"] ~ #admin-projects-menu .admin-menu-item:nth-child(3)');
  const projectsByProficiencyButton = document.querySelector('[data-bs-target="#admin-projects-menu"] ~ #admin-projects-menu .admin-menu-item:nth-child(4)');
  if (listAllButton) {
    listAllButton.addEventListener("click", function () {
      setAdminMainContent('<p class="text-muted mb-0">Loading users…</p>');
      setAdminMainTitle("2.1 List ALL users");
      Promise.all([ensureTutorialsLoaded(), ensureAdminUsersLoaded()]).then(function () {
        buildAdminUserStats();
        if (adminUsersUnauthorized) {
          setAdminMainContent('<p class="text-muted mb-0">Admin login required to view users.</p>');
          return;
        }
        if (!adminUserStats.length) {
          setAdminMainContent('<p class="text-muted mb-0">No users available.</p>');
          return;
        }
        renderAdminUserList("id_asc");
      });
    });
  }
  if (searchUsersButton) {
    searchUsersButton.addEventListener("click", function () {
      setAdminMainContent('<p class="text-muted mb-0">Loading users…</p>');
      setAdminMainTitle("2.2 Search users by username or email");
      Promise.all([ensureTutorialsLoaded(), ensureAdminUsersLoaded()]).then(function () {
        buildAdminUserStats();
        if (adminUsersUnauthorized) {
          setAdminMainContent('<p class="text-muted mb-0">Admin login required to search users.</p>');
          return;
        }
        if (!adminUserStats.length) {
          setAdminMainContent('<p class="text-muted mb-0">No users available.</p>');
          return;
        }
        renderAdminUserSearchView();
      });
    });
  }
  if (projectsByCategoryButton) {
    projectsByCategoryButton.addEventListener("click", function () {
      setAdminMainContent('<p class="text-muted mb-0">Loading projects…</p>');
      setAdminMainTitle("3.1 List projects by category");
      ensureTutorialsLoaded().then(function () {
        buildAdminProjectsList();
        if (!adminProjects.length) {
          setAdminMainContent('<p class="text-muted mb-0">No projects available.</p>');
          return;
        }
        renderAdminProjectsByCategoryView();
      });
    });
  }
  if (curatedProjectsButton) {
    curatedProjectsButton.addEventListener("click", function () {
      setAdminMainContent('<p class="text-muted mb-0">Loading projects…</p>');
      setAdminMainTitle("3.2 List curated projects");
      ensureTutorialsLoaded().then(function () {
        buildAdminProjectsList();
        if (!adminProjects.length) {
          setAdminMainContent('<p class="text-muted mb-0">No projects available.</p>');
          return;
        }
        renderAdminCuratedProjectsView("likes_desc");
      });
    });
  }
  if (nonCuratedProjectsButton) {
    nonCuratedProjectsButton.addEventListener("click", function () {
      setAdminMainContent('<p class="text-muted mb-0">Loading projects…</p>');
      setAdminMainTitle("3.3 List non-curated projects");
      ensureTutorialsLoaded().then(function () {
        buildAdminProjectsList();
        if (!adminProjects.length) {
          setAdminMainContent('<p class="text-muted mb-0">No projects available.</p>');
          return;
        }
        renderAdminNonCuratedProjectsView("likes_desc");
      });
    });
  }
  if (projectsByProficiencyButton) {
    projectsByProficiencyButton.addEventListener("click", function () {
      setAdminMainContent('<p class="text-muted mb-0">Loading projects…</p>');
      setAdminMainTitle("3.4 List projects by proficiency");
      ensureTutorialsLoaded().then(function () {
        buildAdminProjectsList();
        if (!adminProjects.length) {
          setAdminMainContent('<p class="text-muted mb-0">No projects available.</p>');
          return;
        }
        renderAdminProjectsByProficiencyView();
      });
    });
  }
});
