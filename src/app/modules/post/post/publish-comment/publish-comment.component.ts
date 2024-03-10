import {Component, Input} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Auth} from "@angular/fire/auth";
import {Comment} from "../../../../shared/models/comment.model";
import {CommentsService} from "../../../../shared/services/comments.service";

@Component({
  selector: 'app-publish-comment',
  templateUrl: './publish-comment.component.html',
  styleUrls: ['./publish-comment.component.scss']
})
export class PublishCommentComponent {

  @Input('postId') postId: string | undefined;

  commentForm = new FormGroup({
    comment: new FormControl('', [Validators.required],),
  })

  constructor(private auth: Auth, private commentService: CommentsService) {
  }

  addComment() {
    const authorId = this.auth.currentUser?.uid;
    const authorName = this.auth.currentUser?.displayName ?? 'Anonyme';

    if (!this.commentForm.valid || !authorId || !authorName || !this.postId) {
      return;
    }

    const content = this.commentForm.value.comment!;

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
      this.commentForm.updateValueAndValidity()
    });
  }
}
