import { AdminService } from "../../service/admin.service";

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

import { Store } from "@ngrx/store";
import { Observable, Subscription } from "rxjs";
import { State as ReceiptListState } from "./receipt-list.store.reducer";
import {
  getReceiptList,
  getDeleteStatus,
  getMessage,
  getSysError,
} from "./receipt-list.store.selector";
import * as ReceiptListActions from "./receipt-list.store.action";
import { MatDialog } from "@angular/material/dialog";
import { ReceiptDetailComponent } from "../receipt_detail/receipt-detail.component";
import { ReceiptCreateComponent } from "../receipt_create/receipt-create.component";
import { MessageService } from "src/app/utility/user_service/message.service";
import { ConfirmDialogComponent } from "src/app/utility/confirm-dialog/confirm-dialog.component";
import { TotalReceipt } from "src/app/model/baseModel";

@Component({
  selector: "app-receiptList",
  templateUrl: "./receipt-list.component.html",
  styleUrls: ["./receipt-list.component.css"],
})
export class ReceiptListComponent implements OnInit, AfterViewInit, OnDestroy {
  receiptList!: TotalReceipt[];
  subscriptions: Subscription[] = [];

  receiptListState!: Observable<any>;
  receiptDeleteState!: Observable<any>;
  errorMessageState!: Observable<any>;
  errorSystemState!: Observable<any>;

  displayedColumns: string[] = [
    "id",
    "tourName",
    "totalTicketAll",
    "remainTicket",
    //"tourishPlanId",
    "guestName",
    "phoneNumber",
    "totalTicket",
    "discountFloat",
    "discountAmount",
    "createDate",
    "completeDate",
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
    private store: Store<ReceiptListState>
  ) {
    this.receiptListState = this.store.select(getReceiptList);
    this.receiptDeleteState = this.store.select(getDeleteStatus);
    this.errorMessageState = this.store.select(getMessage);
    this.errorSystemState = this.store.select(getSysError);
  }

  ngOnInit(): void {
    this.subscriptions.push(
      this.receiptListState.subscribe((state) => {
        if (state) {
          this.messageService.closeLoadingDialog();
          this.receiptList = state.data;
          this.length = state.count;
        }
      })
    );

    this.subscriptions.push(
      this.receiptDeleteState.subscribe((state) => {
        if (state) {
          console.log("abc: ", state);
          this.messageService.openMessageNotifyDialog(state.messageCode);

          if (state.resultCd === 0) {
            this.store.dispatch(
              ReceiptListActions.getReceiptList({
                payload: {
                  page: this.pageIndex + 1,
                },
              })
            );
          }
        }
      })
    );

    this.store.dispatch(ReceiptListActions.initial());

    this.store.dispatch(
      ReceiptListActions.getReceiptList({
        payload: {
          page: this.pageIndex + 1,
        },
      })
    );

    this.messageService.openLoadingDialog();

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
    this.store.dispatch(ReceiptListActions.resetReceiptList());
    this.messageService.closeAllDialog();

    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }

  openEditDialog(id: string): void {
    const dialogRef = this.dialog.open(ReceiptDetailComponent, {
      data: { id: id },
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log(result);

      this.store.dispatch(
        ReceiptListActions.getReceiptList({
          payload: {
            page: this.pageIndex + 1,
          },
        })
      );

      this.messageService.openLoadingDialog();
    });
  }

  openAddDialog(): void {
    const dialogRef = this.dialog.open(ReceiptCreateComponent, {});

    dialogRef.afterClosed().subscribe((result) => {
      console.log(result);

      this.store.dispatch(
        ReceiptListActions.getReceiptList({
          payload: {
            page: this.pageIndex + 1,
          },
        })
      );

      this.messageService.openLoadingDialog();
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
        title: "Bạn có muốn xóa đối tác này không?",
      },
    });

    ref.afterClosed().subscribe((result) => {
      if (result) {
        this.store.dispatch(
          ReceiptListActions.deleteReceipt({
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
      ReceiptListActions.getReceiptList({
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
          ReceiptListActions.getReceiptList({
            payload: {
              page: 1,
              pageSize: this.pageSize,
            },
          })
        );
      } else if (sortState.direction === "desc") {
        this.store.dispatch(
          ReceiptListActions.getReceiptList({
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
