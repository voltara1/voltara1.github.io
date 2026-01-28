// This asynchronous function fetches all tutorial objects from back-end API
// HTTP method: GET
// end-point URL: ttp://localhost:8890/api/v1/tutorial


var tutorialsFetch = null;

function ensureTutorialsLoaded() {

    // fetch only on first request or when html page is reloaded.
    if (tutorialsFetch) {
        return tutorialsFetch;
    }

    tutorialsFetch = fetch('http://localhost:8890/api/v1/tutorial')
        .then(function (response) {
            //if the response is NOT ok, throw a custom response
            if (!response.status === 403)
                throw new Error('Permission denied. Please confim authentication');
            else if (!response.ok)
                throw new Error('Failed to load tutorials: ' + response.status);
            
            //otherwise return the response in JSON format
            return response.json();
        })
        .then(function (data) {
            // response is ok: load all all tutorial data to voltaraTutorials
            voltaraTutorials = data;
            return data;
        })
        .catch(function (error) {
            // response not ok: set voltaraTutorials to blank []
            console.error('Failed to load tutorials', error);
            voltaraTutorials = [];
            return [];
        });

    return tutorialsFetch;
}