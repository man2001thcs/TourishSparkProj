import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Observable, of } from 'rxjs';
import { catchError, map, mergeMap, switchMap } from 'rxjs/operators';
import { AuthorStoreService } from './author-create.store.service';
import * as AuthorAction from './author-create.store.action';
import { AuthorUnionActions } from './author-create.store.action';

@Injectable()
export class AuthorCreateEffects {
  constructor(
    private action: Actions<AuthorAction.AuthorUnionActions>,
    private storeService: AuthorStoreService
  ) {}

  createAuthor: Observable<any> = createEffect(() =>
    this.action.pipe(
      ofType(AuthorAction.createAuthor),
      map((action) => action.payload),
      switchMap((action) => {
        return this.storeService.createAuthor(action).pipe(
          map((response) => {
            console.log("abcd", response);
            if (response.resultCd === 0) {
              console.log(response);
              return AuthorAction.createAuthorSuccess({
                response: response,
              });
            } else {
              return AuthorAction.createAuthorFailed({
                response: response,
              });
            }
          }),
          catchError((error) => {
            return of(AuthorAction.createAuthorSystemFailed({ error: error }));
          })
        );
      })
    )
  );

  createAuthorSuccess: Observable<any> = createEffect(
    () => this.action.pipe(ofType(AuthorAction.createAuthorSuccess)),
    { dispatch: false }
  );

  createAuthorFailed: Observable<any> = createEffect(
    () => this.action.pipe(ofType(AuthorAction.createAuthorFailed)),
    { dispatch: false }
  );

  createAuthorSystemFailed: Observable<any> = createEffect(
    () => this.action.pipe(ofType(AuthorAction.createAuthorSystemFailed)),
    { dispatch: false }
  );

  //createAuthorSuccess
}
