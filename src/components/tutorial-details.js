/**
 * Get the tutorial ID from the URL
 * When you visit tutorial-details.html?id=5, this extracts the "5"
 */
function getTutorialIdFromURL() {
    const urlParams = new URLSearchParams(window.location.search);
    return parseInt(urlParams.get('id'));
}

/**
 * Find a specific tutorial by its ID number
 * 
 * @param {number} id - The tutorial ID to search for
 * @returns {Object} The tutorial object, or undefined if not found
 */
function getTutorialById(id) {
    return voltaraTutorials.find(function (tutorial) { return tutorial.id === id; });
}

/**
 * Get other tutorials created by the same author
 * 
 * @param {string} authorName - The author's display name (resolved from user.userName/username/user_name)
 * @param {number} excludeId - The current tutorial ID to exclude
 * @returns {Array} Up to 3 other tutorials by this author
 */
function getTutorialsByAuthor(authorName, excludeId) {
    if (!authorName) {
        return [];
    }

    return voltaraTutorials
        .filter(function (tutorial) {
            if (!tutorial || tutorial.id === excludeId) {
                return false;
            }
            const user = tutorial.user || null;
            if (!user) {
                return false;
            }
            const name = user.userName || user.username || user.user_name || null;
            return !!name && name === authorName;
        })
        .slice(0, 3);
}

/**
 * Main function - Load and display all tutorial details
 */
function loadTutorialDetails() {
    const tutorialId = getTutorialIdFromURL();

    if (!tutorialId) {
        document.getElementById('project-header').innerHTML =
            '<div class="alert alert-danger">Tutorial ID not found in URL. Please click on a tutorial card to view details.</div>';
        return;
    }

    const tutorial = getTutorialById(tutorialId);

    if (!tutorial) {
        document.getElementById('project-header').innerHTML =
            '<div class="alert alert-danger">Tutorial not found. This tutorial may not exist.</div>';
        return;
    }

    renderTutorialHeader(tutorial);
    renderMainImage(tutorial);
    renderDescription(tutorial);
    renderSchematic(tutorial);
    renderLayout(tutorial);
    renderBOM(tutorial);
    updateGitHubLink(tutorial);
    renderCreatorTutorials(tutorial);
}

/**
 * Display the tutorial title and tags
 */
function renderTutorialHeader(tutorial) {
    const tags = [];
    if (tutorial.category && tutorial.category.name) tags.push(tutorial.category.name);
    if (tutorial.proficiency) tags.push(tutorial.proficiency);
    if (typeof tutorial.curated === 'boolean') tags.push(tutorial.curated ? 'Curated' : '');

    const user = tutorial && tutorial.user ? tutorial.user : null;
    const creatorName = user
        ? (user.userName || user.username || user.user_name || null)
        : null;

    const headerHTML = `
        <h1 class="project-title mb-4">${tutorial.title}</h1>
        <div class="project-tags mb-2">
            ${tags.map(tag => `<span class="badge bg-secondary me-2 mb-2">${tag}</span>`).join('')}
        </div>
        ${creatorName ? `<div class="project-meta mb-4 text-muted"><span class="fw-bold">Created by ${creatorName}</span></div>` : ''}
    `;

    document.getElementById('project-header').innerHTML = headerHTML;
}

/**
 * Display the main tutorial image
 */
function renderMainImage(project) {
    const placeholderSrc = `https://placehold.co/1200x400/FF6B35/FFFFFF?text=${encodeURIComponent(project.title)}`;
    const uploadsBasePath = UPLOADS_BASE_URL;
    const imageFileName = project.imageMain || project.image_main;
    const imageSrc = imageFileName ? (uploadsBasePath + encodeURIComponent(imageFileName)) : placeholderSrc;

    const imageHTML = `
        <img src="${imageSrc}" 
             class="img-fluid rounded" 
             alt="${project.title}"
             style="width: 60%; height: auto;"
             onerror="this.onerror=null;this.src='${placeholderSrc}'">
    `;

    document.getElementById('project-main-image').innerHTML = imageHTML;
}

