import { Response } from './../../model/response';
import { Component, OnInit } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanDeactivate,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable, map } from 'rxjs';
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
@Component({
  selector: 'app-book-detail',
  templateUrl: './book-detail.component.html',
  styleUrls: ['./book-detail.component.css'],
})
export class BookDetailAdminComponent implements CheckDeactivate {
  isEditing: boolean = true;
  this_book!: Book;

  this_announce = '';

  editformGroup_info!: FormGroup;
  editformGroup_number!: FormGroup;
  editformGroup_description!: FormGroup;

  author_list!: Author[];
  author_all!: Author[];
  author_submit!: number[];

  voucher_list!: Voucher[];
  voucher_all!: Voucher[];
  voucher_submit!: number[];

  constructor(
    private adminService: AdminService,
    private dialog: MatDialog,
    private fb: FormBuilder,
    private _route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this._route.data
      .pipe(map((data) => data['book_this']))
      .subscribe(async (book) => {
        console.log(book);
        this.this_book = book;
        await this.adminService
          .getAuthors(book.WpBookAuthor.authors_id)
          .subscribe((response) => {
            let response_array = JSON.parse(response.data);
            //console.log(response_array.all);
            this.author_list = response_array.single;
            this.author_all = response_array.all;
          });

        await this.adminService
          .getVouchers(book.WpBookVoucher.vouchers_id)
          .subscribe((response) => {
            let response_array = JSON.parse(response.data);
            //console.log(response_array.all);
            this.voucher_list = response_array.single;
            this.voucher_all = response_array.all;
          });
      });
    //console.log(this.this_book);
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.editformGroup_info = this.fb.group({
      id: [
        this.this_book.WpBook.id,
        Validators.compose([
          Validators.required,
          Validators.minLength(6),
          Validators.pattern(/^[a-z]{6,32}$/i),
        ]),
      ],
      name: [
        this.this_book.WpBook.name,
        Validators.compose([Validators.required, Validators.minLength(3)]),
      ],
      page_number: this.this_book.WpBook.page_number,
      type: this.this_book.WpBook.type,
    });

    this.editformGroup_description = this.fb.group({
      description: this.this_book.WpBook.description,
    });

    this.editformGroup_number = this.fb.group({
      bought_number: this.this_book.WpBookNumber.bought_number,
      remain_number: this.this_book.WpBookNumber.remain_number,
      price: this.this_book.WpBookNumber.price,
    });
  }

  formReset(): void {
    this.editformGroup_info.setValue({
      name: this.this_book.WpBook.name ?? '',
      description: this.this_book.WpBook.description ?? '',
      page_number: this.this_book.WpBook.page_number ?? '',
    });
  }

  formSubmit(): void {
    console.log(this.editformGroup_info.value);
  }

  formSubmit_edit_info(): void {
    this.adminService
      .editBook_info(
        this.this_book.WpBook.id,
        this.editformGroup_info.value.name,
        this.editformGroup_info.value.type,
        this.editformGroup_info.value.page_number
      )
      .subscribe((response) => {
        if (response.code === 'BOOK_EDIT_OK') {
          this.this_announce = response.code;
          this.openNotifyDialog();
          this.this_book.WpBook.name = this.editformGroup_info.value.name;
          this.this_book.WpBook.type = this.editformGroup_info.value.name;
          this.this_book.WpBook.page_number =
            this.editformGroup_info.value.page_number;
        }
      });
  }

  formReset_edit_info(): void {
    this.editformGroup_info.setValue({
      id: this.this_book.WpBook.id,
      name: this.this_book.WpBook.name ?? '',
      page_number: this.this_book.WpBook.page_number ?? '',
      type: this.this_book.WpBook.type,
    });
  }

  openDialog() {
    const ref = this.dialog.open(ConfirmDialogComponent, {
      data: {
        title: 'Bạn có muốn rời đi?',
      },
    });
    return ref.afterClosed();
  }

  openNotifyDialog() {
    const ref = this.dialog.open(NotifyDialogComponent, {
      data: {
        title: this.this_announce,
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

  selectChange_author = (event: any) => {
    console.log(event.data);
    this.author_submit = [...event.data];
    //console.log(this.author_submit);
  };

  selectChange_voucher = (event: any) => {
    console.log(event.data);
    this.voucher_submit = [...event.data];
    //console.log(this.author_submit);
  };
}
