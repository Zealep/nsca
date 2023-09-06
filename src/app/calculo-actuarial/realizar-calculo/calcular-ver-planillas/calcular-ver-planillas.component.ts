import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { BandejaSolicitudCarga } from 'src/app/interfaces/bandeja-solicitud-carga';
import { GenerarReporteCalculoActuarialComponent } from 'src/app/reportes/generar-reporte-calculo-actuarial/generar-reporte-calculo-actuarial.component';
import { SpinnerOverlayService } from 'src/app/services/overlay.service';
import { SolicitudService } from 'src/app/services/solicitud.service';
import { ToastService } from 'src/app/services/toast.service';
import { ConfirmDialogComponent } from 'src/app/shared/components/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-calcular-ver-planillas',
  templateUrl: './calcular-ver-planillas.component.html',
  styleUrls: ['./calcular-ver-planillas.component.scss']
})
export class CalcularVerPlanillasComponent {

  usuario!: string

  @Input() solicitud!: BandejaSolicitudCarga

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

  dialogCalcular(tipoPlanilla: string) {
    const modalRef = this.modal.open(ConfirmDialogComponent)
    modalRef.componentInstance.message = `¿Está seguro que desea procesar el cálculo de la reserva para la planilla ${tipoPlanilla} de la solicitud N° ${this.solicitud.idSolicitud}?`;

    modalRef.closed.subscribe(result => {
      if (result) {
        this.procesarCalculo();
      }
    })

  }

  procesarCalculo() {
    console.log('procesar calculo');
  }

  verReportes() {
    const modalRef = this.modal.open(GenerarReporteCalculoActuarialComponent,
      {
        size: 'lg'
      });
    modalRef.componentInstance.codSolicitud = this.solicitud.idSolicitud
    modalRef.closed.subscribe(x => {

    })
  }

  dialogAprobar() {
    const modalRef = this.modal.open(ConfirmDialogComponent)
    modalRef.componentInstance.message = `¿Está seguro que  desea aprobar el cálculo de la reserva  de la solicitud N° ${this.solicitud.idSolicitud} ?`;

    modalRef.closed.subscribe(result => {
      if (result) {
        this.aprobar();
      }
    })
  }

  aprobar() {

  }

  cerrar() {
    this.activeModal.close()
  }


}
