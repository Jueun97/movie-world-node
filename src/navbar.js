'use strict';

export default function navbarEvent() {
    const menu = document.querySelector('.navbar__menu');
    menu.addEventListener('click', moveToClickedMenu);
    
    const iconsContainer = document.querySelector('.navbar__icons');
    iconsContainer.addEventListener('click', sizeUpClickedIcon);

    const searchIcon = document.querySelector('.icon-search');
    searchIcon.addEventListener('click', showUpSearchBar);

    const logo = document.querySelector('.navbar__logo');
    if (window.outerWidth > 480)
        logo.children[0].src = "./images/logoOriginal.png";

    // show hidden menu list (when the window size is under Xpx)
    const navbarBtn = document.querySelector('.navbar__menu-button');
    navbarBtn.addEventListener('click', () => {
        menu.classList.toggle('visible');
    })

    window.addEventListener('scroll', changeNavbarColor);
}

function moveToClickedMenu() {
    const item = event.target.dataset.item;
    const element = document.querySelector(`#${item}`);
    if (item != null) {
        element.scrollIntoView({ behavior: 'smooth', block: "center" });
    }
}
function changeNavbarColor() {
    const scrollHeight = window.scrollY;
    const navbar = document.querySelector('#navbar');

    if (scrollHeight > 0)
        navbar.classList.add('active');
    else
        navbar.classList.remove('active');
}
// open search bar when search icon is clicked
function showUpSearchBar() {
    const searchBar = document.querySelector('.navbar__search');
    const iconsContainer = document.querySelector('.navbar__icons');

    searchBar.classList.toggle('visible');
    iconsContainer.classList.toggle('active');
    }
function sizeUpClickedIcon(event) {
    const icons = document.querySelectorAll('.navbar__icon');
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
    
}
