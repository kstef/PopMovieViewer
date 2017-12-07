import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { Store } from '@ngrx/store';
import * as moviesActions from '../../data/movies/movies-actions';
import * as fromRoot from '../../data/reducers';
import { IMovie } from './../../data/models/movie';


@Component({
  selector: 'app-movies-list',
  templateUrl: './movies-list.component.html',
  styleUrls: ['./movies-list.component.css']
})
export class MoviesListComponent implements OnInit {
  selectedMovie$: Observable<IMovie>;
  movies$: Observable<IMovie[]>;

  constructor(private store: Store<fromRoot.IAppState>) { 
    this.movies$ = this.store.select(state => state.movies.popMovies);
    this.selectedMovie$ = this.store.select(state => state.movies.activeMovie);
   
  }

  ngOnInit() {
   
  }

  showMovie(movie:IMovie){
    this.store.dispatch(new moviesActions.ShowMovie(movie));
  }

}
