import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Observable, of } from 'rxjs';
import { catchError, map, mergeMap, switchMap } from 'rxjs/operators';
import { AirPlaneDetailStoreService } from './air_plane-detail.store.service';
import * as AirPlaneAction from './air_plane-detail.store.action';
import { AirPlaneUnionActions } from './air_plane-detail.store.action';

@Injectable()
export class AirPlaneEffects {
  constructor(
    private action: Actions<AirPlaneAction.AirPlaneUnionActions>,
    private storeService: AirPlaneDetailStoreService
  ) {}

  getAirPlane: Observable<any> = createEffect(() =>
    this.action.pipe(
      ofType(AirPlaneAction.getAirPlane),
      map((action) => action.payload),
      switchMap((action) => {
        return this.storeService.getAirPlane(action).pipe(
          map((response) => {
            if (response.resultCd === 0) {
              return AirPlaneAction.getAirPlaneSuccess({
                response: response,
              });
            } else {
              return AirPlaneAction.getAirPlaneFailed({
                response: response,
              });
            }
          }),
          catchError((error) => {
            return of(AirPlaneAction.getAirPlaneSystemFailed({ error: error }));
          })
        );
      })
    )
  );

  getAirPlaneSuccess: Observable<any> = createEffect(
    () => this.action.pipe(ofType(AirPlaneAction.getAirPlaneSuccess)),
    { dispatch: false }
  );

  getAirPlaneFailed: Observable<any> = createEffect(
    () => this.action.pipe(ofType(AirPlaneAction.getAirPlaneFailed)),
    { dispatch: false }
  );

  getAirPlaneSystemFailed: Observable<any> = createEffect(
    () => this.action.pipe(ofType(AirPlaneAction.getAirPlaneSystemFailed)),
    { dispatch: false }
  );

  editAirPlane: Observable<any> = createEffect(() =>
    this.action.pipe(
      ofType(AirPlaneAction.editAirPlane),
      map((action) => action.payload),
      switchMap((action) => {
        return this.storeService.editAirPlane(action).pipe(
          map((response) => {
            console.log("abcd", response);
            if (response.resultCd === 0) {
              console.log(response);
              return AirPlaneAction.editAirPlaneSuccess({
                response: response,
              });
            } else {
              return AirPlaneAction.editAirPlaneFailed({
                response: response,
              });
            }
          }),
          catchError((error) => {
            return of(AirPlaneAction.editAirPlaneSystemFailed({ error: error }));
          })
        );
      })
    )
  );

  editAirPlaneSuccess: Observable<any> = createEffect(
    () => this.action.pipe(ofType(AirPlaneAction.editAirPlaneSuccess)),
    { dispatch: false }
  );

  editAirPlaneFailed: Observable<any> = createEffect(
    () => this.action.pipe(ofType(AirPlaneAction.editAirPlaneFailed)),
    { dispatch: false }
  );

  editAirPlaneSystemFailed: Observable<any> = createEffect(
    () => this.action.pipe(ofType(AirPlaneAction.editAirPlaneSystemFailed)),
    { dispatch: false }
  );

  //editAirPlaneSuccess
}
