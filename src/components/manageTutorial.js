// Initialised admit of tutorial projects used by all admin tutorial views
let adminProjects = [];

// Populate adminProjects from the global voltaraTutorials array
function buildAdminProjectsList() {
    if (!voltaraTutorials.length) {
        adminProjects = [];
        return;
    }
    adminProjects = voltaraTutorials.map(tutorial => {
        const categoryName = tutorial.category && tutorial.category.name ? tutorial.category.name : "";
        const proficiency = tutorial.proficiency || "";
        const curated = Boolean(tutorial.curated);
        const likes = typeof tutorial.likes === "number" ? tutorial.likes : parseInt(tutorial.likes || "0", 10);
        return {
            id: tutorial.id,
            title: tutorial.title || "",
            category: categoryName,
            proficiency,
            curated,
            likes: Number.isNaN(likes) ? 0 : likes
        };
    });
}

// Render table rows of tutorial list, in table format
// Generate table rows HTML for a given list of tutorials
function renderAdminProjectTable(tutorials) {
    const rows = tutorials.map(tutorial => {
        return `
      <tr>
        <td>${tutorial.id}</td>
        <td><a href="project-details.html?id=${tutorial.id}">${tutorial.title}</a></td>
        <td>${tutorial.category}</td>
        <td>${tutorial.proficiency}</td>
        <td class="text-end">${tutorial.likes}</td>
        <td class="text-center">
          <input
            type="checkbox"
            class="form-check-input admin-curated-toggle"
            data-project-id="${tutorial.id}"
            ${tutorial.curated ? "checked" : ""}
          />
        </td>
      </tr>
    `;
    }).join("");
    return rows || '<tr><td colspan="6" class="text-muted text-center small">No projects to display.</td></tr>';
}

// View 3.1: filter (checkbox) and list projects by selected categories
// Render the admin view that filters projects by selected categories
function renderAdminProjectsByCategoryView() {
    if (!adminProjects.length) {
        setAdminMainContent('<p class="text-muted mb-0">No projects available.</p>');
        return;
    }
    const html = `
    <h2 class="admin-main-title mb-3">3.1 List projects by category</h2>
    <div class="admin-filter-panel mb-3">
      <div class="admin-filter-header small text-muted mb-1">Select one or more categories</div>
      <div class="admin-filter-groups">
        <div class="form-check form-check-inline">
          <input class="form-check-input" type="checkbox" id="admin-cat-arduino" name="admin-project-category" value="Arduino" checked>
          <label class="form-check-label" for="admin-cat-arduino">Arduino</label>
        </div>
        <div class="form-check form-check-inline">
          <input class="form-check-input" type="checkbox" id="admin-cat-esp32" name="admin-project-category" value="ESP32" checked>
          <label class="form-check-label" for="admin-cat-esp32">ESP32</label>
        </div>
        <div class="form-check form-check-inline">
          <input class="form-check-input" type="checkbox" id="admin-cat-iot" name="admin-project-category" value="IoT" checked>
          <label class="form-check-label" for="admin-cat-iot">IoT</label>
        </div>
        <div class="form-check form-check-inline">
          <input class="form-check-input" type="checkbox" id="admin-cat-pcb" name="admin-project-category" value="PCB Design" checked>
          <label class="form-check-label" for="admin-cat-pcb">PCB Design</label>
        </div>
        <div class="form-check form-check-inline">
          <input class="form-check-input" type="checkbox" id="admin-cat-raspi" name="admin-project-category" value="Raspberry Pi" checked>
          <label class="form-check-label" for="admin-cat-raspi">Raspberry Pi</label>
        </div>
        <div class="form-check form-check-inline">
          <input class="form-check-input" type="checkbox" id="admin-cat-robotics" name="admin-project-category" value="Robotics" checked>
          <label class="form-check-label" for="admin-cat-robotics">Robotics</label>
        </div>
        <div class="form-check form-check-inline">
          <input class="form-check-input" type="checkbox" id="admin-cat-sensors" name="admin-project-category" value="Sensors" checked>
          <label class="form-check-label" for="admin-cat-sensors">Sensors</label>
        </div>
        <div class="form-check form-check-inline">
          <input class="form-check-input" type="checkbox" id="admin-cat-stm32" name="admin-project-category" value="STM32" checked>
          <label class="form-check-label" for="admin-cat-stm32">STM32</label>
        </div>
      </div>
      <div class="mt-2 d-flex flex-wrap gap-2">
        <button type="button" class="btn btn-sm btn-outline-secondary" id="admin-projects-category-select-all">Select all</button>
        <button type="button" class="btn btn-sm btn-outline-secondary" id="admin-projects-category-clear-all">Clear all</button>
      </div>
    </div>
    <div class="table-responsive">
      <table class="table table-striped table-hover align-middle mb-0">
        <thead>
          <tr>
            <th scope="col">ID</th>
            <th scope="col">Title</th>
            <th scope="col">Category</th>
            <th scope="col">Proficiency</th>
            <th scope="col" class="text-end">Likes</th>
            <th scope="col">Curated</th>
          </tr>
        </thead>
        <tbody id="admin-projects-by-category-body"></tbody>
      </table>
    </div>
  `;
    setAdminMainContent(html);
    const checkboxes = Array.prototype.slice.call(document.querySelectorAll('input[name="admin-project-category"]'));
    const selectAll = document.getElementById("admin-projects-category-select-all");
    const clearAll = document.getElementById("admin-projects-category-clear-all");
    const body = document.getElementById("admin-projects-by-category-body");
    if (!body) {
        return;
    }
    function getSelectedCategories() {
        return checkboxes.filter(cb => cb.checked).map(cb => cb.value);
    }
    function updateTable() {
        const selected = getSelectedCategories();
        const filtered = selected.length ? adminProjects.filter(tutorial => {
            if (!tutorial.category) {
                return false;
            }
            return selected.some(cat => tutorial.category.toLowerCase() === cat.toLowerCase());
        }) : [];
        body.innerHTML = renderAdminProjectTable(filtered);
    }
    checkboxes.forEach(cb => {
        cb.addEventListener("change", updateTable);
    });
    if (selectAll) {
        selectAll.addEventListener("click", function () {
            checkboxes.forEach(cb => {
                cb.checked = true;
            });
            updateTable();
        });
    }
    if (clearAll) {
        clearAll.addEventListener("click", function () {
            checkboxes.forEach(cb => {
                cb.checked = false;
            });
            updateTable();
        });
    }
    updateTable();
}

