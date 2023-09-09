import { NgModule } from '@angular/core';
import { RouterModule, Routes, CanLoad } from '@angular/router';
import { CanLoadGuardAdmin } from './admin/guard/can-load.guard';
import { CanLoadUserGuard } from './user/guard/can-load-user.guard';
import { isAdminGuard } from './admin/guard/can-load.guard';
import { isGuestGuard } from './guest/guard/can-load-guest.guard';
const routes: Routes = [
  {
    path: '',
    redirectTo: 'guest/home',
    pathMatch: 'full',
  },
  {
    path: '',
    loadChildren: () =>
      import('./guest/guest.module/guest.module').then((m) => m.GuestModule),
    canLoad: [isGuestGuard],
    data :{permittedRoles:['Guest']}
  },
  {
    path: 'admin',
    loadChildren: () =>
      import('./admin/admin.module/admin.module').then((m) => m.AdminModule),
    canLoad: [isAdminGuard],
    data :{permittedRoles:['Admin']}
  },
  {
    path: 'user',
    loadChildren: () =>
      import('./user/user.module/user.module').then((m) => m.UserModule),
    canLoad: [CanLoadUserGuard],
    data :{permittedRoles:['User']}
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
