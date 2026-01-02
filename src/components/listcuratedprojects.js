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
    projectData = data.products; /* fetched data is in the format of arrays of products */
    numberofProjects = data.products.length; /* get total number of projects */
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
| | | <span><span> Likes          |
│ │ │ <p> Project Descriptions    │
└─┴─┴─────────────────────────────┘
-----------------------------------------------------------
*/

function addCard(item, position) {
    // target the parent of all cards to obtain the starting point
    const cardGroup = document.getElementById('curatedProjectCardGroup');

    //start adding each html element
    const colDiv = document.createElement('div');
    colDiv.className = 'col col-12 col-md-6 col-lg-4 mb-4';
    const cardDiv = document.createElement('div');
    cardDiv.className = 'card h-100 ms-0 rounded-4 mb-3';
    // anchor tag for a clickable hyperlink applies to the whole card area
    const anchor = document.createElement('a');
    anchor.href = '#';
    anchor.className = 'text-decoration-none';

    // add an image from source data array locally named 'item'  
    const curatedProjectImage = document.createElement('img');
    curatedProjectImage.id = "curatedCardImage-" + position;
    curatedProjectImage.src = item.images[0]; //get image from 'images' data field
    curatedProjectImage.className = 'card-img-top w-100 -100 rounded-top-3';
    curatedProjectImage.alt = item.title;

    const curatedProjectTitle = document.createElement('h5');
    curatedProjectTitle.id = "curatedCardTitle-" + position;
    curatedProjectTitle.className = 'card-title text-secondary fw-bold px-3';
    curatedProjectTitle.innerText = item.title; //get title from 'title' data field

    const curatedProjectDesc = document.createElement('p');
    curatedProjectDesc.id = "curatedCardDesc-" + position;
    curatedProjectDesc.className = 'card-text text-dark fw-light small px-3  pb-2';
    curatedProjectDesc.innerText = item.description; //get description from 'description' data field

    const curatedLikesLogo = document.createElement('span');
    curatedLikesLogo.className = 'fa-slab fa-regular fa-heart text-secondary fw-light ps-3 pb-2';

    const curatedLikesCount = document.createElement('span');
    curatedLikesCount.id = "curatedCardLikes-" + position;
    curatedLikesCount.className = 'card-title text-secondary fw-normal ps-1 pb-2';
    curatedLikesCount.innerText = item.rating; //get rating from 'rating' data field

    // append all elements to the anchor tag
    anchor.append(curatedProjectImage, curatedProjectTitle, curatedLikesLogo, curatedLikesCount, curatedProjectDesc);
    cardDiv.append(anchor); // append the anchor tag to the card div
    colDiv.append(cardDiv); // append the card div to the column div
    cardGroup.append(colDiv); // append the column div to the card group
}

// displayCuratedProjectCards() function to render cards on the current page
function displayCuratedProjectCard() {
    // target the parent container as the reference starting point for DOM manipulation
    const cardGroup = document.getElementById('curatedProjectCardGroup');
    cardGroup.innerHTML = ''; // clear existing card group before rendering new card group
    const maxNumberOfCuratedCard = 3; // maximum number of cards is set to 3;
    //populate the curated collection cards
    updateCuratedCollections("ALL");
}

//TODO: remove this function once our database is ready
//temporary function until our tutorial database is ready
//function to route the selected category to the available categories in the JSON data
function categoryMapping(category) {
    let mappedCategory;
    if (category === "Arduino" || category === "Raspberry Pi") {
        mappedCategory = "beauty";
    } else if (category === "ESP32" || category === "Robotics") {
        mappedCategory = "fragrances";
    } else if (category === "IoT" || category === "Sensors") {
        mappedCategory = "furniture";
    } else if (category === "PCB Design" || category === "STM32") {
        mappedCategory = "groceries";
    } else {
        mappedCategory = "ALL";
    }
    return mappedCategory
}

//TODO: remove this function once our database is ready
// Temporary object data mapping until our database is ready function to map
/*
Field name mapping:
in this JavaScript   --  from dummyjson products resource
id                  <--- id
title               <--- title
description         <--- description
category            <--- category       
proficiency         <--- returnPolicy
    - Basic         <--- No return policy 
    - Intermediate  <--- 7 days return policy
    - Advanced      <--- 30 days return policies
curated = true      <--- availabilityStatus = "In Stock" 
number of likes     <--- rating 
*/
function fieldNameMapping(index) {

    let proficiencyLevel = "";
    let curated = false;
    const likes = "rating";

    switch (projectData[index].returnPolicy) {
        case "No return policy":
            proficiencyLevel = "Basic";
            break;
        case "7 days return policy":
            proficiencyLevel = "Intermediate";
            break;
        default:
            proficiencyLevel = "Advanced";
    }

    if (projectData[index].availabilityStatus == "In Stock")
        curated = true;
    else
        curated = false;

    return {
        proficiencyLevel,
        curated,
        likes
    }
}


