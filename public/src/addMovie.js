'use strict';

const title = document.querySelector('.addMovie__container__title');
const year = document.querySelector('.addMovie__container__year');
const rating = document.querySelector('.addMovie__container__rating');
const genres = document.querySelector('.addMovie__container__genres');
const summary = document.querySelector('.addMovie__container__summary');
const imagePreviewBtn = document.querySelector('.addMovie__image-preview-btn');
const imagePreview = document.querySelector('.addMovie__image-preview-image');

if (localStorage.length > 1) {
    console.log(localStorage.length)
    title.value = localStorage.getItem('title');
    year.value = localStorage.getItem('year');
    rating.value = localStorage.getItem('rating');
    genres.value = localStorage.getItem('genres');
    summary.innerHTML = localStorage.getItem('summary');
}
const imageButton = document.querySelector('.addMovie__container__image-btn');
imageButton.addEventListener('click',(event)=>{
    localStorage.setItem('title',title.value);
    localStorage.setItem('year',year.value);
    localStorage.setItem('rating',rating.value);
    localStorage.setItem('genres',genres.value);
    localStorage.setItem('summary',summary.value);
    console.log("hello");
    window.location.href = './image__editor';
})
const imageUrl = localStorage.getItem('imageUrl');
if(imageUrl){
    imagePreview.src = imageUrl ? imageUrl : '';
    imagePreviewBtn.style.display = 'block';
}
document.querySelector('.image-value').value = imageUrl;
let check = false;
imagePreviewBtn.addEventListener('click',()=>{
    if(check){
        imagePreview.style.display = 'none';
        imagePreviewBtn.classList.remove('fa-caret-up');
        imagePreviewBtn.classList.add('fa-caret-down');
        check = false;
    } else{
        imagePreview.style.display = 'block';
        imagePreviewBtn.classList.remove('fa-caret-down');
        imagePreviewBtn.classList.add('fa-caret-up');
        check = true;
    }
    
})
function dataHandler(){
    const TITLE = title.value;
    const YEAR = year.value;
    const RATING = rating.value;
    const GENRES = genres.value;
    const SUMMARY = summary.value;

    let check = '';
    if(TITLE && YEAR && RATING && GENRES && SUMMARY){
        check = confirm("등록하시겠습니까?");
    }else{
        alert("항목을 빠짐없이 기입해주세요! :)");
    }
    if(check){
        localStorage.clear();
        return true;
    }
    else
        return false;
}
