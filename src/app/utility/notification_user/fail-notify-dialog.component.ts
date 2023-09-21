import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NbDialogRef } from '@nebular/theme';

export interface DialogData {
  title: string;
  content: string;
}

@Component({
  selector: 'app-fail-confirm-dialog',
  templateUrl: './fail-notify-dialog.component.html',
})
export class FailNotifyDialogComponent {
  title = '';
  content = '';
  constructor(
    protected dialogRef: NbDialogRef<any>
  ) {}

  doAction(action: boolean) {
    this.dialogRef.close(action);
  }
}
