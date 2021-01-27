'use strict';

import Home from './src/home.js';
import Modal from './src/modal.js';
import Movies from './src/movies.js';
import Search from './src/search.js';
import navbarEvent from './src/navbar.js';
import scrollEvent from './src/scroll.js';

// fetch data from API
function loadData() {
    return  fetch('https://yts.mx/api/v2/list_movies.json').then(response => response.json()).then(json => json.data.movies);
};
const genres = ["Romance", "Popular", "Drama", "Comedy", "Watching"];
const movies = new Movies();
const modal = new Modal();
const home = new Home();
const search = new Search();

home.setModalListener((title, rating, genres, description, image, video) => {
    modal.openModal(title, rating, genres, description, image, video);
});
movies.setModalListener((title, rating, genres, description, image, video) => {
    modal.openModal(title, rating, genres, description, image, video);
});
search.setLoadListner1((items) => {
    home.setItem(items),
    home.topMovie(),
    movies.setItem(items),
    movies.classifyMovies(genres)
}) 
search.setLoadListner2(() => {
    modal.setListener(),
    home.setListener(),
    scrollEvent(),
    otherEventFunction();
}) 
search.setDisplayListner((data) => {
    movies.displayMovies(data, "Search");
})
loadData()
    .then(items => {
        home.setItem(items)
        home.topMovie(),
        movies.setItem(items),
        modal.displayModal(),
        movies.classifyMovies(genres);
        search.searchMovie(items),
        replaceUnloadedImage()
    })
    .then(() => {
        modal.setListener(),
        home.setListener(),
        otherEventFunction(),
        scrollEvent(),
        navbarEvent()
    });

// replace unloaded image 
function replaceUnloadedImage() {
    let imgs = document.querySelectorAll('.movie-image');
    imgs.forEach(img => {
        img.onerror = function () {
            img.src = "images/unloaded.jpg";
        }
    })
}
function otherEventFunction() {
    const modal = document.querySelector('.modal');
    const home = document.querySelector('.home__movie');
    //move to playing page and play a video when 'play' button is clicked
    modal.addEventListener('click', (event)=>onClickPlayButton(event));
    home.addEventListener('click', (event)=>onClickPlayButton(event));
    
    function onClickPlayButton(event) {
        const target = event.target;
        if (target.matches('.playBtn')) {
            const VIDEO_ID = target.value;
            window.location.href = `./video.html?id=${VIDEO_ID}`;
        }
    }
    
}
