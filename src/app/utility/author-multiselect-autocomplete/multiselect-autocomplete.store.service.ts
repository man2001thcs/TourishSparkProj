import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class MultiSelectAuthorListStoreService {
  constructor(private http: HttpClient) {}

  getAuthorList(payload: any): Observable<any> {
    return this.http.get("/api/GetAuthor", {params: payload});
  }
}
