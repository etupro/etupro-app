import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {Subscription} from "rxjs";
import {PostsService} from "../../../shared/services/posts.service";
import {Post} from "../../../shared/models/post.model";
import {CommentsService} from "../../../shared/services/comments.service";
import {Comment} from "../../../shared/models/comment.model";

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit, OnDestroy {

  watcher = new Subscription();
  post: Post | undefined;
  comments: Comment[] = [];

  constructor(private route: ActivatedRoute,
              private postsService: PostsService,
              private commentsService: CommentsService) {
  }

  ngOnInit() {
    this.watcher.add(this.route.params.subscribe(params => {
      const postId = params['id'] + '';
      this.postsService.get(postId).subscribe(post => this.post = post);
      this.commentsService.getAllFromPost(postId).subscribe(comments => this.comments = comments);
    }))
  }

  ngOnDestroy() {
    this.watcher.unsubscribe();
  }

}
