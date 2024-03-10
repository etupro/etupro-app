import {Component} from '@angular/core';
import {MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-confirm-comment-deletion',
  templateUrl: './confirm-comment-deletion-dialog.component.html',
  styleUrls: ['./confirm-comment-deletion-dialog.component.scss']
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
