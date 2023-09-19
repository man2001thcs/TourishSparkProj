import { HashService } from "../../../utility/user_service/hash.service";
import {
  Component,
  OnInit,
  ViewChild,
  AfterViewInit,
  OnDestroy,
  Input,
  OnChanges,
  SimpleChanges,
} from "@angular/core";
import { MatTableDataSource } from "@angular/material/table";
import { MatSort, Sort } from "@angular/material/sort";
import { MatPaginator, PageEvent } from "@angular/material/paginator";
import { Book, Category, Publisher, SearchPayload } from "./bookList_search.component.model";
import { catchError, map, startWith, switchMap } from "rxjs/operators";
import { Store } from "@ngrx/store";
import { Observable, Subscription } from "rxjs";
import { State as BookListState } from "./bookList_search.store.reducer";
import {
  getBookList,
  getMessage,
  getSysError,
} from "./bookList_search.store.selector";
import * as BookListActions from "./bookList_search.store.action";
import { MatDialog } from "@angular/material/dialog";
import { MessageService } from "src/app/utility/user_service/message.service";
import { ConfirmDialogComponent } from "src/app/utility/confirm-dialog/confirm-dialog.component";
import { Router } from "@angular/router";

@Component({
  selector: "app-bookSearch",
  templateUrl: "./bookList_search.component.html",
  styleUrls: ["./bookList_search.component.css"],
})
export class BookListSearchComponent implements OnInit, OnChanges, AfterViewInit, OnDestroy {
  @Input() category: string = "";

  @Input() title: string = "";

  @Input() titleColor: string = "";

  @Input() authorList = "";
  @Input() publisherList = "";

  @Input() priceFrom = 0;
  @Input() priceTo = 0;

  @Input() search = "";

  bookList!: Book[];
  subscriptions: Subscription[] = [];

  bookListState!: Observable<any>;
  bookDeleteState!: Observable<any>;
  errorMessageState!: Observable<any>;
  errorSystemState!: Observable<any>;

  clickedRows = new Set<any>();

  length = 0;
  pageSize = 20;
  pageSizeOpstion = [5, 10];
  pageIndex = 0;
  isLoading =false;

  isEmpty = false;

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

          this.isLoading = false;

          if (state.count <= 0){
            this.isEmpty = true;
          } else {
            this.isEmpty = false;
          }
        }
      })
    );

    this.store.dispatch(BookListActions.initial());

    let payload: SearchPayload = {
      page: 1,
      pageSize: 10,
    };

    if (this.search !== ""){
      payload.search = this.search;
    };

    this.store.dispatch(
      BookListActions.getBookList({
        payload: payload,
      })
    );

    this.isLoading = true;

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

  ngOnChanges(changes: SimpleChanges): void {

    console.log("change");

    let payload: SearchPayload = {
      page: 1,
      pageSize: 10,
      category: this.category,
      authorString: this.authorList,
      publisherString: this.publisherList,
    };

    if (this.priceTo > 0){
      payload.from = this.priceFrom;
      payload.to = this.priceTo;
    };

    if (this.search !== ""){
      payload.search = this.search;
    };

    this.store.dispatch(
      BookListActions.getBookList({
        payload: payload,
      })
    );

    this.isLoading = true;
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

  handlePageChange($event: any){
    console.log($event);
  }
}
