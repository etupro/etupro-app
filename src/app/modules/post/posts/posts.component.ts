import {Component, OnInit} from '@angular/core';
import {PostsService} from "../../../shared/services/posts.service";
import {Post} from "../../../shared/models/post.model";

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss']
})
export class PostsComponent implements OnInit {

  posts: Post[] = [];

  constructor(private postsService: PostsService) {
  }

  ngOnInit(): void {
    this.postsService.getAll().subscribe(posts => this.posts = posts);
  }


}