/*
Function to iterate all tutorials, check if it meets all conditions.
If conditions are met, stored its index and rating in array corresponding to its proficiency level and finally rank(sort) them based of number of likes.
*/
function updateCuratedCollections(category) {
    //get the temporarily mapped category until our DB is ready;
    let selectedCategory = categoryMapping(category);

    let listBASIC = [];
    let listINTERMEDIATE = [];
    let listADVANCED = [];
    let listALL = [];

    //iterate all items and check if each one meets the set conditions:  
    for (let i = 0; i < projectData.length; i++) {
        const tutorial = projectData[i];

        //TODO: this is a temporary variable assignment, to be replaced with actual assignment once our database is ready.
        //get the proficiency Level, curated flag and likes count
        let {
            proficiencyLevel,
            curated,
            likes
        }
            = fieldNameMapping(i);

        /*
        check for the following conditions:
            1. category as selected/filtered.
            2. curated flag is true,
            3. proficiency level is of Basic, Intermediate or Advanced.
        */
        if (tutorial.category === selectedCategory && curated) {
            switch (proficiencyLevel) {
                case "Basic":
                    listBASIC.push([i, tutorial[likes]]);
                    break;
                case "Intermediate":
                    listINTERMEDIATE.push([i, tutorial[likes]]);
                    break;
                case "Advanced":
                    listADVANCED.push([i, tutorial[likes]]);
                    break;
            }
        }

        if (selectedCategory == "ALL" && curated) {
            listALL.push([i]);
        }

    }

    //sort all 3 arrays based on number of likes (rating)
    listBASIC.sort((a, b) => b[1] - a[1]);
    listINTERMEDIATE.sort((a, b) => b[1] - a[1]);
    listADVANCED.sort((a, b) => b[1] - a[1]);

    // target the parent container as the reference starting point for DOM manipulation
    const cardGroup = document.getElementById('curatedProjectCardGroup');
    cardGroup.innerHTML = ''; // clear existing card group before rendering new card group

    /* set the preference for each card:
    index [0]: first row is the preference for Left card.
               if no tutorial is available (in listBASIC[] array), 
               the logic will try to take from listINTERMEDIATE[],
               if no tutorial is available (in listINTERMEDIATE[] array), 
               the logic will try to take from listADVANCED[].
    index [1]: second row is the preference for middle card.
    index [3]: third row is the preference for right card.
    */
    const slotPreferences = [
        ['basic', 'inter', 'adv'],
        ['inter', 'adv', 'basic'],
        ['adv', 'inter', 'basic']
    ];

    for (let slot = 0; slot < 3; slot++) {
        //iterate through the preferences of all 3 cards/slots
        const preference = slotPreferences[slot];
        let tutorial;

        //for each card/slot check if the 1st preference (most preferred) is met
        //if not met, use the next preference in the list.
        for (let i = 0; i < preference.length; i++) {
            const listName = preference[i];

            if (listName === 'basic' && listBASIC.length > 0) {
                tutorial = projectData[listBASIC[0][0]];
                //remove tutorial index from array once it is used/displayed
                listBASIC.shift();
                break;
            }

            if (listName === 'inter' && listINTERMEDIATE.length > 0) {
                tutorial = projectData[listINTERMEDIATE[0][0]];
                //remove tutorial index from array once it is used/displayed
                listINTERMEDIATE.shift();
                break;
            }

            if (listName === 'adv' && listADVANCED.length > 0) {
                tutorial = projectData[listADVANCED[0][0]];
                //remove tutorial index from array once it is used/displayed
                listADVANCED.shift();
                break;
            }
        }

        //render the tutorial on the respective position if tutorial is not falsy.
        if (tutorial) {
            addCard(tutorial, slot);
        }
    }

    /*
    If ALL category is selected randomly display 3 tutorials marked as curated.
    It is possible to have 0 tutorial marked as curated
    No duplication of tutorial to be displayed on the 3 card/slot
    */
    const minIndex = Math.min(listALL.length, 3);
    if (listALL.length > 0) {
        for (let slot = 0; slot < minIndex; slot++) {
            const randomIndex = Math.floor(Math.random() * listALL.length);
            const tutorial = projectData[listALL[randomIndex]];
            //remove tutorial index from array to prevent duplication
            listALL.splice(randomIndex, 1);
            addCard(tutorial, slot);
        }
    }

}

// fetch project data (from dummyjson.com) when the page is loaded (script.js is executed)
fetchProjectData();

/* ========================================================================== */

