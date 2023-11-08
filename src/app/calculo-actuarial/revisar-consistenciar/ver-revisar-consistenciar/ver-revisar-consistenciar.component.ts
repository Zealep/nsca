import { Component, Input } from '@angular/core';
import { BandejaSolicitudCalculo } from "../../../interfaces/bandeja-solicitud-calculo";
import { Router } from "@angular/router";
import { NgbActiveModal, NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { SolicitudService } from "../../../services/solicitud.service";
import { SpinnerOverlayService } from "../../../services/overlay.service";
import { ToastService } from "../../../services/toast.service";
import { ConfirmDialogComponent } from "../../../shared/components/confirm-dialog/confirm-dialog.component";
import { catchError, EMPTY } from "rxjs";
import { BandejaSolicitudRevisar } from "../../../interfaces/bandeja-solicitud-revisar";

@Component({
  selector: 'app-ver-revisar-consistenciar',
  templateUrl: './ver-revisar-consistenciar.component.html',
  styleUrls: ['./ver-revisar-consistenciar.component.scss']
})
export class VerRevisarConsistenciarComponent {
  usuario!: string

  @Input() solicitud!: BandejaSolicitudRevisar

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

  dialogCerrar(codTipoPlanilla: string, descTipoPlanilla: string) {
    const modalRef = this.modal.open(ConfirmDialogComponent)
    modalRef.componentInstance.message = `¿Está seguro que desea cerrar la planilla de ${descTipoPlanilla} de la solicitud N° ${this.solicitud.idSolicitud}?`;

    modalRef.closed.subscribe(result => {
      if (result) {
        this.procesarCierre(codTipoPlanilla, descTipoPlanilla);
      }
    })

  }
  descargar(codPlanilla: string) {
    let name = 'Informe_InconsistenciasPDF'
    const usuario = sessionStorage.getItem('usuario')!
    this.spinnerService.show()
    //ip-request
    this.solicitudService.getInconsistencias(codPlanilla, this.solicitud.idSolicitud, usuario, 'localhost')
      .pipe(catchError(error => {
        this.spinnerService.hide()
        this.toastService.show(error, { classname: 'bg-danger text-white', delay: 3000, icon: 'ban' })
        return EMPTY
      }))
      .subscribe(result => {
        this.spinnerService.hide()
        this.toastService.show('Se descargó el reporte de inconsistencias correctamente', { classname: 'bg-success text-white', delay: 3000, icon: 'check' })
        const url = window.URL.createObjectURL(result);
        const a = document.createElement('a');
        a.setAttribute('style', 'display:none;');
        document.body.appendChild(a);
        a.href = url;
        a.download = `${name}-${codPlanilla}.pdf`;
        a.click();
        return url;
      })
  }
  procesarCierre(codPlanilla: string, desTipPla: string) {
    const usuario = sessionStorage.getItem('usuario')!
    const ip = '127.0.0.1'
    this.spinnerService.show()
    this.solicitudService.cerrarPlanilla(codPlanilla, this.solicitud.idSolicitud, usuario, ip)
      .pipe(catchError(error => {
        this.spinnerService.hide()
        this.toastService.show(error, { classname: 'bg-danger text-white', delay: 3000, icon: 'ban' })
        return EMPTY
      }))
      .subscribe(res => {
        this.spinnerService.hide()
        if (res.indCierrePlanilla === '1') {
          this.toastService.show(`Se realizo el cierre de la planilla ${desTipPla} correctamente`, { classname: 'bg-success text-white', delay: 3000, icon: 'check' })
          this.activeModal.close()
        }
        else {
          this.toastService.show(`No se pudo realizar el cierre de la planilla ${desTipPla}`, { classname: 'bg-danger text-white', delay: 3000, icon: 'ban' })
        }
      })
  }

  cerrar() {
    this.activeModal.close()
  }


}
