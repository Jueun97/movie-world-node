// get movie id from URL 
const urlParams = new URLSearchParams(window.location.search);
const MOVIE_ID = urlParams.get('id');
const videoVideo = document.querySelector('.video-video-src');
const videoIframe = document.querySelector('.video-iframe');
const movieID = MOVIE_ID.toLowerCase().replace(/(\s*)/g, "");

const cancleBtn = document.querySelector('.video__cancle');

cancleBtn.addEventListener('click', () => {
    window.history.back();
});

if (MOVIE_ID == "" || MOVIE_ID == 'undefined') {
    alert('동영상을 재생할 수 없습니다. 죄송합니다.');
    //window.location.href = './index.html';
    window.history.back();
}
else if (movieID.indexOf("friends") >= 0) {
    videoVideo.src = `./data/videos/${MOVIE_ID}`; 
    videoVideo.parentNode.style.display = "block";
    videoIframe.style.display = "none";
    cancleBtn.classList.add('videoFrame');
}
else {
    videoVideo.parentNode.style.display = "none";
    videoIframe.style.display = "block";
    cancleBtn.classList.remove('videoFrame');
    videoIframe.src = `https://www.youtube.com/embed/${MOVIE_ID}`; 
}





   