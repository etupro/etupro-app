import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from "@angular/forms";
import { Comment } from "../../models/comment.model";
import { CommentsService } from "../../services/comments.service";
import { AuthService } from "../../services/auth.service";
import { Router } from "@angular/router";
import { UserProfileService } from "../../services/user-profile.service";
import { CommonModule } from "@angular/common";
import { MatFormField, MatLabel } from "@angular/material/form-field";
import { MatInput } from "@angular/material/input";
import { MatButton } from "@angular/material/button";

@Component({
  selector: 'app-publish-comment',
  templateUrl: './publish-comment.component.html',
  styleUrls: ['./publish-comment.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormField,
    MatInput,
    MatButton,
    MatLabel
  ]
})
export class PublishCommentComponent {

  @Input() postId: number | undefined;
  @Output() commentPosted = new EventEmitter<void>();

  commentForm = new FormGroup({
    comment: new FormControl(''),
  });

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

    const author = this.authService.userProfile;
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
