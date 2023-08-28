import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthorStoreService {
  constructor(private http: HttpClient) {}

  createAuthor(payload: any): Observable<any> {
    return this.http.post('/api/AddAuthor', payload);
  }
}
