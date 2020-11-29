'use strict';

// fetch data from API
function loadData() {
   return fetch('https://yts.mx/api/v2/list_movies.json').then(response => response.json()).then(json => json.data.movies);
};
// replace unloaded image 
function replaceUnloadedImage() {
    let imgs = document.querySelectorAll('.movie-image');
    imgs.forEach(img => {
        img.onerror = function () {
            img.src = "images/logoSimple.png";
            console.log('error!!',img.src);  
        }
    })
}
// display movies in the list screen
function displayMovies(items, genre) {
    const id = genre;
    const category = document.querySelector(`#${id}`).querySelector('.movies__list');
    // --->>> map 리턴 시 , 를 기본적으로 출력(join(',') -> join함수를 사용하여 , 제거
    category.innerHTML = items.map(item => createList(item)).join(''); 
    
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
        <img src=${item.medium_cover_image} alt=${item.title} class="movie-image">
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
    
    // move to the secition clicked in the menu bar
    const menu = document.querySelector('.navbar__menu');
    menu.addEventListener('click', (event) => {
        const item = event.target.dataset.item;
        const element = document.querySelector(`#${item}`);
        if (item != null) {
            element.scrollIntoView({ behavior: 'smooth', block: "center" });
        }
        
    })
    
    // show hidden menu list (when the window size is small)
    const navbarBtn = document.querySelector('.navbar__menu-button');
    navbarBtn.addEventListener('click', () => {
        menu.classList.toggle('visible');
    })
    
    // show up modal function - show up modal when button is clicked
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
        // handle background when modal is shown up
        container.classList.add('invisible');
        container.parentElement.style.overflow = 'hidden';
    };
    
    // hide modal function - hide modal when 'x' button in modal is clicked
    function closeModal() {
        modal.style.display = 'none';
        container.classList.remove('invisible');
        container.parentElement.style.overflow = 'initial';
    };

    //show up modal when 'more info' button from 'Home' section is clicked
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

    //show up modal when 'movie icon' button in a movie poster from 'movieList' section is clicked
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

     //hide modal
     const cancleBtn = document.querySelector('.modal__cancle');
     console.log(">",cancleBtn);
     cancleBtn.addEventListener('click', (e) => {
         console.log('cancle');
         closeModal();
     });
    
    //scroll action
    const scrollBtnRight = document.querySelectorAll('.movies__button-right');
    const scrollBtnLeft = document.querySelectorAll('.movies__button-left');
    const moviesContainer = document.querySelectorAll('.movies__list');
    const movie = document.querySelector('.movie');
    const windowWidth = window.outerWidth;

    // intialize count Array variable 
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
            console.log(">>>>>>>", scrollWidth - movie.clientWidth * 2 * count[index]);
            console.log("scroll",scrollWidth,"window",windowWidth,"movie",movie.clientWidth,"count",count[index],scrollWidth / (movie.clientWidth*2))
            if (count[index] == parseInt(scrollWidth / (movie.clientWidth*2) -1)) {
                count[index] == parseInt(scrollWidth / windowWidth);
                console.log('hellow');
                
                buttonRight.classList.add('invisible');
            }
        
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
            console.log(count[index]);
            moviesContainer[index].scrollBy(-movie.clientWidth*2,0);
            if (count[index] <= 0) {
                count[index] = 0;
                moviesContainer[index].scrollTo(0,0);
                buttonLeft.classList.remove('visible');
            }
        })
    });
      // remove arrow Function - remove each arrow when the list of movies is shorter than the window width
      function removeArrow(width) {
        moviesContainer.forEach(movieContainer => {
            if (movieContainer.scrollWidth < width) {
                console.log(">", movieContainer.parentElement.childNodes[1].childNodes[1]);
                movieContainer.parentElement.childNodes[1].childNodes[1].classList.remove('visible');
                movieContainer.parentElement.childNodes[5].childNodes[1].classList.add('invisible');
            }
            else
                movieContainer.parentElement.childNodes[5].childNodes[1].classList.remove('invisible');
    
        });
    };
    //remove Arrow initially
    removeArrow(windowWidth);

    // when window is resized
    window.addEventListener('resize', (event) => {
        const windowSize = event.target.window.outerWidth;
        // move scroll to right position when the movie image size changes (dynamically)
        moviesContainer.forEach(container => {
            let index = container.parentElement.dataset.index;
            console.log(container.parentElement.dataset.index, count[container.parentElement.dataset.index]);
            container.scrollTo(movie.clientWidth * 2 * count[index],0);
           
        })
        // remove Arrow according to the window width (dynamically)
        removeArrow(windowSize);
    })

    //move to playing page and play a video when 'play' button is clicked
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
        console.log("2");
        topMovie(items),
            displayModal(),
            classifyMovies(items, "Romance"),
            classifyMovies(items, "Popular"),
            classifyMovies(items, "Drama"),
            classifyMovies(items, "Comedy"),
            classifyMovies(items, "Watching"),
        replaceUnloadedImage()
    })
    .then(() => eventFunction());


        