import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ConfirmDialogComponent } from './components/confirm-dialog/confirm-dialog.component';
import { NgbToast } from '@ng-bootstrap/ng-bootstrap';
import { ToastGlobalComponent } from './components/toast-global/toast-global.component';
import { MessageOkComponent } from './components/message-ok/message-ok.component';

@NgModule({
  declarations: [
    ConfirmDialogComponent, ToastGlobalComponent, MessageOkComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    FormsModule,
    NgbToast
  ],
  exports: [
    ConfirmDialogComponent,
    ToastGlobalComponent,
    MessageOkComponent
  ],


})
export class SharedModule { }
