'use strict';
// fetch data from API
function loadData() {
    return fetch('https://yts.mx/api/v2/list_movies.json').then(response => response.json()).then(json => json.data.movies);
};
// display movies in the list screen
function displayMovies(items,genre) {
    const id = genre;
    const category = document.querySelector(`#${id}`).querySelector('.movies__list');
    category.innerHTML = items.map(item => createList(item,category));
};
// display top movie in home screen
function displayTopmovie(item) {
    const home = document.querySelector('#Home');
    home.innerHTML = 
        `
        <img src=${item.large_cover_image} class="home__image" alt="movie poster">
        <div class="home__movie">
            <h1 class="home__movie-title">${item.title}</h1>
            <h2 class="home__movie-description">,,,</h2>
            <div class="home__buttons">
                <button class="home__button playBtn"><i class="fas fa-play"></i>Play</button>
                <button class="home__button infoBtn"
                data-title="${item.title}"
                data-rating=${item.rating}
                data-year=${item.year}
                data-genres=${item.genres.map(genre => genre)}
                data-description="${item.summary}"
                data-image="${item.medium_cover_image}"><i class="fas fa-info-circle"></i>More Info</button>
            </div>
        </div>
        `
};
// displayModal in modal screen
function displayModal(title, year, rating, genres, description,image) {
    const modal = document.querySelector('.modal');
    modal.innerHTML = 
        `
        <i class="fas fa-times modal__cancle"></i>
        <img src="${image}" alt="movie poster" width="100%" height="63%">
        <div class="modal__movie">
            <h1 class="modal__movie-title">${title}</h1>
            <div class="modal__buttons">
                <button class="modal__button btn1"><i class="fas fa-play"></i>Play</button>
                <i class="fas fa-plus modal__icon"></i>
                <i class="far fa-thumbs-up modal__icon"></i>
                <i class="far fa-thumbs-down modal__icon"></i>
            </div>
            <div class="modal__movie-info">
                <div>
                    <span class="movie-info-rating"${rating}</span>
                    <span class="movie-info-year">${year}</span>
                </div>
                <span class="movie-info-genres">${genres}</span>
                <h2 class="home__movie-description">${description}</h2>
            </div>
        </div>
        `;
}
// create list for html
function createList(item) {
    return `
    <div class='movie'>
        <img src=${item.medium_cover_image} alt=${item.title}>
        <div class="movie__info">
            <div class="movie__info__summary">
                <span class="movie-title">${item.title}</span>
                <div>
                    <span class="movie-rating">${item.rating}</span>
                    <span class="movie-year">${item.year}</span>
                </div>
                <span class="movie-genres">${item.genres.map(genre => genre)}</span>
                <!-- more info -->
                <i class="fas fa-chevron-down movie-icon"
                data-title="${item.title}"
                data-rating=${item.rating}
                data-year=${item.year}
                data-genres=${item.genres.map(genre => genre)}
                data-description="${item.summary}"
                data-image="${item.medium_cover_image}"></i>
            </div>
            <div class="movie__info__details">
                <!-- 여기에 이미지 추가 -->
                <div class="info__icons">
                    <i class="fas fa-plus"></i>
                    <i class="fas fa-play"></i>
                    <i class="far fa-thumbs-up"></i>
                    <i class="far fa-thumbs-down"></i>
                </div>
                <div class="info__descriptions">
                    <div class="descriptions__left">
                        <span class="movie-title">${item.title}</span>
                        <span class="movie-year">${item.year}</span>
                        <span class="movie-runtime">${item.runtime}</span>
                        <p class="movie-description"></p>  
                    </div>
                    <div class="descriptions__right">
                        <span class="movie-rating">${item.rating}</span>
                        <span class="movie-genres">${item.genres.map(genre => genre)}</span>
                    </div>
                </div>
            </div>
        </div> 
    </div>
    `
};
// classify movies for genres
function classifyMovies(items, requiredGenre) {
    let movieList = [];
    if (requiredGenre == "Popular") {
        movieList = items;
        console.log('hihih', movieList);
    }
    else {
        items.forEach(item => {
            if (item.genres.map(genre => {
                if (genre == requiredGenre)
                    movieList.push(item);
            }));
        
        });
    };
    displayMovies(movieList,requiredGenre);
};
// pick a top movie and get a top movie info
function topMovie(items) {
    let maxItem = [];
    maxItem.rating = 0;
    for (let i = 0; i < items.length; i++)
        if (maxItem.rating < items[i].rating)
            maxItem = items[i];
    
    displayTopmovie(maxItem);
};
// gather all the events for the page
function eventFunction() {
    //change navbar backgroundColor when scrolling down
    window.addEventListener('scroll', () => {
        const scrollHeight = window.scrollY;
        const navbar = document.querySelector('#navbar');
    
        if (scrollHeight > 0)
            navbar.classList.add('active');
        else
            navbar.classList.remove('active');
    });
    
    const menu = document.querySelector('.navbar__menu');
    menu.addEventListener('click', (event) => {
        const item = event.target.dataset.item;
        const element = document.querySelector(`#${item}`);
        if (item != null) {
            element.scrollIntoView({ behavior: 'smooth', block: "center" });
        }
        
    })
    
    const navbarBtn = document.querySelector('.navbar__menu-button');
    navbarBtn.addEventListener('click', () => {
        menu.classList.toggle('visible');
        
    })
    //show up modal when 'more info' button is clicked
    const moreInfoBtn = document.querySelector('#Home');
    console.log(moreInfoBtn);
    moreInfoBtn.addEventListener('click', (event) => {
        const data = event.target.dataset;
        const title = data.title;
        const year = data.year;
        const rating = data.rating;
        const genres = data.genres;
        const description = data.description;
        const image = data.image;
        displayModal(title, year, rating, genres, description, image);
        openModal();
    });
    
    //hide modal when 'x' button in modal is clicked
    const cancleBtn = document.querySelector('.modal__cancle');
    console.log(cancleBtn);
    cancleBtn.addEventListener('click', (e) => {
        closeModal();
    });
    
    //show up modal when 'movie icon' in movie poster is clicked
    const movies = document.querySelectorAll('.movie-icon');
    movies.forEach(movie => {
        movie.addEventListener('click', (event) => {
            const data = event.target.dataset;
            const title = data.title;
            const year = data.year;
            const rating = data.rating;
            const genres = data.genres;
            const description = data.description;
            const image = data.image;
            displayModal(title, year, rating, genres, description, image);
            openModal();
        });
    })
    // show up modal
    const modal = document.querySelector('.modal');
    const container = document.querySelector('.bodyContainer');
    function openModal() {
        modal.style.display = 'block'; 
        container.classList.add('invisible');
        container.parentElement.style.overflow = 'hidden';
    };
    
    // hide modal
    function closeModal() {
        modal.style.display = 'none';
        container.classList.remove('invisible');
        container.parentElement.style.overflow = 'initial';
    };
    
    //scroll action
    const scrollBtnRight = document.querySelectorAll('.movies__button-right');
    const scrollBtnLeft = document.querySelectorAll('.movies__button-left');
    const moviesContainer = document.querySelectorAll('.movies__list');
    const windowWidth = window.outerWidth;
    // intialize count variable 
    let count = [];
    for (let i = 0; i < scrollBtnLeft.length; i++){
        count[i] = 0;
    }
    //scroll to rignt when right arrow is clicked
    scrollBtnRight.forEach(buttonRight => {
        buttonRight.addEventListener('click', (event) => {
            const index = event.target.parentElement.parentElement.dataset.index;
            const scrollWidth = moviesContainer[index].scrollWidth;
            let listWidth = moviesContainer[index].clientWidth;
            count[index]++;
            if (count[index] == parseInt(scrollWidth / windowWidth)) {
                count[index] == parseInt(scrollWidth / windowWidth);
                buttonRight.classList.add('invisible');
            }
            console.log(windowWidth, listWidth, scrollWidth);
           /*  if (scrollWidth % (listWidth * count[index]) < listWidth) {
                listWidth = scrollWidth; 
            } */
            moviesContainer[index].scrollBy(listWidth,0);
            scrollBtnLeft[index].classList.add('visible');
        })
    });
    
    //scroll to left when left arrow is clicked
    scrollBtnLeft.forEach(buttonLeft => {
        buttonLeft.addEventListener('click', (event) => {
            const index = event.target.parentElement.parentElement.dataset.index;
            let listWidth = moviesContainer[index].clientWidth;
            const scrollWidth = moviesContainer[index].scrollWidth;
            count[index]--;
            scrollBtnRight[index].classList.remove('invisible');
            /* if (scrollWidth % (listWidth * count[index]) > listWidth) {
                listWidth = scrollWidth % (listWidth * count[index]);
                moviesContainer[index].scrollTo(0,0);
            } 
            else */
            moviesContainer[index].scrollBy(-listWidth,0);
            if (count[index] <= 0) {
                count[index] = 0;
                buttonLeft.classList.remove('visible');
            }
        })
    });
    
};

loadData()
    .then(items => {
        topMovie(items),
            classifyMovies(items, "Romance"),
            classifyMovies(items, "Popular"),
            classifyMovies(items, "Drama"),
            classifyMovies(items, "Comedy"),
            displayModal()
    })
    .then(() => eventFunction());

        