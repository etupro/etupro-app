import { Component } from '@angular/core';
import { MatDialogActions, MatDialogContent, MatDialogRef, MatDialogTitle } from "@angular/material/dialog";
import { CommonModule } from "@angular/common";
import { MatButton } from "@angular/material/button";

@Component({
  selector: 'app-confirm-comment-deletion',
  templateUrl: './confirm-comment-deletion-dialog.component.html',
  styleUrls: ['./confirm-comment-deletion-dialog.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatButton,
  ]
})
export class ConfirmCommentDeletionDialogComponent {
  constructor(public dialogRef: MatDialogRef<ConfirmCommentDeletionDialogComponent>) {
  }

  cancel(): void {
    this.dialogRef.close(false);
  }

  accept() {
    this.dialogRef.close(true);
  }
}
