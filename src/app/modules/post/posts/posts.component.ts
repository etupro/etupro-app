import { Component, OnInit } from '@angular/core';
import { PostsService } from "../../../shared/services/posts.service";
import { Post } from "../../../shared/models/post.model";
import { Router } from "@angular/router";

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss']
})
export class PostsComponent implements OnInit {

  posts: Post.Table[] = [];
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

  navigateToPost(post: Post.Table) {
    this.router.navigate(['/', 'posts', post.id])
  }

  handleTagSearch(tags: string[]) {
    this.searchPosts(tags);
  }
}
