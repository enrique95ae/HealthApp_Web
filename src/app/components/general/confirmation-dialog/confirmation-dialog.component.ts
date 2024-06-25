import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-confirmation-dialog',
  template: `
    <h2 mat-dialog-title>Unsaved Changes</h2>
    <mat-dialog-content>Are you sure you want to discard your changes?</mat-dialog-content>
    <mat-dialog-actions>
      <button mat-button (click)="onCancel()">Cancel</button>
      <button mat-button (click)="onConfirm()">Discard</button>
    </mat-dialog-actions>
  `,
  styles: [
    `
      mat-dialog-content {
        font-size: 16px;
      }
      mat-dialog-actions {
        justify-content: flex-end;
      }
    `
  ]
})
export class ConfirmationDialogComponent {
  constructor(private dialogRef: MatDialogRef<ConfirmationDialogComponent>) {}

  onConfirm(): void {
    this.dialogRef.close(true);
  }

  onCancel(): void {
    this.dialogRef.close(false);
  }
}