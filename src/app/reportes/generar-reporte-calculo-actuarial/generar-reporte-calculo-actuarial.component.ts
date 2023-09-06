import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { BandejaSolicitudCarga } from 'src/app/interfaces/bandeja-solicitud-carga';
import { SpinnerOverlayService } from 'src/app/services/overlay.service';
import { SolicitudService } from 'src/app/services/solicitud.service';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'app-generar-reporte-calculo-actuarial',
  templateUrl: './generar-reporte-calculo-actuarial.component.html',
  styleUrls: ['./generar-reporte-calculo-actuarial.component.scss']
})
export class GenerarReporteCalculoActuarialComponent {
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

  cerrar() {
    this.activeModal.close()
  }

  generarReporte() {

  }

}
