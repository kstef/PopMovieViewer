import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { StoreModule, Store, combineReducers } from '@ngrx/store';
import { AppComponent } from './app.component';
import * as fromRoot from './data/reducers';
import * as moviesActions from './data/movies/movies-actions';

import { MaterialModule } from './material/material.module';
import { ToastyModule, ToastyService } from 'ng2-toasty';
import { StarRatingModule } from 'angular-star-rating';
import { FlexLayoutModule } from "@angular/flex-layout";

import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { MovieViewComponent } from './components/movie-view/movie-view.component';
import { MoviesListComponent } from './components/movies-list/movies-list.component';


describe('AppComponent', () => {

  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let store: Store<fromRoot.IAppState>;
  let toastySvc: ToastyService;
  //let demoService: DemoService;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        MaterialModule,
        ToastyModule,
        StarRatingModule,
        FlexLayoutModule,
        StoreModule.forRoot({
          ...fromRoot.reducers,
        }),
        // other imports
      ],
      declarations: [
        AppComponent,
        HeaderComponent,
        FooterComponent,
        MovieViewComponent,
        MoviesListComponent,
        // other declarations
      ],
      providers: [
        // other providers
        {
          provide: ToastyService,
          useValue: jasmine.createSpyObj('ToastyService', ['error'])
        }]
        
    });

    store = TestBed.get(Store);

    spyOn(store, 'dispatch').and.callThrough();
    toastySvc = TestBed.get(ToastyService) as jasmine.SpyObj<ToastyService>

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();


  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('should dispatch an action to load data when created', () => {
    const action = new moviesActions.GetMovies();

    expect(store.dispatch).toHaveBeenCalledWith(action);
  });

  it('should display loading spinner', () => {

    component.loading.subscribe(data => {
      expect(data).toBeTruthy()
    });
  });

  it('should set loading to false', () => {

    let payload = [
      { id: "1", title: "test1", overview: "", release_date: "", vote_average: 5, vote_count: 5, poster_path: "" },
      { id: "2", title: "test2", overview: "", release_date: "", vote_average: 5, vote_count: 5, poster_path: "" }
    ];
    const action = new moviesActions.GotMovies(payload);
    store.dispatch(action);

    component.loading.subscribe(data => {
      expect(data).toBeFalsy()

    });
  });

  it('should display error', () => {
        const action = new moviesActions.ErrorMovie("test error");
        store.dispatch(action);

        expect(toastySvc.error).toHaveBeenCalled();
      });

});
