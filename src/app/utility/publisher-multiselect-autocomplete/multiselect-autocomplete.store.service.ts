import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class MultiSelectPublisherListStoreService {
  constructor(private http: HttpClient) {}

  getPublisherList(payload: any): Observable<any> {
    return this.http.get("/api/GetPublisher", {params: payload});
  }
}
