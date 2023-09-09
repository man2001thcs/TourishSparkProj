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
import { Author, AuthorParam } from "./author-create.component.model";
import * as AuthorActions from "./author-create.store.action";
import { State as AuthorState } from "./author-create.store.reducer";
import { Store } from "@ngrx/store";
import {
  createAuthor,
  getMessage,
  getSysError,
} from "./author-create.store.selector";
import { FailNotifyDialogComponent } from "src/app/utility/notification/fail-notify-dialog.component";
import { MessageService } from "src/app/utility/user_service/message.service";

@Component({
  selector: "app-book-create",
  templateUrl: "./author-create.component.html",
  styleUrls: ["./author-create.component.css"],
})
export class AuthorCreateComponent implements OnInit, OnDestroy {
  isEditing: boolean = true;

  authorParam!: AuthorParam;

  this_announce = "";

  createformGroup_info!: FormGroup;

  errorMessageState!: Observable<any>;
  errorSystemState!: Observable<any>;

  authorState!: Observable<any>;
  createAuthorState!: Observable<any>;
  subscriptions: Subscription[] = [];

  constructor(
    private dialog: MatDialog,
    private fb: FormBuilder,
    private store: Store<AuthorState>,
    private messageService: MessageService,
    private _route: ActivatedRoute,
    @Inject(MAT_DIALOG_DATA) public data: AuthorParam
  ) {
    this.createAuthorState = this.store.select(createAuthor);

    this.errorMessageState = this.store.select(getMessage);
    this.errorSystemState = this.store.select(getSysError);
  }

  ngOnInit(): void {
    this.subscriptions.push(
      this.createAuthorState.subscribe((state) => {
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

    this.store.dispatch(AuthorActions.initial());

    //console.log(this.this_book);
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.createformGroup_info = this.fb.group({
      name: [
        "",
        Validators.compose([Validators.required, Validators.minLength(3)]),
      ],
      address: [""],
      phoneNumber: [""],
      email: [""],
      description: "",
    });
  }

  ngOnDestroy(): void {
    console.log("Destroy");
    this.store.dispatch(AuthorActions.resetAuthor());

    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }

  formReset(): void {
    this.createformGroup_info.setValue({
      name: "",
      address: "",
      email: "",
      phoneNumber: "",
      description: "",
    });
  }

  formSubmit_create_info(): void {
    const payload: Author = {
      name: this.createformGroup_info.value.name,
      description: this.createformGroup_info.value.description,
      address: this.createformGroup_info.value.address,
      email: this.createformGroup_info.value.email,
      phoneNumber: this.createformGroup_info.value.phoneNumber,
    };

    this.store.dispatch(
      AuthorActions.createAuthor({
        payload: payload,
      })
    );

    console.log(payload);
  }
}
