import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { StoreModule, Store, combineReducers } from '@ngrx/store';
import * as moviesActions from '../../data/movies/movies-actions';
import * as fromRoot from '../../data/reducers';

import { MaterialModule } from '../../material/material.module';
import { StarRatingModule } from 'angular-star-rating';
import { FlexLayoutModule } from "@angular/flex-layout";
import { MoviesListComponent } from './movies-list.component';


describe('MoviesListComponent', () => {

  let component: MoviesListComponent;
  let fixture: ComponentFixture<MoviesListComponent>;
  let store: Store<fromRoot.IAppState>;
  //let demoService: DemoService;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        MaterialModule,
        StarRatingModule,
        FlexLayoutModule,
        StoreModule.forRoot({
          ...fromRoot.reducers,
        }),
        // other imports
      ],
      declarations: [
        MoviesListComponent
        // other declarations
      ],
      providers: [
        // other providers
      ]

    });

    store = TestBed.get(Store);

    spyOn(store, 'dispatch').and.callThrough();

    fixture = TestBed.createComponent(MoviesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();


  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });


  it('should display movies list', () => {

    let payload = [
      { id: "1", title: "test1", overview: "", release_date: "", vote_average: 5, vote_count: 5, poster_path: "" },
      { id: "2", title: "test2", overview: "", release_date: "", vote_average: 5, vote_count: 5, poster_path: "" }
    ];
    const action = new moviesActions.GotMovies(payload);
    store.dispatch(action);

    component.movies$.subscribe(data => {
      expect(data).toBeTruthy();
      expect(data.length).toEqual(payload.length)
    });
  });

  it('should has as active movie the first movie of the list', () => {

    let payload = [
      { id: "1", title: "test1", overview: "", release_date: "", vote_average: 5, vote_count: 5, poster_path: "" },
      { id: "2", title: "test2", overview: "", release_date: "", vote_average: 5, vote_count: 5, poster_path: "" }
    ];
    const action = new moviesActions.GotMovies(payload);
    store.dispatch(action);

    component.selectedMovie$.subscribe(data => {
      expect(data).toBeTruthy();
      expect(data.id).toEqual(payload[0].id)
    });
  });

  it('should dispatch an event on show movie action', () => {
    
        let payload = { id: "2", title: "test2", overview: "", release_date: "", vote_average: 5, vote_count: 5, poster_path: "" };
        const action = new moviesActions.ShowMovie(payload);
        
        component.showMovie(payload);
    
        expect(store.dispatch).toHaveBeenCalledWith(action);
      });

});
