import {Component, Input, OnInit} from '@angular/core';
import {Comment} from "../../../../shared/models/comment.model";
import {CommentsService} from "../../../../shared/services/comments.service";
import {MatDialog} from "@angular/material/dialog";
import {
  ConfirmCommentDeletionDialogComponent
} from "./confirm-comment-deletion-dialog/confirm-comment-deletion-dialog.component";
import {Auth} from "@angular/fire/auth";

@Component({
  selector: 'app-comment-card',
  templateUrl: './comment-card.component.html',
  styleUrls: ['./comment-card.component.scss']
})
export class CommentCardComponent implements OnInit {

  @Input() comment: Comment;

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

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.commentsService.delete(this.comment.id);
      }
    });
  }
}
