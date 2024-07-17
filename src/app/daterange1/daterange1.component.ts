import { ListKeyManager } from '@angular/cdk/a11y';
import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertComponent } from '../alert/alert.component';
import { MatDialog } from '@angular/material/dialog';


@Component({
  selector: 'app-daterange1',
  templateUrl: './daterange1.component.html',
  styleUrl: './daterange1.component.scss'
})
export class Daterange1Component {
  fromDate!: string;
  toDate!: string


  constructor(private fb: FormBuilder, private dialog: MatDialog) { }

  dateForm!: FormGroup

  ngOnInit() {
    this.createDateForm();
  }

  createDateForm() {
    this.dateForm = this.fb.group({
      'fromDate': ['', [Validators.required]],
      'toDate': ['', [Validators.required]],
    })
  }

  openAlertDialog(message: string): void {
    this.dialog.open(AlertComponent, {
      data: message,

    });
  }


  onSubmit(): void {
    const fromDate = new Date(this.dateForm.value.fromDate);
    const toDate = new Date(this.dateForm.value.toDate);

    const diff = Math.abs(toDate.getTime() - fromDate.getTime());
    const diffDays = Math.ceil(diff / (1000 * 3600 * 24));

    if (fromDate >= toDate) {
      fromDate=== toDate
      this.openAlertDialog('From date must be before the to date.');
      return;
    }
    if (diffDays > 30) {
      this.openAlertDialog('Please select a to date within 30 days from the fromDate');
    } else {
      console.log(this.dateForm.value);

    }

  }



}


