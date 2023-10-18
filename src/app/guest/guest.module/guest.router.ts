import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { Routes } from "@angular/router";
import { MainComponent } from "../main/main.component";
import { RouterModule } from "@angular/router";

import { SearchResolver } from "../resolver/search.resolver";
import { HomeComponent } from "../home/home.component";
import { UserCreateComponent } from "../log/signIn/signIn-create.component";

const routes: Routes = [
  {
    path: "guest",
    component: MainComponent,
    children: [
      {
        path: "signIn",
        component: UserCreateComponent,
      },
      {
        path: "home",
        component: HomeComponent,
      },
    ],
  },
];

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GuestRouterModule {}
