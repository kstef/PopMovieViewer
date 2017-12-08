import { IMovie } from './../models/movie';
import { Action } from '@ngrx/store';
import * as moviesActions from './movies-actions';
import { DEFAULT_APP_STATE, IMoviesState } from './movies-state';
import { IVideo } from '../models/video';

const YOUTUBE = 'YouTube';

function getNewMovie(movie: IMovie): IMovie {
    let newMovie = { ...movie };
    newMovie.poster_path = `http://image.tmdb.org/t/p/w300/${movie.poster_path}`;
    newMovie.vote_average = movie.vote_average / 2;
    return newMovie;
}

function getMovieVideo(videos: IVideo[]): string {
    let video = null;
    //locate youtube video or take the first video
    if (videos && videos.length > 0)
        video = videos.find(v => v.site == YOUTUBE) || videos[0];
    if (video) {
        switch (video.site) {
            //http://www.youtube.com/embed/okqEVeNqBhc?html5=1
            case YOUTUBE :  return ` http://www.youtube.com/embed/${video.key}?html5=1`
            default: break;
        }
    }
    return '';
}

export function reducer(state = DEFAULT_APP_STATE, action: moviesActions.All): IMoviesState {

    switch (action.type) {
        case moviesActions.GET_MOVIES: return { ...state, loading: true };
        case moviesActions.GOT_MOVIES: return { ...state, loading: false, popMovies: [...action['payload']], activeMovie: getNewMovie(action['payload'][0]) || null, activeMovieVideo:null };
        case moviesActions.SHOW_MOVIE: return { ...state, activeMovie: getNewMovie(action['payload']), activeMovieVideo:null };
        case moviesActions.ERROR_MOVIES: return { ...state, error: true, errorMsg: action['payload'] };
            
        case moviesActions.GET_VIDEO: return { ...state, activeMovieVideo: null};
        case moviesActions.GET_VIDEO_SUCCESS: return { ...state, activeMovieVideo: getMovieVideo(action['payload']) };

        default: return state;
    }
}

