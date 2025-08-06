import axios from "axios";
import { apiKey } from "../constants/index.js";

//end points
const apiBaseURL = `https://api.themoviedb.org/3`;
const trendingMoviesEP = `${apiBaseURL}/trending/movie/day?api_key=${apiKey}`;
const upcomingMoviesEP = `${apiBaseURL}/movie/upcoming?api_key=${apiKey}`;
const topRatedMoviesEP = `${apiBaseURL}/movie/top_rated?api_key=${apiKey}`;
const searchMoviesEP = `${apiBaseURL}/search/movie?api_key=${apiKey}`;

// dynamic endpoint
const movieDetailsEndpoint = id => `${apiBaseURL}/movie/${id}?api_key=${apiKey}`;
const movieCreditsEndpoint = id => `${apiBaseURL}/movie/${id}/credits?api_key=${apiKey}`;
const similarMoviesEndpoint = id => `${apiBaseURL}/movie/${id}/similar?api_key=${apiKey}`;
const personDetailsEP = id => `${apiBaseURL}/person/${id}?api_key=${apiKey}`;
const personMoviesEP = id => `${apiBaseURL}/person/${id}/movie_credits?api_key=${apiKey}`;


export const image500 = path => path ? `https://image.tmdb.org/t/p/w500/${path}` : null;
export const image342 = path => path ? `https://image.tmdb.org/t/p/w342/${path}` : null;
export const image185 = path => path ? `https://image.tmdb.org/t/p/w185/${path}` : null;



const apiCall = async (endpoint, params) => {
    const options = {
        method: `GET`,
        url: endpoint,
        params: params ? params : {}
    }

    try {
        const response = await axios.request(options);
        return response.data;

    } catch (error) {
        console.log('error', error);
        return {};
    }
}

export const fetchingTrendingMovies = () => {
    return apiCall(trendingMoviesEP);
}

export const fetchingUpcomingMovies = () => {
    return apiCall(upcomingMoviesEP);
}

export const fetchingTopRatedMovies = () => {
    return apiCall(topRatedMoviesEP);
}

export const fetchingMoviesDetails = (id) => {
    return apiCall(movieDetailsEndpoint(id));
}

export const fetchingMoviesCast = (id) => {
    return apiCall(movieCreditsEndpoint(id));
}

export const fetchingSimilarMovies = (id) => {
    return apiCall(similarMoviesEndpoint(id));
}

export const fetchingPersonDetails = (id) => {
    return apiCall(personDetailsEP(id));
}

export const fetchingPersonMovies = (id) => {
    return apiCall(personMoviesEP(id));
}

export const fetchingSearchedMovies = params => {
    return apiCall(searchMoviesEP, params);
}