import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BookStoreService {
  constructor(private http: HttpClient) {}

  createBook(payload: any): Observable<any> {
    return this.http.post('/api/AddBook', payload);
  }
}
