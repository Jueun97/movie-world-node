'use strict';

export default class Modal{
    constructor() {
        this.modal = document.querySelector('.modal');

    }
    // displayModal in modal screen
    displayModal() {
        this.modal.innerHTML =
            `
        <i class="fas fa-times modal__cancle"></i>
        <div class="modal__background">
        </div>
        <img src="" alt="movie poster" class="modal__image">
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

    openModal(title, rating, genres, description, image, video) {
        const modalBackground = document.querySelector('.modal__background');
        const modalImage = document.querySelector('.modal__image');
        const modalButton = document.querySelector('.modal__button');
        const container = document.querySelector('.bodyContainer');

        const Rating = document.querySelector('.movie-info-rating');
        const Title = document.querySelector('.modal__movie-title');
        const Genres = document.querySelector('.movie-info-genres');
        const Description = document.querySelector('.movie-info-description');

        Title.innerHTML = title;
        Genres.innerHTML = genres;
        Rating.innerHTML = `${rating}★`;
        Description.innerHTML = description;
        modalBackground.style.backgroundImage = `url(${image})`;
        modalImage.src = image;
        modalButton.value = video;
        Image = image;

        modalImage.onerror = function () {
            modalBackground.style.backgroundImage = `url("images/unloaded.jpg")`;
            modalImage.src = "images/unloaded.jpg";
        }
        
        this.modal.style.display = 'block'; 
        // handle background when modal is shown up
        container.classList.add('invisible');
        container.parentElement.style.overflow = 'hidden';
    }

    // hide modal function - hide modal when 'x' button in modal is clicked
    closeModal(){
        const container = document.querySelector('.bodyContainer');
        this.modal.style.display = 'none';
        container.classList.remove('invisible');
        container.parentElement.style.overflow = 'initial';
    };

    onClickHideModal() {
        //hide modal
        const cancleBtn = document.querySelector('.modal__cancle');
        cancleBtn.addEventListener('click', ()=>this.closeModal());
    }

    playVideo() {
        this.modal.addEventListener('click', (event) => {
            const target = event.target;
            if (target.matches('.playBtn')) {
                const VIDEO_ID = target.value;
                window.location.href = `./video?id=${VIDEO_ID}`;
            }
        })
    }
        
}