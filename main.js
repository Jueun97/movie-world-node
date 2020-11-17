//change navbar backgroundColor when scrolling down
window.addEventListener('scroll', (e) => {
    scrollHeight = window.scrollY;
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
//show up modal when 'more info' button is clicked
const moreInfoBtn = document.querySelector('.infoBtn');
moreInfoBtn.addEventListener('click', () => {
    openModal();
});

//hide modal when 'x' button in modal is clicked
const cancleBtn = document.querySelector('.modal__cancle');
cancleBtn.addEventListener('click', () => {
    closeModal();
});

//show up modal when 'movie icon' in movie poster is clicked
const movies = document.querySelectorAll('.movie-icon');
movies.forEach(movie => {
    movie.addEventListener('click', (e) => {
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
//scroll to rignt when right arrow is clicked
scrollBtnRight.forEach(button => {
    button.addEventListener('click', (event) => {
        const index = event.target.parentElement.parentElement.dataset.index;
        moviesContainer[index].classList.add('active');
        moviesContainer[index].scrollTo(moviesContainer[index].scrollWidth, 0);
        scrollBtnLeft[index].classList.add('active');
    })
});
//scroll to left when left arrow is clicked
scrollBtnLeft.forEach(button => {button.addEventListener('click', (event) => {
    const index = event.target.parentElement.parentElement.dataset.index;
    moviesContainer[index].scrollTo(0, 0);
    button.classList.remove('active');
})
});