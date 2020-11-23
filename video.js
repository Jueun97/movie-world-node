// get movie id from URL 
const urlParams = new URLSearchParams(window.location.search);
const MOVIE_ID = urlParams.get('id');
console.log('hih',MOVIE_ID);
if (MOVIE_ID == "" || MOVIE_ID == 'undefined') {
    alert('동영상을 재셍할 수 없습니다. 죄송합니다.');
    window.location.href = './index.html';
}
const video = document.querySelector('.video');
video.src = `https://www.youtube.com/embed/${MOVIE_ID}`;
