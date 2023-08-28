import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PublisherStoreService {
  constructor(private http: HttpClient) {}

  getPublisher(payload: any): Observable<any> {
    return this.http.get('/api/GetPublisher/' + payload.id);
  }

  editPublisher(payload: any): Observable<any> {
    console.log('ok');
    return this.http.put('/api/UpdatePublisher/' + payload.id, payload);
  }
}
