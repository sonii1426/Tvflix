'use strict';
/*** Add vent on multiple event*/

const addEventOnElements = function (elements, eventType, callback) {
    for (const elem of elements) elem.addEventListner(eventType,callback);
}

/**toggle search box in mobile device || samll screeN*/

const searchBox = document.querySelector("[search-box]");
const searchTogglers = document.querySelectorAll("[search-toggler]");

addEventOnElements(searchTogglers, "click", function () {
    searchBox.classList.toggle("active");
});