import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { Observable, of } from "rxjs";
import { catchError, map, mergeMap, switchMap } from "rxjs/operators";
import { MultiSelectPublisherListStoreService } from "./multiselect-autocomplete.store.service";
import * as PublisherListAction from "./multiselect-autocomplete.store.action";
import { PublisherListUnionActions } from "./multiselect-autocomplete.store.action";

@Injectable()
export class PublisherAutoCompleteListEffects {
  constructor(
    private action: Actions<PublisherListAction.PublisherListUnionActions>,
    private storeService: MultiSelectPublisherListStoreService
  ) {}

  getPublisherList: Observable<any> = createEffect(() =>
    this.action.pipe(
      ofType(PublisherListAction.getPublisherList),
      map((action) => action.payload),
      switchMap((action) => {
        return this.storeService.getPublisherList(action).pipe(
          map((response) => {
            if (response.resultCd === 0) {
              return PublisherListAction.getPublisherListSuccess({
                response: response,
              });
            } else {
              return PublisherListAction.getPublisherListFailed({
                response: response,
              });
            }
          }),
          catchError((error) => {
            return of(
              PublisherListAction.getPublisherListSystemFailed({ error: error })
            );
          })
        );
      })
    )
  );

  getPublisherListSuccess: Observable<any> = createEffect(
    () => this.action.pipe(ofType(PublisherListAction.getPublisherListSuccess)),
    { dispatch: false }
  );

  getPublisherListFailed: Observable<any> = createEffect(
    () => this.action.pipe(ofType(PublisherListAction.getPublisherListFailed)),
    { dispatch: false }
  );

  getPublisherListSystemFailed: Observable<any> = createEffect(
    () =>
      this.action.pipe(ofType(PublisherListAction.getPublisherListSystemFailed)),
    { dispatch: false }
  );
  //getPublisherListSuccess
}
