'use strict';

const api_key = '8b9f02d222a2f60176e09750fcd6c5e0';
const imageBaseURL = 'https://image.tmdb.org/t/p/';
/**
 * fetch data from a server using the 'url' and passes
 * the result in json data to a 'caalback' function,
 * along with an optional parameter if has optionalparametre
 */

const fetchDataFromServer = function(url, callback, 
    optionalparam) {
    fetch(url)
      .then(Response => Response.json())
      .then(data => callback(data,optionalparam));
}

export { imageBaseURL, api_key, fetchDataFromServer };