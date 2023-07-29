import { Book } from 'src/app/model/book';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HashService } from '../../utility/user_service/hash.service';
@Component({
  selector: 'app-book-detail',
  templateUrl: './book-detail.component.html',
  styleUrls: ['./book-detail.component.css'],
})
export class BookDetailComponent implements OnInit {
  book: Book = {
    WpBook: {
      id: 0,
      name: '',
      page_number: 0,
      description: '',
      type: '',
    },
    WpBookNumber: {
      id: 0,
      price: 0,
      remain_number: 0,
      bought_number: 0,
    },
    WpBookAuthor: {
      id: 0,
      string_array: '',
    },
    WpBookVoucher: {
      id: 0,
      vouchers_id: '',
    },
  };
  constructor(
    private _route: ActivatedRoute,
    private hash: HashService
  ) {}
  ngOnInit(): void {
    // this.guestService
    //   .getBook(this._route.snapshot.paramMap.get('id')!)
    //   .subscribe((book) => (this.book = book));
    // let encrypted = this.hash.encrypted_string('abc', '123');
    // console.log(encrypted);
    // console.log(this.hash.dencrypted_array(encrypted, '123'));
  }
}
