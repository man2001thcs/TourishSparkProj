import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class AirPlaneListStoreService {
  constructor(private http: HttpClient) {}

  getAirPlaneList(payload: any): Observable<any> {
    return this.http.get("/api/GetAirPlane", {params: payload});
  }

  deleteAirPlane(payload: any): Observable<any> {
    return this.http.delete("/api/DeleteAirPlane/" + payload.id, payload);
  }
}
