import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class VoucherListStoreService {
  constructor(private http: HttpClient) {}

  getVoucherList(payload: any): Observable<any> {
    return this.http.get("/api/GetVoucher", {params: payload});
  }

  deleteVoucher(payload: any): Observable<any> {
    return this.http.delete("/api/DeleteVoucher/" + payload.id, payload);
  }
}
