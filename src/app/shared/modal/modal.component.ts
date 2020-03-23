import { Component, Inject, ApplicationRef } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-shared-modal',
  template: `
    <h2 mat-dialog-title>{{data.title}}</h2>
    <mat-dialog-content class="mat-typography">
      <p>{{data.text}}</p>
    </mat-dialog-content>
    <mat-divider></mat-divider>
    <mat-dialog-actions align="end">
      <button mat-button color="primary" mat-dialog-close >Cancel</button>
      <button mat-button [mat-dialog-close]="true" cdkFocusInitial>Delete</button>
    </mat-dialog-actions>
  `
})
export class ModalComponent {
  constructor(
    public dialogRef: MatDialogRef<ModalComponent>,
    public applicationRef: ApplicationRef,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }
}
