import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostRoutingModule } from "./post-routing.module";
import { MatCardModule } from "@angular/material/card";
import { CreatePostComponent } from "./create-post/create-post.component";
import { PostsComponent } from "./posts/posts.component";
import { MatIconModule } from "@angular/material/icon";
import { MatButtonModule } from "@angular/material/button";
import { PostComponent } from "./post/post.component";
import { ComponentsModule } from "../../shared/components/components.module";
import { ReactiveFormsModule } from "@angular/forms";
import { MatInputModule } from "@angular/material/input";
import { MatChipsModule } from "@angular/material/chips";
import { MatAutocompleteModule } from "@angular/material/autocomplete";
import { CommentCardComponent } from './post/comment-card/comment-card.component';
import { PublishCommentComponent } from './post/publish-comment/publish-comment.component';
import { ConfirmCommentDeletionDialogComponent } from './post/comment-card/confirm-comment-deletion-dialog/confirm-comment-deletion-dialog.component';
import { MatDialogModule } from "@angular/material/dialog";
import { PostCardComponent } from "./posts/post-card/post-card.component";
import { SearchBarComponent } from './posts/search-bar/search-bar.component';


@NgModule({
  declarations: [
    CreatePostComponent,
    PostComponent,
    PostsComponent,
    PostCardComponent,
    CommentCardComponent,
    PublishCommentComponent,
    ConfirmCommentDeletionDialogComponent,
    SearchBarComponent,
  ],
  imports: [
    CommonModule,
    PostRoutingModule,
    ComponentsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    MatChipsModule,
    MatIconModule,
    MatAutocompleteModule,
    MatCardModule,
    MatDialogModule
  ]
})
export class PostModule { }
