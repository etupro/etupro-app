import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {PostRoutingModule} from "./post-routing.module";
import {MatCardModule} from "@angular/material/card";
import {CreatePostComponent} from "./create-post/create-post.component";
import {PostsComponent} from "./posts/posts.component";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatIconModule} from "@angular/material/icon";
import {MatButtonModule} from "@angular/material/button";
import {PostComponent} from "./post/post.component";
import {ComponentsModule} from "../../shared/components/components.module";
import {ReactiveFormsModule} from "@angular/forms";
import {MatInputModule} from "@angular/material/input";
import {MatChipsModule} from "@angular/material/chips";
import {MatAutocompleteModule} from "@angular/material/autocomplete";


@NgModule({
  declarations: [
    CreatePostComponent,
    PostComponent,
    PostsComponent,
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
  ]
})
export class PostModule { }