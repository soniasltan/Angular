import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class WelcomeService {

  constructor(private http: HttpClient) { }

  apiKey = 'fSj7B8266gpkqZQDGaDxmI4ICnxFSqAf';

  getGIF() {
    return this.http.get(`https://api.giphy.com/v1/gifs/random?api_key=${this.apiKey}`);
  }

  getProject() {
    return this.http.get('http://localhost:5109/api/Projects')
  }
}
