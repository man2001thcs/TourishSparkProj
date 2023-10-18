import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Observable, of } from 'rxjs';
import { catchError, map, mergeMap, switchMap } from 'rxjs/operators';
import { UserStoreService } from './signIn-create.store.service';
import * as UserAction from './signIn-create.store.action';
import { UserUnionActions } from './signIn-create.store.action';

@Injectable()
export class UserCreateEffects {
  constructor(
    private action: Actions<UserAction.UserUnionActions>,
    private storeService: UserStoreService
  ) {}

  createUser: Observable<any> = createEffect(() =>
    this.action.pipe(
      ofType( UserAction.createUser),
      map((action) => action.payload),
      switchMap((action) => {
        return this.storeService.createUser(action).pipe(
          map((response) => {
            if (response.resultCd === 0) {
              return  UserAction.createUserSuccess({
                response: response,
              });
            } else {
              return  UserAction.createUserFailed({
                response: response,
              });
            }
          }),
          catchError((error) => {
            return of( UserAction.createUserSystemFailed({ error: error }));
          })
        );
      })
    )
  );

  createUserSuccess: Observable<any> = createEffect(
    () => this.action.pipe(ofType( UserAction.createUserSuccess)),
    { dispatch: false }
  );

  createUserFailed: Observable<any> = createEffect(
    () => this.action.pipe(ofType( UserAction.createUserFailed)),
    { dispatch: false }
  );

  createUserSystemFailed: Observable<any> = createEffect(
    () => this.action.pipe(ofType( UserAction.createUserSystemFailed)),
    { dispatch: false }
  );

  //editAuthorSuccess
}
