import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class UserStoreService {
  constructor(private http: HttpClient) {}

  getUser(payload: any): Observable<any> {
    return this.http.post("/api/User/GetUser", null, {
      params: payload,
    });
  }

  editUser(payload: any): Observable<any> {
    console.log("ok");
    return this.http.put("/api/UpdateUser/" + payload.id, payload);
  }
}
