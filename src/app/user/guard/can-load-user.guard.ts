import { Injectable } from '@angular/core';
import { CanLoad, Route, Router, UrlSegment, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { TokenStorageService } from 'src/app/utility/user_service/token.service';
import { UserService } from 'src/app/utility/user_service/user.service';
@Injectable({
  providedIn: 'root',
})
export class CanLoadUserGuard implements CanLoad {
  constructor(private tokenService: TokenStorageService, private router: Router) {}
  canLoad(
    route: Route,
    segments: UrlSegment[]
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
      let roles = route.data?.["permittedRoles"] as Array<string>;
      console.log(roles);
  
      if (roles) {
        if (this.tokenService.getUserRole() === roles[0]) return true;
        else {
          this.router.navigate(["/forbidden"]);
          return false;
        }
      }

      return true;
  }
}
