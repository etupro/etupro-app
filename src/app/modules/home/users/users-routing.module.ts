import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { authGuard } from '../../../core/guard/auth.guard';
import { UserComponent } from './user/user.component';
import { EditUserComponent } from './edit-user/edit-user.component';

const routes: Routes = [
  {
    path: 'new',
    component: EditUserComponent,
    canActivate: [authGuard],
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
