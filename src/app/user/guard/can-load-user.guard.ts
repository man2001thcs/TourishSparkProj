import { Injectable } from '@angular/core';
import { CanLoad, Route, UrlSegment, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from 'src/app/utility/user_service/user.service';
@Injectable({
  providedIn: 'root',
})
export class CanLoadUserGuard implements CanLoad {
  constructor(private userService: UserService) {}
  canLoad(
    route: Route,
    segments: UrlSegment[]
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    let user_account = this.userService.current_user.email;
    let isadmin = this.userService.current_user.id_admin;
    console.log(user_account);
    if (user_account != '' && isadmin !== 1) {
      return true;
    } else return true;
  }
}
