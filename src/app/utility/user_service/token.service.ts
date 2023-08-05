import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MessageService } from './message.service';

const TOKEN_KEY = 'auth-token';
const REFRESHTOKEN_KEY = 'auth-refreshtoken';
const USER_KEY = 'auth-user';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root',
})
export class TokenStorageService {
  constructor(private http: HttpClient) {}

  signOut(): void {
    window.sessionStorage.clear();
  }

  public saveToken(token: string): void {
    window.sessionStorage.removeItem(TOKEN_KEY);
    window.sessionStorage.setItem(TOKEN_KEY, token);

    const user = this.getUser();
    if (user.id) {
      this.saveUser({ ...user, accessToken: token });
    }
  }

  public getToken(): string {
    return window.sessionStorage.getItem(TOKEN_KEY) ?? "";
  }

  public saveRefreshToken(token: string): void {
    window.sessionStorage.removeItem(REFRESHTOKEN_KEY);
    window.sessionStorage.setItem(REFRESHTOKEN_KEY, token);
  }

  public getRefreshToken(): string {
    return window.sessionStorage.getItem(REFRESHTOKEN_KEY) ?? "";
  }

  public saveUser(user: any): void {
    window.sessionStorage.removeItem(USER_KEY);
    window.sessionStorage.setItem(USER_KEY, JSON.stringify(user));
  }

  public getUser(): any {
    const user = window.sessionStorage.getItem(USER_KEY);
    if (user) {
      return JSON.parse(user);
    }
    return {};
  }

  public getUserRole(): string {
    const user = window.sessionStorage.getItem(USER_KEY);
    if (user) {
      return JSON.parse(user).Role;
    }
    return "";
  }

  refreshToken(accessToken: string, refreshToken: string) {
    return this.http.post('/api/api/User/RenewToken', {
      accessToken: accessToken,
      refreshToken: refreshToken
    }, httpOptions);
  }

  // public roleMatch(allowedRoles): boolean {
  //   var isMatch = false;
  //   var payLoad = JSON.parse(window.atob(this.getUser().split('.')[1]));
  //   var userRole = payLoad.role;
  //   allowedRoles.forEach(element => {
  //     if (userRole == element) {
  //       isMatch = true;
  //       return false;
  //     }
  //   });
  //   return isMatch;
  // }
}
