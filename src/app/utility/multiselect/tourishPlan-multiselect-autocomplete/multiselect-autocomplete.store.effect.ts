import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { Observable, of } from "rxjs";
import { catchError, map, mergeMap, switchMap } from "rxjs/operators";
import { MultiSelectTourishPlanListStoreService } from "./multiselect-autocomplete.store.service";
import * as TourishPlanListAction from "./multiselect-autocomplete.store.action";
import { TourishPlanListUnionActions } from "./multiselect-autocomplete.store.action";

@Injectable()
export class TourishPlanAutoCompleteListEffects {
  constructor(
    private action: Actions<TourishPlanListAction.TourishPlanListUnionActions>,
    private storeService: MultiSelectTourishPlanListStoreService
  ) {}

  getTourishPlanList: Observable<any> = createEffect(() =>
    this.action.pipe(
      ofType(TourishPlanListAction.getTourishPlanList),
      map((action) => action.payload),
      switchMap((action) => {
        return this.storeService.getTourishPlanList(action).pipe(
          map((response) => {
            if (response.resultCd === 0) {
              return TourishPlanListAction.getTourishPlanListSuccess({
                response: response,
              });
            } else {
              return TourishPlanListAction.getTourishPlanListFailed({
                response: response,
              });
            }
          }),
          catchError((error) => {
            return of(
              TourishPlanListAction.getTourishPlanListSystemFailed({ error: error })
            );
          })
        );
      })
    )
  );

  getTourishPlanListSuccess: Observable<any> = createEffect(
    () => this.action.pipe(ofType(TourishPlanListAction.getTourishPlanListSuccess)),
    { dispatch: false }
  );

  getTourishPlanListFailed: Observable<any> = createEffect(
    () => this.action.pipe(ofType(TourishPlanListAction.getTourishPlanListFailed)),
    { dispatch: false }
  );

  getTourishPlanListSystemFailed: Observable<any> = createEffect(
    () =>
      this.action.pipe(ofType(TourishPlanListAction.getTourishPlanListSystemFailed)),
    { dispatch: false }
  );
  //getTourishPlanListSuccess
}
