import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BookStoreService {
  constructor(private http: HttpClient) {}

  getBook(payload: any): Observable<any> {
    return this.http.get('/api/GetBook/' + payload.id);
  }

  editBook(payload: any): Observable<any> {
    console.log('ok');
    return this.http.put('/api/UpdateBook/' + payload.id, payload);
  }
}
