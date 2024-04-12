import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, FormGroup } from "@angular/forms";
import { Comment } from "../../../../shared/models/comment.model";
import { CommentsService } from "../../../../shared/services/comments.service";
import { AuthService } from "../../../../shared/services/auth.service";
import { Router } from "@angular/router";

@Component({
  selector: 'app-publish-comment',
  templateUrl: './publish-comment.component.html',
  styleUrls: ['./publish-comment.component.scss']
})
export class PublishCommentComponent {

  @Input() postId: string | undefined;
  @Output() commentPosted = new EventEmitter<void>();

  commentForm = new FormGroup({
    comment: new FormControl(''),
  })

  constructor(protected authService: AuthService, private router: Router, private commentService: CommentsService) {
  }

  addComment() {
    if (!this.authService.isLoggedIn) {
      this.router.navigate(['/auth/login']);
      return;
    }

    const authorId = this.authService.currentUser?.uid;
    const authorName = this.authService.currentUser?.displayName ?? 'Anonyme';
    const content = this.commentForm.value.comment;

    if (!content || !authorId || !authorName || !this.postId) {
      return;
    }

    const comment = new Comment({
      authorId,
      authorName,
      postId: this.postId,
      content,
      likes: 0,
    });

    this.commentService.create(comment).then(() => {
      this.commentForm.controls.comment.setValue('');
      this.commentForm.markAsPristine();
      this.commentForm.markAsUntouched();
      this.commentForm.updateValueAndValidity();
      this.commentPosted.emit();
    });
  }
}
