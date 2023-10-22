import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { Observable, of } from "rxjs";
import { catchError, map, mergeMap, switchMap } from "rxjs/operators";
import { HotelListStoreService } from "./hotel-list.store.service";
import * as HotelListAction from "./hotel-list.store.action";
import { HotelListUnionActions } from "./hotel-list.store.action";

@Injectable()
export class HotelListEffects {
  constructor(
    private action: Actions<HotelListAction.HotelListUnionActions>,
    private storeService: HotelListStoreService
  ) {}

  getHotelList: Observable<any> = createEffect(() =>
    this.action.pipe(
      ofType(HotelListAction.getHotelList),
      map((action) => action.payload),
      switchMap((action) => {
        return this.storeService.getHotelList(action).pipe(
          map((response) => {
            if (response.resultCd === 0) {
              console.log(response);
              return HotelListAction.getHotelListSuccess({
                response: response,
              });
            } else {
              return HotelListAction.getHotelListFailed({
                response: response,
              });
            }
          }),
          catchError((error) => {
            return of(
              HotelListAction.getHotelListSystemFailed({ error: error })
            );
          })
        );
      })
    )
  );

  getHotelListSuccess: Observable<any> = createEffect(
    () => this.action.pipe(ofType(HotelListAction.getHotelListSuccess)),
    { dispatch: false }
  );

  getHotelListFailed: Observable<any> = createEffect(
    () => this.action.pipe(ofType(HotelListAction.getHotelListFailed)),
    { dispatch: false }
  );

  getHotelListSystemFailed: Observable<any> = createEffect(
    () =>
      this.action.pipe(ofType(HotelListAction.getHotelListSystemFailed)),
    { dispatch: false }
  );

  deleteHotel: Observable<any> = createEffect(() =>
    this.action.pipe(
      ofType(HotelListAction.deleteHotel),
      map((action) => action.payload),
      switchMap((action) => {
        return this.storeService.deleteHotel(action).pipe(
          map((response) => {
            if (response.resultCd === 0) {
              return HotelListAction.deleteHotelSuccess({
                response: response,
              });
            } else {
              return HotelListAction.deleteHotelFailed({
                response: response,
              });
            }
          }),
          catchError((error) => {
            return of(
              HotelListAction.deleteHotelSystemFailed({ error: error })
            );
          })
        );
      })
    )
  );

  deleteHotelListSuccess: Observable<any> = createEffect(
    () => this.action.pipe(ofType(HotelListAction.deleteHotelSuccess)),
    { dispatch: false }
  );

  deleteHotelListFailed: Observable<any> = createEffect(
    () => this.action.pipe(ofType(HotelListAction.deleteHotelFailed)),
    { dispatch: false }
  );

  deleteHotelListSystemFailed: Observable<any> = createEffect(
    () =>
      this.action.pipe(ofType(HotelListAction.deleteHotelSystemFailed)),
    { dispatch: false }
  );

  //getHotelListSuccess
}
