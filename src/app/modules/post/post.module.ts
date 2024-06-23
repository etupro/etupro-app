import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostRoutingModule } from "./post-routing.module";
import { MatCardModule } from "@angular/material/card";
import { CreatePostComponent } from "./create-post/create-post.component";
import { PostsComponent } from "./posts/posts.component";
import { MatIconModule } from "@angular/material/icon";
import { MatButtonModule } from "@angular/material/button";
import { PostComponent } from "./post/post.component";
import { ReactiveFormsModule } from "@angular/forms";
import { MatInputModule } from "@angular/material/input";
import { MatChipsModule } from "@angular/material/chips";
import { MatAutocompleteModule } from "@angular/material/autocomplete";
import { CommentCardComponent } from '../../shared/components/comment-card/comment-card.component';
import { PublishCommentComponent } from '../../shared/components/publish-comment/publish-comment.component';
import { MatDialogModule } from "@angular/material/dialog";
import { PostCardComponent } from "../../shared/components/post-card/post-card.component";
import { SearchBarComponent } from '../../shared/components/search-bar/search-bar.component';
import { HeaderComponent } from "../../shared/components/header/header.component";
import { SinglePictureInputComponent } from "../../shared/components/single-picture-input/single-picture-input.component";
import { AutocompleteInputComponent } from "../../shared/components/autocomplete-input/autocomplete-input.component";


@NgModule({
  declarations: [
    CreatePostComponent,
    PostComponent,
    PostsComponent,
  ],
  imports: [
    CommonModule,
    PostRoutingModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    MatChipsModule,
    MatIconModule,
    MatAutocompleteModule,
    MatCardModule,
    MatDialogModule,
    HeaderComponent,
    SearchBarComponent,
    PostCardComponent,
    PublishCommentComponent,
    CommentCardComponent,
    SinglePictureInputComponent,
    AutocompleteInputComponent,
  ]
})
export class PostModule { }
