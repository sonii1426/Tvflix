'use strict';

import { api_key, fetchDataFromServer } from "./api.js";
import { sidebar } from "./sidebar.js";
import { CreateMovieCard } from "./movie-Card.js";


const pageContent = document.querySelector("[page-content]");

sidebar();

