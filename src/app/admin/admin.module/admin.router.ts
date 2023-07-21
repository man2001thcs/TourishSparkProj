import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes } from '@angular/router';
import { BookDetailAdminComponent } from '../book-detail/book-detail_admin.component';
import { BooklistAdminComponent } from '../booklist/booklist_admin.component';
import { AdminMainComponent } from '../main/admin.main.component';
import { CanEditAdminGuard } from '../guard/edit-admin-guard.guard';
import { CanLeaveEditGuard } from '../guard/can-leave-edit.guard';
import { RouterModule } from '@angular/router';

import { EditDetailResolver } from '../resolver/edit-detail.resolver';
const routes: Routes = [
  {
    path: '',
    component: AdminMainComponent,
    children: [
      // other configurations
      {
        path: 'detail/:id/edit',
        component: BookDetailAdminComponent,
        canActivate: [CanEditAdminGuard], // <== this is an array, we can have multiple guards
        canDeactivate: [CanLeaveEditGuard],
        resolve: {
          book_this: EditDetailResolver,
        },
      },
      {
        path: 'list',
        component: BooklistAdminComponent,
      },
    ],
  },
];

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRouter {}
