import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class VoucherStoreService {
  constructor(private http: HttpClient) {}

  getVoucher(payload: any): Observable<any> {
    return this.http.get('/api/GetVoucher/' + payload.id);
  }

  editVoucher(payload: any): Observable<any> {
    console.log('ok');
    return this.http.put('/api/UpdateVoucher/' + payload.id, payload);
  }
}
