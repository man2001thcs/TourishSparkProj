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
import { NotifyDialogComponent } from "src/app/utility/notification_admin/notify-dialog.component";
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
import { Author, AuthorParam } from "./author-detail.component.model";
import * as AuthorActions from "./author-detail.store.action";
import { State as AuthorState } from "./author-detail.store.reducer";
import { Store } from "@ngrx/store";
import {
  editAuthor,
  getAuthor,
  getMessage,
  getSysError,
} from "./author-detail.store.selector";
import { MessageService } from "src/app/utility/user_service/message.service";

@Component({
  selector: "app-book-detail",
  templateUrl: "./author-detail.component.html",
  styleUrls: ["./author-detail.component.css"],
})
export class AuthorDetailComponent implements OnInit, OnDestroy {
  isEditing: boolean = true;
  author: Author = {
    id: "",
    name: "",
    phoneNumber: "",
    address: "",
    email: "",
    description: "",
  };
  authorParam!: AuthorParam;

  this_announce = "";
  firstTime = false;
  editformGroup_info!: FormGroup;

  errorMessageState!: Observable<any>;
  errorSystemState!: Observable<any>;
  authorState!: Observable<any>;
  editAuthorState!: Observable<any>;
  subscriptions: Subscription[] = [];

  constructor(
    private adminService: AdminService,
    private dialog: MatDialog,
    private fb: FormBuilder,
    private store: Store<AuthorState>,
    private messageService: MessageService,
    private _route: ActivatedRoute,
    @Inject(MAT_DIALOG_DATA) public data: AuthorParam
  ) {
    this.authorState = this.store.select(getAuthor);
    this.editAuthorState = this.store.select(editAuthor);
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
      name: [
        this.author.name ?? "",
        Validators.compose([Validators.required, Validators.minLength(3)]),
      ],
      address: [
        this.author.address ?? "",
        Validators.compose([Validators.required, Validators.minLength(3)]),
      ],
      phoneNumber: [
        this.author.phoneNumber ?? "",
        Validators.compose([Validators.required, Validators.minLength(3)]),
      ],
      email: [
        this.author.email ?? "",
        Validators.compose([Validators.required, Validators.minLength(3)]),
      ],

      description: this.author.description,
    });

    this.subscriptions.push(
      this.authorState.subscribe((state) => {
        if (state) {
          this.author = state;
          this.editformGroup_info.controls["name"].setValue(state.name);
          this.editformGroup_info.controls["discountFloat"].setValue(
            state.discountFloat
          );
          this.editformGroup_info.controls["discountAmount"].setValue(
            state.discountAmount
          );
          this.editformGroup_info.controls["description"].setValue(
            state.description
          );
        }
      })
    );

    this.subscriptions.push(
      this.editAuthorState.subscribe((state) => {
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
          this.messageService.openFailNotifyDialog(state);
        }
      })
    );

    this.store.dispatch(
      AuthorActions.getAuthor({
        payload: {
          id: this.data.id,
        },
      })
    );

    this.store.dispatch(AuthorActions.initial());

    //console.log(this.this_book);
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
  }

  ngOnDestroy(): void {
    console.log("Destroy");
    this.store.dispatch(AuthorActions.resetAuthor());

    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }

  formReset(): void {
    this.editformGroup_info.setValue({
      name: this.author.name ?? "",
      description: this.author.description ?? "",
    });
  }

  formSubmit(): void {
    console.log(this.editformGroup_info.value);
  }

  formSubmit_edit_info(): void {
    const payload: Author = {
      id: this.data.id,
      name: this.editformGroup_info.value.name,
      description: this.editformGroup_info.value.description,
      address: this.editformGroup_info.value.address,
      email: this.editformGroup_info.value.email,
      phoneNumber: this.editformGroup_info.value.phoneNumber,
    };

    this.store.dispatch(
      AuthorActions.editAuthor({
        payload: payload,
      })
    );
  }
}
