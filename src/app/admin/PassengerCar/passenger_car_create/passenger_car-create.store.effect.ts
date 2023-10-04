import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Observable, of } from 'rxjs';
import { catchError, map, mergeMap, switchMap } from 'rxjs/operators';
import { PassengerCarStoreService } from './passenger_car-create.store.service';
import * as PassengerCarAction from './passenger_car-create.store.action';
import { PassengerCarUnionActions } from './passenger_car-create.store.action';

@Injectable()
export class PassengerCarCreateEffects {
  constructor(
    private action: Actions<PassengerCarAction.PassengerCarUnionActions>,
    private storeService: PassengerCarStoreService
  ) {}

  createPassengerCar: Observable<any> = createEffect(() =>
    this.action.pipe(
      ofType(PassengerCarAction.createPassengerCar),
      map((action) => action.payload),
      switchMap((action) => {
        return this.storeService.createPassengerCar(action).pipe(
          map((response) => {
            console.log("abcd", response);
            if (response.resultCd === 0) {
              console.log(response);
              return PassengerCarAction.createPassengerCarSuccess({
                response: response,
              });
            } else {
              return PassengerCarAction.createPassengerCarFailed({
                response: response,
              });
            }
          }),
          catchError((error) => {
            return of(PassengerCarAction.createPassengerCarSystemFailed({ error: error }));
          })
        );
      })
    )
  );

  createPassengerCarSuccess: Observable<any> = createEffect(
    () => this.action.pipe(ofType(PassengerCarAction.createPassengerCarSuccess)),
    { dispatch: false }
  );

  createPassengerCarFailed: Observable<any> = createEffect(
    () => this.action.pipe(ofType(PassengerCarAction.createPassengerCarFailed)),
    { dispatch: false }
  );

  createPassengerCarSystemFailed: Observable<any> = createEffect(
    () => this.action.pipe(ofType(PassengerCarAction.createPassengerCarSystemFailed)),
    { dispatch: false }
  );

  //createPassengerCarSuccess
}
