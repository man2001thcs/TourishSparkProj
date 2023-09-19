import { HashService } from "../../../utility/user_service/hash.service";
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
import { Book } from "./bookList_sale.component.model";
import { catchError, map, startWith, switchMap } from "rxjs/operators";
import { Store } from "@ngrx/store";
import { Observable, Subscription } from "rxjs";
import { State as BookListState } from "./bookList_sale.store.reducer";
import {
  getBookList,
  getMessage,
  getSysError,
} from "./bookList_sale.store.selector";
import * as BookListActions from "./bookList_sale.store.action";
import { MatDialog } from "@angular/material/dialog";
import { MessageService } from "src/app/utility/user_service/message.service";
import { ConfirmDialogComponent } from "src/app/utility/confirm-dialog/confirm-dialog.component";
import { Router } from "@angular/router";

@Component({
  selector: "app-bookSale",
  templateUrl: "./bookList_sale.component.html",
  styleUrls: ["./bookList_sale.component.css"],
})
export class BookListSaleComponent
  implements OnInit, AfterViewInit, OnDestroy
{
  bookList!: Book[];
  subscriptions: Subscription[] = [];

  bookListState!: Observable<any>;
  bookDeleteState!: Observable<any>;
  errorMessageState!: Observable<any>;
  errorSystemState!: Observable<any>;

  displayedColumns: string[] = [
    "id",
    "title",
    "pageNumber",
    "description",
    "createDate",
    "edit",
    "delete",
  ];

  clickedRows = new Set<any>();

  length = 0;
  pageSize = 5;
  pageSizeOpstion = [5, 10];
  pageIndex = 0;

  constructor(
    private router: Router,
    private messageService: MessageService,
    private store: Store<BookListState>
  ) {
    this.bookListState = this.store.select(getBookList);
    this.errorMessageState = this.store.select(getMessage);
    this.errorSystemState = this.store.select(getSysError);
  }

  ngOnInit(): void {
    this.subscriptions.push(
      this.bookListState.subscribe((state) => {
        if (state) {
          this.bookList = state.data;
          this.length = state.count;
        }
      })
    );   

    this.store.dispatch(BookListActions.initial());

    this.store.dispatch(
      BookListActions.getBookList({
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
          this.messageService.openSystemFailNotifyDialog(state);
        }
      })
    );
  }
  ngAfterViewInit(): void {}

  ngOnDestroy(): void {
    this.store.dispatch(BookListActions.resetBookList());
    this.messageService.closeAllDialog();

    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }

  addData(): void {}

  handlePageEvent(e: PageEvent) {
    // this.length = e.length;

    this.pageSize = e.pageSize;
    this.pageIndex = e.pageIndex;

    console.log(this.pageIndex);

    this.store.dispatch(
      BookListActions.getBookList({
        payload: {
          page: this.pageIndex + 1,
          pageSize: this.pageSize,
        },
      })
    );
  }
}
