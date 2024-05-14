'use strict';
/**
 * import all components and function
 */
import { sidebar } from "./sidebar.js";
import { api_key, imageBaseURL, fetchDataFromServer} from "./api.js";
import { CreateMovieCard } from "./movie-Card.js";

const pageContent = document.querySelector("[page-content]");

sidebar();


 /**
  * Home page sections(Top Rated, upcoming, trending movies)
  * */

const homePageSections =[
    {
        title: "Upcoming Movies",
        path: "/movie/upcoming"
    },

    {
        title:  "Weekly Trending Movies",
        path: "/trending/movie/week"
    },

    {
        title: "Top Rated Movies",
        path: "/movie/top_rated"
    },
]

 /**
  * fetch all genres eg:[{ "id":"1234", "name": "Action";}]
  * then change the genre formate eg:{ 123: "Action"}
  */
 const genreList = {

    //create genre string from genre_id eg:[23, 43] -> "Action, Romance".
    asString(genreIdList) {
        let newGenreList = [];

        for(const genreId of genreIdList) {
            this[genreId] && newGenreList.push(this[genreId]);// this == genreList;
        }
        return newGenreList.join(", ");
    }
 };

 fetchDataFromServer(`https://api.themoviedb.org/3/genre/movie/list?api_key=${api_key}`,function ({generes}) {
     for (const { id, name } of genres) {
         genreList[id] = name;
     }
     fetchDataFromServer('https://api.themoviedb.org/3/movie/popular?api_key=&{api_key}&page=1',heroBanner);
 });



const heroBanner = function ({ results: movieList}) {

    const Banner = document.createElement("section");
    Banner.classList.add("banner");
    Banner.ariaLabel = "Popular Moies";
    
    Banner.innerHTML = html`

    <div class="banner-slider"></div>

    <div class="slider-control">
        <div class="control-inner"></div>
    </div>
    `;

    let controlItemIndex = 0;

    for (const [index, movie] of movieList.entries()) {

        const {
            backdrop_path,
            title,
            release_date,
            overview,
            poster_path,
            vote_average,
            id
        } = movie;

        const sliderItem = document.createElement("div");
        sliderItem.classList.add("slider_item");
        sliderItem.setAttribute("slider-item", "");

        sliderItem.innerHTML = `
            <img src="${imageBaseURL}w1280${backdrop_path}" alt="${title}" class="img-cover" loading=${index === 0 ? "eager" : "lazy"}>
        
            <div class="banner-content">

                <h2 classs="heading">${title}</h2>
        
                <div class="meta-item">
                <div class="meta-item">${release_date.split("-")[0]}</div>

                <div class="meta-item card-badge">${vote_average.toFixed(1)}</div>
            </div>

            <p class="gener">${genreList.asString(genre_id)}</p>
            <p class="banner-text">${overview}</p>
        
            <a href="deatil.html" class="btn" onclick="getMovieDetails($)">
               <img src="play_circle.png" width="24" height="24" aria-hidden="true" alt="play_circle">
             <span class="span">Watch Now</span>
        </a>

    </div>
         ` ;
        
        Banner.querySelector(".banner-slider").appendChild(sliderItem);

        const controlItem = document.createElement("button");
        controlItem.classList.add("poster-box", "slider-item");
        controlItem.setAttribute("slider-control", `${controlItemIndex}`);

        controlItemIndex++;

        controlItem.innerHTML = html`
        <img src="${imageBaseURL}w154${poster_path}" alt="Slide to${title}" loading="lazy" draggable="false" class="img-cover">
        `;

        banner.querySelector(".control-inner").appendChild (controlItem);

        
    }

    pageContent.appendChild(heroBanner);

    addHeroSlide();


    /**
    *  Fetch data for home page sections(top rated, upcoming, trending)
    */

    for (const {title, path} of homePageSections) {
        fetchDataFromServer(`https://api.themoviedb.org/3/genre/movie/list?api_key=${api_key}&page=1`,createMovieList, title);
    }

    /**
     * Hero Slider functionality
     */

    const addHeroSlide = function () {

        const sliderItems =document.querySelectorAll("[slider_item]");
        const sliderControls = document.querySelectorAll("[slider-control]");

        let lastSliderItem = sliderItems[0];
        let lastSliderControl = sliderControls[0];

        lastSliderItem.classList.add("active");
        lastSliderControl.classList.add("active");

        const sliderStart = function () {
            lastSliderItem.classList.remove("active");
            lastSliderControl.classList.remove("active");

            // `this` ==slider-control

            sliderItems[Number(this.getAttribute("slider-control"))].classList.add("active");
            this.classList.add("active");

            lastSliderItem = sliderItems[Number(this.getAttribute("slider-control"))];
            lastSliderControl = this;



        }

        addEventOnElements(sliderControls, "click", sliderStart);
    }

    const createMovieList = function({ results: movieList},title) {
    movieListElem.classList.add("movie-list");
    movieListElem.ariaLabel = `&{title}`;

    movieListElem.innerHTML = html`
    
        <div class="title-wrapper">
            <h3 class="title-large">${title}</h3> 
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
}
