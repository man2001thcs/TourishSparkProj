import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { Observable, of } from "rxjs";
import { catchError, map, mergeMap, switchMap } from "rxjs/operators";
import { CategoryListStoreService } from "./categoryList_admin.store.service";
import * as CategoryListAction from "./categoryList_admin.store.action";
import { CategoryListUnionActions } from "./categoryList_admin.store.action";

@Injectable()
export class CategoryListEffects {
  constructor(
    private action: Actions<CategoryListAction.CategoryListUnionActions>,
    private storeService: CategoryListStoreService
  ) {}

  getCategoryList: Observable<any> = createEffect(() =>
    this.action.pipe(
      ofType(CategoryListAction.getCategoryList),
      map((action) => action.payload),
      switchMap((action) => {
        return this.storeService.getCategoryList(action).pipe(
          map((response) => {
            console.log(response);
            if (response.resultCd === 0) {
              console.log(response);
              return CategoryListAction.getCategoryListSuccess({
                response: response,
              });
            } else {
              return CategoryListAction.getCategoryListFailed({
                response: response,
              });
            }
          }),
          catchError((error) => {
            return of(
              CategoryListAction.getCategoryListSystemFailed({ error: error })
            );
          })
        );
      })
    )
  );

  getCategoryListSuccess: Observable<any> = createEffect(
    () => this.action.pipe(ofType(CategoryListAction.getCategoryListSuccess)),
    { dispatch: false }
  );

  getCategoryListFailed: Observable<any> = createEffect(
    () => this.action.pipe(ofType(CategoryListAction.getCategoryListFailed)),
    { dispatch: false }
  );

  getCategoryListSystemFailed: Observable<any> = createEffect(
    () =>
      this.action.pipe(ofType(CategoryListAction.getCategoryListSystemFailed)),
    { dispatch: false }
  );

  deleteCategory: Observable<any> = createEffect(() =>
    this.action.pipe(
      ofType(CategoryListAction.deleteCategory),
      map((action) => action.payload),
      switchMap((action) => {
        return this.storeService.deleteCategory(action).pipe(
          map((response) => {
            console.log(response);
            if (response.resultCd === 0) {
              console.log(response);
              return CategoryListAction.deleteCategorySuccess({
                response: response,
              });
            } else {
              return CategoryListAction.deleteCategoryFailed({
                response: response,
              });
            }
          }),
          catchError((error) => {
            return of(
              CategoryListAction.deleteCategorySystemFailed({ error: error })
            );
          })
        );
      })
    )
  );

  deleteCategoryListSuccess: Observable<any> = createEffect(
    () => this.action.pipe(ofType(CategoryListAction.deleteCategorySuccess)),
    { dispatch: false }
  );

  deleteCategoryListFailed: Observable<any> = createEffect(
    () => this.action.pipe(ofType(CategoryListAction.deleteCategoryFailed)),
    { dispatch: false }
  );

  deleteCategoryListSystemFailed: Observable<any> = createEffect(
    () =>
      this.action.pipe(ofType(CategoryListAction.deleteCategorySystemFailed)),
    { dispatch: false }
  );

  //getCategoryListSuccess
}
