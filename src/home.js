export default class Home{
    constructor() {
        this.home = document.querySelector('#Home');

    }
    setModalListener(openModal) {
        this.openModal = openModal;
    }

    callback(event) {
        const data = event.target.dataset;
        const title = data.title;;
        const rating = data.rating;
        const genres = data.genres;
        const description = data.description;
        const image = data.image;
        const video = data.video;
        this.openModal && this.openModal(title, rating, genres, description, image, video);
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
                    data-rating=${topMovie.rating}
                    data-year=${topMovie.year}
                    data-genres=${topMovie.genres.map(genre => genre)}
                    data-description="${topMovie.summary}"
                    data-image="${topMovie.medium_cover_image}"
                    data-video="${topMovie.yt_trailer_code}"><i class="fas fa-info-circle"></i>More Info</button>
                </div>
            </div>
            
            `
    }
    setListener() {
        //hide modal
        const homeModal = document.querySelector('.infoBtn');
        homeModal.addEventListener('click', (event)=>this.callback(event));
    }
}