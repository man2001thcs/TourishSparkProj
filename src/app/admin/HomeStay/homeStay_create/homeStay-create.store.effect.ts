import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Observable, of } from 'rxjs';
import { catchError, map, mergeMap, switchMap } from 'rxjs/operators';
import { HomeStayStoreService } from './homeStay-create.store.service';
import * as HomeStayAction from './homeStay-create.store.action';
import { HomeStayUnionActions } from './homeStay-create.store.action';

@Injectable()
export class HomeStayCreateEffects {
  constructor(
    private action: Actions<HomeStayAction.HomeStayUnionActions>,
    private storeService: HomeStayStoreService
  ) {}

  createHomeStay: Observable<any> = createEffect(() =>
    this.action.pipe(
      ofType(HomeStayAction.createHomeStay),
      map((action) => action.payload),
      switchMap((action) => {
        return this.storeService.createHomeStay(action).pipe(
          map((response) => {
            console.log("abcd", response);
            if (response.resultCd === 0) {
              console.log(response);
              return HomeStayAction.createHomeStaySuccess({
                response: response,
              });
            } else {
              return HomeStayAction.createHomeStayFailed({
                response: response,
              });
            }
          }),
          catchError((error) => {
            return of(HomeStayAction.createHomeStaySystemFailed({ error: error }));
          })
        );
      })
    )
  );

  createHomeStaySuccess: Observable<any> = createEffect(
    () => this.action.pipe(ofType(HomeStayAction.createHomeStaySuccess)),
    { dispatch: false }
  );

  createHomeStayFailed: Observable<any> = createEffect(
    () => this.action.pipe(ofType(HomeStayAction.createHomeStayFailed)),
    { dispatch: false }
  );

  createHomeStaySystemFailed: Observable<any> = createEffect(
    () => this.action.pipe(ofType(HomeStayAction.createHomeStaySystemFailed)),
    { dispatch: false }
  );

  //createHomeStaySuccess
}
