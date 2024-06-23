import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { Subscription } from "rxjs";
import { PostsService } from "../../../shared/services/posts.service";
import { Post } from "../../../shared/models/post.model";
import { CommentsService } from "../../../shared/services/comments.service";
import { Comment } from "../../../shared/models/comment.model";

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit, OnDestroy {

  watcher = new Subscription();
  post: Post | undefined;
  postId: number;
  comments: Comment[] = [];

  postLoading = false;
  commentLoading = false;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private postsService: PostsService,
              private commentsService: CommentsService) {
  }

  ngOnInit() {
    this.watcher.add(this.route.params.subscribe(params => {
      this.postId = params['id'];
      this.postLoading = true
      this.postsService.getById(this.postId).then(response => {
        this.post = response.data ?? undefined;
      }).finally(() => {
        this.postLoading = false
      });
      this.updateCommentList()
    }))
  }

  ngOnDestroy() {
    this.watcher.unsubscribe();
  }

  updateCommentList() {
    this.commentLoading = true;
    this.commentsService.getAllFromPost(this.postId).then(response => {
      this.comments = response.data ?? [];
    }).finally(() => {
      this.commentLoading = false
    });
  }

  backToPosts() {
    this.router.navigate(['/', 'posts']);
  }
}
