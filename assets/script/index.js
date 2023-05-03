'use strict';

const moviesJSON = './assets/script/movies.json';
const citiesJSON = './assets/script/cities.json';

const options = {
    method: 'GET',
    headers: {'Content-Type': 'application/json; charset=UTF-8'},
    mode: 'cors'
}

async function getCities() {
    try {
        const response = await fetch(moviesJSON, options);

        if (!response.ok) {
            throw new Error(`${response.statusText} (${response.status})`)
        }

        const data = await response.json();
        console.log(data.movies[0].poster);
    } catch (error) {
        console.log(error.message);
    }
};

getCities();