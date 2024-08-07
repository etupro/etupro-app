import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { Subscription } from "rxjs";
import { PostsService } from "../../../../shared/services/posts.service";
import { Post } from "../../../../shared/models/post.model";
import { CommentsService } from "../../../../shared/services/comments.service";
import { Comment } from "../../../../shared/models/comment.model";
import { CommonModule } from "@angular/common";
import { NavigationComponent } from "../../../../shared/components/navidation/navigation.component";
import { MatIconButton } from "@angular/material/button";
import { MatIcon } from "@angular/material/icon";
import { MatCard, MatCardContent, MatCardFooter, MatCardTitle } from "@angular/material/card";
import { MatChipListbox, MatChipOption } from "@angular/material/chips";
import { PublishCommentComponent } from "../../../../shared/components/publish-comment/publish-comment.component";
import { CommentCardComponent } from "../../../../shared/components/comment-card/comment-card.component";
import { MatToolbar } from "@angular/material/toolbar";
import { SubHeaderComponent } from "../../../../shared/components/sub-header/sub-header.component";

@Component({
  selector: 'app-post',
  standalone: true,
  imports: [
    CommonModule,
    NavigationComponent,
    MatIconButton,
    MatIcon,
    MatCard,
    MatCardTitle,
    MatCardContent,
    MatCardFooter,
    MatChipListbox,
    MatChipOption,
    PublishCommentComponent,
    CommentCardComponent,
    MatToolbar,
    SubHeaderComponent
  ],
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

}
