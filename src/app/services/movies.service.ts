import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { IMovie } from '../data/models/movie';
import 'rxjs/add/operator/map'

@Injectable()
export class MoviesService {

  private readonly TOKEN = 'fdcd977a12ee20da2fe6ffd425012720';
  private readonly BASE_URL = 'https://api.themoviedb.org/3/discover/movie';

  constructor(public http: HttpClient) { }

  getMovies(): Observable<IMovie[]> {

    let url = `${this.BASE_URL}?api_key=${this.TOKEN}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1`
    // get users from api
    return this.http.get(url)
      .map((response: Response) => {
        return response['results'] || response.json();
      });

  }
}
