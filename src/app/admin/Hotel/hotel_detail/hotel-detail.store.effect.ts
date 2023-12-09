import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Observable, of } from 'rxjs';
import { catchError, map, mergeMap, switchMap } from 'rxjs/operators';
import { HotelStoreService } from './hotel-detail.store.service';
import * as HotelAction from './hotel-detail.store.action';
import { HotelUnionActions } from './hotel-detail.store.action';

@Injectable()
export class HotelEffects {
  constructor(
    private action: Actions<HotelAction.HotelUnionActions>,
    private storeService: HotelStoreService
  ) {}

  getHotel: Observable<any> = createEffect(() =>
    this.action.pipe(
      ofType(HotelAction.getHotel),
      map((action) => action.payload),
      switchMap((action) => {
        return this.storeService.getHotel(action).pipe(
          map((response) => {
            if (response.resultCd === 0) {
              console.log(response);
              return HotelAction.getHotelSuccess({
                response: response,
              });
            } else {
              return HotelAction.getHotelFailed({
                response: response,
              });
            }
          }),
          catchError((error) => {
            return of(HotelAction.getHotelSystemFailed({ error: error }));
          })
        );
      })
    )
  );

  getHotelSuccess: Observable<any> = createEffect(
    () => this.action.pipe(ofType(HotelAction.getHotelSuccess)),
    { dispatch: false }
  );

  getHotelFailed: Observable<any> = createEffect(
    () => this.action.pipe(ofType(HotelAction.getHotelFailed)),
    { dispatch: false }
  );

  getHotelSystemFailed: Observable<any> = createEffect(
    () => this.action.pipe(ofType(HotelAction.getHotelSystemFailed)),
    { dispatch: false }
  );

  editHotel: Observable<any> = createEffect(() =>
    this.action.pipe(
      ofType(HotelAction.editHotel),
      map((action) => action.payload),
      switchMap((action) => {
        return this.storeService.editHotel(action).pipe(
          map((response) => {
            console.log("abcd", response);
            if (response.resultCd === 0) {
              console.log(response);
              return HotelAction.editHotelSuccess({
                response: response,
              });
            } else {
              return HotelAction.editHotelFailed({
                response: response,
              });
            }
          }),
          catchError((error) => {
            return of(HotelAction.editHotelSystemFailed({ error: error }));
          })
        );
      })
    )
  );

  editHotelSuccess: Observable<any> = createEffect(
    () => this.action.pipe(ofType(HotelAction.editHotelSuccess)),
    { dispatch: false }
  );

  editHotelFailed: Observable<any> = createEffect(
    () => this.action.pipe(ofType(HotelAction.editHotelFailed)),
    { dispatch: false }
  );

  editHotelSystemFailed: Observable<any> = createEffect(
    () => this.action.pipe(ofType(HotelAction.editHotelSystemFailed)),
    { dispatch: false }
  );

  //editHotelSuccess
}
