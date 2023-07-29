import { Response } from '../../model/response';
import { Component, OnInit } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanDeactivate,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable, Subscription, map } from 'rxjs';
import { ConfirmDialogComponent } from 'src/app/utility/confirm-dialog/confirm-dialog.component';
import { NotifyDialogComponent } from 'src/app/utility/notification/notify-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Book } from 'src/app/model/book';
import { Author } from 'src/app/model/author';
import { Voucher } from 'src/app/model/voucher';
import { AdminService } from '../service/admin.service';
import { CheckDeactivate } from '../interface/admin.check_edit';
import { Category, CategoryParam } from './category-detail.component.model';
import * as CategoryActions from './category-detail.store.action';
import { State as CategoryState } from './category-detail.store.reducer';
import { Store } from '@ngrx/store';
import { editCategory, getCategory } from './category-detail.store.selector';

@Component({
  selector: 'app-book-detail',
  templateUrl: './category-detail.component.html',
  styleUrls: ['./category-detail.component.css'],
})
export class CategoryDetailComponent implements OnInit, CheckDeactivate {
  isEditing: boolean = true;
  category: Category = {
    id: '',
    name: '',
    description: '',
  };
  categoryParam!: CategoryParam;

  this_announce = '';

  editformGroup_info!: FormGroup;

  categoryState!: Observable<any>;
  editCategoryState!: Observable<any>;
  subscriptions: Subscription[] = [];

  constructor(
    private adminService: AdminService,
    private dialog: MatDialog,
    private fb: FormBuilder,
    private store: Store<CategoryState>,
    private _route: ActivatedRoute
  ) {
    this.categoryState = this.store.select(getCategory);
    this.editCategoryState = this.store.select(editCategory);
  }

  ngOnInit(): void {
    this.subscriptions.push(
      this.categoryState.subscribe((state) => {
        if (state) {
          this.category = state;
          this.editformGroup_info.controls['name'].setValue(state.name);
          this.editformGroup_info.controls['description'].setValue(state.description);

        }
      })
    );

    this.subscriptions.push(
      this.editCategoryState.subscribe((state) => {
        if (state) {
          console.log(state);
          this.openNotifyDialog(state);
        }
      })
    );

    const id = this._route.snapshot.paramMap.get('id') ?? '';

    console.log('id: ' + id);

    this._route.queryParamMap.subscribe((params) => {
      this.categoryParam = { id: id };

      this.store.dispatch(
        CategoryActions.getCategory({
          payload: {
            id: id,
          },
        })
      );
    });

    this.store.dispatch(CategoryActions.initial());

    //console.log(this.this_book);
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.editformGroup_info = this.fb.group({
      id: [
        id ?? '',
        Validators.compose([
          Validators.required,
          Validators.minLength(6),
          Validators.pattern(/^[a-z]{6,32}$/i),
        ]),
      ],
      name: [
        this.category.name ?? '',
        Validators.compose([Validators.required, Validators.minLength(3)]),
      ],
      description: this.category.description,
    });
  }

  formReset(): void {
    this.editformGroup_info.setValue({
      name: this.category.name ?? '',
      description: this.category.description ?? '',
    });
  }

  formSubmit(): void {
    console.log(this.editformGroup_info.value);
  }

  formSubmit_edit_info(): void {
    const payload: Category = {
      id: this.categoryParam.id,
      name: this.editformGroup_info.value.name,
      description: this.editformGroup_info.value.description,
    };

    this.store.dispatch(
      CategoryActions.editCategory({
        payload: payload,
      })
    );

    console.log(payload);
  }

  openDialog() {
    const ref = this.dialog.open(ConfirmDialogComponent, {
      data: {
        title: 'Bạn có muốn rời đi?',
      },
    });
    return ref.afterClosed();
  }

  openNotifyDialog(this_announce: string) {
    const ref = this.dialog.open(NotifyDialogComponent, {
      data: {
        title: this_announce,
      },
    });
    return ref.afterClosed();
  }

  checkDeactivate(
    currentRoute: ActivatedRouteSnapshot,
    currentState: RouterStateSnapshot,
    nextState?: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    return !this.editformGroup_info.dirty || this.openDialog();
  }
}
