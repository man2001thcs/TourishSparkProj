import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Observable, of } from 'rxjs';
import { catchError, map, mergeMap, switchMap } from 'rxjs/operators';
import { CategoryStoreService } from './category-detail.store.service';
import * as CategoryAction from './category-detail.store.action';
import { CategoryUnionActions } from './category-detail.store.action';

@Injectable()
export class CategoryEffects {
  constructor(
    private action: Actions<CategoryAction.CategoryUnionActions>,
    private storeService: CategoryStoreService
  ) {}

  getCategory: Observable<any> = createEffect(() =>
    this.action.pipe(
      ofType(CategoryAction.getCategory),
      map((action) => action.payload),
      switchMap((action) => {
        return this.storeService.getCategory(action).pipe(
          map((response) => {
            console.log(response);
            if (response.resultCd === 0) {
              console.log(response);
              return CategoryAction.getCategorySuccess({
                response: response,
              });
            } else {
              return CategoryAction.getCategoryFailed({
                response: response,
              });
            }
          }),
          catchError((error) => {
            return of(CategoryAction.getCategorySystemFailed({ error: error }));
          })
        );
      })
    )
  );

  getCategorySuccess: Observable<any> = createEffect(
    () => this.action.pipe(ofType(CategoryAction.getCategorySuccess)),
    { dispatch: false }
  );

  getCategoryFailed: Observable<any> = createEffect(
    () => this.action.pipe(ofType(CategoryAction.getCategoryFailed)),
    { dispatch: false }
  );

  getCategorySystemFailed: Observable<any> = createEffect(
    () => this.action.pipe(ofType(CategoryAction.getCategorySystemFailed)),
    { dispatch: false }
  );

  editCategory: Observable<any> = createEffect(() =>
    this.action.pipe(
      ofType(CategoryAction.editCategory),
      map((action) => action.payload),
      switchMap((action) => {
        return this.storeService.editCategory(action).pipe(
          map((response) => {
            console.log("abcd", response);
            if (response.resultCd === 0) {
              console.log(response);
              return CategoryAction.editCategorySuccess({
                response: response,
              });
            } else {
              return CategoryAction.editCategoryFailed({
                response: response,
              });
            }
          }),
          catchError((error) => {
            return of(CategoryAction.editCategorySystemFailed({ error: error }));
          })
        );
      })
    )
  );

  editCategorySuccess: Observable<any> = createEffect(
    () => this.action.pipe(ofType(CategoryAction.editCategorySuccess)),
    { dispatch: false }
  );

  editCategoryFailed: Observable<any> = createEffect(
    () => this.action.pipe(ofType(CategoryAction.editCategoryFailed)),
    { dispatch: false }
  );

  editCategorySystemFailed: Observable<any> = createEffect(
    () => this.action.pipe(ofType(CategoryAction.editCategorySystemFailed)),
    { dispatch: false }
  );

  //editCategorySuccess
}
