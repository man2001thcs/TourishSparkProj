import { Injectable } from '@angular/core';
import { CanLoad, Route, UrlSegment, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { TokenStorageService } from 'src/app/utility/user_service/token.service';
import { UserService } from 'src/app/utility/user_service/user.service';
@Injectable({
  providedIn: 'root',
})
export class CanLoadUserGuard implements CanLoad {
  constructor(private tokenService: TokenStorageService) {}
  canLoad(
    route: Route,
    segments: UrlSegment[]
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    let user = this.tokenService.getUser();

    if (user.Role) {
      return true;
    } else return true;
  }
}
