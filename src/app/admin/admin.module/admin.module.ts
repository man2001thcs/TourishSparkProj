import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminMainComponent } from '../main/admin.main.component';
import { AdminRouter } from './admin.router';
import { MatListModule } from '@angular/material/list';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatInputModule } from '@angular/material/input';
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
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { BooklistAdminComponent } from '../booklist/booklist_admin.component';
import { BookDetailAdminComponent } from './../book-detail/book-detail_admin.component';
import { CategoryCreateComponent } from './../category-create/category-create.component';

import { storeKey as CategoryStoreKey } from '../category-detail/category-detail.store.action';
import { storeKey as CategoryListStoreKey } from '../category_list/categoryList_admin.store.action';
import { storeKey as CategoryCreateStoreKey } from '../category-create/category-create.store.action';

import { reducer as CategoryReducer } from '../category-detail/category-detail.store.reducer';
import { reducer as CategoryListReducer } from '../category_list/categoryList_admin.store.reducer';
import { reducer as CategoryCreateReducer } from '../category-create/category-create.store.reducer';

import { CategoryListAdminComponent } from '../category_list/categoryList_admin.component';
import { CategoryDetailComponent } from '../category-detail/category-detail.component';

import { CategoryListEffects } from '../category_list/categoryList_admin.store.effect';
import { CategoryEffects } from '../category-detail/category-detail.store.effect';
import { CategoryCreateEffects } from '../category-create/category-create.store.effect';

import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AuthInterceptor } from 'src/app/utility/user_service/http.inceptor';

@NgModule({
  declarations: [
    BooklistAdminComponent,
    BookDetailAdminComponent,
    CategoryDetailComponent,
    CategoryListAdminComponent,
    CategoryCreateComponent,

    AdminMainComponent,
    HeaderAdminComponent,
    FooterComponent,

    AuthorMultiselectAutocompleteComponent,
    VoucherMultiselectAutocompleteComponent,
  ],
  imports: [
    CommonModule,
    AdminRouter,
    MatInputModule,
    MatTableModule,
    MatMenuModule,
    MatPaginatorModule,
    MatSortModule,
    MatListModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatAutocompleteModule,
    MatChipsModule,
    MatFormFieldModule,
    MatIconModule,
    MatButtonModule,
    NgbDropdownModule,

    StoreModule.forFeature(CategoryListStoreKey, CategoryListReducer),
    StoreModule.forFeature(CategoryStoreKey, CategoryReducer),
    StoreModule.forFeature(CategoryCreateStoreKey, CategoryCreateReducer),

    EffectsModule.forFeature([CategoryListEffects]),
    EffectsModule.forFeature([CategoryEffects]),
    EffectsModule.forFeature([CategoryCreateEffects ]),
  ],
  
})
export class AdminModule {}
