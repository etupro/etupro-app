import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AdminComponent } from './admin.component';
import { superAdminGuard } from '../../core/guard/super-admin.guard';


const routes: Routes = [
  {
    path: '',
    component: AdminComponent,
    canActivate: [superAdminGuard],
    children: [
      {
        path: '',
        component: DashboardComponent,
      },
      {
        path: 'users',
        loadChildren: () => import('./users/users-routing.module').then(m => m.UsersRoutingModule),
      },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule {
}
