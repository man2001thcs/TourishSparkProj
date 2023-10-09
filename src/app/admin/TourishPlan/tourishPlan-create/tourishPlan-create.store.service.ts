import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TourishPlanStoreService {
  constructor(private http: HttpClient) {}

  createTourishPlan(payload: any): Observable<any> {
    return this.http.post('/api/AddTourishPlan', payload);
  }
}
