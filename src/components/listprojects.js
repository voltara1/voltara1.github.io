/* ========================================================================== */
// fetch project data for display on the landing page dynamically
// at the moment data from dummyjson.com are used for testing purpose
// function to fetch project data from dummyjson.com with asynchronous fetch()
// no API key is required

// the JSON has the following format:
/*
        {
        "products": [
            { "id": 1, "title": "Product 1", "description": "product1 description." , images": [ "URL1", "URL2",...]},
            { "id": 2, "title": "Product 2", "description": "product2 description.""images": [ "URL1"] }
        ]
        }
*/

let projectData = []; /* global variable */

async function fetchProjectData() {
    const response = await fetch('https://dummyjson.com/products');/* fetch only resource named "products" */
    const data = await response.json(); /* store the resulting json format data in variable named "data" */
    projectData = data.products; /* fetched data is in teh format of arrays of products */
    numberofProjects = data.products.length; /* total number of projects */
    displayCuratedProjectCard();   /* render all cards on the first page */
}

/*
addCard() function creates a card element for each project and append it to the card group
the following html elements will be added dynamically by addCard()
-----------------------------------------------------------
<div class = "col" > 
┌─────────────────────────────────┐
│                                 │
│ <div class = "card">            │
│ ┌───────────────────────────────┤
│ │                               │
│ │ <a> anchor                    │
│ │ ┌─────────────────────────────┤
│ │ │                             │
│ │ │ <img>                       │
│ │ │ ┌─────────────────────────┐ │
│ │ │ │                         │ │
│ │ │ └─────────────────────────┘ │
│ │ │ <h5> Project Title          │
│ │ │ <p> Project Descriptions    │
└─┴─┴─────────────────────────────┘
-----------------------------------------------------------
*/

function addCard(item) {
    // target the parent of all cards to obtain the starting point
    const cardGroup = document.getElementById('curatedProjectCardGroup');

    //start adding each html element
    const colDiv = document.createElement('div');
    colDiv.className = 'col col-12 col-md-6 col-lg-4 mb-4';
    const cardDiv = document.createElement('div');
    cardDiv.className = 'card h-100 ms-0 rounded-4';
    // anchor tag for a clickable hyperlink applies to the whole card area
    const anchor = document.createElement('a');
    anchor.href = '#';
    anchor.className = 'text-decoration-none';
    // add an image from source data array locally named 'item'  
    const curatedProjectImage = document.createElement('img');
    // select the 1st image from the array named 'images' in the source data  
    curatedProjectImage.src = item.images[0];
    curatedProjectImage.className = 'card-img-top w-100 -100 rounded-top-3';
    // select the title from the array named 'images' in the source data
    curatedProjectImage.alt = item.title;
    const curatedProjectTitle = document.createElement('h5');
    curatedProjectTitle.className = 'card-title text-secondary fw-bold px-3';
    curatedProjectTitle.innerText = item.title;
    const curatedProjectDesc = document.createElement('p');
    curatedProjectDesc.className = 'card-text text-dark fw-light small px-3 pb-4';
    curatedProjectDesc.innerText = item.description;
    // append all elements to the anchor tag
    anchor.append(curatedProjectImage, curatedProjectTitle, curatedProjectDesc);
    // append the anchor tag to the card div
    cardDiv.append(anchor);
    // append the card div to the column div
    colDiv.append(cardDiv);
    // append the column div to the card group
    cardGroup.append(colDiv);
}

// displayCuratedProjectCards() function to render cards on the current page
function displayCuratedProjectCard() {
    // target the parent container as the reference starting point for DOM manipulation
    const cardGroup = document.getElementById('curatedProjectCardGroup');
    // clear existing card group before rendering new card group
    cardGroup.innerHTML = '';
    // maximum number of cards is set to 3;
    const maxNumberOfCuratedCard = 3;
    // const maxNumberOfCuratedCard = numberofProjects;

    //TODO: select projects to be displayed randomly; 1 project for each category
    // to display curated projects randomly based on specific categories.
    // position of each category is fixed: 
    // first category is displayed on the first/left card
    // third category is displayed on the third/right card
    // this is to facilate the placement of "beginner/intermediate/advanced" category at the later stage
    let leftCardIndex, centerCardIndex, rightCardIndex;
    const firstCategory = "fragrances"; /* select 1 fragrance randomly */
    const secondCategory = "furniture"; /* select 1 furniture randomly */
    const thirdCategory = "groceries";  /* select 1 fragrance randomly */
    let randomNumber;
    //get index number for project in each category and display its project card sequentialy from left to right.

    // display project of the first category on the left most card
    while (true) {
        randomNumber = Math.floor(Math.random() * numberofProjects);
        if (projectData[randomNumber].category == firstCategory) {
            break;
        }
    }
    addCard(projectData[randomNumber]);

    // display project of the second category on the center card
    while (true) {
        randomNumber = Math.floor(Math.random() * numberofProjects);
        if (projectData[randomNumber].category == secondCategory) {
            break;
        }
    }
    addCard(projectData[randomNumber]);

    // display project of the third category on the left most card
    while (true) {
        randomNumber = Math.floor(Math.random() * numberofProjects);
        if (projectData[randomNumber].category == thirdCategory) {
            break;
        }
    }
    addCard(projectData[randomNumber]);

}


// fetch project data (from dummyjson.com) when the page is loaded (script.js is executed)
fetchProjectData();

/* ========================================================================== */