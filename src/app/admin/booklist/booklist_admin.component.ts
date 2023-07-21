import { AdminService } from './../service/admin.service';
import { HashService } from '../../utility/user_service/hash.service';
import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort, Sort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { Book } from 'src/app/model/book';
import { catchError, map, startWith, switchMap } from 'rxjs/operators';
@Component({
  selector: 'app-booklist',
  templateUrl: './booklist.component.html',
  styleUrls: ['./booklist.component.css'],
})
export class BooklistAdminComponent implements OnInit, AfterViewInit {
  book_list !: Book[];
  displayedColumns: string[] = ['id', 'name', 'description', 'type', 'page_number'];
  @ViewChild(MatPaginator) paraginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  clickedRows = new Set<any>();
  books_length = 0;
  constructor(private adminService: AdminService) {}

  ngOnInit(): void {
    this.adminService.getBookList(1, 10).subscribe((book_list) => {
      console.log(book_list);
      this.book_list = JSON.parse(book_list.data);
      this.books_length = book_list.length ?? 10;
    });
  }
  ngAfterViewInit(): void {
    //this.book_list.paginator = this.paraginator;

    this.paraginator.page
      .pipe(
        startWith({}),
        switchMap(() => {
          return this.adminService.getBookList(this.paraginator.pageIndex + 1, 10);
        }),
        map((data) => {
          // Flip flag to show that loading has finished.
          //console.log(data);
          if (data.data === null) {
            return [];
          }

          // Only refresh the result length if there is new data. In case of rate
          // limit errors, we do not want to reset the paginator to zero, as that
          // would prevent users from re-triggering requests.
          //this.da = data.total_count;
          return JSON.parse(data.data);
        })
      )
      .subscribe((data) => (this.book_list = data));
  }

  announceSortChange(sortState: Sort) {
    // This example uses English messages. If your application supports
    // multiple language, you would internationalize these strings.
    // Furthermore, you can customize the message to add additional
    // details about the values being sorted.
    if (sortState.direction === 'asc') {
      this.book_list?.sort((a: any, b: any) => {
        if (a.id < b.id) {
          return -1;
        } else if (a.id > b.id) {
          return 1;
        } else {
          return 0;
        }
      });
    } else if (sortState.direction === 'desc') {
      this.book_list?.sort((a: any, b: any) => {
        if (a.id < b.id) {
          return -1;
        } else if (a.id > b.id) {
          return 1;
        } else {
          return 0;
        }
      });
    } else {
    }
  }
}
