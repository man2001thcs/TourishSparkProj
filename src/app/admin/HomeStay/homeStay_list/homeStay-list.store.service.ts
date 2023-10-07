import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class HomeStayListStoreService {
  constructor(private http: HttpClient) {}

  getHomeStayList(payload: any): Observable<any> {
    return this.http.get("/api/GetHomeStay", {params: payload});
  }

  deleteHomeStay(payload: any): Observable<any> {
    return this.http.delete("/api/DeleteHomeStay/" + payload.id, payload);
  }
}
