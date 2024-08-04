import { Component, OnInit } from '@angular/core';
import { PostsService } from "../../../../shared/services/posts.service";
import { Post } from "../../../../shared/models/post.model";
import { Router } from "@angular/router";
import { CommonModule } from "@angular/common";
import { NavigationComponent } from "../../../../shared/components/navidation/navigation.component";
import { SearchBarComponent } from "../../../../shared/components/search-bar/search-bar.component";
import { MatButton } from "@angular/material/button";
import { PostCardComponent } from "../../../../shared/components/post-card/post-card.component";
import { MatToolbar } from "@angular/material/toolbar";

@Component({
  selector: 'app-posts',
  standalone: true,
  imports: [
    CommonModule,
    NavigationComponent,
    SearchBarComponent,
    MatButton,
    PostCardComponent,
    MatToolbar
  ],
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss']
})
export class PostsComponent implements OnInit {

  posts: Post[] = [];
  postsLoading = false;

  constructor(private postsService: PostsService, private router: Router) {
  }

  ngOnInit(): void {
    this.searchPosts([]);
  }

  searchPosts(tags: string[]) {
    this.postsLoading = true;
    this.postsService.getAllByTags(tags).then(response => {
      this.posts = response.data ?? [];
    }).finally(() => {
      this.postsLoading = false
    });
  }

  navigateToPostCreation() {
    this.router.navigate(['/', 'posts', 'create'])
  }

  navigateToPost(post: Post) {
    this.router.navigate(['/', 'posts', post.id])
  }

  handleTagSearch(tags: string[]) {
    this.searchPosts(tags);
  }
}
