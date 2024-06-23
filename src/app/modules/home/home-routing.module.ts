import { NgModule } from '@angular/core';
import { RouterModule, Routes } from "@angular/router";
import { noAuthGuard } from "../../core/guard/auth.guard";
import { HomeNavigationComponent } from "./home-navigation/home-navigation.component";


const routes: Routes = [
  {
    path: '',
    component: HomeNavigationComponent,
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
        canActivate: [noAuthGuard]
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
