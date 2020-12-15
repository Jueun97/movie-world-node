// get movie id from URL 
const urlParams = new URLSearchParams(window.location.search);
const MOVIE_ID = urlParams.get('id');
const videoVideo = document.querySelector('.video-video-src');
const videoIframe = document.querySelector('.video-iframe');

console.log('hih',MOVIE_ID);
if (MOVIE_ID == "" || MOVIE_ID == 'undefined') {
    alert('동영상을 재셍할 수 없습니다. 죄송합니다.');
    window.location.href = './index.html';
}
else if (MOVIE_ID == "friends") {
    videoVideo.parentNode.style.display = "block";
    videoIframe.style.display = "none";
    videoVideo.src = "./data/videos/main.mp4"; 
}
else {
    videoVideo.parentNode.style.display = "none";
    videoIframe.style.display = "block";
    videoIframe.src = `https://www.youtube.com/embed/${MOVIE_ID}`; 
}

   