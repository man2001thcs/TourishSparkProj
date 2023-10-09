import { Component, OnInit, Inject, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

export interface DialogData {
  title: string;
}

@Component({
  selector: 'app-validation',
  templateUrl: './validation.component.html',
  styleUrls: ['./validation.component.css']
})
export class ValidationComponent implements OnInit {
  @Input() formGroup!: FormGroup;
  @Input() formGroupControlName = "";

  constructor() { }

  ngOnInit() {
  }
}