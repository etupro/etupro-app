import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Comment } from "../../../../shared/models/comment.model";
import { CommentsService } from "../../../../shared/services/comments.service";
import { MatDialog } from "@angular/material/dialog";
import { ConfirmCommentDeletionDialogComponent } from "./confirm-comment-deletion-dialog/confirm-comment-deletion-dialog.component";
import { Auth } from "@angular/fire/auth";

@Component({
  selector: 'app-comment-card',
  templateUrl: './comment-card.component.html',
  styleUrls: ['./comment-card.component.scss']
})
export class CommentCardComponent implements OnInit {

  @Input() comment: Comment;

  @Output() commentPosted = new EventEmitter<void>();

  isUserComment = false;

  constructor(private commentsService: CommentsService,
              private auth: Auth,
              public dialog: MatDialog) {
  }

  ngOnInit() {
    this.isUserComment = this.auth.currentUser?.uid === this.comment.authorId;
  }

  deleteComment() {
    const dialogRef = this.dialog.open(ConfirmCommentDeletionDialogComponent);

    dialogRef.afterClosed().subscribe(async result => {
      if (result) {
        await this.commentsService.delete(this.comment.id);
        this.commentPosted.emit();
      }
    });
  }
}
