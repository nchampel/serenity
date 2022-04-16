class ApiRef {

    async getData(url = ''/*, data = {}*/) {
  // Default options are marked with *
        const response = await fetch(url, {
            method: 'GET', // *GET, POST, PUT, DELETE, etc.
            mode: 'cors', // no-cors, *cors, same-origin
            cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
            credentials: 'same-origin', // include, *same-origin, omit
            headers: {
            'Content-Type': 'application/json'
            // 'Content-Type': 'application/x-www-form-urlencoded',
            },
            redirect: 'follow', // manual, *follow, error
            referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
            // body: JSON.stringify(data) // body data type must match "Content-Type" header
        });
    //   return response.json(); // parses JSON response into native JavaScript objects
        // console.log(response);
        const json = await response.json();

        return Promise.resolve(json.data);
    }

    async updateEnergy(url = '', energy) {
        // const data = {};
        // data.energy = energy;
        let formData = new FormData();
        formData.append("energy", energy);
        const response = await fetch(url, {
            method: 'POST', // *GET, POST, PUT, DELETE, etc.
            mode: 'cors', // no-cors, *cors, same-origin
            cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
            credentials: 'same-origin', // include, *same-origin, omit
            headers: {
            // 'Content-Type': 'application/json'
            // 'Content-Type': 'application/x-www-form-urlencoded',
            },
            redirect: 'follow', // manual, *follow, error
            referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
            // body: JSON.stringify(data) // body data type must match "Content-Type" header
            body: formData
        });
    //   return response.json(); // parses JSON response into native JavaScript objects
        // console.log(response);
        const json = await response.json();
        // await console.log(json);

        return json;
    }

    async getPlace(url = ''/*, data = {}*/) {
  // Default options are marked with *
        const response = await fetch(url, {
            method: 'GET', // *GET, POST, PUT, DELETE, etc.
            mode: 'cors', // no-cors, *cors, same-origin
            cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
            credentials: 'same-origin', // include, *same-origin, omit
            headers: {
            'Content-Type': 'application/json'
            // 'Content-Type': 'application/x-www-form-urlencoded',
            },
            redirect: 'follow', // manual, *follow, error
            referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
            // body: JSON.stringify(data) // body data type must match "Content-Type" header
        });
    //   return response.json(); // parses JSON response into native JavaScript objects
        // console.log(response);
        const json = await response.json();

        return Promise.resolve(json.data);
    }

    async getLevels(url = ''/*, data = {}*/) {
  // Default options are marked with *
        const response = await fetch(url, {
            method: 'GET', // *GET, POST, PUT, DELETE, etc.
            mode: 'cors', // no-cors, *cors, same-origin
            cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
            credentials: 'same-origin', // include, *same-origin, omit
            headers: {
            'Content-Type': 'application/json'
            // 'Content-Type': 'application/x-www-form-urlencoded',
            },
            redirect: 'follow', // manual, *follow, error
            referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
            // body: JSON.stringify(data) // body data type must match "Content-Type" header
        });
    //   return response.json(); // parses JSON response into native JavaScript objects
        // console.log(response);
        const json = await response.json();

        return Promise.resolve(json.data);
    }

    async getEquipment(url = '', level, type) {
        // const data = {};
        // data.level = level;
        // data.type = type;
        let formData = new FormData();
        formData.append("level", level);
        formData.append("type", type);
        const response = await fetch(url, {
            method: 'POST', // *GET, POST, PUT, DELETE, etc.
            mode: 'cors', // no-cors, *cors, same-origin
            cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
            credentials: 'same-origin', // include, *same-origin, omit
            headers: {
            // 'Content-Type': 'application/json'
            // 'Content-Type': 'application/x-www-form-urlencoded',
            },
            redirect: 'follow', // manual, *follow, error
            referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
            // body: JSON.stringify(data) // body data type must match "Content-Type" header
            body: formData
        });
    //   return response.json(); // parses JSON response into native JavaScript objects
        // console.log(response);
        const json = await response.json();
        // await console.log(json);

        return json.data;
    }

    async addLevelStarship(url = '', type, place) {
        // const data = {};
        // data.level = level;
        // data.type = type;
        let formData = new FormData();
        formData.append("type", type);
        formData.append("place", place);
        const response = await fetch(url, {
            method: 'POST', // *GET, POST, PUT, DELETE, etc.
            mode: 'cors', // no-cors, *cors, same-origin
            cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
            credentials: 'same-origin', // include, *same-origin, omit
            headers: {
            // 'Content-Type': 'application/json'
            // 'Content-Type': 'application/x-www-form-urlencoded',
            },
            redirect: 'follow', // manual, *follow, error
            referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
            // body: JSON.stringify(data) // body data type must match "Content-Type" header
            body: formData
        });
    //   return response.json(); // parses JSON response into native JavaScript objects
        // console.log(response);
        const json = await response.json();
        // await console.log(json);

        return json;
    }

    async addLevelPlanet(url = '', type, place) {
        // const data = {};
        // data.level = level;
        // data.type = type;
        let formData = new FormData();
        formData.append("type", type);
        formData.append("planet", place);
        const response = await fetch(url, {
            method: 'POST', // *GET, POST, PUT, DELETE, etc.
            mode: 'cors', // no-cors, *cors, same-origin
            cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
            credentials: 'same-origin', // include, *same-origin, omit
            headers: {
            // 'Content-Type': 'application/json'
            // 'Content-Type': 'application/x-www-form-urlencoded',
            },
            redirect: 'follow', // manual, *follow, error
            referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
            // body: JSON.stringify(data) // body data type must match "Content-Type" header
            body: formData
        });
    //   return response.json(); // parses JSON response into native JavaScript objects
        // console.log(response);
        const json = await response.json();
        // await console.log(json);

        return json;
    }

    async getDataPlanetsGalaxy(url = '', galaxy) {
        // const data = {};
        // data.level = level;
        // data.type = type;
        let formData = new FormData();
        formData.append("galaxy", galaxy);
        const response = await fetch(url, {
            method: 'POST', // *GET, POST, PUT, DELETE, etc.
            mode: 'cors', // no-cors, *cors, same-origin
            cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
            credentials: 'same-origin', // include, *same-origin, omit
            headers: {
            // 'Content-Type': 'application/json'
            // 'Content-Type': 'application/x-www-form-urlencoded',
            },
            redirect: 'follow', // manual, *follow, error
            referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
            // body: JSON.stringify(data) // body data type must match "Content-Type" header
            body: formData
        });
    //   return response.json(); // parses JSON response into native JavaScript objects
        // console.log(response);
        const json = await response.json();
        // await console.log(json);

        return json.data;
    }

    async savePosition(url = '', place, galaxy) {
        // const data = {};
        // data.level = level;
        // data.type = type;
        let formData = new FormData();
        formData.append("place", place);
        formData.append("galaxy", galaxy);
        const response = await fetch(url, {
            method: 'POST', // *GET, POST, PUT, DELETE, etc.
            mode: 'cors', // no-cors, *cors, same-origin
            cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
            credentials: 'same-origin', // include, *same-origin, omit
            headers: {
            // 'Content-Type': 'application/json'
            // 'Content-Type': 'application/x-www-form-urlencoded',
            },
            redirect: 'follow', // manual, *follow, error
            referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
            // body: JSON.stringify(data) // body data type must match "Content-Type" header
            body: formData
        });
    //   return response.json(); // parses JSON response into native JavaScript objects
        // console.log(response);
        const json = await response.json();
        // await console.log(json);

        return json;
    }

    async getEnergyTravel(url = '', travel) {
        // const data = {};
        // data.level = level;
        // data.type = type;
        let formData = new FormData();
        formData.append("travel", travel);
        const response = await fetch(url, {
            method: 'POST', // *GET, POST, PUT, DELETE, etc.
            mode: 'cors', // no-cors, *cors, same-origin
            cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
            credentials: 'same-origin', // include, *same-origin, omit
            headers: {
            // 'Content-Type': 'application/json'
            // 'Content-Type': 'application/x-www-form-urlencoded',
            },
            redirect: 'follow', // manual, *follow, error
            referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
            // body: JSON.stringify(data) // body data type must match "Content-Type" header
            body: formData
        });
    //   return response.json(); // parses JSON response into native JavaScript objects
        // console.log(response);
        const json = await response.json();
        // await console.log(json);

        return json.data;
    }

    async saveEnergyAfterTravel(url = '', travel) {
        // const data = {};
        // data.level = level;
        // data.type = type;
        let formData = new FormData();
        formData.append("travel", travel);
        const response = await fetch(url, {
            method: 'POST', // *GET, POST, PUT, DELETE, etc.
            mode: 'cors', // no-cors, *cors, same-origin
            cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
            credentials: 'same-origin', // include, *same-origin, omit
            headers: {
            // 'Content-Type': 'application/json'
            // 'Content-Type': 'application/x-www-form-urlencoded',
            },
            redirect: 'follow', // manual, *follow, error
            referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
            // body: JSON.stringify(data) // body data type must match "Content-Type" header
            body: formData
        });
    //   return response.json(); // parses JSON response into native JavaScript objects
        // console.log(response);
        const json = await response.json();
        // await console.log(json);

        return json;
    }

    async getCrystal(url = '', planet, galaxy) {
        // const data = {};
        // data.level = level;
        // data.type = type;
        // console.log(planet);
        let formData = new FormData();
        formData.append("planet", planet);
        formData.append("galaxy", galaxy);
        const response = await fetch(url, {
            method: 'POST', // *GET, POST, PUT, DELETE, etc.
            mode: 'cors', // no-cors, *cors, same-origin
            cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
            credentials: 'same-origin', // include, *same-origin, omit
            headers: {
            // 'Content-Type': 'application/json'
            // 'Content-Type': 'application/x-www-form-urlencoded',
            },
            redirect: 'follow', // manual, *follow, error
            referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
            // body: JSON.stringify(data) // body data type must match "Content-Type" header
            body: formData
        });
    //   return response.json(); // parses JSON response into native JavaScript objects
        // console.log(response);
        const json = await response.json();
        // await console.log(json);

        return json.data;
    }

        async getInfosPlanet(url = '', planet, galaxy, type) {
        // const data = {};
        // data.level = level;
        // data.type = type;
        // console.log(planet);
        let formData = new FormData();
        formData.append("planet", planet);
        formData.append("type", type);
        formData.append("galaxy", galaxy);
        const response = await fetch(url, {
            method: 'POST', // *GET, POST, PUT, DELETE, etc.
            mode: 'cors', // no-cors, *cors, same-origin
            cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
            credentials: 'same-origin', // include, *same-origin, omit
            headers: {
            // 'Content-Type': 'application/json'
            // 'Content-Type': 'application/x-www-form-urlencoded',
            },
            redirect: 'follow', // manual, *follow, error
            referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
            // body: JSON.stringify(data) // body data type must match "Content-Type" header
            body: formData
        });
    //   return response.json(); // parses JSON response into native JavaScript objects
        // console.log(response);
        const json = await response.json();
        // await console.log(json);

        return json.data;
    }

    async getLevelsPlanet(url = '', planet, galaxy) {
        // const data = {};
        // data.level = level;
        // data.type = type;
        // console.log(planet);
        let formData = new FormData();
        formData.append("planet", planet);
        formData.append("galaxy", galaxy);
        const response = await fetch(url, {
            method: 'POST', // *GET, POST, PUT, DELETE, etc.
            mode: 'cors', // no-cors, *cors, same-origin
            cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
            credentials: 'same-origin', // include, *same-origin, omit
            headers: {
            // 'Content-Type': 'application/json'
            // 'Content-Type': 'application/x-www-form-urlencoded',
            },
            redirect: 'follow', // manual, *follow, error
            referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
            // body: JSON.stringify(data) // body data type must match "Content-Type" header
            body: formData
        });
    //   return response.json(); // parses JSON response into native JavaScript objects
        // console.log(response);
        const json = await response.json();
        // await console.log(json);

        return json.data;
    }

    async takeCrystal(url = '', place, galaxy) {
        // const data = {};
        // data.level = level;
        // data.type = type;
        // console.log('test');
        let formData = new FormData();
        formData.append("place", place);
        formData.append("galaxy", galaxy);
        const response = await fetch(url, {
            method: 'POST', // *GET, POST, PUT, DELETE, etc.
            mode: 'cors', // no-cors, *cors, same-origin
            cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
            credentials: 'same-origin', // include, *same-origin, omit
            headers: {
            // 'Content-Type': 'application/json'
            // 'Content-Type': 'application/x-www-form-urlencoded',
            },
            redirect: 'follow', // manual, *follow, error
            referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
            // body: JSON.stringify(data) // body data type must match "Content-Type" header
            body: formData
        });
    //   return response.json(); // parses JSON response into native JavaScript objects
        // console.log(await response.json());
        const json = await response.json();
        // await console.log(json);

        return json;
    }

    async getGalaxyInfos(url = '', galaxy) {
        // const data = {};
        // data.level = level;
        // data.type = type;
        // console.log('test');
        let formData = new FormData();
        formData.append("galaxy", galaxy);
        const response = await fetch(url, {
            method: 'POST', // *GET, POST, PUT, DELETE, etc.
            mode: 'cors', // no-cors, *cors, same-origin
            cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
            credentials: 'same-origin', // include, *same-origin, omit
            headers: {
            // 'Content-Type': 'application/json'
            // 'Content-Type': 'application/x-www-form-urlencoded',
            },
            redirect: 'follow', // manual, *follow, error
            referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
            // body: JSON.stringify(data) // body data type must match "Content-Type" header
            body: formData
        });
    //   return response.json(); // parses JSON response into native JavaScript objects
        // console.log(await response.json());
        const json = await response.json();
        // await console.log(json);

        return json.data;
    }

    async discardCrystal(url = ''/*, data = {}*/) {
  // Default options are marked with *
        const response = await fetch(url, {
            method: 'GET', // *GET, POST, PUT, DELETE, etc.
            mode: 'cors', // no-cors, *cors, same-origin
            cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
            credentials: 'same-origin', // include, *same-origin, omit
            headers: {
            'Content-Type': 'application/json'
            // 'Content-Type': 'application/x-www-form-urlencoded',
            },
            redirect: 'follow', // manual, *follow, error
            referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
            // body: JSON.stringify(data) // body data type must match "Content-Type" header
        });
    //   return response.json(); // parses JSON response into native JavaScript objects
        // console.log(response);
        const json = await response.json();

        return Promise.resolve(json.data);
    }
}

export const apiRef = new ApiRef();