import { Store } from '@ngrx/store';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ToastyService, ToastyConfig, ToastOptions, ToastData } from 'ng2-toasty';
import * as fromRoot from './data/reducers';
import * as moviesActions from './data/movies/movies-actions';
import { Subscription } from 'rxjs/Subscription';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  subscription: Subscription;
  loading: Observable<boolean>;

  constructor(private toastyService: ToastyService,
    private toastyConfig: ToastyConfig,
    private store: Store<fromRoot.IAppState>
  ) {
    this.loading = this.store.select(state => state.movies.loading);
    this.toastyConfig.theme = 'material';
    this.subscription = this.store.select(state => state.movies.errorMsg).subscribe(err => {

      var toastOptions: ToastOptions = {
        title: "Oops! Something went wrong",
        msg: "Please refresh the page to try again. Error: " + err,
        showClose: true,
        timeout: 10000,
        theme: 'material',

      };
      this.toastyService.error(toastOptions);
    });
  }

  ngOnInit(){
    this.store.dispatch(new moviesActions.GetMovies());
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
