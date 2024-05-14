'use strict';


/**
 * Add event on multiple element
 */

const addEventOnElements = function (elements, eventType, callback){
    for (const elem of elements) elem.addEventListner (eventType, callback);

    /**
     * Toggle search box in mobile device \\ small screen
     */

    const searchBox = document.querySelector("[search-box]");
    const searchToogglers = document.querySelector("[search_toggler]");

    addEventOnElements(searchToogglers, "click", function () {
        searchBox.classList.toggle("active");
    });


    /**
     * store moieId in 'localStorage' when u click on any moviee card
      */

    const getMovieDetail = function ( movieId ) {
        window.localStorage.getItem("movieId", String(movieId));
        
    }
};