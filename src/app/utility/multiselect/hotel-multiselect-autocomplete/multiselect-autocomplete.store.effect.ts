import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { Observable, of } from "rxjs";
import { catchError, map, mergeMap, switchMap } from "rxjs/operators";
import { MultiSelectHotelListStoreService } from "./multiselect-autocomplete.store.service";
import * as HotelListAction from "./multiselect-autocomplete.store.action";
import { HotelListUnionActions } from "./multiselect-autocomplete.store.action";

@Injectable()
export class HotelAutoCompleteListEffects {
  constructor(
    private action: Actions<HotelListAction.HotelListUnionActions>,
    private storeService: MultiSelectHotelListStoreService
  ) {}

  getHotelList: Observable<any> = createEffect(() =>
    this.action.pipe(
      ofType(HotelListAction.getHotelList),
      map((action) => action.payload),
      switchMap((action) => {
        return this.storeService.getHotelList(action).pipe(
          map((response) => {
            if (response.resultCd === 0) {
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
  //getHotelListSuccess
}
