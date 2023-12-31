import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PassengerCarStoreService {
  constructor(private http: HttpClient) {}

  getPassengerCar(payload: any): Observable<any> {
    return this.http.get('/api/GetPassengerCar/' + payload.id);
  }

  editPassengerCar(payload: any): Observable<any> {
    console.log('ok');
    return this.http.put('/api/UpdatePassengerCar/' + payload.id, payload);
  }
}
