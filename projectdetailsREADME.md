# Project Details Feature

This feature allows users to view detailed information about individual projects when they click on a project card.

## Files

### 1. `project-details.html`
The HTML page that displays all project information including:
- Project title and tags
- Main project image
- Detailed description
- Circuit schematic (placeholder)
- PCB layout (placeholder)
- Bill of Materials (BOM) table
- Code & downloadable files section
- GitHub repository link
- More projects by the same creator

### 2. `src/components/projectDetails.js`
JavaScript file that dynamically loads and displays project data:
- Extracts project ID from URL parameters (`?id=5`)
- Fetches project data from mockData
- Renders all project sections dynamically
- Displays other projects by the same author
- Handles error cases (missing ID, project not found)

## How It Works

### User Flow
1. User clicks on a project card from `index.html` or `projects.html`
2. Browser navigates to `project-details.html?id=X` (where X is the project ID)
3. JavaScript extracts the ID from the URL
4. Project data is fetched from `mockData.js`
5. All sections are dynamically populated with project information

### URL Structure
```
project-details.html?id=5
```
- The `?id=5` part tells the page which project to display
- JavaScript reads this and loads project #5 from the mock data

### Key Functions

**`getProjectIdFromURL()`**
- Extracts the project ID from the URL query string
- Returns the ID as a number

**`getProjectById(id)`**
- Searches through all projects to find one with matching ID
- Returns the project object or undefined if not found

**`loadProjectDetails()`**
- Main function that coordinates everything
- Gets ID from URL, fetches project data, renders all sections

**`renderProjectHeader(project)`**
- Displays project title and category tags

**`renderDescription(project)`**
- Shows detailed project description with multiple paragraphs

**`renderBOM(project)`**
- Creates a table showing all required components (Bill of Materials)

**`renderCreatorProjects(project)`**
- Shows 3 other projects by the same author at the bottom

## Integration with Other Pages

### From `index.html` or `projects.html`
Project cards should link to:
```html
<a href="project-details.html?id=5">View Project</a>
```

### Example Integration
```javascript
// When generating project cards, create links like this:
projectCards.forEach(project => {
    const card = `
        <a href="project-details.html?id=${project.id}" class="btn btn-primary">
            View Details
        </a>
    `;
});
```

## Dependencies

- Bootstrap 5.3.3 (CSS framework)
- Font Awesome 6.6.0 (icons)
- `mockData.js` (project data)
- `styles.css` (custom styles)

## Error Handling

The page handles two error scenarios:

1. **No ID in URL**: Shows error message "Project ID not found"
2. **Invalid ID**: Shows error message "Project not found"

## Future Enhancements

- Replace placeholder images (schematic, PCB) with actual project images
- Implement actual file download functionality
- Add image gallery/carousel for multiple project photos
- Add user comments section
- Add "Like" functionality
- Connect to real backend API instead of mock data

## Testing

To test this feature:
1. Open `index.html` or `projects.html`
2. Click on any project card
3. Verify that `project-details.html?id=X` loads
4. Check that all sections display correctly
5. Try clicking "More Projects by This Creator" cards
6. Test error handling by manually entering invalid URLs:
   - `project-details.html` (no ID)
   - `project-details.html?id=999` (invalid ID)

---

## Notes for James (Create Project Integration)

**Connection Point:**
When a user creates a new project through your Create Project form, the newly created project should eventually be viewable through this Project Details page.

**Data Structure:**
Your Create Project form should collect data in the same format as the mock data:
```javascript
{
    id: number,
    title: string,
    description: string,
    category: string,
    tags: array,
    author: string,
    likes: number,
    comments: number,
    imageUrl: string
}
```

**User Flow:**
```
User logs in → Create Project form → Submit → 
New project saved → 
User can click "View Project" → 
Redirects to project-details.html?id=NEW_ID
```

**What You Need from This Page:**
- The data structure format (shown above)
- After creating a project, redirect users to: `project-details.html?id=NEW_PROJECT_ID`
- Your form should collect all fields shown in the BOM and description sections

---

## Author
Built by Fareeda as part of the Voltara team capstone project.

