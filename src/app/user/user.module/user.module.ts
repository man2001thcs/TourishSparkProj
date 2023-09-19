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

import { BookCardComponent } from 'src/app/utility/book-card/book-card.component';
import { EffectsModule } from '@ngrx/effects';

import {
  NbButtonModule,
  NbCardModule,
  NbCheckboxModule,
  NbDialogModule,
  NbIconModule,
  NbInputModule,
  NbLayoutModule,
  NbMenuModule,
  NbPopoverModule,
  NbProgressBarModule,
  NbRadioModule,
  NbSidebarModule,
  NbSpinnerModule,
  NbTabsetModule,
  NbTagModule,
  NbThemeModule,
} from "@nebular/theme";

import { StoreModule } from '@ngrx/store';
import { NgbModule, NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { BookDetailComponent } from '../book-detail/book-detail.component';
import { HeaderComponent } from '../header/header.component';
import { BookListSearchComponent } from '../search/book-category/bookList_search.component';
import { HomeComponent } from '../home/home.component';
import { BookListCategoryComponent } from '../home/book-category/bookList_category.component';
import { SearchComponent } from '../search/search.component';
import { BookListSaleComponent } from '../home/book-sale/bookList_sale.component';
import { SharedModule } from 'src/app/shared.module';

import { storeKey as BookListSaleStoreKey } from "../home/book-sale/bookList_sale.store.action";
import { storeKey as BookListCategoryStoreKey } from "../home/book-category/bookList_category.store.action";
import { storeKey as BookDetailStoreKey } from "../book-detail/book-detail.store.action";

import { reducer as BookListSaleReducer } from "../home/book-sale/bookList_sale.store.reducer";
import { reducer as BookListCategoryReducer } from "../home/book-category/bookList_category.store.reducer";
import { reducer as BookDetailReducer } from "../book-detail/book-detail.store.reducer";
import { BookDetailEffects } from '../book-detail/book-detail.store.effect';
import { BookListSaleEffects } from '../home/book-sale/bookList_sale.store.effect';
import { BookListCategoryEffects } from '../home/book-category/bookList_category.store.effect';
import { CartComponent } from '../cart/cart.component';

@NgModule({
  declarations: [
    MainUserComponent,
    BookDetailComponent,
    HeaderComponent,
    BookListSearchComponent,
    BookListCategoryComponent,
    HomeComponent, 
    SearchComponent,
    BookListSaleComponent,
    CartComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    UserRouterModule,
    HttpClientModule,
    ReactiveFormsModule,

    NbMenuModule.forRoot(),
    NbThemeModule.forRoot(),  
    NbSidebarModule.forRoot(),
    NbDialogModule.forRoot(),

    SharedModule,

    NgbModule,
    NgbPaginationModule,
   
    HttpClientModule,
    ReactiveFormsModule,

    StoreModule.forFeature(BookListSaleStoreKey, BookListSaleReducer),
    StoreModule.forFeature(BookListCategoryStoreKey, BookListCategoryReducer),

    StoreModule.forFeature(BookDetailStoreKey, BookDetailReducer),



    EffectsModule.forFeature([BookDetailEffects]),
    EffectsModule.forFeature([BookListSaleEffects]),
    EffectsModule.forFeature([BookListCategoryEffects]),

  ],
  exports: [RouterModule],
})
export class UserModule {}
