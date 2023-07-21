import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatInputModule } from '@angular/material/input';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { UserRouterModule } from './user.router';
import { MatGridListModule } from '@angular/material/grid-list';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import { MainUserComponent } from '../main/main.user.component';
import { HeaderUserComponent } from '../header/header.user.component';
import { BookUserlistComponent } from '../booklist/book-user-list.component';
import { BookUserDetailComponent } from '../book-detail/book-user-detail.component';
import { BookCardComponent } from 'src/app/utility/book-card/book-card.component';

@NgModule({
  declarations: [
    MainUserComponent,
    BookUserlistComponent,
    BookUserDetailComponent,
    HeaderUserComponent,
    BookCardComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    UserRouterModule,
    MatListModule,
    MatTableModule,
    MatPaginatorModule,
    MatCardModule,
    MatSortModule,
    MatProgressBarModule,
    MatIconModule,
    MatInputModule,
    MatGridListModule,
    MatDialogModule,
    MatMenuModule,
    HttpClientModule,
    ReactiveFormsModule,
  ],
  exports: [RouterModule],
})
export class UserModule {}
