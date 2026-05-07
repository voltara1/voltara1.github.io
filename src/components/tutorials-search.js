/* 
! 1. In any HTML page that has a search bar, find the Search form's <input class=""/>, and add id="search-input" inside

! 2. In any HTML page where you want to showcase the searched projects, find the Featured Projects section and add <div id="results"></div>, preferably below the title to display search results nicely

! 3. In the same section, find the projects grid container that is used for displaying the featured projects at the start of page load such as <div id="featured-projects-grid"></div>, and add class="search-projects-grid" inside

! 4. Copy all of the code below in a JS file to implement the search function and change the variable name in search function if needed
*/

// Get references to the input and results elements
const searchInput = document.getElementById('search-input');
const resultsContainer = document.getElementById('results');
const searchProjectsGrid = document.querySelector('.search-projects-grid');

// Variable to store the current search pagination instance
let searchPagination = null;

// Function to filter items based on the search query
function search(query) {
    // ! Change this variable name to the variable that stores the tutorials
    return voltaraTutorials.filter(item =>
        item.title.toLowerCase().includes(query.toLowerCase()) ||
        item.description.toLowerCase().includes(query.toLowerCase())
       // item.content.toLowerCase().includes(query.toLowerCase())

        // This code is used for searching through an array of objects
        // item.tags.some(tag => tag.toLowerCase().includes(query.toLowerCase()))
    );
}

// Function to render a single search result card
function renderSearchResultCard(project) {
    const placeholderSrc = `https://placehold.co/400x300/23374D/FFFFFF?text=${encodeURIComponent(project.category.name)}`;
    const uploadsBasePath = UPLOADS_BASE_URL;
    const imageFileName = project.imageMain || project.image_main;
    const imageSrc = imageFileName ? (uploadsBasePath + encodeURIComponent(imageFileName)) : placeholderSrc;

    return `
        <div class="col">
            <div class="card h-100 ms-0 rounded-4 border bg-light tutorial-card">
                <a href="tutorial-details.html?id=${project.id}" class="text-decoration-none">
                    <img src="${imageSrc}" 
                         class="card-img-top rounded-top-3 tutorial-card-img" 
                         alt="${project.title}" 
                         onerror="this.onerror=null;this.src='${placeholderSrc}'">
                    <div class="card-body tutorial-card-body">
                        <h5 class="card-title text-secondary fw-bolder tutorial-card-title">
                            ${project.title}
                        </h5>
                        <p class="card-text text-dark small tutorial-card-desc">
                            ${project.description}
                        </p>
                    </div>
                </a>
            </div>
        </div>
    `;
}

// Function to display search results with pagination
function displayResults(results, query) {
    // Clear previous results and pagination
    resultsContainer.innerHTML = '';

    if (results.length === 0) {
        resultsContainer.innerHTML = `<div class="alert alert-info my-4"> No results found for "<strong>${query}</strong>" </div>`;
        return;
    }

    // Create container for search results
    const searchResultsContainer = document.createElement('div');
    searchResultsContainer.innerHTML = `
        <h3 class="my-4">
            Search Results for "<span class="text-primary">${query}</span>" 
            <span class="badge bg-secondary">${results.length} found</span>
        </h3>
        <div id="search-results-grid" class="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-3 g-4">
        </div>
        <nav id="search-pagination" class="pt-4" aria-label="Search results pagination">
            <ul class="pagination justify-content-center"></ul>
        </nav>
    `;

    resultsContainer.appendChild(searchResultsContainer);

    // Create pagination for search results
    // Show 9 results per page
    searchPagination = new Pagination(
        results,
        9,
        'search-results-grid',
        'search-pagination',
        renderSearchResultCard
    );

    // Start the pagination
    searchPagination.start();
}

// Function to clear search input and reset display, this is called when the page loads to ensure a clean state
function clearSearchOnPageLoad() {
    // Clear the search input value
    if (searchInput) {
        searchInput.value = '';
    }

    // Clear any search results
    if (resultsContainer) {
        resultsContainer.innerHTML = '';
    }

    // Make sure projects grid is visible
    if (searchProjectsGrid) {
        searchProjectsGrid.style.display = '';
    }

    // Make sure pagination is visible
    const featuredPagination = document.getElementById('featured-projects-pagination');
    if (featuredPagination) {
        featuredPagination.style.display = '';
    }

    const explorePagination = document.getElementById('explore-projects-pagination');
    if (explorePagination) {
        explorePagination.style.display = '';
    }

    // Clear search pagination instance
    searchPagination = null;

    console.log('Search cleared on page load');
}

// Event listener for the search input
searchInput.addEventListener('input', () => {
    const query = searchInput.value.trim();

    if (query) {
        // Hide featured projects when searching
        if (searchProjectsGrid) {
            searchProjectsGrid.style.display = 'none';
        }

        // Hide featured pagination too
        const featuredPagination = document.getElementById('featured-projects-pagination');
        if (featuredPagination) {
            featuredPagination.style.display = 'none';
        }

        // Hide explore pagination
        const explorePagination = document.getElementById('explore-projects-pagination');
        if (explorePagination) {
            explorePagination.style.display = 'none';
        }

        const results = search(query);
        displayResults(results, query);
    } else {
        // Show projects when search is empty
        if (searchProjectsGrid) {
            searchProjectsGrid.style.display = '';
        }

        // Show featured pagination
        const featuredPagination = document.getElementById('featured-projects-pagination');
        if (featuredPagination) {
            featuredPagination.style.display = '';
        }

        // Show explore pagination
        const explorePagination = document.getElementById('explore-projects-pagination');
        if (explorePagination) {
            explorePagination.style.display = '';
        }

        resultsContainer.innerHTML = '';

        // Clear search pagination instance
        searchPagination = null;
    }
});

// event listener for the search button if clicked (input submitted)
// use the searchInput to get the form element and then prevent page reload
const searchForm = searchInput ? searchInput.closest('form') : null;
if (searchForm) {
    searchForm.addEventListener('submit', function (event) {
        event.preventDefault();
    });
}

window.addEventListener('load', clearSearchOnPageLoad);
