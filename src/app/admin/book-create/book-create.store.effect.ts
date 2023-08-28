import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Observable, of } from 'rxjs';
import { catchError, map, mergeMap, switchMap } from 'rxjs/operators';
import { BookStoreService } from './book-create.store.service';
import * as BookAction from './book-create.store.action';
import { BookUnionActions } from './book-create.store.action';

@Injectable()
export class BookCreateEffects {
  constructor(
    private action: Actions<BookAction.BookUnionActions>,
    private storeService: BookStoreService
  ) {}

  createBook: Observable<any> = createEffect(() =>
    this.action.pipe(
      ofType( BookAction.createBook),
      map((action) => action.payload),
      switchMap((action) => {
        return this.storeService.createBook(action).pipe(
          map((response) => {
            if (response.resultCd === 0) {
              return  BookAction.createBookSuccess({
                response: response,
              });
            } else {
              return  BookAction.createBookFailed({
                response: response,
              });
            }
          }),
          catchError((error) => {
            return of( BookAction.createBookSystemFailed({ error: error }));
          })
        );
      })
    )
  );

  createBookSuccess: Observable<any> = createEffect(
    () => this.action.pipe(ofType( BookAction.createBookSuccess)),
    { dispatch: false }
  );

  createBookFailed: Observable<any> = createEffect(
    () => this.action.pipe(ofType( BookAction.createBookFailed)),
    { dispatch: false }
  );

  createBookSystemFailed: Observable<any> = createEffect(
    () => this.action.pipe(ofType( BookAction.createBookSystemFailed)),
    { dispatch: false }
  );

  //editAuthorSuccess
}
