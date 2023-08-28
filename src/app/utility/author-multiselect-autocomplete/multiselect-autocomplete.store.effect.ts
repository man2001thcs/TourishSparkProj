import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { Observable, of } from "rxjs";
import { catchError, map, mergeMap, switchMap } from "rxjs/operators";
import { MultiSelectAuthorListStoreService } from "./multiselect-autocomplete.store.service";
import * as AuthorListAction from "./multiselect-autocomplete.store.action";
import { AuthorListUnionActions } from "./multiselect-autocomplete.store.action";

@Injectable()
export class AuthorAutoCompleteListEffects {
  constructor(
    private action: Actions<AuthorListAction.AuthorListUnionActions>,
    private storeService: MultiSelectAuthorListStoreService
  ) {}

  getAuthorList: Observable<any> = createEffect(() =>
    this.action.pipe(
      ofType(AuthorListAction.getAuthorList),
      map((action) => action.payload),
      switchMap((action) => {
        return this.storeService.getAuthorList(action).pipe(
          map((response) => {
            if (response.resultCd === 0) {
              return AuthorListAction.getAuthorListSuccess({
                response: response,
              });
            } else {
              return AuthorListAction.getAuthorListFailed({
                response: response,
              });
            }
          }),
          catchError((error) => {
            return of(
              AuthorListAction.getAuthorListSystemFailed({ error: error })
            );
          })
        );
      })
    )
  );

  getAuthorListSuccess: Observable<any> = createEffect(
    () => this.action.pipe(ofType(AuthorListAction.getAuthorListSuccess)),
    { dispatch: false }
  );

  getAuthorListFailed: Observable<any> = createEffect(
    () => this.action.pipe(ofType(AuthorListAction.getAuthorListFailed)),
    { dispatch: false }
  );

  getAuthorListSystemFailed: Observable<any> = createEffect(
    () =>
      this.action.pipe(ofType(AuthorListAction.getAuthorListSystemFailed)),
    { dispatch: false }
  );
  //getAuthorListSuccess
}
