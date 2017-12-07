import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Action } from '@ngrx/store';
import { Actions, Effect } from '@ngrx/effects';
import { of } from 'rxjs/observable/of';
import { MoviesService } from '../../services/movies.service';
import * as moviesActions from './movies-actions';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/catch';


@Injectable()
export class MoviesEffects {

  constructor(
    private actions$: Actions,
    private moviesSvc: MoviesService
  ) { }

  @Effect()
  GetMovies$: Observable<Action> = this.actions$.
    ofType<moviesActions.GetMovies>(moviesActions.GET_MOVIES)
    .switchMap(action =>
        this.moviesSvc.getMovies().map((movies: any) => {
            //console.log(movies);
             return new moviesActions.GotMovies(movies);
            })
        .catch((err) =>  of(new moviesActions.ErrorMovie(err.message || err.toString()))) 
    );
}