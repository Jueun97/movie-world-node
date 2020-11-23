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
            <h2 class="home__movie-description">${item.summary}</h2>
            <div class="home__buttons">
                <button class="home__button playBtn" value="${item.yt_trailer_code}"><i class="fas fa-play"></i>Play</button>
                <button class="home__button infoBtn"
                data-title="${item.title_long}"
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
function displayModal() {
    const modal = document.querySelector('.modal');
    modal.innerHTML = 
        `
        <i class="fas fa-times modal__cancle"></i>
        <img src="" alt="movie poster" width="100%" height="63%">
        <div class="modal__movie">
            <h1 class="modal__movie-title"></h1>
            <div class="modal__clicks">
                <button class="modal__button playBtn"><i class="fas fa-play"></i>Play</button>
                <div class="modal__icons">
                    <i class="fas fa-plus modal__icon"></i>
                    <i class="far fa-thumbs-up modal__icon"></i>
                    <i class="far fa-thumbs-down modal__icon"></i>
                </div>
            </div>
            <div class="modal__movie-info">
                <div>
                    <span class="movie-info-rating"></span>
                    <span class="movie-info-genres"></span>
                </div>
                <h2 class="movie-info-description"></h2>
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
                    <span class="movie-rating">${item.rating}★</span>
                    <span class="movie-year">${item.year}</span>
                </div>
                <span class="movie-genres">${item.genres.map(genre => genre)}</span>
                <!-- more info -->
                <i class="fas fa-chevron-down movie-icon"
                data-title="${item.title_long}"
                data-rating=${item.rating}
                data-year=${item.year}
                data-genres=${item.genres.map(genre => genre)}
                data-description="${item.summary}"
                data-image="${item.medium_cover_image}"
                data-video="${item.yt_trailer_code}"></i>
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
    if (requiredGenre == "Popular") 
        movieList = items;
    else if (requiredGenre == "Watching") {
        movieList = items;
        movieList.reverse();
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
    const moreInfoBtn = document.querySelector('.infoBtn');
    moreInfoBtn.addEventListener('click', (event) => {
        console.log('hihihihii');
        const data = event.target.dataset;
        const title = data.title;;
        const rating = data.rating;
        const genres = data.genres;
        const description = data.description;
        const image = data.image;
        openModal(title,rating, genres, description, image);
    });

    //show up modal when 'movie icon' in movie poster is clicked
    const movies = document.querySelectorAll('.movie-icon');
    movies.forEach(movie => {
        movie.addEventListener('click', (event) => {
            const data = event.target.dataset;
            const title = data.title;
            const rating = data.rating;
            const genres = data.genres;
            const description = data.description;
            const image = data.image;
            const video = data.video;
            console.log(title);
            openModal(title, rating, genres, description, image, video);
          
            
        });
    })

     //hide modal when 'x' button in modal is clicked
     const cancleBtn = document.querySelector('.modal__cancle');
     console.log(">",cancleBtn);
     cancleBtn.addEventListener('click', (e) => {
         console.log('cancle');
         closeModal();
     });
    
    // show up modal function
    const modal = document.querySelector('.modal');
    const modalButton = document.querySelector('.modal__button');
    const container = document.querySelector('.bodyContainer');
    function openModal(title, rating, genres, description, image,video) {
        const Rating = document.querySelector('.movie-info-rating');
        const Title = document.querySelector('.modal__movie-title');
        const Genres = document.querySelector('.movie-info-genres');
        const Description = document.querySelector('.movie-info-description');

        console.log('genres', Genres);
        Title.innerHTML = title;
        Genres.innerHTML = genres;
        Rating.innerHTML = `${rating}★`;
        Description.innerHTML = description;
        modal.childNodes[3].src = image;
        modalButton.value = video;
        Image = image;

        modal.style.display = 'block'; 
        container.classList.add('invisible');
        container.parentElement.style.overflow = 'hidden';
    };
    
    // hide modal function
    function closeModal() {
        modal.style.display = 'none';
        container.classList.remove('invisible');
        container.parentElement.style.overflow = 'initial';
    };
    
    //scroll action
    const scrollBtnRight = document.querySelectorAll('.movies__button-right');
    const scrollBtnLeft = document.querySelectorAll('.movies__button-left');
    const moviesContainer = document.querySelectorAll('.movies__list');
    const movie = document.querySelector('.movie');
    console.log(movie.clientWidth);
    const windowWidth = window.outerWidth;
    // intialize count variable 
    let count = [];
    for (let i = 0; i < scrollBtnLeft.length; i++){
        count[i] = 0;
    }

    function removeArrow(width) {
        moviesContainer.forEach(movieContainer => {
            if (movieContainer.scrollWidth < width) {
                console.log("hi",movieContainer.scrollWidth, width);
                movieContainer.parentElement.childNodes[5].childNodes[1].classList.add('invisible');
            }
    
        });
    };
    //removeArrow(windowWidth);
    moviesContainer.forEach(movieContainer => {
        console.log("hi",movieContainer.scrollWidth, windowWidth);
            if (movieContainer.scrollWidth < windowWidth) {
                
                movieContainer.parentElement.childNodes[5].childNodes[1].classList.add('invisible');
            }
    
        });
    // 영화의 개수가 화면보다 더 적을 때 스크롤 화살표 제거
    window.addEventListener('resize', (event) => {
        const windowSize = event.target.window.outerWidth;
        console.log("widnowsize", windowSize);
        moviesContainer.forEach(movieContainer => {
            console.log("hi",movieContainer.scrollWidth, windowSize);
                if (movieContainer.scrollWidth < windowSize) 
                    movieContainer.parentElement.childNodes[5].childNodes[1].classList.add('invisible');
                else
                movieContainer.parentElement.childNodes[5].childNodes[1].classList.remove('invisible');
        
            });
    })
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
           /*  if (scrollWidth % (listWidth * count[index]) < listWidth) {
                listWidth = scrollWidth; 
            } */
            moviesContainer[index].scrollBy(movie.clientWidth*2,0);
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
            moviesContainer[index].scrollBy(-movie.clientWidth*2.3,0);
            if (count[index] <= 0) {
                count[index] = 0;
                buttonLeft.classList.remove('visible');
            }
        })
    });
    const playBtn = document.querySelectorAll('.playBtn');
    playBtn.forEach(button => {
        button.addEventListener('click', (event) => {
            const VIDEO_ID = event.target.value;
            window.location.href = `./video.html?id=${VIDEO_ID}`;
        })
    })
    
};

loadData()
    .then(items => {
        topMovie(items),
            displayModal(),
            classifyMovies(items, "Romance"),
            classifyMovies(items, "Popular"),
            classifyMovies(items, "Drama"),
            classifyMovies(items, "Comedy"),
            classifyMovies(items,"Watching");
    })
    .then(() => eventFunction());

        