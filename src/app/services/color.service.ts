import { HttpClient } from '@angular/common/http';
import { Injectable, OnDestroy } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ColorService implements OnDestroy {
  color = new BehaviorSubject<any>(null)
  constructor(private httpClient : HttpClient) {

   }
  ngOnDestroy(): void {
    this.color.unsubscribe();
  }

  getRandomColor<T>(size: number = 0): Observable<T>{
    let url = `https://random-data-api.com/api/color/random_color`;
    const finalUrl = size ? `${url}?size=${size}` : url;
   return this.httpClient.get<T>(finalUrl);
  }
}
