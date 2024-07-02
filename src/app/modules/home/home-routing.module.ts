import { NgModule } from '@angular/core';
import { RouterModule, Routes } from "@angular/router";
import { authGuard } from "../../core/guard/auth.guard";
import { HomeComponent } from "./home.component";


const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    children: [
      {
        path: '',
        redirectTo: '/posts',
        pathMatch: 'full',
      },
      {
        path: 'posts',
        loadChildren: () => import('./posts/posts-routing.module').then(m => m.PostsRoutingModule),
      },
      {
        path: 'user',
        loadChildren: () => import('./user/user-routing.module').then(m => m.UserRoutingModule),
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
