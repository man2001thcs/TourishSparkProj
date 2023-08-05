import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CategoryStoreService {
  constructor(private http: HttpClient) {}

  createCategory(payload: any): Observable<any> {
    return this.http.post('/api/AddCategory', payload);
  }
}
