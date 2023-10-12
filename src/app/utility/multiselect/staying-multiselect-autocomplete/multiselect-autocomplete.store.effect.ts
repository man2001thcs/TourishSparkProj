import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { Observable, of } from "rxjs";
import { catchError, map, mergeMap, switchMap } from "rxjs/operators";
import { MultiSelectStayingListStoreService } from "./multiselect-autocomplete.store.service";
import * as StayingListAction from "./multiselect-autocomplete.store.action";
import { StayingListUnionActions } from "./multiselect-autocomplete.store.action";

@Injectable()
export class StayingAutoCompleteListEffects {
  constructor(
    private action: Actions<StayingListAction.StayingListUnionActions>,
    private storeService: MultiSelectStayingListStoreService
  ) {}

  getStayingList: Observable<any> = createEffect(() =>
    this.action.pipe(
      ofType(StayingListAction.getStayingList),
      map((action) => action.payload),
      switchMap((action) => {
        return this.storeService.getStayingList(action).pipe(
          map((response) => {
            if (response.resultCd === 0) {
              return StayingListAction.getStayingListSuccess({
                response: response,
              });
            } else {
              return StayingListAction.getStayingListFailed({
                response: response,
              });
            }
          }),
          catchError((error) => {
            return of(
              StayingListAction.getStayingListSystemFailed({ error: error })
            );
          })
        );
      })
    )
  );

  getStayingListSuccess: Observable<any> = createEffect(
    () => this.action.pipe(ofType(StayingListAction.getStayingListSuccess)),
    { dispatch: false }
  );

  getStayingListFailed: Observable<any> = createEffect(
    () => this.action.pipe(ofType(StayingListAction.getStayingListFailed)),
    { dispatch: false }
  );

  getStayingListSystemFailed: Observable<any> = createEffect(
    () =>
      this.action.pipe(ofType(StayingListAction.getStayingListSystemFailed)),
    { dispatch: false }
  );
  //getStayingListSuccess
}
