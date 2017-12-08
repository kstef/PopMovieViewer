import { Subscription } from 'rxjs/Subscription';
import { Component, OnInit, OnDestroy } from '@angular/core';

import { Store } from '@ngrx/store';
import * as fromRoot from '../../data/reducers';
import { IMovie } from './../../data/models/movie';
import { Observable } from 'rxjs/Observable';
import * as moviesActions from '../../data/movies/movies-actions';

@Component({
  selector: 'app-movie-view',
  templateUrl: './movie-view.component.html',
  styleUrls: ['./movie-view.component.css']
})
export class MovieViewComponent implements OnInit, OnDestroy {

  movie: IMovie;
  movieSubscripion: Subscription;
  videoURL$ : Observable<string>;
  constructor(private store: Store<fromRoot.IAppState>) { 
    this.videoURL$ = this.store.select(state => state.movies.activeMovieVideo);
    this.movieSubscripion = this.store.select(state => state.movies.activeMovie)
    .subscribe((movie) => {
        this.movie = movie;
        this.store.dispatch(new moviesActions.GetVideo(movie.id));
    })
  }

  ngOnInit() {
  }

  ngOnDestroy(){
    this.movieSubscripion.unsubscribe();
  }

}