function renderSchematic(project) {
    const section = document.getElementById('project-schematic-section');
    const container = document.getElementById('project-schematic');
    if (!section || !container) return;

    const uploadsBasePath = UPLOADS_BASE_URL;
    const imageFileName = project.imageSchematic || project.image_schematic;
    if (!imageFileName) {
        section.style.display = 'none';
        return;
    }

    const imageSrc = uploadsBasePath + encodeURIComponent(imageFileName);
    const imageHTML = `
        <img src="${imageSrc}" 
             class="img-fluid rounded" 
             alt="Circuit schematic for ${project.title}"
             onerror="this.closest('section').style.display='none';">
    `;
    container.innerHTML = imageHTML;
}

function renderLayout(project) {
    const section = document.getElementById('project-layout-section');
    const container = document.getElementById('project-layout');
    if (!section || !container) return;

    const uploadsBasePath = UPLOADS_BASE_URL;
    const imageFileName = project.imageLayout || project.image_layout;
    if (!imageFileName) {
        section.style.display = 'none';
        return;
    }

    const imageSrc = uploadsBasePath + encodeURIComponent(imageFileName);
    const imageHTML = `
        <img src="${imageSrc}" 
             class="img-fluid rounded" 
             alt="PCB layout for ${project.title}"
             onerror="this.closest('section').style.display='none';">
    `;
    container.innerHTML = imageHTML;
}

/**
 * Display the tutorial description with details
 */
function renderDescription(tutorial) {
    const descriptionHTML = `
        <p>${tutorial.description}</p>
        
        <p>This ${tutorial.category.name} tutorial demonstrates innovative use of modern electronics and microcontroller technology. 
        It combines practical hardware design with efficient software implementation to create a functional and reliable system.</p>
        
        <p>The system integrates multiple sensors and actuators to achieve its functionality. The tutorial has been designed 
        with modularity in mind, allowing easy customization and expansion for different use cases. All components are readily 
        available from common electronics suppliers, making this tutorial accessible to makers of all skill levels.</p>

        <p>Detailed build instructions, code comments, and troubleshooting tips are provided to ensure successful replication. 
        The tutorial has been thoroughly tested and validated by the community, with many successful builds reported.</p>
    `;

    document.getElementById('project-description').innerHTML = descriptionHTML;
}

/**
 * Display  Bill of Materials (BOM)
 * Use the backend file_bom field:
 *  - Images: show on page + download button
 *  - CSV: download button
 *  - XLS/XLSX/other: download button
 */
function renderBOM(tutorial) {
    const bomContainer = document.getElementById('project-bom');
    if (!bomContainer) return;

    const bomSection = bomContainer.closest('section');
    const uploadsBasePath = UPLOADS_BASE_URL;
    const fileName = tutorial.fileBom || tutorial.file_bom;

    if (!fileName) {
        if (bomSection) bomSection.style.display = 'none';
        return;
    }

    const fileUrl = uploadsBasePath + encodeURIComponent(fileName);
    const lowerName = fileName.toLowerCase();

    // Images: show on page + download button
    // use file name Regex.
    if (/\.(png|jpe?g|gif|webp|bmp|svg)$/.test(lowerName)) {
        bomContainer.innerHTML = `
            <div class="d-inline-block text-start">
                <img src="${fileUrl}"
                     class="img-fluid rounded mb-3"
                     alt="Bill of materials for ${tutorial.title}"
                     style="width: 60%; height: auto; display: block; margin-bottom: 1rem;">
                <a href="${fileUrl}" class="btn btn-outline-info" target="_blank" rel="noopener">
                    <i class="fa fa-download me-1"></i>
                    Download BOM
                </a>
            </div>
        `;
        return;
    }

    // CSV: download button
    if (lowerName.endsWith('.csv')) {
        bomContainer.innerHTML = '<p class="text-muted">Loading Bill of Materials...</p>';

        fetch(fileUrl)
            .then(function (response) {
                if (!response.ok) {
                    throw new Error('Failed to load BOM CSV');
                }
                return response.text();
            })

            .catch(function () {
                bomContainer.innerHTML = `
                    <div class="d-inline-block text-start">
                        <a href="${fileUrl}" class="btn btn-outline-info" target="_blank" rel="noopener">
                            <i class="fa fa-download me-1"></i>
                            Download BOM (CSV)
                        </a>
                    </div>
                `;
            });

        return;
    }

    // XLS/XLSX/other: downloadbutton
    bomContainer.innerHTML = `
        <div class="d-inline-block text-start">
            <a href="${fileUrl}" class="btn btn-outline-info" target="_blank" rel="noopener">
                <i class="fa fa-download me-1"></i>
                View / Download BOM
            </a>
        </div>
    `;
}

