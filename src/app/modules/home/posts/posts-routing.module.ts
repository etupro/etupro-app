import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PostsComponent } from './posts/posts.component';
import { PostComponent } from './post/post.component';
import { authGuard } from '../../../core/guard/auth.guard';
import { SearchPostsComponent } from './search-posts/search-posts.component';
import { EditPostComponent } from './edit-post/edit-post.component';

const routes: Routes = [
  {
    path: '',
    component: PostsComponent,
  },
  {
    path: 'search',
    component: SearchPostsComponent,
  },
  {
    path: 'create',
    component: EditPostComponent,
    canActivate: [authGuard],
  },
  {
    path: ':id',
    component: PostComponent,
  },
  {
    path: ':id/edit',
    component: EditPostComponent,
    canActivate: [authGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PostsRoutingModule {
}
