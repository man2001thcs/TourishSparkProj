import { HashService } from "../../../utility/user_service/hash.service";
import {
  Component,
  OnInit,
  ViewChild,
  AfterViewInit,
  OnDestroy,
  Input,
} from "@angular/core";
import { MatTableDataSource } from "@angular/material/table";
import { MatSort, Sort } from "@angular/material/sort";
import { MatPaginator, PageEvent } from "@angular/material/paginator";
import { Book } from "./bookList_category.component.model";
import { catchError, map, startWith, switchMap } from "rxjs/operators";
import { Store } from "@ngrx/store";
import { Observable, Subscription } from "rxjs";
import { State as BookListState } from "./bookList_category.store.reducer";
import {
  getBookList,
  getMessage,
  getSysError,
} from "./bookList_category.store.selector";
import * as BookListActions from "./bookList_category.store.action";
import { MatDialog } from "@angular/material/dialog";
import { MessageService } from "src/app/utility/user_service/message.service";
import { ConfirmDialogComponent } from "src/app/utility/confirm-dialog/confirm-dialog.component";
import { Router } from "@angular/router";

@Component({
  selector: "app-bookCategory",
  templateUrl: "./bookList_category.component.html",
  styleUrls: ["./bookList_category.component.css"],
})
export class BookListCategoryComponent implements OnInit, AfterViewInit, OnDestroy {
  @Input() category: string = "";

  @Input() title: string = "";

  @Input() titleColor: string = "";

  bookList!: Book[];
  subscriptions: Subscription[] = [];

  bookListState!: Observable<any>;
  bookDeleteState!: Observable<any>;
  errorMessageState!: Observable<any>;
  errorSystemState!: Observable<any>;

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

    let payload = {
      page: this.pageIndex + 1,
      pageSize: 5,
    };

    if (this.category !== "") {
    }

    this.store.dispatch(
      BookListActions.getBookList({
        payload: {
          page: this.pageIndex + 1,
          pageSize: 10,
          category: this.category
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

  getDiscountFloat(book: Book) {
    let discountFloat = 0;
    let voucherList = book?.bookVouchers;
    voucherList?.forEach((voucherOne) => {
      if (voucherOne.voucher.discountFloat > discountFloat) {
        discountFloat = voucherOne.voucher.discountFloat;
      }
    });

    return discountFloat;
  }

  ngAfterViewInit(): void {}

  ngOnDestroy(): void {
    this.store.dispatch(BookListActions.resetBookList());
    this.messageService.closeAllDialog();

    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }

  addData(): void {}
}
