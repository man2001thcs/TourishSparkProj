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
import { Author } from "src/app/model/author";
import { Voucher } from "src/app/model/voucher";
import { AdminService } from "../service/admin.service";
import { CheckDeactivate } from "../interface/admin.check_edit";
import { Category, CategoryParam } from "./category-create.component.model";
import * as CategoryActions from "./category-create.store.action";
import { State as CategoryState } from "./category-create.store.reducer";
import { Store } from "@ngrx/store";
import { createCategory, getMessage, getSysError } from "./category-create.store.selector";
import { FailNotifyDialogComponent } from "src/app/utility/notification/fail-notify-dialog.component";
import { MessageService } from "src/app/utility/user_service/message.service";

@Component({
  selector: "app-book-create",
  templateUrl: "./category-create.component.html",
  styleUrls: ["./category-create.component.css"],
})
export class CategoryCreateComponent implements OnInit, OnDestroy {
  isEditing: boolean = true;

  category: Category = {
    name: "",
    description: "",
  };

  categoryParam!: CategoryParam;

  this_announce = "";

  createformGroup_info!: FormGroup;

  errorMessageState!: Observable<any>;
  errorSystemState!: Observable<any>;

  categoryState!: Observable<any>;
  createCategoryState!: Observable<any>;
  subscriptions: Subscription[] = [];

  constructor(
    private dialog: MatDialog,
    private fb: FormBuilder,
    private store: Store<CategoryState>,
    private messageService: MessageService,
    private _route: ActivatedRoute,
    @Inject(MAT_DIALOG_DATA) public data: CategoryParam
  ) {
    this.createCategoryState = this.store.select(createCategory);

    this.errorMessageState =this.store.select(getMessage);
    this.errorSystemState =this.store.select(getSysError);
  }

  ngOnInit(): void {
    this.subscriptions.push(
      this.createCategoryState.subscribe((state) => {
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

    this.store.dispatch(CategoryActions.initial());

    //console.log(this.this_book);
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.createformGroup_info = this.fb.group({
      name: [
        this.category.name ?? "",
        Validators.compose([Validators.required, Validators.minLength(3)]),
      ],
      description: this.category.description,
    });
  }

  ngOnDestroy(): void {
    console.log("Destroy");
    this.store.dispatch(CategoryActions.resetCategory());

    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }

  formReset(): void {
    this.createformGroup_info.setValue({
      name: this.category.name ?? "",
      description: this.category.description ?? "",
    });
  }

  formSubmit_create_info(): void {
    const payload: Category = {
      name: this.createformGroup_info.value.name,
      description: this.createformGroup_info.value.description,
    };

    this.store.dispatch(
      CategoryActions.createCategory({
        payload: payload,
      })
    );

    console.log(payload);
  }
}
