import { BookDetailAdminComponent } from './../book-detail/book-detail_admin.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BooklistAdminComponent } from '../booklist/booklist_admin.component';
import { AdminMainComponent } from '../main/admin.main.component';
import { AdminRouter } from './admin.router';
import { MatListModule } from '@angular/material/list';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatInputModule } from '@angular/material/input';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { HeaderAdminComponent } from '../header/header.admin.component';
import { MatMenuModule } from '@angular/material/menu';
import { FooterComponent } from 'src/app/utility/footer/footer.component';
import { AuthorMultiselectAutocompleteComponent } from 'src/app/utility/author-multiselect-autocomplete/multiselect-autocomplete.component';
import { VoucherMultiselectAutocompleteComponent } from 'src/app/utility/voucher-multiselect-autocomplete/multiselect-autocomplete.component';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatChipsModule } from '@angular/material/chips';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
@NgModule({
  declarations: [
    BooklistAdminComponent,
    BookDetailAdminComponent,
    AdminMainComponent,
    HeaderAdminComponent,
    FooterComponent,
    AuthorMultiselectAutocompleteComponent,
    VoucherMultiselectAutocompleteComponent
  ],
  imports: [
    CommonModule,
    AdminRouter,
    MatInputModule,
    MatTableModule,
    MatMenuModule,
    MatPaginatorModule,
    MatSortModule,
    HttpClientModule,
    MatListModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatAutocompleteModule,
    MatChipsModule ,
    MatFormFieldModule,
    MatIconModule,
    MatButtonModule 
  ],
})
export class AdminModule {}
