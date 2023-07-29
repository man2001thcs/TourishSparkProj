import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatListModule } from '@angular/material/list';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatInputModule } from '@angular/material/input';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import {MatMenuModule} from '@angular/material/menu';
import {MatIconModule} from '@angular/material/icon';
import { GuestRouterModule } from './guest.router';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatButtonModule} from '@angular/material/button';
import { StoreModule } from '@ngrx/store';

import { MainComponent } from './../main/main.component';
import { HeaderComponent } from '../header/header.component';
import { BookDetailComponent } from '../book-detail/book-detail.component';
import { BooklistComponent } from '../booklist/booklist.component';
import { LoginComponent } from '../log/login/login.component';

import { BookListEffects } from '../booklist/booklist.store.effect';
import { LoginEffects } from '../log/login/login.store.effect';

import { EffectsModule } from '@ngrx/effects';

import { storeKey as LoginStoreKey}  from '../log/login/login.store.action';
import { storeKey as BookListStoreKey}  from '../booklist/booklist.store.action';

import {reducer as BookListReducer}from '../booklist/booklist.store.reducer';
import {reducer as LoginReducer}from '../log/login/login.store.reducer';

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

    StoreModule.forFeature( LoginStoreKey,  LoginReducer ),
    StoreModule.forFeature( BookListStoreKey,  BookListReducer ),
    
    EffectsModule.forFeature([BookListEffects]),
    EffectsModule.forFeature([LoginEffects])
  ],
  exports: [RouterModule],
})
export class GuestModule {}
