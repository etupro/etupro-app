import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { PostsService } from '../../../../shared/services/posts.service';
import { Post } from '../../../../shared/models/post.model';
import { CommentsService } from '../../../../shared/services/comments.service';
import { Comment } from '../../../../shared/models/comment.model';
import { CommonModule } from '@angular/common';
import { MatIconButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { MatCard, MatCardContent, MatCardFooter, MatCardTitle } from '@angular/material/card';
import { PublishCommentComponent } from '../../../../shared/components/publish-comment/publish-comment.component';
import { CommentCardComponent } from '../../../../shared/components/comment-card/comment-card.component';
import { StorageService } from '../../../../shared/services/storage.service';
import { MarkdownComponent } from 'ngx-markdown';
import { MatMenu, MatMenuItem, MatMenuTrigger } from '@angular/material/menu';
import { MatDialog } from '@angular/material/dialog';
import { ConfimDeleteDialogComponent } from '../../../../shared/components/dialogs/confim-delete-dialog/confim-delete-dialog.component';
import { AuthService } from '../../../../shared/services/auth.service';
import { OrganizationMiniaturesComponent } from '../../../../shared/components/organization-miniatures/organization-miniatures.component';
import { PostChipListComponent } from '../../../../shared/components/post-chip-list/post-chip-list.component';
import BucketName = StorageService.BucketName;

@Component({
  selector: 'app-post',
  standalone: true,
  imports: [
    CommonModule,
    MatIconButton,
    MatIcon,
    MatCard,
    MatCardTitle,
    MatCardContent,
    MatCardFooter,
    PublishCommentComponent,
    CommentCardComponent,
    MarkdownComponent,
    MatMenu,
    MatMenuTrigger,
    MatMenuItem,
    OrganizationMiniaturesComponent,
    PostChipListComponent,
  ],
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit, OnDestroy {

  watcher = new Subscription();
  post: Post | null = null;
  postId: number | null = null;
  coverUrl: string | undefined;
  comments: Comment[] = [];

  postLoading = false;
  commentLoading = false;

  isUserPost = false;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private postsService: PostsService,
              private storageService: StorageService,
              private commentsService: CommentsService,
              protected authService: AuthService,
              private dialog: MatDialog) {
  }

  ngOnInit() {
    this.watcher.add(this.route.params.subscribe(params => {
      this.postId = params['id'];
      if (this.postId) {
      this.postLoading = true;
        this.postsService.getById(this.postId).then(post => {
          if (post) {
            this.post = post;
            this.isUserPost = post.user_profile_id === this.authService.userProfileId;
          } else {
            this.router.navigate(['/']);
          }
        }).finally(() => {
          this.postLoading = false;
        }).then(async () => {
          if (this.post?.cover) {
            this.coverUrl = await this.storageService.getSignedUrl(StorageService.BucketName.POST_COVERS, this.post.cover);
          }
        });
        this.updateCommentList();
      }
    }));
  }

  ngOnDestroy() {
    this.watcher.unsubscribe();
  }

  updateCommentList() {
    if (this.postId) {
      this.commentLoading = true;
      this.commentsService.getAllFromPost(this.postId).then(comments => {
        this.comments = comments;
      }).finally(() => {
        this.commentLoading = false;
      });
    }
  }

  editPost() {
    if (this.postId) {
      this.router.navigate(['/', 'home', 'posts', this.postId, 'edit']);
    }
  }

  confirmDeletePost() {
    const dialogRef = this.dialog.open(ConfimDeleteDialogComponent);

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.deletePost();
      }
    });
  }

  async deletePost() {
    if (this.postId) {
      await this.postsService.delete(this.postId);
      if (this.post?.cover) {
        await this.storageService.deleteFromBucket(BucketName.POST_COVERS, this.post.cover);
      }
      this.router.navigate(['/']);
    }
  }

  handleOrganizationClick(organizationId: number) {
    this.router.navigate(['/', 'home', 'organizations', organizationId]);
  }

}
