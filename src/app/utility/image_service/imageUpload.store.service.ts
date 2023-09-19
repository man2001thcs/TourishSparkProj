import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class ImageListStoreService {
  constructor(private http: HttpClient) {}

  getImageList(payload: any): Observable<any> {
    return this.http.get("/api/GetFile", { params: payload });
  }

  deleteImage(payload: any): Observable<any> {
    return this.http.post("/api/FileDelete", payload);
  }
}
