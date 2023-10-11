import { Component } from '@angular/core';
import { Router } from "@angular/router";
import { NgbActiveModal, NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { SolicitudService } from "../../../services/solicitud.service";
import { SpinnerOverlayService } from "../../../services/overlay.service";
import { ToastService } from "../../../services/toast.service";
import { ConfirmDialogComponent } from 'src/app/shared/components/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-resultado-extrapolar',
  templateUrl: './resultado-extrapolar.component.html',
  styleUrls: ['./resultado-extrapolar.component.scss']
})
export class ResultadoExtrapolarComponent {

  usuario!: string

  constructor(private router: Router,
    private activeModal: NgbActiveModal,
    private modal: NgbModal,
    private solicitudService: SolicitudService,
    private spinnerService: SpinnerOverlayService,
    private toastService: ToastService) {

  }

  ngOnInit() {
    this.usuario = sessionStorage.getItem('usuario')!
  }

  aceptar() {
    const modalRef = this.modal.open(ConfirmDialogComponent)
    modalRef.componentInstance.message = `¿Desea aceptar los resultados de la extrapolación?`;

    modalRef.closed.subscribe(result => {
      if (result) {

      }
    })
  }
  cerrar() {
    this.activeModal.close()
  }

}
