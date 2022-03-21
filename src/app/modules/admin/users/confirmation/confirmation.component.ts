import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-confirmation',
  templateUrl: './confirmation.component.html',
  styleUrls: ['./confirmation.component.scss']
})
export class ConfirmationComponent implements OnInit {
  message: string = '¿Está seguro que desea eliminar el usuario?';

  constructor(
    private dialogRef: MatDialogRef<ConfirmationComponent>,
  ) { }

  ngOnInit(): void {
  }

  closeDialog() {
    this.dialogRef.close('Ok');
  }
}
