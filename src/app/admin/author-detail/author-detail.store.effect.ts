import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Observable, of } from 'rxjs';
import { catchError, map, mergeMap, switchMap } from 'rxjs/operators';
import { AuthorStoreService } from './author-detail.store.service';
import * as AuthorAction from './author-detail.store.action';
import { AuthorUnionActions } from './author-detail.store.action';

@Injectable()
export class AuthorEffects {
  constructor(
    private action: Actions<AuthorAction.AuthorUnionActions>,
    private storeService: AuthorStoreService
  ) {}

  getAuthor: Observable<any> = createEffect(() =>
    this.action.pipe(
      ofType(AuthorAction.getAuthor),
      map((action) => action.payload),
      switchMap((action) => {
        return this.storeService.getAuthor(action).pipe(
          map((response) => {
            if (response.resultCd === 0) {
              return AuthorAction.getAuthorSuccess({
                response: response,
              });
            } else {
              return AuthorAction.getAuthorFailed({
                response: response,
              });
            }
          }),
          catchError((error) => {
            return of(AuthorAction.getAuthorSystemFailed({ error: error }));
          })
        );
      })
    )
  );

  getAuthorSuccess: Observable<any> = createEffect(
    () => this.action.pipe(ofType(AuthorAction.getAuthorSuccess)),
    { dispatch: false }
  );

  getAuthorFailed: Observable<any> = createEffect(
    () => this.action.pipe(ofType(AuthorAction.getAuthorFailed)),
    { dispatch: false }
  );

  getAuthorSystemFailed: Observable<any> = createEffect(
    () => this.action.pipe(ofType(AuthorAction.getAuthorSystemFailed)),
    { dispatch: false }
  );

  editAuthor: Observable<any> = createEffect(() =>
    this.action.pipe(
      ofType(AuthorAction.editAuthor),
      map((action) => action.payload),
      switchMap((action) => {
        return this.storeService.editAuthor(action).pipe(
          map((response) => {
            console.log("abcd", response);
            if (response.resultCd === 0) {
              console.log(response);
              return AuthorAction.editAuthorSuccess({
                response: response,
              });
            } else {
              return AuthorAction.editAuthorFailed({
                response: response,
              });
            }
          }),
          catchError((error) => {
            return of(AuthorAction.editAuthorSystemFailed({ error: error }));
          })
        );
      })
    )
  );

  editAuthorSuccess: Observable<any> = createEffect(
    () => this.action.pipe(ofType(AuthorAction.editAuthorSuccess)),
    { dispatch: false }
  );

  editAuthorFailed: Observable<any> = createEffect(
    () => this.action.pipe(ofType(AuthorAction.editAuthorFailed)),
    { dispatch: false }
  );

  editAuthorSystemFailed: Observable<any> = createEffect(
    () => this.action.pipe(ofType(AuthorAction.editAuthorSystemFailed)),
    { dispatch: false }
  );

  //editAuthorSuccess
}
