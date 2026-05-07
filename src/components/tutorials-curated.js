// Data source is voltaraTutorials, fetched from backend by tutorials-loader.js
function fetchProjectData() {
    projectData = voltaraTutorials;
    numberofProjects = projectData.length; //get total number of projects

    displayCuratedProjectCard();   //render all cards on the first page
}

// addCard() function creates a card element for each project and append it to the card group
// the following html elements will be added dynamically by addCard()


function addCard(tutorial, position, category) {
    // target the parent of all cards to obtain the starting point
    const cardGroup = document.getElementById('curatedProjectCardGroup');

    //start adding each html element
    const colDiv = document.createElement('div');
    colDiv.className = 'col mb-4';
    const cardDiv = document.createElement('div');
    cardDiv.className = 'card h-100 ms-0 rounded-4 border bg-light mb-3 tutorial-card';
    // anchor tag for a clickable hyperlink applies to the whole card area
    const anchor = document.createElement('a');
    anchor.href = `tutorial-details.html?id=${tutorial.id}`;
    anchor.className = 'text-decoration-none';

    // add an image using backend file name as primary source with placeholder fallback
    const curatedProjectImage = document.createElement('img');
    curatedProjectImage.id = "curatedCardImage-" + position;

    const placeholderSrc = `https://placehold.co/400x300/23374D/FFFFFF?text=${encodeURIComponent(tutorial.category.name)}`;
    const uploadsBasePath = UPLOADS_BASE_URL;
    const imageFileName = tutorial.imageMain || tutorial.image_main;
    const primarySrc = imageFileName ? (uploadsBasePath + encodeURIComponent(imageFileName)) : placeholderSrc;

    curatedProjectImage.src = primarySrc;
    curatedProjectImage.className = 'card-img-top rounded-top-3 tutorial-card-img';
    curatedProjectImage.alt = tutorial.title;
    curatedProjectImage.onerror = function () {
        this.onerror = null;
        this.src = placeholderSrc;
    };

    const curatedProjectTitle = document.createElement('h5');
    curatedProjectTitle.id = "curatedCardTitle-" + position;
    curatedProjectTitle.className = 'card-title text-secondary fw-bolder tutorial-card-title';
    curatedProjectTitle.innerText = tutorial.title; //get title from 'title' data field

    const curatedProjectDesc = document.createElement('p');
    curatedProjectDesc.id = "curatedCardDesc-" + position;
    curatedProjectDesc.className = 'card-text text-dark small tutorial-card-desc';
    curatedProjectDesc.innerText = tutorial.description; //get description from 'description' data field

    // const curatedLikesLogo = document.createElement('span');
    // curatedLikesLogo.className = 'fa-slab fa-regular fa-heart text-secondary fw-light ps-3 pb-2';

    // const curatedLikesCount = document.createElement('span');
    // curatedLikesCount.id = "curatedCardLikes-" + position;
    // curatedLikesCount.className = 'card-title text-secondary fw-normal ps-1 pb-2';
    // curatedLikesCount.innerText = tutorial.likes; //get rating from 'likes' data field

    const cardBody = document.createElement('div');
    cardBody.className = 'card-body tutorial-card-body';
    cardBody.append(curatedProjectTitle, curatedProjectDesc);

    // append all elements to the anchor tag
    anchor.append(curatedProjectImage, cardBody);
    cardDiv.append(anchor); // append the anchor tag to the card div
    colDiv.append(cardDiv); // append the card div to the column div
    cardGroup.append(colDiv); // append the column div to the card group
}

// displayCuratedProjectCards() function to render cards on the current page
function displayCuratedProjectCard() {
    // target the parent container as the reference starting point for DOM manipulation
    const cardGroup = document.getElementById('curatedProjectCardGroup');
    cardGroup.textContent = ''; // clear existing card group before rendering new card group
    const maxNumberOfCuratedCard = 3; // maximum number of cards is set to 3;

    //populate the curated collection cards
    updateCuratedCollections("ALL");
}


