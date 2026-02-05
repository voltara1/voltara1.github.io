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

  //  Manage USer section.
  // target each HTML element in adminpage.html
  // TODO: check why feature is not working
  const listAllButton = document.getElementById("admin-users-list-all");
  const searchUsersButton = document.getElementById("admin-users-search");
  // const searchUsersButton = document.getElementById("admin-users-search");
  const byCategoryButton = document.querySelector('[data-bs-target="#admin-projects-menu"] ~ #admin-projects-menu .admin-menu-item:nth-child(1)');
  const curatedButton = document.querySelector('[data-bs-target="#admin-projects-menu"] ~ #admin-projects-menu .admin-menu-item:nth-child(2)');
  const nonCuratedButton = document.querySelector('[data-bs-target="#admin-projects-menu"] ~ #admin-projects-menu .admin-menu-item:nth-child(3)');
  const byProficiencyButton = document.querySelector('[data-bs-target="#admin-projects-menu"] ~ #admin-projects-menu .admin-menu-item:nth-child(4)');

  // Backwards-compatible aliases so older variable names still refer to the same buttons
  // const projectsByCategoryButton = byCategoryButton;
  // const curatedProjectsButton = curatedButton;
  // const nonCuratedProjectsButton = nonCuratedButton;
  // const projectsByProficiencyButton = byProficiencyButton;
  // if (listAllButton) {
  //   listAllButton.addEventListener("click", async function () {
  //     setAdminMainContent('<p class="text-muted mb-0">Loading users…</p>');
  //     setAdminMainTitle("2.1 List ALL users");
  //     try {
  //       await Promise.all([ensureTutorialsLoaded(), ensureAdminUsersLoaded()]);
  //       buildAdminUserStats();
  //       if (adminUsersUnauthorized) {
  //         setAdminMainContent('<p class="text-muted mb-0">Admin login required to view users.</p>');
  //         return;
  //       }
  //       if (!adminUserStats.length) {
  //         setAdminMainContent('<p class="text-muted mb-0">No users available.</p>');
  //         return;
  //       }
  //       renderAdminUserList("id_asc");
  //     } catch (error) {
  //       console.error("Failed to load users or tutorials", error);
  //       setAdminMainContent('<p class="text-muted mb-0">Error loading users. Please try again.</p>');
  //     }
  //   });
  // }

  // if (searchUsersButton) {
  //   searchUsersButton.addEventListener("click", async function () {
  //     setAdminMainContent('<p class="text-muted mb-0">Loading users…</p>');
  //     setAdminMainTitle("2.2 Search users by username or email");
  //     try {
  //       await Promise.all([ensureTutorialsLoaded(), ensureAdminUsersLoaded()]);
  //       buildAdminUserStats();
  //       if (adminUsersUnauthorized) {
  //         setAdminMainContent('<p class="text-muted mb-0">Admin login required to search users.</p>');
  //         return;
  //       }
  //       if (!adminUserStats.length) {
  //         setAdminMainContent('<p class="text-muted mb-0">No users available.</p>');
  //         return;
  //       }
  //       renderAdminUserSearchView();
  //     } catch (error) {
  //       console.error("Failed to load users or tutorials", error);
  //       setAdminMainContent('<p class="text-muted mb-0">Error loading users. Please try again.</p>');
  //     }
  //   });
  // }


  // Manage Tutorials section
  // TODO: List projects by category
  // unexpected results, to check

  // 1. load tutorials by calling function in tutorials-loader.js
  // 2. call function in managetutorials.js to get the HTML elements to be rendered.
  // 3. render the HTML elements
  if (byCategoryButton) {
    byCategoryButton.addEventListener("click", async function () {
      setAdminMainContent('<p class="text-muted mb-0">Loading projects…</p>');
      setAdminMainTitle("List projects by category");
      await ensureTutorialsLoaded();
      buildTutorialsList();
      if (!adminTutorials.length) {
        setAdminMainContent('<p class="text-muted mb-0">No projects available.</p>');
        return;
      }
      renderCategoryView();
    });
  }

// TODO: List curated projects
// OK
  // 1. load tutorials by calling function in tutorials-loader.js
  // 2. call function in managetutorials.js to get the HTML elements to be rendered.
  // 3. render the HTML elements
  if (curatedButton) {
    curatedButton.addEventListener("click", async function () {
      setAdminMainContent('<p class="text-muted mb-0">Loading projects…</p>');
      setAdminMainTitle("List curated projects");
      await ensureTutorialsLoaded();
      buildTutorialsList();
      if (!adminTutorials.length) {
        setAdminMainContent('<p class="text-muted mb-0">No projects available.</p>');
        return;
      }
      renderCuratedView("likes_desc");
    });
  }





// TODO: List non-curated projects
// OK
  // 1. load tutorials by calling function in tutorials-loader.js
  // 2. call function in managetutorials.js to get the HTML elements to be rendered.
  // 3. render the HTML elements
  if (nonCuratedButton) {
    nonCuratedButton.addEventListener("click", async function () {
      setAdminMainContent('<p class="text-muted mb-0">Loading projects…</p>');
      setAdminMainTitle("List non-curated projects");
      await ensureTutorialsLoaded();
      buildTutorialsList();
      if (!adminTutorials.length) {
        setAdminMainContent('<p class="text-muted mb-0">No projects available.</p>');
        return;
      }
      renderNonCurated("likes_desc");
    });
  }

  // DONE: List projects by proficiency
  // Tested OK.
  // 1. load tutorials by calling function in tutorials-loader.js
  // 2. call function in managetutorials.js to get the HTML elements to be rendered.
  // 3. render the HTML elements
  if (byProficiencyButton) {
    byProficiencyButton.addEventListener("click", async function () {
      setAdminMainContent('<p class="text-muted mb-0">Loading projects…</p>');
      setAdminMainTitle("List projects by proficiency");
      await ensureTutorialsLoaded();
      buildTutorialsList();
      if (!adminTutorials.length) {
        setAdminMainContent('<p class="text-muted mb-0">No projects available.</p>');
        return;
      }
      renderByProficiencyView();
    });
  }
});
