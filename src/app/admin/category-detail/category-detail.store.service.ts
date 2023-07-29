import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CategoryStoreService {
  constructor(private http: HttpClient) {}

  getCategory(payload: any): Observable<any> {
    return this.http.get('/api/api/GetCategory/' + payload.id);
  }

  editCategory(payload: any): Observable<any> {
    console.log('ok');
    return this.http.put('/api/api/UpdateCategory/' + payload.id, payload);
  }
}
