export default class Movies{
    constructor() {
        
    }

    // display movies in the list screen
    displayMovies(items, genre) {
        console.log("display movies", items);
        const id = genre;
        const category = document.querySelector(`#${id}`).querySelector('.movies__list');
        // --->>> map 리턴 시 , 를 기본적으로 출력(join(',') -> join함수를 사용하여 , 제거
        category.innerHTML = items.map(item => createList(item)).join('');
    };
    // create list for html
    createList(item) {
        const genres = [];
        if (item.genres.length == 1)
            genres.push(item.genres[0]);
        else
            genres.push(item.genres[0], item.genres[1]);
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
                    <div class="movie-genres">${genres.map(genre => genre)}</div>
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
}