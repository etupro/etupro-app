import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { authGuard } from '../../../core/guard/auth.guard';
import { UserComponent } from './user/user.component';

const routes: Routes = [
  {
    path: ':id',
    component: UserComponent,
    canActivate: [authGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsersRoutingModule {
}
