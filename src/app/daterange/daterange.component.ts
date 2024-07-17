import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { AlertDialogComponent } from '../alert-dialog/alert-dialog.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-daterange',
  templateUrl: './daterange.component.html',
  styleUrl: './daterange.component.scss',
})
export class DaterangeComponent {
  dateForm!: FormGroup;

  constructor(private fb: FormBuilder, private dialog: MatDialog) {

  }


  openAlertDialog(message: string): void {
    this.dialog.open(AlertDialogComponent, {
      data: message,

    });
  }
  ngOnInit() {
    // console.log(this.dateForm);
    const today = new Date();
    const futureDate = new Date();
    futureDate.setDate(today.getDate() + 30);


    this.dateForm = this.fb.group({
      fromDate: [today.toISOString().substring(0, 10), Validators.required],
      toDate: [futureDate.toISOString().substring(0, 10), [Validators.required]]
    });


    this.dateForm.get('fromDate')?.valueChanges.subscribe((fromDate) => {
      if (fromDate) {
        const toDate = new Date(fromDate);
        toDate.setDate(toDate.getDate() + 30);
        this.dateForm.get('toDate')?.setValue(toDate.toISOString().substring(0, 10),{emitEvent: false});

      }
   
    });

    this.dateForm.get('toDate')?.valueChanges.subscribe((toDate) => {
      if (toDate) {
        const fromDate = new Date(toDate);
        fromDate.setDate(fromDate.getDate() - 30);
        this.dateForm.get('fromDate')?.setValue(fromDate.toISOString().substring(0, 10));
      }
    });

  }
  onSubmit(): void {
    const fromDate = new Date(this.dateForm.value.fromDate);
    const toDate = new Date(this.dateForm.value.toDate);

    const diff = Math.abs(toDate.getTime() - fromDate.getTime());
    const diffDays = Math.ceil(diff / (1000 * 3600 * 24));

    if (diffDays < 30) {
      this.openAlertDialog('Please select a to-date with a gap of at least 30 days from the from-date.');
    } else {
      console.log('Form Submitted', this.dateForm.value);

    }
  }


  get fromDate() {
    return this.dateForm?.get('fromDate')
  }

  get toDate() {
    return this.dateForm?.get('toDate')
  }
}