// View 3.2: list only curated projects with sorting by likes
// Render the admin view showing only curated projects, with likes-based sorting
function renderAdminCuratedProjectsView(sortKey) {
    if (!adminProjects.length) {
        setAdminMainContent('<p class="text-muted mb-0">No projects available.</p>');
        return;
    }
    const sort = sortKey || "likes_desc";
    const html = `
    <h2 class="admin-main-title mb-3">3.2 List curated projects</h2>
    <div class="d-flex flex-wrap align-items-center justify-content-between mb-3 gap-2">
      <p class="mb-0 small text-muted">Showing projects marked as curated. Use sorting to change order.</p>
      <div class="d-flex align-items-center gap-2">
        <label for="admin-curated-sort" class="form-label mb-0 me-1 small text-muted">Sort by:</label>
        <select id="admin-curated-sort" class="form-select form-select-sm">
          <option value="likes_desc">Likes (highest first)</option>
          <option value="likes_asc">Likes (lowest first)</option>
        </select>
      </div>
    </div>
    <div class="table-responsive">
      <table class="table table-striped table-hover align-middle mb-0">
        <thead>
          <tr>
            <th scope="col">ID</th>
            <th scope="col">Title</th>
            <th scope="col">Category</th>
            <th scope="col">Proficiency</th>
            <th scope="col" class="text-end">Likes</th>
            <th scope="col">Curated</th>
          </tr>
        </thead>
        <tbody id="admin-curated-projects-body"></tbody>
      </table>
    </div>
  `;
    setAdminMainContent(html);
    const select = document.getElementById("admin-curated-sort");
    const body = document.getElementById("admin-curated-projects-body");
    if (!select || !body) {
        return;
    }
    function getSorted() {
        const tutorials = adminProjects.filter(tutorial => tutorial.curated);
        if (select.value === "likes_asc") {
            return tutorials.slice().sort((a, b) => a.likes - b.likes);
        }
        return tutorials.slice().sort((a, b) => b.likes - a.likes);
    }
    function updateTable() {
        const tutorials = getSorted();
        body.innerHTML = renderAdminProjectTable(tutorials);
    }
    select.value = sort;
    select.addEventListener("change", updateTable);
    updateTable();
}

