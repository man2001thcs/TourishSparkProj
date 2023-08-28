import { Injectable, inject } from "@angular/core";
import {
  ActivatedRouteSnapshot,
  CanDeactivate,
  RouterStateSnapshot,
  UrlTree,
} from "@angular/router";
import { Observable } from "rxjs";
import { UserService } from "../../utility/user_service/user.service";
import { AdminService } from "../service/admin.service";
import { CheckDeactivate } from "../interface/admin.check_edit";
@Injectable({
  providedIn: "root",
})
export class CanLeaveEditGuard implements CanDeactivate<CheckDeactivate> {
  constructor(
    private userService: UserService,
    private adminService: AdminService
  ) {}

  canDeactivate(
    component: CheckDeactivate,
    currentRoute: ActivatedRouteSnapshot,
    currentState: RouterStateSnapshot,
    nextState?: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    return component.checkDeactivate(currentRoute, currentState, nextState);
  }
}

export const canLeaveSiteGuard = (
  component: CheckDeactivate,
  currentRoute: ActivatedRouteSnapshot,
  currentState: RouterStateSnapshot,
  nextState?: RouterStateSnapshot
):
  | Observable<boolean | UrlTree>
  | Promise<boolean | UrlTree>
  | boolean
  | UrlTree => {
  return inject(CanLeaveEditGuard).canDeactivate(
    component,
    currentRoute,
    currentState,
    nextState
  );
};
