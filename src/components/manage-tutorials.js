// initialised adminProjects used by all admin tutorial views
let adminTutorials = [];

// Populate adminProjects from the voltaraTutorials object array.
// This normalises the raw voltaraTutorials data into a simpler shape (less properties) used by admin views.
// If there are no tutorials, adminTutorials is reset to an empty array and the function returns.
function buildTutorialsList() {
    if (!voltaraTutorials.length) {
        adminTutorials = [];
        return;
    }
    // Deconstruct each tutorial object into new structure (id, title, category, proficiency,likes)
    // curated flag and numeric likes) suitable for filtering and sorting in the admin UI.
    adminTutorials = voltaraTutorials.map(function (tutorial) {
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

// Render table rows of tutorial list, in table format.
// return the HTML element (string)  
// The returned HTML is injected into the relevant <tbody> by each view in adminpage.js
function renderAdminProjectTable(tutorials) {
    const rows = tutorials.map(function (tutorial) {
        return `
      <tr>
        <td>${tutorial.id}</td>
        <td><a href="tutorial-details.html?id=${tutorial.id}">${tutorial.title}</a></td>
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

function renderUnifiedTutorialsView() {
    if (!adminTutorials.length) {
        setAdminMainContent('<p class="text-muted mb-0">No projects available.</p>');
        return;
    }
    const htmlElements = `
    <h2 class="admin-main-title mb-3 fs-3 fw-bold text-secondary">Manage Tutorials</h2>
    <div class="admin-filter-panel mb-3 border rounded-3 bg-light">
      <div class="admin-filter-groups row g-2">
        <div class="col-12 col-md-4">
          <label for="admin-filter-category" class="form-label mb-1 small text-muted">Category</label>
          <select id="admin-filter-category" class="form-select form-select-sm">
            <option value="">All categories</option>
            <option value="Arduino">Arduino</option>
            <option value="ESP32">ESP32</option>
            <option value="IoT">IoT</option>
            <option value="PCB Design">PCB Design</option>
            <option value="Raspberry Pi">Raspberry Pi</option>
            <option value="Robotics">Robotics</option>
            <option value="Sensors">Sensors</option>
            <option value="STM32">STM32</option>
          </select>
        </div>
        <div class="col-12 col-md-4">
          <label for="admin-filter-curated" class="form-label mb-1 small text-muted">Curated</label>
          <select id="admin-filter-curated" class="form-select form-select-sm">
            <option value="">All tutorials</option>
            <option value="curated">Curated only</option>
            <option value="noncurated">Non-curated only</option>
          </select>
        </div>
        <div class="col-12 col-md-4">
          <label for="admin-filter-proficiency" class="form-label mb-1 small text-muted">Proficiency</label>
          <select id="admin-filter-proficiency" class="form-select form-select-sm">
            <option value="">All levels</option>
            <option value="BEGINNER">Beginner</option>
            <option value="INTERMEDIATE">Intermediate</option>
            <option value="ADVANCE">Advance</option>
          </select>
        </div>
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
        <tbody id="admin-tutorials-unified-body"></tbody>
      </table>
    </div>
  `;
    setAdminMainContent(htmlElements);

    const categorySelect = document.getElementById("admin-filter-category");
    const curatedSelect = document.getElementById("admin-filter-curated");
    const proficiencySelect = document.getElementById("admin-filter-proficiency");
    const body = document.getElementById("admin-tutorials-unified-body");
    if (!body) {
        return;
    }

    function applyFilters() {
        let tutorials = adminTutorials.slice();
        const selectedCategory = categorySelect ? categorySelect.value : "";
        const curatedValue = curatedSelect ? curatedSelect.value : "";
        const selectedProficiency = proficiencySelect ? proficiencySelect.value : "";

        if (selectedCategory) {
            tutorials = tutorials.filter(function (t) {
                return t.category && t.category.toLowerCase() === selectedCategory.toLowerCase();
            });
        }

        if (curatedValue === "curated") {
            tutorials = tutorials.filter(function (t) { return !!t.curated; });
        } else if (curatedValue === "noncurated") {
            tutorials = tutorials.filter(function (t) { return !t.curated; });
        }

        if (selectedProficiency) {
            tutorials = tutorials.filter(function (t) { return t.proficiency === selectedProficiency; });
        }

        body.innerHTML = renderAdminProjectTable(tutorials);
        if (typeof curatedToggle === "function") {
            curatedToggle();
        }
    }

    if (categorySelect) {
        categorySelect.addEventListener("change", applyFilters);
    }
    if (curatedSelect) {
        curatedSelect.addEventListener("change", applyFilters);
    }
    if (proficiencySelect) {
        proficiencySelect.addEventListener("change", applyFilters);
    }

    applyFilters();
}

// View 3.1: filter (checkbox) and list projects by selected categories
// Render the admin view that filters projects by selected categories.
// 1. Render category checkboxes
// 2. Builds a table body that only includes tutorials where category matches the selected checkbox
// 3. Re-attach curated toggle handlers every time the table contents change so that
//  the curated checkbox column remain working after filters are applied.
function renderCategoryView() {
    // If there are no tutorials loaded into adminTutorials, show a friendly message and exit.
    if (!adminTutorials.length) {
        setAdminMainContent('<p class="text-muted mb-0">No projects available.</p>');
        return;
    }
  // HTML string for the filter by category checkboxes
  // and for table columns/fields (ID/Title/.../proficiency/curated/)
    const htmlElements = `
    <h2 class="admin-main-title mb-3 fs-3 fw-bold text-secondary">List tutorials by category</h2>
    <div class="admin-filter-panel mb-3 border rounded-3 bg-light">
      <div class="admin-filter-header small text-muted mb-1">Select one or more categories</div>
      <div class="admin-filter-groups d-flex flex-wrap gap-2">
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
    setAdminMainContent(htmlElements);

    const checkboxes = Array.prototype.slice.call(document.querySelectorAll('input[name="admin-project-category"]'));
    const selectAll = document.getElementById("admin-projects-category-select-all");
    const clearAll = document.getElementById("admin-projects-category-clear-all");
    const body = document.getElementById("admin-projects-by-category-body");
    if (!body) {
        return;
    }
    // Return an array of category names (e.g. "Arduino", "ESP32") for all checkboxes
    // that are currently checked.
    function getSelectedCategories() {
        return checkboxes
            .filter(function (cb) { return cb.checked; })
            .map(function (cb) { return cb.value; });
    }
    // Rebuild the table body based on the currently selected categories.
    // If at least one category is selected, filter adminTutorials 
    // clear the table if no categories are selected.
    function updateTable() {
        const selected = getSelectedCategories();
        const filtered = selected.length ? adminTutorials.filter(function (tutorial) {
            if (!tutorial.category) {
                return false;
            }
            return selected.some(function (cat) { return tutorial.category.toLowerCase() === cat.toLowerCase(); });
        }) : [];
        body.innerHTML = renderAdminProjectTable(filtered);
        if (typeof curatedToggle === "function") {
            curatedToggle();
        }
    }
    checkboxes.forEach(function (cb) {
        cb.addEventListener("change", updateTable);
    });
    if (selectAll) {
        selectAll.addEventListener("click", function () {
            checkboxes.forEach(function (cb) {
                cb.checked = true;
            });
            updateTable();
        });
    }
    if (clearAll) {
        clearAll.addEventListener("click", function () {
            checkboxes.forEach(function (cb) {
                cb.checked = false;
            });
            updateTable();
        });
    }
    updateTable();
}

// View 3.2: list only curated projects with sorting by likes.
// Renders a table of tutorials where curated === true
function renderCuratedView(sortKey) {
    if (!adminTutorials.length) {
        setAdminMainContent('<p class="text-muted mb-0">No projects available.</p>');
        return;
    }
    // Default sort is descending by likes unless an explicit sortKey is supplied.
    const sort = sortKey || "likes_desc";
    const htmlElements = `
    <h2 class="admin-main-title mb-3 fs-3 fw-bold text-secondary">List curated tutorials</h2>
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
    setAdminMainContent(htmlElements);
    const select = document.getElementById("admin-curated-sort");
    const body = document.getElementById("admin-curated-projects-body");
    if (!select || !body) {
        return;
    }
    // Return curated tutorials sorted by likes
    function getSorted() {
        const tutorials = adminTutorials.filter(function (tutorial) { return tutorial.curated; });
        if (select.value === "likes_asc") {
          // return tutorials.slice().sort((a, b) => b.likes - a.likes);
            return tutorials.slice().sort(function (a, b) { return a.likes - b.likes; });
        }
        // return tutorials.slice().sort((a, b) => a.likes - b.likes);
        return tutorials.slice().sort(function (a, b) { return b.likes - a.likes; });

    }
    function updateTable() {
        const tutorials = getSorted();
        body.innerHTML = renderAdminProjectTable(tutorials);
        if (typeof curatedToggle === "function") {
            curatedToggle();
        }
    }
    select.value = sort;
    select.addEventListener("change", updateTable);
    updateTable();
}

// View 3.3: list only non-curated projects with sorting by likes.
function renderNonCurated(sortKey) {
    if (!adminTutorials.length) {
        setAdminMainContent('<p class="text-muted mb-0">No projects available.</p>');
        return;
    }
    // Default sort is descending by likes unless an explicit sortKey is supplied.
    const sort = sortKey || "likes_desc";
    const htmlElements = `
    <h2 class="admin-main-title mb-3 fs-3 fw-bold text-secondary">List non-curated tutorials</h2>
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
    setAdminMainContent(htmlElements);
    const select = document.getElementById("admin-noncurated-sort");
    const body = document.getElementById("admin-noncurated-projects-body");
    if (!select || !body) {
        return;
    }

    // Return non-curated tutorials sorted by likes in ascending/descending order.
    function getSorted() {
        const tutorials = adminTutorials.filter(function (tutorial) { return !tutorial.curated; });
        if (select.value === "likes_asc") {
            //return tutorials.slice().sort((a, b) => b.likes - a.likes);
            return tutorials.slice().sort(function (a, b) { return a.likes - b.likes; });
        }
        //return tutorials.slice().sort((a, b) => a.likes - b.likes);
        return tutorials.slice().sort(function (a, b) { return b.likes - a.likes; });
        
    }
    function updateTable() {
        const tutorials = getSorted();
        body.innerHTML = renderAdminProjectTable(tutorials);
        if (typeof curatedToggle === "function") {
            curatedToggle();
        }
    }
    select.value = sort;
    select.addEventListener("change", updateTable);
    updateTable();
}

// View 3.4: filter and list projects by proficiency level (Beginner/Intermediate/Advance).
function renderByProficiencyView() {
    if (!adminTutorials.length) {
        setAdminMainContent('<p class="text-muted mb-0">No projects available.</p>');
        return;
    }
    const htmlElements = `
    <h2 class="admin-main-title mb-3 fs-3 fw-bold text-secondary">List tutorials by proficiency</h2>
    <div class="admin-filter-panel mb-3 border rounded-3 bg-light">
      <div class="admin-filter-header small text-muted mb-1">Select one or more proficiency levels</div>
      <div class="admin-filter-groups d-flex flex-wrap gap-2">
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
    setAdminMainContent(htmlElements);

    const checkboxes = Array.prototype.slice.call(document.querySelectorAll('input[name="admin-project-proficiency"]'));
    const selectAll = document.getElementById("admin-projects-prof-select-all");
    const clearAll = document.getElementById("admin-projects-prof-clear-all");
    const body = document.getElementById("admin-projects-by-prof-body");
    if (!body) {
        return;
    }
    // Collect the selected proficiency levels (e.g. ["BEGINNER", "INTERMEDIATE"]).
    function getSelectedLevels() {
        return checkboxes
            .filter(function (cb) { return cb.checked; })
            .map(function (cb) { return cb.value; });
    }
    // Rebuild the table based on the selected proficiency levels.
    // Tutorials whose proficiency field is missing are excluded from the results.
    function updateTable() {
        const selected = getSelectedLevels();
        const filtered = selected.length ? adminTutorials.filter(function (tutorial) {
            if (!tutorial.proficiency) {
                return false;
            }
            return selected.indexOf(tutorial.proficiency) !== -1;
        }) : [];
        body.innerHTML = renderAdminProjectTable(filtered);
        if (typeof curatedToggle === "function") {
            curatedToggle();
        }
    }
    checkboxes.forEach(function (cb) {
        cb.addEventListener("change", updateTable);
    });
    if (selectAll) {
        selectAll.addEventListener("click", function () {
            checkboxes.forEach(function (cb) {
                cb.checked = true;
            });
            updateTable();
        });
    }
    if (clearAll) {
        clearAll.addEventListener("click", function () {
            checkboxes.forEach(function (cb) {
                cb.checked = false;
            });
            updateTable();
        });
    }
    updateTable();
}