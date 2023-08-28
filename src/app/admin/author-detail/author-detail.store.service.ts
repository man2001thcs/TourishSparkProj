import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthorStoreService {
  constructor(private http: HttpClient) {}

  getAuthor(payload: any): Observable<any> {
    return this.http.get('/api/GetAuthor/' + payload.id);
  }

  editAuthor(payload: any): Observable<any> {
    console.log('ok');
    return this.http.put('/api/UpdateAuthor/' + payload.id, payload);
  }
}
