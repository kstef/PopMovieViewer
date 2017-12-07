import { MoviesService } from './../../services/movies.service';
import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { ReplaySubject } from 'rxjs/ReplaySubject';
import { hot, cold } from 'jasmine-marbles';
import { Observable } from 'rxjs/Observable';
import { MoviesEffects } from './movies-effects';
import * as moviesActions from './movies-actions';


describe('Movies Effects', () => {
  let effects: MoviesEffects;
  let actions: Observable<any>;
  let moviesSvc: MoviesService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        // any modules needed
      ],
      providers: [
        MoviesEffects,
        provideMockActions(() => actions),
        {
            provide: MoviesService,
            useValue: jasmine.createSpyObj('MoviesService', ['getMovies'])
        }
        // other providers
      ],
    });

    effects = TestBed.get(MoviesEffects);
    moviesSvc = TestBed.get(MoviesService) as jasmine.SpyObj<MoviesService>
  });

//   it('should work', () => {
//     let payload = [
//         {id: "1", title: "test1", overview: "", release_date: "", vote_average: 5, vote_count: 5, poster_path: ""}, 
//         {id: "2", title: "test2", overview: "", release_date: "", vote_average: 5, vote_count: 5, poster_path: ""}
//     ];  
//     const action = new moviesActions.GetMovies();
//     const completion = new moviesActions.GotMovies(payload);

//     // Refer to 'Writing Marble Tests' for details on '--a-' syntax
//     actions = hot('--a-', { a: action });
//     const expected = cold('--b', { b: completion });

//     expect(effects.GetMovies$).toBeObservable(expected);
//   });

//   it('should work also', () => {
//     actions = new ReplaySubject(1);

//     actions.next(SomeAction);

//     effects.someSource$.subscribe(result => {
//       expect(result).toEqual(AnotherAction);
//     });
//   });
});