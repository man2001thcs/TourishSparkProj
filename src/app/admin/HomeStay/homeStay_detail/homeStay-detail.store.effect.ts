import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Observable, of } from 'rxjs';
import { catchError, map, mergeMap, switchMap } from 'rxjs/operators';
import { HomeStayStoreService } from './homeStay-detail.store.service';
import * as HomeStayAction from './homeStay-detail.store.action';
import { HomeStayUnionActions } from './homeStay-detail.store.action';

@Injectable()
export class HomeStayEffects {
  constructor(
    private action: Actions<HomeStayAction.HomeStayUnionActions>,
    private storeService: HomeStayStoreService
  ) {}

  getHomeStay: Observable<any> = createEffect(() =>
    this.action.pipe(
      ofType(HomeStayAction.getHomeStay),
      map((action) => action.payload),
      switchMap((action) => {
        return this.storeService.getHomeStay(action).pipe(
          map((response) => {
            if (response.resultCd === 0) {
              return HomeStayAction.getHomeStaySuccess({
                response: response,
              });
            } else {
              return HomeStayAction.getHomeStayFailed({
                response: response,
              });
            }
          }),
          catchError((error) => {
            return of(HomeStayAction.getHomeStaySystemFailed({ error: error }));
          })
        );
      })
    )
  );

  getHomeStaySuccess: Observable<any> = createEffect(
    () => this.action.pipe(ofType(HomeStayAction.getHomeStaySuccess)),
    { dispatch: false }
  );

  getHomeStayFailed: Observable<any> = createEffect(
    () => this.action.pipe(ofType(HomeStayAction.getHomeStayFailed)),
    { dispatch: false }
  );

  getHomeStaySystemFailed: Observable<any> = createEffect(
    () => this.action.pipe(ofType(HomeStayAction.getHomeStaySystemFailed)),
    { dispatch: false }
  );

  editHomeStay: Observable<any> = createEffect(() =>
    this.action.pipe(
      ofType(HomeStayAction.editHomeStay),
      map((action) => action.payload),
      switchMap((action) => {
        return this.storeService.editHomeStay(action).pipe(
          map((response) => {
            console.log("abcd", response);
            if (response.resultCd === 0) {
              console.log(response);
              return HomeStayAction.editHomeStaySuccess({
                response: response,
              });
            } else {
              return HomeStayAction.editHomeStayFailed({
                response: response,
              });
            }
          }),
          catchError((error) => {
            return of(HomeStayAction.editHomeStaySystemFailed({ error: error }));
          })
        );
      })
    )
  );

  editHomeStaySuccess: Observable<any> = createEffect(
    () => this.action.pipe(ofType(HomeStayAction.editHomeStaySuccess)),
    { dispatch: false }
  );

  editHomeStayFailed: Observable<any> = createEffect(
    () => this.action.pipe(ofType(HomeStayAction.editHomeStayFailed)),
    { dispatch: false }
  );

  editHomeStaySystemFailed: Observable<any> = createEffect(
    () => this.action.pipe(ofType(HomeStayAction.editHomeStaySystemFailed)),
    { dispatch: false }
  );

  //editHomeStaySuccess
}
