import { IVideo } from './../data/models/video';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { IMovie } from '../data/models/movie';
import 'rxjs/add/operator/map'

@Injectable()
export class MoviesService {

  private readonly TOKEN = 'fdcd977a12ee20da2fe6ffd425012720';
  private readonly BASE_URL = 'https://api.themoviedb.org/3';

  constructor(public http: HttpClient) { }

  getMovies(pageNo: number = 1): Observable<IMovie[]> {

    let url = `${this.BASE_URL}/discover/movie?api_key=${this.TOKEN}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${pageNo}`
    // get users from api
    return this.http.get(url)
      .map((response: Response) => {
        return response['results'] || response.json();
      });

  }

  getMovieVideos(movieId: string): Observable<IVideo[]> {
    
        let url = `${this.BASE_URL}/movie/${movieId}/videos?api_key=${this.TOKEN}`
        // get users from api
        return this.http.get(url)
          .map((response: Response) => {
            return response["results"] || response.json();
          });
    
      }
}
