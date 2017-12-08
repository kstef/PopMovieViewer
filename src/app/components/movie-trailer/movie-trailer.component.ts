import { Component, OnInit, Input } from '@angular/core';
import {DomSanitizer,SafeResourceUrl,} from '@angular/platform-browser';

@Component({
  selector: 'app-movie-trailer',
  templateUrl: './movie-trailer.component.html',
  styleUrls: ['./movie-trailer.component.css']
})
export class MovieTrailerComponent implements OnInit {
  private _url;
  @Input() 
  set video_url(ulr: string) {
    this.safeUrl = this.sanitizer.bypassSecurityTrustResourceUrl(ulr); 
  }

  @Input() videoWidth: number;
  @Input() videoHeight: number;

  safeUrl: SafeResourceUrl;

  constructor (public sanitizer:DomSanitizer) {
    this.videoWidth = 400;
    this.videoHeight = 300;
  }

  ngOnInit() {
  }

}
