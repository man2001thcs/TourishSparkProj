import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { Observable, of } from "rxjs";
import { catchError, map, mergeMap, switchMap } from "rxjs/operators";
import { HomeStayListStoreService } from "./homeStay-list.store.service";
import * as HomeStayListAction from "./homeStay-list.store.action";
import { HomeStayListUnionActions } from "./homeStay-list.store.action";

@Injectable()
export class HomeStayListEffects {
  constructor(
    private action: Actions<HomeStayListAction.HomeStayListUnionActions>,
    private storeService: HomeStayListStoreService
  ) {}

  getHomeStayList: Observable<any> = createEffect(() =>
    this.action.pipe(
      ofType(HomeStayListAction.getHomeStayList),
      map((action) => action.payload),
      switchMap((action) => {
        return this.storeService.getHomeStayList(action).pipe(
          map((response) => {
            console.log(response);
            if (response.resultCd === 0) {
              console.log(response);
              return HomeStayListAction.getHomeStayListSuccess({
                response: response,
              });
            } else {
              return HomeStayListAction.getHomeStayListFailed({
                response: response,
              });
            }
          }),
          catchError((error) => {
            return of(
              HomeStayListAction.getHomeStayListSystemFailed({ error: error })
            );
          })
        );
      })
    )
  );

  getHomeStayListSuccess: Observable<any> = createEffect(
    () => this.action.pipe(ofType(HomeStayListAction.getHomeStayListSuccess)),
    { dispatch: false }
  );

  getHomeStayListFailed: Observable<any> = createEffect(
    () => this.action.pipe(ofType(HomeStayListAction.getHomeStayListFailed)),
    { dispatch: false }
  );

  getHomeStayListSystemFailed: Observable<any> = createEffect(
    () =>
      this.action.pipe(ofType(HomeStayListAction.getHomeStayListSystemFailed)),
    { dispatch: false }
  );

  deleteHomeStay: Observable<any> = createEffect(() =>
    this.action.pipe(
      ofType(HomeStayListAction.deleteHomeStay),
      map((action) => action.payload),
      switchMap((action) => {
        return this.storeService.deleteHomeStay(action).pipe(
          map((response) => {
            console.log(response);
            if (response.resultCd === 0) {
              console.log(response);
              return HomeStayListAction.deleteHomeStaySuccess({
                response: response,
              });
            } else {
              return HomeStayListAction.deleteHomeStayFailed({
                response: response,
              });
            }
          }),
          catchError((error) => {
            return of(
              HomeStayListAction.deleteHomeStaySystemFailed({ error: error })
            );
          })
        );
      })
    )
  );

  deleteHomeStayListSuccess: Observable<any> = createEffect(
    () => this.action.pipe(ofType(HomeStayListAction.deleteHomeStaySuccess)),
    { dispatch: false }
  );

  deleteHomeStayListFailed: Observable<any> = createEffect(
    () => this.action.pipe(ofType(HomeStayListAction.deleteHomeStayFailed)),
    { dispatch: false }
  );

  deleteHomeStayListSystemFailed: Observable<any> = createEffect(
    () =>
      this.action.pipe(ofType(HomeStayListAction.deleteHomeStaySystemFailed)),
    { dispatch: false }
  );

  //getHomeStayListSuccess
}
