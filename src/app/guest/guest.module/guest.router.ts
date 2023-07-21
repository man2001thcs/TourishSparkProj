import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes } from '@angular/router';
import { BooklistComponent } from '../booklist/booklist.component';
import { BookDetailComponent } from '../book-detail/book-detail.component';
import { MainComponent } from '../main/main.component';
import { RouterModule } from '@angular/router';
const routes : Routes = [
  {
    path: "guest", 
    component: MainComponent,
    children: [
      {
        path: "list",
        component: BooklistComponent,
      },
      {
        path: "detail/:id",
        component: BookDetailComponent,
      }
    ]
  }
]


@NgModule({
  declarations: [],
  imports: [
    CommonModule, RouterModule.forChild(routes)
  ], 
  exports: [RouterModule]
})
export class GuestRouterModule { }
