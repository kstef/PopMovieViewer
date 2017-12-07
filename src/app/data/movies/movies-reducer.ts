import { IMovie } from './../models/movie';
import { Action } from '@ngrx/store';
import * as moviesActions from './movies-actions';
import { DEFAULT_APP_STATE, IMoviesState } from './movies-state';


function getNewMovie(movie: IMovie): IMovie{
    var newMovie = { ...movie };
    newMovie.poster_path = `http://image.tmdb.org/t/p/w300/${movie.poster_path}`;
    newMovie.vote_average = movie.vote_average/2;
    return newMovie;
}

export function reducer(state = DEFAULT_APP_STATE, action: moviesActions.All): IMoviesState {

    switch (action.type) {
        case moviesActions.GET_MOVIES: return { ...state, loading: true };
        case moviesActions.GOT_MOVIES: return { ...state, loading: false, popMovies: [...action['payload']], activeMovie: getNewMovie(action['payload'][0]) || null };
        case moviesActions.SHOW_MOVIE: return { ...state, activeMovie: getNewMovie(action['payload']) };
        case moviesActions.ERROR_MOVIES: return { ...state, error: true, errorMsg: action['payload'] };
        default: return state;
    }
}

