import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { authGuard } from '../../../core/guard/auth.guard';
import { ProfileComponent } from './profile/profile.component';
import { OrganizationComponent } from './organization/organization.component';

const routes: Routes = [
  {
    path: ':id',
    component: ProfileComponent,
    canActivate: [authGuard],
  },
  {
    path: ':id/organization',
    component: OrganizationComponent,
    canActivate: [authGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule {
}