/**
 * Update the GitHub link with the tutorial-specific URL
 */
function updateGitHubLink(tutorial) {
    const githubLink = document.getElementById('github-link');

    if (githubLink) {
        const repoName = tutorial.title.toLowerCase().replace(/\s+/g, '-');
        githubLink.href = `https://github.com/voltara/${repoName}`;
    }
}

/**
 * Display other tutorials by the same creator or others
 * Shows up to 3 tutorial cards at the bottom
 */
function renderCreatorTutorials(tutorial) {
    const user = tutorial && tutorial.user ? tutorial.user : null;
    const creatorName = user
        ? (user.userName || user.username || user.user_name || null)
        : null;

    const sameCreatorTutorials = creatorName
        ? getTutorialsByAuthor(creatorName, tutorial.id)
        : [];

    const headingEl = document.getElementById('more-tutorials-heading');

    let tutorialsToShow = [];

    if (sameCreatorTutorials.length > 0 && creatorName) {
        if (headingEl) {
            headingEl.textContent = 'More Tutorials by ' + creatorName;
        }
        tutorialsToShow = sameCreatorTutorials;
    } else {
        if (headingEl) {
            headingEl.textContent = 'More Tutorials';
        }

        tutorialsToShow = voltaraTutorials
            .filter(function (t) {
                if (!t || t.id === tutorial.id) {
                    return false;
                }
                const tUser = t.user || null;
                const tName = tUser ? (tUser.userName || tUser.username || tUser.user_name || null) : null;
                return !creatorName || tName !== creatorName;
            })
            .slice(0, 3);
    }

    if (!tutorialsToShow.length) {
        document.getElementById('creator-projects').innerHTML = `
            <div class="col-12">
                <p class="text-muted text-center py-4">No other tutorials to display.</p>
            </div>
        `;
        return;
    }

    const uploadsBasePath = UPLOADS_BASE_URL;

    const tutorialsHTML = tutorialsToShow.map(function (t) {
        const placeholderSrc = `https://placehold.co/400x300/23374D/FFFFFF?text=${encodeURIComponent(t.category.name)}`;
        const imageFileName = t.imageMain || t.image_main;
        const imageSrc = imageFileName ? (uploadsBasePath + encodeURIComponent(imageFileName)) : placeholderSrc;

        return `
        <div class="col">
            <div class="card h-100 ms-0 rounded-4 border bg-light tutorial-card">
                <a href="tutorial-details.html?id=${t.id}" class="text-decoration-none">
                    <img src="${imageSrc}" 
                         class="card-img-top rounded-top-3 tutorial-card-img" 
                         alt="${t.title}"
                         onerror="this.onerror=null;this.src='${placeholderSrc}'" />
                    <div class="card-body tutorial-card-body">
                        <h5 class="card-title text-secondary fw-bolder tutorial-card-title">
                            ${t.title}
                        </h5>
                        <p class="card-text text-dark small tutorial-card-desc">
                            ${t.description}
                        </p>
                    </div>
                </a>
            </div>
        </div>
        `;
    }).join('');

    document.getElementById('creator-projects').innerHTML = tutorialsHTML;
}

/**
 * Start everything when the page finishes loading
 * DOMContentLoaded means "the HTML is ready".
 */
document.addEventListener('DOMContentLoaded', function () {
    var header = document.getElementById('project-header');
    if (!header) {
        return;
    }

    if (voltaraTutorials.length > 0) {
        header.innerHTML = '';
        loadTutorialDetails();
    } else {
        header.innerHTML = '<div class="text-center py-5"><div class="spinner-border text-primary" role="status"><span class="visually-hidden">Loading...</span></div></div>';

        ensureTutorialsLoaded().then(function () {
            if (!voltaraTutorials.length) {
                header.innerHTML = '<div class="text-center py-5">Tutorial not found.</div>';
                return;
            }

            header.innerHTML = '';
            loadTutorialDetails();
        });
    }
});