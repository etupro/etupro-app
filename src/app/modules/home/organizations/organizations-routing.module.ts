import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { authGuard } from '../../../core/guard/auth.guard';
import { OrganizationComponent } from './organization/organization.component';

const routes: Routes = [
  {
    path: 'new',
    component: OrganizationComponent,
    canActivate: [authGuard],
  },
  {
    path: ':id',
    component: OrganizationComponent,
    canActivate: [authGuard],
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrganizationsRoutingModule {
}
