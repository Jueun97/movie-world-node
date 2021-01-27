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
    modal.onClickHideModal(),
        modal.playVideo(),
        home.openHomeModal(),
        home.playVideo(),
        scrollEvent()
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
        modal.onClickHideModal(),
        modal.playVideo(),
        home.openHomeModal(),
        home.playVideo()
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