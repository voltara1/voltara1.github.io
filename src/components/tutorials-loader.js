// This asynchronous function fetches all tutorial objects from back-end API
// HTTP method: GET
// end-point URL: http://localhost:8890/api/v1/tutorial

let voltaraTutorials = [];
let tutorialsFetch = false;

// if tutorial data is available in local storage, fetch them.
const cachedTutorials = window.localStorage.getItem('voltaraTutorials');
if (cachedTutorials) {
  voltaraTutorials = JSON.parse(cachedTutorials);
}

async function ensureTutorialsLoaded() {
    // fetch only on first request or when html page is reloaded.
    if (tutorialsFetch) {
        return tutorialsFetch;
    }
    
    tutorialsFetch = (async function () {
        try {
            const response = await fetch("http://localhost:8890/api/v1/tutorial");
            // if the response is NOT ok, throw a custom response
            if (response.status === 403) {
                throw new Error('Permission denied. Please confim authentication');
            } else if (!response.ok) {
                throw new Error('Failed to load tutorials: ' + response.status);
            }

            // otherwise return the response in JSON format
            voltaraTutorials = await response.json();
            try {
                localStorage.setItem('voltaraTutorials', JSON.stringify(voltaraTutorials));
            } catch (e) {
                console.error('Failed to cache tutorials', e);
            }
            return voltaraTutorials;
            
        } catch (error) {
            console.error('Failed to load tutorials', error);
            voltaraTutorials = [];
            return [];
        }
    })();

    return tutorialsFetch;
}