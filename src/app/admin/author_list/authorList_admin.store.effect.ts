import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { Observable, of } from "rxjs";
import { catchError, map, mergeMap, switchMap } from "rxjs/operators";
import { AuthorListStoreService } from "./authorList_admin.store.service";
import * as AuthorListAction from "./authorList_admin.store.action";
import { AuthorListUnionActions } from "./authorList_admin.store.action";

@Injectable()
export class AuthorListEffects {
  constructor(
    private action: Actions<AuthorListAction.AuthorListUnionActions>,
    private storeService: AuthorListStoreService
  ) {}

  getAuthorList: Observable<any> = createEffect(() =>
    this.action.pipe(
      ofType(AuthorListAction.getAuthorList),
      map((action) => action.payload),
      switchMap((action) => {
        return this.storeService.getAuthorList(action).pipe(
          map((response) => {
            console.log(response);
            if (response.resultCd === 0) {
              console.log(response);
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

  deleteAuthor: Observable<any> = createEffect(() =>
    this.action.pipe(
      ofType(AuthorListAction.deleteAuthor),
      map((action) => action.payload),
      switchMap((action) => {
        return this.storeService.deleteAuthor(action).pipe(
          map((response) => {
            console.log(response);
            if (response.resultCd === 0) {
              console.log(response);
              return AuthorListAction.deleteAuthorSuccess({
                response: response,
              });
            } else {
              return AuthorListAction.deleteAuthorFailed({
                response: response,
              });
            }
          }),
          catchError((error) => {
            return of(
              AuthorListAction.deleteAuthorSystemFailed({ error: error })
            );
          })
        );
      })
    )
  );

  deleteAuthorListSuccess: Observable<any> = createEffect(
    () => this.action.pipe(ofType(AuthorListAction.deleteAuthorSuccess)),
    { dispatch: false }
  );

  deleteAuthorListFailed: Observable<any> = createEffect(
    () => this.action.pipe(ofType(AuthorListAction.deleteAuthorFailed)),
    { dispatch: false }
  );

  deleteAuthorListSystemFailed: Observable<any> = createEffect(
    () =>
      this.action.pipe(ofType(AuthorListAction.deleteAuthorSystemFailed)),
    { dispatch: false }
  );

  //getAuthorListSuccess
}
