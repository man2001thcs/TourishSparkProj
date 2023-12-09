import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class MultiSelectEatingListStoreService {
  constructor(private http: HttpClient) {}

  getEatingList(payload: any): Observable<any> {
    return this.http.get("/api/GetRestaurant", {params: payload});
  }
}
