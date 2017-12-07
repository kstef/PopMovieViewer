import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { StoreModule, Store, combineReducers } from '@ngrx/store';
import * as moviesActions from '../../data/movies/movies-actions';
import * as fromRoot from '../../data/reducers';

import { MaterialModule } from '../../material/material.module';
import { StarRatingModule } from 'angular-star-rating';
import { FlexLayoutModule } from "@angular/flex-layout";
import { MovieViewComponent } from './movie-view.component';


describe('MovieViewComponent', () => {

  let component: MovieViewComponent;
  let fixture: ComponentFixture<MovieViewComponent>;
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
        MovieViewComponent
        // other declarations
      ],
      providers: [
        // other providers
      ]

    });

    store = TestBed.get(Store);

    spyOn(store, 'dispatch').and.callThrough();

    fixture = TestBed.createComponent(MovieViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();


  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });


  it('should display movie', () => {

    let payload = { id: "2", title: "test2", overview: "", release_date: "", vote_average: 5, vote_count: 5, poster_path: "" };

    const action = new moviesActions.ShowMovie(payload);
    store.dispatch(action);

    component.selectedMovie$.subscribe(data => {
      expect(data).toBeTruthy();
      expect(data.id).toEqual(payload.id)
    });
  });

});