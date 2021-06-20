'use strict';
export default class Home{
    constructor() {
        this.home = document.querySelector('#Home');
    }
    setModalListener(openModal) {
        this.openModal = openModal;
    }
    setItem(items) {
        this.items = items;
    }
    // pick a top movie and get a top movie info
    topMovie() {
        let topMovie = [];
        topMovie.rating = 0;
        for (let i = 0; i < this.items.length; i++)
            if (topMovie.rating < this.items[i].rating)
                topMovie = this.items[i];
        this.displayTopmovie(topMovie);
    }

    displayTopmovie(topMovie) {
        this.home.innerHTML = 
            `
            <img src=${topMovie.large_cover_image} class="home__image" alt="movie poster">
            <div class="home__movie">
                <h1 class="home__movie-title">${topMovie.title}</h1>
                <h2 class="home__movie-description">${topMovie.summary}</h2>
                <div class="home__buttons">
                    <button class="home__button playBtn" value="${topMovie.yt_trailer_code}"><i class="fas fa-play"></i>Play</button>
                    <button class="home__button infoBtn"
                    data-title="${topMovie.title_long}"
                    data-year="${topMovie.year}"
                    data-rating=${topMovie.rating}
                    data-year=${topMovie.year}
                    data-genres=${topMovie.genres && topMovie.genres.map(genre => genre)}
                    data-description="${topMovie.summary}"
                    data-image="${topMovie.medium_cover_image}"
                    data-video="${topMovie.yt_trailer_code}"><i class="fas fa-info-circle"></i>More Info</button>
                </div>
            </div>
            `
    }
    openHomeModal() {
        const homeModal = document.querySelector('.infoBtn');
        homeModal.addEventListener('click', (event) => {
            const data = event.target.dataset;
            const title = data.title;
            const year = data.year;
            const rating = data.rating;
            const genres = data.genres;
            const description = data.description;
            const image = data.image;
            const video = data.video;
            this.openModal && this.openModal(title, year,rating, genres, description, image, video);
        });
    }
    playVideo() {
        const home = document.querySelector('.home__movie');
        home.addEventListener('click', (event) => {
            const target = event.target;
            if (target.matches('.playBtn')) {
                let VIDEO_ID = target.value;
                if (VIDEO_ID === '')
                    VIDEO_ID = undefined
                window.location.href = `./video?id=${VIDEO_ID}`;
            }
        });
    }
}