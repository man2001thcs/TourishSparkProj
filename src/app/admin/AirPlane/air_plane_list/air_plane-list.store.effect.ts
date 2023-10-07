import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { Observable, of } from "rxjs";
import { catchError, map, mergeMap, switchMap } from "rxjs/operators";
import { AirPlaneListStoreService } from "./air_plane_car-list.store.service";
import * as AirPlaneListAction from "./air_plane-list.store.action";
import { AirPlaneListUnionActions } from "./air_plane-list.store.action";

@Injectable()
export class AirPlaneListEffects {
  constructor(
    private action: Actions<AirPlaneListAction.AirPlaneListUnionActions>,
    private storeService: AirPlaneListStoreService
  ) {}

  getAirPlaneList: Observable<any> = createEffect(() =>
    this.action.pipe(
      ofType(AirPlaneListAction.getAirPlaneList),
      map((action) => action.payload),
      switchMap((action) => {
        return this.storeService.getAirPlaneList(action).pipe(
          map((response) => {
            console.log(response);
            if (response.resultCd === 0) {
              console.log(response);
              return AirPlaneListAction.getAirPlaneListSuccess({
                response: response,
              });
            } else {
              return AirPlaneListAction.getAirPlaneListFailed({
                response: response,
              });
            }
          }),
          catchError((error) => {
            return of(
              AirPlaneListAction.getAirPlaneListSystemFailed({ error: error })
            );
          })
        );
      })
    )
  );

  getAirPlaneListSuccess: Observable<any> = createEffect(
    () => this.action.pipe(ofType(AirPlaneListAction.getAirPlaneListSuccess)),
    { dispatch: false }
  );

  getAirPlaneListFailed: Observable<any> = createEffect(
    () => this.action.pipe(ofType(AirPlaneListAction.getAirPlaneListFailed)),
    { dispatch: false }
  );

  getAirPlaneListSystemFailed: Observable<any> = createEffect(
    () =>
      this.action.pipe(ofType(AirPlaneListAction.getAirPlaneListSystemFailed)),
    { dispatch: false }
  );

  deleteAirPlane: Observable<any> = createEffect(() =>
    this.action.pipe(
      ofType(AirPlaneListAction.deleteAirPlane),
      map((action) => action.payload),
      switchMap((action) => {
        return this.storeService.deleteAirPlane(action).pipe(
          map((response) => {
            console.log(response);
            if (response.resultCd === 0) {
              console.log(response);
              return AirPlaneListAction.deleteAirPlaneSuccess({
                response: response,
              });
            } else {
              return AirPlaneListAction.deleteAirPlaneFailed({
                response: response,
              });
            }
          }),
          catchError((error) => {
            return of(
              AirPlaneListAction.deleteAirPlaneSystemFailed({ error: error })
            );
          })
        );
      })
    )
  );

  deleteAirPlaneListSuccess: Observable<any> = createEffect(
    () => this.action.pipe(ofType(AirPlaneListAction.deleteAirPlaneSuccess)),
    { dispatch: false }
  );

  deleteAirPlaneListFailed: Observable<any> = createEffect(
    () => this.action.pipe(ofType(AirPlaneListAction.deleteAirPlaneFailed)),
    { dispatch: false }
  );

  deleteAirPlaneListSystemFailed: Observable<any> = createEffect(
    () =>
      this.action.pipe(ofType(AirPlaneListAction.deleteAirPlaneSystemFailed)),
    { dispatch: false }
  );

  //getAirPlaneListSuccess
}
