import { Component, Inject, OnInit, Input } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ConfirmDialogModel } from '../../models/confirm-dialog-model';
import { NgModel } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
  styleUrls: ['./confirm-dialog.component.css']
})
export class ConfirmDialogComponent implements OnInit {

  @Input() message = "";

  constructor(public modalActive: NgbActiveModal,
  ) { }

  ngOnInit() {
  }

  aceptar() {
    this.modalActive.close(true);
  }

  cancelar() {
    this.modalActive.close(false);
  }
  /*
    constructor(public dialogRef: MatDialogRef<ConfirmDialogComponent>,
      @Inject(MAT_DIALOG_DATA) public model: ConfirmDialogModel) { }

    ngOnInit() {
    }

    aceptar() {
      this.dialogRef.close(true);
    }

    cancelar() {
      this.dialogRef.close(false);
    }
  */

}
