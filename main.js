import Home from './src/home.js';
import Modal from './src/modal.js';
import Movies from './src/movies.js';
'use strict';
// fetch data from API
function loadData() {
    return  fetch('https://yts.mx/api/v2/list_movies.json').then(response => response.json()).then(json => json.data.movies);
};
function loadFriends() {
    return fetch("data/friends.json").then(response => response.json()).then(json => json.items);
}
const movies = new Movies();
const modal = new Modal();
const home = new Home();
loadData()
    .then(items => {
        home.setItem(items)
        home.topMovie(),
        movies.setItem(items),
        modal.displayModal(),
        movies.classifyMovies("Romance"),
        movies.classifyMovies("Popular"),
        movies.classifyMovies("Drama"),
        movies.classifyMovies("Comedy"),
        movies.classifyMovies("Watching"),
        searchMovie(items),
        replaceUnloadedImage()
    })
    .then(() => {
        modal.setListener(),
        home.setListener(),
        otherEventFunction(),
        scrollEventFunction(),
        navbarEventFunction()
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



// shuffle array randomly
function shuffle(array) {
    array.sort(() => Math.random() - 0.5);
    return array;
  }
  
// search moive according to the words user typed in search bar
function searchMovie(items) {
    const urlParams = new URLSearchParams(window.location.search);
    const SEARCH_TITLE = urlParams.get('search');
    const category = document.querySelector('#Search');
    const categoryTitle = document.querySelector('.Search-title');
    const searchList = [];
    // only in case of when user searched 
    if (SEARCH_TITLE != null) {
        if (SEARCH_TITLE == "snow")
            snowEffect();
        else if (SEARCH_TITLE == "chanhee" || SEARCH_TITLE == "kyosun" || SEARCH_TITLE == "dakyun" || SEARCH_TITLE == "doli") {
            const dataArray = [];
            loadFriends().then(items => {
                shuffle(items);
                if (SEARCH_TITLE == "doli") {
                    topMovie(items);
                    classifyMovies(items, "Popular"),
                    classifyMovies(items, "Watching"),
                    classifyMovies(items.reverse(), "Romance"),   
                    classifyMovies(items.reverse(), "Drama"),
                    classifyMovies(items.reverse(), "Comedy")
                }
                else {
                    items.map(item => {
                        const movieTItle = item.title.toLowerCase().replace(/(\s*)/g, "");
                        if (movieTItle.indexOf(SEARCH_TITLE) >= 0) {
                            console.log(movieTItle, SEARCH_TITLE);
                            dataArray.push(item);
                        }
                    })
                    displayMovies(dataArray, "Search");
                    imageCube(SEARCH_TITLE);
                    category.style.display = 'block';
                }
            }).then(() => {
                modalEventFunction();
                scrollEventFunction();
                otherEventFunction();
            });
        }
        else {
            category.style.display = 'block';
            items.forEach(item => {
                // change all the words of movie title and user's word to lowerCase and remove space
                const movieTItle = item.title.toLowerCase().replace(/(\s*)/g, "");
                const searchTitle = SEARCH_TITLE.toLowerCase().replace(/(\s*)/g, "");
                if (movieTItle.indexOf(searchTitle) >= 0)
                    searchList.push(item);
            })
        }
    }
    // add search word in Search category name 
    categoryTitle.innerHTML = `The results of "${SEARCH_TITLE}" ... `;

    movies.displayMovies(searchList, "Search");
    
}
// snowEffect
function snowEffect() {
    var sf = new Snowflakes({
        color: "#ffffff", // 색상
        count: 75, // 갯수
        minOpacity: 0.2, // 최소 투명도 0: 투명 | 1: 불투명
        maxOpacity: 0.6 // 최대 투명도
    });
}
// image cube
function imageCube(imageTitle) {
    home.style.opacity = "0";
    home.style.pointerEvents = "none";
    let cubeWidth = window.innerWidth;
    let cubeHeight = 500;
    let cameraSize = 50;

    if (window.outerWidth > 500) {
        cubeWidth = window.innerWidth;
        cubeHeight = 500;
    }
    else if (350 < window.outerWidth && window.outerWidth < 500) {
        cubeWidth = 200;
        cubeHeight = 300;
        cameraSize = 55;
    }
    else {
        cubeWidth = 200;
        cubeHeight = 300;
        cameraSize = 70;
    }
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(cameraSize, window.innerWidth / window.innerHeight, 0.1, 1000);
    const loader = new THREE.TextureLoader();
    const canvas = document.querySelector('#Canvas');
    const renderer = new THREE.WebGLRenderer({ canvas });;

    renderer.setSize(cubeWidth, cubeHeight);
        

    document.body.appendChild(renderer.domElement);
    const geometry = new THREE.BoxGeometry();
    const material =[
        new THREE.MeshBasicMaterial({ map: loader.load(`data/images/${imageTitle}1.jpg`) }),
        new THREE.MeshBasicMaterial({ map: loader.load(`data/images/${imageTitle}2.jpg`) }),
        new THREE.MeshBasicMaterial({ map: loader.load(`data/images/${imageTitle}3.jpg`) }),
        new THREE.MeshBasicMaterial({ map: loader.load(`data/images/${imageTitle}4.jpg`) }),
        new THREE.MeshBasicMaterial({ map: loader.load(`data/images/${imageTitle}5.jpg`) }),
        new THREE.MeshBasicMaterial({ map: loader.load(`data/images/${imageTitle}6.jpg`) })]
        ;
    const cube = new THREE.Mesh(geometry, material);
    scene.add(cube);

    camera.position.z = 3;

    // 회전 속도
    const animate = function () {
        requestAnimationFrame(animate);
        cube.rotation.x += 0.01;
        cube.rotation.y += 0.01;

        renderer.render(scene, camera);
    };
    animate();
}

// gather all the events for the page
function navbarEventFunction() {
    // change logo image if the window size is smaller than 500px (mobile)
    const logo = document.querySelector('.navbar__logo');
    if (window.outerWidth > 480)
        logo.children[0].src = "./images/logoOriginal.png";

    
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
    // open search bar when search icon is clicked
    const searchIcon = document.querySelector('.icon-search');
    const searchBar = document.querySelector('.navbar__search');
    const iconsContainer = document.querySelector('.navbar__icons');
    searchIcon.addEventListener('click', () => {
        searchBar.classList.toggle('visible');
        iconsContainer.classList.toggle('active');
    })

    // change icon size when it is clicked
    const icons = document.querySelectorAll('.navbar__icon');
    iconsContainer.addEventListener('click', (event) => {
        const target = event.target;
        if (target.matches('.navbar__icon')) {
            if (target.dataset.icon !== 'search') {
                target.classList.toggle('active');
            } else {
                target.classList.toggle('visible');
                target.classList.toggle('active');
            }
            
            icons.forEach(icon => {
                if (target !== icon)
                    icon.classList.remove('active');
            })
        
    
        }
    })
    // show hidden menu list (when the window size is small)
    const navbarBtn = document.querySelector('.navbar__menu-button');
    navbarBtn.addEventListener('click', () => {
        menu.classList.toggle('visible');
    })
    
}

function scrollEventFunction() {
    const movies = document.querySelector('.moviesList');
    //scroll action
    const scrollBtnRight = document.querySelectorAll('.movies__button-right');
    const scrollBtnLeft = document.querySelectorAll('.movies__button-left');
    const moviesContainer = document.querySelectorAll('.movies__list');
    const movie = document.querySelector('.movie');
    const windowWidth = window.outerWidth;

    // intialize count Array variable 
    let count = [];
    for (let i = 0; i < scrollBtnLeft.length; i++) {
        count[i] = 0;
    }
    //scroll to rignt /left when right / left arrow is clicked
    movies.addEventListener('click', (event) => {
        const target = event.target;
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
            moviesContainer[index].scrollBy(-movie.clientWidth*2,0);
            if (count[index] <= 0) {
                count[index] = 0;
                moviesContainer[index].scrollTo(0,0);
                target.classList.remove('visible');
            }
        }
    })
    
   
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
     // when window is resized
     window.addEventListener('resize', (event) => {
        const windowSize = event.target.window.outerWidth;
        // move scroll to right position when the movie image size changes (dynamically)
        moviesContainer.forEach(container => {
            let index = container.parentElement.dataset.index;
            container.scrollTo(movie.clientWidth * 2 * count[index],0);
           
        })
        // remove Arrow according to the window width (dynamically)
        removeArrow(windowSize);
    })
    //remove Arrow initially
    removeArrow(windowWidth);
};
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
