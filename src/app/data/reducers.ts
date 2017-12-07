import { IMoviesState } from './movies/movies-state';
import * as fromMovies from './movies/movies-reducer';
import { createSelector, createFeatureSelector } from '@ngrx/store';

export interface IAppState{
    movies: IMoviesState;
}

export const reducers = {
    movies: fromMovies.reducer
}


