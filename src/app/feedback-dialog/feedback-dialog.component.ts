import { Component, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material';

@Component({
  selector: 'app-feedback-dialog',
  templateUrl: './feedback-dialog.component.html',
  styleUrls: ['./feedback-dialog.component.css']
})
export class FeedbackDialogComponent implements OnInit {

  constructor(private dialogRef: MatDialogRef<FeedbackDialogComponent>) { }

  ngOnInit() {
  }

  public closeDialog() {
    this.dialogRef.close();
  }

  }
