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
import { Author } from "src/app/model/baseModel";
import { Voucher } from "src/app/model/voucher";
import { AdminService } from "../service/admin.service";
import { CheckDeactivate } from "../interface/admin.check_edit";
import { Category, CategoryParam } from "./category-detail.component.model";
import * as CategoryActions from "./category-detail.store.action";
import { State as CategoryState } from "./category-detail.store.reducer";
import { Store } from "@ngrx/store";
import { editCategory, getCategory, getMessage, getSysError } from "./category-detail.store.selector";
import { MessageService } from "src/app/utility/user_service/message.service";

@Component({
  selector: "app-book-detail",
  templateUrl: "./category-detail.component.html",
  styleUrls: ["./category-detail.component.css"],
})
export class CategoryDetailComponent
  implements OnInit, OnDestroy
{
  isEditing: boolean = true;
  category: Category = {
    id: "",
    name: "",
    description: "",
  };
  categoryParam!: CategoryParam;

  this_announce = "";
  firstTime = false;
  editformGroup_info!: FormGroup;

  errorMessageState!: Observable<any>;
  errorSystemState!: Observable<any>;
  categoryState!: Observable<any>;
  editCategoryState!: Observable<any>;
  subscriptions: Subscription[] = [];

  constructor(
    private adminService: AdminService,
    private dialog: MatDialog,
    private fb: FormBuilder,
    private store: Store<CategoryState>,
    private messageService: MessageService,
    private _route: ActivatedRoute,
    @Inject(MAT_DIALOG_DATA) public data: CategoryParam
  ) {
    this.categoryState = this.store.select(getCategory);
    this.editCategoryState = this.store.select(editCategory);
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
        this.category.name ?? "",
        Validators.compose([Validators.required, Validators.minLength(3)]),
      ],
      description: this.category.description,
    });

    this.subscriptions.push(
      this.categoryState.subscribe((state) => {
        if (state) {
          this.category = state;
          this.editformGroup_info.controls["name"].setValue(state.name);
      
          this.editformGroup_info.controls["description"].setValue(
            state.description
          );
        }
      })
    );

    this.subscriptions.push(
      this.editCategoryState.subscribe((state) => {
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
      CategoryActions.getCategory({
        payload: {
          id: this.data.id,
        },
      })
    );

    this.store.dispatch(CategoryActions.initial());

    //console.log(this.this_book);
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
  }

  ngOnDestroy(): void {
    console.log("Destroy");
    this.store.dispatch(CategoryActions.resetCategory());

    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }

  formReset(): void {
    this.editformGroup_info.setValue({
      name: this.category.name ?? "",
      description: this.category.description ?? "",
    });
  }

  formSubmit(): void {
    console.log(this.editformGroup_info.value);
  }

  formSubmit_edit_info(): void {
    const payload: Category = {
      id: this.data.id,
      name: this.editformGroup_info.value.name,
      description: this.editformGroup_info.value.description,
    };

    this.store.dispatch(
      CategoryActions.editCategory({
        payload: payload,
      })
    );
  }
}
