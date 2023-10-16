import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class MultiSelectTourishPlanListStoreService {
  constructor(private http: HttpClient) {}

  getTourishPlanList(payload: any): Observable<any> {
    return this.http.get("/api/GetTourishPlan", {params: payload});
  }
}
