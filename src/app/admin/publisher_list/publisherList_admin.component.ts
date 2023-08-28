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
import { Publisher } from "./publisherList_admin.component.model";
import { catchError, map, startWith, switchMap } from "rxjs/operators";
import { Store } from "@ngrx/store";
import { Observable, Subscription } from "rxjs";
import { State as PublisherListState } from "./publisherList_admin.store.reducer";
import {
  getPublisherList,
  getDeleteStatus,
  getMessage,
  getSysError,
} from "./publisherList_admin.store.selector";
import * as PublisherListActions from "./publisherList_admin.store.action";
import { MatDialog } from "@angular/material/dialog";
import { PublisherDetailComponent } from "../publisher-detail/publisher-detail.component";
import { PublisherCreateComponent } from "../publisher-create/publisher-create.component";
import { MessageService } from "src/app/utility/user_service/message.service";
import { ConfirmDialogComponent } from "src/app/utility/confirm-dialog/confirm-dialog.component";

@Component({
  selector: "app-publisherList",
  templateUrl: "./publisherList_admin.component.html",
  styleUrls: ["./publisherList_admin.component.css"],
})
export class PublisherListAdminComponent
  implements OnInit, AfterViewInit, OnDestroy
{
  publisherList!: Publisher[];
  subscriptions: Subscription[] = [];

  publisherListState!: Observable<any>;
  publisherDeleteState!: Observable<any>;
  errorMessageState!: Observable<any>;
  errorSystemState!: Observable<any>;

  displayedColumns: string[] = [
    "id",
    "publisherName",
    "phoneNumber",
    "email",
    "address",
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
    private store: Store<PublisherListState>
  ) {
    this.publisherListState = this.store.select(getPublisherList);
    this.publisherDeleteState = this.store.select(getDeleteStatus);
    this.errorMessageState = this.store.select(getMessage);
    this.errorSystemState = this.store.select(getSysError);
  }

  ngOnInit(): void {
    this.subscriptions.push(
      this.publisherListState.subscribe((state) => {
        if (state) {
          this.publisherList = state.data;
          this.length = state.count;
        }
      })
    );

    this.subscriptions.push(
      this.publisherDeleteState.subscribe((state) => {
        if (state) {
          console.log("abc: ", state);
          this.messageService.openMessageNotifyDialog(state.messageCode);

          if (state.resultCd === 0) {
            this.store.dispatch(
              PublisherListActions.getPublisherList({
                payload: {
                  page: this.pageIndex + 1,
                },
              })
            );
          }
        }
      })
    );

    this.store.dispatch(PublisherListActions.initial());

    this.store.dispatch(
      PublisherListActions.getPublisherList({
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
    this.store.dispatch(PublisherListActions.resetPublisherList());
    this.messageService.closeAllDialog();

    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }

  openEditDialog(id: string): void {
    const dialogRef = this.dialog.open(PublisherDetailComponent, {
      data: { id: id },
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log(result);
    });
  }

  openAddDialog(): void {
    const dialogRef = this.dialog.open(PublisherCreateComponent, {});

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
        title: "Bạn có muốn xóa publisher này không?",
      },
    });

    ref.afterClosed().subscribe((result) => {
      if (result) {
        this.store.dispatch(
          PublisherListActions.deletePublisher({
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
      PublisherListActions.getPublisherList({
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
    if ((sortState.active = "publisherName")) {
      if (sortState.direction === "asc") {
        this.store.dispatch(
          PublisherListActions.getPublisherList({
            payload: {
              page: 1,
              pageSize: this.pageSize,
            },
          })
        );
      } else if (sortState.direction === "desc") {
        this.store.dispatch(
          PublisherListActions.getPublisherList({
            payload: {
              sortBy: "publisherName_desc",
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
