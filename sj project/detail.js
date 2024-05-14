'use strict';

import { api_key, imageBaseURL, fetchDataFromServer } from "./api.js";
import { sidebar } from "./sidebar.js";
import { CreateMovieCard } from "./movie-Card.js";


const movieId =window.localStorage.getItem("movieId");
const pageContent = document.querySelector("[page-content]");

sidebar();

const getGenres = function (genreList) {
    const newGenreList = [];

    for( const { name } of genreList) newGenreList.push(name);

    return newGenreList.join(", ");

}

const getCasts = function(classList) {
    const newCastList = [];

    for (let i = 0, len = castList.length; i< len && i<10; i++) {
        const { name } = castList[i];
        newCastList.push(name);
    }

    return newCastList.join(", ");
}

const getDirectors = function ( crewList ) {
    const directors = crewList.filter(({ job }) => job === "Director");

    const directorList = [];
    for (const { name } of directors) directorList.push(name);

    return directorList.join(", ");
}

//returns only traliers and teaser as array

const filterVideos = function (videoList) {
    return videoList.filter(({ type, site }) => (type === "Trailer" || type === "Teaser") && site === "youtube");
}



fetchDataFromServer(`https://api.themoviedb.org/3/movie/${movieId}?api_key=${api_key}&append_to_response=casts,videos,images,release`, function (movie){

    const {
        bakdrop_path,
        poster_path,
        title,
        release_date,
        runtime,
        vote_average,
        releases: { countries: [{ certification }] },
        genres,
        overview,
        casts: { cast, crew },
        videos: {results: videos }
    } = movie;

    document.title = `${title} - Tvflix`;
    
    const movieDetail = document.createElement("div");
    movieDetail.classList.add("movie-detail");

    movieDetail.innerHTML = html` 
    
        <div class="backdrop-image" style ="background-image: url('${imageBaseURL}${"w1280" || "original"}${backdrop_path || poster_path}')"></div>

        <figure class="poster-box movie-poster">
           <img src="${imageBaseURL}w342${poster_path}" alt=Boots: "${title}" class="img-cover">
        </figure>

        <div class="detail-box">

            <div class="detail-content">
              <h1 class="heading">${title}</h1>

               <div class="meta-list">

                <div class="meta-item">
                  <img src="star.png" height="20" width="20"  alt="rating">

                  <span class="span">${vote_average.toFixed(1)}</span>  
                </div>

                <div class="separator"></div>

                <div class="meta-item">${runtime}m</div>

                <div class="separator"></div>

                <div class="meta-item">${release_date.split("_")[0]}</div>

                <div class="meta-item card-badge">${certification}</div>

            </div>

            <p class="genre">${getGenres(genres)}</p>
            <p class="overview">${overview}</p>

            <ul class="detail-list">
                <div class="list-item">
                    <p class="list-name">Starring</p>
                    <p>${getCasts(cast)}</p>
                </div>
                <divclass="list-item">
                    <p class="list-name">Directed By</p>
                    <p>${getDirectors(crew)}</p>
                </div>
            </ul>
            
        </div>

        <div class="title-wrapper">
            <h3 class="title-large">Traliers and clips</h3>
        </div>

        <div class="slider-list">
            <div class="slider-inner"></div>
        </div>
    </div>
</div>


    `;

    for (const { key, name } of filterVideos(videos)) {

        const videoCard = document.createElement("div");
        videoCard.classList.add("video-card");

        videoCard.innerHTML =`
          <iframe width="500" height="294" src="https://www.youtube.com/embed/${key}?&theme=dark&color=white&rel=0"frameborder="0" allowfullscreen="1" title="${name}" class="img-cover" loading="lazy"></iframe>
        `;


        movieDetail.querySelector(".slider-inner").appendChild (videoCard);

    }


    pageContent.appendChild(movieDetail);

    fetchDataFromServer(`https://api.themoviedb.org/3/movie/${movieId}/recommendations?api_key=${api_key}&page=1` , addSuggestMovies);


});


const createMovieList = function({ results: movieList},title) {
    movieListElem.classList.add("movie-list");
    movieListElem.ariaLabel = "";
    
    movieListElem.innerHTML =`
        
        <div class="title-wrapper">
            <h3 class="title-large">You May ALso Like</h3> 
        </div>
        <div class="slider-list">
            <div class="slider-inner">
                <div class="movie-card"></div>
            </div>
        </div>
    `;
    for (const movie of movieList) {
        const movieCard = CreateMovieCard(movie);//called from movie_card.js
       
        movieListElem.querySelector(".slider_inner").appendChild(movieCard);
    }
    pageContent.appendChild(movieListElem);

}