import { NgModule } from '@angular/core';
import { RouterModule, Routes, CanLoad } from '@angular/router';
import { CanLoadGuardAdmin } from './admin/guard/can-load.guard';
import { isAdminGuard } from './admin/guard/can-load.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'guest/home',
    pathMatch: 'full',
  },
  {
    path: 'admin',
    loadChildren: () =>
      import('./admin/admin.module/admin.module').then((m) => m.AdminModule),
    canLoad: [isAdminGuard],
    data :{permittedRoles:['Admin']}
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
