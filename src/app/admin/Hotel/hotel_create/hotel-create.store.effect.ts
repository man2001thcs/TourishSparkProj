import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Observable, of } from 'rxjs';
import { catchError, map, mergeMap, switchMap } from 'rxjs/operators';
import { HotelStoreService } from './hotel-create.store.service';
import * as HotelAction from './hotel-create.store.action';
import { HotelUnionActions } from './hotel-create.store.action';

@Injectable()
export class HotelCreateEffects {
  constructor(
    private action: Actions<HotelAction.HotelUnionActions>,
    private storeService: HotelStoreService
  ) {}

  createHotel: Observable<any> = createEffect(() =>
    this.action.pipe(
      ofType(HotelAction.createHotel),
      map((action) => action.payload),
      switchMap((action) => {
        return this.storeService.createHotel(action).pipe(
          map((response) => {
            console.log("abcd", response);
            if (response.resultCd === 0) {
              console.log(response);
              return HotelAction.createHotelSuccess({
                response: response,
              });
            } else {
              return HotelAction.createHotelFailed({
                response: response,
              });
            }
          }),
          catchError((error) => {
            return of(HotelAction.createHotelSystemFailed({ error: error }));
          })
        );
      })
    )
  );

  createHotelSuccess: Observable<any> = createEffect(
    () => this.action.pipe(ofType(HotelAction.createHotelSuccess)),
    { dispatch: false }
  );

  createHotelFailed: Observable<any> = createEffect(
    () => this.action.pipe(ofType(HotelAction.createHotelFailed)),
    { dispatch: false }
  );

  createHotelSystemFailed: Observable<any> = createEffect(
    () => this.action.pipe(ofType(HotelAction.createHotelSystemFailed)),
    { dispatch: false }
  );

  //createHotelSuccess
}
