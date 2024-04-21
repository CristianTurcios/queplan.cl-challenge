// import { Component } from '@angular/core';
import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Friend } from 'src/app/models/friend';
// import {
//   MatDialog,
//   MatDialogRef,
//   MatDialogActions,
//   MatDialogClose,
//   MatDialogTitle,
//   MatDialogContent,
// } from '@angular/material/dialog';
// import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss'],
})
export class DialogComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: Friend) {}
}
