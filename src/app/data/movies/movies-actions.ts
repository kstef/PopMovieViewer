import { IMovie } from '../models/movie';
import { Action } from '@ngrx/store';

export const GET_MOVIES = '[Movies] GetMovies';
export const GOT_MOVIES = '[Movies] GotMovies';
export const SHOW_MOVIE = '[Movies] Show';
export const ERROR_MOVIES = '[Movies] Error';

export class GetMovies implements Action {
    type = GET_MOVIES;
}

export class GotMovies implements Action {
    type = GOT_MOVIES;

    constructor(public payload: Array<IMovie>) {}
}

export class ShowMovie implements Action {
    type = SHOW_MOVIE;

    constructor(public payload: IMovie) {}
}

export class ErrorMovie implements Action {
    type = ERROR_MOVIES;

    constructor(public payload: string) {}
}

export type All = GetMovies | GotMovies | ShowMovie | ErrorMovie;