function updateCuratedCollections(category) {
    //get the temporarily mapped category until our DB is ready;
    let selectedCategory = category;

    let curatedBEGINNER = [];
    let curatedINTERMEDIATE = [];
    let curatedADVANCE = [];
    let curatedALL = [];

    //iterate all items and check if each one meets the set conditions:  
    for (let i = 0; i < projectData.length; i++) {
        const tutorial = projectData[i];

        //DONE: this is a temporary variable assignment, to be replaced with actual assignment once our database is ready.

        proficiencyLevel = tutorial.proficiency;
        curated = tutorial.curated;
       likes = tutorial.likes;

        if (selectedCategory === tutorial.category.name && curated) {
            switch (proficiencyLevel) {
                case "BEGINNER":
                    curatedBEGINNER.push([i, likes]);
                    break;
                case "INTERMEDIATE":
                    curatedINTERMEDIATE.push([i, likes]);
                    break;
                case "ADVANCE":
                    curatedADVANCE.push([i, likes]);

                    break;
            }
        }

        //if "ALL" is selected save the tutorial index only to curatedALL[] array
        if (selectedCategory === "ALL" && curated) {
            curatedALL.push([i]);
        }
    }

    //sort all 3 arrays based on number of likes (rating), descending order
    curatedBEGINNER.sort((a, b) => b[1] - a[1]);
    curatedINTERMEDIATE.sort((a, b) => b[1] - a[1]);
    curatedADVANCE.sort((a, b) => b[1] - a[1]);

    // target the parent container as the reference starting point for DOM manipulation
    const cardGroup = document.getElementById('curatedProjectCardGroup');
    cardGroup.innerHTML = ''; // clear existing card group before rendering new card group

    /* set the preference for each slot position:
    index [0]: first row is the preference for Left slot.
               if no tutorial is available (in curatedBEGINNER[] array), 
               the logic will try to take from curatedINTERMEDIATE[],
               if no tutorial is available (in curatedINTERMEDIATE[] array), 
               the logic will try to take from curatedADVANCE[].
    index [1]: second row is the preference for middle slot.
    index [2]: third row is the preference for right slot.
    */
    const slotPreferences = [
        ['basic', 'inter', 'adv'],
        ['inter', 'adv', 'basic'],
        ['adv', 'inter', 'basic']
    ];

    for (let position = 0; position < 3; position++) {
        //iterate through the preferences of all 3 cards/slots
        const preference = slotPreferences[position];
        let tutorial;

        //for each slot check if the 1st preference (most preferred) is met
        //if not met, use the next preference in the list.
        for (let i = 0; i < preference.length; i++) {
            const curatedArrName = preference[i];

            if (curatedArrName === 'basic' && curatedBEGINNER.length > 0) {
                tutorial = projectData[curatedBEGINNER[0][0]];
                //remove tutorial index from array once it is used/displayed to prevent duplication
                curatedBEGINNER.shift();
                break;
            }

            if (curatedArrName === 'inter' && curatedINTERMEDIATE.length > 0) {
                tutorial = projectData[curatedINTERMEDIATE[0][0]];
                curatedINTERMEDIATE.shift();
                break;
            }

            if (curatedArrName === 'adv' && curatedADVANCE.length > 0) {
                tutorial = projectData[curatedADVANCE[0][0]];
                curatedADVANCE.shift();
                break;
            }
        }

        //render the tutorial on the respective position if tutorial is not falsy (array is empty).
        if (tutorial) {
            addCard(tutorial, position, category);
        }
    }

    /*
    If ALL category is selected randomly display 3 tutorials marked as curated.
    It is possible to have 0 tutorial marked as curated
    No duplication of tutorial to be displayed on the 3 card/slot
    */
    const minIndex = Math.min(curatedALL.length, 3);
    if (curatedALL.length > 0) {
        for (let position = 0; position < minIndex; position++) {
            const randomIndex = Math.floor(Math.random() * curatedALL.length);
            const tutorial = projectData[curatedALL[randomIndex]];
            //remove tutorial index from array to prevent duplication
            curatedALL.splice(randomIndex, 1);
            addCard(tutorial, position, category);
        }
    }

}

// fetch project data when the page is ready; use cached tutorials if available
document.addEventListener('DOMContentLoaded', function () {
    const curatedGrid = document.getElementById('curatedProjectCardGroup');
    if (!curatedGrid) {
        // Nothing to render on this page
        return;
    }

    // if tutorials are already loaded, render immediately
    // otherwise, wait for tutorials to load - show loading spinner
    if (voltaraTutorials.length > 0) {
        curatedGrid.innerHTML = '';
        fetchProjectData();
    } else {
        curatedGrid.innerHTML = '<div class="text-center py-5"><div class="spinner-border text-primary" role="status"><span class="visually-hidden">Loading...</span></div></div>';

        ensureTutorialsLoaded().then(function () {
            if (!voltaraTutorials.length) {
                curatedGrid.innerHTML = '<div class="text-center py-5">No curated tutorials available.</div>';
                return;
            }

            curatedGrid.innerHTML = '';
            fetchProjectData();
        });
    }
});

/* ========================================================================== */

