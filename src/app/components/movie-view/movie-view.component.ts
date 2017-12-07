import { Component, OnInit } from '@angular/core';

import { Store } from '@ngrx/store';
import * as fromRoot from '../../data/reducers';
import { IMovie } from './../../data/models/movie';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-movie-view',
  templateUrl: './movie-view.component.html',
  styleUrls: ['./movie-view.component.css']
})
export class MovieViewComponent implements OnInit {

  selectedMovie$: Observable<IMovie>;

  constructor(private store: Store<fromRoot.IAppState>) { 
    this.selectedMovie$ = this.store.select(state => state.movies.activeMovie);
  }

  ngOnInit() {
  }

}
