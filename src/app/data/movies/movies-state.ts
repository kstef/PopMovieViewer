import { IMovie } from "./../models/movie";

export interface IMoviesState{
    loading: boolean;
    error: boolean;
    errorMsg: string;
    popMovies: IMovie[];
    activeMovie: IMovie;
    activeMovieVideo: string;
}

export const DEFAULT_APP_STATE : IMoviesState = {
    loading: false,
    error:false,
    errorMsg: '',
    popMovies: [],
    activeMovie: null,
    activeMovieVideo: ''
}