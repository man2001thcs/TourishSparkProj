import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { Observable, of } from "rxjs";
import { catchError, map, mergeMap, switchMap } from "rxjs/operators";
import { MultiSelectMovingListStoreService } from "./multiselect-autocomplete.store.service";
import * as MovingListAction from "./multiselect-autocomplete.store.action";
import { MovingListUnionActions } from "./multiselect-autocomplete.store.action";

@Injectable()
export class MovingAutoCompleteListEffects {
  constructor(
    private action: Actions<MovingListAction.MovingListUnionActions>,
    private storeService: MultiSelectMovingListStoreService
  ) {}

  getMovingList: Observable<any> = createEffect(() =>
    this.action.pipe(
      ofType(MovingListAction.getMovingList),
      map((action) => action.payload),
      switchMap((action) => {
        return this.storeService.getMovingList(action).pipe(
          map((response) => {
            if (response.resultCd === 0) {
              return MovingListAction.getMovingListSuccess({
                response: response,
              });
            } else {
              return MovingListAction.getMovingListFailed({
                response: response,
              });
            }
          }),
          catchError((error) => {
            return of(
              MovingListAction.getMovingListSystemFailed({ error: error })
            );
          })
        );
      })
    )
  );

  getMovingListSuccess: Observable<any> = createEffect(
    () => this.action.pipe(ofType(MovingListAction.getMovingListSuccess)),
    { dispatch: false }
  );

  getMovingListFailed: Observable<any> = createEffect(
    () => this.action.pipe(ofType(MovingListAction.getMovingListFailed)),
    { dispatch: false }
  );

  getMovingListSystemFailed: Observable<any> = createEffect(
    () =>
      this.action.pipe(ofType(MovingListAction.getMovingListSystemFailed)),
    { dispatch: false }
  );
  //getMovingListSuccess
}
