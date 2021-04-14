'use strict';
export default class Search{
    constructor(){
    this.urlParams = new URLSearchParams(window.location.search);
    this.SEARCH_TITLE = this.urlParams.get('search');
    this.category = document.querySelector('#Search');
    this.categoryTitle = document.querySelector('.Search-title');
    this.searchList = [];
    }
    setLoadListner1(onLoad1) {
        this.onLoad1 = onLoad1;
    }
    setLoadListner2(onLoad2) {
        this.onLoad2 = onLoad2;
    }
    setDisplayListner(display) {
        this.display = display;
    }
    loadFriends() {
        return fetch("data/friends.json").then(response => response.json()).then(json => json.items);
    }
    searchMovie(items) {
        // only in case of when user searched 
        if (this.SEARCH_TITLE != null) {
            if (this.SEARCH_TITLE == "snow")
                snowEffect();
            else {
                this.category.style.display = 'block';
                items.forEach(item => {
                    // change all the words of movie title and user's word to lowerCase and remove space
                    const movieTItle = item.title.toLowerCase().replace(/(\s*)/g, "");
                    const searchTitle = this.SEARCH_TITLE.toLowerCase().replace(/(\s*)/g, "");
                    if (movieTItle.indexOf(searchTitle) >= 0)
                        this.searchList.push(item);
                })
            }
            // add search word in Search category name 
            this.categoryTitle.innerHTML = `The results of "${this.SEARCH_TITLE}" ... `;
            this.display && this.display(this.searchList);
        }
    }

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