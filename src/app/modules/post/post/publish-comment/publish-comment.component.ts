import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, FormGroup } from "@angular/forms";
import { Comment } from "../../../../shared/models/comment.model";
import { CommentsService } from "../../../../shared/services/comments.service";
import { AuthService } from "../../../../shared/services/auth.service";
import { Router } from "@angular/router";
import { UserProfileService } from "../../../../shared/services/user-profile.service";

@Component({
  selector: 'app-publish-comment',
  templateUrl: './publish-comment.component.html',
  styleUrls: ['./publish-comment.component.scss']
})
export class PublishCommentComponent {

  @Input() postId: number | undefined;
  @Output() commentPosted = new EventEmitter<void>();

  commentForm = new FormGroup({
    comment: new FormControl(''),
  })

  constructor(protected authService: AuthService,
              private router: Router,
              private commentService: CommentsService,
              private userProfileService: UserProfileService) {
  }

  async addComment() {
    if (!this.authService.isLoggedIn) {
      this.router.navigate(['/auth/login']);
      return;
    }

    const userId = this.authService.userId;
    if (!userId) {
      throw new Error('No user id found');
    }

    const authorResponse = await this.userProfileService.getByUserId(userId);
    const author = authorResponse.data;
    if (!author) {
      throw new Error('No author found');
    }
    const content = this.commentForm.value.comment;

    if (!content || !this.postId) {
      return;
    }

    const comment: Comment.Insert = {
      user_profile_id: author.id,
      post_id: this.postId,
      content,
    };

    this.commentService.create(comment).then(() => {
      this.commentForm.controls.comment.setValue('');
      this.commentForm.markAsPristine();
      this.commentForm.markAsUntouched();
      this.commentForm.updateValueAndValidity();
      this.commentPosted.emit();
    });
  }
}
