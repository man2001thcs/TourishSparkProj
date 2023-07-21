import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

export interface DialogData {
  title: string;
}

@Component({
  selector: 'app-confirm-dialog',
  templateUrl: './notify-dialog.component.html',
  styleUrls: ['./notify-dialog.component.css'],
})
export class NotifyDialogComponent implements OnInit {
  title = '';
  constructor(
    public dialogRef: MatDialogRef<NotifyDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {}

  ngOnInit() {
    if (this.data.title === 'BOOK_EDIT_OK') {
      this.title = 'Thay đổi thông tin thành công';
    } else  if (this.data.title === 'BOOK_EDIT_FAIL') {
      this.title = 'Thay đổi thông tin thất bại';
    }
  }

  doAction(action: boolean) {
    this.dialogRef.close(action);
  }
}
