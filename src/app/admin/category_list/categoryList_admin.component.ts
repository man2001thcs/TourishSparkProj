import { AdminService } from "../service/admin.service";
import { HashService } from "../../utility/user_service/hash.service";
import {
  Component,
  OnInit,
  ViewChild,
  AfterViewInit,
  OnDestroy,
} from "@angular/core";
import { MatTableDataSource } from "@angular/material/table";
import { MatSort, Sort } from "@angular/material/sort";
import { MatPaginator, PageEvent } from "@angular/material/paginator";
import { Category } from "./categoryList_admin.component.model";
import { catchError, map, startWith, switchMap } from "rxjs/operators";
import { Store } from "@ngrx/store";
import { Observable, Subscription } from "rxjs";
import { State as CategoryListState } from "./categoryList_admin.store.reducer";
import {
  getCategoryList,
  getDeleteStatus,
  getMessage,
  getSysError,
} from "./categoryList_admin.store.selector";
import * as CategoryListActions from "./categoryList_admin.store.action";
import { MatDialog } from "@angular/material/dialog";
import { CategoryDetailComponent } from "../category-detail/category-detail.component";
import { CategoryCreateComponent } from "../category-create/category-create.component";
import { MessageService } from "src/app/utility/user_service/message.service";
import { ConfirmDialogComponent } from "src/app/utility/confirm-dialog/confirm-dialog.component";

@Component({
  selector: "app-categoryList",
  templateUrl: "./categoryList_admin.component.html",
  styleUrls: ["./categoryList_admin.component.css"],
})
export class CategoryListAdminComponent
  implements OnInit, AfterViewInit, OnDestroy
{
  categoryList!: Category[];
  subscriptions: Subscription[] = [];

  categoryListState!: Observable<any>;
  categoryDeleteState!: Observable<any>;
  errorMessageState!: Observable<any>;
  errorSystemState!: Observable<any>;

  displayedColumns: string[] = [
    "id",
    "name",
    "description",
    "createDate",
    "edit",
    "delete",
  ];
  @ViewChild(MatPaginator) paraginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  clickedRows = new Set<any>();

  length = 0;
  pageSize = 5;
  pageSizeOpstion = [5, 10];
  pageIndex = 0;

  constructor(
    private adminService: AdminService,
    public dialog: MatDialog,
    private messageService: MessageService,
    private store: Store<CategoryListState>
  ) {
    this.categoryListState = this.store.select(getCategoryList);
    this.categoryDeleteState = this.store.select(getDeleteStatus);
    this.errorMessageState = this.store.select(getMessage);
    this.errorSystemState = this.store.select(getSysError);
  }

  ngOnInit(): void {
    this.subscriptions.push(
      this.categoryListState.subscribe((state) => {
        if (state) {
          this.categoryList = state.data;
          this.length = state.count;
        }
      })
    );

    this.subscriptions.push(
      this.categoryDeleteState.subscribe((state) => {
        if (state) {
          console.log("abc: ", state);
          this.messageService.openMessageNotifyDialog(state.messageCode);

          if (state.resultCd === 0) {
            this.store.dispatch(
              CategoryListActions.getCategoryList({
                payload: {
                  page: this.pageIndex + 1,
                },
              })
            );
          }
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

    this.subscriptions.push(
      this.errorMessageState.subscribe((state) => {
        if (state) {
          this.messageService.openMessageNotifyDialog(state);
        }
      })
    );

    this.subscriptions.push(
      this.errorSystemState.subscribe((state) => {
        if (state) {
          this.messageService.openFailNotifyDialog(state);
        }
      })
    );
  }
  ngAfterViewInit(): void {}

  ngOnDestroy(): void {
    this.store.dispatch(CategoryListActions.resetCategoryList());
    this.messageService.closeAllDialog();

    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }

  openEditDialog(id: string): void {
    const dialogRef = this.dialog.open(CategoryDetailComponent, {
      data: { id: id },
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log(result);
    });
  }

  openAddDialog(): void {
    const dialogRef = this.dialog.open(CategoryCreateComponent, {});

    dialogRef.afterClosed().subscribe((result) => {
      console.log(result);
    });
  }

  async openConfirmDialog(this_announce: string) {
    const ref = this.dialog.open(ConfirmDialogComponent, {
      data: {
        title: this_announce,
      },
    });

    await ref.afterClosed().subscribe((result) => {
      return result;
    });
  }

  openDeleteDialog(id: string) {
    const ref = this.dialog.open(ConfirmDialogComponent, {
      data: {
        title: "Bạn có muốn xóa category này không?",
      },
    });

    ref.afterClosed().subscribe((result) => {
      if (result) {
        this.store.dispatch(
          CategoryListActions.deleteCategory({
            payload: {
              id: id,
            },
          })
        );
      }
    });
  }

  addData(): void {}

  handlePageEvent(e: PageEvent) {
    // this.length = e.length;

    this.pageSize = e.pageSize;
    this.pageIndex = e.pageIndex;

    console.log(this.pageIndex);

    this.store.dispatch(
      CategoryListActions.getCategoryList({
        payload: {
          page: this.pageIndex + 1,
          pageSize: this.pageSize,
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
    if ((sortState.active = "name")) {
      if (sortState.direction === "asc") {
        this.store.dispatch(
          CategoryListActions.getCategoryList({
            payload: {
              page: 1,
              pageSize: this.pageSize,
            },
          })
        );
      } else if (sortState.direction === "desc") {
        this.store.dispatch(
          CategoryListActions.getCategoryList({
            payload: {
              sortBy: "name_desc",
              page: 1,
              pageSize: this.pageSize,
            },
          })
        );
      }
    } else {
    }
  }
}
