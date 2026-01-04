/* ========================================================================== 
    fetch project data for display on the landing page dynamically
    at the moment data from dummyjson.com are used for testing purpose
    function to fetch project data from dummyjson.com with asynchronous fetch()
    no API key is required
*/
/*
    the JSON data has the following format:
    {
        "products": [
            { "id": 1, "title": "Product 1", "description": "product1 description.", images": [ "URL1", "URL2",...]},
            { "id": 2, "title": "Product 2", "description": "product2 description.", images": [ "URL1"] }
        ]
    }
*/

let projectData = []; /* global variable */

async function fetchProjectData() {
    const response = await fetch('https://dummyjson.com/products');//fetch only resource named "products" 
    const data = await response.json(); //store the resulting json format data in variable named "data"
    projectData = data.products; //fetched data is in the format of arrays of products 
    numberofProjects = data.products.length; //get total number of projects

    displayCuratedProjectCard();   //render all cards on the first page
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
proficiencyLevel    <--- returnPolicy
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

    //map "returnPolicy" field in JSON to represent the "proficiencyLevel"
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

//map "availabilityStatus" field in JSON to represent the "proficiencyLevel"
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

    let curatedBASIC = [];        //array for tutorials with proficiencyLevel= "Basic" and curated flag = true
    let curatedINTERMEDIATE = []; //array for tutorials with proficiencyLevel= "Intermediate" and curated flag = true
    let curatedADVANCED = [];     //array for tutorials with proficiencyLevel= "Advanced" and curated flag = true
    let curatedALL = [];          //array for tutorials with curated flag = true  (for any proficiencyLevel)

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
        if conditions are met, save the tutorial index and number of likes into respective arrays.
        */
        if (selectedCategory === tutorial.category && curated) {
            switch (proficiencyLevel) {
                case "Basic":
                    curatedBASIC.push([i, tutorial[likes]]);
                    break;
                case "Intermediate":
                    curatedINTERMEDIATE.push([i, tutorial[likes]]);
                    break;
                case "Advanced":
                    curatedADVANCED.push([i, tutorial[likes]]);
                    break;
            }
        }

        //if "ALL" is selected save the tutorial index only to curatedALL[] array
        if (selectedCategory === "ALL" && curated) {
            curatedALL.push([i]);
        }

    }

    //sort all 3 arrays based on number of likes (rating), descending order
    curatedBASIC.sort((a, b) => b[1] - a[1]);
    curatedINTERMEDIATE.sort((a, b) => b[1] - a[1]);
    curatedADVANCED.sort((a, b) => b[1] - a[1]);

    // target the parent container as the reference starting point for DOM manipulation
    const cardGroup = document.getElementById('curatedProjectCardGroup');
    cardGroup.innerHTML = ''; // clear existing card group before rendering new card group

    /* set the preference for each card:
    index [0]: first row is the preference for Left card.
               if no tutorial is available (in curatedBASIC[] array), 
               the logic will try to take from curatedINTERMEDIATE[],
               if no tutorial is available (in curatedINTERMEDIATE[] array), 
               the logic will try to take from curatedADVANCED[].
    index [1]: second row is the preference for middle card.
    index [3]: third row is the preference for right card.
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

        //for each card/slot check if the 1st preference (most preferred) is met
        //if not met, use the next preference in the list.
        for (let i = 0; i < preference.length; i++) {
            const curatedArrName = preference[i];

            if (curatedArrName === 'basic' && curatedBASIC.length > 0) {
                tutorial = projectData[curatedBASIC[0][0]];
                //remove tutorial index from array once it is used/displayed
                curatedBASIC.shift();
                break;
            }

            if (curatedArrName === 'inter' && curatedINTERMEDIATE.length > 0) {
                tutorial = projectData[curatedINTERMEDIATE[0][0]];
                //remove tutorial index from array once it is used/displayed
                curatedINTERMEDIATE.shift();
                break;
            }

            if (curatedArrName === 'adv' && curatedADVANCED.length > 0) {
                tutorial = projectData[curatedADVANCED[0][0]];
                //remove tutorial index from array once it is used/displayed
                curatedADVANCED.shift();
                break;
            }
        }

        //render the tutorial on the respective position if tutorial is not falsy.
        if (tutorial) {
            addCard(tutorial, position);
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
            addCard(tutorial, position);
        }
    }

}

// fetch project data (from dummyjson.com) when the page is loaded (script.js is executed)
fetchProjectData();

/* ========================================================================== */

