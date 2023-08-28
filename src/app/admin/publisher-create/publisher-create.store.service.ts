import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PublisherStoreService {
  constructor(private http: HttpClient) {}

  createPublisher(payload: any): Observable<any> {
    return this.http.post('/api/AddPublisher', payload);
  }
}