// View 3.3: list only non-curated projects with sorting by likes
// Render the admin view showing only non-curated projects, with likes-based sorting
function renderAdminNonCuratedProjectsView(sortKey) {
    if (!adminProjects.length) {
        setAdminMainContent('<p class="text-muted mb-0">No projects available.</p>');
        return;
    }
    const sort = sortKey || "likes_desc";
    const html = `
    <h2 class="admin-main-title mb-3">3.3 List non-curated projects</h2>
    <div class="d-flex flex-wrap align-items-center justify-content-between mb-3 gap-2">
      <p class="mb-0 small text-muted">Showing projects that are not curated. Use sorting to change order.</p>
      <div class="d-flex align-items-center gap-2">
        <label for="admin-noncurated-sort" class="form-label mb-0 me-1 small text-muted">Sort by:</label>
        <select id="admin-noncurated-sort" class="form-select form-select-sm">
          <option value="likes_desc">Likes (highest first)</option>
          <option value="likes_asc">Likes (lowest first)</option>
        </select>
      </div>
    </div>
    <div class="table-responsive">
      <table class="table table-striped table-hover align-middle mb-0">
        <thead>
          <tr>
            <th scope="col">ID</th>
            <th scope="col">Title</th>
            <th scope="col">Category</th>
            <th scope="col">Proficiency</th>
            <th scope="col" class="text-end">Likes</th>
            <th scope="col">Curated</th>
          </tr>
        </thead>
        <tbody id="admin-noncurated-projects-body"></tbody>
      </table>
    </div>
  `;
    setAdminMainContent(html);
    const select = document.getElementById("admin-noncurated-sort");
    const body = document.getElementById("admin-noncurated-projects-body");
    if (!select || !body) {
        return;
    }
    function getSorted() {
        const tutorials = adminProjects.filter(tutorial => !tutorial.curated);
        if (select.value === "likes_asc") {
            return tutorials.slice().sort((a, b) => a.likes - b.likes);
        }
        return tutorials.slice().sort((a, b) => b.likes - a.likes);
    }
    function updateTable() {
        const tutorials = getSorted();
        body.innerHTML = renderAdminProjectTable(tutorials);
    }
    select.value = sort;
    select.addEventListener("change", updateTable);
    updateTable();
}

// View 3.4: filter and list projects by proficiency level (Beginner/Intermediate/Advance)
// Render the admin view that filters projects by proficiency level
function renderAdminProjectsByProficiencyView() {
    if (!adminProjects.length) {
        setAdminMainContent('<p class="text-muted mb-0">No projects available.</p>');
        return;
    }
    const html = `
    <h2 class="admin-main-title mb-3">3.4 List projects by proficiency</h2>
    <div class="admin-filter-panel mb-3">
      <div class="admin-filter-header small text-muted mb-1">Select one or more proficiency levels</div>
      <div class="admin-filter-groups">
        <div class="form-check form-check-inline">
          <input class="form-check-input" type="checkbox" id="admin-prof-beginner" name="admin-project-proficiency" value="BEGINNER" checked>
          <label class="form-check-label" for="admin-prof-beginner">Beginner</label>
        </div>
        <div class="form-check form-check-inline">
          <input class="form-check-input" type="checkbox" id="admin-prof-intermediate" name="admin-project-proficiency" value="INTERMEDIATE" checked>
          <label class="form-check-label" for="admin-prof-intermediate">Intermediate</label>
        </div>
        <div class="form-check form-check-inline">
          <input class="form-check-input" type="checkbox" id="admin-prof-advance" name="admin-project-proficiency" value="ADVANCE" checked>
          <label class="form-check-label" for="admin-prof-advance">Advance</label>
        </div>
      </div>
      <div class="mt-2 d-flex flex-wrap gap-2">
        <button type="button" class="btn btn-sm btn-outline-secondary" id="admin-projects-prof-select-all">Select all</button>
        <button type="button" class="btn btn-sm btn-outline-secondary" id="admin-projects-prof-clear-all">Clear all</button>
      </div>
    </div>
    <div class="table-responsive">
      <table class="table table-striped table-hover align-middle mb-0">
        <thead>
          <tr>
            <th scope="col">ID</th>
            <th scope="col">Title</th>
            <th scope="col">Category</th>
            <th scope="col">Proficiency</th>
            <th scope="col" class="text-end">Likes</th>
            <th scope="col">Curated</th>
          </tr>
        </thead>
        <tbody id="admin-projects-by-prof-body"></tbody>
      </table>
    </div>
  `;
    setAdminMainContent(html);
    const checkboxes = Array.prototype.slice.call(document.querySelectorAll('input[name="admin-project-proficiency"]'));
    const selectAll = document.getElementById("admin-projects-prof-select-all");
    const clearAll = document.getElementById("admin-projects-prof-clear-all");
    const body = document.getElementById("admin-projects-by-prof-body");
    if (!body) {
        return;
    }
    function getSelectedLevels() {
        return checkboxes.filter(cb => cb.checked).map(cb => cb.value);
    }
    function updateTable() {
        const selected = getSelectedLevels();
        const filtered = selected.length ? adminProjects.filter(tutorial => {
            if (!tutorial.proficiency) {
                return false;
            }
            return selected.indexOf(tutorial.proficiency) !== -1;
        }) : [];
        body.innerHTML = renderAdminProjectTable(filtered);
    }
    checkboxes.forEach(cb => {
        cb.addEventListener("change", updateTable);
    });
    if (selectAll) {
        selectAll.addEventListener("click", function () {
            checkboxes.forEach(cb => {
                cb.checked = true;
            });
            updateTable();
        });
    }
    if (clearAll) {
        clearAll.addEventListener("click", function () {
            checkboxes.forEach(cb => {
                cb.checked = false;
            });
            updateTable();
        });
    }
    updateTable();
}