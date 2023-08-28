import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class PublisherListStoreService {
  constructor(private http: HttpClient) {}

  getPublisherList(payload: any): Observable<any> {
    return this.http.get("/api/GetPublisher", {params: payload});
  }

  deletePublisher(payload: any): Observable<any> {
    return this.http.delete("/api/DeletePublisher/" + payload.id, payload);
  }
}
