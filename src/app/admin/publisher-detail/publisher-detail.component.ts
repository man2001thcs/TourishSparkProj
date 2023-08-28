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
import { NotifyDialogComponent } from "src/app/utility/notification/notify-dialog.component";
import { MAT_DIALOG_DATA, MatDialog } from "@angular/material/dialog";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from "@angular/forms";
import { ActivatedRoute } from "@angular/router";
import { Book } from "src/app/model/book";
import { AdminService } from "../service/admin.service";
import { CheckDeactivate } from "../interface/admin.check_edit";
import { Publisher, PublisherParam } from "./publisher-detail.component.model";
import * as PublisherActions from "./publisher-detail.store.action";
import { State as PublisherState } from "./publisher-detail.store.reducer";
import { Store } from "@ngrx/store";
import {
  editPublisher,
  getPublisher,
  getMessage,
  getSysError,
} from "./publisher-detail.store.selector";
import { MessageService } from "src/app/utility/user_service/message.service";

@Component({
  selector: "app-book-detail",
  templateUrl: "./publisher-detail.component.html",
  styleUrls: ["./publisher-detail.component.css"],
})
export class PublisherDetailComponent implements OnInit, OnDestroy {
  isEditing: boolean = true;
  publisher: Publisher = {
    id: "",
    publisherName: "",
    phoneNumber: "",
    address: "",
    email: "",
    description: "",
  };
  publisherParam!: PublisherParam;

  this_announce = "";
  firstTime = false;
  editformGroup_info!: FormGroup;

  errorMessageState!: Observable<any>;
  errorSystemState!: Observable<any>;
  publisherState!: Observable<any>;
  editPublisherState!: Observable<any>;
  subscriptions: Subscription[] = [];

  constructor(
    private adminService: AdminService,
    private dialog: MatDialog,
    private fb: FormBuilder,
    private store: Store<PublisherState>,
    private messageService: MessageService,
    private _route: ActivatedRoute,
    @Inject(MAT_DIALOG_DATA) public data: PublisherParam
  ) {
    this.publisherState = this.store.select(getPublisher);
    this.editPublisherState = this.store.select(editPublisher);
    this.errorMessageState = this.store.select(getMessage);
    this.errorSystemState = this.store.select(getSysError);
  }

  ngOnInit(): void {
    this.editformGroup_info = this.fb.group({
      id: [
        this.data.id,
        Validators.compose([
          Validators.required,
          Validators.minLength(6),
          Validators.pattern(/^[a-z]{6,32}$/i),
        ]),
      ],
      publisherName: [
        this.publisher.publisherName ?? "",
        Validators.compose([Validators.required, Validators.minLength(3)]),
      ],
      address: [
        this.publisher.address ?? "",
        Validators.compose([Validators.required, Validators.minLength(3)]),
      ],
      phoneNumber: [
        this.publisher.phoneNumber ?? "",
        Validators.compose([Validators.required, Validators.minLength(3)]),
      ],
      email: [
        this.publisher.email ?? "",
        Validators.compose([Validators.required, Validators.minLength(3)]),
      ],

      description: this.publisher.description,
    });

    this.subscriptions.push(
      this.publisherState.subscribe((state) => {
        if (state) {
          this.publisher = state;
          this.editformGroup_info.controls["publisherName"].setValue(state.publisherName);
          this.editformGroup_info.controls["email"].setValue(
            state.email
          );
          this.editformGroup_info.controls["address"].setValue(
            state.address
          );
          this.editformGroup_info.controls["phoneNumber"].setValue(
            state.phoneNumber
          );
          this.editformGroup_info.controls["description"].setValue(
            state.description
          );
        }
      })
    );

    this.subscriptions.push(
      this.editPublisherState.subscribe((state) => {
        if (state) {
          this.messageService.openMessageNotifyDialog(state.messageCode);
        }
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

    this.store.dispatch(
      PublisherActions.getPublisher({
        payload: {
          id: this.data.id,
        },
      })
    );

    this.store.dispatch(PublisherActions.initial());

    //console.log(this.this_book);
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
  }

  ngOnDestroy(): void {
    console.log("Destroy");
    this.store.dispatch(PublisherActions.resetPublisher());

    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }

  formReset(): void {
    this.editformGroup_info.setValue({
      publisherName: this.publisher.publisherName ?? "",
      description: this.publisher.description ?? "",
    });
  }

  formSubmit(): void {
    console.log(this.editformGroup_info.value);
  }

  formSubmit_edit_info(): void {
    const payload: Publisher = {
      id: this.data.id,
      publisherName: this.editformGroup_info.value.publisherName,
      description: this.editformGroup_info.value.description,
      address: this.editformGroup_info.value.address,
      email: this.editformGroup_info.value.email,
      phoneNumber: this.editformGroup_info.value.phoneNumber,
    };

    this.store.dispatch(
      PublisherActions.editPublisher({
        payload: payload,
      })
    );
  }
}
