import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Observable, of } from 'rxjs';
import { catchError, map, mergeMap, switchMap } from 'rxjs/operators';
import { AirPlaneCreateStoreService } from './air_plane-create.store.service';
import * as AirPlaneAction from './air_plane-create.store.action';
import { AirPlaneUnionActions } from './air_plane-create.store.action';

@Injectable()
export class AirPlaneCreateEffects {
  constructor(
    private action: Actions<AirPlaneAction.AirPlaneUnionActions>,
    private storeService: AirPlaneCreateStoreService
  ) {}

  createAirPlane: Observable<any> = createEffect(() =>
    this.action.pipe(
      ofType(AirPlaneAction.createAirPlane),
      map((action) => action.payload),
      switchMap((action) => {
        return this.storeService.createAirPlane(action).pipe(
          map((response) => {
            console.log("abcd", response);
            if (response.resultCd === 0) {
              console.log(response);
              return AirPlaneAction.createAirPlaneSuccess({
                response: response,
              });
            } else {
              return AirPlaneAction.createAirPlaneFailed({
                response: response,
              });
            }
          }),
          catchError((error) => {
            return of(AirPlaneAction.createAirPlaneSystemFailed({ error: error }));
          })
        );
      })
    )
  );

  createAirPlaneSuccess: Observable<any> = createEffect(
    () => this.action.pipe(ofType(AirPlaneAction.createAirPlaneSuccess)),
    { dispatch: false }
  );

  createAirPlaneFailed: Observable<any> = createEffect(
    () => this.action.pipe(ofType(AirPlaneAction.createAirPlaneFailed)),
    { dispatch: false }
  );

  createAirPlaneSystemFailed: Observable<any> = createEffect(
    () => this.action.pipe(ofType(AirPlaneAction.createAirPlaneSystemFailed)),
    { dispatch: false }
  );

  //createAirPlaneSuccess
}
