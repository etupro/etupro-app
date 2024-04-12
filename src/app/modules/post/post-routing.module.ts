import { NgModule } from '@angular/core';
import { RouterModule, Routes } from "@angular/router";
import { PostsComponent } from "./posts/posts.component";
import { CreatePostComponent } from "./create-post/create-post.component";
import { PostComponent } from "./post/post.component";
import { canActivate, redirectUnauthorizedTo } from "@angular/fire/auth-guard";

const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo(['/auth/login']);


const routes: Routes = [
  {
    path: '',
    component: PostsComponent,
  },
  {
    path: 'create',
    component: CreatePostComponent,
    ...canActivate(redirectUnauthorizedToLogin),
  },
  {
    path: ':id',
    component: PostComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PostRoutingModule { }
