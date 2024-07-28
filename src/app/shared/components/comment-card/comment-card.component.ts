import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Comment } from "../../models/comment.model";
import { CommentsService } from "../../services/comments.service";
import { MatDialog } from "@angular/material/dialog";
import { ConfirmCommentDeletionDialogComponent } from "./confirm-comment-deletion-dialog/confirm-comment-deletion-dialog.component";
import { AuthService } from "../../services/auth.service";
import { CommonModule } from "@angular/common";
import { MatCard, MatCardContent, MatCardFooter } from "@angular/material/card";
import { MatIcon } from "@angular/material/icon";
import { MatIconButton } from "@angular/material/button";

@Component({
  selector: 'app-comment-card',
  templateUrl: './comment-card.component.html',
  styleUrls: ['./comment-card.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    MatCard,
    MatCardContent,
    MatCardFooter,
    MatIcon,
    MatIconButton,
  ]
})
export class CommentCardComponent implements OnInit {

  @Input() comment: Comment;

  @Output() commentDeleted = new EventEmitter<void>();

  isUserComment = false;

  constructor(private commentsService: CommentsService,
              private authService: AuthService,
              private dialog: MatDialog) {
  }

  ngOnInit() {
    this.isUserComment = this.authService.userProfileId === this.comment.user_profiles?.id;
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
