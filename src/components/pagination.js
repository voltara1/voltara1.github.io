/**
 * Pagination Class
 * A reusable component for displaying items across multiple pages
 */
class Pagination {

    /**
     * Constructor - Set up the pagination with all necessary information
     * 
     * @param {Array} data - All items to display (e.g., all projects)
     * @param {number} itemsPerPage - How many items to show per page
     * @param {string} containerId - ID of the HTML element where items will appear
     * @param {string} paginationId - ID of the HTML element where page buttons will appear
     * @param {Function} renderCallback - Function that creates HTML for one item
     */
    constructor(data, itemsPerPage, containerId, paginationId, renderCallback) {
        // Store the data and settings
        this.data = data;
        this.itemsPerPage = itemsPerPage;
        this.containerId = containerId;
        this.paginationId = paginationId;
        this.renderCallback = renderCallback;
        
        // Track which page we're on
        this.currentPage = 1;
        
        // Calculate how many pages we need
        // Example: 24 items ÷ 9 per page = 2.67 → rounds up to 3 pages
        this.totalPages = Math.ceil(data.length / itemsPerPage);
    }

    /**
     * Get the items that belong on the current page
     * 
     * How it works:
     * - Page 1: shows items 0-8 (first 9 items)
     * - Page 2: shows items 9-17 (next 9 items)
     * - Page 3: shows items 18-23 (remaining items)
     */
    getCurrentPageItems() {
        // Calculate starting position
        const startIndex = (this.currentPage - 1) * this.itemsPerPage;
        
        // Calculate ending position
        const endIndex = startIndex + this.itemsPerPage;
        
        // Extract and return the items for this page
        return this.data.slice(startIndex, endIndex);
    }

    /**
     * Display the items for the current page
     */
    displayItems() {
        // Find the container element
        const container = document.getElementById(this.containerId);
        
        // Check if container exists
        if (!container) {
            console.error(`Container with ID "${this.containerId}" not found`);
            return;
        }
        
        // Clear any existing content
        container.innerHTML = '';
        
        // Get items for the current page
        const itemsToShow = this.getCurrentPageItems();
        
        // Create and add HTML for each item
        itemsToShow.forEach(item => {
            const itemHTML = this.renderCallback(item);
            container.innerHTML += itemHTML;
        });
    }

    /**
     * Display the pagination buttons (Previous, 1, 2, 3, Next)
     */
    displayButtons() {
        // Find the pagination container
        const paginationContainer = document.querySelector(`#${this.paginationId} .pagination`);
        
        // Check if container exists
        if (!paginationContainer) {
            console.error(`Pagination container with ID "${this.paginationId}" not found`);
            return;
        }
        
        // Build the HTML for all buttons
        let buttonsHTML = '';
        
        // Add "Previous" button
        const isFirstPage = (this.currentPage === 1);
        buttonsHTML += `
            <li class="page-item ${isFirstPage ? 'disabled' : ''}">
                <a class="page-link" href="#" data-page="prev">Previous</a>
            </li>
        `;
        
        // Add page number buttons
        for (let pageNum = 1; pageNum <= this.totalPages; pageNum++) {
            // Decide if this button should be shown
            let showButton = false;
            
            if (this.totalPages <= 7) {
                // If 7 or fewer pages, show all buttons
                showButton = true;
            } else {
                // For many pages, show: first page, last page, and current page ± 1
                if (pageNum === 1 || 
                    pageNum === this.totalPages || 
                    (pageNum >= this.currentPage - 1 && pageNum <= this.currentPage + 1)) {
                    showButton = true;
                }
            }
            
            if (showButton) {
                // Highlight the current page
                const isActive = (this.currentPage === pageNum);
                
                buttonsHTML += `
                    <li class="page-item ${isActive ? 'active' : ''}">
                        <a class="page-link" href="#" data-page="${pageNum}">${pageNum}</a>
                    </li>
                `;
            } else {
                // Add "..." for gaps in page numbers
                if (pageNum === this.currentPage - 2 || pageNum === this.currentPage + 2) {
                    buttonsHTML += `
                        <li class="page-item disabled">
                            <span class="page-link">...</span>
                        </li>
                    `;
                }
            }
        }
        
        // Add "Next" button
        const isLastPage = (this.currentPage === this.totalPages);
        buttonsHTML += `
            <li class="page-item ${isLastPage ? 'disabled' : ''}">
                <a class="page-link" href="#" data-page="next">Next</a>
            </li>
        `;
        
        // Put all buttons on the page
        paginationContainer.innerHTML = buttonsHTML;
        
        // Make buttons clickable
        this.attachClickHandlers();
    }

    /**
     * Make the pagination buttons respond to clicks
     */
    attachClickHandlers() {
        // Find all pagination buttons
        const allButtons = document.querySelectorAll(`#${this.paginationId} .page-link`);
        
        // Add click handler to each button
        allButtons.forEach(button => {
            button.addEventListener('click', (event) => {
                // Prevent page from jumping to top
                event.preventDefault();
                
                // Get which page was clicked
                const clickedPage = event.target.getAttribute('data-page');
                
                // Update current page based on what was clicked
                if (clickedPage === 'prev' && this.currentPage > 1) {
                    // Go to previous page
                    this.currentPage--;
                } 
                else if (clickedPage === 'next' && this.currentPage < this.totalPages) {
                    // Go to next page
                    this.currentPage++;
                } 
                else if (clickedPage !== 'prev' && clickedPage !== 'next') {
                    // Go to specific page number
                    this.currentPage = parseInt(clickedPage);
                }
                
                // Refresh the display
                this.updateDisplay();
                
                // Scroll to top of items
                this.scrollToTop();
            });
        });
    }

    /**
     * Scroll smoothly to the top of the items container
     */
    scrollToTop() {
        const container = document.getElementById(this.containerId);
        if (container) {
            container.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    }

    /**
     * Update both the items and buttons to show the current page
     */
    updateDisplay() {
        this.displayItems();
        this.displayButtons();
    }

    /**
     * Start the pagination - shows the first page
     * Call this method to begin using the pagination
     */
    start() {
        this.updateDisplay();
    }
}