import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatListModule } from '@angular/material/list';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatInputModule } from '@angular/material/input';
import { HttpClientModule } from '@angular/common/http';
import { LoginComponent } from '../log/login/login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import {MatMenuModule} from '@angular/material/menu';
import {MatIconModule} from '@angular/material/icon';
import { GuestRouterModule } from './guest.router';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatButtonModule} from '@angular/material/button';

import { MainComponent } from './../main/main.component';
import { HeaderComponent } from '../header/header.component';
import { BooklistComponent } from '../booklist/booklist.component';
import { BookDetailComponent } from '../book-detail/book-detail.component';

@NgModule({
  declarations: [MainComponent, BooklistComponent, BookDetailComponent, LoginComponent, HeaderComponent],
  imports: [
    CommonModule,
    RouterModule,
    GuestRouterModule,
    MatListModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatIconModule,
    MatInputModule,
    MatGridListModule,
    MatProgressSpinnerModule,
    MatButtonModule,
    MatDialogModule,
    MatMenuModule,
    HttpClientModule,
    ReactiveFormsModule,
  ],
  exports: [RouterModule],
})
export class GuestModule {}
