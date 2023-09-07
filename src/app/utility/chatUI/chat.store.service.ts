import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MessageStoreService {
  constructor(private http: HttpClient) {}

  getMessage(payload: any): Observable<any> {
    return this.http.post('/api/GetMessage', payload);
  }
}
