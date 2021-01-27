'use strict';
let count = [];
export default function scrollEvent() {
    const movies = document.querySelector('.moviesList');
    //scroll to rignt /left when right / left arrow is clicked
    movies.addEventListener('click', arrowClickEvent)
    //scroll action
    const scrollBtnLeft = document.querySelectorAll('.movies__button-left');
    const windowWidth = window.outerWidth;

    window.addEventListener('resize', repositionMovieList);

    //remove Arrow initially
    removeArrow(windowWidth);

    // intialize count Array variable 
    for (let i = 0; i < scrollBtnLeft.length; i++) {
        count[i] = 0;
    }

}
const moviesContainer = document.querySelectorAll('.movies__list');

function arrowClickEvent(event) {
    const target = event.target;
    const scrollBtnRight = document.querySelectorAll('.movies__button-right');
    const scrollBtnLeft = document.querySelectorAll('.movies__button-left');
    const movie = document.querySelector('.movie');

    if (target.matches('.movies__button-right')) {
        const index = event.target.parentElement.parentElement.dataset.index;
        const scrollWidth = moviesContainer[index].scrollWidth;
        count[index]++;
        if (count[index] == parseInt(scrollWidth / (movie.clientWidth * 2) - 1)) {
            count[index] == parseInt(scrollWidth / windowWidth);
            target.classList.add('invisible');
        }
        
        moviesContainer[index].scrollBy(movie.clientWidth * 2, 0);
        scrollBtnLeft[index].classList.add('visible');
    }
    else if (target.matches('.movies__button-left')) {
        const index = event.target.parentElement.parentElement.dataset.index;
        count[index]--;
        scrollBtnRight[index].classList.remove('invisible');
        moviesContainer[index].scrollBy(-movie.clientWidth * 2, 0);
        if (count[index] <= 0) {
            count[index] = 0;
            moviesContainer[index].scrollTo(0, 0);
            target.classList.remove('visible');
        }
    }
}
//repostion movie list when window size is changed
function repositionMovieList(event) {
    const windowSize = event.target.window.outerWidth;
    const movie = document.querySelector('.movie');
    // move scroll to right position when the movie image size changes (dynamically)
    moviesContainer.forEach(container => {
        let index = container.parentElement.dataset.index;
        container.scrollTo(movie.clientWidth * 2 * count[index],0);
       
    })
    // remove Arrow according to the window width (dynamically)
    removeArrow(windowSize);
}

// remove arrow Function - remove each arrow when the list of movies is shorter than the window width
function removeArrow(width) {
    moviesContainer.forEach(movieContainer => {
        if (movieContainer.scrollWidth < width) {
            movieContainer.parentElement.childNodes[1].childNodes[1].classList.remove('visible');
            movieContainer.parentElement.childNodes[5].childNodes[1].classList.add('invisible');
        }
        else
            movieContainer.parentElement.childNodes[5].childNodes[1].classList.remove('invisible');

    });
};