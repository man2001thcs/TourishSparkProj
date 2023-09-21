import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

export interface DialogData {
  title: string;
}

@Component({
  selector: 'app-fail-confirm-dialog',
  templateUrl: './fail-notify-dialog.component.html',
})
export class FailNotifyDialogComponent implements OnInit {
  title = '';
  constructor(
    public dialogRef: MatDialogRef<FailNotifyDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {}

  ngOnInit() {
    this.title = this.data.title;
  }

  doAction(action: boolean) {
    this.dialogRef.close(action);
  }
}
