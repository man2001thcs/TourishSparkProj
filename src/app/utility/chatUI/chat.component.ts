import { Response } from "../../model/response";
import { Component, Inject, OnDestroy, OnInit } from "@angular/core";
import {
  ActivatedRouteSnapshot,
  CanDeactivate,
  RouterStateSnapshot,
  UrlTree,
} from "@angular/router";
import { Observable, Subscription, map } from "rxjs";
import {
  ConfirmDialogComponent,
  DialogData,
} from "src/app/utility/confirm-dialog/confirm-dialog.component";
import { MAT_DIALOG_DATA, MatDialog } from "@angular/material/dialog";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from "@angular/forms";
import { ActivatedRoute } from "@angular/router";
import { MessageModel } from "./chat.component.model";
import * as MessageActions from "./chat.store.action";
import { State as MessageState } from "./chat.store.reducer";
import { Store } from "@ngrx/store";
import { getMessage, getSysError } from "./chat.store.selector";
import { MessageService } from "src/app/utility/user_service/message.service";
import { SignalRService } from "src/app/user/service/signalR.service";
import { TokenStorageService } from "../user_service/token.service";

@Component({
  selector: "app-chat",
  templateUrl: "./chat.component.html",
  styleUrls: ["./chat.component.css"],
})
export class ChatComponent implements OnInit, OnDestroy {
  isEditing: boolean = true;

  this_announce = "";

  createformGroup_info!: FormGroup;

  errorMessageState!: Observable<any>;
  errorSystemState!: Observable<any>;

  messageState!: Observable<any>;
  getMessageState!: Observable<any>;

  messageList: MessageModel[] = [];
  messageHub: MessageModel[] = [];
  subscriptions: Subscription[] = [];

  length = 0;
  pageSize = 5;
  pageIndex = 0;

  messages?: any;

  constructor(
    private dialog: MatDialog,
    private fb: FormBuilder,
    private store: Store<MessageState>,
    private signalRService: SignalRService,
    private tokenService: TokenStorageService,
    private messageService: MessageService,
    private _route: ActivatedRoute,
  ) {
    this.getMessageState = this.store.select(getMessage);

    this.errorMessageState = this.store.select(getMessage);
    this.errorSystemState = this.store.select(getSysError);
  }

  ngOnInit(): void {
    this.subscriptions.push(
      this.getMessageState.subscribe((state) => {
        if (state) {
          this.messageList = state;

          this.messageList.forEach(message => {
            this.messages.push({
              text: message.content,
              date: new Date(),
              reply: true,
              type: (message.files ? message.files.length : null) ? "file" : "text",
              files: message.files,
              user: {
                name: message.UserSentName,
                avatar: "https://i.gifer.com/no.gif",
              },
            });
          })
        }
      })
    );

    this.signalRService.startConnection("user/notify").then(() => {
      // 2 - register for ALL relay
      this.signalRService.listenToAllFeedsTwo("SendMessageToUser");
      this.signalRService.invokeAllFeeds("SendString", "abc");

      // 3 - subscribe to messages received
      this.subscriptions.push(
        this.signalRService.AllFeedObservable.subscribe((res: MessageModel) => {
          this.messageList = [...this.messageList, res];
          this.messageHub = [...this.messageHub, res];

          this.messages.push({
            text: res.content,
            date: new Date(),
            reply: true,
            type: (res.files ? res.files.length : null) ? "file" : "text",
            files: res.files,
            user: {
              name: this.tokenService.getUser()?.fullname,
              avatar: "https://i.gifer.com/no.gif",
            },
          });
        })
      );
    });

    this.store.dispatch(MessageActions.initial());

    this.store.dispatch(
      MessageActions.getMessage({
        payload: {
          page: this.pageIndex + 1,
        },
      })
    );

    //console.log(this.this_book);
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
  }

  ngOnDestroy(): void {
    console.log("Destroy");
    this.store.dispatch(MessageActions.resetMessage());

    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }

  sendMessage(event: any) {
    const files = !event.files
      ? []
      : event.files.map((file: any) => {
          return {
            url: file.src,
            type: file.type,
            icon: "file-text-outline",
          };
        });

    var message: MessageModel = {
      content: event.message,
      userSendId: this.tokenService.getUser()?.Id,
      userReceiveId: "",
      isDeleted: false,
      isRead: false,
    };
    console.log(this.tokenService.getUser()?.Id);

    this.signalRService.invokeFeed(
      "SendMessageToUser",
      this.tokenService.getUser()?.Id,
      this.tokenService.getUser()?.Id,
      message
    );
  }
}
