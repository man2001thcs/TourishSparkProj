import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { Observable, of } from "rxjs";
import { catchError, map, mergeMap, switchMap } from "rxjs/operators";
import { MultiSelectEatingListStoreService } from "./multiselect-autocomplete.store.service";
import * as EatingListAction from "./multiselect-autocomplete.store.action";
import { EatingListUnionActions } from "./multiselect-autocomplete.store.action";

@Injectable()
export class EatingAutoCompleteListEffects {
  constructor(
    private action: Actions<EatingListAction.EatingListUnionActions>,
    private storeService: MultiSelectEatingListStoreService
  ) {}

  getEatingList: Observable<any> = createEffect(() =>
    this.action.pipe(
      ofType(EatingListAction.getEatingList),
      map((action) => action.payload),
      switchMap((action) => {
        return this.storeService.getEatingList(action).pipe(
          map((response) => {
            if (response.resultCd === 0) {
              return EatingListAction.getEatingListSuccess({
                response: response,
              });
            } else {
              return EatingListAction.getEatingListFailed({
                response: response,
              });
            }
          }),
          catchError((error) => {
            return of(
              EatingListAction.getEatingListSystemFailed({ error: error })
            );
          })
        );
      })
    )
  );

  getEatingListSuccess: Observable<any> = createEffect(
    () => this.action.pipe(ofType(EatingListAction.getEatingListSuccess)),
    { dispatch: false }
  );

  getEatingListFailed: Observable<any> = createEffect(
    () => this.action.pipe(ofType(EatingListAction.getEatingListFailed)),
    { dispatch: false }
  );

  getEatingListSystemFailed: Observable<any> = createEffect(
    () =>
      this.action.pipe(ofType(EatingListAction.getEatingListSystemFailed)),
    { dispatch: false }
  );
  //getEatingListSuccess
}
