import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


const routes: Routes = [
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full',
  },
  {
    path: 'home',
    loadChildren: () => import('./modules/home/home-routing.module').then(m => m.HomeRoutingModule),
  },
  {
    path: 'auth',
    loadChildren: () => import('./modules/auth/auth-routing.module').then(m => m.AuthRoutingModule),
  },
  {
    path: 'admin',
    loadChildren: () => import('./modules/admin/admin-routing.module').then(m => m.AdminRoutingModule),
  },
  {
    path: 'sapristi',
    loadChildren: () => import('./modules/sapristi/sapristi-routing.module').then(m => m.SapristiRoutingModule),
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
