import { Injectable } from '@angular/core';
import { CanLoad, Route, UrlSegment, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from 'src/app/utility/user_service/user.service';
@Injectable({
  providedIn: 'root'
})
export class CanLoadGuardAdmin implements CanLoad {
  constructor(private userService: UserService){}
  canLoad(
    route: Route,
    segments: UrlSegment[]): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return (this.userService.current_user.id_admin === 1);
  }
}
