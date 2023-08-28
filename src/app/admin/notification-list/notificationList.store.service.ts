import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable, Subject } from "rxjs";
import { NotificationModel } from "./notificationList.component.model";
import {
  HubConnection,
  HubConnectionBuilder,
  LogLevel,
  
} from "@microsoft/signalr";
import proxy_config from "../../proxy_config.json";
import { TokenStorageService } from "src/app/utility/user_service/token.service";

@Injectable({
  providedIn: "root",
})
export class NotificationListStoreService {
  constructor(
    private http: HttpClient,
    private tokenService: TokenStorageService
  ) {}
  //private readonly url = "https://localhost:53985/api/";

  getNotificationList(payload: any): Observable<any> {
    return this.http.get("/api/GetNotification", { params: payload });
  }

  deleteNotification(payload: any): Observable<any> {
    return this.http.delete("/api/DeleteNotification/" + payload.id, payload);
  }
}
