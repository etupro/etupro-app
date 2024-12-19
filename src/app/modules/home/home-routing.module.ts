import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { authGuard } from '../../core/guard/auth.guard';
import { HomeComponent } from './home.component';


const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    children: [
      {
        path: '',
        redirectTo: 'posts',
        pathMatch: 'full',
      },
      {
        path: 'posts',
        loadChildren: () => import('./posts/posts-routing.module').then(m => m.PostsRoutingModule),
      },
      {
        path: 'users',
        loadChildren: () => import('./users/users-routing.module').then(m => m.UsersRoutingModule),
        canActivate: [authGuard]
      },
      {
        path: 'organizations',
        loadChildren: () => import('./organizations/organizations-routing.module').then(m => m.OrganizationsRoutingModule),
        canActivate: [authGuard]
      },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule {
}
