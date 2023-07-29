import { AdminService } from '../service/admin.service';
import { HashService } from '../../utility/user_service/hash.service';
import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort, Sort } from '@angular/material/sort';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { Category } from './categoryList_admin.component.model';
import { catchError, map, startWith, switchMap } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { State as CategoryListState } from './categoryList_admin.store.reducer';
import { getCategoryList } from './categoryList_admin.store.selector';
import * as CategoryListActions from './categoryList_admin.store.action';

@Component({
  selector: 'app-categoryList',
  templateUrl: './categoryList_admin.component.html',
  styleUrls: ['./categoryList_admin.component.css'],
})
export class CategoryListAdminComponent implements OnInit, AfterViewInit {
  categoryList!: Category[];
  subscriptions: Subscription[] = [];

  categoryListState!: Observable<any>;

  displayedColumns: string[] = [
    'id',
    'name',
    'description',
    'createDate',
  ];
  @ViewChild(MatPaginator) paraginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  clickedRows = new Set<any>();

  length = 0;
  pageSize = 0;
  pageIndex = 0;

  constructor(
    private adminService: AdminService,
    private store: Store<CategoryListState>
  ) {
    this.categoryListState = this.store.select(getCategoryList);
  }

  ngOnInit(): void {
    this.subscriptions.push(
      this.categoryListState.subscribe((state) => {
        if (state) {
          this.categoryList = state;
          console.log("abc: ", this.categoryList);
        }
      })
    );

    this.store.dispatch(CategoryListActions.initial());

    this.store.dispatch(
      CategoryListActions.getCategoryList({
        payload: {
          page: this.pageIndex + 1,
        },
      })
    );
  }
  ngAfterViewInit(): void {}

  handlePageEvent(e: PageEvent) {
    // this.length = e.length;
    this.pageSize = e.pageSize;
    this.pageIndex = e.pageIndex;

    this.store.dispatch(
      CategoryListActions.getCategoryList({
        payload: {
          page: this.pageIndex + 1,
        },
      })
    );
  }

  announceSortChange(sortState: Sort) {
    // This example uses English messages. If your application supports
    // multiple language, you would internationalize these strings.
    // Furthermore, you can customize the message to add additional
    // details about the values being sorted.
    console.log(sortState);
    if (sortState.direction === 'asc') {
      this.store.dispatch(
        CategoryListActions.getCategoryList({
          payload: {
            page: 1,
          },
        })
      );
    } else if (sortState.direction === 'desc') {
      this.store.dispatch(
        CategoryListActions.getCategoryList({
          payload: {
            sortBy: 'name_desc',
            page: 1,
          },
        })
      );
    } else {
    }
  }
}
