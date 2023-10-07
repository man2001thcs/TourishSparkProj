import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RestaurantStoreService {
  constructor(private http: HttpClient) {}

  createRestaurant(payload: any): Observable<any> {
    return this.http.post('/api/AddRestaurant', payload);
  }
}
