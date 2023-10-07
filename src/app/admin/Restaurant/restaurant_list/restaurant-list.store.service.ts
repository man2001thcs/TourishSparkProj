import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class RestaurantListStoreService {
  constructor(private http: HttpClient) {}

  getRestaurantList(payload: any): Observable<any> {
    return this.http.get("/api/GetRestaurant", {params: payload});
  }

  deleteRestaurant(payload: any): Observable<any> {
    return this.http.delete("/api/DeleteRestaurant/" + payload.id, payload);
  }
}
