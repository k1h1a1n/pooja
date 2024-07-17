import { Component, Inject } from '@angular/core';
import { AlertDialogComponent } from '../alert-dialog/alert-dialog.component';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-dialogcontent',
  templateUrl: './dialogcontent.component.html',
  styleUrl: './dialogcontent.component.scss'
})
export class DialogcontentComponent {
  constructor(
    public dialogRef: MatDialogRef<AlertDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public message: string = 'Please select a to-date with a gap of at least 30 days from the from-date.'
  ) {}

  onClose(): void {
    this.dialogRef.close();
  }
}
