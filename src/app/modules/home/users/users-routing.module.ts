import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { authGuard } from '../../../core/guard/auth.guard';
import { UserComponent } from './user/user.component';
import { EditUserComponent } from './edit-user/edit-user.component';
import { superAdminGuard } from '../../../core/guard/super-admin.guard';

const routes: Routes = [
  {
    path: 'new',
    component: EditUserComponent,
    canActivate: [superAdminGuard],
  },
  {
    path: ':id',
    component: UserComponent,
    canActivate: [authGuard],
  },
  {
    path: ':id/edit',
    component: EditUserComponent,
    canActivate: [authGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsersRoutingModule {
}
