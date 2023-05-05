'use strict';

/*--------------------- Declaring Elements ---------------------*/
const moviesBar = document.querySelector('#movies');
const citiesBar = document.querySelector('#cities');
const moviesGrid = document.querySelector('.movies-grid');

const moviesResults = document.querySelector('.movies-results');
const citiesResults = document.querySelector('.cities-results');

/*----------------------- Main Functions -----------------------*/
const moviesJSON = './assets/script/movies.json';
const citiesJSON = './assets/script/cities.json';
const options = {
    method: 'GET',
    headers: {'Content-Type': 'application/json; charset=UTF-8'},
    mode: 'cors'
}

// Get movie data
async function getMovies() {
    try {
        const response = await fetch(moviesJSON, options);
        if (!response.ok) {
            throw new Error(`${response.statusText} (${response.status})`)
        }
        const data = await response.json();
        for (let i = 0; i < data.movies.length; i++) {
            let posterImg = data.movies[i].poster;
            let movieName = `${data.movies[i].title}`;
            generatePosters(posterImg, movieName);
        }
    } catch (error) {
        console.log(error.message);
    }
};

getMovies();

// Poster Div Generator
function generatePosters(pic, name) {
    const newDiv = document.createElement('div');
    newDiv.classList.add('poster');
    newDiv.innerHTML = `<img src="${pic}"><p>${name}</p>`;
    moviesGrid.appendChild(newDiv);
}

// Search bars autofill
moviesBar.addEventListener('input', async () => {
    if (moviesBar.value.length > 1) {
        const inputValue = moviesBar.value.toLowerCase();

        moviesResults.innerHTML = '';

        const response = await fetch(moviesJSON, options);
        if (!response.ok) {
            throw new Error(`${response.statusText} (${response.status})`)
        }
        const data = await response.json();
        const movieTitles = [];
        for (let i = 0; i < data.movies.length; i++) {
            let movieName = data.movies[i].title;
            movieTitles.push(movieName);
        }
        
        const filteredMovies = movieTitles.filter(movie => {
            return movie.toLowerCase().includes(inputValue);
        })

        if (filteredMovies.length > 0) {
            filteredMovies.forEach(movie => {
                const newResult = document.createElement('a');
                newResult.href = '#';
                newResult.textContent = movie;
                newResult.addEventListener('click', () => {
                    moviesBar.value = newResult.textContent;
                    moviesResults.innerHTML = '';
                })
                moviesResults.appendChild(newResult);
            })
        } else {
            const defaultResult = document.createElement('a');
            defaultResult.href = '#';
            defaultResult.textContent = 'Movie not found';
            moviesResults.appendChild(defaultResult);
        }
    } else {
        moviesResults.innerHTML = '';
    }
});

citiesBar.addEventListener('input', async () => {
    if (citiesBar.value.length > 1) {
        const inputValue = citiesBar.value.toLowerCase();

        citiesResults.innerHTML = '';

        const response = await fetch(citiesJSON, options);
        if (!response.ok) {
            throw new Error(`${response.statusText} (${response.status})`)
        }
        const data = await response.json();
        const cityNames = [];
        for (let i = 0; i < data.cities.length; i++) {
            let cityName = data.cities[i].name;
            cityNames.push(cityName);
        }

        const filteredCities = cityNames.filter(city => {
            return city.toLowerCase().includes(inputValue);
        })

        if (filteredCities.length > 0) {
            filteredCities.forEach(city => {
                const newResult = document.createElement('a');
                newResult.href = '#';
                newResult.textContent = city;
                newResult.addEventListener('click', () => {
                    citiesBar.value = newResult.textContent;
                    citiesResults.innerHTML = '';
                })
                citiesResults.appendChild(newResult);
            })
        } else {
            const defaultResult = document.createElement('a');
            defaultResult.href = '#';
            defaultResult.textContent = 'City not found';
            citiesResults.appendChild(defaultResult);
        }
    } else {
        citiesResults.innerHTML = '';
    }
});

