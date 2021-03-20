'use strict';
import Home from '/src/home.js';
import Modal from '/src/modal.js';
import Movies from '/src/movies.js';
import Search from '/src/search.js';
import navbarEvent from '/src/navbar.js';
import scrollEvent from '/src/scroll.js';

const genres = ["Romance", "Popular", "Drama", "Comedy", "Watching"];
const movies = new Movies();
const modal = new Modal();
const home = new Home();
const search = new Search();

// fetch data from API
function loadData() {
    return  fetch('https://yts.mx/api/v2/list_movies.json').then(response => response.json()).then(json => json.data.movies);
};

function loadUserMovies() {
    return fetch('http://localhost:3000/userMovies').then(response => response.json()).then(json => json.data[0].user1);
}

const urlParams = window.location.href;
if (urlParams.includes('myPage')) {
    const navMainIcons = document.querySelector('.nav-main-icons');
    const navMyPageIcons = document.querySelector('.nav-myPage-icons');
    navMainIcons.style.display = 'none';
    navMyPageIcons.style.display = 'block';
    console.log("hihi", navMyPageIcons.style);

    loadUserMovies().then(items => {
        console.log(items);
    })
}
else {
    loadData()
        .then(items => {
            loadCallbackCompilation1(items);
        })
        .then(() => {
            loadCallbackCompilation2();
        });
}

home.setModalListener((title, rating, genres, description, image, video) => {
    modal.openModal(title, rating, genres, description, image, video);
});
movies.setModalListener((title, rating, genres, description, image, video) => {
    modal.openModal(title, rating, genres, description, image, video);
});

search.setLoadListner1((items) => {
    home.setItem(items);
    home.topMovie();
    movies.setItem(items);
    modal.displayModal();
    movies.classifyMovies(genres);
}) 
search.setLoadListner2(() => {
    loadCallbackCompilation2();
}) 
search.setDisplayListner((data) => {
    movies.displayMovies(data, "Search");
})

// replace unloaded image 
function replaceUnloadedImage() {
    let imgs = document.querySelectorAll('.movie-image');
    imgs.forEach(img => {
        img.onerror = function () {
            img.src = "images/unloaded.jpg";
        }
    })
}

function loadCallbackCompilation1(items) {
    home.setItem(items);
    home.topMovie();
    movies.setItem(items);
    modal.displayModal();
    movies.classifyMovies(genres);
    search.searchMovie(items);
    replaceUnloadedImage();
}
function loadCallbackCompilation2() {
    modal.onClickHideModal();
    modal.playVideo();
    home.openHomeModal();
    home.playVideo();
    scrollEvent();
    navbarEvent();
}
