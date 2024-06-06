import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Comment } from "../../../../shared/models/comment.model";
import { CommentsService } from "../../../../shared/services/comments.service";
import { MatDialog } from "@angular/material/dialog";
import { ConfirmCommentDeletionDialogComponent } from "./confirm-comment-deletion-dialog/confirm-comment-deletion-dialog.component";
import { AuthService } from "../../../../shared/services/auth.service";

@Component({
  selector: 'app-comment-card',
  templateUrl: './comment-card.component.html',
  styleUrls: ['./comment-card.component.scss']
})
export class CommentCardComponent implements OnInit {

  @Input() comment: Comment.TableWithUserProfile;

  @Output() commentDeleted = new EventEmitter<void>();

  isUserComment = false;

  constructor(private commentsService: CommentsService,
              private authService: AuthService,
              private dialog: MatDialog) {
  }

  ngOnInit() {
    this.isUserComment = this.authService.userId === this.comment.user_profiles?.user_id;
  }

  deleteComment() {
    const dialogRef = this.dialog.open(ConfirmCommentDeletionDialogComponent);

    dialogRef.afterClosed().subscribe(async result => {
      if (result) {
        await this.commentsService.delete(this.comment.id);
        this.commentDeleted.emit();
      }
    });
  }
}
