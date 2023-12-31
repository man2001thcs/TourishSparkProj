import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserStoreService {
  constructor(private http: HttpClient) {}

  createUser(payload: any): Observable<any> {
    return this.http.post('/api/User/' + payload.signInPhase, payload);
  }
}
