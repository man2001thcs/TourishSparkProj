import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class BookListStoreService {
  constructor(private http: HttpClient) {}

  getBookList(payload: any): Observable<any> {
    return this.http.get("/api/GetBook", {params: payload});
  }
}
