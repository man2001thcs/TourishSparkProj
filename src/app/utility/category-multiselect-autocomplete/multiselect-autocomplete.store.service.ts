import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class MultiSelectCategoryListStoreService {
  constructor(private http: HttpClient) {}

  getCategoryList(payload: any): Observable<any> {
    return this.http.get("/api/GetCategory", {params: payload});
  }
}
