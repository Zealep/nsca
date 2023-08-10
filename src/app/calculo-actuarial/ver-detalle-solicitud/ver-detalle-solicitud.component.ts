import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { Solicitud } from 'src/app/interfaces/solicitud';
import { SolicPlaniMov } from 'src/app/interfaces/solicitud-plani-mov';
import { SpinnerOverlayService } from 'src/app/services/overlay.service';
import { SolicitudService } from 'src/app/services/solicitud.service';
import { catchError, EMPTY } from 'rxjs';
import { ToastService } from 'src/app/services/toast.service';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { VerDetalleParametrosComponent } from '../ver-detalle-parametros/ver-detalle-parametros.component';
import { VerDetalleMovimientosComponent } from '../ver-detalle-movimientos/ver-detalle-movimientos.component';

@Component({
  selector: 'app-ver-detalle-solicitud',
  templateUrl: './ver-detalle-solicitud.component.html',
  styleUrls: ['./ver-detalle-solicitud.component.css']
})
export class VerDetalleSolicitudComponent implements OnInit {

  @Input() codSolicitud!: string

  solicitud: SolicPlaniMov =
    {
      codSolicitud: '',
      descSolicitud: '',
      anhoCalculo: '',
      fechRecepcion: '',
      tipoSolicitud: '',
      desTipoSolicitud: '',
      nombSolicitante: '',
      cargSolicitante: '',
      mailSolicitante: '',
      observacion: '',
      indPensionistas: '',
      indActivos: '',
      indContAdm: '',
      indContJud: '',
      planilla: [],
      movimiento: []
    }

  constructor(private router: Router,
    private route: ActivatedRoute,
    private activeModal: NgbActiveModal,
    private modal: NgbModal,
    private solicitudService: SolicitudService,
    private spinnerService: SpinnerOverlayService,
    private toastService: ToastService) { }

  ngOnInit() {
    this.getSolicitudPlanillaMovimiento()
  }

  getSolicitudPlanillaMovimiento() {
    this.spinnerService.show()
    this.solicitudService.getSolicitudPlanillaMovimiento(this.codSolicitud)
      .pipe(catchError(error => {
        this.spinnerService.hide()
        this.toastService.show(error, { classname: 'bg-danger text-white', delay: 3000, icon: 'ban' })
        return EMPTY
      }))
      .subscribe(x => {
        this.spinnerService.hide()
        this.solicitud = x
      })
  }

  cerrar() {
    this.activeModal.close()

  }

  verDetalleParametro() {
    const modalRef = this.modal.open(VerDetalleParametrosComponent);
    modalRef.componentInstance.codSolicitud = this.codSolicitud
    modalRef.closed.subscribe(x => {
    })
  }

  verDetalleMovimiento() {
    const modalRef = this.modal.open(VerDetalleMovimientosComponent);
    modalRef.componentInstance.codSolicitud = this.codSolicitud
    modalRef.closed.subscribe(x => {
    })
  }

}
