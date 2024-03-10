import {Component, OnInit} from '@angular/core';
import {PostsService} from "../../../shared/services/posts.service";
import {Post} from "../../../shared/models/post.model";
import {Router} from "@angular/router";

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss']
})
export class PostsComponent implements OnInit {

  posts: Post[] = [];

  constructor(private postsService: PostsService, private router: Router) {
  }

  ngOnInit(): void {
    this.postsService.getAll().then(posts => {
      this.posts = posts;
    });
  }

  postClick(post: Post) {
    this.router.navigate(['/', 'posts', post.id])
  }
}
