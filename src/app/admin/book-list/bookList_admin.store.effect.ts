import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { Observable, of } from "rxjs";
import { catchError, map, mergeMap, switchMap } from "rxjs/operators";
import { BookListStoreService } from "./bookList_admin.store.service";
import * as BookListAction from "./bookList_admin.store.action";
import { BookListUnionActions } from "./bookList_admin.store.action";

@Injectable()
export class BookListEffects {
  constructor(
    private action: Actions<BookListAction.BookListUnionActions>,
    private storeService: BookListStoreService
  ) {}

  getBookList: Observable<any> = createEffect(() =>
    this.action.pipe(
      ofType(BookListAction.getBookList),
      map((action) => action.payload),
      switchMap((action) => {
        return this.storeService.getBookList(action).pipe(
          map((response) => {
            console.log(response);
            if (response.resultCd === 0) {
              console.log(response);
              return BookListAction.getBookListSuccess({
                response: response,
              });
            } else {
              return BookListAction.getBookListFailed({
                response: response,
              });
            }
          }),
          catchError((error) => {
            return of(
              BookListAction.getBookListSystemFailed({ error: error })
            );
          })
        );
      })
    )
  );

  getBookListSuccess: Observable<any> = createEffect(
    () => this.action.pipe(ofType(BookListAction.getBookListSuccess)),
    { dispatch: false }
  );

  getBookListFailed: Observable<any> = createEffect(
    () => this.action.pipe(ofType(BookListAction.getBookListFailed)),
    { dispatch: false }
  );

  getBookListSystemFailed: Observable<any> = createEffect(
    () =>
      this.action.pipe(ofType(BookListAction.getBookListSystemFailed)),
    { dispatch: false }
  );

  deleteBook: Observable<any> = createEffect(() =>
    this.action.pipe(
      ofType(BookListAction.deleteBook),
      map((action) => action.payload),
      switchMap((action) => {
        return this.storeService.deleteBook(action).pipe(
          map((response) => {
            console.log(response);
            if (response.resultCd === 0) {
              console.log(response);
              return BookListAction.deleteBookSuccess({
                response: response,
              });
            } else {
              return BookListAction.deleteBookFailed({
                response: response,
              });
            }
          }),
          catchError((error) => {
            return of(
              BookListAction.deleteBookSystemFailed({ error: error })
            );
          })
        );
      })
    )
  );

  deleteBookListSuccess: Observable<any> = createEffect(
    () => this.action.pipe(ofType(BookListAction.deleteBookSuccess)),
    { dispatch: false }
  );

  deleteBookListFailed: Observable<any> = createEffect(
    () => this.action.pipe(ofType(BookListAction.deleteBookFailed)),
    { dispatch: false }
  );

  deleteBookListSystemFailed: Observable<any> = createEffect(
    () =>
      this.action.pipe(ofType(BookListAction.deleteBookSystemFailed)),
    { dispatch: false }
  );

  //getBookListSuccess
}
