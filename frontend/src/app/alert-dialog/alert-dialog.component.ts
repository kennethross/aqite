import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

interface AlertDialogData {
  title: string;
  message: string;
  cancelTitleBtn: string;
  okTitleBtn: string;
}

@Component({
  selector: 'app-alert-dialog',
  templateUrl: './alert-dialog.component.html',
  styleUrls: ['./alert-dialog.component.scss']
})
export class AlertDialogComponent {
  dialogData: AlertDialogData;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: AlertDialogData,
  ) {
    this.dialogData = {
      title: data.title || '',
      message: data.message || '',
      cancelTitleBtn: data.cancelTitleBtn || '',
      okTitleBtn: data.okTitleBtn || '',
    }
  }
}
