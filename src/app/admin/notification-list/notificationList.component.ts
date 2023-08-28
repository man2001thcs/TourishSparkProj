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
import { NotificationModel } from "./notificationList.component.model";
import { catchError, map, startWith, switchMap } from "rxjs/operators";
import { Store } from "@ngrx/store";
import { Observable, Subscription } from "rxjs";
import { State as NotificationListState } from "./notificationList.store.reducer";
import {
  getNotificationList,
  getDeleteStatus,
  getMessage,
  getSysError,
} from "./notificationList.store.selector";
import * as NotificationListActions from "./notificationList.store.action";
import { MatDialog } from "@angular/material/dialog";
import { MessageService } from "src/app/utility/user_service/message.service";
import { ConfirmDialogComponent } from "src/app/utility/confirm-dialog/confirm-dialog.component";
import { NotificationListStoreService } from "./notificationList.store.service";
import { SignalRService } from "src/app/user/service/signalR.service";
import { TokenStorageService } from "src/app/utility/user_service/token.service";

@Component({
  selector: "app-notificationList",
  templateUrl: "./notificationList.component.html",
  styleUrls: ["./notificationList.component.css"],
})
export class NotificationListAdminComponent
  implements OnInit, AfterViewInit, OnDestroy
{
  notificationList: NotificationModel[] = [];
  notificationHub: NotificationModel[] = [];
  subscriptions: Subscription[] = [];

  notificationListState!: Observable<any>;
  notificationDeleteState!: Observable<any>;
  errorMessageState!: Observable<any>;
  errorSystemState!: Observable<any>;

  displayedColumns: string[] = [
    "id",
    "userId",
    "content",
    "isRead",
    "isDeleted",
    "createDate",
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
    private storeService: NotificationListStoreService,
    private tokenService: TokenStorageService,
    private signalRService: SignalRService,
    private store: Store<NotificationListState>
  ) {
    this.notificationListState = this.store.select(getNotificationList);
    this.notificationDeleteState = this.store.select(getDeleteStatus);
    this.errorMessageState = this.store.select(getMessage);
    this.errorSystemState = this.store.select(getSysError);
  }

  ngOnInit(): void {
    this.subscriptions.push(
      this.notificationListState.subscribe((state) => {
        if (state) {
          this.notificationList = state.data;
          this.length = state.count;
        }
      })

      // 1 - start a connection
    );

    this.subscriptions.push(
      this.notificationDeleteState.subscribe((state) => {
        if (state) {
          console.log("abc: ", state);
          this.messageService.openMessageNotifyDialog(state.messageCode);

          if (state.resultCd === 0) {
            this.store.dispatch(
              NotificationListActions.getNotificationList({
                payload: {
                  page: this.pageIndex + 1,
                },
              })
            );
          }
        }
      })
    );

    this.signalRService.startConnection("user/notify").then(() => {
      // 2 - register for ALL relay
      this.signalRService.listenToAllFeedsTwo("SendOffersToUser");
      this.signalRService.invokeAllFeeds("SendString", "abc");

      // 3 - subscribe to messages received
      this.subscriptions.push(
        this.signalRService.AllFeedObservable.subscribe(
          (res: NotificationModel) => {
            this.notificationList = [...this.notificationList, res];
            this.notificationHub = [...this.notificationHub, res];
            console.log(this.notificationHub);
          }
        )
      );
    });

    this.store.dispatch(NotificationListActions.initial());

    this.store.dispatch(
      NotificationListActions.getNotificationList({
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
    this.signalRService.stopConnect();
    this.store.dispatch(NotificationListActions.resetNotificationList());
    this.messageService.closeAllDialog();

    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
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
        title: "Bạn có muốn xóa notification này không?",
      },
    });

    ref.afterClosed().subscribe((result) => {
      if (result) {
        this.store.dispatch(
          NotificationListActions.deleteNotification({
            payload: {
              id: id,
            },
          })
        );
      }
    });
  }

  addNotification(): void {
    var notification: NotificationModel = {
      content: "ha ha",
      userId: this.tokenService.getUser()?.Id,
      isDeleted: false,
      isRead: false,
    };
    console.log(this.tokenService.getUser()?.Id);
    this.signalRService.invokeFeed(
      "SendOffersToUser",
      this.tokenService.getUser()?.Id,
      notification
    );
    //this.signalRService.invokeAllFeeds("SendString", "abc");
    //this.signalRService.invokeAllFeeds("SendOffersToAll", notification);
  }

  stopConnection(){
    this.signalRService.stopConnect();
  }

  handlePageEvent(e: PageEvent) {
    // this.length = e.length;

    this.pageSize = e.pageSize;
    this.pageIndex = e.pageIndex;

    console.log(this.pageIndex);

    this.store.dispatch(
      NotificationListActions.getNotificationList({
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
          NotificationListActions.getNotificationList({
            payload: {
              page: 1,
              pageSize: this.pageSize,
            },
          })
        );
      } else if (sortState.direction === "desc") {
        this.store.dispatch(
          NotificationListActions.getNotificationList({
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
